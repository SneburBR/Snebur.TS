namespace Snebur.Utilidade
{
    export class CodigoUtil
    {
        public static Formatar(
            nome: string,
            formatacaoOrigem: EnumFormatacaoCodigo,
            formatacaoDestino: EnumFormatacaoCodigo): string
        {
            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                if (/\s+/.test(nome))
                {
                    throw new Erro("A nome da variável não pode conter espaços");
                }
            }

            const partes = CodigoUtil.RetornarPartes(nome.trim(), formatacaoOrigem);
            switch (formatacaoDestino)
            {
                case EnumFormatacaoCodigo.CamelCase:

                    return FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(
                        String.Join("", partes.Select(x => FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(x))));

                case EnumFormatacaoCodigo.PascalCase:

                    return String.Join("", partes.Select(x => FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(x)));

                case EnumFormatacaoCodigo.SnakeCase:

                    return String.Join("_", partes.Select(x => x.toLowerCase()));

                case EnumFormatacaoCodigo.UpperCase:

                    return String.Join("_", partes.Select(x => x.toUpperCase()));

                case EnumFormatacaoCodigo.KebabCase:

                    return String.Join("-", partes.Select(x => x.toLowerCase()));
                default:

                    throw new Erro("Formatação não suportada");
            }

        }

        private static RetornarPartes(nome: string, formatacao: EnumFormatacaoCodigo): string[]
        {
            switch (formatacao)
            {
                case EnumFormatacaoCodigo.CamelCase:
                case EnumFormatacaoCodigo.PascalCase:

                    return nome.split(/(?=[A-Z0-9])/);

                case EnumFormatacaoCodigo.SnakeCase:
                case EnumFormatacaoCodigo.UpperCase:

                    return nome.split("_");

                case EnumFormatacaoCodigo.KebabCase:

                    return nome.split("-");

                default:

                    throw new Erro("Formatação não suportada");
            }
        }
    }
 
}
