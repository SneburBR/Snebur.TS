namespace Snebur.Utilidade
{
    
    export class MedidaUtil
    {
        private static readonly DPI_IMPRESSAO_PADRAO = 300;
        public static readonly POLEGADA: number = 2.54;
        private static __DPI_IMPRESSAO: number = MedidaUtil.DPI_IMPRESSAO_PADRAO;
        public static get DPI_IMPRESSAO(): number
        {
            return this.__DPI_IMPRESSAO;
        }

        public static SetDpiImpressao(dpiImpressao: number)
        {
            if (!ValidacaoUtil.IsNumber(dpiImpressao))
            {
                console.error(`DPI de impressão inválido ${dpiImpressao}`);
                return;
            }
            if (dpiImpressao < 200)
            {
                console.error(`O DPI '${dpiImpressao}'' de impressão deve ser superior 200`);
            }
            MedidaUtil.__DPI_IMPRESSAO = dpiImpressao;
        }

        public static RetornarPixelsImpressao(medidaEmCentimetros: number): number
        {
            return MedidaUtil.ParaPixels(medidaEmCentimetros, MedidaUtil.DPI_IMPRESSAO);
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
            if (medidaEmCentimetros === 0 || medidaEmPixel === 0)
            {
                return 0;
            }
            return (medidaEmPixel * MedidaUtil.DPI_IMPRESSAO) / u.MedidaUtil.RetornarPixelsImpressao(medidaEmCentimetros);
        }

        public static RetornarDpiDimensaoVisualizacao
            (dimensaoCm: IDimensao,
                dimensaoPixels: IDimensao,
                isPrefeirMenor: boolean = true,
                isGerarLogErro: boolean = true): number
        {
            const dpiX = MedidaUtil.RetornarDpiVisualizacao(dimensaoCm.Largura, dimensaoPixels.Largura);
            const dpiY = MedidaUtil.RetornarDpiVisualizacao(dimensaoCm.Altura, dimensaoPixels.Altura);

            if (isGerarLogErro &&
                !Util.IgualSensivel(dpiX, dpiY, 0.1))
            {
                console.error(`DPI X '${dpiX}' e diferente do Y '${dpiY}', fora da margem tolerância: ${0.1}`);
            }

            if (isPrefeirMenor)
            {
                return Math.min(dpiX, dpiY).ToDecimal(1);
            }
            return Math.max(dpiX, dpiY).ToDecimal(1);
        }

        public static RetornarDimensaoImpressao(dimensaoEmCentimetros: IDimensao): d.Dimensao
        public static RetornarDimensaoImpressao(dimensaoEmCentimetros: IDimensao, isTipar: false): IDimensao
        public static RetornarDimensaoImpressao(dimensaoEmCentimetros: IDimensao, isTipar: true): d.Dimensao
        public static RetornarDimensaoImpressao(dimensaoEmCentimetros: IDimensao, isTipar: boolean = true): IDimensao
        {
            const largura = u.MedidaUtil.RetornarPixelsImpressao(dimensaoEmCentimetros.Largura);
            const altura = u.MedidaUtil.RetornarPixelsImpressao(dimensaoEmCentimetros.Altura);

            if (isTipar)
            {
                return new Dimensao(largura, altura);
            }

            return {
                Largura: largura,
                Altura: altura
            };

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

