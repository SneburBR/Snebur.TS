namespace Snebur.ServicoArquivo
{
    export class ImagemCarregadaEventArgs extends EventArgs
    {
        public UrlImagem: string

        public Erro: Error;

        public TamanhoImagem: d.EnumTamanhoImagem;

        public constructor(urlImagem: string, tamanhoImagem: d.EnumTamanhoImagem, erro: Error)
        {
            super();
            this.UrlImagem = urlImagem;
            this.TamanhoImagem = tamanhoImagem;
        }
    }
}