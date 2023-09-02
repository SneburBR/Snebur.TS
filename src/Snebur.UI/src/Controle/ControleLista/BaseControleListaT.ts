namespace Snebur.UI
{
    export declare type FuncaoNormalizar = (item: any) => any;

    export abstract class BaseControleLista<T extends TipoItemLista = any> extends BaseControleApresentacaoFormulario implements IControleLista
    {
        public static REGISTROS_POR_PAGINA_PADRAO = 100;
        /*@internal*/
        public __FuncaoRetornarConsulta: FuncaoConsulta;
        /*@internal*/
        public __FuncaoRetornarConsultaAsync: FuncaoConsultaAsync;
        /*@internal*/
        public __FuncaoNormalizar: FuncaoNormalizar;

        private _isAsync: boolean = false;
        private _isCarregando: boolean = false;
        private _lista: ListaObservacao<T> = null;
        protected _sentidoOrdenacao: EnumSentidoOrdenacao;

        public __FuncaoRetornarViewModelAsync: (item: T) => Promise<Entidade | BaseViewModel>;

        public readonly EventoListaAlterada = new Evento(this);
        public readonly EventoAntesAlterarLista = new Evento(this);

        public Pesquisa: string = String.Empty;
        public CaminhoPropriedadeOrdenacao: string;
        public RelacoesAberta: string;
        public IsConsultarTipoAutomaticamente: boolean = false;

        public ControlePaginacao: BaseControlePaginacao;

        public TipoItemLista: r.BaseTipo;

        private readonly Fila = new Fila<T>();

        public get StatusControleLista(): EnumStatusControleLista
        {
            return this.RetornarStatusControleLista();

        }

        public get SentidoOrdenacao(): d.EnumSentidoOrdenacao
        {
            return this._sentidoOrdenacao;
        }

        public get IsAsync(): boolean
        {
            return this._isAsync;
        }

        public get Lista(): ListaObservacao<T>
        {
            return this._lista;
        }

        public set Lista(value: ListaObservacao<T>) 
        {
            if ((value instanceof Array) && value === this._lista)
            {
                return;
            }
            this.EventoAntesAlterarLista.Notificar(this, EventArgs.Empty);

            if (this._lista instanceof Array && ListaUtil.IsListaObservacao(this._lista))
            {
                //this._lista.Clear();
                this.RemoverTodosItems();
                this.RemoverHandlerLista();
            }

            if (u.ValidacaoUtil.IsDefinido(value))
            {
                if (!(value instanceof Array))
                {
                    throw new Error("Tipo de lista inválida não suportado pelo bind lista: Objeto: " + value);
                }

                if (!(ListaUtil.IsListaObservacao(value)))
                {
                    const tipoLista = EnumTipoLista[(value as any).TipoLista];
                    let mensagemErro = `A lista definida não é do tipo observação, Controle: ${this.___NomeConstrutor} ${this.Nome ?? "Sem nome"} em ${this.ControleApresentacao.___NomeConstrutor}`;
                    mensagemErro += `\r\nAltere do tipo da lista ${tipoLista}  para ListaObservacao `;
                    mensagemErro += `Itens : ${String.Join("; ", value)}`;
                    console.error(mensagemErro);
                    value = u.ListaObservacaoUtil.Criar(value);
                }

                this._lista = value;
                this.AdicionarHandlerLista();

                if (this.IsControleInicializado)
                {
                    this.AdicionarItens();
                }
            }

            this.EventoListaAtualizada.Notificar(this, EventArgs.Empty);
            this.EventoListaAlterada.Notificar(this, EventArgs.Empty);
        }



        public abstract get IsMarcarItem(): boolean;
        public abstract get TotalItens(): number;
        //#endregion

        //#region Eventos 

        public readonly EventoItemAdicionado: Evento<ItemEventArgs<T>>;
        public readonly EventoItemInserido: Evento<InserirItemEventArgs<T>>;
        public readonly EventoItemRemovido: Evento<ItemEventArgs<T>>;
        public readonly EventoListaAtualizada: Evento;

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.CssClasseControle = "sn-nao-selecionar";
            this.EventoItemAdicionado = new Evento<ItemEventArgs<T>>(this);
            this.EventoItemInserido = new Evento<InserirItemEventArgs<T>>(this);
            this.EventoItemRemovido = new Evento<ItemEventArgs<T>>(this);
            this.EventoListaAtualizada = new Evento(this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this._isAsync =this.RetornarValorAtributoBoolean(AtributosHtml.IsAsync, false);
            this.TipoItemLista = this.RetornarTipoItemLista();
            this.RelacoesAberta = this.RetornarValorAtributo(AtributosHtml.RelacoesAberta, null);
            this.IsConsultarTipoAutomaticamente = this.RetornarValorAtributoBoolean(AtributosHtml.ConultarTipoAutomaticamente, false);

            const nomeFuncaoConsultaPesquisa = this.RetornarValorAtributo(AtributosHtml.Consulta);
            if (!String.IsNullOrWhiteSpace(nomeFuncaoConsultaPesquisa))
            {
                this.__FuncaoRetornarConsulta = this.RetornarMetodo(nomeFuncaoConsultaPesquisa) as FuncaoConsulta;
            }

            const nomeFuncaoConsultaPesquisaAsync = this.RetornarValorAtributo(AtributosHtml.ConsultaAsync);
            if (!String.IsNullOrWhiteSpace(nomeFuncaoConsultaPesquisaAsync))
            {
                this.__FuncaoRetornarConsultaAsync = this.RetornarMetodo(nomeFuncaoConsultaPesquisaAsync) as FuncaoConsultaAsync;
            }

            const nomeFuncaoNormalizar = this.RetornarValorAtributo(AtributosHtml.Normalizar);
            if (!String.IsNullOrEmpty(nomeFuncaoNormalizar))
            {
                this.__FuncaoNormalizar = this.RetornarMetodo(nomeFuncaoNormalizar) as FuncaoNormalizar;
            }

            if (!(this.ExisteBindLista()))
            {
                this.AtualizarListaConsultaAsync();
            }

            //this.Cabecalho = this.ControlesFilho.OfType<Cabecalho>(Cabecalho).SingleOrDefault();
            //this.Rodape = this.ControlesFilho.OfType<Rodape>(Rodape).SingleOrDefault();
        }

        //#endregion

        //#region Handler Lista 

        private AdicionarHandlerLista(): void
        {
            if (this._lista instanceof Array && ListaUtil.IsListaObservacao(this._lista))
            {
                this._lista.EventoItemAdicionado.AddHandler(this.Lista_AdicionarItem, this);
                this._lista.EventoItemRemovido.AddHandler(this.Lista_RemoverItem, this);
                this._lista.EventoItemInserido.AddHandler(this.Lista_InserirItem, this);
                /*this._lista.EventoItemAlterado.AddHandler(this.Lista_ListaNovaAlterada, this);*/
                this._lista.EventoListaNovaAlterada.AddHandler(this.Lista_ListaNovaAlterada, this);
            }
        }

        private RemoverHandlerLista(): void
        {
            if (this._lista instanceof Array && ListaUtil.IsListaObservacao(this._lista))
            {
                this._lista.EventoItemAdicionado.RemoveHandler(this.Lista_AdicionarItem, this);
                this._lista.EventoItemRemovido.RemoveHandler(this.Lista_RemoverItem, this);
                this._lista.EventoItemInserido.RemoveHandler(this.Lista_InserirItem, this);
                this._lista.EventoItemAlterado.RemoveHandler(this.Lista_ListaNovaAlterada, this);
                this._lista.EventoListaNovaAlterada.RemoveHandler(this.Lista_ListaNovaAlterada, this);
            }
        }

        private Lista_AdicionarItem(provedor: any, e: ItemEventArgs<T>): void
        {
            if (this.IsControleInicializado)
            {
                this.AdicionarItem(e.Item);
                this.EventoListaAtualizada.Notificar(this, EventArgs.Empty);
                this.EventoItemAdicionado.Notificar(this, e);
            }
        }

        private Lista_RemoverItem(provedor: any, e: ItemEventArgs<T>): void
        {
            if (this.IsControleInicializado)
            {
                if (this.Fila.Contains(e.Item))
                {
                    this.Fila.Remove(e.Item);
                }

                this.RemoverItem(e.Item);
                this.EventoListaAtualizada.Notificar(this, EventArgs.Empty);
                this.EventoItemRemovido.Notificar(this, e);
            }
        }

        private Lista_InserirItem(provedor: any, e: InserirItemEventArgs<T>): void
        {
            if (this.IsControleInicializado)
            {
                this.InserirItem(e.Posicao, e.Item);
                this.EventoListaAtualizada.Notificar(this, EventArgs.Empty);
                this.EventoItemInserido.Notificar(this, e);
            }
        }

        private Lista_ListaNovaAlterada(provedor: any, e: EventArgs): void
        {
            if (this.IsControleInicializado)
            {
                this.EventoListaAtualizada?.Notificar(this, EventArgs);
            }
        }
        //#endregion

        public async AguardarCarregandoAsync()
        {
            while (this._isCarregando)
            {
                await ThreadUtil.EsperarAsync(200);
            }
            await ThreadUtil.EsperarAsync(200);
        }
         
        //#region AcessoDados - Pesquisa - Ordenação - Paginação

        public ControlePaginacao_PaginacaoAlterada(provedor: ControlePaginacao, e: PaginacaoAlteradaEventArgs): void
        {
            if (this.IsControleInicializado)
            {
                this.AtualizarListaConsultaAsync();
            }
        }

        protected ControleLista_Pesquisa(provedor: any, e: ui.TextoPesquisaEventArgs): void
        {
            if (this.IsControleInicializado)
            {
                this.Pesquisa = e.Pesquisa;
                this.Lista.Clear();

                if (this.ControlePaginacao instanceof BaseControlePaginacao)
                {
                    this.ControlePaginacao.PaginaAtual = 1;
                }
                this.AtualizarListaConsultaAsync();
            }
        }

        public DesativarOrdenacao()
        {
            this.CaminhoPropriedadeOrdenacao = null;
            this.AtualizarListaConsultaAsync();
        }

        public OrdenacaoLista(caminhoPropriedade: string, sentido: d.EnumSentidoOrdenacao): void
        {
            this.CaminhoPropriedadeOrdenacao = caminhoPropriedade;
            this._sentidoOrdenacao = sentido;
            this.AtualizarListaConsultaAsync();
        }

        //public async AtualizarListaConsultaAsync()
        //{
        //    await this.AtualizarListaConsultaAsync();
        //}

        public async AtualizarListaConsultaAsync(): Promise<void>
        {
            const consultaAsync = this.RetornarResultadoConsultaAsync();
            if (consultaAsync instanceof Promise)
            {
                //### Adicionado para paginação
                this.Ocupar(EnumOpcaoOcupar.MostrarJanelaOcupadoImediatamente);

                const resultado = await consultaAsync;
                await this.AtualizarResultadoConsultaAsync(resultado);
                await this.DesocuparAsync();
            }
        }

        private RetornarResultadoConsultaAsync(): Promise<a.ResultadoConsulta>
        {
            const consultaAsync = this.RetornarConsultaInternoAsync();
            if (consultaAsync != null)
            {
                if (!(consultaAsync instanceof Promise))
                {
                    throw new Erro("A consulta não retorna um tipo Promise<ResultadoConsulta> ");
                }
                return consultaAsync;
            }

            const consulta = this.RetornarConsulta();
            if (consulta != null)
            {
                if (consulta instanceof Promise)
                {
                    throw new Erro("Utilizar o atributo " + AtributosHtml.ConsultaAsync.Nome);
                }

                const estruturaConsulta = consulta.EstruturaConsulta;
                if (this.ControlePaginacao instanceof BaseControlePaginacao)
                {
                    consulta.EstruturaConsulta.ContarRegistros = true;
                }
                if (!String.IsNullOrWhiteSpace(this.CaminhoPropriedadeOrdenacao))
                {
                    const ordenacao = new a.Ordenacao();
                    ordenacao.CaminhoPropriedade = this.CaminhoPropriedadeOrdenacao;
                    ordenacao.SentidoOrdenacaoEnum = this.SentidoOrdenacao;

                    estruturaConsulta.IsDesativarOrdenacao = true;
                    estruturaConsulta.Ordenacoes.Add(this.CaminhoPropriedadeOrdenacao, ordenacao);
                }
                if (!(String.IsNullOrWhiteSpace(this.RelacoesAberta)))
                {
                    consulta.AbrirRelacoes(this.RelacoesAberta);
                }
                if (!(estruturaConsulta.Take > 0))
                {
                    consulta.Take(this.RetornarRegistrosPorPagina());
                }
                estruturaConsulta.PaginaAtual = this.RetornarPaginaAtual();

                return consulta.RetornarResultadoConsultaAsync();
            }

            return null;
        }

        private async AtualizarResultadoConsultaAsync(resultadoConsulta: a.ResultadoConsulta): Promise<void>
        {
            if (!this.IsControleInicializado)
            {
                return;
            }

            let entidades = (resultadoConsulta.Entidades as any) as ListaObservacao<T>;
            entidades = this.NormalizarEntidades(entidades);



            if (this.ControlePaginacao instanceof ControleProximaPagina)
            {
                this.ControlePaginacao.TotalRegistros = resultadoConsulta.TotalRegistros;

                if (!((this.Lista instanceof Array) && ListaUtil.IsListaObservacao(this.Lista)))
                {
                    this.Lista = new ListaObservacao<any>();
                }

                for (const entidade of entidades)
                {
                    const viewModelOuEntidade = await this.RetornarViewModelOuEntidadeAsync(entidade);
                    this.Lista.push(viewModelOuEntidade as any);
                }
                this.Fila.AddRange(entidades);
                await this.PopularFilaAsync();
            }
            else 
            {
                this.Lista = entidades;
            }

        }

        private NormalizarEntidades(entidades: ListaObservacao<any>): ListaObservacao<any>
        {
            if (u.ValidacaoUtil.IsFunction(this.__FuncaoNormalizar))
            {
                const retorno = new ListaObservacao<any>();
                for (const entidade of entidades)
                {
                    const entidadeNormalizada = this.__FuncaoNormalizar(entidade);
                    retorno.Add(entidadeNormalizada);
                }
                return retorno;
            }
            return entidades;
        }

        protected async RetornarViewModelOuEntidadeAsync(entidade: T): Promise<T>
        {
            if (typeof this.__FuncaoRetornarViewModelAsync === "function")
            {
                return await this.__FuncaoRetornarViewModelAsync(entidade) as any;
            }
            return entidade;
        }

        protected RetornarConsulta(): a.IConsultaEntidade<d.IEntidade>
        {
            const consulta = this.RetornarConsultaInterno();
            if (!String.IsNullOrWhiteSpace(this.Pesquisa))
            {
                const propriedadesPesquisa = consulta.TipoEntidadeConsulta.RetornarPropriedadesPesquisa();
                const len = propriedadesPesquisa.length;
                for (let i = 0; i < len; i++)
                {
                    const propriedadePesquisa = propriedadesPesquisa[i];
                    if (propriedadePesquisa != null)
                    {
                        const estruturaConsulta = consulta.EstruturaConsulta;
                        const filtroPropriedade = a.ConsultaUtil.RetornarNovoFiltroPropriedade(propriedadePesquisa, a.EnumOperadorFiltro.Possui, this.Pesquisa.trim());
                        estruturaConsulta.FiltroGrupoE.Filtros.Add(filtroPropriedade);
                    }
                }
            }
            return consulta;
        }

        private RetornarConsultaInterno(): a.IConsultaEntidade<d.IEntidade>
        {
            if (u.ValidacaoUtil.IsFunction(this.__FuncaoRetornarConsulta))
            {
                return this.__FuncaoRetornarConsulta(this.Pesquisa);
            }
            if (this.TipoItemLista instanceof r.TipoEntidade && this.IsConsultarTipoAutomaticamente)
            {
                const tipoEntidade = this.TipoItemLista as r.TipoEntidade;
                const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
                const consulta = contexto.RetornarConsulta(tipoEntidade);
                return consulta;
            }
            return null;
        }

        private RetornarRegistrosPorPagina(): number
        {
            if (this.ControlePaginacao != null)
            {
                return this.ControlePaginacao.RegistroPorPagina;
            }
            return BaseControleLista.REGISTROS_POR_PAGINA_PADRAO;
        }

        private RetornarPaginaAtual(): number
        {
            if (this.ControlePaginacao != null)
            {
                return this.ControlePaginacao.PaginaAtual;
            }
            return 1;
        }

        private RetornarConsultaInternoAsync(): Promise<a.ResultadoConsulta>
        {
            if (u.ValidacaoUtil.IsFunction(this.__FuncaoRetornarConsultaAsync))
            {
                return this.__FuncaoRetornarConsultaAsync(this.Pesquisa);
            }
            return null;
        }

        //#endregion 

        //#region Métodos privados 

        protected AdicionarItens()
        {
            this.Fila.Clear();
            this.Fila.AddRange(this._lista);
            if (this.IsAsync)
            {
                this.PopularFilaAsync();
            }
            else
            {
                this.PopularFilaSync();
            }
        }

        private async PopularFilaAsync(): Promise<void>
        {
            await this.AguardarCarregandoAsync();
            try
            {
                this._isCarregando = true;
                await this.PopularFilaInternoAsync();
            }
            finally
            {
                this._isCarregando = false;
            }
        }

        private PopularFilaSync(): void
        {
            while (this.Fila.Count > 0)
            {
                const proximoItem = this.Fila.Dequeue();
                this.AdicionarItem(proximoItem);
            }
        }

        private async PopularFilaInternoAsync(): Promise<void>
        {
            let c = 0;
            while (this.Fila.Count > 0)
            {
                const proximoItem = this.Fila.Dequeue();
                this.AdicionarItem(proximoItem);
                c += 1;

                if (c % 5 === 0)
                {
                    await ThreadUtil.QuebrarAsync();
                }
            }
        }

        //private AdicionarProximoItem(): void
        //{
        //    if (this.IsControleInicializado)
        //    {
        //        if (this.Fila.Count === 0)
        //        {
        //            this.EventoListaAtualizada.Notificar(this, EventArgs.Empty);
        //            return;
        //        }
        //        this.AdicionarItemFila();
        //    }
        //}

        private AdicionarItemFila(): void
        {

        }

        private RetornarTipoItemLista(): r.BaseTipo
        {
            const caminhoTipo = this.RetornarValorAtributo(AtributosHtml.Tipo, null);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                if ($Reflexao.Tipos.ContainsKey(caminhoTipo))
                {
                    return $Reflexao.Tipos.Item(caminhoTipo);
                }
                const objetoOuConstrutor: any = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(caminhoTipo);
                if (objetoOuConstrutor instanceof r.BaseTipo)
                {
                    return objetoOuConstrutor;
                }
                if (objetoOuConstrutor.GetType() instanceof r.BaseTipo)
                {
                    return objetoOuConstrutor.GetType();
                }
                throw new Erro("Não foi encontrado o tipo {0}", caminhoTipo);
            }
            return null;
        }

        private ExisteBindLista(): boolean
        {
            const valorAtributoBindLista = this.RetornarValorAtributo(AtributosHtml.BindLista, null);
            return !String.IsNullOrWhiteSpace(valorAtributoBindLista);
        }


        private RemoverTodosItems(): void
        {
            if (this._lista instanceof Array)
            {
                const itens = this._lista.ToList(true);
                for (const item of itens)
                {
                    this.RemoverItem(item);
                }
            }

        }
        //#endregion

        //#region Métodos abstratos

        protected abstract AdicionarItem(item: T): void;

        protected abstract InserirItem(posicao: number, item: T): void;

        protected abstract RemoverItem(item: T): void

        //#endregion

        //#region Virtualização

        //public RetornarElementoScrollVirtulizacao(): HTMLElement
        //{
        //    return this.Elemento;
        //}


        //#endregion

        //#region Métodos privados

        private RetornarStatusControleLista(): EnumStatusControleLista
        {
            if (!this.IsDispensado)
            {
                if (this._lista instanceof Array &&
                    this._lista.IsListaNova === false)
                {
                    if (this._lista.Count > 0)
                    {
                        return EnumStatusControleLista.ListaCarregada;
                    }
                    return EnumStatusControleLista.ListaCarregadaVazia;
                }
                return EnumStatusControleLista.Carregando;
            }
            return EnumStatusControleLista.Dispensado;
        }

        //#endregion

        //#region IDisposable 

        public override Dispose(): void
        {
            this.RemoverHandlerLista();
            this.RemoverTodosItems();
            this._lista = null;
            super.Dispose();
        }
        //#endregion
    }

    export enum EnumStatusControleLista
    {
        Carregando = 1,
        ListaCarregadaVazia = 2,
        ListaCarregada = 3,
        Dispensado = 0
    }
}