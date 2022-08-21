namespace Snebur.UI
{
    export class TipograficaUtil
    {
        public static readonly PREFIXO_CSS_CLASSE: string = "ap-tipografia--";

        public static RetornarCssClasse(tipografia: EnumTipografia): string
        {
            return `${TipograficaUtil.PREFIXO_CSS_CLASSE}${TipograficaUtil.RetornarSufixoCssClasseEnum(tipografia)}`;
        }

        public static  RetornarSufixoCssClasseEnum(tipografia: EnumTipografia): string
        {
            switch (tipografia)
            {
                case EnumTipografia.Vazio:

                    return String.Empty;

                case EnumTipografia.h1:

                    return "h1";
                case EnumTipografia.h2:

                    return "h2";

                case EnumTipografia.h3:

                    return "h3";

                case EnumTipografia.h4:

                    return "h4";

                case EnumTipografia.h5:

                    return "h5";

                case EnumTipografia.h6:

                    return "h6";
                case EnumTipografia.h7:

                    return "h7";

                case EnumTipografia.Titulo:

                    return "titulo";

                case EnumTipografia.SubTitulo:

                    return "sub-titulo";

                case EnumTipografia.SubTitulo2:

                    return "sub-titulo2";

                case EnumTipografia.Corpo:

                    return "corpo";

                case EnumTipografia.Corpo2:

                    return "corpo2";

                case EnumTipografia.Descricao:

                    return "descricao";

                case EnumTipografia.Descricao2:

                    return "descricao2";

                case EnumTipografia.BotaoCaixaAlta:

                    return "botao-caixa-alta";

                case EnumTipografia.LinhaCaixaAlta:

                    return "linha-caixa-alta";

                default:

                    throw new Erro("A tipografia não é suportada");
            }

        }
	}
}
