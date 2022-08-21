namespace Snebur.Imagem
{
    export class AbrirImagemImpressao extends BaseAbrirImagemLocal 
    {
        private readonly DimensaoImpressao: d.Dimensao;
        protected readonly QualidadeImpressao: number = u.ImagemUtil.QUALIDADE_JPEG_IMPRESSAO;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, dimensaoImpressao: d.Dimensao)
        {
            super(origemImagemLocal);
            this.DimensaoImpressao = dimensaoImpressao;
        }

        public RetornarArrayBufferAsync(): Promise<ArrayBuffer>
        {
            return new Promise<ArrayBuffer>( resolver =>
            {
                this.FuncaoResolver = resolver;
                this.CarregarImagemLocal();
            });
        }

        protected override async ImagemOriginalLocal_Carregada(e: Event)
        {
            super.ImagemOriginalLocal_Carregada(e);

            const dimensao = this.NormalizarDimensao(this.ImagemLocal, this.DimensaoImpressao);
            /*eslint-disable*/
            let [canvas, imagemData] = super.RetornarImagemData(this.ImagemLocal, dimensao);
            /*eslint-enable*/
            const bytes = await Snebur.WebWorker.SalvarJpeg.RetornarBytesAsync(imagemData, this.QualidadeImpressao);
            const bufferArray = this.RetornarArrayButter(bytes);
            this.Resolver(bufferArray);
        }

        private NormalizarDimensao(imagem: HTMLImageElement, dimensao: d.Dimensao): d.Dimensao 
        {
            if (dimensao === null)
            {
                return new Dimensao(imagem.naturalWidth, imagem.naturalHeight);
            }
            return dimensao;
        }

        private async RetornarBytesAsync(canvas: HTMLCanvasElement, imagemData: ImageData): Promise<Uint8Array | ArrayBuffer | null>
        {

            switch (this.OrigemImagemLocal.FormatoImagem)
            {
                case d.EnumFormatoImagem.JPEG:

                    return Snebur.WebWorker.SalvarJpeg.RetornarBytesAsync(imagemData, this.Qualidade);


                case d.EnumFormatoImagem.PNG: {

                    const blobcanvas = await canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);
                    if (blobcanvas != null)
                    {
                        const bytes = await u.ArquivoUtil.RetornarBufferArrayAsync(blobcanvas);
                        return bytes;
                    }
                    return null;
                }
                default:

                    throw new ErroNaoSuportado("O formato do imagem não é suportado");
            }
        }

        private RetornarArrayButter(bytes: Uint8Array | ArrayBuffer | null): ArrayBuffer | null
        {
            if (bytes instanceof Uint8Array)
            {
                return bytes.buffer;
            }

            if (bytes instanceof ArrayBuffer)
            {
                return bytes;
            }
            return null;
        }

        public override Dispose(): void
        {
            super.Dispose();
            //this.ImagensCarregadas.Clear();
            //delete this.ImagensCarregadas;
        }
         

    }

}