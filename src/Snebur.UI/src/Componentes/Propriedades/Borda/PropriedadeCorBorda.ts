namespace Snebur.UI
{
    export class PropriedadeCorBorda extends BasePropriedadeCor
    {
        public readonly PrefixoCor = EnumPrefixoCor.CorBorda;
        public readonly NomePropriedadeEstiloDom = EnumEstiloCor.CorBorda;

        public constructor()
        {
            super(AtributosHtml.CorBordaApresentacao, AtributosHtml.TonalidadeBordaApresentacao);
        }
    }
}
