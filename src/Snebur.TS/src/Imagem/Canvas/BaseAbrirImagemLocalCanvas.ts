namespace Snebur.Imagens
{
    export abstract class BaseAbrirImagemLocalCanvas implements IDisposable
    {
        private static readonly SCALAR_PADRAO = 2;
        protected readonly abstract QualidadePica: number;

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

        protected async RetornarCanvasAsync(imagem: HTMLImageElement | HTMLCanvasElement, dimensao: IDimensao)
        {
            const scalar = this.RetornarScalar(imagem, dimensao);
            const canvasOrigem = document.createElement("canvas");
            canvasOrigem.width = dimensao.Largura * scalar;
            canvasOrigem.height = dimensao.Altura * scalar;
            const contexto = canvasOrigem.getContext("2d");
            contexto.drawImage(imagem, 0, 0, canvasOrigem.width, canvasOrigem.height);

            const canvasDestino = document.createElement("canvas");
            canvasDestino.width = dimensao.Largura;
            canvasDestino.height = dimensao.Altura;

            const opcoes: PicaJS.PicaOptions = {
                concurrency: 1,
            };

            const opcoesResize: PicaJS.PicaResizeOptions = {
                quality: this.QualidadePica,
                unsharpAmount: 0,
                unsharpRadius: 0,
                unsharpThreshold: 0,
                alpha: true
            };

            const picaInstancia = new pica(opcoes);
            const resultado = await picaInstancia.resize(
                canvasOrigem,
                canvasDestino,
                opcoesResize);

            if (resultado !== canvasDestino)
            {
                console.error("Falha no redimensionamento do Pica, Arquivo: " + this.ArquivoLocal.name);
                return this.RetornarCanvas_Normal(imagem, dimensao);
            }

            return resultado;
        }

        private RetornarScalar(imagem: HTMLImageElement | HTMLCanvasElement, dimensao: d.IDimensao): number
        {
            const larguraImagem = imagem instanceof HTMLImageElement ? imagem.naturalWidth : imagem.width;
            const alturaImagem = imagem instanceof HTMLImageElement ? imagem.naturalHeight : imagem.height;

            if (dimensao.Largura * BaseAbrirImagemLocalCanvas.SCALAR_PADRAO > larguraImagem ||
                dimensao.Altura * BaseAbrirImagemLocalCanvas.SCALAR_PADRAO > alturaImagem)
            {
                return Math.min(
                    larguraImagem / dimensao.Largura,
                    alturaImagem / dimensao.Altura);
            }
            return BaseAbrirImagemLocalCanvas.SCALAR_PADRAO;
        }

        protected RetornarCanvas_Normal(imagem: HTMLImageElement | HTMLCanvasElement, dimensao: IDimensao): HTMLCanvasElement
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