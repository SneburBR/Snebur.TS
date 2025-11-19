namespace Snebur.Imagens
{
    export class ImagemLocalUtil
    {
        public static RetornarElementoImagemAsync(urlImagem: string, isIgnorarErro: boolean): Promise<HTMLImageElement>
        public static RetornarElementoImagemAsync(arquivo: SnBlob | string, isIgnorarErro: boolean): Promise<HTMLImageElement>
        public static RetornarElementoImagemAsync(arquivoOuUrl: SnBlob | string, isIgnorarErro: boolean): Promise<HTMLImageElement>
        {
            if (arquivoOuUrl instanceof SnBlob)
            {
                return ImagemLocalUtil.RetornarElementoImagemDoArquivoAsync(arquivoOuUrl, isIgnorarErro);
            }
            return ImagemLocalUtil.RetornarElementoImagemDaUrlAsync(arquivoOuUrl, isIgnorarErro);
        }

        private static async RetornarElementoImagemDoArquivoAsync(
            arquivo: SnBlob,
            isIgnorarErro: boolean): Promise<HTMLImageElement>
        {
            let imagem = await ImagemLocalUtil.RetornarElementoImagemDaUrlAsync(arquivo.UrlBlob, true);
            if (imagem === null)
            {
                const formatoImagem = await FormatoImagemUtil.RetornarFormatoImagemAsync(arquivo, true);
                if (formatoImagem === EnumFormatoImagem.HEIC)
                {
                    const urlHeicOuErro = await w.ConverterHeicParaJpeg.RetornarUrlBlobAsync(arquivo);
                    if (ValidacaoUtil.IsUrlBlob(urlHeicOuErro))
                    {
                        imagem = await ImagemLocalUtil.RetornarElementoImagemDaUrlAsync(urlHeicOuErro, true);
                    }
                }
            }

            if (imagem instanceof HTMLImageElement)
            {
                return imagem;
            }

            if (isIgnorarErro)
            {
                return null;
            }

            throw new Error(`Não foi possível carregar imagem do arquivo: ${arquivo.name}`);
        }

        private static RetornarElementoImagemDaUrlAsync(
            urlImagem: string,
            isIgnorarErro: boolean): Promise<HTMLImageElement>
        {
            return new Promise<HTMLImageElement>(resolver =>
            {
                const imagem = new Image();
                imagem.crossOrigin = "*";
                imagem.crossOrigin = "anonymous";
                imagem.style.imageRendering = "auto";
                imagem.style.imageOrientation = "from-image";

                //if (dimensaoBase != null)
                //{
                //    imagem.style.maxWidth = dimensaoBase.Largura + "px";
                //    imagem.style.maxHeight = dimensaoBase.Altura + "px";
                //}

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

        public static async CarregarImagemArquivoAsync(
            arquivo: SnBlob,
            alturaMaxima: number): Promise<ResultadoCarregarImagem>
        {

            const resultadoMagick = await ImagemLocalUtil.TryCarregarImagemArquivoMagickAsync(
                arquivo,
                alturaMaxima);

            if (resultadoMagick != null)
            {
                return resultadoMagick;
            }

            const resultadoCanvas = await ImagemLocalUtil.TryCarregarImagemArquivoCanvasAsync(
                arquivo,
                alturaMaxima);

            if (resultadoCanvas == null || resultadoCanvas?.IsAlertaSemPerfilBrancaOuPreta)
            {
                return {
                    IsIcone: true,
                    Url: arquivo.UrlIcone,
                    IsErro: false
                };
            }
            return resultadoCanvas;
        }

        private static async TryCarregarImagemArquivoMagickAsync(
            arquivo: SnBlob,
            alturaMaxima: number): Promise<ResultadoCarregarImagem>
        {
            if (!Snebur.i.MagickInitUtil.IsInicializado)
            {
                console.warn("Magick não inicializado, pulando tentativa Magick");
            }

            if (window.MOTOR_PROCESSAMENTO_IMAGEM !== EnumMotorProcessamentoImagem.MagickMainThread &&
                window.MOTOR_PROCESSAMENTO_IMAGEM !== EnumMotorProcessamentoImagem.MagickWorker)
            {
                console.warn("Magick - pulando - Canvas ou PicaJS selecionado motor principal para processar Imagem");
                return null;
            }

            const dimensao = { Largura: alturaMaxima * 1.5, Altura: alturaMaxima };
            const abrirArquivoLocalMagick = new AbrirArquivoLocalMagick(arquivo, dimensao);
            const resultado = await abrirArquivoLocalMagick.ProcessarAsync();
            if (resultado != null && resultado.ImagensCarregada.Count === 1)
            {
                const imagemCarregada = resultado.ImagensCarregada[0];
                const blob = imagemCarregada.Arquivo;
                const url = window.URL.createObjectURL(blob);

                return {
                    AlturaImagemOrigem: resultado.DimensaoLocal.Altura,
                    LarguraImagemOrigem: resultado.DimensaoLocal.Largura,
                    Url: url,
                    Blob: blob,
                    LarguraImagem: imagemCarregada.Dimensao.Largura,
                    AlturaImagem: imagemCarregada.Dimensao.Altura
                };
            }
            console.error("Magick - Falha ao carregar imagem, próxima tentativa Canvas");
            return null;
        }

        private static async TryCarregarImagemArquivoCanvasAsync(
            arquivo: SnBlob,
            alturaMaxima: number): Promise<ResultadoCarregarImagem>
        {

            const dimensao = { Largura: alturaMaxima * 1.5, Altura: alturaMaxima };
            const abrirArquivoLocalCanvas = new AbrirArquivoLocalCanvas(arquivo, dimensao);
            const resultado = await abrirArquivoLocalCanvas.ProcessarAsync();

            if (resultado != null &&
                ValidacaoUtil.IsUrl(resultado.Url) &&
                resultado.LarguraImagemOrigem > 0 &&
                resultado.AlturaImagemOrigem > 0)
            {


                return {
                    AlturaImagemOrigem: resultado.AlturaImagemOrigem,
                    LarguraImagemOrigem: resultado.LarguraImagemOrigem,
                    LarguraImagem: resultado.LarguraImagem,
                    AlturaImagem: resultado.AlturaImagem,
                    Blob: resultado.Blob,
                    IsAlertaSemPerfilBrancaOuPreta: resultado.IsAlertaSemPerfilBrancaOuPreta,
                    Url: resultado.Url
                };
            }
            console.error("Canvas - Falha ao carregar imagem.");
            return null;
        }

        public static IsElementoImagemCarregado(elementoImagem: HTMLImageElement)
        {
            return elementoImagem.complete &&
                elementoImagem.naturalHeight > 0 &&
                elementoImagem.naturalWidth > 0;
        }
    }

    export interface ResultadoCarregarImagem
    {
        //Blob?: Blob | null;
        Url?: string
        LarguraImagemOrigem?: number;
        AlturaImagemOrigem?: number;
        LarguraImagem?: number;
        AlturaImagem?: number;
        Blob?: Blob;
        IsHeic?: boolean;
        IsErro?: boolean;
        IsIcone?: boolean
        Erro?: Error;
        PerfilCor?: string;
        IsAlertaPerfilCor?: boolean;
        ColorSpace?: ColorSpaceData;
        IsAlertaSemPerfilBrancaOuPreta?: boolean
    }

}
