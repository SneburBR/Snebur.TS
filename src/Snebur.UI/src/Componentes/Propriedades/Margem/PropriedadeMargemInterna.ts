namespace Snebur.UI
{
    export class PropriedadeMargemInterna extends BasePropriedadeMargem
    {

        private readonly PrefixoMargem: string = "padding";
        protected readonly IsMargemInterna: boolean = true;

        public constructor()
        {
            super(AtributosHtml.MargemInterna);
            //this.MargemEnum = margemEnum;
            //this.ProprieadesEstiloDom = this.RetornarPropriedadesEstiloDom(margemEnum);
        }

        protected RetornarPropriedadeEstilo(componenteApresentacao: ComponenteApresentacao,margemEnum: EnumMargem, unidadeComprimento: UnidadeComprimento): string
        {
            const sufixo = this.RetornarPropriedadeSufixo(margemEnum);
            if (unidadeComprimento.Valor < 0 &&
                (margemEnum === EnumMargem.Esquerda || margemEnum || EnumMargem.Direita))
            {
                return "margin" + sufixo;
            }
            return this.PrefixoMargem  + sufixo;
        }
    }
}
