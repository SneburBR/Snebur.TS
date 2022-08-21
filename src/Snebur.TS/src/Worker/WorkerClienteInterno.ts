namespace Snebur.WebWorker
{
    export class WorkerClienteInterno  
    {
        public static readonly TIMEOUT: number = 120 * 1000;
        private Worker: Worker;
        private Callback: (resultado: any) => void;
        private IdTimeout: number;
        private readonly UrlWorker: string;

        public constructor(url: string)
        {

            if (typeof $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker === "function")
            {
                url = $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker(url);
            }

            this.UrlWorker = url;
        }

        public async InicializarAsync()
        {
            const urlWorker = await UrlWorkerUtil.RetornarUrlCompletaServicoWorker(this.UrlWorker);
            this.Worker = new Worker(urlWorker);
            this.Worker.onmessage = this.Worker_Message.bind(this);
            this.Worker.onerror = this.Worker_Error.bind(this);
        }

        private Worker_Message(e: MessageEvent): void
        {
            if (e instanceof ErrorEvent)
            {
                this.Worker_Error(e);
                return;
            }
            let retorno = e.data;
            if (retorno.IsErro && !String.IsNullOrWhiteSpace(retorno.MessagemErro))
            {
                const mensagem = `Erro no worker ${this.UrlWorker} ${e.data.MessagemErro ?? "Erro desconhecido"}`;
                retorno = new Error(mensagem);
                LogUtil.Erro(retorno);
            }
            this.Worker.terminate();
            this.Finalizar(retorno);
        }
        private Worker_Error(e: ErrorEvent): void
        {
            this.Worker.terminate();
            let mensagem = `Worker ${this.UrlWorker}, linha ${e.lineno}, coluna ${e.colno}`;
            mensagem += `\r\n ${e.message ?? e.error?.message ?? "erro desconhecido"}`;
            const erro = new Erro(mensagem);
            LogUtil.Erro(erro);
            this.Finalizar(erro);
        }

        public EnviarMensagem(mensagem: any, callback: (resultado: any) => void): void
        {
            this.Callback = callback;
            if (this.IdTimeout > 0)
            {
                throw new Erro("J� existe gerenciador timeout atingido");
            }
            this.IdTimeout = window.setTimeout(() =>
            {
                const erro = new ErroTimeout(`O timeout do servi�o ${this.UrlWorker}`);
                LogUtil.Erro(erro);
                this.Finalizar(erro);

            }, WorkerClienteInterno.TIMEOUT);

            this.Worker.postMessage(mensagem);
        }


        //#region Carregar url

     

        //#endregion
        public Finalizar(resultado: Error | any): void
        {
            window.clearTimeout(this.IdTimeout);
            if (this.Callback != null)
            {
                this.Callback(resultado);
                this.Callback = null;
                this.Worker?.terminate();
                delete this.Worker;
            }

        }
    }
}