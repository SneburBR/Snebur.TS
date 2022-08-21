namespace Snebur.UI
{
    export class PropriedadePesoFonte extends PropriedadeEnumCssClasse<EnumPesoFonte>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "ap-peso-fonte--";
        protected override readonly ConstrutorEnum: any = EnumPesoFonte;
        protected override readonly ValorPadraoVazio: EnumPesoFonte = EnumPesoFonte.Vazio;

        public constructor()
        {
            super(AtributosHtml.PesoFonte);
            this.IsAplicarElementoApresentacao = false;
        }

        protected override RetornarValorParaComponente(componenteApresentacao: ComponenteApresentacao, valorDom: string): EnumPesoFonte
        {
            const peso = super.RetornarValorParaComponente(componenteApresentacao, valorDom);
            if (peso === EnumPesoFonte.Vazio && componenteApresentacao instanceof ControleApresentacao)
            {
                return EnumPesoFonte.Vazio;
            }
            return peso;
        }

        protected RetornarSufixoCssClasseEnum(peso: EnumPesoFonte): string
        {
            switch (peso)
            {
                case EnumPesoFonte.Vazio:
                    return String.Empty;

                case EnumPesoFonte.SuperLeve:
                    return "super-leve";

                case EnumPesoFonte.Leve:
                    return "leve";

                case EnumPesoFonte.Normal:
                    return "normal";

                case EnumPesoFonte.Negrito:
                    return "negrito";

                case EnumPesoFonte.Pesado:
                    return "pesado";

                case EnumPesoFonte.SuperPesado:
                    return "super-pesado";

                default:

                    throw new Erro("O peso da fonte não é suportada");
            }

        }

    }
}
