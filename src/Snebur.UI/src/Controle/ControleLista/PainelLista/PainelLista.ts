namespace Snebur.UI
{
    export class PainelLista<TItem extends TipoItemLista = Snebur.Objeto, TItemBloco extends ItemBloco = ItemBloco> extends BaseControleLista<TItem>
    {
        private _isMarcarItem: boolean = null;

        private _blocoCabecalho: BlocoCabecalho;
        private _blocoListaVazia: BlocoListaVazia;
        private _blocoListaCarregando: BlocoListaCarregando;

        private IsExisteSeparador: boolean;
        private ClasseSeparadora: string;
        public readonly DicionarioItensBloco = new DicionarioTipado<TItem, TItemBloco>();
        public readonly ItensBloco = new List<TItemBloco>();

        public readonly BlocosTemplate = new DicionarioSimples<BlocoTemplate>();
        protected BlocoTemplateSeparador: BlocoTemplateSeparador;
        public BlocoTemplatePadrao: BlocoTemplate;

        public TipoPainel: EnumTipoPainel;

        public get BlocoCabecalho(): BlocoCabecalho
        {
            return this._blocoCabecalho;
        }

        public get BlocoListaVazia(): BlocoListaVazia
        {
            if (this._blocoListaVazia != null)
            {
                return this._blocoListaVazia;
            }
            return this._blocoListaVazia;
        }

        public get BlocoListaCarregando(): BlocoListaCarregando
        {
            return this._blocoListaCarregando;
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

        public readonly EventoItemBlocoCarregado = new Evento<ItemEventArgs<TItemBloco>>(this);

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (!this.Elemento.hasAttribute(AtributosHtml.TipoPainel.Nome))
            {
                this.Elemento.setAttribute(AtributosHtml.TipoPainel.Nome, EnumTipoPainel[EnumTipoPainel.PilhaVertical]);
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.ClasseSeparadora = this.RetornarValorAtributo(AtributosHtml.ClasseSeparadora);

            if ($Configuracao.IsDebug)
            {
                const tipoPainel = this.RetornarValorAtributoEnum(EnumTipoPainel, AtributosHtml.TipoPainel, null);
                if (!EnumUtil.IsDefindo(EnumTipoPainel, tipoPainel))
                {
                    this.Elemento.Clear();
                    const outerHtml = this.Elemento.outerHTML;
                    throw new Erro(`O atributo ${AtributosHtml.TipoPainel.Nome} não foi defino ou é invalido em ${this.ControleApresentacao.___NomeConstrutor} ${outerHtml}`);
                }
            }

            //inicializando os templates
            const blocosTemplate = this.ControlesFilho.OfType<BlocoTemplate>(BlocoTemplate).ToList();
            for (const blocoTemplate of blocosTemplate)
            {
                this.ControlesFilho.Remove(blocoTemplate);
                blocoTemplate.Elemento.remove();

                if (this.BlocosTemplate.ContainsKey(blocoTemplate.Chave))
                {
                    throw new Erro(`Já existe bloco template ${blocoTemplate.Chave}`);
                }
                this.BlocosTemplate.Add(blocoTemplate.Chave, blocoTemplate);
            }

            this.BlocoTemplatePadrao = this.BlocosTemplate.TryItem(BlocoTemplate.CHAVE_PADRAO);

            this._blocoCabecalho = this.ComponentesApresentacaoFilhos.OfType(BlocoCabecalho).SingleOrDefault();
            this._blocoListaVazia = this.ComponentesApresentacaoFilhos.OfType(BlocoListaVazia).SingleOrDefault();
            this._blocoListaCarregando = this.ComponentesApresentacaoFilhos.OfType(BlocoListaCarregando).SingleOrDefault();

            this._blocoCabecalho?.OcultarElemento();
            this._blocoListaVazia?.OcultarElemento();
            this._blocoListaCarregando?.OcultarElemento();

            //separador
            this.BlocoTemplateSeparador = this.ControlesFilho.OfType<BlocoTemplateSeparador>(BlocoTemplateSeparador).SingleOrDefault();
            this.IsExisteSeparador = this.BlocoTemplateSeparador instanceof BlocoTemplateSeparador;
            if (this.IsExisteSeparador)
            {
                this.ControlesFilho.Remove(this.BlocoTemplateSeparador);
                this.BlocoTemplateSeparador.Elemento.remove();
            }

            this.AtualizarVisibilidadeBlocoListaVazia();
            this.EventoListaAtualizada.AddHandler(this.PainelLista_ListaAtualizada, this);
        }

    

        protected InserirItem(posicao: number, item: TItem): void
        {
            this.ValidarNovoItem(item);
            const itemBlocoReferencia = this.ItensBloco[posicao];
            if (itemBlocoReferencia instanceof ItemBloco)
            {
                this.InserirItemInterno(posicao, item);
            }
            else
            {
                this.AdicionarItem(item);
            }
        }

        protected AdicionarItem(item: TItem): void
        {
            this.ValidarNovoItem(item);

            if (this.IsControleInicializado)
            {
                const itemBloco = this.RetornarNovoItemBloco(item);
                this.ControlesFilho.Add(itemBloco);
                this.DicionarioItensBloco.Add(item, itemBloco);
                this.ItensBloco.Add(itemBloco);
                this.InicializarItemBloco(itemBloco);
                this.AtualizarVisibilidadeBlocoListaVazia();
            }
        }

        private InserirItemInterno(posicao: number, item: TItem): void
        {
            const itemBlocoReferencia = this.ItensBloco[posicao];
            const itemBloco = this.RetornarNovoItemBloco(item);


            itemBloco.ElementoInserirAntes = itemBlocoReferencia.Elemento;

            this.ControlesFilho.Insert(posicao, itemBloco);
            this.DicionarioItensBloco.Add(item, itemBloco);

            this.ItensBloco.Insert(posicao, itemBloco);
            this.InicializarItemBloco(itemBloco);
        }

        protected RemoverItem(item: TItem): void
        {
            if (this.DicionarioItensBloco.ContainsKey(item))
            {
                const itemBloco = this.DicionarioItensBloco.Item(item);
                this.DicionarioItensBloco.Remove(item);
                this.ControlesFilho.Remove(itemBloco);
                this.ItensBloco.Remove(itemBloco);
                itemBloco.Dispose();
                this.AtualizarVisibilidadeBlocoListaVazia();
            }
        }

        private ValidarNovoItem(item: TItem): void
        {
            ValidacaoUtil.ValidarArgumentoDefinido({ item });

            if (this.DicionarioItensBloco.ContainsKey(item))
            {
                throw new Erro(`O item ${item.toString()} hash '${item.GetHashCode()} já existe no PainelLista em ${this.ControleApresentacao.___NomeConstrutor}, verificar o método override GetHashCode()  `);
            }
        }

        protected RetornarNovoItemBloco(item: TItem): TItemBloco
        {
            const blocoTemplate = this.RetornarBlocoTemplate(item);
            const itemBlocoSeparador = this.RetornarNovoItemBlocoSeparador();
            if (item instanceof Entidade && item.Id === 0)
            {
                item.EventoEntidadeSalva.AddHandler(this.ItemReferencia_EntidadeSalva, this);
            }
            return new ItemBloco(this, blocoTemplate, item, itemBlocoSeparador) as TItemBloco;
        }

        private ItemReferencia_EntidadeSalva(entidade: Entidade, e: EventArgs)
        {
            console.log("Entidade salva");
            /*this.DicionarioItensBloco.RemoveForce(entidade);*/
        }

        private InicializarItemBloco(itemBloco: TItemBloco): void
        {
            itemBloco.ItemBlocoSeperador?.InicializarControle();
            itemBloco.DataSource = itemBloco.ItemReferencia;
            itemBloco.InicializarControle();
            /*itemBloco.DataSource = itemBloco.ItemReferencia;*/

            const args = new ItemEventArgs<TItemBloco>(itemBloco);
            this.EventoItemBlocoCarregado.Notificar(this, args);
        }

        protected RetornarBlocoTemplate(item: TItem): BlocoTemplate
        {
            let tipoAtual = item.GetType();
            while (tipoAtual instanceof r.BaseTipo)
            {
                const caminhoTipo = tipoAtual.CaminhoTipo;
                if (this.BlocosTemplate.ContainsKey(caminhoTipo))
                {
                    return this.BlocosTemplate.Item(caminhoTipo);
                }

                tipoAtual = tipoAtual.TipoBase;
            }

            if (this.BlocosTemplate.ContainsKey(item.constructor.name))
            {
                return this.BlocosTemplate.Item(item.constructor.name);
            }

            if (this.BlocoTemplatePadrao == null)
            {
                const mensagem = `Nenhum bloco template 'z-bloco-template' padrão ou tipado  foi encontrado no painel-lista em ${this.ControleApresentacao.___NomeConstrutor} para o item do tipo ${item?.GetType().Nome} `;
                throw new Erro(mensagem);
            }
            return this.BlocoTemplatePadrao;
        }

        protected RetornarNovoItemBlocoSeparador(): ItemBlocoSeparador
        {
            if (this.IsExisteSeparador)
            {
                if (this.ItensBloco.Count > 0)
                {
                    //var elementoSeparado = this.SeparadorTemplate.RetornarNovoElemento();
                    return new ItemBlocoSeparador(this, this.BlocoTemplateSeparador);
                }
            }
            return null;
        }

        public override  ReInicializar(): void
        {
            this.DicionarioItensBloco.Clear();
            this.ItensBloco.Clear();
            super.ReInicializar();
        }

        private PainelLista_ListaAtualizada(provedor: any, e: EventArgs)
        {
            this.AtualizarVisibilidadeBlocoListaVazia();
        }

        public AtualizarVisibilidadeBlocoListaVazia(): void
        {
            const estadoLista = this.EstadoControleLista;

            if (this.BlocoListaVazia instanceof BlocoListaVazia)
            {
                this.BlocoListaVazia.Visibilidade = estadoLista === EnumEstadoControleLista.ListaCarregadaVazia;
            }

            if (this.BlocoListaCarregando instanceof BlocoListaCarregando)
            {
                this.BlocoListaCarregando.Visibilidade = estadoLista === EnumEstadoControleLista.Carregando;
            }

            if (this.BlocoCabecalho instanceof BlocoCabecalho)
            {
                this.BlocoCabecalho.Visibilidade = estadoLista === EnumEstadoControleLista.ListaCarregada;
            }
        }

        public MarcarConteudo(item: any, isParaScroll: boolean)
        {
            if (this.IsControleInicializado && this.IsMarcarItem)
            {
                for (const itemBloco of this.ItensBloco)
                {
                    if (Util.IsIgual(itemBloco.ItemReferencia, item))
                    {
                        itemBloco.MarcarConteudo();
                        if (isParaScroll)
                        {
                            itemBloco.Elemento.scrollIntoView({
                                block: "center",
                                inline: "center",
                                behavior: "smooth"
                            });
                        }
                    }
                    else
                    {
                        itemBloco.DesmacarConteudo();
                    }
                }
            }
        }

        public async ScrollIntoViewAsync(item: TItem, options?: OptionsScrollPainelLista)
        {
            await ThreadUtil.QuebrarAsync();
            this.ScrollIntoView(item, options);
            await ThreadUtil.EsperarAsync(200);
        }

        public ScrollIntoView(item: TItem, options?: OptionsScrollPainelLista)
        {
            let itemBloco = this.DicionarioItensBloco.TryItem(item);
            if (itemBloco == null && options?.IrParaTipoItemNaoEncontrado)
            {
                itemBloco = this.ItensBloco.FirstOrDefault();
            }

            if (itemBloco instanceof ItemBloco)
            {
                ElementoUtil.ScrollTo(itemBloco.Elemento);
            }
        }
    }

    interface OptionsScrollPainelLista
    {
        IrParaTipoItemNaoEncontrado?: boolean;
    }
}
