namespace Snebur.UI
{
    export class PropriedadeMargem extends BasePropriedadeMargem
    {
        private readonly PrefixoMargem: string = "padding";
        //private readonly PrefixoMargem: string = "padding";
        protected readonly IsMargemInterna: boolean = false;

        public constructor()
        {
            super(AtributosHtml.Margem);
        }

        protected RetornarPropriedadeEstilo(componenteApresentacao: ComponenteApresentacao, margemEnum: EnumMargem, unidadeComprimento: UnidadeComprimento): string
        {
            const sufixo = this.RetornarPropriedadeSufixo(margemEnum);
            if ((unidadeComprimento.Valor < 0 &&
                (margemEnum === EnumMargem.Esquerda || margemEnum || EnumMargem.Direita)) ||
                !(componenteApresentacao as ComponenteApresentacaoConteudo).IsAdicionarElementoConteudoApresentacao)
            {
                return "margin" + sufixo;
            }
            return this.PrefixoMargem + sufixo;
        }
    }
}
