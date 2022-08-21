namespace Snebur.UI
{
    export class CelulaVazia extends Celula
    {
        public get TemplateColunaVazia(): TemplateColunaVazia
        {
            return (this.Template as TemplateColunaVazia);
        }

        public constructor(controlePai: BaseControle, idElemento: string, coluna: Coluna,template: TemplateColunaVazia)
        {
            super(controlePai, idElemento, coluna, template);
        }
    }
}