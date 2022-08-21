
namespace Snebur.UI
{
    export class ItemControleOrdenacaoAlteradoEventArgs extends EventArgs
    {
        public readonly ItemControle: ItemControleOrdenacao;
        public readonly Entidade: d.IOrdenacao;
        //public readonly Ordenacao: number;

        public constructor(itemControle: ItemControleOrdenacao, entidade: d.IOrdenacao)
        {
            super();
            this.ItemControle = itemControle;
            this.Entidade = entidade;
            //this.MouseEvent = mouseEvent;
        }
    }
}