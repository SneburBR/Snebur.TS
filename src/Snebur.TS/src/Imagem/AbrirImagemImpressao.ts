namespace Snebur.Imagem
{
    export class AbrirImagemImpressao extends BaseAbrirImagemLocal 
    {
        private static readonly TIMEOUT = 90 * 1000;
        private IdTimeout: number;
        private readonly DimensaoImpressao: d.Dimensao;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, dimensaoImpressao: d.Dimensao)
        {
            super(origemImagemLocal);
            this.DimensaoImpressao = dimensaoImpressao;
        }

        public RetornarArrayBufferAsync(): Promise<ArrayBuffer>
        {
            return new Promise<ArrayBuffer>(resolver =>
            {
                this.FuncaoResolver = resolver;
                this.IdTimeout = window.setTimeout(this.ResolverTimeout, AbrirImagemImpressao.TIMEOUT);
                this.CarregarImagemLocal();
            });
        }

        private ResolverTimeout()
        {
            console.error("Timeout abrir imagem impressão " + this.ArquivoLocal?.name);
            this.Resolver(null);
        }

        protected override Resolver(args: any)
        {
            window.clearTimeout(this.IdTimeout);
            super.Resolver(args);
        }

        protected override async ImagemOriginalLocal_Carregada(e: Event)
        {
            super.ImagemOriginalLocal_Carregada(e);
            const dimensao = this.NormalizarDimensao(this.ImagemLocal, this.DimensaoImpressao);
            const canvas = this.RetornarCanvas(this.ImagemLocal, dimensao);
            if (this.OrigemImagemLocal.FormatoImagem === d.EnumFormatoImagem.JPEG)
            {
                const contexto = canvas.getContext("2d");
                const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);

                try
                {
                    const bytes = await Snebur.WebWorker.SalvarJpeg.RetornarBytesAsync(imageData, u.ImagemUtil.QUALIDADE_JPEG_IMPRESSAO);
                    const bufferArray = this.RetornarArrayButter(bytes);
                    this.Resolver(bufferArray);
                    return;
                }
                catch (err)
                {
                    console.error(err);
                }

            }

            const blob = await this.RetornarBlobAsync(canvas, false, u.ImagemUtil.QUALIDADE_JPEG_IMPRESSAO / 100);
            if (blob != null)
            {
                const bytes = await u.ArquivoUtil.RetornarBufferArrayAsync(blob);
                const bufferArray = this.RetornarArrayButter(bytes);
                this.Resolver(bufferArray);
                return;
            }
            this.Resolver(null);
        }



        private NormalizarDimensao(imagem: HTMLImageElement, dimensao: d.Dimensao): d.Dimensao 
        {
            if (dimensao === null)
            {
                return new Dimensao(imagem.naturalWidth, imagem.naturalHeight);
            }
            return dimensao;
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