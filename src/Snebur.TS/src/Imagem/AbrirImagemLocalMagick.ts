namespace Snebur.Imagens
{
    export class AbrirImagemLocalMagick implements IDisposable
    {
        private _isSalvarPendente: boolean = false;
        private _exif: ExifrJS.MargeOutput;

        protected readonly Redimensinamentos = new Array<RedimensionarImagemMagick>();
        public get Exif(): ExifrJS.MargeOutput
        {
            return this._exif;
        }

        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }

        public constructor(
            private readonly OrigemImagemLocal: sa.OrigemImagemLocal,
            tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            for (const tamanhoImagem of tamanhosImagem.OrderByDescending(x => x))
            {
                const dimensao = u.ImagemUtil.RetornarDimensaoApresentacao(tamanhoImagem);
                this.Redimensinamentos.Add({
                    TamanhoImagem: tamanhoImagem,
                    Dimensao: dimensao
                });
            }
        }

        public async CarergarImagemAsync(): Promise<DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(this.OrigemImagemLocal.ArquivoLocal);
            const bytes = new Uint8Array(buffer);
            this._exif = await ExifUtil.RetornarExifAsync(bytes);

            const opcoes = await this.RetornarOpcoesAsync(bytes);
            const resultado = await this.ProcessarAsync(opcoes);

            if (resultado != null)
            {
                this.AtualizarDimensaoLocal(resultado.MagickFormat, resultado.DimensaoLocal);

                if (resultado?.IsSucesso === true)
                {
                    const imagensLocalCarregada = new DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>();
                    for (const imagemCarregada of resultado.ImagensCarregada)
                    {
                        this.AtualizarDimensaoApresentacao(imagemCarregada.TamanhoImagem, imagemCarregada.Dimensao);

                        const imagemLocalCarregada = new ImagemLocalCarregada(
                            imagemCarregada.TamanhoImagem,
                            imagemCarregada.Arquivo,
                            resultado.MimeType);
                        imagensLocalCarregada.Add(imagemCarregada.TamanhoImagem, imagemLocalCarregada);
                    }

                    if (this._isSalvarPendente)
                    {
                        const imagem = this.Imagem;
                        const contexto = $Aplicacao.RetornarContextoDados(imagem.GetType() as r.TipoEntidade);
                        contexto.SalvarAsync(imagem);
                    }
                    return imagensLocalCarregada;
                }
            }
            return null;
        }

        private async RetornarOpcoesAsync(bytesOrigem: Uint8Array): Promise<IOpcoesMagick>
        {
            const redimensionamentos = this.Redimensinamentos;
            return {
                NomeArquivoOrigem: this.Imagem.NomeArquivo,
                Identificador: u.GuidUtil.RetornarNovoGuid(),
                BytesPerfilDestino: MagickInitUtil.sRgbProfile,
                BytesOrigem: bytesOrigem,
                IsRemoverExif: true,
                Qualidade: QUALIDADE_APRESENTACAO_MAGICK,
                Redimensinamentos: redimensionamentos,
                BufferWasm: MagickInitUtil.BufferWasm,
                UrlMagick: MagickInitUtil.UrlBlobMagick
            };
        }

        private async ProcessarAsync(opcoes: IOpcoesMagick): Promise<IResultadoMagick>
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
                    console.error("Falha magick worker " + this.Imagem.NomeArquivo);
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
                
                return resultado;
            }
            console.error("Falha magick main thread " + this.Imagem.NomeArquivo);
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

        private AtualizarDimensaoLocal(formato: "JPEG" | "WEBP", dimensao: IDimensao)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            const formatoImagem = formato === MagickWasm.MagickFormat.Jpeg ? EnumFormatoImagem.JPEG : EnumFormatoImagem.WEBP;
            const mimeType = formato === MagickWasm.MagickFormat.Jpeg ? EnumMimeType.Jpeg : EnumMimeType.Webp;

            if (ImagemUtil.AtualizarDimensaLocal(imagem, dimensao, formatoImagem, mimeType, false))
            {
                this._isSalvarPendente = true;
            }
        }

        private AtualizarDimensaoApresentacao(tamanhoImagem: d.EnumTamanhoImagem, dimensaoApresentacao: IDimensao)
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
