
namespace Snebur.UI
{
    export class CaixaTextoSugestao extends Snebur.UI.BaseCaixaTexto implements ui.IControleSugestoes
    {
        private static readonly CSS_ABERTO = "is-caixa-sugestao-aberta";
        private static readonly LIMITE_SUGESTAO = 10;

        private _nomePropriedadeSugestao: string = undefined;
        private _ultimaPesquisa: string;
        private _isSelecionadoSugestao: boolean;
        private _isPrimeiroFocus: boolean = true;
        public TimeoutBlur: number;

        public readonly Sugestoes = new List<any>();
        public readonly SugestoesFiltrada = new ListaObservacao<any>();

        private get NomePropriedadeSugestao(): string
        {
            return this._nomePropriedadeSugestao;
        }

        public get UltimaPesquisa(): string
        {
            return this._ultimaPesquisa;
        }

        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement) 
        {
            super(controlePai, refElemento);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
            this.CssClasseControle = "sn-caixa-texto sn-caixa-texto-sugestao ";
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            ElementoUtil.AdicionarAtributo(this.ElementoInput, ui.AtributosHtml.BindTexto, this.CaminhoBind);
        }

        protected override Inicializar()
        {
            super.Inicializar();

            this._nomePropriedadeSugestao = this.RetornarValorAtributo(ui.AtributosHtml.NomePropriedadeSugestao);
            /*this.AdicionarEventoDom(EnumEventoDom.Focus, this.ElementoInputInterno_Focus, this.ElementoInput);*/
            this.AdicionarEventoDom(EnumEventoDom.Click, this.ElementoInputInterno_Click, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.Input, this.ElementoInputInterno_Input, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.ElementoInputInterno_KeyDown, this.ElementoInput);
            this.CaixaListaSugestao.EventoFechou.AddHandler(this.ControleSugestoes_Fechou, this);
            this.AtivarBlur();
        }

        private Controle_Carregado(provedor: any, e: EventArgs) 
        {
            //controle carregada
        }

        public SelecionarSugestao(item: any)
        {
            window.clearTimeout(this.TimeoutBlur);
            this._isSelecionadoSugestao = true;
            const descricao = this.RetornarDescricaoSugestao(item);
            this.Valor = descricao;
            this._isSelecionadoSugestao = false;
            this.FecharSugestoes();
            /*this.Focus();*/
        }

        private ElementoInputInterno_Focus()
        {
            if (this._isPrimeiroFocus)
            {
                this._isPrimeiroFocus = false;
                return;
            }
            if (this._isSelecionadoSugestao)
            {
                return;
            }
            this.AtualizarSugestoesasync();
        }

        private async ElementoInputInterno_Click(e: MouseEvent)
        {
            await this.AtualizarSugestoesasync();
        }

        private async ElementoInputInterno_Input(e: KeyboardEvent)
        {
            await this.AtualizarSugestoesasync();
        }

        private ElementoInputInterno_KeyDown(e: KeyboardEvent)
        {
            if (this.SugestoesFiltrada.Count > 0)
            {
                if (ui.KeyCodeUtil.IsKeyCodeParaBaixo(e))
                {
                    this.CaixaListaSugestao.Descer();
                }
                if (ui.KeyCodeUtil.IsKeyCodeParaCima(e))
                {
                    this.CaixaListaSugestao.Subir();
                }

                if (ui.KeyCodeUtil.IsKeyCodeEnter(e.keyCode) ||
                    ui.KeyCodeUtil.IsKeyCodeTab(e.keyCode))
                {
                    if (this.CaixaListaSugestao.ItemAtual != null)
                    {
                        this.SelecionarSugestao(this.CaixaListaSugestao.ItemAtual);
                    }
                }
            }
        }

        private ElementoInputInterno_Blur()
        {
            this.FecharSugestoes();
            //window.clearTimeout(this.TimeoutBlur);
            //this.TimeoutBlur = window.setTimeout(this.TimeouBlurCallback.bind(this), 20);
        }

        public AtivarBlur()
        {
            this.AdicionarEventoDom(EnumEventoDom.Blur, this.ElementoInputInterno_Blur, this.ElementoInput);
        }

