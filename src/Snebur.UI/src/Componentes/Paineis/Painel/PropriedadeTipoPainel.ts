namespace Snebur.UI
{
    export class PropriedadeTipoPainel extends PropriedadeEnumCssClasse<EnumTipoPainel>
    {
        protected override readonly PREFIXO_CSS_CLASSE = "ap-tipo-painel--";
        protected override readonly ValorPadraoVazio = EnumTipoPainel.Vazio;
        protected override readonly ConstrutorEnum: any = EnumTipoPainel;

        public constructor()
        {
            super(AtributosHtml.TipoPainel);
        }

        protected RetornarSufixoCssClasseEnum(tipoPainel: EnumTipoPainel): string
        {
            switch (tipoPainel)
            {
                case EnumTipoPainel.Bloco:

                    return "bloco";

                case EnumTipoPainel.BlocoPilha:

                    return "bloco-pilha";

                case EnumTipoPainel.BlocoVertical:

                    return "bloco-vertical";

                case EnumTipoPainel.PilhaVertical:

                    return "pilha-vertical";

                case EnumTipoPainel.PilhaHorizontal:

                    return "pilha-horizontal";

                case EnumTipoPainel.PilhaVerticalCheia:

                    return "pilha-vertical-cheia";

                case EnumTipoPainel.PilhaHorizontalCheia:

                    return "pilha-horizontal-cheia";

                case EnumTipoPainel.PilhaHorizontalEmLinha:

                    return "pilha-horizontal-em-linha";

                default:

                    throw new Erro("O tipo do painel não é implementado");
            }
        }
    }
}
