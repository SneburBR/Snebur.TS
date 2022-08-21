namespace Snebur
{
    export class MargemMedida extends BaseMedida
    {
        public MargemEmCentimetros: d.Margem;

        public get EsquerdaVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MargemEmCentimetros.Esquerda, this.DpiVisualizacao);
        }

        public get SuperiorVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MargemEmCentimetros.Superior, this.DpiVisualizacao);
        }

        public get DireitaVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MargemEmCentimetros.Direita, this.DpiVisualizacao);
        }

        public get InferiorVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.MargemEmCentimetros.Inferior, this.DpiVisualizacao);
        }

        public get EsquerdaImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.MargemEmCentimetros.Esquerda);
        }

        public get SuperiorImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.MargemEmCentimetros.Superior);
        }

        public get DireitaImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.MargemEmCentimetros.Direita);
        }

        public get InferiorImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.MargemEmCentimetros.Inferior);
        }

        public constructor(margemEmCentimetros: d.Margem, dpiVisualizacao: number)
        {
            super(dpiVisualizacao);

            this.MargemEmCentimetros = margemEmCentimetros;
        }
    }
}