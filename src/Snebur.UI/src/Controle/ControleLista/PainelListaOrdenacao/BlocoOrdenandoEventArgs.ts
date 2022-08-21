
namespace Snebur.UI
{
    export class BlocoOrdenandoEventArgs<TItemBloco extends ItemBlocoOrdenacao = ItemBlocoOrdenacao> extends EventArgs
    {
        public readonly Bloco: TItemBloco;
        //public readonly EventoNativo: MouseEvent | TouchEvent;

        public constructor(bloco: TItemBloco )
        {
            super();
            this.Bloco = bloco;
            //this.EventoNativo = eventoNativo;
        }
    }

    export class BlocoOrdenacaoAlteradoEventArgs<TItemBloco extends ItemBlocoOrdenacao = ItemBlocoOrdenacao> extends EventArgs
    {
        public readonly Bloco: TItemBloco;
        public readonly Referencia: d.IOrdenacao;
        //public readonly Ordenacao: number;

        public constructor(bloco: TItemBloco, referencia: d.IOrdenacao)
        {
            super();

            this.Bloco = bloco;
            this.Referencia = referencia;
            //this.MouseEvent = mouseEvent;
        }
    }
}