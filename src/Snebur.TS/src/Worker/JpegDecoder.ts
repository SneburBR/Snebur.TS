namespace Snebur.WebWorker
{
    export class JpegDecoder
    {
        private readonly UrlWorkerRelativa = "/workers/Snebur.JpegDecoder.js";
        private readonly Arquivo: Blob;
        private readonly RotacaoExif: number;

        private Worker: Worker;
        private Resolver: (value?: Blob | Error) => void;
        private Resultado: Blob | Error;
        private CallbackProgresso: (progresso: number) => void;
        private ProgresoAtual: number;
        private IdTimeout: number;
        private UrlWorkerFinal: string;

        public constructor(arquivo: Blob, rotacaoExif: number, callbackProgresso: (progresso: number) => void) 
        {
            this.CallbackProgresso = callbackProgresso;
            this.RotacaoExif = rotacaoExif;
            this.Arquivo = arquivo;
        }

        public async InicializarAsync()
        {
            this.UrlWorkerFinal = await UrlWorkerUtil.RetornarUrlCompletaServicoWorker(this.UrlWorkerRelativa);
            this.Worker = new Worker(this.UrlWorkerFinal);
            this.Worker.onmessage = this.Worker_OnError.bind(this);
            this.Worker.onerror = this.Worker_OnMessage.bind(this);
        }

        private Worker_OnMessage(e: MessageEvent)
        {
            if (e instanceof ErrorEvent)
            {
                this.Worker_OnError(e);
                return;
            }
            if (e.data?.IsProgresso >= 0)
            {
                this.NotificarProgresso(e.data.Progresso);

                switch (e.data.Etapa)
                {
                    case EnumEtapaDecoder.Decoder:

                        this.IdentificadorProgressoDecoderFace = window.setInterval(this.NotificarProgressoDecoderFake.bind(this), 1000);
                        break;

                    default:
                        window.clearInterval(this.IdentificadorProgressoDecoderFace);
                        break;
                }
                return;
            }
            let resultado = e.data;
            if (resultado.IsErro && !String.IsNullOrWhiteSpace(resultado.MessagemErro))
            {
                const mensagem = `Erro no worker ${this.UrlWorkerFinal} ${resultado.MessagemErro ?? "Erro desconhecido"}`;
                resultado = new Error(mensagem);
                LogUtil.Erro(resultado);
            }
            this.Resultado = resultado;
            this.Finalizar();
        }

        private IdentificadorProgressoDecoderFace: number;

        private NotificarProgresso(progresso: number)
        {
            if (this.CallbackProgresso instanceof Function)
            {
                this.CallbackProgresso(progresso);
            }
        }

        private NotificarProgressoDecoderFake()
        {
            if (this.ProgresoAtual < 50)
            {
                const progresso = this.ProgresoAtual + 1;
                this.NotificarProgresso(progresso);
            }
        }

        private Worker_OnError(e: ErrorEvent)
        {
            const mensagem = `Erro worker : '${e.message ?? e.error?.message ?? "erro desconhecido"}' url:  '${this.UrlWorkerFinal}', arquivo: ${e.filename} linha ${e.lineno}, coluna ${e.colno}`;
            this.Resultado = new Erro(mensagem);
            this.Finalizar();
        }

        public RetornarBlobAsync(dimensaoDestino: IDimensao, recorte: IRecorte, dimensaoFoto: IDimensao, qualidade: number): Promise<Blob | Error>
        {
            return new Promise<Blob | Error>(resolver =>
            {
                this.Resolver = resolver;

                if (this.IdTimeout > 0)
                {
                    throw new Erro("Já existe gerenciador timeout atingido");
                }

                this.IdTimeout = window.setTimeout(() =>
                {
                    const erro = new ErroTimeout("Timeout JpegDecoder foi atingido");
                    LogUtil.Erro(erro);
                    this.Resultado = erro;
                    this.Finalizar();
                }, WorkerClienteInterno.TIMEOUT);

                if (dimensaoFoto instanceof Dimensao)
                {
                    dimensaoFoto = {
                        Largura: dimensaoFoto.Largura,
                        Altura: dimensaoFoto.Altura
                    };
                }
                const rotacaoExif = this.RotacaoExif;
                const mensagem: IMensageJpegDecoder = {
                    Arquivo: this.Arquivo,
                    LarguraDestino: dimensaoDestino.Largura,
                    AlturaDestino: dimensaoDestino.Altura,
                    RotacaoExif: rotacaoExif,
                    Recorte: recorte,
                    DimensaoFoto: dimensaoFoto,
                    Qualidade: qualidade
                };

                this.Worker.postMessage(mensagem);
            });
        }

        private Finalizar(): void
        {
            window.clearTimeout(this.IdTimeout);
            if (this.Resolver != null)
            {
                this.Worker.terminate();
                this.Worker = null;
                this.Resolver(this.Resultado);
                this.Resultado = null;
            }
        }
    }
}