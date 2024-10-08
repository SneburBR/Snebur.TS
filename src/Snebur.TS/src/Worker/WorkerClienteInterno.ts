﻿namespace Snebur.WebWorker
{
    export class WorkerClienteInterno  
    {
        public static readonly TIMEOUT: number = 120 * 1000;
        private Worker: Worker;
        private Callback: (resultado: any) => void;
        private IdTimeout: number;

        private readonly UrlWorkerRelativa: string;
        private UrlWorker: string;

        public constructor(url: string,
            public readonly IsDebug: boolean)
        {
            if (typeof $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker === "function")
            {
                url = $Aplicacao.FuncaoNormalizarUrlRelativaWebWorker(url);
            }
            this.UrlWorkerRelativa = url;
        }

        public async InicializarAsync()
        {
            await this.InicializarUrlWorker();

            if (!this.IsDebug && !ValidacaoUtil.IsUrlBlob(this.UrlWorker))
            {
                console.error("Não foi possível carregar o urlblob do serviço worker.");
                console.error(`Url. ${$Configuracao.UrlServicosWorker}`);
                console.error(`Configuração ${JSON.stringify($Configuracao)}`);
                console.error(`UrlWorkerFINAL : ${this.UrlWorker}`);
                console.error("Não foi possível carregar o urlblob do serviço worker.");
            }

            this.Worker = new Worker(this.UrlWorker);
            this.Worker.onmessage = this.Worker_Message.bind(this);
            this.Worker.onerror = this.Worker_Error.bind(this);
        }

        private async InicializarUrlWorker(): Promise<void> 
        {
            if (this.UrlWorker == null)
            {
                this.UrlWorker = await this.RetornarUrlWorkderAsync();
            }
        }

        private RetornarUrlWorkderAsync(): string | PromiseLike<string>
        {
            if (this.IsDebug)
            {
                return this.UrlWorkerRelativa;
            }

            if (ValidacaoUtil.IsUrlBlob(this.UrlWorkerRelativa))
            {
                return this.UrlWorkerRelativa;
            }
            return UrlWorkerUtil.RetornarUrlCompletaServicoWorker(this.UrlWorkerRelativa);
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
            let mensagem = `Worker: ${this.UrlWorker}, linha ${e.lineno}, coluna ${e.colno}`;
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
                throw new Erro("Já existe gerenciador timeout atingido");
            }
            this.IdTimeout = window.setTimeout(() =>
            {
                const erro = new ErroTimeout(`O timeout do serviço ${this.UrlWorker}`);
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