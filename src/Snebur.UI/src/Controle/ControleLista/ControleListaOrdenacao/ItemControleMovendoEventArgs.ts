
namespace Snebur.UI
{
    export class ItemControleMovendoEventArgs  extends EventArgs
    {
        public readonly ItemControle: ItemControleOrdenacao;
        public readonly ElementoClonado: HTMLElement;
        public readonly MouseEvent: MouseEvent;

        public constructor(
            itemControle: ItemControleOrdenacao,
            elementoClonado: HTMLElement,
            mouseEvent: MouseEvent)
        {
            super();
            this.ItemControle = itemControle;
            this.MouseEvent = mouseEvent;
            this.ElementoClonado = elementoClonado;
        }
    }
}