namespace Snebur.UI 
{
    export class CaixaSelecaoCor extends Snebur.UI.BaseControle implements ui.IControleEventoValorAlterado<d.Cor>
    {
        private _isFlutuante: boolean = true;
        private _corPadrao: d.Cor = Cores.Transparente;


        //private ElementoVisualizacaoIcone: HTMLDivElement;
        //private ElementoIcone: HTMLElement;
        private get IsIcone(): boolean
        {
            return u.EnumUtil.IsDefindo(EnumIcone, this.Icone) &&
                this.Icone !== EnumIcone.Vazio;
        }
        public get CorPadrao(): d.Cor
        {
            return this._corPadrao;
        }
        public set CorPadrao(value: d.Cor)
        {
            this._corPadrao = value;
        }

        public get Titulo(): string
        {
            return this.ControleFlutuanteCores.Titulo;
        }
        public set Titulo(value: string)
        {
            this.ControleFlutuanteCores.Titulo = value;
        }

        public readonly EventoValorAlterado: Evento<ValorAlteradoEventArgs<d.Cor>>;
        public readonly EventoFechou: Evento<FechouControleFlutanteEventArgs>;

        public get IsCorSelecioda(): boolean
        {
            return !this.CorSelecionada.IsTransparente;
        }

        public get CorSelecionada(): d.Cor
        {
            if (this.IsAndroidOrIOS)
            {
                return new Cor(this.InputColorNativo.value);
            }
            return this.ControleFlutuanteCores.CorSelecionada;
        }
        public set CorSelecionada(value: d.Cor)
        {
            if (this.IsAndroidOrIOS)
            {
                if (this.InputColorNativo.value !== value.Rgba)
                {
                    this.InputColorNativo.value = value.Rgba;
                }
            }
            else
            {
                if (this.ControleFlutuanteCores.CorSelecionada !== value)
                {
                    this.ControleFlutuanteCores.CorSelecionada = value;
                }
            }
        }

        public get CorSelecionadaRgba(): string
        {
            if (this.IsAndroidOrIOS)
            {
                return ConverterUtil.ConverterHexaParaRgba(this.InputColorNativo.value);
            }
            return this.ControleFlutuanteCores.CorSelecionadaRgba;
        }
        public set CorSelecionadaRgba(value: string)
        {
            if (this.IsAndroidOrIOS)
            {
                this.InputColorNativo.value = value;
            }
            else
            {
                this.ControleFlutuanteCores.CorSelecionadaRgba = value;
            }
        }

        public get IsFlutuante(): boolean
        {
            return this._isFlutuante;
        }

        public get Icone(): EnumIcone
        {
            return this.RetornarValorAtributoEnum(EnumIcone, AtributosHtml.Icone, null);
        }
    
