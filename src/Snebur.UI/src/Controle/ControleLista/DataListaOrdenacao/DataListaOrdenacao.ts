namespace Snebur.UI
{
    export class DataListaOrdenacao<TItem extends d.IOrdenacaoEntidade = any> extends DataLista<TItem>
    {
        public IsSensibilidadeVertical: boolean = true;
        public CaminhoEntidadeOrdenacao: string;
        private ElementoRodaPeInterno: HTMLElement;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.CaminhoEntidadeOrdenacao = this.RetornarValorAtributo(AtributosHtml.EntidadeOrdenacao, null);
            this.CriarElementoRodape();
        }

        protected override RetornarLinhasColecao(id: string): LinhasColecao<TItem>
        {
            return new LinhasColecaoOrdenacao<TItem>(this,
                id,
                this.ColunasColecao,
                this.TemplateColunasColecao,
                this.TipoItemLista);
        }

        private CriarElementoRodape(): void
        {
            const elementoRodapeInterno = document.createElement("div");
            EstiloUtil.AdicionarCssClasse(elementoRodapeInterno, "sn-data-lista-ordenacao-rodape");

            const elementoSpan = document.createElement("span");
            ElementoUtil.AtualizarInnerHtml(elementoSpan, "* Arraste para ordenar os itens.");

            ElementoUtil.AdicionarElemento(elementoRodapeInterno, elementoSpan);
            ElementoUtil.AdicionarElemento(this.Elemento.parentElement, elementoRodapeInterno);

            this.ElementoRodaPeInterno = elementoRodapeInterno;

            this.AtualizarVisibilidadeRodapeInterno();
        }

        protected override AtualizarVisibilidadeBlocosExtras(): void
        {
            super.AtualizarVisibilidadeBlocosExtras();
            this.AtualizarVisibilidadeRodapeInterno();
        }

        private AtualizarVisibilidadeRodapeInterno(): void
        {
            const statusLista = this.StatusControleLista;
            if (this.IsControleInicializado && this.ElementoRodaPeInterno instanceof HTMLElement)
            {
                this.ElementoRodaPeInterno.Visibilidade = statusLista === EnumStatusControleLista.ListaCarregada;
            }
        }
    }
}