namespace Snebur.UI
{
    export class PropriedadeLargura extends BasePropriedadeComprimento
    {
        public readonly ProprieadesEstiloDom: string[] = ["width"];
 
        public constructor()
        {
            super(AtributosHtml.LarguraApresentacao);
        }

        protected RetornarValorDomCalculado(componenteApresentacao: ComponenteApresentacao,
            unidadeComprimento: UnidadeComprimento): string
        { 
            if (unidadeComprimento.TipoUnidade === EnumTipoUnidade.Pixel)
            {
                const margens = [componenteApresentacao.Margem.Esquerda, componenteApresentacao.Margem.Direita];
                const margemPixels = margens.Where(x => x.TipoUnidade === EnumTipoUnidade.Pixel).Sum(x => x.Valor);
                return (unidadeComprimento.Valor + margemPixels).ToRems();
            }
            return unidadeComprimento.ValorFormatado;
        }
     }
}
