namespace Snebur.UI
{
    export class ProprieadeAlturaLinha extends BasePropriedadeComprimento
    {
        public readonly ProprieadesEstiloDom: string[] = ["line-height"];

        public constructor()
        {
            super(AtributosHtml.AlturaLinha);
        }

        protected RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string
        {
            //if (unidadeComprimento.TipoUnidade == EnumTipoUnidadeComprimento.Porcentagem)
            //{
            //    let unidadesComprimento = [componenteApresentacao.Margem.Superior, componenteApresentacao.Margem.Inferior];
            //    return UnidadeComprimentoUtil.RetornarValorCalculado(unidadeComprimento.Valor, unidadesComprimento);
            //}
            return unidadeComprimento.ValorFormatado;
        }

        protected override AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): void
        {
            /*const elementoDimensao = componenteApresentacao.ElementoDimensao;*/
            const elementoApresentacao = componenteApresentacao.ElementoApresentacao;

            if (!unidadeComprimento.IsVazio)
            {
                //if (String.IsNullOrEmpty(elementoDimensao.style.height))
                //{

                //    let valorDomCalculado = this.RetornarValorDomCalculado(componenteApresentacao, unidadeComprimento);
                //    elementoDimensao.style.height = valorDomCalculado;
                //}

                //elementoApresentacao.style.height = unidadeComprimento.ValorFormatado;
                elementoApresentacao.style.lineHeight = unidadeComprimento.ValorFormatado;
                elementoApresentacao.style.setProperty("line-height", unidadeComprimento.ValorFormatado, "important");
                componenteApresentacao.Elemento.classList.add("sn-ui-altura-linha");
                //elementoApresentacao.style.whiteSpace = "nowrap";

            }
            else
            {
                //elementoApresentacao.style.height = String.Empty;
                //elementoApresentacao.style.lineHeight = String.Empty;
                //elementoApresentacao.style.whiteSpace = String.Empty;
            }
        }

    }
}
