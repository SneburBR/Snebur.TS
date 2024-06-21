namespace Snebur.UI
{
    export class DataListaOrdenacao<TItem extends d.IOrdenacaoEntidade = any> extends DataLista<TItem>
    {
        private _isAtivarOdernacao: boolean = true;
        private _funcaoIsAtivarOdernacao: () => boolean;

        public IsSensibilidadeVertical: boolean = true;
        public CaminhoEntidadeOrdenacao: string;
        private ElementoRodaPeInterno: HTMLElement;

        public get IsAtivarOrdenacao(): boolean
        {
            return this.RetornarIsAtivarOrdenacao();
        }
        public set IsAtivarOrdenacao(value: boolean)
        {
            this._isAtivarOdernacao = value;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.CaminhoEntidadeOrdenacao = this.RetornarValorAtributo(AtributosHtml.EntidadeOrdenacao, null);
            this.CriarElementoRodape();
            this.ConfiguracaoIsAtivarOrdenacao();
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

        //#region Ordenacao

        private ConfiguracaoIsAtivarOrdenacao()
        {
            const valorFuncaoIsAtivarOdernacao = this.RetornarValorAtributo(AtributosHtml.IsAtivarOrdenacao, null, false);
            if (valorFuncaoIsAtivarOdernacao != null)
            {
                if (ValidacaoUtil.IsBoolean(valorFuncaoIsAtivarOdernacao, true))
                {
                    this._isAtivarOdernacao = Boolean(valorFuncaoIsAtivarOdernacao);
                }
                else if (!String.IsNullOrWhiteSpace(valorFuncaoIsAtivarOdernacao))
                {
                    this._funcaoIsAtivarOdernacao = this.RetornarMetodo(valorFuncaoIsAtivarOdernacao, false) as () => boolean;
                }
            }
        }

        private RetornarIsAtivarOrdenacao(): boolean
        {
            if (this._funcaoIsAtivarOdernacao instanceof Function)
            {
                return this._funcaoIsAtivarOdernacao.call(this);
            }
            return this._isAtivarOdernacao;
        }

        //#endregion
    }
}