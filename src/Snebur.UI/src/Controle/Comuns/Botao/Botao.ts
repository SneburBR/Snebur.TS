namespace Snebur.UI
{
    export class Botao extends ControleRotulo
    {
        private static readonly CSS_CLASS_INPUT_FOCUS = "sn-input-focus";
        private static readonly TAG_ROTULO_BOTAO: string = "rotulo-botao";
        private static readonly TAG_ICONE: string = "ap-icone";

        private _isBotaoMenu: boolean;
        private _elementoInput: HTMLInputElement;
        private _corIcone: EnumCor | string | d.Cor;
        private _linkRota: string;

        //#region Propriedades de apresentação
        public Icone: EnumIcone | string;
        public IconeCategoria: EnumIconeCategoria | string;
        public TamanhoIcone: EnumTamanhoIcone | string;

        public readonly ElementoLink: HTMLAnchorElement | null;
        //public PosicaoRotuloIcone: EnumPosicaoRotuloIcone;

        public get CorIcone(): EnumCor | string | d.Cor
        {
            return this._corIcone;
        }
        public set CorIcone(value: EnumCor | string | d.Cor)
        {
            this._corIcone = value;
            this.AtualizarCorIcone();
        }

        public get ElementoInput(): HTMLInputElement
        {
            return this._elementoInput;
        }

        public TipoBotao: EnumTipoBotao

        public get ElementoIcone(): HTMLElement
        {
            return this.ElementoApresentacao.getElementsByTagName(Botao.TAG_ICONE)[0] as HTMLElement;
        }

        public get ElementoRecipienteIcone(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get IsBotaoMenu(): boolean
        {
            return this._isBotaoMenu;
        }

        public get IsLinkRota(): boolean
        {
            return !String.IsNullOrWhiteSpace(this._linkRota);
        }

        public get LinkRota(): string
        {
            return this._linkRota;
        }
        public set LinkRota(value: string)
        {
            this._linkRota = value;
            this.AtualizarUrlRota();
            this.ElementoLink.href = value;
        }
        //#endregion

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoCarregado.AddHandler(this.Botao_Carregado, this);
            //this.CssClasseControle = "sn-botao";
        }

        //#endregion

        //#region Métodos Sobre escritos

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
             
            this._elementoInput = document.createElement("input");
            this._elementoInput.type = "button";

            if (this.IsSkipTab())
            {
                this._elementoInput.tabIndex = -1;
            }
            this.Elemento.insertBefore(this._elementoInput, this.Elemento.lastElementChild);
        }

        protected override ControlesFilhosCarregado()
        {
            super.ControlesFilhosCarregado();
            this._isBotaoMenu = this.ControlesFilho?.FirstOrDefault() instanceof BotaoMenu;
            this.IsRotuloHtmlInterno = !this._isBotaoMenu;

        }
        private IsSkipTab(): boolean
        {
            return this.RetornarValorAtributoBoolean(AtributosHtml.SkipTab, false);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.ElementoInput_KeyDown, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.Focus, this.ElementoInput_Focus, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.Blur, this.ElementoInput_Blur, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.ElementoInput_MouseDown);
            this.AtualizarUrlRota();
        }

        private AtualizarUrlRota():void
        {
            if (this.ElementoLink != null &&
                !BindUtil.IsCaminhoBind(this.LinkRota))
            {
                if (RotaUtil.IsRota(this.LinkRota))
                {
                    const identificadorNavegador = this.RetornarValorAtributo(AtributosHtml.IdentificadorNavegador, null);
                    const rota = GerenciadorRotas.RetornarRota(identificadorNavegador, this.LinkRota);
                    if (rota != null)
                    {
                        const url = rota.ConstruirRota(identificadorNavegador, null);
                        this.ElementoLink.href = url;
                        return;
                    }
                }
                this.ElementoLink.href = this.LinkRota;
            }
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            this._linkRota = this.RetornarValorAtributo(AtributosHtml.LinkRota, null, true);

            if (!this.IsIniciaTagElementoConteudo(htmlInterno))
            {
                htmlInterno = `<${Botao.TAG_ROTULO_BOTAO}>${htmlInterno.trim()}</${Botao.TAG_ROTULO_BOTAO}>`;
                if (this.IsLinkRota)
                {
                    htmlInterno = `<a sn-nome="ElementoLink" href="">${htmlInterno}</a>`;
                }
            }
            return super.NormalizarHtmlInterno(htmlInterno);
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.Elemento.getElementsByTagName(Botao.TAG_ROTULO_BOTAO).item(0) as HTMLElement;
        }

        public override RetornarRotuloInterno(): string
        {
            if (this._isBotaoMenu)
            {
                const elementoRotuloBotao = this.Elemento.getElementsByTagName("rotulo-botao")[0];
                if (!(elementoRotuloBotao instanceof HTMLElement))
                {
                    throw new Error("Controle filho não suportado pelo botão");
                }

                if (!String.IsNullOrWhiteSpace(elementoRotuloBotao.innerHTML))
                {
                    return elementoRotuloBotao.innerHTML;
                }
            }
            return super.RetornarRotuloInterno();
        }

        //#endregion

        public Click(): void
        {
            this.ClickInterno(null);
        }

        private Botao_Carregado(provedor: any, e: EventArgs): void
        {
            //if (this.TipoBotao == ui.EnumTipoBotao.IconeDireita)
            //{
            //    this.MoverElementoIcone();
            //}
        }

        private ElementoInput_KeyDown(e: KeyboardEvent)
        {
            if (KeyCodeUtil.IsKeyCodeEnter(e.keyCode) ||
                KeyCodeUtil.IsKeyCodeEspaco(e.keyCode))
            {
                e.preventDefault();
                this.ClickInterno(e);
            }
        }

        private ElementoInput_Blur(e: FocusEvent)
        {
            this.Elemento.classList.remove(Botao.CSS_CLASS_INPUT_FOCUS);

            e.preventDefault();
            e.stopPropagation();
        }

        private ElementoInput_MouseDown(e: MouseEvent)
        {
            e.IsCancelado = true;
            //e.stopPropagation();
        }

        private ElementoInput_Focus(e: FocusEvent)
        {
            this.Elemento.classList.add(Botao.CSS_CLASS_INPUT_FOCUS);
            e.preventDefault();
            e.stopPropagation();
        }

        //#region Ocupado

        protected override OcuparElemento(): void
        {
            super.OcuparElemento();
            ElementoUtil.AdicionarAtributo(this.Elemento, AtributosHtml.Disabled, AtributosHtml.Disabled.Nome);
        }

        protected override DesocuparElemento(): void
        {
            super.DesocuparElemento();
            ElementoUtil.RemoverAtributo(this.Elemento, AtributosHtml.Disabled);
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.opacity = "0.6";
            }
        }

        public override Habilitar(): void
        {
            super.Habilitar();
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.opacity = "1";
            }

        }

        //#endregion

        private AtualizarCorIcone(): void
        {
            const elementoIcone = this.ElementoIcone;
            if (elementoIcone instanceof HTMLElement)
            {
                EstiloUtil.RemoverClssClassePrefixo(elementoIcone, EnumPrefixoCor.CorTexto);
                elementoIcone.style.color = String.Empty;

                if (u.EnumUtil.IsDefindo(EnumCor, this.CorIcone as EnumCor))
                {
                    const classeCor = CorUtil.RetornarClasseCssCorTexto(this.CorIcone as EnumCor);
                    elementoIcone.classList.add(classeCor);
                }
                else if (this.CorIcone instanceof d.Cor && !this.CorIcone.IsTransparenteAbsoluto)
                {
                    elementoIcone.style.color = this.CorIcone.Rgba;
                }
                else if (typeof this.CorIcone === "string" && ValidacaoUtil.IsCorRgbOuRgba(this.CorIcone))
                {
                    elementoIcone.style.color = this.CorIcone;
                }
            }
        }

        private ClickInterno(e: KeyboardEvent)
        {
            const eventoClique = this.EventosAmarrados.OfType(EventoClick).FirstOrDefault();
            eventoClique?.Click(e);

            //const eventosCliqueAsync = this.EventosAmarrados.OfType(EventoClickAsync).FirstOrDefault();
            //eventosCliqueAsync?.Click(e);

            const eventoSelecionarArquivos = this.EventosAmarrados.OfType(EventoSelecionarArquivos).FirstOrDefault();
            eventoSelecionarArquivos?.DispararAsync();
        }
    }
}