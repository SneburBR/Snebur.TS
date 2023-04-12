namespace Snebur.UI
{
    export class ControleProximaPagina extends BaseControlePaginacao
    {
        private static TimeoutEsperarProximaPagina: number = 300;

        private __Elemento_Scrolll: EventListener;
        public IDElementoScroll: string;

        private Atualizando: boolean = false;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.__Elemento_Scrolll = this.Elemento_Scroll.bind(this);
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            EstiloUtil.AdicionarCssClasse(this.IDElemento, "sn-proxima-pagina");
            ElementoUtil.OcultarElemento(this.IDElemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.RegistroPorPagina = this.RetornarRegistrosPorPagina();
            this.IDElementoScroll = this.RetornarIDElementoScroll();
            this.AdicionarEventosDom();
        }

        public override AtualizarPaginacao(): void
        {
            this.AtualizarValores();
            this.AtualizarVisibilidadeControle();
            this.Atualizando = false;
        }
        //#region Metodos privados

        private AdicionarEventosDom(): void
        {
            if (String.IsNullOrWhiteSpace(this.IDElementoScroll))
            {
                window.addEventListener("scroll", this.__Elemento_Scrolll);
            }
            else
            {
                const elemento = ElementoUtil.RetornarElemento(this.IDElementoScroll);
                elemento.onscroll = function ()
                {
                };
                elemento.addEventListener("scroll", this.__Elemento_Scrolll);
                //delete (elemento as any)
            }
        }

        private RemoverEventosDom(): void
        {
            if (String.IsNullOrWhiteSpace(this.IDElementoScroll))
            {
                window.removeEventListener("scroll", this.__Elemento_Scrolll);
            }
            else
            {
                const elemento = ElementoUtil.RetornarElemento(this.IDElementoScroll);
                elemento.removeEventListener("scroll", this.__Elemento_Scrolll);
                //delete (elemento as any)
            }
        }

        private Elemento_Scroll(e: UIEvent): void
        {
            const elementoScroll = ElementoUtil.RetornarElemento(this.IDElementoScroll);
            if (((elementoScroll.clientHeight + elementoScroll.scrollTop) + 30) > elementoScroll.scrollHeight)
            {
                this.ProximaPagina();
            }
            //delete (elementoScroll as any);
        }

        private ProximaPagina(): void
        {
            if (!this.Atualizando)
            {
                this.Atualizando = true;
                window.setTimeout(this.EsperarProximaPagina.bind(this), ControleProximaPagina.TimeoutEsperarProximaPagina);
            }
        }

        private EsperarProximaPagina()
        {
            if (this.IsControleInicializado)
            {
                if (this.PaginaAtual < this.TotalPaginas)
                {
                    this.PaginaAtual += 1;
                    this.NotificarEventoPaginacaoAlterada();
                }
            }
        }

        private AtualizarVisibilidadeControle(): void
        {
            if (this.TotalPaginas > 0 && this.TotalPaginas > this.PaginaAtual)
            {
                ElementoUtil.MostrarElemento(this.IDElemento);
            }
            else
            {
                ElementoUtil.OcultarElemento(this.IDElemento);
            }
        }

        private RetornarRegistrosPorPagina(): number
        {
            const valorAtributo = this.RetornarValorAtributo(AtributosHtml.RegistroPorPagina, null);
            if (String.IsNullOrWhiteSpace(valorAtributo))
            {
                return ConstantesPaginacao.REGISTROS_POR_PAGINA_PADRAO;
            }
            else
            {
                return u.ConverterUtil.ParaInteiro(valorAtributo);
            }
        }

        private RetornarIDElementoScroll(): string
        {
            let elemento = this.Elemento;
            while ((elemento != null))
            {
                if (elemento.classList.contains("sn-scroll-vertical") ||
                    (elemento.classList.contains("mdl-layout__content")))
                {
                    break;
                }
                elemento = elemento.parentElement;
            }
            if (!(elemento instanceof HTMLElement))
            {
                return null;
                //throw new Erro("Não foi encontrado o elemento com class sn-scroll-vertical, é preciso definir esse elemento, para capturar o evento scroll", this);
            }
            if (String.IsNullOrWhiteSpace(elemento.id))
            {
                elemento.id = ElementoUtil.RetornarNovoIDElemento(this.ControleLista, "scroll");
            }
            return elemento.id;
        }
        //#endregion

        //#region IDisposable

        public IDisposable(): void
        {
            this.RemoverEventosDom();
            super.Dispose();
        }
        //#endregion
    }
}