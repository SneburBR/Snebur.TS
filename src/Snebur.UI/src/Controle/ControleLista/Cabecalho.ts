namespace Snebur.UI
{
    export class Cabecalho extends BaseControle
    {
        public static HANDLER_PESQUISA = "ControleLista_Pesquisa";

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            if (!(controlePai instanceof BaseControleLista))
            {
                throw new ErroNaoSuportado("O controle pai não é suportado", this);
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected override InicializarControlesFilho(): void
        {
            const caixaPesquisa = this.ControlesFilho.OfType<CaixaPesquisa>(CaixaPesquisa).SingleOrDefault();
            if (caixaPesquisa != null)
            {
                ElementoUtil.AdicionarAtributo(caixaPesquisa.Elemento, AtributosHtml.TextoPesquisa, Cabecalho.HANDLER_PESQUISA);
            }
            super.InicializarControlesFilho();
        }


        protected override RetornarTagNovoElemento(): string
        {
            if (this.ControlePai instanceof PainelLista)
            {
                return "sn-bloco";
            }
            return "div";
        }
    }
}