        public get IconeCategoria(): EnumIconeCategoria
        {
            return this.RetornarValorAtributoEnum(EnumIconeCategoria, AtributosHtml.IconeCategoria, EnumIconeCategoria.Filled);
        }
        public get TamanhoIcone(): EnumTamanhoIcone
        {
            return this.RetornarValorAtributoEnum(EnumTamanhoIcone, AtributosHtml.TamanhoIcone, EnumTamanhoIcone.Padrao);
        }
        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement | string) 
        {
            super(controlePai, refElemento);

            this.EventoCarregado.AddHandler(this.CaixaSelecaoCor_Carregado, this);
            this.EventoValorAlterado = new Evento<ValorAlteradoEventArgs<d.Cor>>(this);
            this.EventoFechou = new Evento<FechouControleFlutanteEventArgs>(this);
            this.CssClasseControle = "sn-caixa-selecao-cor";

        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this._isFlutuante = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.Flutuante, true));
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            if (this.IsIcone)
            {
                if (!this._isFlutuante)
                {
                    throw new Erro("O ícone  não é permitido numa caixa de seleção fixa");
                }
                this.ElementoVisualizacaoCor.OcultarElemento();
                //this.ElementoVisualizacaoIcone.MostrarElemento();
                this.AdicionarEventoDom(ui.EnumEventoDom.MouseDown, this.ElementoVisualizacaoIcone_MouseDown);

                this.BotaoIcone.MostrarElemento();
                this.BotaoIcone.Icone = this.Icone;
                this.BotaoIcone.TamanhoIcone = this.TamanhoIcone;
                this.BotaoIcone.IconeCategoria = this.IconeCategoria;
            }
            else
            {
                this.ElementoVisualizacaoCor.MostrarElemento();
                this.BotaoIcone.OcultarElemento();
                //this.ElementoVisualizacaoIcone.OcultarElemento();
            }
        }

        private CaixaSelecaoCor_Carregado(provedor: any, e: EventArgs)
        {
            this.ControleFlutuanteCores.EventoValorAlterado.AddHandler(this.ControleFlutuanteCores_CorAlterada, this);
            this.ControleFlutuanteCores.EventoFechou.AddHandler(this.ControleFlutuanteCores_Fechou, this);

            if (!this.IsFlutuante)
            {
                this.ElementoVisualizacaoCor.OcultarElemento();
                this.ControleFlutuanteCores.OpcoesControleFlutuante.IsFecharCliqueForaDoControle = false;
                this.ControleFlutuanteCores.Fixar(this.Elemento);
                this.ControleFlutuanteCores.Elemento.classList.remove("sn-borda-preta");
                this.Elemento.classList.add("sn-caixa-selecao-cor-fixa");
            }
            else
            {
                this.AtualizarMobabilidade();
            }

        }
        private AtualizarMobabilidade()
        {
            if (this.IsAndroidOrIOS)
            {
                this.BotaoIcone.OcultarElemento();
                this.ElementoVisualizacaoCor.OcultarElemento();
                this.ElementoVisualizacaoCorNativo.MostrarElemento();

                this.AdicionarEventoDom("change", this.InputColorNativo_Change, this.InputColorNativo);
            }
        }

        private InputColorNativo_Change(e: UIEvent)
        {
            const args = new ValorAlteradoEventArgs<Cor>(this.CorSelecionada);
            this.EventoValorAlterado.Notificar(this, args);
        }

        private ElementoVisualizacaoIcone_MouseDown(e: MouseEvent)
        {
        }

        private ControleFlutuanteCores_Fechou(provedor: any, e: ui.FechouControleFlutanteEventArgs)
        {
            this.EventoFechou.Notificar(this, e);
        }

        private ControleFlutuanteCores_CorAlterada(provedor: any, e: ValorAlteradoEventArgs<d.Cor>): void
        {
            if (this.IsControleInicializado)
            {
                const cor = e.Valor.IsTransparenteAbsoluto ? this.CorPadrao : e.Valor;
                if (this.IsIcone)
                {
                    //this.ElementoIcone.style.color = cor.Rgba;
                    this.BotaoIcone.CorIcone = cor;
                }
                else
                {
                    this.ElementoCor.style.backgroundColor = cor.Rgba;
                }
            }

        }


        public DeselecionarCor(): void
        {
            this.CorSelecionada = Cores.Transparente;
        }

        private async BtnMostrarCores_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            if (this.IsAndroidOrIOS)
            {
                this.InputColorNativo.click();
            }
            else
            {
                this.ControleFlutuanteCores.Mostrar();
            }
            
        }

        public AtualizarSugestaoCor(cores: Array<d.Cor>): void
        public AtualizarSugestaoCor(elementosImagemCorSegestao: Array<HTMLImageElement>): void
        public AtualizarSugestaoCor(elementoImagemCorSegestao: HTMLImageElement): void
        public AtualizarSugestaoCor(coresOuElementoImagemCorSegestao: Cor[] | HTMLImageElement[] | HTMLImageElement): void
        public AtualizarSugestaoCor(coresOuElementoImagemCorSegestao: any): void
        {
            this.ControleFlutuanteCores.AtualizarSugestaoCor(coresOuElementoImagemCorSegestao);
        }

        public AlterarElementoDestinoHistorico(elemento: HTMLElement)
        {
            this.ControleFlutuanteCores.AlterarElementoDestinoHistorico(elemento);
        }
        public SalvarHistorico(): void
        {
            this.ControleFlutuanteCores.SalvarHistorico();
        }

        private get IsAndroidOrIOS(): boolean
        {
            return false;
        }


    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaSelecaoCor
	{
		readonly ElementoVisualizacaoCor: HTMLDivElement;
		readonly ElementoCor: HTMLDivElement;
		readonly BotaoIcone: ui.Botao;
		readonly ControleFlutuanteCores: ControleFlutuanteCores;
		readonly ElementoVisualizacaoCorNativo: HTMLDivElement;
		readonly InputColorNativo: HTMLInputElement;
	}

	//#endregion

}
