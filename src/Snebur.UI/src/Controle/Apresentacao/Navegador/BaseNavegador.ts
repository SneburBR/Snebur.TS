namespace Snebur.UI
{
    export abstract class BaseNavegador extends BaseControleApresentacaoFormulario
    {
        private _isManterCache: boolean;
        protected _isPropagarBindDataSource: boolean = true;
        private _resolverNavegacaoAsync: { Resolver: (value: ResolverNavegacaoAsync<Pagina> | PromiseLike<ResolverNavegacaoAsync<Pagina>>) => void, Pagina: Pagina; };
        private _paginaAtual: Pagina;
        protected _parametros: DicionarioSimples<any>;
         
        public abstract readonly IdentificadorNavegador: string;
        private readonly HistoricoLocal = new List<{ Pagina: Pagina | typeof Pagina, Parametros: DicionarioSimples<any> }>();
        public readonly TipoAnimacao: EnumTipoAnimacao;
         
        public get IsPropagarBindDataSource(): boolean
        {
            return this._isPropagarBindDataSource;
        }

        public get IsPodeVoltar(): boolean
        {
            return this.HistoricoLocal.length > 0;
        }

        public get IsMantarCache(): boolean
        {
            return this._isManterCache ??
                this.TipoAnimacao === EnumTipoAnimacao.Deslizante;
        }

        public get PaginaAtual(): Pagina
        {
            return this._paginaAtual;
        }
         
        public readonly PaginasEmCache = new List<Pagina>();
        public readonly EventoAntesNavegar = new Evento<AntesNavegarEventArgs>(this);
        public readonly EventoPaginaAlterada = new Evento<PaginaAlteradaEventArgs>(this);
        public readonly EventoNavaPagina = new Evento<NovaPaginaEventArgs>(this);

        public override get ControleApresentacao(): ControleApresentacao
        {
            return this.ControlePai.RetornarControlePai(ControleApresentacao);
        }

        public abstract readonly CaminhoRota: string;
        public abstract readonly IsHistoricoAtivo: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this._isPropagarBindDataSource = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsPropagarBindDataSource, this._isPropagarBindDataSource));
            this._isManterCache = this.RetornarValorAtributoBoolean(AtributosHtml.IsManterCache, null);

            if (this.IsPropagarBindDataSource)
            {
                this.EventoDataSourceAlterado.AddHandler(this.DataSource_Alterado, this);
            }
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.AdicionarNavegador(this);
            }

            this.NavegarPaginaInicialAsync();
        }

        protected async NavegarPaginaInicialAsync(): Promise<void>
        {
            const paginaInicial = this.RetornarConstrutorPaginaInicial();
            if (paginaInicial instanceof Function)
            {
                const parametros = this.RetornarParametrosParaInicial();
                this.Navegar(paginaInicial, parametros);
            }
        }

        private DataSource_Alterado(): void
        {
            super.BaseControle_DataSource_Alterado;
            if (this.IsPropagarBindDataSource &&
                this.PaginaAtual instanceof Pagina &&
                this.PaginaAtual.IsControleInicializado)
            {
                if (this.PaginaAtual.IsPropagarBindDataSource)
                {
                    this.PaginaAtual.DataSource = this.DataSource;
                }
            }
        }

        //#region Navegação

        public Navegar(pagina: Pagina | typeof Pagina | IPaginaConstrutor): void;
        public Navegar(pagina: Pagina | typeof Pagina | IPaginaConstrutor, chave: string, valor: any): void;
        public Navegar(pagina: Pagina | typeof Pagina | IPaginaConstrutor, parametros: DicionarioSimples<any>): void;
        public Navegar<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, expressaoPropriedade: (value: T) => TValor, valor: TValor): void;
        public Navegar<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, espessoes: List<ITupleParametroPagina<T>>): void;
        public Navegar<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, parametros: Partial<T>): void;
        public Navegar(refPagina: IPaginaConstrutor | Pagina | typeof Pagina, expresoesParametrosOuChave: any = null, valor: any = null): void
        {
            if (this._resolverNavegacaoAsync != null)
            {
                throw new Erro("Existe uma navegação Async pendente, utilizar o método voltar");
            }

            switch (this.TipoAnimacao)
            {
                case EnumTipoAnimacao.Nenhuma:
                    this.NavegarInterno(refPagina, expresoesParametrosOuChave, valor);
                    break;
                case EnumTipoAnimacao.Deslizante:
                    this.NavegarAnimadoAsync(refPagina, EnumSentidoAnimacao.Avancar, expresoesParametrosOuChave, valor);
                    break;
                default:
                    throw new Erro("tipo de animação não suportado");
            }
        }

        /**
         * Aguarda o termina na navegação pagina e retornar  o objeto na pagina navegada
         * 
         * */
        public NavegarAsync<TPagina extends Pagina>(construtorPagina: IPaginaConstrutor<TPagina>): Promise<ResolverNavegacaoAsync<TPagina>>;
        public NavegarAsync<TPagina extends Pagina>(construtorPagina: IPaginaConstrutor<TPagina>, chave: string, valor: any): Promise<ResolverNavegacaoAsync<TPagina>>;
        public NavegarAsync<TPagina extends Pagina>(construtorPagina: IPaginaConstrutor<TPagina>, parametros: DicionarioSimples<any>): Promise<ResolverNavegacaoAsync<TPagina>>;
        public NavegarAsync<TPagina extends Pagina, TValor>(construtorPagina: IPaginaConstrutor<TPagina>, expressaoPropriedade: (value: TPagina) => TValor, valor: TValor): Promise<ResolverNavegacaoAsync<TPagina>>;
        public NavegarAsync<TPagina extends Pagina>(construtorPagina: IPaginaConstrutor<TPagina>, parametros: Partial<TPagina>): Promise<ResolverNavegacaoAsync<TPagina>>;
        public NavegarAsync<TPagina extends Pagina>(refPagina: IPaginaConstrutor<TPagina>, expressoesParametrosOuChave: any = null, valor: any = null): Promise<ResolverNavegacaoAsync<TPagina>>
        {
            return new Promise(resolver =>
            {
                if (this._paginaAtual == null)
                {
                    throw new Erro("Somente é possível fazer um navegação await partindo de uma página existente");
                }

                this._resolverNavegacaoAsync = {
                    Resolver: resolver,
                    Pagina: this._paginaAtual
                };

                if (this.TipoAnimacao === EnumTipoAnimacao.Nenhuma)
                {
                    this.NavegarInterno(refPagina,
                        expressoesParametrosOuChave, valor,
                        false, false);
                }
                else
                {
                    this.NavegarAnimadoInternoAsync(
                        refPagina,
                        EnumSentidoAnimacao.Avancar,
                        expressoesParametrosOuChave,
                        valor,
                        false, false);
                }
            });
        }

        //#region Navegação animada 

        public async NavegarAnimadoAsync(pagina: Pagina | typeof Pagina | IPaginaConstrutor, sentidoAnimacao: EnumSentidoAnimacao): Promise<void>;
        public async NavegarAnimadoAsync(pagina: Pagina, sentidoAnimacao: EnumSentidoAnimacao, chave: string, valor: any): Promise<void>;
        public async NavegarAnimadoAsync(pagina: Pagina | typeof Pagina | IPaginaConstrutor, sentidoAnimacao: EnumSentidoAnimacao, parametros: DicionarioSimples<any>): Promise<void>;
        public async NavegarAnimadoAsync<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, sentidoAnimacao: EnumSentidoAnimacao, expressoesPropriedade: List<ITupleParametroPagina<T>>): Promise<void>;
        public async NavegarAnimadoAsync<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, sentidoAnimacao: EnumSentidoAnimacao, expressoesPropriedade: Partial<T>): Promise<void>;
        public async NavegarAnimadoAsync<T extends Snebur.UI.Pagina, TValor>(construtorPagina: IPaginaConstrutor<T>, sentidoAnimacao: EnumSentidoAnimacao, expressaoPropriedade: (value: T) => TValor, valor: TValor): Promise<void>;
        public async NavegarAnimadoAsync(refPagina: IPaginaConstrutor | Pagina | typeof Pagina, sentidoAnimacao: EnumSentidoAnimacao, expressaoParametrosOuChave: any, valor: any): Promise<void>;
        public async NavegarAnimadoAsync(refPagina: IPaginaConstrutor | Pagina | typeof Pagina, sentidoAnimacao: EnumSentidoAnimacao, expresoesParametrosOuChave: any = null, valor: any = null): Promise<void>
        {
            this.NavegarAnimadoInternoAsync(refPagina,
                sentidoAnimacao,
                expresoesParametrosOuChave,
                valor);
        }


        private async NavegarAnimadoInternoAsync(refPagina: IPaginaConstrutor | Pagina | typeof Pagina,
            sentidoAnimacao: EnumSentidoAnimacao,
            expressaoParametrosOuChave: Function | DicionarioSimples | string | List<ITupleParametroPagina> = null, valor: any = null,
            isSalvarHistoricoVoltar: boolean = true, isSalvarHistoricoRota: boolean = true): Promise<void>
        {

            const parametros = this.RetornarParametros(expressaoParametrosOuChave, valor);
            const argsAntesNavegar = this.NotificarEventoAntesNavegar(refPagina, parametros);
            if (argsAntesNavegar.IsCancelarNavegacao)
            {
                return;
            }
            const paginaAtual = this.PaginaAtual;
            this._parametros = parametros;
            const novaPagina = this.RetornarPagina(refPagina, parametros);

            if (!this.ControlesFilho.Contains(novaPagina))
            {
                this.ControlesFilho.Add(novaPagina);
            }
            this._paginaAtual = novaPagina;

            if (isSalvarHistoricoRota)
            {
                this.SalvarHistoricoNavegador(novaPagina, parametros);
            }

            if (paginaAtual instanceof Pagina)
            {
                this.OcultarPagina(paginaAtual);

                if (isSalvarHistoricoVoltar)
                {
                    this.AdicionarHistoricoLocal(paginaAtual);
                }
            }

            this.MostrarPagina(novaPagina);
            this.PropagarDataSourcePaginaAtual();

            await this.AnimarPaginaAsync(paginaAtual, novaPagina, sentidoAnimacao);
            this.NotificarEventoPaginaAlterada();
        }

        private PropagarDataSourcePaginaAtual()
        {
            if (this.IsPropagarBindDataSource &&
                u.ValidacaoUtil.IsDefinido(this.DataSource))
            {
                if (this.PaginaAtual.IsPropagarBindDataSource &&
                    (this.PaginaAtual as any)._dataSource === undefined)
                {
                    this.PaginaAtual.DataSource = this.DataSource;
                }
            }
        }

        private async AnimarPaginaAsync(paginaAntiga: Pagina, novaPagina: Pagina, sentidoAnimacao: EnumSentidoAnimacao): Promise<void>  
        {
            if (paginaAntiga == null)
            {
                return;
            }

            const elementoPaginaAntiga = paginaAntiga.Elemento;
            const elementoNovaPagina = novaPagina.Elemento;
            const estiloReset = new Estilo({
                transitionDuration: "0s",
                top: "0",
                position: "absolute"
            });

            estiloReset.AplicarEm(elementoNovaPagina);
            if (elementoPaginaAntiga instanceof HTMLElement)
            {
                estiloReset.AplicarEm(elementoPaginaAntiga);
            }

            const posicaoXNovaPagina = sentidoAnimacao === EnumSentidoAnimacao.Avancar ? "100%" : "-100%";

            if (elementoPaginaAntiga instanceof HTMLElement)
            {
                elementoPaginaAntiga.style.left = "0";
                elementoNovaPagina.style.left = posicaoXNovaPagina;
            }

            await ThreadUtil.QuebrarAsync();

            const estiloAnimacao = new Estilo({
                transitionProperty: "left",
                transitionDuration: "0.25s"
            });

            const posicaoXDestinoPaginaAntiga = sentidoAnimacao === EnumSentidoAnimacao.Avancar ? "-100%" : "100%";
            if (elementoPaginaAntiga instanceof HTMLElement)
            {
                estiloAnimacao.AplicarEm(elementoPaginaAntiga);
            }
            estiloAnimacao.AplicarEm(elementoNovaPagina);

            await ThreadUtil.QuebrarAsync();

            if (elementoPaginaAntiga instanceof HTMLElement)
            {
                elementoPaginaAntiga.style.left = posicaoXDestinoPaginaAntiga;
            }
            elementoNovaPagina.style.left = "0";
            await ThreadUtil.EsperarAsync(250);
            this.OcultarPagina(paginaAntiga);
        }

        //#endregion 

        private NavegarInterno(refPagina: IPaginaConstrutor | Pagina | typeof Pagina,
            expressoesParametrosOuChave: Function | DicionarioSimples | string | List<ITupleParametroPagina> | Partial<Pagina>,
            valor: any,
            isSalvarHistoricoVoltar: boolean = true,
            isSalvarHistoricoNavegador: boolean = true): void
        {
            const parametros = this.RetornarParametros(expressoesParametrosOuChave, valor);
            const argsAntesNavegar = this.NotificarEventoAntesNavegar(refPagina, parametros);
            if (argsAntesNavegar.IsCancelarNavegacao)
            {
                return;
            }

            if (this.IsMantarCache &&
                PaginaUtil.IsMesmoTipo(this.PaginaAtual, refPagina, expressoesParametrosOuChave))
            {
                return;
            }

            this._parametros = parametros;

            const paginaAtual = this.PaginaAtual;
            if (paginaAtual instanceof Pagina)
            {
                this.OcultarPagina(paginaAtual);

                if (isSalvarHistoricoVoltar)
                {
                    this.AdicionarHistoricoLocal(paginaAtual);

                    this.HistoricoLocal.Add({
                        Pagina: paginaAtual.constructor as typeof Pagina,
                        Parametros: paginaAtual.__Parametros
                    });
                }
            }

            const novaPagina = this.RetornarPagina(refPagina, parametros);
            this._paginaAtual = novaPagina;
            this.MostrarPagina(novaPagina);

            this.NotificarEventoPaginaAlterada();

            this.PropagarDataSourcePaginaAtual();

            if (isSalvarHistoricoNavegador)
            {
                this.SalvarHistoricoNavegador(novaPagina, parametros);
            }
        }

        public abstract SalvarHistoricoNavegador(pagina: Pagina, parametros: DicionarioSimples<any, string>): void;

        //#endregion

        //#region Voltar

        public Voltar(isSucesso: boolean = false): void
        {
            if (this._resolverNavegacaoAsync != null)
            {
                this.VoltarNavegacaoAsync(isSucesso);
                return;
            }

            if (this.HistoricoLocal.Count === 0)
            {
                if (this.ControleApresentacaoPai instanceof Janela)
                {
                    this.ControleApresentacaoPai.FecharAsync(isSucesso);
                    return;
                }
                throw new Erro("O histórico  local está vazio");
            }

            const paginaPagametros = this.HistoricoLocal.PegarUltimo();

            switch (this.TipoAnimacao)
            {
                case EnumTipoAnimacao.Nenhuma:

                    this.NavegarInterno(paginaPagametros.Pagina, paginaPagametros.Parametros, null, false, true);
                    break;
                case EnumTipoAnimacao.Deslizante:

                    this.NavegarAnimadoInternoAsync(paginaPagametros.Pagina, EnumSentidoAnimacao.Voltar, paginaPagametros.Parametros, null, false, true);
                    break;
                default:
                    throw new Erro("tipo de animação não suportada");
            }
        }

        private async VoltarNavegacaoAsync(isSucesso: boolean) 
        {
            const paginaAtual = this.PaginaAtual;
            const resolver = this._resolverNavegacaoAsync.Resolver;
            const pagina = this._resolverNavegacaoAsync.Pagina;
            this._resolverNavegacaoAsync = null;
            delete this._resolverNavegacaoAsync;

            this.OcultarPagina(paginaAtual);

            switch (this.TipoAnimacao)
            {
                case EnumTipoAnimacao.Nenhuma:
                    this.NavegarInterno(pagina, pagina.__Parametros, null, false, false);
                    break;
                case EnumTipoAnimacao.Deslizante:
                    await this.NavegarAnimadoInternoAsync(pagina, EnumSentidoAnimacao.Voltar, pagina.__Parametros, null, false, false);
                    break;
                default:
                    throw new Erro("Não suportado");
            }


            resolver({
                Pagina: paginaAtual,
                IsSucesso: isSucesso
            });
        }

        //#endregion

        //#region Pagina 

        private RetornarPagina(refPagina: any, parametros: DicionarioSimples<any>): Pagina
        {
            const pagina = this.RetornarPaginaInterno(refPagina, parametros);
            pagina.AdicionarParametros(parametros);
            return pagina;
        }

        private RetornarPaginaInterno(refPagina: any, parametros: DicionarioSimples<any>): Pagina
        {
            if (refPagina instanceof Pagina)
            {
                if (!refPagina.IsDispensado)
                {
                    return (refPagina as Pagina);
                }
                refPagina = refPagina.constructor;
            }

            if (u.ValidacaoUtil.IsConstrutor(refPagina))
            {
                if (this.IsMantarCache)
                {
                    const paginasEmCache = this.PaginasEmCache.Where(x => x.IsControleInicializado && PaginaUtil.IsMesmoTipo(x, refPagina, parametros)).ToList();
                    if (paginasEmCache.Count > 0)
                    {
                        if (paginasEmCache.Count > 1)
                        {
                            console.warn(`Existe mais de uma pagina, com o tipo ${refPagina.name} em cache, sobre escrever o método IsMesmoContrustor.`);
                        }

                        return paginasEmCache.Single();
                    }
                }
                /*const construtorPagina: IPaginaConstrutor = refPagina;*/
                const novaPagina = new (refPagina as IPaginaConstrutor)(this);
                this.EventoNavaPagina.Notificar(this, new NovaPaginaEventArgs(novaPagina, parametros));
                if (!(novaPagina instanceof Pagina))
                {
                    throw new Erro(`o construtor ${(novaPagina as Function).constructor.name} não herda de Snebur.UI.Pagina`);
                }

                if (this.IsPropagarBindDataSource)
                {
                    novaPagina["_dataSource"] = this.DataSource;
                }
                return novaPagina;
            }
            throw new ErroNaoSuportado("A referencia da página não é suportada", this);
        }

        private MostrarPagina(pagina: Pagina): void
        {
            if (pagina.IsDispensado)
            {
                throw new Erro("Não é possível mostrar uma página já dispensada");
            }

            if (!pagina.IsControleInicializado)
            {
                pagina.InicializarControle();
            }
            else
            {
                if (this.IsPropagarBindDataSource && pagina.DataSource !== this.DataSource)
                {
                    if (pagina.IsPropagarBindDataSource)
                    {
                        pagina.DataSource = this.DataSource;
                    }
                }
                pagina.MostrarElemento();
                pagina.NotificarControleCarregado();
            }

            if (!this.ControlesFilho.Contains(pagina))
            {
                this.ControlesFilho.Add(pagina);
            }
            if (this.IsMantarCache && !this.PaginasEmCache.Contains(pagina))
            {
                this.PaginasEmCache.Add(pagina);
            }
        }

        private OcultarPagina(pagina: Pagina): void
        {
            if (this.IsControleInicializado)
            {
                if (!this.IsMantarCache && this._resolverNavegacaoAsync == null)
                {
                    this.ControlesFilho.Remove(pagina);
                    pagina.Dispose();
                }
                else
                {
                    pagina.EventoAntesDescarregar.Notificar(pagina, EventArgs.Empty);
                    pagina.OcultarElemento();
                }
            }
        }

        private RetornarConstrutorPaginaInicial(): IPaginaConstrutor
        {
            const caminhoPaginaInicial = this.RetornarValorAtributo(AtributosHtml.PaginaInicial, null);
            if (!String.IsNullOrWhiteSpace(caminhoPaginaInicial))
            {
                if (caminhoPaginaInicial.StartsWith(BaseBind.THIS))
                {
                    const metodo = this.RetornarMetodo(caminhoPaginaInicial);
                    const construtorOuNome = metodo();

                    switch (typeof construtorOuNome)
                    {
                        case "function":
                            return construtorOuNome;
                        case "string":
                            return this.RetornarConstrutorPaginaInicialInterno(construtorOuNome);
                        default:

                            throw new Erro(`Não foi possível retornar pagina inicial do navegador, o método ${caminhoPaginaInicial} não foi encontrado em ${this.ControleApresentacao.___NomeConstrutor}`);
                    }
                }
                return this.RetornarConstrutorPaginaInicialInterno(caminhoPaginaInicial);
            }
            return null;
        }

        private RetornarConstrutorPaginaInicialInterno(construtorOuNome: string): IPaginaConstrutor<Pagina>
        {
            const construtor = PaginaUtil.RetornarConstrutorPagina(this, construtorOuNome, true);
            if (construtor == null)
            {
                let caminho = this.RetornarValorAtributo(AtributosHtml.PaginaInicial, null);
                if (construtorOuNome !== caminho)
                {
                    caminho += ` result ${construtorOuNome}`;
                }
                throw new Erro(`Não foi possível retornar pagina inicial do navegador, sn-pagina-inciial=${caminho} não foi encontrado em ${this.ControleApresentacao.___NomeConstrutor}`);
            }
            return construtor;
        }

        private RetornarParametrosParaInicial(): DicionarioSimples<any>
        {
            const valorAtributoParametros = this.RetornarValorAtributo(AtributosHtml.Parametros, null, true);
            if (!String.IsNullOrWhiteSpace(valorAtributoParametros))
            {
                return PaginaUtil.RetornarParametros(valorAtributoParametros, this.ControlePai);
            }
            return new DicionarioSimples<string>();
        }

        private RetornarParametros(expressoesParametrosOuChave: Function | DicionarioSimples | string | List<ITupleParametroPagina> | Partial<Pagina>, valor: any): DicionarioSimples<any>
        {
            if (expressoesParametrosOuChave != null)
            {
                if (expressoesParametrosOuChave instanceof DicionarioSimples)
                {
                    return expressoesParametrosOuChave;
                }

                if (u.ValidacaoUtil.IsString(expressoesParametrosOuChave))
                {
                    ValidacaoUtil.ValidarArgumentoDefinido({ expressoesParametrosOuChave });

                    ValidacaoUtil.ValidarArgumentoUndefined({ valor });
                    const parametros = new DicionarioSimples<any>();
                    parametros.Add(expressoesParametrosOuChave, valor);
                    return parametros;
                }

                if (u.ValidacaoUtil.IsFunction(expressoesParametrosOuChave))
                {
                    ValidacaoUtil.ValidarArgumentoDefinido({ valor });

                    const nomePropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressoesParametrosOuChave);
                    const parametros = new DicionarioSimples<any>();

                    ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedade });
                    ValidacaoUtil.ValidarArgumentoUndefined({ valor });
                    parametros.Add(nomePropriedade, valor);
                    return parametros;
                }

                if (valor != null)
                {
                    throw new ErroOperacaoInvalida("Não é suportado valor para assinatura de Expressões");
                }

                if (Array.isArray(expressoesParametrosOuChave))
                {
                    const parametros = new DicionarioSimples<any>();
                    for (const [expressaoOuPropriedade, valor] of expressoesParametrosOuChave as ITupleParametroPagina[])
                    {
                        const nomePropriedade = u.ExpressaoUtil.RetornarCaminhoPropriedade(expressaoOuPropriedade);
                        ValidacaoUtil.ValidarArgumentoDefinido({ nomePropriedade });
                        ValidacaoUtil.ValidarArgumentoUndefined({ valor });
                        parametros.Add(nomePropriedade, valor);
                    }
                    return parametros;
                }

                if (typeof expressoesParametrosOuChave === "object")
                {
                    const parametros = new DicionarioSimples<any>();
                    for (const chave of Object.keys(expressoesParametrosOuChave))
                    {
                        const valor = (expressoesParametrosOuChave as any)[chave];
                        ValidacaoUtil.ValidarArgumentoDefinido({ chave });
                        ValidacaoUtil.ValidarArgumentoUndefined({ valor });
                        parametros.Add(chave, valor);
                    }
                    return parametros;
                }

                throw new Erro("Não foi possível o parâmetros, Assinatura incompatível");
            }
            return new DicionarioSimples<string>();
        }

        //#endregion

        //#region Histórico

        private AdicionarHistoricoLocal(pagina: Pagina)
        {
            const refPagina = pagina.IsDispensado ? pagina.constructor as typeof Pagina : pagina;

            this.HistoricoLocal.Add({
                Pagina: refPagina,
                Parametros: pagina.__Parametros
            });
        }

        //url do document.href alterada



        //#endregion

        //#region EventoPaginaAltera

        private NotificarEventoAntesNavegar(refProximaPagina: IPaginaConstrutor | Pagina | typeof Pagina, parametros: DicionarioSimples<any>): AntesNavegarEventArgs
        {
            const args = new AntesNavegarEventArgs(this.PaginaAtual, refProximaPagina, parametros);
            this.EventoAntesNavegar.Notificar(this, args);
            return args;
        }

        public NotificarEventoPaginaAlterada(): void
        {
            this.EventoPaginaAlterada?.Notificar(this, new PaginaAlteradaEventArgs(this.PaginaAtual, this._parametros));
            if ($Configuracao.IsDebug)
            {
                const nomePaginaAtual = this.PaginaAtual?.___NomeConstrutor;
                this.Elemento.setAttribute("debug-pagina-atual", nomePaginaAtual ?? "null");
            }
        }

        //#endregion

        //#region Validação

        public override async ValidarFormularioAsync(): Promise<boolean>
        {
            if (this.PaginaAtual instanceof Pagina)
            {
                await this.PaginaAtual?.ValidarFormularioAsync();
            }
            return true;
        }

        public override OcultarMensagensValidacao(isDefinirComoValido: boolean): void
        {
            this.PaginaAtual?.OcultarMensagensValidacao(isDefinirComoValido);
        }

        public override LimparValidacoesControleFormulario(isSomenteMensagemFlutuante = true): void
        {
            this.PaginaAtual?.LimparValidacoesControleFormulario(isSomenteMensagemFlutuante);
        }

        public override MostrarSomenteMensagemValidacaoFlutuante(isForcar: boolean): void
        {
            this.PaginaAtual?.MostrarSomenteMensagemValidacaoFlutuante(isForcar);
        }

        public override AtualizarPosicoesMensagemValidacao(): void
        {
            this.PaginaAtual?.AtualizarPosicoesMensagemValidacao();
        }
        //#endregion

        //#region IDisposable 

        public override Dispose(): void
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.RemoverNavegador(this);
            }
            //this.RemoverEventosDomHistorico();
            super.Dispose();
        }
        //#endregion

    }

    interface ResolverNavegacaoAsync<TPagina extends Pagina>
    {
        Pagina: TPagina,
        IsSucesso: boolean;
    }

    export enum EnumSentidoAnimacao
    {
        Avancar = 1,
        Voltar = 2
    }

    export type ITupleParametroPagina<T = any, TValor = any> = [(value: T) => TValor | string, TValor];

}