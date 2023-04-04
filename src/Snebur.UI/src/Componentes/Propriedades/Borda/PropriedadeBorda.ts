namespace Snebur.UI
{
    export class PropriedadeBorda extends BasePropriedadeMargem
    {
        protected readonly PrefixoBorda: string = "border";
        protected readonly IsMargemInterna: boolean = true;

        public constructor()
        {
            super(AtributosHtml.Borda);
        }

        protected override AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, margemUnidadeComprimento: MargemUnidadeComprimento): void
        {
            super.AtualizarApresentacao(componenteApresentacao, margemUnidadeComprimento);

            const elementoApresentacao = componenteApresentacao.ElementoApresentacao;
            elementoApresentacao.style.borderColor = this.RetornarCorBorda(margemUnidadeComprimento);
            elementoApresentacao.style.borderStyle = this.RetornarEstiloBorda(margemUnidadeComprimento);
        }

        protected RetornarPropriedadeEstilo(componenteApresentacao: ComponenteApresentacao, margemEnum: EnumMargem, unidadeComprimento: UnidadeComprimento): string
        {
            const sufixo = this.RetornarPropriedadeSufixo(margemEnum);
            return this.PrefixoBorda + sufixo + "Width";
        }

        private RetornarCorBorda(margemUnidadeComprimento: MargemUnidadeComprimento): string
        {
            //if (margemUnidadeComprimento.ExisteMargem)
            //{
            //    return "silver";
            //}
            return String.Empty;

        }

        private RetornarEstiloBorda(margemUnidadeComprimento: MargemUnidadeComprimento): string
        {
            if (margemUnidadeComprimento.ExisteMargem)
            {
                return "solid";
            }
            return String.Empty;

        }
    }
}
