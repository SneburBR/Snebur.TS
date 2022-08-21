namespace Snebur.UI
{
    export class ItensColecaoOrdenacao<TItem extends TipoItemLista = TipoItemLista, TItemControleOrdenacao extends ItemControleOrdenacao = ItemControleOrdenacao> extends ItensColecao<TItem, TItemControleOrdenacao>
    {
        public IsMovendoItemControle: boolean = false;
        public ElementosRomoverAnimacao = new List<HTMLElement>();

        public constructor(controlePai: BaseControle, idElemento: string, tagNovoElemento: string, cssClassElementoItensColecao: string)
        {
            super(controlePai, idElemento, tagNovoElemento, cssClassElementoItensColecao);
        }
    }
}
