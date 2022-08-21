namespace Snebur.UI
{
    export class ItemSeparador extends BaseItemTemplate
    {

        public constructor(controlePai: BaseControle, template: SeparadorTemplate)
        {
            super(controlePai, ElementoUtil.RetornarNovoIDElemento(controlePai, "separador"), template);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }
    }
}