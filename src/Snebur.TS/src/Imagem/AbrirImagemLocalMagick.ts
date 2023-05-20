namespace Snebur.Imagens
{
    export class AbrirImagemLocalMagick extends BaseAbrirImagemLocalMagick
    {
        private _isSalvarPendente: boolean = false;
        public readonly OrigemImagemLocal: sa.OrigemImagemLocal;

        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }

        public constructor(
            origemImagemLocal: sa.OrigemImagemLocal,
            private readonly TamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            super(origemImagemLocal.ArquivoLocal);

            this.OrigemImagemLocal = origemImagemLocal;


        }
        protected override PopularRedimensionamentos(): void
        {
            for (const tamanhoImagem of this.TamanhosImagem.OrderByDescending(x => x))
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
            const resultado = await this.ProcessarAsync();
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
                        await contexto.SalvarAsync(imagem);
                    }

                    return imagensLocalCarregada;
                }
            }
            return null;
        }


        protected AtualizarDimensaoLocal(formato: "JPEG" | "WEBP", dimensao: IDimensao)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            const formatoImagem = formato === MagickWasm.MagickFormat.Jpeg ? EnumFormatoImagem.JPEG : EnumFormatoImagem.WEBP;
            const mimeType = formato === MagickWasm.MagickFormat.Jpeg ? EnumMimeType.Jpeg : EnumMimeType.Webp;

            if (ImagemUtil.AtualizarDimensaLocal(imagem, dimensao, formatoImagem, mimeType, false))
            {
                this._isSalvarPendente = true;
            }
        }

        protected AtualizarDimensaoApresentacao(tamanhoImagem: d.EnumTamanhoImagem, dimensaoApresentacao: IDimensao)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            if (ImagemUtil.AtualizarDimensao(imagem, dimensaoApresentacao, tamanhoImagem))
            {
                this._isSalvarPendente = true;
            }
        }
    }

    export class AbrirArquivoLocalMagick extends BaseAbrirImagemLocalMagick
    {
        public constructor(arquivo: SnBlob,
            private Dimensao: IDimensao)
        {
            super(arquivo);
        }

        protected PopularRedimensionamentos(): void
        {
            this.Redimensinamentos.Add({
                Dimensao: this.Dimensao,
                TamanhoImagem: EnumTamanhoImagem.Pequena
            });
        }

    }
}
