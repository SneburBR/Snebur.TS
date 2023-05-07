namespace Snebur.UI
{
    export class ItemBloco  extends BaseItemTemplate
    {
        public readonly ItemReferencia: any;
        public readonly ItemBlocoSeperador: ItemBlocoSeparador;

        private IsPainelListaOrdenacao: boolean;

        public get IsMarcarItem():boolean
        {
            return this.PainelLista.IsMarcarItem;
        }

        public get PainelLista(): PainelLista<any> 
        {
            return this.ControlePai as PainelLista<any>;
        }

        public constructor(controlePai: PainelLista<any>, template: BlocoTemplate, itemReferencia: any, itemBlocoSeperador :ItemBlocoSeparador)
        {
            super(controlePai, ElementoUtil.RetornarNovoIDElemento(controlePai, "sn-bloco"), template);

            this.ItemReferencia = itemReferencia;
            this.ItemBlocoSeperador = itemBlocoSeperador;
            this.IsAdicionarElementoConteudoApresentacao = true;
            this.IsPainelListaOrdenacao = controlePai instanceof PainelListaOrdenacao;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
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

        //#region Marcar e desmarcar linha

        private static readonly CSS_CLASS_MARCAR_CONTEUDO = "sn-marcar-conteudo";

        public MarcarConteudo()
        {
            this.Elemento.classList.add(ItemBloco.CSS_CLASS_MARCAR_CONTEUDO);
        }

        public DesmacarConteudo()
        {
            this.Elemento.classList.remove(ItemBloco.CSS_CLASS_MARCAR_CONTEUDO);
        }

        //#endregion

        protected override RetornarTagNovoElemento(): string
        {
            if (this.IsPainelListaOrdenacao)
            {
                return "AP-BLOCO-ORDENACAO";
            }
            return "AP-BLOCO";
        }

        public override Dispose(): void
        {
            if (!this.IsDispensado)
            {
                this.ItemBlocoSeperador?.Dispose();
                super.Dispose();
            }
        }
    }
}
