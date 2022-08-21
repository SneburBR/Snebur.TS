namespace Snebur.UI
{
    export class PropriedadeAltura extends BasePropriedadeComprimento
    {

        public readonly ProprieadesEstiloDom: string[] = ["height"];

        public constructor()
        {
            super(AtributosHtml.AlturaApresentacao);
        }

        protected RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao, unidadeComprimento: UnidadeComprimento): string
        {
   
            if (unidadeComprimento.TipoUnidade === EnumTipoUnidade.Pixel)
            {
                const margens = [componenteApresentacao.Margem.Superior, componenteApresentacao.Margem.Inferior];
                const margemPixels = margens.Where(x => x.TipoUnidade === EnumTipoUnidade.Pixel).Sum(x => x.Valor);
                return (unidadeComprimento.Valor + margemPixels).ToRems();
            }
            return unidadeComprimento.ValorFormatado;
        }
    }
}
