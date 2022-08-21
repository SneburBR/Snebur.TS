namespace Snebur.Imagem
{
    export abstract class BaseAbrirImagemLocal implements IDisposable
    {
        private readonly TEMPO_TIMEOUT_IMAGEM_ORIGINAL = ($Configuracao.IsDebug) ? 5 * 60 * 1000 : 60 * 1000;

        private IdentificadorTimeoutAbirImagemOriginal: number;
        private IsErro: boolean;

        protected readonly Qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO;
        protected readonly OrigemImagemLocal: sa.OrigemImagemLocal;
        protected readonly ArquivoLocal: SnBlob;
        protected readonly UrlBlobLocal: string;
        protected ImagemLocal: HTMLImageElement;
         
        protected set Erro(value: Erro)
        {
            this.OrigemImagemLocal.ErroAbrirImagem = value;
        }

        protected FuncaoResolver: (resultado: any) => void;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal)
        {
            this.OrigemImagemLocal = origemImagemLocal;

            this.ArquivoLocal = this.OrigemImagemLocal.ArquivoLocal;
            this.UrlBlobLocal = window.URL.createObjectURL(this.ArquivoLocal.Blob);
        }

        protected CarregarImagemLocal()
        {
            this.ImagemLocal = new Image();
            this.ImagemLocal.onload = this.ImagemOriginalLocal_Carregada.bind(this);
            this.ImagemLocal.onerror = this.ImagemOriginalLocal_Erro.bind(this);
            this.ImagemLocal.onabort = this.ImagemOriginalLocal_Erro.bind(this);
            this.ImagemLocal.src = this.UrlBlobLocal;
            this.IdentificadorTimeoutAbirImagemOriginal = setTimeout(this.ImagemOriginalLocal_Timeout.bind(this), this.TEMPO_TIMEOUT_IMAGEM_ORIGINAL);
        }

        protected ImagemOriginalLocal_Erro(e: ErrorEvent): void
        {
            this.IsErro = true;
            this.Erro = new Erro("Erro ao abrir imagem", e.error);
            this.Resolver(null);
        }

        protected ImagemOriginalLocal_Timeout()
        {
            this.IsErro = true;
            this.Erro = new ErroTimeout("O tempo máximo para abrir a imagem original foi atingido");
            this.Resolver(null);
        }

        protected ImagemOriginalLocal_Carregada(e: Event) 
        {
            window.clearTimeout(this.IdentificadorTimeoutAbirImagemOriginal);
        }

        protected RetornarImagemData(imagem: HTMLImageElement , dimensao: IDimensao): [HTMLCanvasElement, ImageData]
        {
            const canvas = document.createElement("canvas");
            canvas.width = dimensao.Largura;
            canvas.height = dimensao.Altura;
            const contexto = canvas.getContext("2d");
            contexto.drawImage(this.ImagemLocal, 0, 0, dimensao.Largura, dimensao.Altura);
            const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
            return [canvas, imageData];
        } 

        protected Resolver(args: any): void
        {
            this.Dispose();
            this.FuncaoResolver(args);
            delete this.FuncaoResolver;
        }

        public Dispose(): void
        {
            if (this.ImagemLocal)
            {
                this.ImagemLocal.onload = null;
                this.ImagemLocal.onerror = null;
                this.ImagemLocal.src = u.ImagemUtil.ImagemVaziaBase64;

                window.URL.revokeObjectURL(this.UrlBlobLocal);
                delete this.ImagemLocal;
            }
        }
    }
}