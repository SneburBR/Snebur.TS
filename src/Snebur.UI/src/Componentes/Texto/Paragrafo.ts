namespace Snebur.UI
{
    export class Paragrafo extends ComponenteApresentacaoRotulo
    {
        public get Texto(): string
        {
            return this.ElementoApresentacao.innerHTML;
        }
        public set Texto(texto: string)
        {
            this.ElementoApresentacao.innerHTML = texto;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.ElementoApresentacao;
        }
    }
}
