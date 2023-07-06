
namespace Snebur.WebWorker
{
    export class MagickWorkerCliente  
    {
        private static readonly UrlWorkerDebug: string = "/build/MagickWorker.js?";
        private static readonly TIMEOUT_VISUALIZACAO = 1 * 60 * 1000;
        private static readonly TIMEOUT_IMPRESSAO = 3 * 60 * 1000;

        private _isProcessando: boolean = false;
        private _isReciclarPedente: boolean = false;
        private Worker: Worker;

        private get IsReciclar(): boolean
        {
            return this._isReciclarPedente ||
                this.TotalProcessado >= this.TotalProcessosReciclar;
        }

        public get UrlWorker(): string
        {
            if (!$Configuracao.IsDebug && ValidacaoUtil.IsUrlBlob(this.UrlBlobWorker))
            {
                return this.UrlBlobWorker;
            }
            return MagickWorkerCliente.UrlWorkerDebug + $Configuracao.Versao;
        }

        private TotalProcessado: number = 0;

        private IdentificadorMensagem: string;
        private NomeArquivoOrigem: string;


        public constructor(
            public readonly Numero: number,
            public readonly UrlBlobWorker: string,
            public readonly TotalProcessosReciclar: number)
        {
            //this.__Worker_Message = this.Worker_Message.bind(this);
            //this.__Worker_Error = this.Worker_Error.bind(this);
            //this.__Worker_MessageError = this.Worker_MessageError.bind(this);
        }

        public async ProcessarAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick | null>
        {
            if (this._isProcessando)
            {
                this.LogErro(opcoes, "Processando");
                DebugUtil.ThrowAndContinue("O Worker estava processando");
                return null;
            }
            /*window.clearInterval(this.IdTimeout);*/

            const identificadorMensagem = GuidUtil.RetornarNovoGuid();
            const memsnagem: IMensagemMagickWorker = {
                IdentificadorMensagem: identificadorMensagem,
                Opcoes: opcoes,
                MagickInit: {
                    BlobWasm: i.MagickInitUtil.BlobWasm,
                    UrlBlobMagick: i.MagickInitUtil.UrlBlobMagick,
                    BytesPerfilSRGB: i.MagickInitUtil.BytesPerfilSRGB,
                }
            };

            return new Promise(resolver =>
            {
                /*this.Resolver = resolver;*/

                this._isProcessando = true;

                const ontimeout = () =>
                {
                    this.LogErro(opcoes, `ontimeout`);
                    resolver(null);
                };

                const timeout = $Configuracao.IsDebug ? 20 * 60 * 1000:
                    opcoes.Redimensinamentos.Any(x => x.TamanhoImagem === EnumTamanhoImagem.Impressao) ?
                    MagickWorkerCliente.TIMEOUT_IMPRESSAO : MagickWorkerCliente.TIMEOUT_VISUALIZACAO;
                const idTimeout = window.setTimeout(ontimeout.bind(this), timeout);

                const worker = this.RetornarWorker();
                worker.onmessage = (e) =>
                {
                    window.clearInterval(idTimeout);
                    let resultado = e.data;
                    const isSucesso = e.data != null && identificadorMensagem === (e.data as IResultadoMagickWorker).IdentificadorMensagem;

                    if (!isSucesso)
                    {
                        resultado = null;
                        this.LogErro(opcoes, `onmessage: ${JsonUtil.TrySerializar(e.data)}`);
                    }

                    this.TotalProcessado += 1;
                    this.Finalizar(isSucesso);
                    resolver(resultado);
                };

                worker.onmessageerror = (e) =>
                {
                    window.clearInterval(idTimeout);
                    this.LogErro(opcoes, `onmessageerror: ${JsonUtil.TrySerializar(e.data)}. ${e}`);
                    this.Finalizar(false);
                    resolver(null);
                };

                worker.onerror = (e) =>
                {
                    window.clearInterval(idTimeout);
                    this.LogErro(opcoes, `onerror: ${e.message}: \r\nArquivo:${e.filename}\r\n Linha: ${e.lineno}, Col:${e.colno}  ${u.ErroUtil.RetornarMensagemErro(e.error)}`);
                    this.Finalizar(false);
                    resolver(null);
                };

                this.IdentificadorMensagem = identificadorMensagem;
                this.NomeArquivoOrigem = opcoes.NomeArquivoOrigem;
                this.Worker.postMessage(memsnagem);
                /*this.IdTimeout = window.setTimeout(this.Worker_Timeout.bind(this), MagickWorkerCliente.TIMEOUT);*/
            });
        }

        public Reciclar()
        {
            if (this._isProcessando)
            {
                this._isReciclarPedente = true;
                return;
            }
            this.Dispose();
        }

        private RetornarWorker()
        {
            if (this.IsReciclar || this.Worker === null)
            {
                this.Dispose();
            }

            if (this.Worker == null)
            {
                this.Worker = new Worker(this.UrlWorker);
            }
            return this.Worker;
        }

        private Finalizar(isSucesso: boolean)
        {
            if (this.IsReciclar || !isSucesso)
            {
                this.Dispose();
            }
            this._isProcessando = false;
        }

        private LogErro(opcoes: IOpcoesMagick, mensagem: string)
        {
            console.error(`Error MagickWorker ${this.Numero} - Arquivo: ${opcoes.NomeArquivoOrigem} - ${mensagem}`);
        }

        public Dispose(): void
        {
            if (this.Worker instanceof Worker)
            {
                console.warn("Reciclando MagickWorkerCliente Thread " + this.Numero);
                this.Worker.terminate();
                this.Worker = null;
                this.TotalProcessado = 0;
                delete this.Worker;
            }
        }


    }
}
