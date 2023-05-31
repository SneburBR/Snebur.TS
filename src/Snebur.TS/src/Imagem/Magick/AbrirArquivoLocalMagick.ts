namespace Snebur.Imagens
{
    export class AbrirArquivoLocalMagick extends BaseAbrirImagemLocalMagick
    {
        public constructor(
            arquivo: SnBlob,
            private readonly Dimensao: IDimensao)
        {
            super(arquivo);
        }

        protected PopularRedimensionamentos(): void
        {
            this.Redimensinamentos.Add({
                Dimensao: this.Dimensao,
                TamanhoImagem: EnumTamanhoImagem.Pequena,
            });
        }
    }
}
