namespace Snebur.UI
{
    export class PropriedadeIconeCategoria extends PropriedadeEnumCssClasse<EnumIconeCategoria>
    {
        protected override readonly PREFIXO_CSS_CLASSE: string = "ap-icone-categoria--";
        protected override readonly ConstrutorEnum: any = EnumIconeCategoria;

        protected override get ValorPadraoVazio(): EnumIconeCategoria
        {
            return $Configuracao.ConfiguracaoLayout?.IconeCategoriaPadrao ?? EnumIconeCategoria.Vazio;
        }

        public constructor(
            public readonly IsElementoInterno: boolean)
        {
            super(AtributosHtml.IconeCategoria);
            this.IsAdicionarClassCssPadrao = true;
        }

        public override Atualizar(componenteApresentacao: ComponenteApresentacao): void
        {
            super.Atualizar(componenteApresentacao);
        }

        protected override RetornarValorParaComponente(
            componenteApresentacao: ComponenteApresentacao,
            valorDom: string): EnumIconeCategoria
        {
            const categoria = super.RetornarValorParaComponente(componenteApresentacao, valorDom);
            if (categoria === EnumIconeCategoria.Vazio &&
                componenteApresentacao instanceof ControleApresentacao)
            {
                return EnumIconeCategoria.Vazio;
            }
            return categoria;
        }

        protected RetornarSufixoCssClasseEnum(categoria: EnumIconeCategoria): string
        {
            switch (categoria)
            {
                case EnumIconeCategoria.Vazio:

                    return null;
                case EnumIconeCategoria.Filled:

                    return "filled";

                case EnumIconeCategoria.Outlined:

                    return "outlined";
                case EnumIconeCategoria.Rounded:

                    return "rounded";
                case EnumIconeCategoria.Sharp:

                    return "sharp";
                case EnumIconeCategoria.TwoTone:

                    return "two-tone";
                default:

                    throw new Erro("A categoria do ícone não é suportada");
            }
        }

        protected override RetornarElementoRecipienteCssClass(componenteApresentacao: ComponenteApresentacao): HTMLElement
        {
            const elementoRecipienteIcone = this.RetornarElementoRecipienteIcone(componenteApresentacao);
            const elementosIcones = elementoRecipienteIcone.getElementsByTagName(PropriedadeIcone.TAG_COMPONENTE_ICONE);
            if (elementosIcones.length === 0)
            {
                //console.warn(`O  elemento ícone não foi encontrado em ${componenteApresentacao.ControleApresentacao.___NomeConstrutor}
                //              OuterHTML: ${componenteApresentacao.Elemento.outerHTML.substring(0, 255)}`);
                return null;
            }
            return elementosIcones.item(0) as HTMLElement;
        }

        private RetornarElementoRecipienteIcone(componenteApresentacao: ComponenteApresentacao): HTMLElement
        {
            const elementoRecipienteIcone = ((componenteApresentacao as any) as IComponenteApresentacaoIcone).ElementoRecipienteIcone;
            if (elementoRecipienteIcone instanceof HTMLElement)
            {
                return elementoRecipienteIcone;
            }
            return componenteApresentacao.ElementoApresentacao;
        }

    }
}