        public DesativarBlur()
        {
            this.RemoverEventoDom(EnumEventoDom.Blur, this.ElementoInputInterno_Blur, this.ElementoInput);
        }

        private TimeouBlurCallback()
        {
            console.error("callback blur");

        }
        private AtualizarSugestoesasync()
        {
            window.clearTimeout(this.TimeoutBlur);
            this.FiltrarSugestoes();
            if (this.SugestoesFiltrada.Count > 0)
            {
                this.MostrarSugestoes();
            }
            else
            {
                this.FecharSugestoes();
            }
        }

        private FiltrarSugestoes()
        {
            const pesquisa = this.ElementoInput.value.trim();
            if (this._ultimaPesquisa !== pesquisa)
            {
                this._ultimaPesquisa = pesquisa;
                const sugestoesFiltrada = this.RetornarSugestoesFiltradas(pesquisa);
                this.CaixaListaSugestao.LimparSelecao();
                this.SugestoesFiltrada.AddRangeNew(sugestoesFiltrada);
                this.CaixaListaSugestao.AtualizarPosicaoAsync();
            }
        }

        private RetornarSugestoesFiltradas(pesquisa: string): List<any>
        {
            if (String.IsNullOrEmpty(pesquisa))
            {
                return this.Sugestoes.Take(CaixaTextoSugestao.LIMITE_SUGESTAO);
            }
            const sugestoesFiltradas = new List<any>();
            for (const sugestao of this.Sugestoes)
            {
                if (this.FiltrarSugestao(sugestao, pesquisa))
                {
                    sugestoesFiltradas.Add(sugestao);
                    if (sugestoesFiltradas.Count === CaixaTextoSugestao.LIMITE_SUGESTAO)
                    {
                        return sugestoesFiltradas;
                    }
                }
            }
            return sugestoesFiltradas;
        }

        private FiltrarSugestao(x: any, pesquisa: string): boolean
        {
            const descricao = this.RetornarDescricaoSugestao(x).toString().trim() ?? "";
            if (descricao.length > 0 && descricao !== pesquisa)
            {
                const partesDescricao = u.TextoUtil.RetornarPartesPequisa(descricao);
                const partesPesquisa = u.TextoUtil.RetornarPartesPequisa(pesquisa);
                return partesPesquisa.All(parte => partesDescricao.Any(x => x.StartsWith(parte)));
            }
            return false;
        }

        public RetornarDescricaoSugestao(obj: any): string
        {
            const sugestao = this.RetornarDescricaoSugestaoInterno(obj);
            return this.FormatarSugestao(sugestao);
        }
       
        private RetornarDescricaoSugestaoInterno(obj: any): string
        {
            if (obj == null)
            {
                return String.Empty;
            }
            const nomePropriedadeSugestao = this.NomePropriedadeSugestao;
            if (nomePropriedadeSugestao != null && obj[nomePropriedadeSugestao] != null)
            {
                return obj[nomePropriedadeSugestao];
            }

            return obj["Nome"] ??
                obj["Descricao"] ??
                obj;
        }

        private FormatarSugestao(sugestao: string): string
        {
            return FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(sugestao);
        }

        private MostrarSugestoes()
        {
            if (!this.CaixaListaSugestao.IsAberto)
            {
                this.CaixaListaSugestao.LimparSelecao();
                CssClassUtil.AdicionarCssClasse(this.Elemento, CaixaTextoSugestao.CSS_ABERTO);
                this.CaixaListaSugestao.Mostrar();
            }
        }

        private FecharSugestoes()
        {
            this.CaixaListaSugestao?.LimparSelecao();
            this.CaixaListaSugestao?.Fechar();
        }

        private ControleSugestoes_Fechou()
        {
            CssClassUtil.RemoverClssClasseComecaCom(this.Elemento, CaixaTextoSugestao.CSS_ABERTO);
        }

        protected override IsDesativarAutoCompletar(elemento: HTMLElement): boolean
        {
            return true;
        }

    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaTextoSugestao
	{
		readonly CaixaListaSugestao: CaixaListaSugestao;
	}

	//#endregion

}