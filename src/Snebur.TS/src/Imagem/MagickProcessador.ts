
class MagickProcessador
{
    public constructor(
        public readonly Opcoes: IOpcoesMagick)
    {

    }
    public async ProcessarAsync(): Promise<IResultadoMagick>
    {
        const maiorRedimensionamento = this.Opcoes.Redimensinamentos.sort((a, b) => (b.Dimensao.Largura * b.Dimensao.Altura) - (a.Dimensao.Largura * b.Dimensao.Largura));
        const maiorDimensao = maiorRedimensionamento[0];
        const dimensao = `${maiorDimensao.Dimensao.Largura}x${maiorDimensao.Dimensao.Altura}`;
        const settings = new MagickWasm.MagickReadSettings();

        settings.setDefine(
            MagickWasm.MagickFormat.Jpeg,
            "size",
            dimensao);

        const imagensCarregada = await MagickWasm.ImageMagick.read<IResultadoMagick>(
            this.Opcoes.BytesOrigem,
            settings,
            this.CarregarImagemInternoAsync.bind(this));


        return imagensCarregada;
    }

    private async CarregarImagemInternoAsync(imageMagick: MagickWasm.IMagickImage): Promise<IResultadoMagick>
    {
        imageMagick.filterType = MagickWasm.FilterType.Hermite;

        imageMagick.quality = QUALIDADE_APRESENTACAO_MAGICK;
        imageMagick.autoOrient();


        const isJpeg = imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
            imageMagick.format === MagickWasm.MagickFormat.Jpg;

        const formatoDestino = (isJpeg) ?
            MagickWasm.MagickFormat.Jpeg :
            MagickWasm.MagickFormat.Webp;

        const mimeType = isJpeg ? "image/jpeg" : "image/webp";

        const dimensaoLocal = {
            Largura: imageMagick.width,
            Altura: imageMagick.height
        };

        MagickUtil.RemoverExif(imageMagick);

        try
        {
            /*const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();*/
            const redimensionamentos = this.Opcoes.Redimensinamentos;
            const primeiroTamaho = redimensionamentos.First().TamanhoImagem;
            const imagensCarregada = new Array<ImagemCarregada>();

            for (const redimensionamento of redimensionamentos)
            {
                imageMagick.resize(redimensionamento.Dimensao.Largura, redimensionamento.Dimensao.Altura);

                if (redimensionamento.TamanhoImagem === primeiroTamaho && this.Opcoes.BytesPerfilDestino != null)
                {
                    await MagickUtil.ConverterPerfilAsync(
                        imageMagick,
                        this.Opcoes.BytesPerfilDestino);
                }

                await imageMagick.write(formatoDestino, (bytes) =>
                {
                    const buffer = new Uint8Array(bytes).buffer;
                    const blob = new Blob([buffer], { type: mimeType });

                    imagensCarregada.push({
                        Arquivo: blob,
                        Dimensao: {
                            Largura: imageMagick.width,
                            Altura: imageMagick.height
                        },
                        TamanhoImagem: redimensionamento.TamanhoImagem
                    });
                });
            }

            return {
                Identificador: this.Opcoes.Identificador,
                MimeType: mimeType,
                DimensaoLocal: dimensaoLocal,
                ImagensCarregada: imagensCarregada,
                IsSucesso: true,
                MagickFormat: formatoDestino
            };
        }
        catch (erro)
        {
            console.error(erro);
            return null;
        }
        finally
        {
            imageMagick.dispose();
        }
    }
}
