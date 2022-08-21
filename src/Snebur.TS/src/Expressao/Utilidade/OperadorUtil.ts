namespace Snebur.Expressao
{
    export class OperadorUtil 
    {
        public static MetodosOperador: string[] = ["StartsWith", "EndsWith", "Contains"];

        public static RetornarDescricaoOperador(operadorCompararEnum: EnumOperadorPropriedade): string
        {
            switch (operadorCompararEnum)
            {
                case (EnumOperadorPropriedade.Igual):

                    return "==";

                case (EnumOperadorPropriedade.IgualAbsoluto):

                    return "===";

                case (EnumOperadorPropriedade.Diferente):

                    return "!=";

                case (EnumOperadorPropriedade.DiferenteAbsoluto):

                    return "!==";

                case (EnumOperadorPropriedade.Maior):

                    return ">";

                case (EnumOperadorPropriedade.MaiorIgual):

                    return ">=";

                case (EnumOperadorPropriedade.Menor):

                    return "<";

                case (EnumOperadorPropriedade.MenorIgual):

                    return "<=";

                case (EnumOperadorPropriedade.IniciaCom):

                    return "StartsWith";

                case (EnumOperadorPropriedade.TerminaCom):

                    return "EndsWith";

                case (EnumOperadorPropriedade.Possui):

                    return "Contains";

                default:

                    throw new ErroNaoSuportado(`O operador não é suportado ${ u.EnumUtil.RetornarDescricao(EnumOperadorPropriedade, operadorCompararEnum)}`, this);
            }
        }

        public static RetornarOperador(descricaoOperador: string): EnumOperadorPropriedade
        {
            switch (descricaoOperador.trim())
            {
                case "==":

                    return EnumOperadorPropriedade.Igual;

                case "===":

                    return EnumOperadorPropriedade.IgualAbsoluto;

                case "!=":

                    return EnumOperadorPropriedade.Diferente;

                case "!==":

                    return EnumOperadorPropriedade.DiferenteAbsoluto;

                case ">":

                    return EnumOperadorPropriedade.Maior;

                case ">=":

                    return EnumOperadorPropriedade.MaiorIgual;

                case "<":

                    return EnumOperadorPropriedade.Menor;

                case "<=":

                    return EnumOperadorPropriedade.MenorIgual;

                case "StartsWith":

                    return EnumOperadorPropriedade.IniciaCom;

                case "EndsWith":

                    return EnumOperadorPropriedade.TerminaCom;

                case "Contains":

                    return EnumOperadorPropriedade.Possui;

                default:

                    throw new ErroNaoSuportado(`A descricao operador não é suportado ${descricaoOperador}`, this);
            }
        }

        public static ExpressaoMetodoOperador(expressao: string): boolean
        {
            const ultimaParte = expressao.split(" ").Last();
            if (!String.IsNullOrWhiteSpace(ultimaParte))
            {
                const posicaoPonto = ultimaParte.lastIndexOf(".");
                if (posicaoPonto !== -1)
                {
                    const nomeMetodo = ultimaParte.substring(posicaoPonto + 1);
                    return OperadorUtil.MetodosOperador.Contains(nomeMetodo);
                }
            }
            return false;
        }
    }
}