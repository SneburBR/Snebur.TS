namespace Snebur.UI
{
    export class PropriedadeTipoAnimacao extends PropriedadeEnumCssClasse<EnumTipoAnimacao>
    {
        protected override readonly PREFIXO_CSS_CLASSE = "ap-tipo-aninacao--";
        protected override readonly ValorPadraoVazio = EnumTipoAnimacao.Nenhuma;
        protected override readonly ConstrutorEnum: any = EnumTipoAnimacao;
        protected override readonly IsAdicionarClassCssPadrao = true;

        public constructor()
        {
            super(AtributosHtml.TipoAnimacao);

        }

        protected RetornarSufixoCssClasseEnum(tipoAninacao: EnumTipoAnimacao): string
        {
            switch (tipoAninacao)
            {
                case EnumTipoAnimacao.Nenhuma:

                    return "nenhuma";

                case EnumTipoAnimacao.Deslizante:

                    return "deslizante";

                default:

                    throw new Erro("O tipo de animação não é suportado");
            }

        }

    }
}
