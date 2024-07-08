
namespace Snebur.UI
{
    export class BotaoMenuItem extends ControleRotulo
    {
        public get BotaoMenu(): BotaoMenu
        {
            return this.ControlePai as BotaoMenu  ;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            if (!(controlePai instanceof BotaoMenu))
            {
                throw new ErroNaoSuportado("O controle pai não é suportado", this);
            }
            this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.Elemento_Click);
        }

        public override  HtmlCarregado(): void
        {
            super.HtmlCarregado();
            CssClassUtil.AdicionarCssClasse(this.Elemento, "sn-botao-menu-item");
        }

        private Elemento_Click(e: MouseEvent)
        {
            this.BotaoMenu.Fechar(true);
        }

        protected override RetornarElementoRotulo(): HTMLElement
        {
            return this.ElementoApresentacao;
        }
    }
}