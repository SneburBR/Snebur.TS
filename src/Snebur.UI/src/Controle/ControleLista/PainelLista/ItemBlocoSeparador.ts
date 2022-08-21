namespace Snebur.UI
{
    export class ItemBlocoSeparador extends BaseItemTemplate 
    {

        public constructor(controlePai: BaseControle, template: BlocoTemplateSeparador)
        {
            super(controlePai, ElementoUtil.RetornarNovoIDElemento(controlePai, "separador"), template);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "AP-BLOCO";
        }

    }
}
