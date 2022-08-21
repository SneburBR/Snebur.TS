namespace Snebur.WebWorker
{
    export class ConverterHeicParaJpeg extends WorkerCliente<IMensagemConverterHeicParaJpeg, Blob | Error>
    {
        private static readonly UrlWorker: string = "/workers/Snebur.ConverterHeicParaJpeg.js?=v7";

        private static readonly LIMITE_MINIMO: number = 1 * 1024;


        public static RetornarBufferAsync(arquivo: SnBlob, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<ArrayBuffer | Error>
        {
            const mensagem = {
                Arquivo: arquivo.Blob,
                Qualidade: qualidade
            };
            return new ConverterHeicParaJpeg().RetornarResultadoAsync(mensagem, EnumResultadoSalvarImagem.Bytes) as Promise<ArrayBuffer | Error>;
        }

        public static RetornarBlobAsync(arquivo: SnBlob, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<Blob | Error>
        {
            const mensagem = {
                Arquivo: arquivo.Blob,
                Qualidade: qualidade
            };
            return new ConverterHeicParaJpeg().RetornarResultadoAsync<Blob>(mensagem, EnumResultadoSalvarImagem.Blob);
        }

        public static RetornarUrlBlobAsync(arquivo: SnBlob, qualidade: number = u.ImagemUtil.QUALIDADE_JPEG_APRESENTACAO): Promise<string | Error>
        {
            const mensagem = {
                Arquivo: arquivo.Blob,
                Qualidade: qualidade
            };
            return new ConverterHeicParaJpeg().RetornarResultadoAsync<string>(mensagem, EnumResultadoSalvarImagem.UrlBlob);
        }

       

        protected override async NormalizarResultado(mensagem: IMensagemConverterHeicParaJpeg, resultado: Blob, argumento: any,): Promise<any | Error>  
        {
            if (resultado instanceof Error)
            {
                return resultado;
            }

            if (!(resultado instanceof Blob))
            {
                return new Erro("Não foi possível converter Heic para Jpeg");
            }

            if (resultado.size < ConverterHeicParaJpeg.LIMITE_MINIMO)
            {
                return new Error(`Falha ao salver imagedata, arquivo muito pequeno: ' ${resultado.size}' bytes`);
            }

            const tipoResultado = argumento as EnumResultadoSalvarImagem;
            switch (tipoResultado)
            {
                case EnumResultadoSalvarImagem.Blob:

                    return resultado;

                case EnumResultadoSalvarImagem.Bytes:
                case EnumResultadoSalvarImagem.Buffer:

                    return await u.ArquivoUtil.RetornarBufferArrayAsync(resultado, false);

                case EnumResultadoSalvarImagem.UrlBlob:

                    return window.URL.createObjectURL(resultado);

                default:

                    throw new ErroNaoSuportado("O tipo do resultado não é suportado");
            }

        }

        public get UrlWorker(): string
        {
            return ConverterHeicParaJpeg.UrlWorker;
        }
    }



}
