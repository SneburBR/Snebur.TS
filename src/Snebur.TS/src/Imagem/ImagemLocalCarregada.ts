﻿
namespace Snebur.Imagens
{
    export class ImagemLocalCarregada 
    {
        public readonly UrlLocal: string;
        public readonly ArquivoBlob: Blob;
        public readonly TamanhoImagem: d.EnumTamanhoImagem;
        public readonly Erro: Error;
        public readonly MimeType: ImagemMimeType;

        public get IsSucesso(): boolean
        {
            return this.Erro == null &&
                this.ArquivoBlob instanceof Blob;
        }

        public constructor(
            tamanhoImagem: d.EnumTamanhoImagem,
            blob: Blob,
            mimeType: ImagemMimeType)
        {
            this.TamanhoImagem = tamanhoImagem;
            this.ArquivoBlob = blob;
            this.UrlLocal = window.URL.createObjectURL(this.ArquivoBlob);
            this.MimeType = mimeType;
        }

        public Dispose(): void
        {
            window.URL.revokeObjectURL(this.UrlLocal);
            delete (this as any).UrlLocal;
            delete (this as any).ArquivoBlob;
        }
    }

   /*export  type ImagemLocalMimeType = "image/jpeg" | "image/webp";*/
}

