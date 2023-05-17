namespace Snebur.Imagens
{
    type DicionarioImagensCarregada = DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>;

    export class AbrirImagemLocalMagick implements IDisposable
    {
        private _isSalvarPendente: boolean = false;
        private _isAbriuIcone: boolean;

        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;
        private Exif: ExifrJS.MargeOutput;

        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }
        public constructor(
            private readonly OrigemImagemLocal: sa.OrigemImagemLocal,
            tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public async CarergarImagemAsync(): Promise<DicionarioImagensCarregada>
        {
            const blob = this.OrigemImagemLocal.ArquivoLocal;
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(blob);
            const bytes = new Uint8Array(buffer);

            /*const dimensao = `${ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE}x${ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE}`;*/
            const dimensao = `$1300x720`;
            const settings = new MagickWasm.MagickReadSettings();

            settings.setDefine(
                MagickWasm.MagickFormat.Jpeg,
                "size",
                dimensao);


            this.Exif = await ExifUtil.RetornarExifAsync(bytes);

            const imagensCarregada = await MagickWasm.ImageMagick.read<DicionarioImagensCarregada>(
                bytes,
                settings,
                this.CarregarImagemInternoAsync_PartirMedia.bind(this));

            if (this._isSalvarPendente)
            {
                const imagem = this.Imagem;
                const contexto = $Aplicacao.RetornarContextoDados(imagem.GetType() as r.TipoEntidade);
                contexto.SalvarAsync(imagem);
            }
            return imagensCarregada;
        }

        private async CarregarImagemInternoAsync_PartirMedia(imageMagick: MagickWasm.IMagickImage): Promise<DicionarioImagensCarregada>
        {
            imageMagick.filterType = MagickWasm.FilterType.Hermite;

            imageMagick.quality = ImagemUtil.QUALIDADE_APRESENTACAO_MAGICK;
            imageMagick.autoOrient();

            const formatoDestino = (imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
                imageMagick.format === MagickWasm.MagickFormat.Jpg) ?
                MagickWasm.MagickFormat.Jpeg :
                MagickWasm.MagickFormat.Webp;

            const mimeType = formatoDestino === MagickWasm.MagickFormat.Jpeg ?
                "image/jpeg" : "image/webp";



            this.AtualizarDimensaoLocal(
                imageMagick.format,
                { Largura: imageMagick.width, Altura: imageMagick.height });

            try
            {
                const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
                const tamanhos = this.TamanhosImagem;

                for (const tamanhoImagem of tamanhos)
                {
                    const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                        imageMagick.width,
                        imageMagick.height,
                        tamanhoImagem);

                    imageMagick.resize(dimensaoApresentacao.Largura, dimensaoApresentacao.Altura);

                    if (tamanhoImagem === d.EnumTamanhoImagem.Grande)
                    {
                        MagickUtil.RemoverExif(imageMagick);
                        await MagickUtil.ConvertersRGBAsync(imageMagick);
                    }

                    await imageMagick.write((bytes) =>
                    {
                        this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);

                        const blob = new Blob([bytes], { type: mimeType });
                        const cache = new ImagemLocalCarregada(
                            tamanhoImagem,
                            blob,
                            mimeType);

                        imagensCarregada.Add(tamanhoImagem, cache);

                    }, formatoDestino);
                }
                return imagensCarregada;
            }
            finally
            {
                imageMagick.dispose();
            }
        }

        private async CarregarImagemInternoAsync_ImagemMedia(imageMagick: MagickWasm.IMagickImage): Promise<DicionarioImagensCarregada>
        {
            imageMagick.filterType = MagickWasm.FilterType.Hermite;
            imageMagick.quality = ImagemUtil.QUALIDADE_APRESENTACAO_MAGICK;
            imageMagick.autoOrient();

            const formatoDestino = (imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
                imageMagick.format === MagickWasm.MagickFormat.Jpg) ?
                MagickWasm.MagickFormat.Jpeg :
                MagickWasm.MagickFormat.Webp;

            const mimeType = formatoDestino === MagickWasm.MagickFormat.Jpeg ?
                "image/jpeg" : "image/webp";

            this.AtualizarDimensaoLocal(
                imageMagick.format,
                { Largura: imageMagick.width, Altura: imageMagick.height });

            try
            {
                const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();

                const tamanhoImagem = EnumTamanhoImagem.Media;
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    imageMagick.width,
                    imageMagick.height,
                    tamanhoImagem);

                imageMagick.resize(
                    dimensaoApresentacao.Largura,
                    dimensaoApresentacao.Altura);

                const blob = await imageMagick.write((bytes) =>
                {
                    const blob = new Blob([bytes], { type: mimeType });
                    return blob;

                }, formatoDestino);

                for (const tamanhoImagem of this.TamanhosImagem)
                {
                    const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                        imageMagick.width,
                        imageMagick.height,
                        tamanhoImagem);

                    const imagemCarregada = new ImagemLocalCarregada(
                        tamanhoImagem,
                        blob,
                        mimeType);



                    this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);
                    imagensCarregada.Add(tamanhoImagem, imagemCarregada);

                }

                return imagensCarregada;
            }
            finally
            {
                imageMagick.dispose();
            }
        }



        private async CarregarImagemInternoAsync_Todas(imageMagick: MagickWasm.IMagickImage): Promise<DicionarioImagensCarregada>
        {
            imageMagick.filterType = MagickWasm.FilterType.Hermite;
            imageMagick.quality = ImagemUtil.QUALIDADE_APRESENTACAO_MAGICK;
            imageMagick.autoOrient();

            const formatoDestino = (imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
                imageMagick.format === MagickWasm.MagickFormat.Jpg) ?
                MagickWasm.MagickFormat.Jpeg :
                MagickWasm.MagickFormat.Webp;

            const mimeType = formatoDestino === MagickWasm.MagickFormat.Jpeg ?
                "image/jpeg" : "image/webp";

            this.AtualizarDimensaoLocal(
                imageMagick.format,
                { Largura: imageMagick.width, Altura: imageMagick.height });

            try
            {
                const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
                for (const tamanhoImagem of this.TamanhosImagem)
                {
                    const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                        imageMagick.width,
                        imageMagick.height,
                        tamanhoImagem);

                    imageMagick.resize(dimensaoApresentacao.Largura, dimensaoApresentacao.Altura);

                    await imageMagick.write((bytes) =>
                    {
                        this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);

                        const blob = new Blob([bytes], { type: mimeType });
                        const cache = new ImagemLocalCarregada(
                            tamanhoImagem,
                            blob,
                            mimeType);

                        imagensCarregada.Add(tamanhoImagem, cache);

                    }, formatoDestino);
                }
                return imagensCarregada;
            }
            finally
            {
                imageMagick.dispose();
            }
        }

        private AtualizarDimensaoLocal(formato: MagickWasm.MagickFormat, dimensao: IDimensao)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            const formatoImagem = formato === MagickWasm.MagickFormat.Jpeg ? EnumFormatoImagem.JPEG : EnumFormatoImagem.WEBP;
            const mimeType = formato === MagickWasm.MagickFormat.Jpeg ? EnumMimeType.Jpeg : EnumMimeType.Webp;

            if (ImagemUtil.AtualizarDimensaLocal(imagem, dimensao, formatoImagem, mimeType, false))
            {
                this._isSalvarPendente = true;
            }
        }

        private AtualizarDimensao(dimensaoApresentacao: d.Dimensao, tamanhoImagem: d.EnumTamanhoImagem)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            if (ImagemUtil.AtualizarDimensao(imagem, dimensaoApresentacao, tamanhoImagem))
            {
                this._isSalvarPendente = true;
            }
        }

        public Dispose(): void
        {

        }
    }
}
