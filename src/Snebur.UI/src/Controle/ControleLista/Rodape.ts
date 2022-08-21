namespace Snebur.UI
{
    export class Rodape extends BaseControle
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            if (!(controlePai instanceof BaseControleLista))
            {
                throw new ErroNaoSuportado("O controle pai não é suportado", this);
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }
    }
}