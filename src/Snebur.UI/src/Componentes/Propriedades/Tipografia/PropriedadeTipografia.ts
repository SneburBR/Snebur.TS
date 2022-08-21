namespace Snebur.UI
{
    export class PropriedadeTipografia extends PropriedadeEnumCssClasse<EnumTipografia>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = TipograficaUtil.PREFIXO_CSS_CLASSE;
        protected override readonly ConstrutorEnum: any = EnumTipografia;
        protected override readonly ValorPadraoVazio: EnumTipografia = EnumTipografia.Vazio;

        public constructor()
        {
            super(AtributosHtml.Tipografia);
            this.IsAplicarElementoApresentacao = false;
        }

        protected override RetornarValorParaComponente(componenteApresentacao: ComponenteApresentacao, valorDom: string): EnumTipografia
        {
            const tipografia = super.RetornarValorParaComponente(componenteApresentacao, valorDom);
            if (tipografia === EnumTipografia.Vazio && componenteApresentacao instanceof ControleApresentacao)
            {
                return EnumTipografia.Corpo;
            }
            return tipografia;
        }

        protected RetornarSufixoCssClasseEnum(tipografia: EnumTipografia): string
        {
            return TipograficaUtil.RetornarSufixoCssClasseEnum(tipografia);
        }
    }
}
