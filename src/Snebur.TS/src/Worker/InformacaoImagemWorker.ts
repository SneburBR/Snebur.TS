namespace Snebur.WebWorker
{
    export class InformacaoImagemWorker extends WorkerCliente<Blob, IInformacaoImagem>
    {
        private static get UrlWorker(): string
        {
            if (u.SistemaUtil.IsInternetExplorer11)
            {
                return "/workers/Snebur.InformacaoImagem.js?v=1";
            }
            return "/workers/Snebur.InformacaoImagem.Moderno.js?v=1";
        }

        public static RetornarInformacaoImagemAsync(blob: SnBlob): Promise<IInformacaoImagem>
        {
            return new InformacaoImagemWorker().RetornarResultadoAsync(blob.Blob) as Promise<IInformacaoImagem>;
        }

        protected override NormalizarResultado(
            arquivo: Blob,
            resultado: IInformacaoImagem,
            argumento: any): Promise<IInformacaoImagem> | IInformacaoImagem
        {
            if (resultado instanceof Error)
            {
                return {
                    IsImagem: false,
                    TotalBytes: arquivo.size,
                    Altura: 0,
                    Largura: 0,
                    Dimensao: null,
                    FormatoImagem: EnumFormatoImagem.Desconhecido,
                    NomeArquivo: (arquivo as File)?.name ?? "[blob]"
                };
            }

            resultado.TotalBytes = arquivo.size;
            resultado.Tamanho = FormatacaoUtil.FormatarBytes(arquivo.size);

            if (!resultado.IsImagem)
            {
                return resultado;
            }

            resultado.FormatoImagem = this.RetornarFormatoImagem(arquivo, resultado);
            resultado.IsImagem = ImagemUtil.IsFormatoImagemSuportado(resultado.FormatoImagem);

            const rotacao = this.RetornarRotacaoExif(arquivo, resultado.FormatoImagem, resultado.Orientacao);
            const dimensao = this.NormalizarDimensao(resultado.Largura, resultado.Altura, rotacao);

            resultado.Dimensao = dimensao;
            resultado.Largura = dimensao.Largura;
            resultado.Altura = dimensao.Altura;
            resultado.Rotacao = rotacao;

            return resultado;

        }

        private NormalizarDimensao(largura: number, altura: number, rotacao: number): d.Dimensao
        {
            if (u.SistemaUtil.NavegadorEnum !== d.EnumNavegador.InternetExplorer)
            {
                if (rotacao === 90 || rotacao === 270)
                {
                    return new Dimensao(altura, largura);
                }
            }
            return new Dimensao(largura, altura);
        }

        private RetornarFormatoImagem(arquivo: Blob, resultado: IInformacaoImagem): d.EnumFormatoImagem
        {
            if (!String.IsNullOrEmpty(resultado.Type))
            {
                switch (resultado.Type)
                {
                    case "image/jpg":
                    case "image/jpeg":
                        return d.EnumFormatoImagem.JPEG;
                    case "image/png":
                        return d.EnumFormatoImagem.PNG;
                    case "image/ico":
                        return d.EnumFormatoImagem.ICO;
                    case "image/gif":
                        return d.EnumFormatoImagem.GIF;
                    case "image/bmp":
                        return d.EnumFormatoImagem.BMP;

                    case "image/tif":
                    case "image/tiff":

                        return d.EnumFormatoImagem.TIFF;
                    case "image/webp":

                        return d.EnumFormatoImagem.WEBP;

                    case "image/svg+xml":

                        return d.EnumFormatoImagem.SVG;

                    case "image/avif":

                        return d.EnumFormatoImagem.AVIF;

                    case "image/apng":
                        return d.EnumFormatoImagem.APNG;

                }
            }
            return u.ImagemUtil.RetornarFormatoImagem(arquivo);

        }

        private RetornarRotacaoExif(blob: Blob, formatoImagem: EnumFormatoImagem, orientacao: number): number
        {
            if (formatoImagem !== EnumFormatoImagem.JPEG ||
                u.SistemaUtil.IsInternetExplorer11  )
            {
                return 0;
            }

            if (typeof orientacao === "number" && orientacao >= 0)
            {
                return i.ExifUtil.RetornarRotacaoExifInterno(orientacao);
            }
            return 0;
        }

        protected get UrlWorker(): string
        {
            return InformacaoImagemWorker.UrlWorker;
        }
    }

}
