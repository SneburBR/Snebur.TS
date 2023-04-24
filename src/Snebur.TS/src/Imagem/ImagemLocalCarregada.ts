
namespace Snebur.Imagens
{
    export class ImagemLocalCarregada implements IDisposable
    {
        public readonly UrlLocal: string;
        public readonly ArquivoBlob: Blob;
        public readonly TamanhoImagem: d.EnumTamanhoImagem;
        public readonly Erro: Error;

        public get IsSucesso(): boolean
        {
            return this.Erro == null &&
                this.ArquivoBlob instanceof Blob;
        }
     
        public constructor(tamanhoImagem: d.EnumTamanhoImagem, blob: Blob)
        {
            this.TamanhoImagem = tamanhoImagem;
            this.ArquivoBlob = blob;
            this.UrlLocal = window.URL.createObjectURL(this.ArquivoBlob);
        }

        public Dispose(): void
        {
            window.URL.revokeObjectURL(this.UrlLocal);
            delete (this as any).UrlLocal;
            delete (this as any).ArquivoBlob;
        }
    }
}

