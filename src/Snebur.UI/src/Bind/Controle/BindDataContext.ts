namespace Snebur.UI
{
    export class BindDataSource extends BindControle
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindDataSource, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            this.Controle.DataSource = novoValor;
        }
    }
}