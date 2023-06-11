namespace Snebur.UI
{
    export class PropriedadeCorFundo extends BasePropriedadeCor
    {
        public readonly PrefixoCor = EnumPrefixoCor.CorFundo;
        public readonly NomePropriedadeEstiloDom = EnumEstiloCor.CorFundo;

        public constructor()
        {
            super(AtributosHtml.CorFundoApresentacao, AtributosHtml.TonalidadeFundoApresentacao);
        }
    }

    //export class PropriedadeCorFundoDebug extends BasePropriedadeCor
    //{
    //    public readonly PrefixoCor = EnumPrefixoCor.CorFundo;
    //    public readonly NomePropriedadeEstiloDom = EnumEstiloCor.CorFundo;

    //    public constructor()
    //    {
    //        super(AtributosHtml.CorFundoDebugApresentacao, AtributosHtml.TonalidadeFundoApresentacao);
    //    }
    //}
}
