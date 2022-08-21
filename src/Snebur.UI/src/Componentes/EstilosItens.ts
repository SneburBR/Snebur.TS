namespace Snebur.UI 
{
    export class EstilosItens extends ComponenteApresentacao   
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement | string, componenteApresentacaoPai: ComponenteApresentacao)
        public constructor(controlePai: BaseControle, elemento: HTMLElement | string | undefined, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }
    }
}