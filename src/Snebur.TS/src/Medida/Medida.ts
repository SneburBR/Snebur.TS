namespace Snebur
{
    export class Medida extends BaseMedida
    {
        public readonly MediaEmCentimetros: number;

        public get Visualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MediaEmCentimetros, this.DpiVisualizacao);
        }
        public get Impressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.MediaEmCentimetros);
        }

        public constructor(medidaEmCentimetros: number, dpiVisualizacao: number)
        {
            super(dpiVisualizacao);
            this.DpiVisualizacao = dpiVisualizacao;
            this.MediaEmCentimetros = medidaEmCentimetros;
        }
    }
}