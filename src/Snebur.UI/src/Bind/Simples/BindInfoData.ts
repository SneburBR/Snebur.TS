namespace Snebur.UI
{
    export class BindInfoData extends BaseBind
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindInfoData, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            this.Elemento.setAttribute(AtributosHtml.BindInfoData.Nome, novoValor?.toString() ?? "");
        }
    }
}
