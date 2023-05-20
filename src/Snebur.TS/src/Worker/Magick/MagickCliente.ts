
namespace Snebur.WebWorker
{
    export class MagickWorkerCliente  
    {
        private static readonly UrlWorkerDebug: string = "/build/MagickWorker.js?";
        private static readonly TIMEOUT = 1 * 60 * 1000;

        private readonly IsReciclar: boolean = true;

        private _isProcessando: boolean = false;
        private Worker: Worker;
        private Opcoes: IOpcoesMagick = null;
        private Resolver: (r: IResultadoMagick) => void;
        private IdTimeout: number = null;
        private MensagemErro: string;

        private __Worker_Message: (e: MessageEvent) => void;
        private __Worker_Error: (e: ErrorEvent) => void;
        private __Worker_MessageError: (e: MessageEvent) => void;

        public get UrlWorker(): string
        {
            if (!$Configuracao.IsDebug && ValidacaoUtil.IsUrlBlob(this.UrlBlobWorker))
            {
                return this.UrlBlobWorker;
            }
            return MagickWorkerCliente.UrlWorkerDebug + $Configuracao.Versao;
        }

        public constructor(
            public readonly Numero: number,
            public readonly UrlBlobWorker: string = null)
        {

            this.__Worker_Message = this.Worker_Message.bind(this);
            this.__Worker_Error = this.Worker_Error.bind(this);
            this.__Worker_MessageError = this.Worker_MessageError.bind(this);
        }

        public async ProcessarAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick | null>
        {

            if (this._isProcessando)
            {
                DebugUtil.ThrowAndContinue("O Worker estava processando");
                return null;
            }
            window.clearInterval(this.IdTimeout);

            this._isProcessando = true;
            this.InicializarWorker();

            return new Promise(resolver =>
            {
                this.Resolver = resolver;
                this.Opcoes = opcoes;
                this.Worker.postMessage(this.Opcoes);
                this.IdTimeout = window.setTimeout(this.Worker_Timeout.bind(this), MagickWorkerCliente.TIMEOUT);
            });
        }

        private InicializarWorker()
        {
            if (this.IsReciclar || this.Worker === null)
            {
                this.Dispose();
            }

            this.Worker = new Worker(this.UrlWorker);
            this.Worker.addEventListener("message", this.__Worker_Message);
            this.Worker.addEventListener("error", this.__Worker_Error);
            this.Worker.addEventListener("messageerror", this.__Worker_MessageError);
        }

        private Worker_Message(e: MessageEvent)
        {
            const isSucesso = e.data != null &&
                !(e.data instanceof Error) &&
                this.Opcoes?.Identificador === (e.data as IResultadoMagick).Identificador;

            this.MensagemErro = isSucesso ? null : `Message: ${JSON.stringify(e.data)}`;
            this.Finalizar(isSucesso, e.data);
        }


        private Worker_Error(e: ErrorEvent)
        {
            this.MensagemErro = `Error: ${e.message}. ${e.error}`;
            this.Finalizar(false);
        }

        private Worker_MessageError(e: MessageEvent)
        {
            this.MensagemErro = "MessageError: " + e.data;
            this.Finalizar(false);
        }

        private Worker_Timeout()
        {
            this.MensagemErro = "Timeout";
            this.Finalizar(false);
        }

        private Finalizar(isSucesso: boolean, resultado: IResultadoMagick = null)
        {
            if (this.IsReciclar)
            {
                this.Dispose();
            }
             
            window.clearInterval(this.IdTimeout);
            const resolver = this.Resolver;
            const opcoes = this.Opcoes;
            if (resolver != null && opcoes != null)
            {
                if (!isSucesso)
                {
                    DebugUtil.ThrowAndContinue(`Falha Worker : ${this.MensagemErro}, Arquivo ${opcoes?.NomeArquivoOrigem}`);
                }

                this.Resolver = null;
                this.Opcoes = null;

                this.MensagemErro = null;
                this._isProcessando = false;
                resolver(resultado);
            }
        }

        public Dispose(): void
        {
            if (this.Worker instanceof Worker)
            {
                console.warn("Dispensando MagickWorkerCliente n " + this.Numero);
                this.Worker.terminate();
                this.Worker.removeEventListener("message", this.__Worker_Message);
                this.Worker.removeEventListener("error", this.__Worker_Error);
                this.Worker.removeEventListener("messageerror", this.__Worker_MessageError);
                this.Worker = null;
                delete this.Worker;
            }
        }
    }
}
