namespace Snebur.Utilidade
{
    export class CodigoUtil
    {
        public static FormatarVariavel(
            nome: string,
            formatacaoOrigem: EnumFormatacaoVariavelCodigo,
            formatacaoDestino: EnumFormatacaoVariavelCodigo): string
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
                case EnumFormatacaoVariavelCodigo.CamelCase:

                    return FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(
                        String.Join("", partes.Select(x => FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(x)))                    );

                case EnumFormatacaoVariavelCodigo.PascalCase:

                    return String.Join("", partes.Select(x => FormatacaoUtil.FormatarPrimeiraLetraMaiuscula(x)));

                case EnumFormatacaoVariavelCodigo.SnakeCase:

                    return String.Join("_", partes.Select(x => x.toLowerCase()));

                case EnumFormatacaoVariavelCodigo.UpperCase:

                    return String.Join("_", partes.Select(x => x.toUpperCase()));

                case EnumFormatacaoVariavelCodigo.HtmlCss:

                    return String.Join("-", partes.Select(x => x.toLowerCase()));
                default:

                    throw new Erro("Formatação não suportada");
            }
            
        }
        private static RetornarPartes(nome: string, formatacao: EnumFormatacaoVariavelCodigo): string[]
        {
            switch (formatacao)
            {
                case EnumFormatacaoVariavelCodigo.CamelCase:
                case EnumFormatacaoVariavelCodigo.PascalCase:

                    return nome.split(/(?=[A-Z0-9])/);

                case EnumFormatacaoVariavelCodigo.SnakeCase:
                case EnumFormatacaoVariavelCodigo.UpperCase:

                    return nome.split("_");

                case EnumFormatacaoVariavelCodigo.HtmlCss:

                    return nome.split("-");

                default:

                    throw new Erro("Formatação não suportada");
            }
        }
    }

    export enum EnumFormatacaoVariavelCodigo
    {
        PascalCase,
        CamelCase,
        SnakeCase,
        UpperCase,
        HtmlCss,
    }
}
