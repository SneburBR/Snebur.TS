namespace Snebur.UI
{
    export class PropriedadeFonte extends PropriedadeEnumCssClasse<EnumFonte>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "ap-fonte--";
        protected override readonly ConstrutorEnum: any = EnumFonte;
        protected override readonly ValorPadraoVazio: EnumFonte = EnumFonte.Vazio;

        public constructor()
        {
            super(AtributosHtml.Fonte);
            this.IsAplicarElementoApresentacao = false;
        }

        protected override RetornarValorParaComponente(componenteApresentacao: ComponenteApresentacao, valorDom: string): EnumFonte
        {
            const peso = super.RetornarValorParaComponente(componenteApresentacao, valorDom);
            if (peso === EnumFonte.Vazio && componenteApresentacao instanceof ControleApresentacao)
            {
                return EnumFonte.Vazio;
            }
            return peso;
        }

        protected RetornarSufixoCssClasseEnum(peso: EnumFonte): string
        {
            switch (peso)
            {
                case EnumFonte.Vazio:
                    return String.Empty;

                case EnumFonte.Roboto:
                    return "roboto";

                case EnumFonte.RobotoCondensed:
                    return "roboto-condensed";

                default:

                    throw new Erro("O peso da fonte não é suportada");
            }

        }

    }
}
