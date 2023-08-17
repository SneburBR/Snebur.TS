namespace Snebur.UI
{
    export class ItensColecao<TItem extends TipoItemLista, TItemControle extends ItemControle> extends BaseControle
    {

        public readonly DicionarioItensControle: DicionarioTipado<TItem, TItemControle>;

        public readonly ItensControle: Array<TItemControle>;
        public readonly ItensSeparador: Array<ItemSeparador>;
        public TagNovoElemento: string;
        public CssClassElementoItensColecao: string;

        public get TotalItens(): number
        {
            return this.DicionarioControlesFilho.Count;
        }

        private get EventoItemControleCarregado(): Evento<ItemEventArgs<ItemControle>>
        {
            return (this.ControlePai as ControleLista).EventoItemControleCarregado;
        }

        //public constructor(controlePai: BaseControle, refElemento?: HTMLElement);
        //public constructor(controlePai: BaseControle, refElemento?: string);
        public constructor(controlePai: BaseControle, idElemento: string, tagNovoElemento: string, cssClassElementoItensColecao: string)
        {
            super(controlePai, idElemento);

            this.TagNovoElemento = tagNovoElemento;
            this.CssClassElementoItensColecao = cssClassElementoItensColecao;
            this.ItensControle = new Array<TItemControle>();
            this.ItensSeparador = new Array<ItemSeparador>();
            this.DicionarioItensControle = new DicionarioTipado<TItem, TItemControle>();
            this.CssClasseControle = "sn-itens-colecao";
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (!String.IsNullOrWhiteSpace(this.CssClassElementoItensColecao))
            {
                EstiloUtil.AdicionarCssClasse(this.Elemento, this.CssClassElementoItensColecao);
            }
        }

        //#region Métodos públicos

        public AdicionarItemControle(item: TItem, itemControle: TItemControle): void
        {
            if (!u.ValidacaoUtil.IsDefinido(item))
            {
                throw new Erro("O item não foi definido");
            }

            if (this.DicionarioItensControle.ContainsKey(item))
            {
                throw new Erro("O item ja existe na lista de itens controle");
            }

            if (u.ValidacaoUtil.IsDefinido(itemControle.ItemSeparador))
            {
                this.ItensSeparador.Add(itemControle.ItemSeparador);
                this.ControlesFilho.Add(itemControle.ItemSeparador);
                itemControle.ItemSeparador.InicializarControle();
            }

            this.DicionarioItensControle.Add(item, itemControle);
            this.ItensControle.Add(itemControle);
            this.ControlesFilho.Add(itemControle);
            itemControle.InicializarControle();


        }

        public InserirItemControle(posicao: number, item: TItem, itemControle: TItemControle): void
        {
            const itemControleReferencia = this.ItensControle[posicao];
            let elementoReferencia: HTMLElement = null;
            if (itemControleReferencia instanceof ItemControle)
            {
                elementoReferencia = (itemControleReferencia.ItemSeparador instanceof ItemSeparador) ? itemControleReferencia.ItemSeparador.Elemento : itemControleReferencia.Elemento;
            }

            itemControle.RetornarRefElementoAntesDe = function (elementoReferencia: HTMLElement)
            {
                return elementoReferencia;
            }.bind(this, elementoReferencia);

            if (u.ValidacaoUtil.IsDefinido(itemControle.ItemSeparador))
            {
                this.ItensSeparador.Insert(posicao, itemControle.ItemSeparador);
                this.ControlesFilho.Insert(posicao, itemControle.ItemSeparador);
                itemControle.ItemSeparador.RetornarRefElementoAntesDe = function (elementoReferencia: HTMLElement)
                {
                    return elementoReferencia;
                }.bind(this, elementoReferencia);
                itemControle.ItemSeparador.InicializarControle();
            }

            this.ItensControle.Insert(posicao, itemControle);
            this.DicionarioItensControle.Add(item, itemControle);
            this.ControlesFilho.Insert(posicao, itemControle);
            itemControle.InicializarControle();
        }

        public RemoverItemControle(item: TItem): void
        {
            //var itemControle = this.ItensControle.Where(x => x.ItemReferencia.Equals(item)).FirstOrDefault();
            if (this.DicionarioItensControle.ContainsKey(item))
            {
                const itemControle = this.DicionarioItensControle.Item(item);
                if (itemControle instanceof ItemControle)
                {
                    if (itemControle.ItemSeparador instanceof ItemSeparador)
                    {
                        this.ItensSeparador.Remove(itemControle.ItemSeparador);
                        this.ControlesFilho.Remove(itemControle.ItemSeparador);

                        itemControle.ItemSeparador.Dispose();
                        //ElementoUtil.RemoverElemento(this.IDElemento, itemControle.ItemSeparador.IDElemento);
                    }

                    this.ItensControle.Remove(itemControle);
                    this.DicionarioItensControle.Remove(item);
                    this.ControlesFilho.Remove(itemControle);

                    itemControle.Dispose();
                    // ElementoUtil.RemoverElemento(this.IDElemento, itemControle.IDElemento);
                }
            }

        }

        public override RetornarRefElementoAntesDe(): any
        {
            return super.RetornarRefElementoAntesDe();
        }
        //#endregion

        //#region Métodos sobre escritos

        protected override RetornarHtmlInterno(): string
        {
            //super.RetornarHtmlInterno();
            //return "<h1> ITENS COLECAO </h1>";
            return String.Empty;
        }

        protected override RetornarTagNovoElemento(): string
        {
            if (!String.IsNullOrWhiteSpace(this.TagNovoElemento))
            {
                return this.TagNovoElemento;
            }
            return super.RetornarTagNovoElemento();
        }
        //#endregion

        //#region Métodos privados

        private AdicionarItemSeparador(itemSeparador: ItemSeparador): void
        {
            this.ItensSeparador.Add(itemSeparador);
            this.ControlesFilho.Add(itemSeparador);
        }


        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            this.ItensControle.Clear();
            this.ItensSeparador.Clear();

            super.Dispose();
        }
        //#endregion
    }
}