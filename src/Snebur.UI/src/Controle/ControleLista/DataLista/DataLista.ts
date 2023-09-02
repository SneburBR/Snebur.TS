namespace Snebur.UI
{
    export class DataLista<TItem extends TipoItemLista = any> extends BaseControleLista<TItem>
    {
        private _isMarcarItem: boolean = null;

        private _blocoCabecalho: BlocoCabecalho;
        private _blocoListaVazia: BlocoListaVazia;
        private _blocoListaCarregando: BlocoListaCarregando;
        private _rodape: Rodape;

        private _isDestativarEfeitoHover: boolean = false;
        private _manipuladorLinhaClick: EventoHandler;
        private _elementoConteudoTabela: HTMLElement;
        private _elementoTabela: HTMLElement;
        private _elementoRodape: HTMLElement;

        public TemplateColunasColecao: TemplateColunasColecao;

        public get BlocoCabecalho(): BlocoCabecalho
        {
            return this._blocoCabecalho;
        }

        public get BlocoListaVazia(): BlocoListaVazia
        {
            return this._blocoListaVazia;
        }

        public get BlocoListaCarregando(): BlocoListaCarregando
        {
            return this._blocoListaCarregando;
        }

        public get Rodape(): ui.Rodape
        {
            return this._rodape;
        }
        //public Cabeçalho: ui.Cabecalho;

        public ColunasColecao: ColunasColecao;
        public LinhasColecao: LinhasColecao<TItem>;

        public get ManipuladorLinhaClick(): EventoHandler
        {
            return this._manipuladorLinhaClick;
        }

        public get IsDestativarEfeitoHover(): boolean
        {
            return this._isDestativarEfeitoHover;
        }

        public set IsDestativarEfeitoHover(value: boolean)
        {
            this._isDestativarEfeitoHover = value;
            this.AtualizarEfeitoHover();
        }

        public get ElementoConteudoTabela(): HTMLElement
        {
            return this._elementoConteudoTabela;
        }
        public get ElementoTabela(): HTMLElement
        {
            return this._elementoTabela;
        }
        public get ElementoRodape(): HTMLElement
        {
            return this._elementoRodape;
        }

        public readonly EventoLinhaDetalhesExpandida = new Evento<LinhaDetalhesExpandidaEventArgs<TItem>>(this);
        public readonly EventoOrdenacaoColunaAlterada = new Evento<OrdenacaoColunaAlteradaEventArgs>(this);
        

        public get IsMarcarItem(): boolean
        {
            if (this.IsControleInicializado)
            {
                if (this._isMarcarItem == null)
                {
                    this._isMarcarItem = this.RetornarValorAtributoBoolean(AtributosHtml.IsMarcarLinha, true) &&
                        this.RetornarValorAtributoBoolean(AtributosHtml.IsMarcarItem, true);
                }
                return this._isMarcarItem;
            }
            return true;
        }

        public override get TotalItens(): number
        {
            return this.LinhasColecao.Linhas.Count;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.TemplateColunasColecao = this.RetornarTemplateColunas();

            ElementoUtil.RemoverElemento(this.Elemento, this.TemplateColunasColecao.Elemento);

            this._blocoCabecalho = this.ComponentesApresentacaoFilhos.OfType(BlocoCabecalho).SingleOrDefault();
            this._blocoListaVazia = this.ComponentesApresentacaoFilhos.OfType(BlocoListaVazia).SingleOrDefault();
            this._blocoListaCarregando = this.ComponentesApresentacaoFilhos.OfType(BlocoListaCarregando).SingleOrDefault();
            this._rodape = this.ControlesFilho.OfType<Rodape>(Rodape).SingleOrDefault();

            this.IsDestativarEfeitoHover = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.DesativarEfeitoHover));
            this._manipuladorLinhaClick = this.RetornarManipuladorLinhaClick();

            this.AdicionarElementoTabela();
            this.AdicionarColunasColecao();
            this.AdicionarLinhasColecao();
            this.AtualizarVisibilidadeBlocosExtras();
            this.EventoListaAtualizada.AddHandler(this.PainelLista_ListaAtualizada, this);
        }

        //#region Adicionar, inserir, remover

        public AdicionarItem(item: any): void
        {
            if (this.IsControleInicializado)
            {
                this.LinhasColecao.AdicionarItem(item);
                this.AtualizarVisibilidadeBlocosExtras();
            }
        }

        public InserirItem(posicao: number, item: any): void
        {
            if (this.IsControleInicializado)
            {
                this.LinhasColecao.InserirItem(posicao, item);
                this.AtualizarVisibilidadeBlocosExtras();
            }
        }

        public RemoverItem(item: any): void 
        {
            if (this.IsControleInicializado)
            {
                this.LinhasColecao.RemoverItem(item);
                this.AtualizarVisibilidadeBlocosExtras();
            }
        }

        protected RetornarLinhasColecao(id: string): LinhasColecao<TItem>
        {
            return new LinhasColecao(this, id, this.ColunasColecao, this.TemplateColunasColecao, this.TipoItemLista);
        }
        //#endregion

        //#region Atualização da Lista

        private PainelLista_ListaAtualizada(provedor: any, e: EventArgs)
        {
            this.AtualizarVisibilidadeBlocosExtras();
        }

        protected AtualizarVisibilidadeBlocosExtras(): void
        {
            if (this.IsControleInicializado)
            {
                const statusLista = this.StatusControleLista;

                if (this.BlocoListaVazia instanceof BlocoListaVazia)
                {
                    this.BlocoListaVazia.Visibilidade = statusLista === EnumStatusControleLista.ListaCarregadaVazia;
                }

                if (this.BlocoListaCarregando instanceof BlocoListaCarregando)
                {
                    this.BlocoListaCarregando.Visibilidade = statusLista === EnumStatusControleLista.Carregando;
                }

                this.ElementoConteudoTabela.Visibilidade = statusLista === EnumStatusControleLista.ListaCarregada;

                if (this.BlocoCabecalho instanceof BlocoCabecalho)
                {
                    this.BlocoCabecalho.Visibilidade = statusLista === EnumStatusControleLista.ListaCarregada;
                }

                if (this.ElementoRodape instanceof HTMLElement)
                {
                    this.ElementoRodape.Visibilidade = statusLista === EnumStatusControleLista.ListaCarregada;
                }
            }
        }

        //#endregion

        //#region Métodos públicos

        public MarcarLinha(item: TItem, isRolarScroll: boolean = true)
        {
            if (this.IsControleInicializado && this.IsMarcarItem)
            {
                for (const linha of this.LinhasColecao.Linhas)
                {
                    if (Util.IsIgual(linha.ItemReferencia, item))
                    {
                        linha.MarcarLinha();

                        if (isRolarScroll)
                        {
                            linha.Elemento.scrollIntoView({
                                block: "center",
                                behavior: "smooth",
                            });
                        }
                    }
                    else
                    {
                        linha.DesmacarLinha();
                    }
                }
            }
        }


        public ExpandirLinhaDatalhes(linha: ui.Linha<TItem>, e: UIEventArgs, botaoAlterarIcone?: ui.Botao): void
        public ExpandirLinhaDatalhes(provedor: ui.BaseUIElemento, e: UIEventArgs, botaoAlterarIcone?: ui.Botao, iconeExpandir?: EnumIcone, iconeEncolher?: EnumIcone): void
        public ExpandirLinhaDatalhes(provedor: ui.BaseUIElemento, e: UIEventArgs, botaoAlterarIcone?: ui.Botao, iconeExpandir = EnumIcone.ExpandMore, iconeEncolher = EnumIcone.ExpandLess): void
        {
            const linha = this.RetornarLinha(provedor);
            const linhaDetalhes = linha.LinhaDetalhes;
            if (!(linhaDetalhes instanceof ui.LinhaDetalhes))
            {
                throw new Erro("A linha detalhes não foi definida");
            }

            if (!linhaDetalhes.IsVisivel)
            {
                linhaDetalhes.MostrarElemento();
                if (botaoAlterarIcone instanceof ui.Botao)
                {
                    botaoAlterarIcone.Icone = iconeEncolher;
                }

                if (!linhaDetalhes.IsExpandidoPrimeiraVez)
                {
                    linhaDetalhes.IsExpandidoPrimeiraVez = true;

                    const args = new LinhaDetalhesExpandidaEventArgs(linha, e.Elemento, e.Parametros, e.DomEvent);
                    this.EventoLinhaDetalhesExpandida.Notificar(provedor, args);
                }
            }
            else
            {
                linhaDetalhes.OcultarElemento();
                linhaDetalhes.Visibilidade = EnumVisibilidade.Oculto;
                if (botaoAlterarIcone instanceof ui.Botao)
                {
                    botaoAlterarIcone.Icone = iconeExpandir;
                }
            }
        }

        private RetornarLinha(linhaOuProvedor: ui.BaseUIElemento)
        {
            if (linhaOuProvedor instanceof ui.Linha)
            {
                return linhaOuProvedor;
            }
            return linhaOuProvedor.RetornarControlePai<ui.Linha<TItem>>(ui.Linha);
        }

        public ScrollIntoView(itemReferencia: TItem, isMarcarLinha: boolean = true): void
        {
            if (this.IsControleInicializado && ValidacaoUtil.IsDefinido(itemReferencia))
            {
                const linhaItem = this.LinhasColecao.Linhas.Where(x => x.ItemReferencia!= null && (x.ItemReferencia as IEquals).Equals(itemReferencia)).FirstOrDefault();
                if (linhaItem != null)
                {
                    linhaItem.Elemento.scrollIntoView({
                        block: "center",
                        inline: "center",
                        behavior: "smooth"
                    });

                    if (isMarcarLinha)
                    {
                        linhaItem.MarcarLinha();
                    }
                }
               
            }
        }

        //#endregion

        //#region Métodos privados

        private AdicionarLinhasColecao(): void
        {
            const id = ElementoUtil.RetornarNovoIDElemento(this, "linhas");
            this.LinhasColecao = this.RetornarLinhasColecao(id);
            this.ControlesFilho.Add(this.LinhasColecao);
            this.LinhasColecao.InicializarControle();
        }

        private AdicionarColunasColecao(): void
        {
            const id = ElementoUtil.RetornarNovoIDElemento(this, "colunas");
            this.ColunasColecao = new ColunasColecao(this, id, this.TemplateColunasColecao, this.TipoItemLista);
            this.ControlesFilho.Add(this.ColunasColecao);
            this.ColunasColecao.InicializarControle();
        }

        private AdicionarElementoTabela(): void
        {
            const elementoConteudoTabela = document.createElement("ap-bloco");
            elementoConteudoTabela.id = ElementoUtil.RetornarNovoIDElemento(this, "div_tabela");
            elementoConteudoTabela.className = "sn-conteudo-tabela";

            const elementoTabela = document.createElement("table");
            elementoTabela.id = ElementoUtil.RetornarNovoIDElemento(this, "tabela");
            elementoConteudoTabela.appendChild(elementoTabela);

            const elementoRodape = this.RetornarElementoRodape();

            if (elementoRodape instanceof HTMLElement)
            {
                this.ElementoApresentacao.insertBefore(elementoConteudoTabela, elementoRodape);
            }
            else
            {
                this.ElementoApresentacao.appendChild(elementoConteudoTabela);
            }

            if (this.BlocoListaVazia instanceof BlocoListaVazia)
            {
                this.BlocoListaVazia.Elemento.remove();
                this.ElementoApresentacao.insertBefore(this.BlocoListaVazia.Elemento, this.ElementoApresentacao.firstElementChild);
            }

            this._elementoConteudoTabela = elementoConteudoTabela;
            this._elementoTabela = elementoTabela;
            this._elementoRodape = elementoRodape;
        }

        private RetornarElementoRodape(): any
        {
            if (this.Rodape instanceof Rodape)
            {
                return this.Rodape.Elemento;
            }
            return null;
        }

        public override OcuparElemento(): void
        {
            //está com bug para ocupar o data lista
        }

        public override DesocuparElemento(): void
        {
            //está com bug para desocupar o data lista
        }

        private AtualizarEfeitoHover(): void
        {
            if (this.IsControleInicializado)
            {
                if (this.IsDestativarEfeitoHover)
                {
                    if (!this.Elemento.classList.contains(AtributosHtml.DesativarEfeitoHover.Nome))
                    {
                        this.Elemento.classList.add(AtributosHtml.DesativarEfeitoHover.Nome);
                    }
                }
                else
                {
                    if (this.Elemento.classList.contains(AtributosHtml.DesativarEfeitoHover.Nome))
                    {
                        this.Elemento.classList.remove(AtributosHtml.DesativarEfeitoHover.Nome);
                    }
                }
            }
        }

        public NotificarOrdenacaoAlterada(coluna: ColunaTexto, e: UIEventArgs)
        {
            const args = new OrdenacaoColunaAlteradaEventArgs(coluna, e.Elemento, e.Parametros, e.DomEvent);
            this.EventoOrdenacaoColunaAlterada.Notificar(this, args);
        }

        private RetornarTemplateColunas(): TemplateColunasColecao
        {
            const templatesColunaColucao = this.ControlesFilho.OfType<TemplateColunasColecao>(TemplateColunasColecao).ToList();
            if (templatesColunaColucao.Count === 1)
            {
                return templatesColunaColucao.Single();
            }

            const mensagem = (templatesColunaColucao.Count === 0) ?
                `Não foi encontrado nenhum elemento 'sn-colunas' no controle sn-data-lista em ${this.ControleApresentacao.Nome}` :
                `Existem mais de um elemento 'sn-colunas' no controle sn-data-lista em ${this.ControleApresentacao.___NomeConstrutor}`;

            throw new Erro(mensagem);
        }
         
        //#endregion

        private RetornarManipuladorLinhaClick(): EventoHandler
        {
            const nomeMetodo = this.RetornarValorAtributo(AtributosHtml.LinhaClick);
            if (!String.IsNullOrWhiteSpace(nomeMetodo))
            {
                return this.RetornarMetodo(nomeMetodo) as EventoHandler;
            }
            return null;
        }
    }
}