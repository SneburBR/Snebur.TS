
namespace Snebur.UI
{
    export class BlocoOrdenacaoEventArgs<TItemBloco extends ItemBlocoOrdenacao = ItemBlocoOrdenacao> extends EventArgs
    {
        public readonly Bloco: TItemBloco;
        public readonly Referencia: d.IOrdenacao;
        public readonly ElementoClonedo: HTMLElement;
        public readonly EventoNativo: MouseEvent | TouchEvent;

        public constructor(bloco: TItemBloco,
            referencia: d.IOrdenacao,
            elementoClonado: HTMLElement,
            eventoNativo: MouseEvent | TouchEvent)
        {
            super();

            this.Bloco = bloco;
            this.Referencia = referencia;
            this.ElementoClonedo = elementoClonado;
            this.EventoNativo = eventoNativo;
        }
    }
    export class BlocoOdernacaoMovimentandoEventArgs<TItemBloco extends ItemBlocoOrdenacao = ItemBlocoOrdenacao> extends BlocoOrdenacaoEventArgs<TItemBloco>
    {
        public readonly RegioesBlocosCapturados: List<RegiaoBlocoPorcentagem>

        public get BlocoCaputuradoOrdenacao(): ItemBlocoOrdenacao
        {
            if (this.RegioesBlocosCapturados?.Count > 0)
            {
                const blocoCapturado = this.RegioesBlocosCapturados.MaxObjeto(x => x.Porcentagem).RegiaoBlocoOrdenacao.ItemBlocoOrdenacao;
                if (blocoCapturado !== this.Bloco)
                {
                    return blocoCapturado;
                }
            }
            return null;
       }

        public constructor(bloco: TItemBloco,
            referencia: d.IOrdenacao,
            elementoClonado: HTMLElement,
            eventoNativo: MouseEvent | TouchEvent,
            regiosBlocosCapturados: List<RegiaoBlocoPorcentagem>     )
        {
            super(bloco, referencia, elementoClonado, eventoNativo);

            this.RegioesBlocosCapturados = regiosBlocosCapturados;
        }
    }
    //export class BlocoOrdenacaoAlteradoEventArgs<TItemBloco extends ItemBlocoOrdenacao = ItemBlocoOrdenacao> extends EventArgs
    //{
    //    public readonly Bloco: TItemBloco;
    //    public readonly Referencia: d.IOrdenacao;
    //    public readonly ElementoClonedo: HTMLElement;
    //    public readonly EventoNativo: MouseEvent | TouchEvent;

    //    public constructor(bloco: TItemBloco,
    //        referencia: d.IOrdenacao,
    //        elementoClonado: HTMLElement,
    //        eventoNativo: MouseEvent | TouchEvent)
    //    {
    //        super();

    //        this.Bloco = bloco;
    //        this.Referencia = referencia;
    //        this.ElementoClonedo = elementoClonado;
    //        this.EventoNativo = eventoNativo;
    //        //this.MouseEvent = mouseEvent;
    //    }
    //}
}