namespace Snebur.UI
{
    export class MenuItem extends BaseMenu
    {
        public get MenuPai(): Menu
        {
            return this.RetornarControlePai(Menu);
        }
        
        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-menu-item";
            this.AdicionarEventoDom(EnumEventoDom.Click, this.ElementoConteudo_Click, this.ElementoConteudo);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            ElementoUtil.OcultarElemento(this.ElementoIconeSeta);
        }

        private ElementoConteudo_Click(e: MouseEvent): void
        {
            this.MenuPai.SelecionarMenuIntem(this);

        }

        protected override RetornarClassCssSelecionar(): string
        {
            return BaseMenu.CSS_CLASS_SELECIONADO; /*+ "-teste-ideraldo";*/
        }

    }
}