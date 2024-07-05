namespace Snebur.UI
{
    export class ItemBlocoSelecao<IItem extends TipoItemLista = Snebur.SneburObject> extends ItemBloco 
    {
        public readonly TemplateSelecionado: BlocoTemplateSelecionado;
        private _isSelecionado: boolean = false;

        public get IsSelecionado(): boolean
        {
            return this._isSelecionado;
        }
        public set IsSelecionado(value: boolean)
        {
            /*eslint-disable*/
            if (this._isSelecionado != value)
            {
                this._isSelecionado = value;
                this.ReInicializar();
            }
            /*eslint-enable*/
        }

        public readonly EventoItemSelecionadoAlterado = new Evento<ItemEventArgs<IItem>>(this);

        public constructor(controlePai: PainelLista<any>,
            template: BlocoTemplate,
            templateSelecioando: BlocoTemplateSelecionado,
            itemReferencia: any,
            itemBlocoSeperador: ItemBlocoSeparador)
        {
            super(controlePai, template, itemReferencia, itemBlocoSeperador);
            this.TemplateSelecionado = templateSelecioando;
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this.Elemento.setAttribute("sn-click", "BtnSelecionarItem_Click");
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        public AtualizarSelecao(isSelecionado: boolean)
        {
            this.IsSelecionado = isSelecionado;
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-bloco-selecao";
        }

        public override NormalizarTemplate(template: BaseTemplate): BaseTemplate
        {
            if (this.IsSelecionado)
            {
                return this.TemplateSelecionado;
            }
            return template;
        }

        private BtnSelecionarItem_Click(provedor: any, e: UIEventArgs)
        {
            this.IsSelecionado = !this.IsSelecionado;
            this.EventoItemSelecionadoAlterado.Notificar(this, new ItemEventArgs(this.ItemReferencia));
        }

    }
}