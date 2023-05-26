namespace Snebur.Imagens
{
    export class AbrirImagemLocalMagick extends BaseAbrirImagemLocalMagick
    {

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
                this.OrigemImagemLocal.AtualizarDimensaoLocal(resultado.MagickFormat, resultado.DimensaoLocal);

                if (resultado?.IsSucesso === true)
                {
                    const imagensLocalCarregada = new DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>();
                    for (const imagemCarregada of resultado.ImagensCarregada)
                    {
                        this.OrigemImagemLocal.AtualizarDimensaoApresentacao(imagemCarregada.TamanhoImagem, imagemCarregada.Dimensao);

                        const imagemLocalCarregada = new ImagemLocalCarregada(
                            imagemCarregada.TamanhoImagem,
                            imagemCarregada.Arquivo,
                            resultado.MimeType);
                        imagensLocalCarregada.Add(imagemCarregada.TamanhoImagem, imagemLocalCarregada);
                    }
                    await this.OrigemImagemLocal.SalvarPedenciasAsync();
                    return imagensLocalCarregada;
                }
            }
            return null;
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
