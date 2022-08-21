namespace Snebur.UI
{
    export class PropriedadeTipoBotao extends PropriedadeEnumCssClasse<EnumTipoBotao>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "sn-tipo-botao--";
        protected override readonly ConstrutorEnum: any = EnumTipoBotao;
        protected override readonly ValorPadraoVazio: EnumTipoBotao = EnumTipoBotao.Normal;

        public constructor()
        {
            super(AtributosHtml.TipoBotao);
            this.IsAdicionarClassCssPadrao = true;
        }

        protected override AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorEnum: EnumTipoBotao): void
        {
            return super.AtualizarApresentacao(componenteApresentacao, valorEnum);
        }

        protected RetornarSufixoCssClasseEnum(valorEnum: EnumTipoBotao): string
        {
            switch (valorEnum)
            {
                case EnumTipoBotao.Normal:

                    return "normal";

                case EnumTipoBotao.Flat:

                    return "flat";

                case EnumTipoBotao.Circulo:

                    return "circulo";

                case EnumTipoBotao.MiniCirculo:

                    return "mini-circulo";

                case EnumTipoBotao.Icone:

                    return "icone";

                //case EnumTipoBotao.IconeDireita:

                //    return "icone-direita";

                case EnumTipoBotao.Link:

                    return "link";

                case EnumTipoBotao.LinkDestaque:

                    return "link-destaque";

                case EnumTipoBotao.Menu:

                    return "menu";

                case EnumTipoBotao.FlatBox:

                    return "flat-box";

                case EnumTipoBotao.Tab:

                    return "tab";

                default:

                    throw new Erro("O tipo do botão não é suportado");
            }

        }

    }
}
