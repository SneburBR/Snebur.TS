namespace Snebur.Imagens
{
    export abstract class BaseAbrirImagemLocalCanvas implements IDisposable
    {
        protected readonly Qualidade: number = u.ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS;
        protected readonly ArquivoLocal: SnBlob;
      
        public constructor(arquivoLocal: SnBlob)
        {
            this.ArquivoLocal = arquivoLocal;
        }
 
        protected RetornarImagemData(imagem: HTMLImageElement, dimensao: IDimensao): [HTMLCanvasElement, ImageData]
        {
            const canvas = document.createElement("canvas");
            canvas.width = dimensao.Largura;
            canvas.height = dimensao.Altura;
            const contexto = canvas.getContext("2d");
            contexto.drawImage(imagem, 0, 0, dimensao.Largura, dimensao.Altura);
            const imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
            return [canvas, imageData];
        }

        protected RetornarCanvas(imagem: HTMLImageElement | HTMLCanvasElement, dimensao: IDimensao): HTMLCanvasElement
        {
            const canvas = document.createElement("canvas");
            canvas.width = dimensao.Largura;
            canvas.height = dimensao.Altura;
            const contexto = canvas.getContext("2d");
            contexto.drawImage(imagem, 0, 0, dimensao.Largura, dimensao.Altura);
            return canvas;
        }

        protected RetornarBlobAsync(
            canvas: HTMLCanvasElement,
            qualidade: number,
            mimeType: u.EnumMimeTypeImagemString.Jpeg | u.EnumMimeTypeImagemString.Webp): Promise<Blob>
        {
            return canvas.ToBlobAsync(mimeType, qualidade);
        }
         
        protected RetornarMimeType(): u.EnumMimeTypeImagemString.Jpeg | u.EnumMimeTypeImagemString.Webp
        {
            const extensao = this.ArquivoLocal.Extensao;
            if (extensao === ".jpg" || extensao === ".jpeg")
            {
                return u.EnumMimeTypeImagemString.Jpeg;
            }
            return u.EnumMimeTypeImagemString.Webp;
        }

        public Dispose(): void
        {
            this.ArquivoLocal?.RevokeUrlBlob();
            delete (this as any).OrigemImagemLocal;
            delete (this as any).ArquivoLocal;

        }
    }
}