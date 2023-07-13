namespace Snebur.UI
{
    export class CanvasUtil
    {
        //Area máxima de 268.435.456 pixels,
        //Máximo do UInt16 16384 65536  = 16384  * 4
        public static readonly CANVAS_AREA_MAXIMA = 16384 * 16384;
        public static readonly LADO_MAXIMO = 65535;

        public constructor()
        {

        }

        public static NormalizarDimensaoMaxima(dimensao: IDimensao)
        {
            const area = dimensao.Largura * dimensao.Altura;
            if (area > CanvasUtil.CANVAS_AREA_MAXIMA)
            {
                const scalar = Math.sqrt(CanvasUtil.CANVAS_AREA_MAXIMA / area);
                const larguraLimite = Math.round(dimensao.Largura * scalar);
                const alturaLimite = Math.round(dimensao.Altura * scalar);

                const dimensaoAreaMaxima = DimensaoUtil.RetornarDimencaoUniformeDentro(
                    dimensao.Largura,
                    dimensao.Altura,
                    larguraLimite,
                    alturaLimite);

                if (dimensaoAreaMaxima.Largura < CanvasUtil.LADO_MAXIMO &&
                    dimensaoAreaMaxima.Altura < CanvasUtil.LADO_MAXIMO)
                {
                    return dimensaoAreaMaxima;
                }
                dimensao = dimensaoAreaMaxima;
            }

            if (dimensao.Largura > CanvasUtil.LADO_MAXIMO ||
                dimensao.Altura > CanvasUtil.LADO_MAXIMO)
            {
                return DimensaoUtil.RetornarDimencaoUniformeDentro(
                    dimensao.Largura,
                    dimensao.Altura,
                    CanvasUtil.LADO_MAXIMO,
                    CanvasUtil.LADO_MAXIMO);
            }
            return dimensao;
        }

        public static RetornarCanvas(
            canvasOrigem: HTMLCanvasElement,
            recorte: IRecorte,
            dimensaoDestino: IDimensao): HTMLCanvasElement
        {
            const ctxOrigem = canvasOrigem.getContext("2d");
            const imageDataOrigem = ctxOrigem.getImageData(0, 0, canvasOrigem.width, canvasOrigem.height);

            u.ImagemUtil.LimparCanvas(canvasOrigem);
            //dimensaoFoto = RecorteUtil.NormalizarDimensaoFoto(dimensaoFoto,
            //    imageDataOrigem.width,
            //    imageDataOrigem.height);


            //const dimensaoDestino = DimensaoUtil.RetornarDimencaoUniformeDentro(
            //    dimensaoFoto.Largura,
            //    dimensaoFoto.Altura,
            //    imageDataOrigem.width,
            //    imageDataOrigem.height,
            //    false,
            //    true);

            const imagemDataRecortado = CanvasUtil.RetornarImagemData(
                imageDataOrigem,
                recorte,
                dimensaoDestino);

            const canvas = document.createElement("canvas");
            canvas.width = imagemDataRecortado.width;
            canvas.height = imagemDataRecortado.height;
            const ctx = canvas.getContext("2d");
            ctx.putImageData(imagemDataRecortado, 0, 0);
            return canvas;
        }

        public static RetornarImagemData(imageDataOrigem: ImageData, recorte: IRecorte, dimensaoDestino: IDimensao): ImageData
        {
            const imageDataDestino = this.RetornarNovoIamgeData(dimensaoDestino.Largura, dimensaoDestino.Altura);

            const colunaInicio = Math.floor(imageDataOrigem.width * recorte.XScalar);
            let colunaFim = colunaInicio + dimensaoDestino.Largura;

            const linhaInicio = Math.floor(imageDataOrigem.height * recorte.YScalar);
            let linhaFim = linhaInicio + dimensaoDestino.Altura;

            colunaFim = Math.min(imageDataOrigem.width, colunaFim);
            linhaFim = Math.min(imageDataOrigem.height, linhaFim);

            for (let linha = linhaInicio; linha < linhaFim; linha++)
            {
                for (let coluna = colunaInicio; coluna < colunaFim; coluna++)
                {
                    const posicaoOrigem = ((linha * imageDataOrigem.width) + coluna) * 4;
                    const posicaoDestino = (((linha - linhaInicio) * imageDataDestino.width) + (coluna - colunaInicio)) * 4;

                    imageDataDestino.data[posicaoDestino] = imageDataOrigem.data[posicaoOrigem];
                    imageDataDestino.data[posicaoDestino + 1] = imageDataOrigem.data[posicaoOrigem + 1];
                    imageDataDestino.data[posicaoDestino + 2] = imageDataOrigem.data[posicaoOrigem + 2];
                    imageDataDestino.data[posicaoDestino + 3] = imageDataOrigem.data[posicaoOrigem + 3];
                }
            }
            return imageDataDestino;
        }

        private static RetornarNovoIamgeData(largura: number, altura: number): ImageData
        {
            if (u.SistemaUtil.IsInternetExplorer11)
            {
                const len = Math.floor(largura * altura * 4);
                const data = new Uint8ClampedArray(len);
                return {
                    data: data,
                    width: Math.floor(largura),
                    height: Math.floor(altura),
                    colorSpace: "srgb"
                };
            }
            return new ImageData(largura, altura);
        }
    }
}
