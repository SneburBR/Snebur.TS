
namespace Snebur.WebWorker
{
    export class MagickWorkerCliente  
    {
        private static readonly UrlWorkerDebug: string = "/build/MagickWorker.js?";
        private static readonly TIMEOUT = 2 * 60 * 1000;

        private _isProcessando: boolean = false;
        private readonly Worker: Worker;
        private Opcoes: IOpcoesMagick = null;
        private Resolver: (r: IResultadoMagick) => void;
        private IdTimeout: number = null;
        private MensagemErro: string;

        public get UrlWorker(): string
        {
            if (ValidacaoUtil.IsUrlBlob(this.UrlBlobWorker))
            {
                return this.UrlBlobWorker;
            }
            return MagickWorkerCliente.UrlWorkerDebug + $Configuracao.Versao;
        }

        public constructor(
            public readonly Numero: number,
            public readonly UrlBlobWorker: string = null)
        {
            this.Worker = new Worker(this.UrlWorker);
            this.Worker.addEventListener("message", this.Worker_Message.bind(this));
            this.Worker.addEventListener("error", this.Worker_Error.bind(this));
            this.Worker.addEventListener("messageerror", this.Worker_MessageError.bind(this));
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

            return new Promise(resolver =>
            {
                this.Resolver = resolver;
                this.Opcoes = opcoes;
                this.Worker.postMessage(this.Opcoes);
                this.IdTimeout = window.setTimeout(this.Worker_Timeout, MagickWorkerCliente.TIMEOUT);
            });
        }

        private Worker_Message(e: MessageEvent)
        {
            const isSucesso = e.data != null && this.Opcoes?.Identificador === (e.data as IResultadoMagick).Identificador;
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
            window.clearInterval(this.IdTimeout);
            const resolver = this.Resolver;
            const opcoes = this.Opcoes;
            if (resolver != null && opcoes != null)
            {
                this.Resolver = null;
                this.Opcoes = null;

                if (!isSucesso)
                {
                    DebugUtil.ThrowAndContinue(`Falha Worker : ${this.MensagemErro}, Arquivo ${this.Opcoes.NomeArquivoOrigem}`);
                }
                this.MensagemErro = null;
                this._isProcessando = false;
                resolver(resultado);
            }
        }

        public Dispose(): void
        {
            console.warn("Dispensando MagickWorkerCliente n " + this.Numero);
            this.Worker?.terminate();
            (this as any).Worker = null;
        }
    }
}
