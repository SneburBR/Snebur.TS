
namespace Snebur.UI
{
    export class CaixaAreaTextoSugestao extends Snebur.UI.BaseCaixaTexto implements ui.IControleSugestoes
    {
        private static readonly CSS_ABERTO = "is-caixa-sugestao-aberta";
        private static readonly TAG_SPAN_INICIO = "span-incio";
        private static readonly TAG_CURSOR_ESPELHO = "cursor--espelho";
        private static readonly TAG_SPAN_FIM = "span-fim";
        private static readonly TAG_SPAN_COMPLEMENTO = "span-complemento";

        private static readonly LIMITE_SUGESTAO = 10;

        private _nomePropriedadeSugestao: string = undefined;
        private _ultimaPesquisa: string;
        private _ultimaPesquisaFormatada: string;
        private _isSelecionadoSugestao: boolean;
        private _isPrimeiroFocus: boolean = true;
        private _posicaoListaSugestao: Partial<ClientRect>

        public TimeoutBlur: number;
        private IsMostrarContadorCaracteres: boolean = false;
        private ContadorCaracteres: number;
        /*private Pesquisa: string;*/

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

        public get IsPrimeiraLestraMaiuscula()
        {
            const valor = this.Valor.trim();
            return valor.indexOf(" ") === -1;
        }

        public get PosicaoListaSugestao(): Partial<ClientRect>
        {
            return this._posicaoListaSugestao;
        }

        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement) 
        {
            super(controlePai, refElemento);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);

            this.DeclararPropriedade(x => x.ContadorCaracteres, Number);
            this.DeclararPropriedade(x => x.IsMostrarContadorCaracteres, Boolean);
            /*this.DeclararPropriedade(x => x.Pesquisa, String, this.Pesquisa_Alterada);*/

