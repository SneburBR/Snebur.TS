
namespace Snebur.UI
{
    export class ItemControleMovendoEventArgs  extends EventArgs
    {
        public readonly ItemControle: ItemControleOrdenacao;
        public readonly MouseEvent: MouseEvent;

        public constructor(itemControle: ItemControleOrdenacao, mouseEvent: MouseEvent)
        {
            super();
            this.ItemControle = itemControle;
            this.MouseEvent = mouseEvent;
        }


    }
}