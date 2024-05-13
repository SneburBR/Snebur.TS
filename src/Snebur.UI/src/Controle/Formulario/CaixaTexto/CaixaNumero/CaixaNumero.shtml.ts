namespace Snebur.UI
{

    export class CaixaNumero extends BaseCaixaNumero
    {
        public override readonly PASSAO_PADRAO: number = BindNumero.PASSO_PADRAO;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
           
        }
    }
}