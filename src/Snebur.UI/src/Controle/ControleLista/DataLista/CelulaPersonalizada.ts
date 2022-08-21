namespace Snebur.UI
{
    export class CelulaPersonalizada extends Celula
    {
        public get TemplateColunaPersonalizada(): TemplateColunaPersonalizada
        {
            return (this.Template as TemplateColunaPersonalizada);
        }

        public constructor(controlePai: BaseControle, idElemento: string, coluna: Coluna, template: TemplateColunaPersonalizada)
        {
            super(controlePai, idElemento, coluna, template);
        }
    }
}