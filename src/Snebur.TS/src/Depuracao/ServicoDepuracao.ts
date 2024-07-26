namespace Snebur.Depuracao
{
    export class ServicoDepuracao extends BaseServico
    {
        private readonly PARAMETRO_VS_PORTA_DEPURACAO: string = "vs-depuracao-porta";
        //private static readonly URL_SERVICO_DEPERACAO_PADRAO: string = "ws://depuracao.snebur.localhost:{0}/{1}";

        private IsConectadoInterno: boolean = false;
        private readonly TEMPO_NOVA_CONEXAO = 20000;
        private readonly TEMPO_PING = 30000;
        private readonly TEMPO_TIMEOUT = 15000;

        private PortaAtual: number;
        private ServicoWebScoket: WebSocket;
        private IdentificadorTentarNovaConexao: number;
        private IdentificadorPing: number;
        private IdentificadorTimeout: number;

        private UrlDepuracao: string;

        public readonly EventoPing = new Evento<MensagemEventArgs<MensagemPing>>(this);
        public readonly EventoEstiloCssAlterado = new Evento<MensagemEventArgs<MensagemEstiloCssAlterado>>(this);
        public readonly EventoControleAlterado = new Evento<MensagemEventArgs<MensagemControleAlterado>>(this);
        public readonly EventoScriptAlterado = new Evento<MensagemEventArgs<MensagemScriptAlterado>>(this);

        public DataHoraUltimaPing: Date;

        public get IsConectado(): boolean
        {
            return this.IsConectadoInterno;
        }

        public override get UrlServico(): string
        {
            return $Configuracao.UrlServicoDepuracao;
        }
        public constructor()
        {
            super();
            window.addEventListener("hashchange", this.Window_HashChange.bind(this));


            this.EventoPing.AddHandler(this.ServicoDepuracao_Ping, this);
        }

        public async InicializarAsync()
        {
            
            await this.ConectarAsync();
        }

        private async RetornarPortaAsync(): Promise<number>
        {
            const url = "/vs-porta-depuracao";

            return new Promise((resolve, reject) =>
            {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onreadystatechange = function ()
                {
                    if (xhr.readyState === 4 && xhr.status === 200)
                    {
                        resolve(ConverterUtil.ParaNumero(xhr.responseText));
                    }
                };
                xhr.send();
            });
        }

        private async ConectarAsync()
        {
            this.PortaAtual = await this.RetornarPortaAsync();
            if (this.PortaAtual > 0)
            {
                this.DesconectarSessaoAtual();

                this.UrlDepuracao = this.RetornarUrlServico();

                this.Log(`Iniciando serviço depuração web socket. '${this.UrlDepuracao}'`);

                this.ServicoWebScoket = new WebSocket(this.UrlDepuracao);
                this.ServicoWebScoket.addEventListener("open", this.ServicoWebScoket_Open.bind(this));
                this.ServicoWebScoket.addEventListener("message", this.ServicoWebScoket_Message.bind(this));
                this.ServicoWebScoket.addEventListener("close", this.ServicoWebScoket_Close.bind(this));
                this.ServicoWebScoket.addEventListener("error", this.ServicoWebScoket_Error.bind(this));

                this.IdentificadorTimeout = setTimeout(this.ServicoWebScoket_Timeout.bind(this), this.TEMPO_TIMEOUT);
            }
        }
        //#region Eventos ServicoWebScoket 

        private ServicoWebScoket_Open(e: Event): void
        {
            try
            {
                this.DispensarTemporizadores();
                this.Log("Conexão realizada com sucesso. ", EnumTipoLog.Sucesso);
                this.IsConectadoInterno = true;
                this.Ping();
            }
            catch (ex)
            {
                console.error(ex);
            }
        }

        private ServicoWebScoket_Message(e: MessageEvent): void
        {
            try
            {
                this.ReceberMensagem(e.data);
            }
            catch (ex)
            {
                LogUtil.Erro(ex);
            }
        }

        private ServicoWebScoket_Close(e: CloseEvent): void
        {
            this.Log(`A conexão do serviço (web socket depuração)  foi fechada, nova tentativa em 20 segundos ${this.UrlDepuracao}`, EnumTipoLog.Erro);
            this.TentarNovaConexao();
        }

        private ServicoWebScoket_Error(e: Event): void
        {
            this.Log(`Não foi possível conectar no serviço (web socket) de depuração '${this.UrlDepuracao}' , nova tentativa em 20 segundos`, EnumTipoLog.Erro);

            if (this.ServicoWebScoket == null ||
                (this.ServicoWebScoket?.readyState !== this.ServicoWebScoket?.OPEN))
            {
                this.TentarNovaConexao();
            }
        }

        private ServicoWebScoket_Timeout(): void
        {
            if (this.ServicoWebScoket instanceof WebSocket && this.ServicoWebScoket.readyState === this.ServicoWebScoket.OPEN)
            {
                return;
            }

            this.Log(`O tempo limite máximo foi atingido (web socket depuração_, nova tentativa em 20 segundos  '${this.UrlDepuracao}' `, EnumTipoLog.Erro);
            this.TentarNovaConexao();
        }

        private TentarNovaConexao(): void
        {
            this.DesconectarSessaoAtual();
            this.IdentificadorTentarNovaConexao = window.setTimeout(this.ConectarAsync.bind(this), this.TEMPO_NOVA_CONEXAO);
        }

        public EnviarMensagem(mensagem: Mensagem): void
        {
            const contrato = new Contrato(mensagem);
            const constratoSerializado = JsonUtil.Serializar(contrato);
            this.ServicoWebScoket.send(constratoSerializado);
        }

        private PingAsyn(): void
        {
            this.IdentificadorPing = window.setTimeout(this.Ping.bind(this), this.TEMPO_PING);
        }

        private Ping(): void
        {
            window.clearInterval(this.IdentificadorPing);

            const mensagemPing = new MensagemPing();
            this.EnviarMensagem(mensagemPing);
            this.PingAsyn();
        }

        private DispensarTemporizadores(): void
        {
            window.clearTimeout(this.IdentificadorTentarNovaConexao);
            window.clearTimeout(this.IdentificadorPing);
            window.clearTimeout(this.IdentificadorTimeout);
        }
        //#endregion

        //#region Receber mensagem

        private ReceberMensagem(constratoSerializado: string): void
        {
            const tipoContrato = Contrato.GetType();
            try
            {
                if (JsonUtil.IsJson(constratoSerializado))
                {
                    const contrato = JsonUtil.Deserializar<Contrato>(constratoSerializado, tipoContrato);
                    const mensagem = contrato.Mensagem;
                    const tipoMensagem = mensagem.GetType();

                    console.log("serviço depuração: recebendo mensagem " + tipoMensagem.Nome);
                    this.NotificarMensagemRecebida(contrato, mensagem);
                }
                else
                {
                    console.log("Mensagem depurador invalida " + constratoSerializado);
                }
            }
            catch (erro)
            {
                LogUtil.Erro(erro);
            }
        }

        private NotificarMensagemRecebida(contrato: Contrato, mensagem: Mensagem): void
        {
            const args = new MensagemEventArgs(mensagem);
            const evento = this.RetornarEvento(mensagem);
            evento.Notificar(this, args);
        }

        private RetornarEvento(mensagem: Mensagem): Evento
        {
            switch (true)
            {
                case mensagem instanceof MensagemPing:

                    return this.EventoPing;

                case mensagem instanceof MensagemEstiloCssAlterado:

                    return this.EventoEstiloCssAlterado;

                case mensagem instanceof MensagemControleAlterado:

                    return this.EventoControleAlterado;

                case mensagem instanceof MensagemScriptAlterado:

                    return this.EventoScriptAlterado;

                default:

                    throw new Erro("O tipo da mensagem não é suportado pelo servico depuração");
            }
        }
        //#endregion

        private ServicoDepuracao_Ping(provedor: any, e: MensagemEventArgs<MensagemPing>): void
        {
            this.DataHoraUltimaPing = e.Mensagemn.DataHora;
        }

        //#region Métodos privados

        private Window_HashChange(): void
        {
            const porta = this.RetornarPorta();
            if (this.PortaAtual !== porta)
            {
                this.PortaAtual = porta;
                this.ConectarAsync();
            }
        }

        private RetornarPorta(): number
        {
            //let parametrosHash = u.UrlUtil.RetornarParametrosUrl();
            //if (parametrosHash.ContainsKey(this.PARAMETRO_VS_PORTA_DEPURACAO))
            //{
            //    return ConverterUtil.ParaNumero(parametrosHash.Item(this.PARAMETRO_VS_PORTA_DEPURACAO));
            //}


            const parametrosUrl = u.UrlUtil.RetornarParametroQuerysUrl();
            if (parametrosUrl.ContainsKey(this.PARAMETRO_VS_PORTA_DEPURACAO))
            {
                return ConverterUtil.ParaNumero(parametrosUrl.Item(this.PARAMETRO_VS_PORTA_DEPURACAO));
            }
            return 0;
        }

        private DesconectarSessaoAtual(): void
        {
            this.DispensarTemporizadores();

            this.IsConectadoInterno = false;
            if (this.ServicoWebScoket instanceof WebSocket)
            {
                this.ServicoWebScoket.close();
                delete this.ServicoWebScoket;
            }
        }

        private RetornarUrlServico(): string
        {
            let nomeUsuario = $Aplicacao.Usuario ? $Aplicacao.Usuario.Nome : "anonimo";
            nomeUsuario = TextoUtil.RetornarSomentesLetrasNumeros(nomeUsuario);
            const identificador = `${u.SistemaUtil.Navegador.Nome}_${nomeUsuario}_${u.RandomUtil.RetornarRandom(0, 100)}`;
            if ($Configuracao.IsDepuracaoUtilizarHostLocal || this.UrlServico === undefined)
            {
                const host = document.location.hostname;
                return `ws://${host}:${this.PortaAtual}/${identificador}`;
            }
            return String.Format(this.UrlServico, this.PortaAtual, identificador);
        }
        //#endregion

        //#region Log 

        private Log(mensagem: string, tipo: EnumTipoLog = EnumTipoLog.Normal): void
        {
            switch (tipo)
            {
                case EnumTipoLog.Normal:
                    console.log(mensagem);
                    break;
                case EnumTipoLog.Erro:
                    console.warn(mensagem);
                    break;
                case EnumTipoLog.Sucesso:
                    console.info(mensagem);
                    break;
                default:
                    throw new Erro("O tipo de log não é suportado");
            }
        }
        //#endregion
    }
}