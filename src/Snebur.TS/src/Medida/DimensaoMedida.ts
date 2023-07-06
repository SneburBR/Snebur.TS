
namespace Snebur
{
    export class DimensaoMedida extends BaseMedida
    {
        public readonly DimensaoEmCentimetros: IDimensao;

        public get DimensaoVisualizacao(): IDimensao
        {
            return {
                Largura: this.LarguraVisualizacao,
                Altura: this.AlturaVisualizacao
            };
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

        public constructor(dimensaoEmCentimetros: IDimensao, dpiVisualizacao: number)
        public constructor(dimensaoEmCentimetros: IDimensao, dimensaoElementoRecipienteEmPixels: IDimensao)
        public constructor(dimensaoEmCentimetros: IDimensao, dimensaoClienteOuDpi: IDimensao | number )
        {
            super((typeof dimensaoClienteOuDpi === "number") ? dimensaoClienteOuDpi : 0);

            this.DimensaoEmCentimetros = dimensaoEmCentimetros;

            if (DimensaoUtil.IsDimensao(dimensaoClienteOuDpi))
            {
                this.DpiVisualizacao = this.RetornarDpiVisualizacao(dimensaoClienteOuDpi);
            }
            else
            {
                this.DpiVisualizacao = dimensaoClienteOuDpi;
            }
        }

        private RetornarDpiVisualizacao(dimensaoElementoEmPixels: IDimensao): number
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