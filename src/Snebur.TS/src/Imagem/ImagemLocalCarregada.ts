
namespace Snebur.Imagem
{
    export class ImagemLocalCarregada implements IDisposable
    {
        public UrlLocal: string;
        public Blob: Blob;
        public TamanhoImagem: d.EnumTamanhoImagem;
        public Erro: Error;
     

        public constructor(tamanhoImagem: d.EnumTamanhoImagem, blob: Blob)
        {
            this.TamanhoImagem = tamanhoImagem;
            this.Blob = blob;
            this.UrlLocal = window.URL.createObjectURL(this.Blob);
        }

        public Dispose(): void
        {
            window.URL.revokeObjectURL(this.UrlLocal);
            delete this.UrlLocal;
            delete this.Blob;
        }
    }
}

