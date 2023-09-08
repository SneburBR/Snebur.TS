namespace Snebur.Utilidade
{
    export class SenhaUtil
    {
        private static CARACTERES_INVALIDOS = [" ", "+"];

        public static IsSenhaValida(valorNormal: string)
        {
            for (const c of valorNormal.ToArray())
            {
                if (SenhaUtil.CARACTERES_INVALIDOS.Contains(c))
                {
                    return false;
                }
            }
            return true;
        }

        public static RetornarNomePropriedadeValorNormal(propriedade: r.Propriedade)
        {
            return `__${propriedade?.Nome}_ValorNormal`;
        }
    }
}