namespace Snebur.Imagem
{
    export class ImagemLocalUtil
    {
        public static RetornarElementoImagemCarregadaAsync(urlImagem: string, isIgnorarErro: boolean): Promise<HTMLImageElement>
        {
            return new Promise<HTMLImageElement>(resolver =>
            {
                const imagem = new Image();
                imagem.crossOrigin = "*";
                imagem.onload = function ()
                {
                    resolver(imagem);
                };

                imagem.onerror = function ()
                {
                    if (isIgnorarErro)
                    {
                        resolver(null);
                        return;
                    }
                    throw new Error("Não foi possível carregar a imagem " + urlImagem);
                };

                imagem.src = urlImagem;
            });
        }

        public static CarregarImagemArquivoAsync(arquivo: SnBlob, alturaMaxima: number, timeout: number = 30000): Promise<ResultadoCarregarImagem>
        {
            /*eslint-disable*/
            return new Promise<ResultadoCarregarImagem>(async resolver =>
            {
                let identificadorTimeout = setTimeout(function ()
                {
                    identificadorTimeout = 0;
                    resolver({
                        IsErro: true,
                        Erro: new ErroTimeout(`Timeout ao abrir o arquivo ${arquivo}`)
                    });
                }, timeout);

                const carregarImagem = new CarregarImagemArquivo(arquivo, alturaMaxima);
                const resultado = await carregarImagem.CarregarImagemAsync();
                if (identificadorTimeout > 0)
                {
                    window.clearTimeout(identificadorTimeout);
                    resolver(resultado);
                }
            });
            /*eslint-enable*/
        }

        public static CarregarImagemUrlAsync(urlImagem: string, alturaImagem: number, formatoImagem: d.EnumFormatoImagem): Promise<ResultadoCarregarImagem>
        {
            const carregarImagem = new CarrgarImagemUrl(urlImagem, alturaImagem, formatoImagem);
            return carregarImagem.CarregarImagemAsync();
        }

        public static async CarregarThumbnailUrl(arquivo: SnBlob): Promise<string>
        {
            const url = await exifr.thumbnailUrl(arquivo.Blob);
            if (ValidacaoUtil.IsUrl(url))
            {
                return url;
            }

            const resultadoCarregarImagem = await ImagemLocalUtil.CarregarImagemArquivoAsync(arquivo, ConstantesImagemApresentacao.ALTURA_IMAGEM_PEQUENA);
            if (ValidacaoUtil.IsUrl(resultadoCarregarImagem.Url))
            {
                return url;
            }
            throw new Erro("Sem imagem");
        }

        private static _isNavegadorSuportarOrientacaoExif: boolean = undefined;
        private static readonly URL_IMAGEM_VERIFICAR_ORIENTACAO = "https://online.sigi.com.br/images/VerificarOrientacao.jpg";

        public static async IsNavegadorSuportarOrientacaoExifAsync(): Promise<boolean> 
        {
            if (typeof ImagemLocalUtil._isNavegadorSuportarOrientacaoExif === "boolean")
            {
                return ImagemLocalUtil._isNavegadorSuportarOrientacaoExif;
            }

            const elementoImagenm = await ImagemLocalUtil.RetornarElementoImagemCarregadaAsync(ImagemLocalUtil.URL_IMAGEM_VERIFICAR_ORIENTACAO, false);
            return elementoImagenm.naturalHeight > elementoImagenm.naturalWidth;
        }

        public static IsElementoImagemCarregado(elementoImagem: HTMLImageElement)
        {
            return elementoImagem.complete &&
                elementoImagem.naturalHeight > 0 &&
                elementoImagem.naturalWidth > 0;
        }

    }

    export abstract class CarrgarImagem 
    {
        protected readonly UrlImagem: string;
        protected readonly AlturaImagem: number;

        protected readonly FormatoImagem: d.EnumFormatoImagem;

        protected Imagem: HTMLImageElement;

        private Resolver: (resultado: ResultadoCarregarImagem) => void;

        private LarguraImagemRedimensionada: number = 0;
        private AlturaImagemRedimensionada: number = 0;
        private LarguraImagemOriginal: number = 0;
        private AlturaImagemOriginal: number = 0;
        private IdentificadorTimeout: number = null;
        private Qualidade: number;

        protected IsHeic: boolean = false;
        protected IsIcone: boolean = false;
        protected _erro: Error | null;

        public constructor(urlImagem: string, alturaImagem: number, formatoImagem: d.EnumFormatoImagem, qualidade: number)
        {
            this.UrlImagem = urlImagem;
            this.AlturaImagem = alturaImagem;
            this.FormatoImagem = formatoImagem;
            this.Imagem = new Image();
            this.Imagem.crossOrigin = "anonymous";
            this.Qualidade = qualidade;
        }


        public CarregarImagemAsync(): Promise<ResultadoCarregarImagem>
        {
            return new Promise<ResultadoCarregarImagem>(this.CarregarImagem_Resolver.bind(this));
        }

        private CarregarImagem_Resolver(resolver: (resultado: ResultadoCarregarImagem) => void): void
        {
            this.Resolver = resolver;
            this.Imagem.onload = this.Imagem_Carregada.bind(this);
            this.Imagem.onerror = this.Imagem_Error.bind(this);
            this.Imagem.style.width = "auto";
            this.Imagem.style.height = this.AlturaImagem.ToPixels();
            this.Imagem.style.objectFit = "contain";
            this.Imagem.src = this.UrlImagem;

            const timeout = $Configuracao.IsDebug ? Number.Int32MaxValue : 45000;

            this.IdentificadorTimeout = window.setTimeout(this.Imagem_ErroTimeout.bind(this), timeout);
        }

