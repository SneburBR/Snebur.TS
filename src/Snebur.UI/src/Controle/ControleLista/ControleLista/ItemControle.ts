namespace Snebur.UI
{
    export class ItemControle extends BaseItemTemplate
    {
        public ItemReferencia: any;

        public ItemSeparador: ItemSeparador;

        public constructor(controlePai: BaseControle, template: ItemTemplate, itemReferencia: any)
        {
            super(controlePai, ElementoUtil.RetornarNovoIDElemento(controlePai, "item-controle"), template);
            this.ItemReferencia = itemReferencia;
            this.CssClasseControle = "sn-item-controle";
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.IsAdicionarElementoConteudoApresentacao = false;
        }


        public override get DataSource(): any
        {
            return this.ItemReferencia;
            // return this._dataSource;
        }

        public override set DataSource(value: any)
        {
            this.DefinirDataSource(value);
        }


        protected override RetornarTagNovoElemento(): string
        {
            if (!String.IsNullOrWhiteSpace(this.Template.TagElemento))
            {
                return this.Template.TagElemento;
            }
            return "sn-item-controle";
        }
    }
}
