
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

        const settings = new MagickWasm.MagickReadSettings();

        if (maiorDimensao.TamanhoImagem !== EnumTamanhoImagem.Impressao)
        {
            const dimensao = `${maiorDimensao.Dimensao.Largura}x${maiorDimensao.Dimensao.Altura}`;
            settings.setDefine(
                MagickWasm.MagickFormat.Jpeg,
                "size",
                dimensao);
        }

        const imagensCarregada = await MagickWasm.ImageMagick.read<IResultadoMagick>(
            this.Opcoes.BytesOrigem,
            settings,
            this.CarregarImagemInternoAsync.bind(this));


        return imagensCarregada;
    }

    private async CarregarImagemInternoAsync(imageMagick: MagickWasm.IMagickImage): Promise<IResultadoMagick>
    {
        const redimensionamentos = this.Opcoes.Redimensinamentos;
        const primeiroTamaho = redimensionamentos[0].TamanhoImagem;

        const isImpressao = primeiroTamaho === EnumTamanhoImagem.Impressao;
        imageMagick.filterType = isImpressao ?
            MagickWasm.FilterType.Lagrange :
            MagickWasm.FilterType.Hermite;

        imageMagick.quality = isImpressao ? QUALIDADE_APRESENTACAO_MAGICK : QUALIDADE_IMPRESSAO_MAGICK;
        imageMagick.autoOrient();

        const isJpeg = imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
            imageMagick.format === MagickWasm.MagickFormat.Jpg;

        const formatoDestino = (isJpeg) ?
            MagickWasm.MagickFormat.Jpeg :
            MagickWasm.MagickFormat.Webp;

        const mimeType = isJpeg ? "image/jpeg" : "image/webp";
        const dimensaoLocal = this.RetornarDimensaoLocal(imageMagick);

        MagickUtil.RemoverExif(imageMagick);

        try
        {
            /*const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();*/
            const imagensCarregada = new Array<ImagemCarregada>();
            for (const redimensionamento of redimensionamentos)
            {
                imageMagick.resize(redimensionamento.Dimensao.Largura, redimensionamento.Dimensao.Altura);

                if (redimensionamento.TamanhoImagem === primeiroTamaho &&
                    this.Opcoes.BytesPerfilDestino != null)
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

    private RetornarDimensaoLocal(imageMagick: MagickWasm.IMagickImage):IDimensao
    {
        const maiorLado = Math.max(imageMagick.baseWidth, imageMagick.baseHeight);
        const menorLado = Math.min(imageMagick.baseWidth, imageMagick.baseHeight);

        if (imageMagick.width > imageMagick.height)
        {
            return {
                Largura: maiorLado,
                Altura: menorLado
            };
        }

        return {
            Largura: menorLado,
            Altura: maiorLado
        };
    }
}