        private async Imagem_Carregada(e: Event) 
        {
            this.LarguraImagemOriginal = this.Imagem.naturalWidth;
            this.AlturaImagemOriginal = this.Imagem.naturalHeight;
            let isErro = false;
            let url: string = null;

            try
            {
                this.AlturaImagemRedimensionada = this.AlturaImagem;
                this.LarguraImagemRedimensionada = Math.round(this.LarguraImagemOriginal * this.AlturaImagem / this.AlturaImagemOriginal);

                const canvas = document.createElement("canvas");
                canvas.width = this.LarguraImagemRedimensionada;
                canvas.height = this.AlturaImagemRedimensionada;

                const contexto = canvas.getContext("2d");
                contexto.imageSmoothingEnabled = false;
                contexto.drawImage(this.Imagem, 0, 0, this.LarguraImagemRedimensionada, this.AlturaImagemRedimensionada);


                const blobImagem = await this.RetornarBlobAsync(canvas);
                url = window.URL.createObjectURL(blobImagem);

                u.ImagemUtil.LimarCanvas(canvas);
            }
            catch (erro)
            {
                console.error(`Falha salvar imagem ${this.UrlImagem} ${erro?.message ?? erro}`);
                isErro = true;
                url = null;
                this._erro = erro;
            }
            finally
            {
                this.Finalizar(isErro, url);
            }
        }

        private RetornarBlobAsync(canvas: HTMLCanvasElement): Promise<Blob>
        {
            if (this.IsIcone)
            {
                return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);
            }

            switch (this.FormatoImagem)
            {
                case d.EnumFormatoImagem.JPEG:
                case d.EnumFormatoImagem.BMP:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Jpeg, 1);

                case d.EnumFormatoImagem.PNG:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);

                default:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);
            }
        }

        protected async Imagem_Error(e: ErrorEvent) 
        {
            console.error(`Falha ao abrir imagem ${this.UrlImagem}`);
            this.Finalizar(true, null);
        }

        private Imagem_ErroTimeout(): void
        {
            console.error(`Timeout abrir  imagem ${this.UrlImagem}`);
            this.Finalizar(true, null);
        }

        protected Finalizar(isErro: boolean, url: string): void
        {
            window.clearTimeout(this.IdentificadorTimeout);

            this.Imagem.onload = this.ImagemVazia_Carregada.bind(this);
            this.Imagem.onerror = null;
            this.Imagem.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

            const resultado: ResultadoCarregarImagem = {
                IsErro: isErro,
                LarguraImagemOrigem: this.LarguraImagemOriginal,
                AlturaImagemOrigem: this.AlturaImagemOriginal,
                Url: url,
                IsHeic: this.IsHeic,
                Erro: this._erro,
                IsIcone: this.IsIcone,
            };

            const resolver = this.Resolver;
            this.Resolver = null;
            resolver(resultado);
        }

        private ImagemVazia_Carregada(): void
        {
            this.Imagem.onload = null;
            delete this.Imagem;
        }
    }

    export class CarregarImagemArquivo extends CarrgarImagem
    {
        private readonly Arquivo: SnBlob;
        private IsTentandoAbrirHeic: boolean;

        public constructor(arquivo: SnBlob, alturaImagem: number, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO)
        {
            super(arquivo.UrlBlob, alturaImagem, u.ImagemUtil.RetornarFormatoImagem(arquivo), qualidade);
            this.Arquivo = arquivo;
        }

        protected override async Imagem_Error(e: ErrorEvent)
        {
            if (!u.SistemaUtil.IsInternetExplorer11)
            {
                if (this.IsTentarHeic())
                {
                    this.IsTentandoAbrirHeic = true;
                    const blobOuError = await w.ConverterHeicParaJpeg.RetornarBlobAsync(this.Arquivo);
                    if (blobOuError instanceof Blob)
                    {
                        const urlHeicJpeg = window.URL.createObjectURL(blobOuError);
                        this.IsHeic = true;
                        this.Imagem.src = urlHeicJpeg;
                        return;
                    }
                }

                if (!this.IsIcone && ValidacaoUtil.IsUrl($Configuracao.UrlIcone))
                {

                    this.IsIcone = true;
                    const extensao = ArquivoUtil.RetornarExtensaoArquivo(this.Arquivo.name);
                    if (!String.IsNullOrWhiteSpace(extensao))
                    {
                        const url = `${$Configuracao.UrlIcone}=${extensao}`;
                        this.Imagem.src = url;
                        return;
                    }
                }
            }
            super.Imagem_Error(e);
        }

        private IsTentarHeic()
        {
            const formatoImagem = u.ImagemUtil.RetornarFormatoImagem(this.Arquivo);
            return !this.IsTentandoAbrirHeic &&
                formatoImagem === EnumFormatoImagem.JPEG ||
                formatoImagem === EnumFormatoImagem.HEIC;
        }

        protected override Finalizar(isErro: boolean, url: string): void
        {
            this.Arquivo.RevogarUrlBlob();
            super.Finalizar(isErro, url,);
        }
    }

    export class CarrgarImagemUrl extends CarrgarImagem
    {

        public constructor(urlImagem: string, alturaImagem: number, formatoImagem: d.EnumFormatoImagem, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO)
        {
            super(urlImagem, alturaImagem, formatoImagem, qualidade);
        }
         
        protected override Finalizar(isErro: boolean, url: string)
        {
            super.Finalizar(isErro, url);
        }

        
    }

    export interface ResultadoCarregarImagem
    {
        //Blob?: Blob | null;
        Url?: string | null;
        LarguraImagemOrigem?: number;
        AlturaImagemOrigem?: number;
        IsHeic?: boolean;
        IsErro?: boolean;
        IsIcone?: boolean
        Erro?: Error;
    }

}
