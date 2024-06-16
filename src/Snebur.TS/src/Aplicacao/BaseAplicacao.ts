namespace Snebur.Aplicacao
{
    export abstract class BaseAplicacao extends Snebur.ObjetoControladorPropriedade 
    {
        /*protected _isNavegadorSuportarOrientacaoExif: boolean;*/
        private _servicoUsuario: Snebur.Comunicacao.IServicoUsuario;
        private _servicoRegrasNegocio: Snebur.AcessoDados.ServicoRegrasNegocioCliente;
        private _servicoDepuracao: Snebur.Depuracao.ServicoDepuracao;
        private _servicoLogServicoArquivo: Snebur.Comunicacao.BaseServicoLogServicoArquivo;

        private _gerenciadorServioArquivoPadrao: sa.GerenciadorEnvioArquivo;

        private _usuario: d.IUsuario = null;
        private _sessaoUsuario: d.ISessaoUsuario = null;
        private _isAplicacaoInicializada: boolean = false;

        private _diferencaDataHoraUtcServidor: number = 0;

        private DataHoraIniciando: Date;
        private DataHoraFimInicializando: Date;

        //#region Propriedades
        public readonly Globalizacao: g.Globalizacao;
        public readonly ContextosDados = new DicionarioSimples<Snebur.AcessoDados.BaseContextoDados>();
        public readonly ServicosArquivo = new DicionarioSimples<Snebur.ServicoArquivo.ServicoArquivo>();

        public abstract IsCarregandoImagem: boolean;

        public get GerenciadorServioArquivoPadrao(): sa.GerenciadorEnvioArquivo
        {
            return this._gerenciadorServioArquivoPadrao;
        }

        public get ServicoLogServicoArquivo(): Snebur.Comunicacao.BaseServicoLogServicoArquivo
        {
            return this._servicoLogServicoArquivo;
        }

        public get ServicoUsuario(): Snebur.Comunicacao.IServicoUsuario
        {
            return this._servicoUsuario;
        }

        public get ServicoRegrasNegocio(): Snebur.AcessoDados.ServicoRegrasNegocioCliente
        {
            return this._servicoRegrasNegocio;
        }

        public get ServicoDepuracao(): Snebur.Depuracao.ServicoDepuracao
        {
            return this._servicoDepuracao;
        }

        public readonly Servicos = new Array<Snebur.BaseServico>();

        public get Usuario(): d.IUsuario
        {
            return this._usuario;
        }

        public set Usuario(value: d.IUsuario)
        {
            this.NotificarPropriedadeAlterada("Usuario", this._usuario, this._usuario = value);
            this.NotificarUsuarioLogadoAlterado();
        }

        public get NomeUsuarioLogado(): string
        {
            if (this.IsUsuarioLogado)
            {
                return this.Usuario.Nome;
            }
            return "visitante";
        }

        public get SessaoUsuario(): d.ISessaoUsuario
        {
            return this._sessaoUsuario;
        }
        public set SessaoUsuario(value: d.ISessaoUsuario)
        {
            this.NotificarPropriedadeAlterada("SessaoUsuario", this._sessaoUsuario, this._sessaoUsuario = value);
        }

        public get IsUsuarioLogado(): boolean
        {
            if (this.Usuario != null)
            {
                return !u.ValidacaoUtil.CredencialValida(this.CredencialUsuario, s.CredencialAnonimo.Anonimo);
            }
            return false;
        }

        public get CredencialUsuario(): Snebur.Seguranca.CredencialUsuario
        {
            return u.SessaoUsuarioUtil.RetornarCredencialUsuario();
        }

        public get InformacaoSessaoUsuario(): Snebur.Dominio.InformacaoSessaoUsuario
        {
            return u.SessaoUsuarioUtil.RetornarInformacaoSessaoUsuario();
        }

        public get IdentificadorSessaoUsuario(): string
        {
            return u.SessaoUsuarioUtil.RetornarIdentificadorSessaoUsuario();
        }

        public get DiferencaDataHoraUtcServidor(): number
        {
            return this._diferencaDataHoraUtcServidor;
        }

        public get FuncaoNormalizarRequisicao(): (
            metodo: u.EnumHttpMethod, url: string, request: XMLHttpRequest) => void
        {
            return undefined;
        }

        public get FuncaoNormalizarUrlRelativaWebWorker(): (urlRelativa: string) => string
        {
            return undefined;
        }

        public get IsConectadoServicoDepuracao(): boolean
        {
            if (this.ServicoDepuracao instanceof Snebur.Depuracao.ServicoDepuracao)
            {
                return this.ServicoDepuracao.IsConectado;
            }
            return false;
        }

        public get IsAplicacaoInicializada(): boolean
        {
            return this._isAplicacaoInicializada;
        }

        public get IsManterSessaoUsuarioConectada(): boolean
        {
            return false;
        }

        //public get IsNavegadorSuportarOrientacaoExif(): boolean
        //{
        //    return this._isNavegadorSuportarOrientacaoExif;
        //}

        public abstract readonly ProgressoOcupadoAtual: number

        //public DocumentoPrincipal: any;

        //#endregion

        //#region Eventos conexão

        public readonly EventoConexaoRestabelecida = new Evento(this);
        public readonly EventoFalhaConexao = new Evento<Snebur.Comunicacao.FalhaConexaoEventArgs>(this);
        public readonly EventoUsuarioConectadoAlterado = new Evento<UsuarioConectadoAlteradoEventArgs>(this);
        /*public readonly EventoUsuarioSaiu = new Evento(this);*/

        public get IsExisteFalhaRequisicao()
        {
            return c.GerenciadorRequiscao.Instancia.IsExisteFalhaRequisicao;
        }
        //#endregion

        //#region Inicializar

        public constructor()
        {
            super();
            

            if (BaseAplicacao.__instancia != null)
            {
                throw new Erro("Já existe uma aplicação snebur instanciada");
            } 
            BaseAplicacao.__instancia = this;
        }

        public async Inicializar() 
        {
            this.DefinirVersaoDebug();
            this.InicializarConfiguracoes();

            r.GerenciadorNamespace.Inicializar();
            this.GerenciadorErros();
            $Reflexao.Inicializar();

            this.DataHoraIniciando = new Date();
            const tempoAteInicio = this.DataHoraIniciando.getTime() - $DataHoraInicio.getTime();

            console.log(`Iniciando aplicação. Tempo até aqui (carregar todas classes e metadados etc.) ${tempoAteInicio}  em ms`);
            /*console.error(` Carregar scripts: ${tempoAteInicio.ToDecimal()}s`);*/

            await this.InicializarAsync();

            //this.ServicoDepuracao.EnviarMensagem()
            this.DataHoraFimInicializando = new Date();

            const tempoInicializacao = this.DataHoraFimInicializando.getTime() - this.DataHoraIniciando.getTime();
            const tempoTotal = this.DataHoraFimInicializando.getTime() - $DataHoraInicio.getTime();

            /*console.error(`Carregar view model inicial:  ${(tempoInicializacao / 1000).ToDecimal()}s`);*/

            const modeType = $Configuracao.IsDebug ? "DEBUG" : "PROD";
            const text = $Configuracao.IsTeste ? "TEST" : "";
            console.log(`Aplicação inicializada: mode ${modeType} ${text}. (chamar do serviço usuário, serviço depuração) Tempo ${tempoInicializacao} ms. Tempo total : ${tempoTotal} ms`);

            if (tempoTotal > TimeSpan.FromSeconds(5).TotalMilliseconds)
            {
                LogUtil.Desempenho("Lentidão para inicializar aplicação ", tempoTotal);
            }
            //this.NotificarUsuarioLogadoAlterado();
            this._isAplicacaoInicializada = true;
            LogUtil.Depuracao("Aplicação inicializada ");
        }

        protected async InicializarAsync(): Promise<void>
        {
            this.Servicos.AddRange(this.RetornarServicos());

            this._servicoLogServicoArquivo = this.Servicos.OfType<Snebur.Comunicacao.BaseServicoLogServicoArquivo>(Snebur.Comunicacao.BaseServicoLogServicoArquivo).SingleOrDefault();
            this._gerenciadorServioArquivoPadrao = this.RetornarGerenciadorServicoArquivoPadrao();

            this._servicoUsuario = this.Servicos.OfType<Snebur.Comunicacao.BaseServicoUsuarioCliente>(Snebur.Comunicacao.BaseServicoUsuarioCliente).SingleOrDefault();
            this._servicoRegrasNegocio = this.Servicos.OfType<Snebur.AcessoDados.ServicoRegrasNegocioCliente>(Snebur.AcessoDados.ServicoRegrasNegocioCliente).SingleOrDefault();

            //this._diferencaDataHoraUtcServidor = await this.RetornarDataHoraUtcServidor();
            await this.InicializarSessaoUsuarioAsync();

            if ($Configuracao.IsDebug && !$Configuracao.IsDesativarServicoDepuracao)
            {
                this._servicoDepuracao = new Snebur.Depuracao.ServicoDepuracao();
                await this._servicoDepuracao.InicializarAsync();
            }

            if (!ValidacaoUtil.IsUrlHttp($Configuracao.UrlServicosWorker))
            {
                console.warn("A URL dos serviço workers não foi definida");
            }
            console.log(`UrlServicosWorker : ${$Configuracao.UrlServicosWorker}`);
        }

        private InicializarConfiguracoes()
        {
            if (Snebur.$Configuracao == null)
            {
                throw new Error("O objeto configuração $Configuracao não foi definido");
            }

            Object.defineProperty(Snebur.$Configuracao, "IsDebugOuTeste", {
                get: function ()
                {
                    return Snebur.$Configuracao.IsDebug || Snebur.$Configuracao.IsTeste;
                }
            });
        }

        //#endregion

        //#region Métodos  Públicos

        //#endregion

        //#region ContextoDados

        public AdicionarContextosDados(
            _namespace: string,
            contextoDados: a.BaseContextoDados): void
        {
            /*const _namespace = u.NamespaceUtil.RetornarNamespace(parametro);*/
            if (!this.ContextosDados.ContainsKey(_namespace))
            {
                this.ContextosDados.Adicionar(_namespace, contextoDados);
                //const contexto = new construtor(_namespace, urlServicoDados);
                //this.ContextosDados.AtribuirItem(_namespace, contexto);
            }
        }

        public RetornarContextoDados(tipo: r.TipoEntidade): Snebur.AcessoDados.BaseContextoDados
        public RetornarContextoDados(_namaspace: string): Snebur.AcessoDados.BaseContextoDados
        public RetornarContextoDados(parametro: any): Snebur.AcessoDados.BaseContextoDados
        {
            const _namespace = u.NamespaceUtil.RetornarNamespace(parametro);
            if (!this.ContextosDados.ContainsKey(_namespace))
            {
                const mensagemErro = `Não foi encontrado o contexto para o namespace ${_namespace}`;
                console.error(mensagemErro, this);
                if ($Configuracao.IsDebug)
                {
                    throw new Erro(mensagemErro, this);
                }
                return null;
            }
            return this.ContextosDados.Item(_namespace);
        }
        //#endregion

        //#region ServicoArquivo 

        public AdicionarServicoArquivo(tipo: r.TipoEntidade, urlServicoArquivo: string): void
        public AdicionarServicoArquivo(_namespace: string, urlServicoArquivo: string): void
        public AdicionarServicoArquivo(parametro: any, urlServicoArquivo: string): void
        {
            const _namespace = u.NamespaceUtil.RetornarNamespace(parametro);
            if (!this.ServicosArquivo.ContainsKey(_namespace))
            {
                this.ServicosArquivo.Add(_namespace, null);
                const servicoArquivo = new ServicoArquivo.ServicoArquivo(_namespace, urlServicoArquivo);
                this.ServicosArquivo.AtribuirItem(_namespace, servicoArquivo);
            }
        }

        public RetornarServicoArquivo(tipo: r.TipoEntidade): Snebur.ServicoArquivo.ServicoArquivo
        public RetornarServicoArquivo(_namaspace: string): Snebur.ServicoArquivo.ServicoArquivo
        public RetornarServicoArquivo(parametro: any): Snebur.ServicoArquivo.ServicoArquivo
        {
            const _namespace = u.NamespaceUtil.RetornarNamespace(parametro);
            if (!this.ServicosArquivo.ContainsKey(_namespace))
            {
                throw new Erro(`Não foi encontrado o serviço arquivo para o namespace ${_namespace}`, this);
            }
            return this.ServicosArquivo.Item(_namespace);
        }
        //#endregion

        //#region SessaoUsuario

        public async InicializarSessaoUsuarioAsync(): Promise<void>
        {
            const credencialUsuario = this.CredencialUsuario;
            if (this.ServicoUsuario === null)
            {
                throw new ErroNaoDefinido("O serviço usuário não foi definido", this);
            }

            const isSessaoUsuarioAtiva = await this.ServicoUsuario.SessaoUsuarioAtivaAsync(credencialUsuario, this.IdentificadorSessaoUsuario);
            if (isSessaoUsuarioAtiva)
            {
                const usuario = await this.ServicoUsuario.RetornarUsuarioAsync(credencialUsuario);
                this.Usuario = usuario;
                this.SessaoUsuario = await this.ServicoUsuario.RetornarSessaoUsuarioAsync(this.IdentificadorSessaoUsuario);    /*throw new Erro("Usuário não está definido");*/
            }
            else
            {
                u.SessaoUsuarioUtil.IniciarNovaSessaoUsuarioAnonima();
                await this.InicializarSessaoUsuarioAsync();
            }
        }

        //#endregion

        //#region Métodos privados 

        private NotificarUsuarioLogadoAlterado(): void
        {
            const usuario = this.Usuario;
            const args = new UsuarioConectadoAlteradoEventArgs(usuario, this.IsUsuarioLogado);
            this.EventoUsuarioConectadoAlterado.Notificar(this, args);
        }

        private GerenciadorErros()
        {
            console.EventoLog = new Evento(console);
            globalThis.addEventListener("error", __Global_Error);
            document.addEventListener("error", __Global_Error);

            if (!$Configuracao.IsDebug)
            {
                window.addEventListener("unhandledrejection", __Global_Error);
                window.addEventListener("rejectionhandled", __Global_Error);
            }
        }

        private DefinirVersaoDebug()
        {
            if (typeof $Configuracao === "undefined")
            {
                throw new Error("O objeto configuração $Configuracao não foi definido");
                /*this.InicializarConfiguracaoPadrao();*/
            }

            if ($Configuracao.IsDebug && !$Configuracao.Versao.Contains("debug"))
            {
                const agora = new Date();
                $Configuracao.Versao = `${agora.Year.ToString("00")}.${agora.Month.ToString("00")}.${agora.Day.ToString("00")}.${agora.Hour * agora.Minute}--debug`;
            }
        }

        //#endregion

        //#region Métodos Abstratos 

        protected abstract RetornarServicos(): Array<Snebur.BaseServico>;

        protected RetornarGerenciadorServicoArquivoPadrao(): Snebur.ServicoArquivo.GerenciadorEnvioArquivo
        {
            if (this.ServicoLogServicoArquivo instanceof BaseServico)
            {
                return new Snebur.ServicoArquivo.GerenciadorEnvioArquivo();
            }
            return null;

        }

        public async SairAsync(): Promise<void>
        {
            await this.FinalizarSessaoUsuarioAsync();
            await this.AntesSairAsync();

            u.CookieUtil.Remover(u.SessaoUsuarioUtil.CHAVE_DADOS_SESSAO_USUARIO);
            u.SessionStorageUtil.ClearAll();
            u.SessaoUsuarioUtil.IniciarNovaSessaoUsuarioAnonima();

            this.RedirecionarAoSair();
            console.warn("Redirecionando");
            throw new Error("Saindo da aplicação ");
            /*await ThreadUtil.EsperarAsync(10 * 60 * 1000);*/
        }

        protected async AntesSairAsync(): Promise<void>
        {

        }

        protected async FinalizarSessaoUsuarioAsync()
        {
            if (this.ServicoUsuario != null)
            {
                const identificadorSessaoUsuario = $Aplicacao.IdentificadorSessaoUsuario;
                try
                {
                    await ThreadUtil.ExecutarWithTimeOutAsync(2000, async () =>
                    {
                        await $Aplicacao.ServicoUsuario?.FinalizarSessaoUsuarioAsync(identificadorSessaoUsuario);
                    });
                }
                catch (erro)
                {
                    console.error(`Falha ao finalizar sessão usuário ${identificadorSessaoUsuario} ${erro}`);
                }
            }
        }

        protected RedirecionarAoSair()
        {
            const documentoPrincipal = (window.top !== window.self) ? window.parent.document : window.document;
            documentoPrincipal.location.reload();
        }

        private InicializarConfiguracaoPadrao()
        {
            Snebur.$Configuracao = {
                CulturaPadrao: "pt-BR",
                IdiomaPadrao: "pt-BR",
                FormatoData: EnumFormatoData.DMY,
                IdentificadorAplicacao: "Snebur.Aplicacao.Teste",
                IsDebug: true,
                NamespaceAplicacao: "Snebur.Aplicacao.Teste",
                NamespacesDependecia: ["Snebur", "Snebur.UI"],
                NamespacesEntidade: ["Snebur.Aplicacao.Teste.Entidades"],
                TipoData: EnumTipoData.Local,
                Versao: "1.0.0",
            }
        }
        //#endregion


        //#region Static

        private static __instancia: BaseAplicacao = null;

        public static get Instancia(): BaseAplicacao
        {
            return BaseAplicacao.__instancia;
        }

        //#endregion
    }

    export class VersaoDepedencia extends Snebur.ObjetoControladorPropriedade
    {
        public readonly Nome: string;
        public readonly Versao: string;

        public constructor(nome: string, versao: string)
        {
            super();

            this.Nome = nome;
            this.Versao = versao;
        }
    }

    const __Global_Error = function (e: ErrorEvent | PromiseRejectionEvent)
    {
        e.stopImmediatePropagation();
        e.stopPropagation();

        const erroInterno = (e as ErrorEvent).error as Error ?? (e as PromiseRejectionEvent).reason as Error;
        if (erroInterno instanceof ErroGlobal)
        {
            e.preventDefault();
            return;
        }

        //e.preventDefault();

        u.ErroUtil.NotificarErroGlobal(e, erroInterno);
    };


}
