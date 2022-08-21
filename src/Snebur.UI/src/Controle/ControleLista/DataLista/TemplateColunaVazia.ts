namespace Snebur.UI
{
    export class TemplateColunaVazia extends TemplateColuna
    {
        public override  get Html(): string
        {
            return " VAZIO";
        }

        public constructor(controlePai: BaseControle)
        {
            super(controlePai, document.createElement("div"));
        }

        protected override Inicializar()
        {
            super.Inicializar();
            const pai = this.Elemento.parentElement;
            pai.removeChild(this.Elemento);
        }
    }
}

