namespace Snebur.Imagens
{
    export class ImagemLocalUtil
    {
        public static RetornarElementoImagemCarregadaAsync(
            urlImagem: string,
            isIgnorarErro: boolean,
            dimensaoBase: IDimensao = null): Promise<HTMLImageElement>
        {
            return new Promise<HTMLImageElement>(resolver =>
            {
                const imagem = new Image();
                imagem.crossOrigin = "*";
                imagem.crossOrigin = "anonymous";
                /*imagem.style.imageRendering = "auto";*/
                imagem.style.imageOrientation = "from-image";

                if (dimensaoBase != null)
                {
                    imagem.style.maxWidth = dimensaoBase.Largura + "px";
                    imagem.style.maxHeight = dimensaoBase.Altura + "px";
                }

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

            if (i.MagickInitUtil.IsInicializado && !window.__IS_USAR_CANVAS__)
            {
                const resultadoMagick = await ImagemLocalUtil.CarregarImagemArquivoMagickAsync(
                    arquivo,
                    alturaMaxima);

                if (resultadoMagick != null)
                {
                    return resultadoMagick;
                }
            }

            const resultadoCanvas = await ImagemLocalUtil.CarregarImagemArquivoCanvasAsync(
                arquivo,
                alturaMaxima);

            if (resultadoCanvas != null)
            {
                return resultadoCanvas;
            }

            return {
                IsIcone: true,
                Url: arquivo.UrlIcone,
                IsErro: true
            };
        }
        private static async CarregarImagemArquivoCanvasAsync(
            arquivo: SnBlob,
            alturaMaxima: number): Promise<ResultadoCarregarImagem>
        {
            const dimensao = { Largura: alturaMaxima * 1.5, Altura: alturaMaxima };
            const abrirArquivoLocalCanvas = new AbrirArquivoLocalCanvas(arquivo, dimensao);
            const resultado = await abrirArquivoLocalCanvas.ProcessarAsync();

            if (ValidacaoUtil.IsUrl(resultado.Url) &&
                resultado.LarguraImagemOrigem > 0 &&
                resultado.AlturaImagemOrigem > 0)
            {
                return {
                    AlturaImagemOrigem: resultado.AlturaImagemOrigem,
                    LarguraImagemOrigem: resultado.LarguraImagemOrigem,
                    Url: resultado.Url
                };
            }

            return null;
        }

        private static async CarregarImagemArquivoMagickAsync(
            arquivo: SnBlob,
            alturaMaxima: number): Promise<ResultadoCarregarImagem>
        {
            if (i.MagickInitUtil.IsInicializado)
            {
                const dimensao = { Largura: alturaMaxima * 1.5, Altura: alturaMaxima };
                const abrirArquivoLocalMagick = new AbrirArquivoLocalMagick(arquivo, dimensao);
                const resultado = await abrirArquivoLocalMagick.ProcessarAsync();
                if (resultado != null && resultado.ImagensCarregada.Count === 1)
                {
                    const blob = resultado.ImagensCarregada[0].Arquivo;
                    const url = window.URL.createObjectURL(blob);

                    return {
                        AlturaImagemOrigem: resultado.DimensaoLocal.Altura,
                        LarguraImagemOrigem: resultado.DimensaoLocal.Largura,
                        Url: url,
                    };
                }
            }
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
        IsHeic?: boolean;
        IsErro?: boolean;
        IsIcone?: boolean
        Erro?: Error;
    }

}
