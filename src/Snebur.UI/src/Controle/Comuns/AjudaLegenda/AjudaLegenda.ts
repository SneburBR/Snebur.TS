
namespace Snebur.UI
{
    export class AjudaLegenda  extends Snebur.UI.BaseControle
    {
        public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, elemento: HTMLElement);
        public constructor(controlePai: BaseControle, idElemento: string);
        public constructor(controlePai: BaseControle, refElemento?: any)
        {
            super(controlePai, refElemento);
            this.CssClasseControle = "sn-icone";
            this.CssClasseControle = "sn-ajuda-legenda";
        }

        protected override  RetornarHtmlInterno(): string
        {
            return "help";
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.Elemento_Click);
        }
         
        private Elemento_Click(e: MouseEvent)
        {
            this.MostrarLegenda();
        }
        
    }
}