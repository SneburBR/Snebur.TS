
namespace Snebur
{
    export class DimensaoMedida extends BaseMedida
    {
        public DimensaoEmCentimetros: d.Dimensao;

        public get DimensaoVisualizacao(): d.Dimensao
        {
            return new d.Dimensao(this.LarguraVisualizacao, this.AlturaVisualizacao);
        }

        public get LarguraVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.DimensaoEmCentimetros.Largura, this.DpiVisualizacao);
        }

        public get AlturaVisualizacao(): number
        {
            return u.MedidaUtil.RetornarPixelsVisualizacao(this.DimensaoEmCentimetros.Altura, this.DpiVisualizacao);
        }

        public get LarguraImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.DimensaoEmCentimetros.Largura);
        }

        public get AlturaImpressao(): number
        {
            return u.MedidaUtil.RetornarPixelsImpressao(this.DimensaoEmCentimetros.Altura);
        }

        public constructor(dimensaoEmCentimetros: d.Dimensao, dpiVisualizacao: number)
        public constructor(dimensaoEmCentimetros: d.Dimensao, dimensaoElementoRecipienteEmPixels: d.Dimensao)
        public constructor(dimensaoEmCentimetros: d.Dimensao, argumento: any)
        {
            super((typeof argumento === "number") ? argumento : 0);

            this.DimensaoEmCentimetros = dimensaoEmCentimetros;

            if (argumento instanceof d.Dimensao)
            {
                this.DpiVisualizacao = this.RetornarDpiVisualizacao(argumento);
            }
        }

        private RetornarDpiVisualizacao(dimensaoElementoEmPixels: d.Dimensao): number
        {
            const dpiVisualizacaoX = u.MedidaUtil.RetornarDpiVisualizacao(this.DimensaoEmCentimetros.Largura, dimensaoElementoEmPixels.Largura);
            const dpiVisualizacaoY = u.MedidaUtil.RetornarDpiVisualizacao(this.DimensaoEmCentimetros.Altura, dimensaoElementoEmPixels.Altura);

            //if (Math.round(dpiVisualizacaoX) != Math.round(dpiVisualizacaoY))
            //{
            //    throw new ErroOperacaoInvalida("A dimensão não invalidas para o calculo do dpi de visualização", this);
            //}
            return Math.min(dpiVisualizacaoX, dpiVisualizacaoY);
        }
    }
}