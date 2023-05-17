namespace Snebur.Imagens
{
    export abstract class BaseAbrirImagemLocalCanvas implements IDisposable
    {
        private readonly TEMPO_TIMEOUT_IMAGEM_ORIGINAL = ($Configuracao.IsDebug) ? 5 * 60 * 1000 : 60 * 1000;

        private IdentificadorTimeoutAbirImagemOriginal: number;
        private IsErro: boolean;

        protected readonly Qualidade: number = u.ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS;
        protected readonly OrigemImagemLocal: sa.OrigemImagemLocal;
        protected readonly ArquivoLocal: SnBlob;
        /*protected readonly UrlBlobLocal: string;*/
        protected ImagemLocal: HTMLImageElement;

        protected set Erro(value: Erro)
        {
            this.OrigemImagemLocal.ErroAbrirImagem = value;
        }

        public get IsIcone(): boolean
        {
            if (MagickInitUtil.IsInicializado)
            {
                return false;
            }
            return this.OrigemImagemLocal.Imagem?.IsIcone;
        }

        protected FuncaoResolver: (resultado: any) => void;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal)
        {
            this.OrigemImagemLocal = origemImagemLocal;
            this.ArquivoLocal = this.OrigemImagemLocal.ArquivoLocal;
        }

        protected CarregarImagemLocal()
        {
            const url = this.IsIcone ? this.ArquivoLocal.UrlIcone : this.ArquivoLocal.UrlBlob;
            this.CarregarImagemLocalInterno(url);
        }

        protected CarregarImagemLocalInterno(url: string)
        {
            window.clearTimeout(this.IdentificadorTimeoutAbirImagemOriginal);

            const novoImagem = new Image();
            novoImagem.onload = this.ImagemOriginalLocal_Carregada.bind(this);
            novoImagem.onerror = this.ImagemOriginalLocal_Erro.bind(this);
            novoImagem.onabort = this.ImagemOriginalLocal_Erro.bind(this);
            novoImagem.crossOrigin = "Anonymous";

            this.IdentificadorTimeoutAbirImagemOriginal = setTimeout(this.ImagemOriginalLocal_Timeout.bind(this), this.TEMPO_TIMEOUT_IMAGEM_ORIGINAL);
            this.ImagemLocal = novoImagem;
            this.ImagemLocal.src = url;
        }

        protected ImagemOriginalLocal_Erro(e: ErrorEvent): void
        {
            window.clearTimeout(this.IdentificadorTimeoutAbirImagemOriginal);
            const msgErro = `Falha ao abrir imagem local:
                             Arquivo:${this.ArquivoLocal?.name} 
                             Erro: ${e.error} `;

            console.warn(msgErro);

            this.Erro = new Erro(msgErro, e.error);
            this.IsErro = true;
            this.Resolver(null);
        }

        protected ImagemOriginalLocal_Timeout()
        {
            this.IsErro = true;
            const msgErro = `O tempo máximo para abrir a imagem original foi atingido:
                             Arquivo: ${this.ArquivoLocal?.name} 
                             Erro: Timeout`;
            console.error(msgErro);

            this.Erro = new ErroTimeout(msgErro);
            this.Resolver(null);
        }

        protected ImagemOriginalLocal_Carregada(e: Event) 
        {
            window.clearTimeout(this.IdentificadorTimeoutAbirImagemOriginal);
        }

        protected RetornarImagemData(imagem: HTMLImageElement, dimensao: IDimensao): [HTMLCanvasElement, ImageData]
        {
            const canvas = document.createElement("canvas");
            canvas.width = dimensao.Largura;
            canvas.height = dimensao.Altura;
            const contexto = canvas.getContext("2d");
            contexto.drawImage(imagem, 0, 0, dimensao.Largura, dimensao.Altura);
            const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
            return [canvas, imageData];
        }

        protected RetornarCanvas(imagem: HTMLImageElement | HTMLCanvasElement, dimensao: IDimensao): HTMLCanvasElement
        {
            const canvas = document.createElement("canvas");
            canvas.width = dimensao.Largura;
            canvas.height = dimensao.Altura;
            const contexto = canvas.getContext("2d");
            contexto.drawImage(imagem, 0, 0, dimensao.Largura, dimensao.Altura);
            return canvas;
        }

        protected RetornarBlobAsync(
            canvas: HTMLCanvasElement,
            qualidade: number,
            mimeType: u.EnumMimeTypeImagemString.Jpeg | u.EnumMimeTypeImagemString.Webp): Promise<Blob>
        {
            return canvas.ToBlobAsync(mimeType, qualidade);

        }

        protected Resolver(args: any): void
        {
            window.clearTimeout(this.IdentificadorTimeoutAbirImagemOriginal);

            this.Dispose();

            if (this.FuncaoResolver != null)
            {
                this.FuncaoResolver(args);
                this.FuncaoResolver = null;
                delete this.FuncaoResolver;
            }
        }

        protected RetornarMimeType(): u.EnumMimeTypeImagemString.Jpeg | u.EnumMimeTypeImagemString.Webp
        {
            switch (this.OrigemImagemLocal.FormatoImagem)
            {
                case d.EnumFormatoImagem.JPEG:
                case d.EnumFormatoImagem.GIF:
                case d.EnumFormatoImagem.WEBP:
                case d.EnumFormatoImagem.BMP:

                    return u.EnumMimeTypeImagemString.Jpeg;

                default:

                    return u.EnumMimeTypeImagemString.Webp;

                /*throw new ErroNaoSuportado("O formato do imagem não é suportado");*/
            }
        }

        public Dispose(): void
        {
            if (this.ImagemLocal)
            {
                this.ImagemLocal.onload = null;
                this.ImagemLocal.onerror = null;
                this.ImagemLocal.src = u.ImagemUtil.ImagemVaziaBase64;
                this.ArquivoLocal.RevokeUrlBlob();
                delete this.ImagemLocal;
                delete (this as any).OrigemImagemLocal;
                delete (this as any).ArquivoLocal;
            }
        }
    }
}