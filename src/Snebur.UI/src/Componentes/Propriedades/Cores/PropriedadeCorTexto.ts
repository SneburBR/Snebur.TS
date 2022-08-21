namespace Snebur.UI
{
    export class PropriedadeCorTexto extends BasePropriedadeCor
    {
        public readonly PrefixoCor = EnumPrefixoCor.CorTexto;
        public readonly NomePropriedadeEstiloDom = EnumEstiloCor.CorTexto;

        public constructor()
        {
            super(AtributosHtml.CorTextoApresentacao, AtributosHtml.TonalidadeTextoApresentacao);
        }
    }
}
