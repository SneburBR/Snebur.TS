namespace Snebur.Imagens
{
    export class ImagemServidorCarregada 
    {
        public UrlServidor: string;
        public Imagem: d.IImagem;
        public TamanhoImagem: EnumTamanhoImagem;

        public constructor(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem)
        {
            this.Imagem = imagem;
            this.TamanhoImagem = tamanhoImagem;
            if (this.TamanhoImagem !== EnumTamanhoImagem.Impressao)
            {
                this.UrlServidor = u.ImagemUtil.RetornarUrlImagemServidor(imagem, tamanhoImagem);
            }
        }
    }
}
