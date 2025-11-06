namespace Snebur.Utilidade
{
    export class CodigoUtil
    {
        private static lowerToUpperRegex = /([a-z])([A-Z])/g;
        private static upperToUpperRegex = /([A-Z])([A-Z][a-z])/g;

        public static Formatar(
            nome: string,
            formatacaoOrigem: EnumFormatacaoCodigo,
            formatacaoDestino: EnumFormatacaoCodigo): string
        {
            if ($Configuracao.IsDebugOuTeste)
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

 
        public static PascalToSnakeCase(input: string): string
        {
            return this.PascalToLowerCase(input, '_');
        }
         
        public static PascalToKebabCase(input: string): string
        {
            return this.PascalToLowerCase(input, '-');
        }
         
        private static PascalToLowerCase(input: string, separator: string): string
        {
            if (!input)
            {
                return '';
            }

            let result = input;
            result = result.replace(this.lowerToUpperRegex, `$1${separator}$2`);
            // Adiciona separador entre letras maiúsculas consecutivas seguidas de minúsculas
            result = result.replace(this.upperToUpperRegex, `$1${separator}$2`);
            return result.toLowerCase();
        }
    }
} 