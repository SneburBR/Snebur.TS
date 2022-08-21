namespace Snebur.UI
{
    export class IconeUtil
    {
        public static RetornarIconeEnum(descricao: string): EnumIcone
        {
            if (String.IsNullOrEmpty(descricao))
            {
                return EnumIcone.Vazio;
            }

            const iconeEnum = EnumUtil.RetornarValor(EnumIcone, descricao);
            if (iconeEnum == null)
            {
                throw new Erro(`O ícone ${descricao} não foi encontrado`);
            }
            return iconeEnum as EnumIcone;
        }

        public static RetornarIconeDomMaterial(
            icone: EnumIcone ): string
        {
            if (icone === EnumIcone.Vazio)
            {
                return String.Empty;
            }

            const descricao = EnumUtil.RetornarDescricao(EnumIcone, icone);
            return u.CodigoUtil.FormatarVariavel(descricao,
                u.EnumFormatacaoVariavelCodigo.PascalCase,
                u.EnumFormatacaoVariavelCodigo.SnakeCase);
        }
    }
}
