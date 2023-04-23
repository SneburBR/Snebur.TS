namespace Snebur.ServicoArquivo
{
    export class EnviarPacote implements IDisposable
    {
        //Tempo para tentar novamente em casa do falha de envio
        public static TEMPO_ESPERAR_FALHA_ENVIAR_PACOTE: number = 10;
        private static TIMEOUT_ENVIAR_PACOTE = 90000;

        public TIMEOUT: TimeSpan;
        public Pacote: ArrayBuffer;
        public Url: string;
        public XmlHttp: XMLHttpRequest;
        private IdentificadorTimeoutEnviarPacote: number;

        private Resolver: (resultado: EnumResultadoEnvioPacote) => void;

        public constructor(url: string, pacote: ArrayBuffer, parametrosCabecalho: Array<ParChaveValorSimples<string>>)
        {
            this.Url = url + "?Statue=" + u.GuidUtil.RetornarNovoGuid();

            this.TIMEOUT = ($Configuracao.IsProducao) ? TimeSpan.FromMinutes(5) : TimeSpan.FromSeconds(30);
            this.Pacote = pacote;
            this.XmlHttp = new XMLHttpRequest();
            this.XmlHttp.open(u.EnumHttpMethod.POST, url, true);
            this.XmlHttp.timeout = EnviarPacote.TIMEOUT_ENVIAR_PACOTE;
            this.XmlHttp.onreadystatechange = this.Xmlhttp_ReadyStateChange.bind(this);
            this.XmlHttp.onerror = this.Xmlhttp_Error.bind(this);
            this.XmlHttp.onabort = this.Xmlhttp_Error.bind(this);
            this.XmlHttp.ontimeout = this.Xmlhttp_Timeout.bind(this);

            //this.XmlHttp.timeout = this.TIMEOUT.TotalMilliseconds;
            //this.XmlHttp.responseType = "arraybuffer";

            this.XmlHttp.onerror = this.Xmlhttp_Error.bind(this);
            this.XmlHttp.ontimeout = this.Xmlhttp_Timeout.bind(this);
            this.XmlHttp.onabort = this.XmlHttp_Abort.bind(this);

            //this.XmlHttp.onload = this.Xmlhttp_Load.bind(this);
            //this.XmlHttp.onloadstart = this.XmlHttp_LoadStart.bind(this);
            //this.XmlHttp.onloadend = this.XmlHttp_LoadEnd.bind(this);
            //this.XmlHttp.onprogress = this.XmlHttp_Progress.bind(this);

            const len = parametrosCabecalho.length;
            for (let i = 0; i < len; i++)
            {
                const parametro = parametrosCabecalho[i];
                this.XmlHttp.setRequestHeader(parametro.Chave, u.Base64Util.Encode(parametro.Valor));
            }
        }

        public async EnviarAsync(): Promise<sa.EnumResultadoEnvioPacote>
        {
            return new Promise(resolver =>
            {
                this.Resolver = resolver;
                this.EnviarInternoAsync();
            });
        }

        private async EnviarInternoAsync()
        {
            const token = await s.Token.RetornarTokenAsync();
            this.XmlHttp.setRequestHeader(c.ParametrosComunicacao.TOKEN, encodeURIComponent(token));


            if (typeof $Aplicacao?.FuncaoNormalizarRequisicao === "function")
            {
                $Aplicacao?.FuncaoNormalizarRequisicao(u.EnumHttpMethod.POST, this.Url, this.XmlHttp);
            }
            this.XmlHttp.send(new Uint8Array(this.Pacote));
            this.IdentificadorTimeoutEnviarPacote = setTimeout(this.EnviarPacote_Timeout.bind(this), EnviarPacote.TIMEOUT_ENVIAR_PACOTE);
        }
        private XmlHttp_Error(event: Event)
        {
            //var erro = new ErroComunicacao("Erro serviço OnError ", this.Url, this.XmlHttp.status, this);
            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }

        private XmlHttp_Abort(event: Event)
        {
            //var erro = new ErroComunicacao("Erro serviço OnAbort", this.Url, this.XmlHttp.status, this);
            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }

        private XmlHttp_Timeout(event: ProgressEvent)
        {
            //var erro = new ErroComunicacao("Erro serviço time out", this.Url, this.XmlHttp.status, this);
            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }

        private Xmlhttp_ReadyStateChange(): void
        {
            if (this.XmlHttp.readyState === 4)
            {
                if (this.XmlHttp.status === 200)
                {
                    try
                    {
                        const jsonResultado = this.XmlHttp.responseText;
                        const resultado = u.JsonUtil.Deserializar<sa.ResultadoServicoArquivo>(jsonResultado, sa.ResultadoServicoArquivo.GetType());
                        this.FinalizarChamada(resultado);
                        return;
                    }
                    catch (erro)
                    {
                        LogUtil.Erro(erro);
                    }

                    const erro = new ErroEnviarPacote(`Não foi possível enviar o pacote para ${this.Url} - Status ${this.XmlHttp.status.toString()}`);
                    //if ($Configuracao.IsDebug)
                    //{
                    console.log(erro);
                    //}
                    u.ThreadUtil.EsperarAsync(TimeSpan.FromSeconds(EnviarPacote.TEMPO_ESPERAR_FALHA_ENVIAR_PACOTE));
                    this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
                }
            }
        }

        private FinalizarChamada(resultado: sa.ResultadoServicoArquivo): void
        {
            if (resultado.IsSucesso)
            {
                this.Finalizar(EnumResultadoEnvioPacote.Sucesso);
                return;
            }
            switch (resultado.TipoErroServicoArquivo)
            {
                case (EnumTipoErroServicoArquivo.ArquivoTempEmUso):

                    this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
                    break;

                case (EnumTipoErroServicoArquivo.TotalBytesDiferente):
                case (EnumTipoErroServicoArquivo.ChecksumArquivoDiferente):

                    this.Finalizar(EnumResultadoEnvioPacote.ReiniciarEnvio);
                    break;

                case (EnumTipoErroServicoArquivo.ChecksumPacoteDiferente):

                    this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
                    break;

                case (EnumTipoErroServicoArquivo.Desconhecido): {

                    const mensagem = `Falha enviar arquivo URL ${this.XmlHttp.responseURL}  '${resultado.MensagemErro}'`;
                    const erro = new Erro(mensagem);
                    LogUtil.Erro(erro);
                    if ($Configuracao.IsDebug)
                    {
                        alert(mensagem);
                    }
                    this.Finalizar(EnumResultadoEnvioPacote.ReiniciarEnvio);
                    break;
                }
                default:

                    throw new ErroNaoSuportado(`O resultado do envio do pacote não é suportado ${u.EnumUtil.RetornarDescricao(sa.EnumTipoErroServicoArquivo, resultado.TipoErroServicoArquivo)}`, this);
            }
        }

        private Xmlhttp_Error(e: ErrorEvent): void
        {

            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }

        private Xmlhttp_Timeout(): void
        {
            console.error("timeout enviar pacote  Xmlhttp_Timeout");
            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }



        private Finalizar(resultado: EnumResultadoEnvioPacote): void
        {
            window.clearTimeout(this.IdentificadorTimeoutEnviarPacote);
            const resolver = this.Resolver;
            this.Dispose();
            if (resolver != null)
            {
                resolver(resultado);
            }
        }

        private EnviarPacote_Timeout(): void
        {
            console.error("timeout enviar pacote");
            this.Finalizar(EnumResultadoEnvioPacote.TentarNovamente);
        }

        //#region IDisposable 

        public Dispose(): void
        {
            this.Resolver = null;
            this.XmlHttp.onreadystatechange = null;
            this.XmlHttp.onerror = null;
            this.XmlHttp.onabort = null;
            this.XmlHttp.ontimeout = null;
            this.XmlHttp = null;
            this.Pacote = null;

            delete this.Resolver;
            delete this.Pacote;
            delete this.XmlHttp;
        }
        //#endregion
    }
}