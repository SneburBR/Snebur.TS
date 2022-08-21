namespace Snebur.UI
{
    export abstract class BasePropriedadeMargem extends PropriedadeApresentacao<MargemUnidadeComprimento>
    {
        //private readonly MargemEnum: EnumMargem;
        //public readonly ProprieadesEstiloDom: string[];

        private static readonly MARGENS = [EnumMargem.Esquerda, EnumMargem.Superior, EnumMargem.Direita, EnumMargem.Inferior];

        //protected abstract readonly PrefixoMargem: string; //= "padding";
        //private readonly PrefixoMarcacao = "border";
        //private readonly CorMarcacao = "rgba(0,0,0, 0.1)";
        protected abstract readonly IsMargemInterna: boolean;

        public constructor(atributoMargem: AtributoHtml)
        {
            super(atributoMargem);

            //this.IsMargemInterna = atributoMargem == AtributosHtml.MargemInterna;

            //this.MargemEnum = margemEnum;
            //this.ProprieadesEstiloDom = this.RetornarPropriedadesEstiloDom(margemEnum);
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, margem: MargemUnidadeComprimento): string
        {
            return margem.MargemFormatada;
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): MargemUnidadeComprimento
        {
            return new MargemUnidadeComprimento(ConverterUtil.ParaString(valorDom));
        }


        private RetornarPropriedadesEstiloDom(margens: EnumMargem): string[]
        {
            const margensEnum = EnumUtil.RetornarFlags(EnumMargem, margens);
            return margensEnum.Select(x => this.RetornarPropriedadeSufixo(x));
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, margemUnidadeComprimento: MargemUnidadeComprimento): void
        {
            //if (this.IsMargemInterna && !(componenteApresentacao as ComponenteApresentacaoConteudo).IsAdicionarElementoConteudoApresentacao)
            //{
            //    return;
            //}

            const elementoMargem = this.IsMargemInterna ? componenteApresentacao.ElementoMargemInterna : componenteApresentacao.ElementoMargem;
            for (const margemEnun of PropriedadeMargem.MARGENS)
            {
                const unidadeComprimento = margemUnidadeComprimento.RetornarUnidadeComprimento(margemEnun);

                //let sufixo = this.RetornarPropriedadeSufixo(margemEnun);
                //let propriedadeEstilo = this.PrefixoMargem + "-" + sufixo;
                const propriedadeEstilo = this.RetornarPropriedadeEstilo(componenteApresentacao, margemEnun, unidadeComprimento);
                (elementoMargem.style as any)[propriedadeEstilo] = unidadeComprimento.ValorFormatado;
            }

        }


        protected abstract RetornarPropriedadeEstilo(componenteApresentacao: ComponenteApresentacao, margemEnum: EnumMargem, unidadeComprimento: UnidadeComprimento): string;

        protected RetornarPropriedadeSufixo(margem: EnumMargem): string
        {
            switch (margem)
            {
                case EnumMargem.Superior:

                    return "Top";

                case EnumMargem.Inferior:

                    return "Bottom";

                case EnumMargem.Esquerda:

                    return "Left";

                case EnumMargem.Direita:

                    return "Right";


                default:

                    throw new Erro("Margem não suportada");
            }
        }

        //private RetornarPropriedadeEstiloMarcarMargem(margem: EnumMargem): string
        //{
        //    switch (margem)
        //    {
        //        case EnumMargem.Superior:

        //            return "margin-top";

        //        case EnumMargem.Inferior:

        //            return "margin-bottom";

        //        case EnumMargem.Esquerda:

        //            return "margin-left";

        //        case EnumMargem.Direita:

        //            return "margin-right";


        //        default:

        //            throw new Erro("Margem não suportada");
        //    }
        //}

    }
}
