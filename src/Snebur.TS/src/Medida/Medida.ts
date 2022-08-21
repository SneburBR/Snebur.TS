namespace Snebur
{
    export class Medida extends BaseMedida
    {
        public MediaEmCentimetros: number;

        public get MedidaVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MediaEmCentimetros, this.DpiVisualizacao);
        }

        public constructor(medidaEmCentimetros: number, dpiVisualizacao: number)
        {
            super(dpiVisualizacao);
            this.DpiVisualizacao = dpiVisualizacao;
        }
    }
}