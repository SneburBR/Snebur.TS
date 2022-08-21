namespace Snebur.UI
{
    export class BindCorFundo extends BaseBindCor
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.CorFundo, valorAtributo);
        }

        protected RetornarPrefixoCor(): EnumPrefixoCor
        {
            return EnumPrefixoCor.CorFundo;
        }
    }
}
