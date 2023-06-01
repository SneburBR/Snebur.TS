class MagickProcessador
{
    public constructor(
        public readonly Opcoes: IOpcoesMagick,
        public readonly BytesPerfilDestino: Uint8Array)
    {

    }

    public async ProcessarAsync(): Promise<IResultadoMagick>
    {
        try
        {
            const maiorRedimensionamento = this.Opcoes.Redimensinamentos.sort((a, b) => (b.Dimensao.Largura * b.Dimensao.Altura) - (a.Dimensao.Largura * b.Dimensao.Largura))[0];
            const maiorDimensao = maiorRedimensionamento.Dimensao;
            const settings = new MagickWasm.MagickReadSettings();

            const lado = maiorRedimensionamento.TamanhoImagem === EnumTamanhoImagem.Impressao ?
                Math.max(maiorDimensao.Largura, maiorDimensao.Altura) :
                Math.min(maiorDimensao.Largura, maiorDimensao.Altura);

            const dimensao = `${lado}x${lado}`;
            settings.setDefine(
                MagickWasm.MagickFormat.Jpeg,
                "size",
                dimensao);

            const bytesOrigem = await this.RetornarBytesAsync(this.Opcoes.ArquivoOrigem);
            const imagensCarregada = await MagickWasm.ImageMagick.read<IResultadoMagick>(
                bytesOrigem,
                settings,
                this.CarregarImagemInternoAsync.bind(this));
 
            return imagensCarregada;
        }
        catch (erro)
        {
            return erro;
        }
    }

    public async RetornarBytesAsync(arquivo: Blob): Promise<Uint8Array>
    {
        return new Promise(resolver =>
        {
            const fileReader = new FileReader();
            fileReader.onload = function ()
            {
                if (fileReader.result instanceof ArrayBuffer)
                {
                    resolver(new Uint8Array(fileReader.result));
                    return;
                }
                resolver(null);
            };
            fileReader.onerror = function ()
            {
                resolver(null);
            };
            fileReader.readAsArrayBuffer(arquivo);
        });
    }

    private async CarregarImagemInternoAsync(imageMagick: MagickWasm.IMagickImage): Promise<IResultadoMagick>
    {
        try
        {
            imageMagick.autoOrient();

            const redimensionamentos = this.Opcoes.Redimensinamentos;
            const primeiroTamaho = redimensionamentos[0].TamanhoImagem;

            const isImpressao = primeiroTamaho === EnumTamanhoImagem.Impressao;
            imageMagick.filterType = isImpressao ?
                MagickWasm.FilterType.Lagrange :
                MagickWasm.FilterType.Hermite;

            imageMagick.interpolate = MagickWasm.PixelInterpolateMethod.Undefined;
            imageMagick.quality = isImpressao ? QUALIDADE_APRESENTACAO_MAGICK : QUALIDADE_IMPRESSAO_MAGICK;

            const isSalvarJpeg = imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
                imageMagick.format === MagickWasm.MagickFormat.Jpg ||
                imageMagick.format === MagickWasm.MagickFormat.Heic;

            const formatoDestino = (isSalvarJpeg) ? MagickWasm.MagickFormat.Jpeg :
                this.Opcoes.IsPngParaJpeg ? MagickWasm.MagickFormat.Png : MagickWasm.MagickFormat.Webp;

            const mimeType = isSalvarJpeg ? "image/jpeg" : this.Opcoes.IsPngParaJpeg ? "image/png" : "image/webp";
            const dimensaoLocal = this.RetornarDimensaoLocal(imageMagick);

            if (primeiroTamaho !== EnumTamanhoImagem.Impressao)
            {
                MagickUtil.RemoverExif(imageMagick);
            }

            /*const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();*/
            const imagensCarregada = new Array<ImagemCarregada>();
            for (const redimensionamento of redimensionamentos)
            {
                imageMagick.resize(redimensionamento.Dimensao.Largura, redimensionamento.Dimensao.Altura);

                if (redimensionamento.Recorte != null && redimensionamento.DimensaoRecorte != null)
                {
                    const recorte = this.RetornarRecorte(redimensionamento);
                    imageMagick.crop(recorte);
                }

                if (redimensionamento.TamanhoImagem === primeiroTamaho && this.Opcoes.IsConverterSRGB)
                {
                    await MagickUtil.ConverterPerfilAsync(
                        imageMagick,
                        this.BytesPerfilDestino);
                }

                await imageMagick.write(formatoDestino, (bytes) =>
                {
                    /*const buffer = new Uint8Array(bytes).buffer;*/
                    const blob = new Blob([bytes], { type: mimeType });

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
                MimeType: mimeType,
                DimensaoLocal: dimensaoLocal,
                ImagensCarregada: imagensCarregada,
                IsSucesso: true,
                MagickFormat: formatoDestino
            };
        }
        catch (erro)
        {
            return erro;
        }
        finally
        {
            imageMagick.dispose();
        }
    }

    private RetornarRecorte(redimensionamento: RedimensionarImagemMagick): MagickWasm.MagickGeometry
    {
        const x = redimensionamento.Dimensao.Largura * redimensionamento.Recorte.XScalar;
        const y = redimensionamento.Dimensao.Altura * redimensionamento.Recorte.YScalar;
        return new MagickWasm.MagickGeometry(x, y, redimensionamento.DimensaoRecorte.Largura, redimensionamento.DimensaoRecorte.Altura);

    }

    private RetornarDimensaoLocal(imageMagick: MagickWasm.IMagickImage): IDimensao
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
