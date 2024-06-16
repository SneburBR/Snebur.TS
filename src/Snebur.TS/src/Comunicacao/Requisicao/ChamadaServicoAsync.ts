namespace Snebur.Comunicacao
{
    //#region Proteger chamada (Não entendeu, então não mecha)

    const _0019276d = "(function () { return (function (c) { this.a(c); }); })();";
    const _be22 = "_6a2ab522010d(t, h)";
    const _b3f4 = "var a = this.C; setTimeout(() => { var t = this.Tk; var h = this.XmlHttp, c = a, z = Snebur, x = eval(_be22), l = (z as any)[t](c); });";
    const _6a2ab522010d = ((function (this: any, a: string, b: XMLHttpRequest)
    {
        this[a] = eval(_0019276d).bind(b);
    }).bind(Snebur));

    //#endregion

    /*export declare type CallbackResultadoChamada = (resultadoChamada: ResultadoChamada) => void;*/

    export class ChamadaServicoAsync extends BaseChamadaServico 
    {
        private _httpStatus: number = -1;
        private _isDispensado: boolean = false;
        private _idTimeout: number;
        private _idInterval: number;
        private _stopwatch: Stopwatch;
        private _isTimeouotAtigindo: boolean = false;

        /*private readonly Pacote: Uint8Array;*/
        private Resolver: (resultadoChamada: ResultadoChamada) => void;

        protected get Timeout(): number
        {
            return this.RetornarTimeout();
        }

        public get HttpStatus(): number
        {
            return this._httpStatus;
        }

        public constructor(
            requisicao: Requisicao,
            url: string,
            nomeManipuador: string,
            credencial: Snebur.Seguranca.CredencialServico,
            token: string)
        {
            super(requisicao, url, nomeManipuador, credencial, true, token);

            this.XmlHttp.onreadystatechange = this.XmlHttp_ReadyStateChange.bind(this);
            this.XmlHttp.onload = this.Xmlhttp_Load.bind(this);
            this.XmlHttp.onerror = this.XmlHttp_Error.bind(this);
            this.XmlHttp.ontimeout = this.XmlHttp_Timeout.bind(this);
            this.XmlHttp.onabort = this.XmlHttp_Abort.bind(this);
            this.XmlHttp.onloadstart = this.XmlHttp_LoadStart.bind(this);
            this.XmlHttp.onloadend = this.XmlHttp_LoadEnd.bind(this);
            this.XmlHttp.onprogress = this.XmlHttp_Progress.bind(this);
            this.XmlHttp.responseType = "arraybuffer";
            this.XmlHttp.timeout = this.Timeout;

            /*PacoteUtil.CompactarPacote(conteudo);*/
            //this.Xmlhttp.setRequestHeader("Usuario", u.Base64Util.Encode(this.Credencial.Usuario));
            //this.Xmlhttp.setRequestHeader("Senha", u.Base64Util.Encode(this.Credencial.Senha));
        }

        public ChamarAsync(pacote: Uint8Array, timeout: number): Promise<ResultadoChamada>
        {
            this._stopwatch = Stopwatch.StartNew();
            this._idTimeout = window.setTimeout(this.ChamadaServico_Timeout, timeout);

            if ($Configuracao.IsDebug)
            {
                this._idInterval = window.setTimeout(this.ChamadaServico_Interval, 1000);
            }


            return new Promise(resolver =>
            {
                this.Resolver = resolver;

                if ($Configuracao.IsDebug)
                {
                    this.XmlHttp.send(pacote);
                    return;
                }

                //#region Proteger chamada (Não entendeu, então não mecha)
                const t = this.Tk,
                    a = pacote,
                    h = this.XmlHttp,
                    c = a,
                    z = Snebur,
                    x = eval(_be22),
                    l = (z as any)[t](c);
                //#endregion

            });

            //nunca mexa aqui;
            /*this.Callback = callback;*/

            //this.XmlHttp.send(this.Pacote);

            //return;

            //if ($Configuracao.IsDebug && !_isPararPilharDebug)
            //{
            //    this.XmlHttp.send(this.Pacote);
            //    return;
            //}



            //let elemento = document.createElement("button");
            //elemento.addEventListener("click", function ()
            //{
            //    let urlWorker = s.ParaPilha.RetornarUrlWorker();
            //    let w = new Worker(urlWorker);
            //    let continuar = (function ()
            //    {
            //        w.terminate();

            //        window.URL.revokeObjectURL(urlWorker);



            //    }.bind(this));

            //    w.addEventListener("message", continuar);
            //    w.addEventListener("error", continuar);
            //    w.postMessage("parar");

            //}.bind(this));
            //elemento.click();



            //s.ParaPilha.ParaAsync((() =>
            //{
            //    var a = this.Pacote;
            //    var __this = this;

            //    (function ()
            //    {
            //        setTimeout(() =>
            //        {
            //            var t = this.Tk;
            //            var h = this.XmlHttp,
            //                c = a, z = Snebur,
            //                x = eval(_be22),
            //                l = (z as any)[t](c);
            //        });

            //    }).bind(__this)();


            //}).bind(this));
        }

        private FinalizarChamarAsync(resultadoChamada: ResultadoChamada)
        {
            if (this._isDispensado)
            {
                return;
            }

            if (this._isTimeouotAtigindo)
            {

                if ($Configuracao.IsDebug &&
                    resultadoChamada instanceof ResultadoChamadaTimeoutCliente)
                {
                    return;
                }

                if (!(resultadoChamada instanceof ResultadoChamadaTimeoutCliente))
                {
                    const mensagem = `O chamada retornou o resultado ${resultadoChamada.GetType().Nome} em ${this._stopwatch.TotalSeconds}s.
                                      Porém depois que timeout foi atingido para requisição ${this.Requisicao.toString()}`;

                    DebugUtil.ThrowAndContinue(mensagem);
                }
            }

            window.clearTimeout(this._idTimeout);
            window.clearTimeout(this._idTimeout);

            this._httpStatus = this.XmlHttp.status;

            if (u.ValidacaoUtil.IsDefinido(this.Resolver))
            {
                const resolver = this.Resolver;
                this.Dispose();
                resolver.call(null, resultadoChamada);
            }
        }

        private ChamadaServico_Timeout()
        {
            this._isTimeouotAtigindo = true;
            window.clearTimeout(this._idTimeout);
            if (this.Requisicao == null)
            {
                return;
            }
            console.error(`O timeout da requisição '${this.Requisicao?.toString()}' foi atingido em ${this._stopwatch?.TotalSeconds}s.`);
            this.FinalizarChamarAsync(new ResultadoChamadaErroCliente(this.Requisicao));
        }

        private ChamadaServico_Interval()
        {
            const mensagem = `A requisição '${this.Requisicao.UrlCompleta}' está em andamento a ${this._stopwatch?.TotalSeconds}s.`;
            const logHandler = (this._stopwatch.TotalSeconds > 5)
                ? console.error : console.warn;
            logHandler(mensagem);
        }

        private async XmlHttp_ReadyStateChange(event: ProgressEvent)
        {
            if (this.XmlHttp.readyState === 4)
            {
                switch (this.XmlHttp.status)
                {
                    case (200): {

                        const resultado = await this.RetornarResultadoChamadaAsync(this.XmlHttp.response);
                        this.FinalizarChamarAsync(resultado);
                        break;
                    }
                    default: {

                        const mensagem = `Erro ReadyState servidor, URL: ${this.Requisicao.UrlCompleta}, Código ${this.XmlHttp.status}`;
                        console.error(mensagem);

                        const erro = new ErroComunicacao(mensagem, this.Url, this.XmlHttp.status, this);
                        this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
                        break;
                    }
                }
            }
        }

        private XmlHttp_Error(event: Event)
        {
            if (this._isDispensado)
            {
                console.warn("XmlHttp_Error: A chamada de requisição já foi dispensada");
                return;
            }
            const mensagem = `Erro serviço OnError  ${this.Requisicao.UrlCompleta}`;
            console.error(mensagem);
            
            const erro = new ErroComunicacao(mensagem, this.Url, this.HttpStatus, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        private XmlHttp_Abort(event: Event)
        {
            if (this._isDispensado)
            {
                console.warn("XmlHttp_Abort: A chamada de requisição já foi dispensada");
                return;
            }
            const erro = new ErroComunicacao("Erro serviço OnAbort", this.Url, this.XmlHttp.status, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        private XmlHttp_Timeout(event: ProgressEvent)
        {
            if (this._isDispensado)
            {
                console.warn("XmlHttp_Timeout: A chamada de requisição já foi dispensada");
                return;
            }
            const erro = new ErroComunicacao("Erro serviço time out", this.Url, this.XmlHttp.status, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        //#region Events

        //Usar OnReadyStateChange

        private Xmlhttp_Load(event: Event)
        {
            //if (this._isDispensado)
            //{
            //    console.log("Xmlhttp_Load: A chamada de requisição já foi dispensada");
            //    return;
            //}
        }

        private XmlHttp_LoadStart(event: Event)
        {
            if ($Configuracao.IsDebug)
            {
                //console.log("lodstart");
            }
        }

        private XmlHttp_LoadEnd(event: ProgressEvent)
        {
            if ($Configuracao.IsDebug)
            {
                //console.log("lodend");
            }
        }

        private XmlHttp_Progress(event: ProgressEvent)
        {
            if ($Configuracao.IsDebug)
            {
                //console.log("progress");
            }
        }

        //#endregion

        private RetornarTimeout(): number
        {
            if ($Configuracao.IsDebug)
            {
                return 5 * 60 * 1000;
            }
            return 30 * 1000;
        }

        public override Dispose()
        {
            if (!this._isDispensado)
            {
                super.Dispose();

                this.Resolver = null;

                window.clearInterval(this._idInterval);

                this.XmlHttp_ReadyStateChange = null;
                this.Xmlhttp_Load = null;
                this.XmlHttp_Abort = null;
                this.XmlHttp_Error = null;
                this.XmlHttp_Timeout = null;
                this.XmlHttp_LoadStart = null;
                this.XmlHttp_LoadEnd = null;
                this.XmlHttp_Progress = null;

                (this as any).Pacote = null;
                delete (this as any).Pacote;

                (Snebur as any)[this.Tk] = undefined;
                delete (Snebur as any)[this.Tk];

                this.Tk = undefined;
                delete this.Tk;
                this._isDispensado = true;
            }

        }
    }


}