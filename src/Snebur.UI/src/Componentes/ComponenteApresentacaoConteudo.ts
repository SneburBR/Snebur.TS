namespace Snebur.UI
{
    export abstract class ComponenteApresentacaoConteudo extends ComponenteApresentacao   
    {
        private static readonly TEMPO_MOSTRAR_LEGENDA = TimeSpan.FromSeconds(0.5).TotalMilliseconds;
        public static TAG_ELEMENTO_CONTEUDO_APRESENTACAO = "conteudo-apresentacao";
        public static TAG_ELEMENTO_CONTEUDO_APRESENTACAO_CAIXA_ALTA = "CONTEUDO-APRESENTACAO";
        private _elementoApresentacao: HTMLElement;
        public IsAdicionarElementoConteudoApresentacao: boolean = true;

        private __legenda: string = null;

        public override get ElementoApresentacao(): HTMLElement
        {
            return this._elementoApresentacao;
        }

        public override get ElementoDimensao(): HTMLElement
        {
            return this.Elemento;
        }

        public override get ElementoMargem(): HTMLElement
        {
            return this.Elemento;
        }

        public override get ElementoMargemInterna(): HTMLElement
        {
            return this.ElementoApresentacao;
        }


        public get Legenda(): string
        {
            return this.__legenda;
        }
        public set Legenda(value: string)
        {
            if (this.__legenda !== value)
            {
                this.__legenda = value;
                this.InicializarLegenda(value);
            }
        }

        protected ElementoLegenda: HTMLSpanElement;
        protected get ElementoReferenciaLegenda(): HTMLSpanElement
        {
            return this.Elemento;
        }

        private IsLegendaInicializada: boolean = false;

        public constructor(controlePai: BaseControle, elemento: HTMLElement | string, componenteApresentacaoPai: ComponenteApresentacao);
        public constructor(controlePai: BaseControle, elemento: HTMLElement | string | undefined, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.Legenda = this.RetornarValorLegenda();
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            //htmlInterno = super.NormalizarHtmlInterno(htmlInterno);
            if (this.IsAdicionarElementoConteudoApresentacao)
            {
                if (!this.IsIniciaTagElementoConteudo(htmlInterno))
                {
                    return `<${ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO}>${htmlInterno}</ ${ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO }>`;
                }
            }
            return htmlInterno;
        }

        protected IsIniciaTagElementoConteudo(html: string)
        {
            return html.startsWith(`<${ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO}`);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this._elementoApresentacao = this.RetornarElementoApresentacao();
            this._elementoApresentacao.draggable = false;
        }

        private RetornarElementoApresentacao(): HTMLElement
        {
            const elemento = this.Elemento;
            if (this.IsAdicionarElementoConteudoApresentacao)
            {
                if (!(elemento.firstElementChild instanceof HTMLElement && elemento.firstElementChild.tagName === ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO_CAIXA_ALTA))
                {
                    throw new Error("o Elemento apresentação não encontrado");
                }
                return elemento.firstElementChild;
            }
            return elemento;
        }

        //#region Legenda


        private InicializarLegenda(legenda: string): void
        {
            if (String.IsNullOrWhiteSpace(legenda))
            {
                this.RemoverLegenda();
                return;
            }


            if (!this.IsLegendaInicializada)
            {
                this.AdicionarEventoDom(ui.EnumEventoDom.MouseEnter, this.Legenda_MouseEnter, this.ElementoReferenciaLegenda);
                this.AdicionarEventoDom(ui.EnumEventoDom.MouseLeave, this.Legenda_MouseLeave, this.ElementoReferenciaLegenda);
                this.IsLegendaInicializada = true;
            }

            if (this.ElementoLegenda instanceof HTMLElement)
            {
                this.ElementoLegenda.innerHTML = legenda;
            }

            /*this.RemoverLegenda();*/

        }

        private RemoverLegenda(): void
        {
            clearTimeout(this.IdentificadorTimeoutMostrarLegenda);

            if (this.IsLegendaInicializada)
            {
                this.RemoverEventoDom(ui.EnumEventoDom.MouseEnter, this.Legenda_MouseEnter, this.ElementoReferenciaLegenda);
                this.RemoverEventoDom(ui.EnumEventoDom.MouseLeave, this.Legenda_MouseLeave, this.ElementoReferenciaLegenda);
                this.IsLegendaInicializada = false;
            }

            if (this.ElementoLegenda instanceof HTMLElement)
            {
                this.ElementoLegenda.remove();
                delete this.ElementoLegenda;
            }

        }

        private AdicionarElementoLegenda(): void
        {
            if (this.ElementoLegenda == null)
            {
                const elementoLegenda = document.createElement("sn-legenda");
                elementoLegenda.className = "sn-legenda";
                elementoLegenda.OcultarElemento();

                elementoLegenda.setAttribute("sn-tag-pai", this.Elemento.tagName.toLowerCase());
                if (!String.IsNullOrEmpty(this.Nome))
                {
                    elementoLegenda.setAttribute("sn-nome-pai", this.Nome);
                }

                const janelaPai = this.RetornarControlePai(Janela, true, true);
                const elementoDestino = janelaPai?.Elemento ?? $Aplicacao.DocumentoPrincipal?.Elemento;
                elementoDestino.appendChild(elementoLegenda);
                this.ElementoLegenda = elementoLegenda;
            }
            this.ElementoLegenda.innerHTML = this.Legenda;
        }


        private IdentificadorTimeoutMostrarLegenda: number;

        private Legenda_MouseEnter(e: MouseEvent)
        {
            clearTimeout(this.IdentificadorTimeoutMostrarLegenda);
            this.IdentificadorTimeoutMostrarLegenda = setTimeout(this.MostrarLegenda.bind(this), ComponenteApresentacaoConteudo.TEMPO_MOSTRAR_LEGENDA);
        }

        private Legenda_MouseLeave(e: MouseEvent)
        {
            clearTimeout(this.IdentificadorTimeoutMostrarLegenda);
            this.OcultarLegenda();
        }

        public MostrarLegenda()
        {
            if (this.IsLegendaInicializada && this.Elemento instanceof HTMLElement)
            {
                this.AdicionarElementoLegenda();
                this.ElementoLegenda.style.display = "block";
                this.ElementoLegenda.MostrarElemento();
                this.AtualizarPosicaoElementoLegenta();
            }
        }

        protected AtualizarPosicaoElementoLegenta(): void
        {
            const posicoes = this.ElementoReferenciaLegenda.getBoundingClientRect();
            /*let left = Math.max(posicoes.left + ((posicoes.width - this.ElementoLegenda.clientWidth) / 2), 0);*/
            /*this.ElementoLegenda.style.left = left.ToPixels();*/
            this.ElementoLegenda.style.left = Math.max((posicoes.left - (this.ElementoLegenda.clientWidth / 2) + 15), 0).ToPixels();
            this.ElementoLegenda.style.top = Math.max((posicoes.top + posicoes.height + 5), 0).ToPixels();
        }

        private OcultarLegenda()
        {
            if (this.ElementoLegenda instanceof HTMLElement)
            {
                this.ElementoLegenda.OcultarElemento();
            }
        }

        protected RetornarValorLegenda(): string
        {
            const valorAtributoLegenda = this.RetornarValorAtributo(AtributosHtml.Legenda);
            //if (u.ValidacaoUtil.IsBind(valorAtributoLegenda))
            //{
            //    //this.InicializarBindLegenda(valorAtributoLegenda);
            //    return String.Empty;

            //}
            return valorAtributoLegenda;
        }

        //private InicializarBindLegenda(caminhoBind: string): void
        //{
        //    this.ControlePai.EventoDataSourceAlterado.AddHandler(this.LegendaControlePai_DataSourceAlterado, this);
        //    let nomePropriedadeLegenda = this.RetornarNomePropriedade(x => x.Legenda);
        //    let bindLegenda = new BindPropriedadeComum(this.ControlePai, this.Elemento, caminhoBind, nomePropriedadeLegenda);
        //    bindLegenda.InicializarBind();
        //    this.Binds.Add(bindLegenda);
        //}

        //private LegendaControlePai_DataSourceAlterado(provedor: any, e: EventArgs): void
        //{
        //    this.AtualizarValoresBindDataSource();
        //}

        //#endregion

        public override ReInicializar(): void
        {
            this.RemoverLegenda();
            super.ReInicializar();
        }

        public override Dispose()
        {
            this.RemoverLegenda();
            super.Dispose();
        }

    }
}
