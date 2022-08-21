namespace Snebur.WebWorker
{
    export class SalvarJpeg extends WorkerCliente<ISalvarJpegMensagem, Uint8Array>
    {
        private static readonly UrlWorker: string = "/workers/Snebur.SalvarJpeg.js?=v7";
        private static readonly LIMITE_MINIMO: number = 1 * 1024;

        public static RetornarBytesAsync(canvas: HTMLCanvasElement, qualidade?: number): Promise<Uint8Array>
        public static RetornarBytesAsync(imagemData: ImageData, qualidade?: number): Promise<Uint8Array>
        public static RetornarBytesAsync(imagemDataOuCanvas: ImageData | HTMLCanvasElement, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<Uint8Array>
        {
            const imagemData = SalvarJpeg.RetornarImagemData(imagemDataOuCanvas);
            const mensagem: ISalvarJpegMensagem = { ImagemData: imagemData, Qualidade: qualidade };
            return new SalvarJpeg().RetornarResultadoAsync(mensagem, EnumResultadoSalvarImagem.Bytes) as Promise<Uint8Array>;
        }

        public static RetornarBlobAsync(imagemData: ImageData, qualidade?: number): Promise<Blob>
        public static RetornarBlobAsync(canvas: HTMLCanvasElement, qualidade?: number): Promise<Blob>
        public static RetornarBlobAsync(imagemDataOuCanvas: ImageData | HTMLCanvasElement, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<Blob>
        {
            const imagemData = SalvarJpeg.RetornarImagemData(imagemDataOuCanvas);
            const mensagem: ISalvarJpegMensagem = { ImagemData: imagemData, Qualidade: qualidade };
            return new SalvarJpeg().RetornarResultadoAsync<Blob>(mensagem, EnumResultadoSalvarImagem.Blob) as Promise<Blob>;
        }

        public static RetornarUrlBlobAsync(canvas: HTMLCanvasElement, qualidade?: number): Promise<string>
        public static RetornarUrlBlobAsync(imagemData: ImageData, qualidade?: number): Promise<string>
        public static RetornarUrlBlobAsync(imagemDataOuCanvas: ImageData | HTMLCanvasElement, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<string>
        {
            const imagemData = SalvarJpeg.RetornarImagemData(imagemDataOuCanvas);
            const mensagem: ISalvarJpegMensagem = { ImagemData: imagemData, Qualidade: qualidade };
            return new SalvarJpeg().RetornarResultadoAsync<string>(mensagem, EnumResultadoSalvarImagem.UrlBlob) as Promise<string>;
        }

        private static RetornarImagemData(argumento: any): ImageData
        {
            if (ValidacaoUtil.IsImageData(argumento))
            {
                return argumento;
            }

            if (argumento instanceof HTMLCanvasElement)
            {
                const canvas = argumento as HTMLCanvasElement;
                const contexto = canvas.getContext("2d");
                return contexto.getImageData(0, 0, canvas.width, canvas.height);
            }
            throw new ErroNaoSuportado("O argumento não é suportado");
        }

        protected override NormalizarResultado(mensagem: ISalvarJpegMensagem, resultado: Uint8Array, argumento: any,): any
        {
            if (resultado instanceof Error)
            {
                return resultado;
            }

            if (resultado.length < SalvarJpeg.LIMITE_MINIMO)
            {
                return new Error(`Falha ao salver imagedate, arquivo muito pequeno: ' ${resultado.length}' bytes`);
            }

            const tipoResultado = argumento as EnumResultadoSalvarImagem;
            const mimeTypeJpeg = MimeTypeUtil.RetornarMimeType(EnumMimeType.Jpeg);

            switch (tipoResultado)
            {
                case EnumResultadoSalvarImagem.Bytes:

                    return resultado;

                case EnumResultadoSalvarImagem.Buffer:

                    return resultado;

                case EnumResultadoSalvarImagem.Blob:

                    return new Blob([resultado], { type: mimeTypeJpeg });

                case EnumResultadoSalvarImagem.UrlBlob:
                    {
                        const blob = new Blob([resultado], { type: mimeTypeJpeg });
                        return window.URL.createObjectURL(blob);
                    }

                default:
                    throw new ErroNaoSuportado("O tipo do resultado não é suportado");
            }

        }

        public get UrlWorker(): string
        {
            return SalvarJpeg.UrlWorker;
        }
    }

}
