namespace Snebur.Utilidade
{
    export class DescontoUtil
    {
        public static RetornarDesconto(valorInicial: number, valorFinal: number): number
        {
            return ((valorFinal - valorInicial) / (valorInicial) * 100).ToDecimal();
        }

        public static CalcularDesconto(valorInicial: number, desconto: number): number
        {
            return (valorInicial - ((desconto / 100) * valorInicial)).ToDecimal();
        }
    }
}