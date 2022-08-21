namespace Snebur.UI
{
    export class PropriedadeTamanhoIcone extends PropriedadeEnumCssClasse<EnumTamanhoIcone>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "sn-tamanho-icone--";
        protected override readonly ConstrutorEnum: any = EnumTamanhoIcone;
        protected override readonly ValorPadraoVazio: EnumTamanhoIcone = EnumTamanhoIcone.Padrao;

        public constructor()
        {
            super(AtributosHtml.TamanhoIcone);
            this.IsAdicionarClassCssPadrao = true;
        }

        protected override AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorEnum: EnumTamanhoIcone): void
        {
            super.AtualizarApresentacao(componenteApresentacao, valorEnum);
        }

        protected RetornarSufixoCssClasseEnum(valorEnum: EnumTamanhoIcone): string
        {
            switch (valorEnum)
            {
                case EnumTamanhoIcone.Pequeno:

                    return "pequeno";

                case EnumTamanhoIcone.Padrao:

                    return "padrao";

                case EnumTamanhoIcone.Medio:

                    return "medio";

                case EnumTamanhoIcone.Grande:

                    return "grande";

                default:

                    throw new Erro("O tamanho do icone não é suportado");
            }

        }

    }
}
