namespace Snebur.UI
{
    export class PropriedadeAlturaMinima extends BasePropriedadeComprimento
    {

        public readonly ProprieadesEstiloDom: string[] = ["min-height"];

        public constructor()
        {
            super(AtributosHtml.AlturaMinimaApresentacao);
        }

        protected RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string
        {
            if (unidadeComprimento.TipoUnidade === EnumTipoUnidade.Pixel)
            {
                const margens = [componenteApresentacao.Margem.Superior, componenteApresentacao.Margem.Inferior];
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
