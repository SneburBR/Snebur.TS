namespace Snebur.Imagens
{
    export abstract class BaseAbrirImagemLocalMagick implements IDisposable
    {

        protected _exif: ExifrJS.MargeOutput;
        protected readonly Redimensinamentos = new Array<RedimensionarImagemMagick>();

        public get Exif(): ExifrJS.MargeOutput
        {
            return this._exif;
        }

        public get NomeArquivo(): string
        {
            return this.ArquivoLocal.name;
        }

        public constructor(
            private readonly ArquivoLocal: SnBlob)
        {
 
        }

        protected abstract PopularRedimensionamentos(): void;

        protected async RetornarOpcoesAsync(bytesOrigem: Uint8Array): Promise<IOpcoesMagick>
        {
            const redimensionamentos = this.Redimensinamentos;
            return {
                NomeArquivoOrigem: this.NomeArquivo,
                Identificador: u.GuidUtil.RetornarNovoGuid(),
                BytesPerfilDestino: MagickInitUtil.sRgbProfile,
                BytesOrigem: bytesOrigem,
                IsRemoverExif: true,
                Qualidade: QUALIDADE_APRESENTACAO_MAGICK,
                Redimensinamentos: redimensionamentos,
                /*BufferWasm: MagickInitUtil.BufferWasm,*/
                BlobWasm: MagickInitUtil.BlobWasm,
                UrlMagick: MagickInitUtil.UrlBlobMagick
            };
        }

        public async ProcessarAsync(): Promise<IResultadoMagick>
        {
            this.PopularRedimensionamentos();

            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(this.ArquivoLocal);
            const bytes = new Uint8Array(buffer);
            this._exif = await ExifUtil.RetornarExifAsync(bytes);

            const opcoes = await this.RetornarOpcoesAsync(bytes);
            const resultado = await this.ProcessarInternoAsync(opcoes);
            return resultado;

        }

        private async ProcessarInternoAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick>
        {
            try
            {
                if (MagickUtil.IsWorker)
                {
                    const resultado = await this.ProcessarWorkerAsync(opcoes);
                    if (!(resultado instanceof Error) && resultado != null)
                    {
                        return resultado;
                    }
                    console.error("Falha magick worker " + this.NomeArquivo);
                }
            }
            catch (erro)
            {
                console.error("Falha ao processar no worker " + erro);
            }

            const t = Stopwatch.StartNew();
            const processador = new MagickProcessador(opcoes);
            const resultado = await processador.ProcessarAsync();
            if (!(resultado instanceof Error) && resultado != null)
            {
                console.warn(`Processado Magick Main Thread  : Arquivo: ${opcoes?.NomeArquivoOrigem} - t ${t.TotalSeconds} `);
                return resultado;
            }
            console.error("Falha magick main thread " + this.NomeArquivo);
            return null;
        }

        private async ProcessarWorkerAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick>
        {
            const resultado = await w.GerenciadorMagickWorker.Instancia.ProcessarAsync(opcoes);
            if (resultado instanceof Error)
            {
                console.error("Falha ao processar imagem MagickWorker " + resultado);
                return null;
            }
            return resultado;
        }
         
        public Dispose(): void
        {

        }
    }
}