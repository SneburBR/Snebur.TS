namespace Snebur.UI
{
    export class PropriedadeLarguraMinima extends BasePropriedadeComprimento
    {

        public readonly ProprieadesEstiloDom: string[] = ["min-width"];

        public constructor()
        {
            super(AtributosHtml.LarguraMinimaApresentacao);
        }

        protected RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string
        {
             
            if (unidadeComprimento.TipoUnidade === EnumTipoUnidade.Pixel)
            {
                const margens = [componenteApresentacao.Margem.Esquerda, componenteApresentacao.Margem.Direita];
                const margemPixels = margens.Where(x => x.TipoUnidade === EnumTipoUnidade.Pixel).Sum(x => x.Valor);
                return (unidadeComprimento.Valor + margemPixels).ToRems();
            }
            if (unidadeComprimento.TipoUnidade === EnumTipoUnidade.Auto)
            {
                return String.Empty;
            }
            return unidadeComprimento.ValorFormatado;
        }

        protected override AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): void
        {
            super.AtualizarApresentacao(componenteApresentacao, unidadeComprimento, true);
        }
         
    }
}