            this.CssClasseControle = "sn-caixa-texto sn-caixa-area-texto-sugestao";
        }

        //private Pesquisa_Alterada()
        //{
        //    this.ElementoPesquisa.innerHTML = this.Pesquisa;
        //}

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
            this.CaixaAreaListaSugestao.EventoFechou.AddHandler(this.ControleSugestoes_Fechou, this);
            this.AtivarBlur();

            const isMostrarContadorCaracteres = this.RetornarValorAtributoBoolean(ui.AtributosHtml.IsMostrarContadorCaracteres, null, false);
            if (isMostrarContadorCaracteres && this.MaxLength > 0)
            {
                this.ContadorCaracteres = this.MaxLength;
                this.IsMostrarContadorCaracteres = true;
            }
            this.InicializarEspelho();
        }


        private Controle_Carregado(provedor: any, e: EventArgs) 
        {
            this.AtualizarEspelhoAsync(true);
            //controle carregada
        }

        public override ValorPropriedadeAlterado(paiPropriedade: ObjetoControladorPropriedade,
            nomePropriedade: string,
            proprieade: r.Propriedade,
            valorPropriedade: any): void
        {
            super.ValorPropriedadeAlterado(paiPropriedade,
                nomePropriedade,
                proprieade,
                valorPropriedade);

            this.AtualizarContadorCaracteres();
        }

        public AdicionarSugestao(item: any): boolean
        {
            window.clearTimeout(this.TimeoutBlur);
            this._isSelecionadoSugestao = true;

            const valorAtual = this.ElementoInput.value;
            const posicao = valorAtual.lastIndexOf(this._ultimaPesquisa);
            if (posicao >= 0)
            {
                const descricao = this.RetornarDescricaoSugestaoFormatada(item);
                const novoValor = valorAtual.substring(0, posicao) + descricao.trim();
                this.Valor = novoValor;
                this.ElementoInput.focus();
                this.ElementoInput.setSelectionRange(novoValor.length, novoValor.length);
            }
            this._isSelecionadoSugestao = false;
            this.FecharSugestoes();

            return posicao >= 0;
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
            this.AtualizarSugestoesAsync();
        }

        private async ElementoInputInterno_Click(e: MouseEvent)
        {
            await this.AtualizarSugestoesAsync();
        }

        private async ElementoInputInterno_Input(e: KeyboardEvent)
        {
            if (this.ElementoInput.selectionEnd >= this.ElementoInput.value.trimEnd().length)
            {
                const isSalvarPosicao = (e.data === " " || e.data == null);
                await this.AtualizarEspelhoAsync(isSalvarPosicao);
                await this.AtualizarSugestoesAsync();
            }
            else
            {
                this.FecharSugestoes();
            }
            this.AtualizarContadorCaracteres();

        }

        private ElementoInputInterno_KeyDown(e: KeyboardEvent)
        {
            if (this.SugestoesFiltrada.Count > 0)
            {
                if (ui.KeyCodeUtil.IsKeyCodeParaBaixo(e))
                {
                    this.CaixaAreaListaSugestao.Descer();
                    e.preventDefault();
                }
                if (ui.KeyCodeUtil.IsKeyCodeParaCima(e))
                {
                    this.CaixaAreaListaSugestao.Subir();
                    e.preventDefault();
                }

                if (ui.KeyCodeUtil.IsKeyCodeEnter(e.keyCode) ||
                    ui.KeyCodeUtil.IsKeyCodeTab(e.keyCode))
                {
                    if (this.CaixaAreaListaSugestao.ItemAtual != null)
                    {
                        this.AdicionarSugestao(this.CaixaAreaListaSugestao.ItemAtual);
                        e.preventDefault();
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
        private AtualizarSugestoesAsync()
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

        private AtualizarContadorCaracteres()
        {
            if (this.IsMostrarContadorCaracteres)
            {
                this.ContadorCaracteres = this.MaxLength - this.Valor?.length ?? 0;
            }
        }

        /*private contador = 0;*/

        private FiltrarSugestoes()
        {
            const pesquisa = this.ElementoInput.value.trim().split(this.RetornarRegexDivisorPesquisa()).Last();
            const pesquisaFormatada = u.TextoUtil.FormatarPequisa(pesquisa).toLowerCase().trim();

            if (this._ultimaPesquisa !== pesquisa &&
                this._ultimaPesquisaFormatada !== pesquisaFormatada)
            {
                //this.contador += 1;
                //this.Pesquisa = this.contador + ":" + pesquisa;
                this._ultimaPesquisa = pesquisa;
                this._ultimaPesquisaFormatada = pesquisaFormatada;
                const sugestoesFiltrada = this.RetornarSugestoesFiltradas(pesquisaFormatada);
                /*this.CaixaAreaListaSugestao.LimparSelecao();*/
                this.SugestoesFiltrada.AddRangeNew(sugestoesFiltrada);
                if (sugestoesFiltrada.Count > 0)
                {
                    this.CaixaAreaListaSugestao.SelecionarPrimeiro();
                }

                this.CaixaAreaListaSugestao.AtualizarPosicaoAsync();
            }
        }

        private RetornarSugestoesFiltradas(pesquisa: string): List<any>
        {
            if (String.IsNullOrEmpty(pesquisa))
            {
                return [];
                /*this.Sugestoes.Take(CaixaAreaTextoSugestao.LIMITE_SUGESTAO);*/
            }
            const sugestoesFiltradas = new List<any>();
            for (const sugestao of this.Sugestoes)
            {
                if (this.FiltrarSugestao(sugestao, pesquisa))
                {
                    sugestoesFiltradas.Add(sugestao);
                    if (sugestoesFiltradas.Count === CaixaAreaTextoSugestao.LIMITE_SUGESTAO)
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
            if (descricao.length > 0 && descricao.toLowerCase() !== pesquisa)
            {
                const partesDescricao = u.TextoUtil.RetornarPartesPequisa(descricao);
                const partesPesquisa = u.TextoUtil.RetornarPartesPequisa(pesquisa);
                return partesPesquisa.All(parte => partesDescricao.Any(x => x.StartsWith(parte)));
            }
            return false;
        }

        public RetornarDescricaoSugestaoFormatada(obj: any): string
        {
            if (this.IsPrimeiraLestraMaiuscula)
            {
                return TextoUtil.FormatarPrimeiraLetraMaiuscula(this.RetornarDescricaoSugestao(obj));
            }
            return this.RetornarDescricaoSugestao(obj);
        }

        public RetornarDescricaoSugestao(obj: any): string
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

        private MostrarSugestoes()
        {
            if (!this.CaixaAreaListaSugestao.IsAberto)
            {
                this.CaixaAreaListaSugestao.LimparSelecao();
                EstiloUtil.AdicionarCssClasse(this.Elemento, CaixaAreaTextoSugestao.CSS_ABERTO);
                this.CaixaAreaListaSugestao.Mostrar();
            }
            this.CaixaAreaListaSugestao.Completar();
        }

        private FecharSugestoes()
        {
            this.CaixaAreaListaSugestao?.LimparSelecao();
            this.CaixaAreaListaSugestao?.Fechar();
            this.LimparEspelho();
        }

        private ControleSugestoes_Fechou()
        {
            EstiloUtil.RemoverClssClasseComecaCom(this.Elemento, CaixaAreaTextoSugestao.CSS_ABERTO);
        }

        //#region Espelho

        private InicializarEspelho()
        {
            this.ElementoInputEspelho.Clear();
            const elementoCursor = document.createElement(CaixaAreaTextoSugestao.TAG_CURSOR_ESPELHO);
            elementoCursor.textContent = "|";

            this.ElementoInputEspelho.appendChild(document.createElement(CaixaAreaTextoSugestao.TAG_SPAN_INICIO));
            this.ElementoInputEspelho.appendChild(elementoCursor);
            this.ElementoInputEspelho.appendChild(document.createElement(CaixaAreaTextoSugestao.TAG_SPAN_FIM));
            this.ElementoInputEspelho.appendChild(document.createElement(CaixaAreaTextoSugestao.TAG_SPAN_COMPLEMENTO));
        }

        private async AtualizarEspelhoAsync(isSalvarPosicao: boolean)
        {
            /*const posicao = this.ElementoInput.selectionEnd;*/
            const reg = this.RetornarRegexDivisorPesquisa();
            /*eslint-disable*/

            const texto = this.ElementoInput.value;

            let match = reg.exec(texto);
            let lastIndex = 0;
            while (match != null)
            {
                lastIndex = reg.lastIndex;
                match = reg.exec(texto);
            }
            const conteudoInicio = texto.substring(0, lastIndex);
            let conteudoFim = texto.substring(lastIndex);

            if (conteudoFim.length == 0) conteudoFim = " ";

            const spanInicio = this.ElementoInputEspelho.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_INICIO);
            const spanFim = this.ElementoInputEspelho.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_FIM);
            spanInicio.textContent = conteudoInicio;
            spanFim.textContent = conteudoFim;

            if (isSalvarPosicao)
            {

                await ThreadUtil.QuebrarAsync();

                const rectEspelho = this.ElementoInputEspelho.querySelector(CaixaAreaTextoSugestao.TAG_CURSOR_ESPELHO).getBoundingClientRect();
                const left = rectEspelho.left + rectEspelho.width;
                const top = rectEspelho.top;

                this._posicaoListaSugestao = {
                    top: top,
                    left: left,
                    width: rectEspelho.width,
                    height: rectEspelho.height
                };
            }
        }

        public CompletarEspelho(completar: string)
        {
            const elementoFim = this.ElementoInputEspelho?.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_FIM);
            const elementoComplemento = this.ElementoInputEspelho?.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_COMPLEMENTO) as HTMLElement;
            if (elementoFim != null && elementoComplemento != null)
            {
                /*completar = completar.trim();*/
                const restante = elementoFim.textContent;/*.trim();*/
                if (completar.toLowerCase().startsWith(restante.toLowerCase()))
                {
                    elementoComplemento.textContent = completar.substring(restante.length);
                }
                else
                {
                    elementoComplemento.Clear();
                }
            }
        }

        private LimparEspelho()
        {
            const elementoInicio = this.ElementoInputEspelho?.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_INICIO) as HTMLSpanElement;
            const elementoFim = this.ElementoInputEspelho?.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_FIM) as HTMLSpanElement;
            const elementoComplemento = this.ElementoInputEspelho?.querySelector(CaixaAreaTextoSugestao.TAG_SPAN_COMPLEMENTO) as HTMLSpanElement;
            if (elementoFim != null && elementoComplemento != null)
            {
                elementoInicio.Clear();
                elementoFim.Clear();
                elementoComplemento.Clear();
            }
        }

        private RetornarRegexDivisorPesquisa()
        {
            return /,\s+|;\s+|\.\s+|:\s+|\s+e\s+|\s+ou\s+/g;
        }

        //#endregion

        protected override IsDesativarAutoCompletar(elemento: HTMLElement): boolean
        {
            return false;
        }

    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaAreaTextoSugestao
    {
        readonly ElementoInputEspelho: HTMLElement;
        readonly CaixaAreaListaSugestao: CaixaAreaListaSugestao;
    }

    //#endregion

}

interface KeyboardEvent
{
    data?: any;
}