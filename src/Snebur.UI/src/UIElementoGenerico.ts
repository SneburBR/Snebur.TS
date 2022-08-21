namespace Snebur.UI
{
    export class ControleGerenerico extends BaseControle
    {
        //public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, refElemento: HTMLElement);
        public constructor(controlePai: BaseControle, refElemento: string);
        public constructor(controlePai: BaseControle, refElemento: any)
        {
            super(controlePai, refElemento);
            //this.CarregarHtmlElemento();
            //this.HtmlCarregado();
        }

        public AtribuirDataSourceSemPropagar(value: any): void
        {
            this._dataSource = value;
        }

        public PropagarDataSource(): void
        {
            this.DataSource = this._dataSource;
        }
    }
}