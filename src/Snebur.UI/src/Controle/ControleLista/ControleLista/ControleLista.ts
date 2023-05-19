

namespace Snebur.UI
{
    export class ControleLista<TItem extends TipoItemLista = TipoItemLista, TItemControle extends ItemControle =ItemControle> extends BaseControleLista<TItem>
    {
        private _isMarcarItem: boolean = null;
        public Cabecalho: Cabecalho;
        //public ItemTemplate: ItemTemplate;

        public BotaoVoltarPagina: ui.Botao;
        public BotaoAvancarPagina: ui.Botao;
        public Rodape: Rodape;
        public SeparadorTemplate: SeparadorTemplate;
        public IDElementoItensColecao: string;
        public ItensColecao: ItensColecao<TItem, TItemControle>;
        public ExisteSeparador: boolean;
        public TagElemenoItensColecao: string;
        public CssClassElementoItensColecao: string;

        public ItensTemplate: List<ItemTemplate>;
        public ItemTemplatePadrao: ItemTemplate;

        public readonly EventoItemControleCarregado = new Evento<ItemEventArgs<ItemControle>>(this);

        public get DicionarioItensControle(): DicionarioTipado<TItem, TItemControle>
        {
            return this.ItensColecao.DicionarioItensControle;
        }

        public get IsMarcarItem(): boolean
        {
            if (this.IsControleInicializado)
            {
                if (this._isMarcarItem == null)
                {
                    this._isMarcarItem = this.RetornarValorAtributoBoolean(AtributosHtml.IsMarcarLinha, false) ||
                        this.RetornarValorAtributoBoolean(AtributosHtml.IsMarcarItem, false);
                }
                return this._isMarcarItem;
            }
            return true;
        }

        public override get TotalItens(): number
        {
            return this.ItensColecao.TotalItens;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoCarregado.AddHandler(this.ControleLista_Carregado, this);
            this.ItensTemplate = new List<ItemTemplate>();
            this.IsAdicionarElementoConteudoApresentacao = false;
            //this.__ControleLista_Carregado 
        }

        public get ItensControle(): Array<ItemControle>
        {
            return this.ItensColecao.ItensControle;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Cabecalho = this.ControlesFilho.OfType<Cabecalho>(Cabecalho).SingleOrDefault();
            this.Rodape = this.ControlesFilho.OfType<Rodape>(Rodape).SingleOrDefault();

            this.SeparadorTemplate = this.ControlesFilho.OfType<SeparadorTemplate>(SeparadorTemplate).SingleOrDefault();
            this.ItensTemplate = this.ControlesFilho.OfType<ItemTemplate>(ItemTemplate).ToList();
            this.ItemTemplatePadrao = this.ControlesFilho.OfType<ItemTemplate>(ItemTemplate).Where(x => x.Tipo == null).SingleOrDefault();

            if (this.ItensTemplate.Count === 0)
            {
                throw new Erro("Nenhum item template foi definido", this);
            }
            for (const itemTemplate of this.ItensTemplate)
            {
                this.ControlesFilho.Remove(itemTemplate);
                itemTemplate.Elemento.remove();
            }

            this.ExisteSeparador = (u.ValidacaoUtil.IsDefinido(this.SeparadorTemplate));
            if (this.ExisteSeparador)
            {
                this.ControlesFilho.Remove(this.SeparadorTemplate);
                ElementoUtil.RemoverElemento(this.IDElemento, this.SeparadorTemplate.IDElemento);
            }
            this.AdicionarControleItensColecao();
            this.ReposicionarRodape();
        }

        private ControleLista_Carregado(provedor: any, e: EventArgs): void
        {
            if (this.Lista instanceof Array && this.Lista.Count > 0 && this.ItensColecao.ControlesFilho.Count === 0)
            {
                this.AdicionarItens();
            }
        }
        //#region Adicionar, inserir, remover

        public AdicionarItem(item: TItem): void
        {
            if (this.IsControleInicializado)
            {
                const itemControle = this.RetornarNovoItemControle(item);
                this.ItensColecao.AdicionarItemControle(item, itemControle);
                itemControle.DataSource = item;

                const args = new ItemEventArgs<ItemControle>(itemControle);
                this.EventoItemControleCarregado.Notificar(this, args);

            }
        }

