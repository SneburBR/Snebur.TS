namespace Snebur.Imagem
{
    type DicionarioImagensCarregada = DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>;

    export class AbrirImagemLocalMagick implements IDisposable
    {
        private static readonly TIMEOUT = 90 * 1000;
        private IdTimeout: number;
        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;
        private _isAbriuIcone: boolean;

        public constructor(
            private readonly OrigemImagemLocal: sa.OrigemImagemLocal,
            tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public async CarergarImagemAsync(): Promise<DicionarioImagensCarregada>
        {
            const blob = this.OrigemImagemLocal?.ArquivoLocal;
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(blob);
            const bytes = new Uint8Array(buffer);

            const imagensCarregada = await MagickWasm.ImageMagick.read<DicionarioImagensCarregada>(
                bytes,
                this.CarregarImagemInternoAsync.bind(this));

            return imagensCarregada;
        }

        private async CarregarImagemInternoAsync(imagem: MagickWasm.IMagickImage): Promise<DicionarioImagensCarregada>
        {
            imagem.filterType = MagickWasm.FilterType.Hermite;
            imagem.quality = ImagemUtil.QUALIDADE_JPEG_APRESENTACAO_MAGICK;
            imagem.autoOrient();

            const formatoDestino = (imagem.format === MagickWasm.MagickFormat.Jpeg ||
                imagem.format === MagickWasm.MagickFormat.Jpg) ? MagickWasm.MagickFormat.Jpeg : MagickWasm.MagickFormat.Webp;

            const mimeType = formatoDestino === MagickWasm.MagickFormat.Jpeg ?
                "image/jpeg" : "image/webp";

            try
            {
                const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
                for (const tamanhoImagem of this.TamanhosImagem)
                {
                    const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                        imagem.width,
                        imagem.height,
                        tamanhoImagem);

                    imagem.resize(dimensaoApresentacao.Largura, dimensaoApresentacao.Altura);
                     
                    await imagem.write((bytes) =>
                    {
                        const blob = new Blob([bytes], { type: mimeType });
                        const cache = new ImagemLocalCarregada(tamanhoImagem, blob);
                        imagensCarregada.Add(tamanhoImagem, cache);

                    }, formatoDestino);
                }
                return imagensCarregada;
            }
            finally
            {
                imagem.dispose();
            }
        }

        public Dispose(): void
        {

        }
    }
}
