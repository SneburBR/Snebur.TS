namespace Snebur.Imagens
{
    export abstract class BaseAbrirImagemLocalMagick implements IDisposable
    {
        /*protected _exif: ExifrJS.MargeOutput;*/
        protected readonly Redimensinamentos = new Array<RedimensionarImagemMagick>();

        //public get Exif(): ExifrJS.MargeOutput
        //{
        //    return this._exif;
        //}

        public get NomeArquivo(): string
        {
            return this.ArquivoLocal.name;
        }

        protected abstract readonly IsImpressao: boolean;
        public constructor(
            private readonly ArquivoLocal: SnBlob)
        {

        }

        protected abstract PopularRedimensionamentos(): void;

        protected async RetornarOpcoesAsync(/*bytesOrigem: Uint8Array*/): Promise<IOpcoesMagick>
        {
            const redimensionamentos = this.Redimensinamentos;
            return {
                NomeArquivoOrigem: this.NomeArquivo,
                /*BytesOrigem: bytesOrigem,*/
                ArquivoOrigem: this.ArquivoLocal.Blob,
                IsRemoverExif: true,
                IsPngParaJpeg: false,
                Qualidade: QUALIDADE_APRESENTACAO_MAGICK,
                Redimensinamentos: redimensionamentos,
                IsConverterSRGB: true
            };
        }


        public async ProcessarAsync(): Promise<IResultadoMagick>
        {
            try
            {
                this.PopularRedimensionamentos();

                /*const buffer = await ArquivoUtil.RetornarBufferArrayAsync(this.ArquivoLocal);*/
                /*const bytes = new Uint8Array(buffer);*/
                /*this._exif = await ExifUtil.RetornarExifAsync(bytes);*/
                const opcoes = await this.RetornarOpcoesAsync();
                const resultado = await this.ProcessarInternoAsync(opcoes);
                return resultado;
            }
            catch (erro)
            {
                console.error(`Erro a carregar arquivo com magick ${erro} - ${this.ArquivoLocal.name}`);
                return null;
            }
        }

        private async ProcessarInternoAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick>
        {
            try
            {
                if (MagickInitUtil.IsWorker )
                {
                    const resultado = await this.ProcessarWorkerAsync(opcoes);
                    if (resultado != null && !(resultado instanceof Error))
                    {
                        return resultado;
                    }
                    console.error(`Magick Worker - Falha ao processar imagem - tentando processar na main thread: ${opcoes.NomeArquivoOrigem}`);
                }
            }
            catch (erro)
            {
                console.error("Falha ao processar no worker " + erro);
            }

            const stopwatch = Stopwatch.StartNew();
            const processador = new MagickProcessador(opcoes, MagickInitUtil.BytesPerfilSRGB);
            const resultado = await processador.ProcessarAsync();
            if (resultado == null || resultado instanceof Error)
            {
                console.error(`Magick Main Thread  -Falha ao processar imagem: ${opcoes.NomeArquivoOrigem} - ${resultado}`);
                return null;
            }
            LogImagemUtil.SucessoMagick(
                EnumMotorProcessamentoImagem.MagickMainThread,
                opcoes,
                resultado,
                stopwatch,
                this.IsImpressao);
             
            return resultado;
        }

        private async ProcessarWorkerAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick>
        {
            const stopwatch = Stopwatch.StartNew();
            const resultado = await w.GerenciadorMagickWorker.Instancia.ProcessarAsync(opcoes);
            if (resultado == null || resultado instanceof Error)
            {
                console.error(`Falha ao processar imagem MagickWorker: ${resultado}`);
                return null;
            }

            LogImagemUtil.SucessoMagick(
                EnumMotorProcessamentoImagem.MagickWorker,
                opcoes,
                resultado,
                stopwatch,
                this.IsImpressao);
                 
            return resultado;
        }

        public Dispose(): void
        {

        }
    }


}