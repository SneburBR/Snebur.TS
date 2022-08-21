//namespace Snebur.UI
//{
//    export abstract class PropriedadeAlinhamento<TEnumAlinhamento> extends PropriedadeApresentacao<TEnumAlinhamento>
//    {
//        private static readonly PREFIXO_CLASSE_CSS_ALINHAMENTO_VERTICAL = "ap-alinhamento-vertical--";
//        private static readonly PREFIXO_CLASSE_CSS_ALINHAMENTO_HORIZONTAL = "ap-alinhamento-horizontal--";
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_SUPERIOR = "ap-alinhamento-vertical--superior";
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO = "ap-alinhamento-vertical--centro";
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR = "ap-alinhamento-vertical--inferior";

        
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_ESQUERDA = "ap-alinhamento-horizontal--esquerda";
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO = "ap-alinhamento-horizontal--centro";
//        private static readonly NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA = "ap-alinhamento-horizontal--direita";

//        public constructor(atributoAlinha:AtributoHtml)
//        {
//            super(atributoAlinha);
//        }

//        private RetornarCssClasseAlinhamentoVertical(alinhamento: EnumAlinhamentoVertical): string
//        {

//        }
//        private RetornarCssClasseAlinhamentoVertical(alinhamento: EnumAlinhamentoVertical): string
//        {
//            switch (alinhamento)
//            {
//                case EnumAlinhamentoVertical.Superior:

//                    return String.Empty;

//                case EnumAlinhamentoVertical.Centro:

//                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_CENTRO;

//                case EnumAlinhamentoVertical.Inferior:

//                    return PropriedadeAlinhamentoVertical.NOME_CLASSE_CSS_ALINHAMENTO_VERTICAL_INFERIOR;

//                default:

//                    throw new Erro("O alinhamento vertical não é suportado")
//            }

//        }

//        private RetornarCssClasseAlinhamentoHorizontal(alinhamento: EnumAlinhamentoHorizontal): string
//        {
//            switch (alinhamento)
//            {
//                case EnumAlinhamentoHorizontal.Esquerda:

//                    return String.Empty;

//                case EnumAlinhamentoHorizontal.Centro:

//                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_CENTRO;

//                case EnumAlinhamentoHorizontal.Direita:

//                    return PropriedadeAlinhamentoHorizontal.NOME_CLASSE_CSS_ALINHAMENTO_HORIZONTAL_DIREITA;

//                default:

//                    throw new Erro("O alinhamento horizontal não é suportado")
//            }

//        }
//	}
//}
