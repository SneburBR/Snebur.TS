namespace Snebur.UI
{
    export class ComboBoxItemSelecionado extends BaseControle
    {
        private readonly BlocoBotaoFechar: ui.Bloco;

        private ElementoItemTemplate: HTMLElement;

        public get ComboBox(): ComboBox
        {
            return this.ControlePai as ComboBox;
        }

        public constructor(controlePai: ComboBox, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this._dataSource = null;
            this.IsAdicionarElementoConteudoApresentacao = false;
          
        }

        protected override RetornarHtmlInterno(atributos: DicionarioSimples): string
        {
            //var html = super.RetornarHtmlInterno();
            //return this.ComboBox.ItemTemplateSelecionado.Html;
            return super.RetornarHtmlInterno(atributos);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this.ElementoItemTemplate = this.RetornarItemElemento("ItemTemplate");
            this.ElementoItemTemplate.ElementoApresentacao.innerHTML = this.ComboBox.ItemTemplateSelecionado.Html;
        }

        public override Inicializar(): void
        {
            super.Inicializar();

            if (!this.ComboBox.IsPemitirLimpar)
            {
                this.BlocoBotaoFechar.OcultarElemento();
            }
        }

        public BtnFechar_Click(provedor: any, e: EventArgs): void
        {
            this.ComboBox.ItemSelecionado = null;
        }

        public override OcultarElemento(): void
        {
            this.Visibilidade = EnumVisibilidade.Invisivel;
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-combobox-item-selecionado";
        }

    }
}