        public InserirItem(posicao: number, item: TItem): void
        {
            if (this.IsControleInicializado)
            {
                const itemControle = this.RetornarNovoItemControle(item);
                this.ItensColecao.InserirItemControle(posicao, item, itemControle);
                itemControle.DataSource = item;
            }
        }

        public RemoverItem(item: TItem): void 
        {
            if (this.IsControleInicializado)
            {
                this.ItensColecao.RemoverItemControle(item);
            }
        }
        public async ScrollItemAsync(item: TItem)
        {
            if (item == null)
            {
                return;
            }
            const itemBloco = this.DicionarioItensControle.Item(item);
            if (itemBloco?.Elemento != null)
            {
                ElementoUtil.ScrollTo(itemBloco.Elemento);
            }
        }

        //#endregion

        //#region Métodos privados

        private AdicionarControleItensColecao(): void
        {
            this.TagElemenoItensColecao = this.RetornarValorAtributo(AtributosHtml.TagElementoItensColecao, "sn-itens-colecao");
            this.CssClassElementoItensColecao = this.RetornarValorAtributo(AtributosHtml.CssClassElementoItensColecao, null);
            this.IDElementoItensColecao = ElementoUtil.RetornarNovoIDElemento(this, "Itens-Colecao");
            this.ItensColecao = this.RetornarControleItensColecao();
            this.ItensColecao.RetornarRefElementoAntesDe = this.RetornarElementoAntesDeInserirItensColecao.bind(this);
            this.ControlesFilho.Add(this.ItensColecao);
            this.ItensColecao.InicializarControle();
            this.ItensColecao.DataSource = null;
        }

        protected RetornarControleItensColecao(): ItensColecao<TItem, TItemControle>
        {
            return new ItensColecao<TItem, TItemControle>(this, this.IDElementoItensColecao, this.TagElemenoItensColecao, this.CssClassElementoItensColecao);
        }

        //Esse elemento, é referencia para adicionar o elemento do controle ItensCotroleColecao

        private RetornarElementoAntesDeInserirItensColecao(): any
        {
            if (u.ValidacaoUtil.IsDefinido(this.Rodape))
            {
                return this.Rodape.IDElemento;
            }
            return null;
        }

        protected RetornarNovoItemControle(item: TItem): TItemControle
        {
            const itemSeparador = this.RetornarNovoItemSeparador(item);
            const itemTemplate = this.RetornarItemTemplate(item);
            const itemControle = new ItemControle(this.ItensColecao, itemTemplate, item) as TItemControle;
            itemControle.ItemSeparador = itemSeparador;
            return itemControle;
        }

        protected RetornarNovoItemSeparador(item: TItem): ItemSeparador
        {
            if (this.ExisteSeparador)
            {
                if (this.ItensColecao.ItensControle.Count > 0)
                {
                    //var elementoSeparado = this.SeparadorTemplate.RetornarNovoElemento();
                    return new ItemSeparador(this.ItensColecao, this.SeparadorTemplate);
                }
            }
            return null;
        }

        protected RetornarItemTemplate(item: TItem): ItemTemplate
        {
            const itensTemplate = this.ItensTemplate.Where(x => (item instanceof d.BaseDominio && x.Tipo === item.GetType())).ToList();
            if (itensTemplate.Count > 1)
            {
                throw new Erro("Mais de um item template foi encontrado para item {0}", item.GetType().Nome);
            }
            if (itensTemplate.Count === 1)
            {
                return itensTemplate.Single();
            }
            if (!(this.ItemTemplatePadrao instanceof ItemTemplate))
            {
                throw new Erro("Nenhum item template foi encontrado", this);
            }
            return this.ItemTemplatePadrao;
        }

        private ReposicionarRodape(): void
        {
            if (this.Rodape != null)
            {
                const elemento = this.Elemento;
                const elementoRodape = this.Rodape.Elemento;
                ElementoUtil.RemoverElemento(elemento, elementoRodape);
                ElementoUtil.AdicionarElemento(elemento, elementoRodape);
            }
        }

        //#endregion
    }
}