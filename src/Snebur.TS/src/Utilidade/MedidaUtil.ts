
namespace Snebur.Utilidade
{
    export class MedidaUtil
    {
        public static DPI_IMPRESSAO_PADRAO: number = 300;
        public static POLEGADA: number = 2.54;

        public static RetornarPixelsImpressao(medidaEmCentimetros: number): number
        {
            return MedidaUtil.ParaPixels(medidaEmCentimetros, MedidaUtil.DPI_IMPRESSAO_PADRAO);
        }

        public static RetornarPixelsVisualizacao(medidiaEmCentimetros: number, dpiVisualizacao: number): number
        {
            return MedidaUtil.ParaPixels(medidiaEmCentimetros, dpiVisualizacao);
        }

        public static ParaPixels(medidaEmCentimetos: number, dpi: number): number
        {
            return (medidaEmCentimetos / MedidaUtil.POLEGADA) * dpi;
        }

        public static ParaCentimentros(mediaEmPixels: number, dpi: number)
        {
            return (mediaEmPixels / dpi) * MedidaUtil.POLEGADA;
        }

        public static RetornarDpiVisualizacao(medidaEmCentimetros: number, medidaEmPixel: number): number
        {
            return (medidaEmPixel * 300) / u.MedidaUtil.RetornarPixelsImpressao(medidaEmCentimetros);
        }

        public static RetornarDpiDimensaoVisualizacao(dimensaoCm: IDimensao, dimensaoPixels: IDimensao, isPrefeirMenor:boolean= true): number
        {
            const dpiX = MedidaUtil.RetornarDpiVisualizacao(dimensaoCm.Largura, dimensaoPixels.Largura);
            const dpiY = MedidaUtil.RetornarDpiVisualizacao(dimensaoCm.Altura, dimensaoPixels.Altura);
            if (dimensaoPixels)
            {
                return Math.min(dpiX, dpiY).ToDecimal(1);
            }
            return Math.max(dpiX, dpiY).ToDecimal(1);
        }

        public static RetornarDimensaoImpressao(dimensaoEmCentimetros: IDimensao): d.Dimensao
        {
            return new d.Dimensao(
                u.MedidaUtil.RetornarPixelsImpressao(dimensaoEmCentimetros.Largura),
                u.MedidaUtil.RetornarPixelsImpressao(dimensaoEmCentimetros.Altura));
        }

        public static RetornarDimensaoVisualizacao(dimensaoEmCentimetros: IDimensao, dpi: number): d.Dimensao
        {
            return new d.Dimensao(
                u.MedidaUtil.RetornarPixelsVisualizacao(dimensaoEmCentimetros.Largura, dpi),
                u.MedidaUtil.RetornarPixelsVisualizacao(dimensaoEmCentimetros.Altura, dpi));
        }

        public static CentimetrosParaDecimilimetros(espessuraLaminasCm: number): number
        {
            return parseInt(Math.round(espessuraLaminasCm * 10 * 10));
        }

        public static MilimetrosParaDecimilimetros(espessuraLaminasMm: number): number
        {
            return parseInt(Math.round(espessuraLaminasMm * 10));
        }

        public static IsRegiaoDomIgual(regiao1: DOMRect, regiao2: DOMRect): boolean
        {
            return regiao1.x === regiao2.x &&
                regiao1.y === regiao2.y &&
                regiao1.width === regiao2.width &&
                regiao1.height === regiao2.height;
        }

        public static RetornarTotaMegaPixels(dimensao: IDimensao)
        {
            return (dimensao.Largura * dimensao.Altura) / (1000 * 1000);
        }
    }
}