namespace Snebur
{
    export class ItemImagemEventArgs extends EventArgs
    {
        public readonly Imagem: d.IImagem;
        public constructor(imagem: d.IImagem)
        {
            super();
            this.Imagem = imagem;
        }
    }
}
