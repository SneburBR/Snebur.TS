namespace Snebur.Imagens
{
    
    export class AbrirImagemImpressaoMagick
    {
        public constructor(
            private readonly OrigemImagemLocal: sa.OrigemImagemLocal,
            private readonly DimensaoImpressao: d.Dimensao)
        {
        }

        public async RetornarArrayBufferAsync(): Promise<ArrayBuffer>
        {
            const blob = this.OrigemImagemLocal?.ArquivoLocal;
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(blob);
            const bytesArquivo = new Uint8Array(buffer);

            const settings = new MagickWasm.MagickReadSettings();
            //settings.setDefine(MagickWasm.MagickFormat.Jpeg, "lossless", true);
            //settings.setDefine(MagickWasm.MagickFormat.Webp, "lossless", true);

            const bytesIamgem = await MagickWasm.ImageMagick.read<ArrayBuffer>(
                bytesArquivo,
                settings,
                this.CarregarImagemInternoAsync.bind(this));

            return bytesIamgem;
        }

        private async CarregarImagemInternoAsync(imagem: MagickWasm.MagickImage): Promise<ArrayBuffer>
        {
            const formatoDestino = (imagem.format === MagickWasm.MagickFormat.Jpeg ||
                imagem.format === MagickWasm.MagickFormat.Jpg) ?
                MagickWasm.MagickFormat.Jpeg :
                MagickWasm.MagickFormat.Webp;

         
            const dimensaoImpressao = this.DimensaoImpressao;
            imagem.filterType = MagickWasm.FilterType.Lagrange;
            imagem.autoOrient();
            imagem.quality = 80;

            if (imagem.width > dimensaoImpressao.Largura &&
                imagem.height > dimensaoImpressao.Altura)
            {
                imagem.resize(dimensaoImpressao.Largura, dimensaoImpressao.Altura);
            }

            const buffer = await imagem.write<ArrayBuffer>((data) =>
            {
                return new Uint8Array(data).buffer;

            }, formatoDestino);
            return buffer;
        }
    }
}
