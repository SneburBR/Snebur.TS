namespace Snebur.UI
{
    export class ItemBlocoOrdenacaoAnimado extends ItemBlocoOrdenacao 
    {
        protected override RetornarRegiaoBloco(itemBloco: ItemBlocoOrdenacao, regiaoPainel: DOMRect, indice: number)
        {
            return new RegiaoBlocoOrdenacaoAnimado(itemBloco, regiaoPainel, indice);
        }

        protected override SimularOrdenacao(
            blocosCapturados: List<RegiaoBlocoPorcentagem>,
            regiaoElementoClone: DOMRect)
        {
            /*this.RegiaoBlocoAtual.OrdenacaoDestino = this.RetornarNovaOrdenacao(blocosCapturados);*/

            const regioesOrdenadas = this.RegioesBlocoOrdenacao.OrderBy(x => x.NovaOrdenacao);
            for (const [regiaoOrdenada, indice] of regioesOrdenadas.ToTupleItemIndex())
            {
                const regiaoDestino = this.RegioesBlocoOrdenacao[indice].RegiaoOrigem;
                regiaoOrdenada.SimuolarOrdenacao(regiaoDestino);
            }
        }
    }
}
