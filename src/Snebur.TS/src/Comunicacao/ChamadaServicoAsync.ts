

namespace Snebur.Comunicacao
{


    //#region Proteger chamada

    const _0019276d = "(function () { return (function (c) { this.a(c); }); })();";
    const _be22 = "_6a2ab522010d(t, h)";
    const _b3f4 = "var a = this.C; setTimeout(() => { var t = this.Tk; var h = this.XmlHttp, c = a, z = Snebur, x = eval(_be22), l = (z as any)[t](c); });";
    const _6a2ab522010d = ((function (this: any, a: string, b: XMLHttpRequest)
    {
        this[a] = eval(_0019276d).bind(b);
    }).bind(Snebur));

    //#endregion

    /*export declare type CallbackResultadoChamada = (resultadoChamada: ResultadoChamada) => void;*/

    export class ChamadaServicoAsync extends BaseChamadaServico implements IDisposable
    {
        private _httpStatus: number = -1;

        private Resolver: (resultadoChamada: ResultadoChamada) => void;
        Pacote: Uint8Array;

        protected get Timeout(): number
        {
            return this.RetornarTimeout();
        }

        public get HttpStatus(): number
        {
            return this._httpStatus;
        }

        public constructor(url: string, nomeManipuador:
            string, conteudo: string,
            credencial: Snebur.Seguranca.CredencialServico, token: string)
        {
            super(url, nomeManipuador, conteudo, credencial, true, token);



            this.XmlHttp.onreadystatechange = this.XmlHttp_ReadyStateChange.bind(this);
            this.XmlHttp.onload = this.Xmlhttp_Load.bind(this);
            this.XmlHttp.onerror = this.XmlHttp_Error.bind(this);
            this.XmlHttp.ontimeout = this.XmlHttp_Timeout.bind(this);
            this.XmlHttp.onabort = this.XmlHttp_Abort.bind(this);
            this.XmlHttp.onloadstart = this.XmlHttp_LoadStart.bind(this);
            this.XmlHttp.onloadend = this.XmlHttp_LoadEnd.bind(this);
            this.XmlHttp.onprogress = this.XmlHttp_Progress.bind(this);
            this.XmlHttp.responseType = "arraybuffer";
            this.Pacote = PacoteUtil.CompactarPacote(conteudo);
            //this.Xmlhttp.setRequestHeader("Usuario", u.Base64Util.Encode(this.Credencial.Usuario));
            //this.Xmlhttp.setRequestHeader("Senha", u.Base64Util.Encode(this.Credencial.Senha));
        }

        public ChamarAsync() :Promise<ResultadoChamada>
        {
            return new Promise(resolver =>
            {
                this.Resolver = resolver;

                const t = this.Tk,
                    a = this.Pacote,
                    h = this.XmlHttp,
                    c = a,
                    z = Snebur,
                    x = eval(_be22),
                    l = (z as any)[t](c);

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
            this._httpStatus = this.XmlHttp.status;

            if (u.ValidacaoUtil.IsDefinido(this.Resolver))
            {
                const resolver = this.Resolver;
                this.Dispose();
                resolver.call(null, resultadoChamada);
            }
        }

        // adicionando um rando,

        private XmlHttp_ReadyStateChange(event: ProgressEvent)
        {
            if (this.XmlHttp.readyState === 4)
            {
                switch (this.XmlHttp.status)
                {
                    case (200): {

                        const resultado = this.RetornarResultadoChamada(this.XmlHttp.response);
                        this.FinalizarChamarAsync(resultado);
                        break;
                    }
                    default: {


                        const mensagem = `Erro ReadyState servidor, url: ${this.Url},  Código ${this.XmlHttp.status}`;
                        if ($Configuracao.IsDebug)
                        {
                            LogUtil.Erro(mensagem);
                        }
                        const erro = new ErroComunicacao(mensagem, this.Url, this.XmlHttp.status, this);
                        this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
                        break;
                    }
                }
            }
        }

        private XmlHttp_Error(event: Event)
        {
            const mensagem = "Erro serviço OnError  " + this.Url;
            if ($Configuracao.IsDebug)
            {
                LogUtil.Erro(mensagem);
            }
            const erro = new ErroComunicacao(mensagem, this.Url, this.XmlHttp.status, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        private XmlHttp_Abort(event: Event)
        {
            const erro = new ErroComunicacao("Erro serviço OnAbort", this.Url, this.XmlHttp.status, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        private XmlHttp_Timeout(event: ProgressEvent)
        {
            const erro = new ErroComunicacao("Erro serviço time out", this.Url, this.XmlHttp.status, this);
            this.FinalizarChamarAsync(this.RetornarResultadoChamadaErro(erro));
        }

        //#region Não suportado em todos navegadores 
        //Usar OnReadyStateChange

        private Xmlhttp_Load(event: Event)
        {
            if ($Configuracao.IsDebug)
            {
                //console.log("lod");
            }
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
            super.Dispose();

            this.Resolver = null;
            this.Pacote = null;

            this.XmlHttp_ReadyStateChange = null;
            this.Xmlhttp_Load = null;
            this.XmlHttp_Abort = null;
            this.XmlHttp_Error = null;
            this.XmlHttp_Timeout = null;
            this.XmlHttp_LoadStart = null;
            this.XmlHttp_LoadEnd = null;
            this.XmlHttp_Progress = null;

            (Snebur as any)[this.Tk] = undefined;
            delete (Snebur as any)[this.Tk];

            this.Tk = undefined;
            delete this.Tk;
        }
    }
}