namespace Snebur.UI
{
    export class PainelListaSelecao<TItem extends TipoItemLista = Snebur.Objeto> extends PainelLista<TItem, ItemBlocoSelecao> implements IControleItensSelecionado
    {
        public readonly BlocosTemplateSelecionado = new DicionarioSimples<BlocoTemplateSelecionado>();
        public BlocoTemplateSelecionadoPadrao: BlocoTemplateSelecionado;


        public _itensSeleiconado: ListaObservacao<TItem> = null

        public get ItensSelecionado(): ListaObservacao<TItem>
        {
            return this._itensSeleiconado;
        }
        public set ItensSelecionado(value: ListaObservacao<TItem>)
        {
            if (value instanceof Array && ListaUtil.IsListaObservacao(value))
            {
                if (this._itensSeleiconado instanceof Array)
                {
                    this.RemoverHandlerItensSelecionado();
                }
                this._itensSeleiconado = value;
                this.AdicionarHandlerItensSelecionado();
                this.AtualizarItensSelecionados();
            }
        }

        public readonly EventoItemSelecionadoAlterado = new Evento<ItemSelecionadoEventArgs<TItem>>(this);

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this._itensSeleiconado = new ListaObservacao<TItem>();
            this.EventoListaAlterada.AddHandler(this.PainelListaSelecao_ListaAltera, this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            const blocosTemplateSelecionado = this.ControlesFilho.OfType<BlocoTemplateSelecionado>(BlocoTemplateSelecionado).ToList();
            for (const blocoTemplateSelecionado of blocosTemplateSelecionado)
            {
                this.ControlesFilho.Remove(blocoTemplateSelecionado);
                blocoTemplateSelecionado.Elemento.remove();

                if (this.BlocosTemplateSelecionado.ContainsKey(blocoTemplateSelecionado.Chave))
                {
                    throw new Erro(`Já existe bloco template ${blocoTemplateSelecionado.Chave}`);
                }
                this.BlocosTemplateSelecionado.Add(blocoTemplateSelecionado.Chave, blocoTemplateSelecionado);
            }
            this.BlocoTemplateSelecionadoPadrao = this.BlocosTemplateSelecionado.TryItem(BlocoTemplate.CHAVE_PADRAO);
        }

        private PainelListaSelecao_ListaAltera(provedor: any, e: EventArgs): any
        {
            this.AtualizarItensSelecionados();
        }

        protected override RetornarNovoItemBloco(item: TItem): ItemBlocoSelecao
        {
            
            const blocoTemplate = this.RetornarBlocoTemplate(item);
            const blocoTemplateSelecionado = this.RetornarBlocoTemplateSelecionado(item);
            const itemBlocoSeperador = super.RetornarNovoItemBlocoSeparador();
            const itemblocoSelecao = new ItemBlocoSelecao(this, blocoTemplate, blocoTemplateSelecionado, item, itemBlocoSeperador );
            itemblocoSelecao.EventoItemSelecionadoAlterado.AddHandler(this.ItemblocoSelecao_ItemSelecionadoAlterado, this);
            return itemblocoSelecao;
        }

        private RetornarBlocoTemplateSelecionado(item: TItem): BlocoTemplateSelecionado
        {
            let tipoAtual = item.GetType();
            while (tipoAtual instanceof r.BaseTipo)
            {
                const caminhoTipo = tipoAtual.CaminhoTipo;

                if (this.BlocosTemplateSelecionado.ContainsKey(caminhoTipo))
                {
                    return this.BlocosTemplateSelecionado.Item(caminhoTipo);
                }
                tipoAtual = tipoAtual.TipoBase;
            }

            if (this.BlocoTemplateSelecionadoPadrao == null)
            {
                throw new Erro(`Não foi encontrado nenhum bloco template selecionado para o item ${item.toString()}`);
            }
            return this.BlocoTemplateSelecionadoPadrao;
        }

        private AdicionarHandlerItensSelecionado(): void
        {
            this.ItensSelecionado.EventoItemAdicionado.AddHandler(this.ItemSelecionado_ItemAdicionado, this);
            this.ItensSelecionado.EventoItemInserido.AddHandler(this.ItemSelecionado_ItemAdicionado, this);
            this.ItensSelecionado.EventoItemRemovido.AddHandler(this.ItemSelecionado_ItemRemovido, this);
        }

        private RemoverHandlerItensSelecionado(): void
        {
            this.ItensSelecionado.EventoItemAdicionado.RemoveHandler(this.ItemSelecionado_ItemAdicionado, this);
            this.ItensSelecionado.EventoItemInserido.RemoveHandler(this.ItemSelecionado_ItemAdicionado, this);
            this.ItensSelecionado.EventoItemRemovido.RemoveHandler(this.ItemSelecionado_ItemRemovido, this);
        }

        private ItemSelecionado_ItemAdicionado(provedor: any, e: ItemEventArgs<TItem>)
        {
            const itemBlocoSelecao = this.DicionarioItensBloco.TryItem(e.Item);
            if (itemBlocoSelecao instanceof ItemBlocoSelecao)
            {
                itemBlocoSelecao.AtualizarSelecao(true);
            }
        }

        private ItemSelecionado_ItemRemovido(provedor: any, e: ItemEventArgs<TItem>)
        {
            const itemBlocoSelecao = this.DicionarioItensBloco.TryItem(e.Item);
            if (itemBlocoSelecao instanceof ItemBlocoSelecao)
            {
                itemBlocoSelecao.AtualizarSelecao(false);
            }
        }

        private AtualizarItensSelecionados(): void
        {
            for (const itemBlocoSelecao of this.ItensBloco)
            {
                itemBlocoSelecao.AtualizarSelecao(false);
            }

            for (const itemSelecionado of this.ItensSelecionado)
            {
                const itemBlocoSelecao = this.DicionarioItensBloco.TryItem(itemSelecionado);
                if (itemBlocoSelecao instanceof ItemBlocoSelecao)
                {
                    itemBlocoSelecao.AtualizarSelecao(true);
                }
            }
        }

        private ItemblocoSelecao_ItemSelecionadoAlterado(itemBlocoSelecao: ItemBlocoSelecao, e: ItemEventArgs)
        {
            if (itemBlocoSelecao instanceof ItemBlocoSelecao)
            {
                if (itemBlocoSelecao.IsSelecionado)
                {
                    if (!this.ItensSelecionado.Contains(itemBlocoSelecao.ItemReferencia))
                    {
                        this.ItensSelecionado.Add(itemBlocoSelecao.ItemReferencia);
                    }
                }
                else
                {
                    this.ItensSelecionado.Remove(itemBlocoSelecao.ItemReferencia);
                }
                const item = itemBlocoSelecao.ItemReferencia;
                this.EventoItemSelecionadoAlterado.Notificar(itemBlocoSelecao, new ItemSelecionadoEventArgs(item, itemBlocoSelecao.IsSelecionado));
            }

        }
    }

    export class ItemSelecionadoEventArgs<T = any> extends ItemEventArgs<T>
    {
        public readonly IsSelecionado: boolean;

        public constructor(item: T, isSelecionado: boolean)
        {
            super(item);
            this.IsSelecionado = isSelecionado;
        }
    }
}