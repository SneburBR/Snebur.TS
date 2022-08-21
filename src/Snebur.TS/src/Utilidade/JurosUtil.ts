namespace Snebur.Utilidade
{
    export class JurosUtil
    {
		/**
		 * Retornar o valor da parcela
		 * @param tipoJuros
		 * @param valorCapital
		 * @param numeroParcelas numero de parcelas
		 * @param jurosAoMes taxa de juros ao mês
		 */
        public static CalcularJuros(tipoJuros: d.EnumTipoJuros, valorCapital: number, numeroParcelas: number, jurosAoMes: number)
        {
            switch (tipoJuros)
            {
                case d.EnumTipoJuros.Simples:

                    return JurosUtil.CalcularJurosSimples(valorCapital,
                        numeroParcelas,
                        jurosAoMes);

                case d.EnumTipoJuros.Composto:

                    return JurosUtil.CalcularJurosComposto(valorCapital,
                        numeroParcelas,
                        jurosAoMes);
                case d.EnumTipoJuros.Amortizado:

                    return JurosUtil.CalcularJurosAmortizado(valorCapital,
                        numeroParcelas,
                        jurosAoMes);

                default:

                    throw new ErroNaoSuportado("O tipo de juros não é suportado");
            }
        }

        public static CalcularJurosSimples(valorCapital: number, numeroParcelas: number, jurosAoMes: number)
        {
            if (jurosAoMes > 0)
            {
                const juros = (1 + ((jurosAoMes / 100) * numeroParcelas));
                return (valorCapital * juros).ToDecimal();
            }
            return valorCapital;
        }

        public static CalcularJurosComposto(valorCapital: number, numeroParcelas: number, jurosAoMes: number)
        {
            if (jurosAoMes > 0)
            {
                const juros = 1 + (jurosAoMes / 100);
                const valorFinal = valorCapital * Math.pow(juros, numeroParcelas);
                return valorFinal.ToDecimal();
            }
            return valorCapital;
        }

        public static CalcularJurosAmortizado(valorCapital: number, numeroParcelas: number, jurosAoMes: number)
        {
            if (jurosAoMes > 0)
            {
                const jurosPercentual = (jurosAoMes / 100);
                const valorParcela = (valorCapital * Math.pow((1 + jurosPercentual), numeroParcelas) * jurosPercentual) / (Math.pow((1 + jurosPercentual), numeroParcelas) - 1);
                return (valorParcela * numeroParcelas).ToDecimal();
            }
            return valorCapital;
        }
    }
}
