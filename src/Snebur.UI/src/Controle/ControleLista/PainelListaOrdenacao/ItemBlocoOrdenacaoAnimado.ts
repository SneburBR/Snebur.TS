namespace Snebur.UI
{

    export class ItemBlocoOrdenacaoAnimado extends BaseItemBlocoOrdenacao
    {
        protected override SimularOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>)
        {
            this.RegiaoBlocoAtual.OrdenacaoDestino = this.RetornarNovaOrdenacao(blocosCapturados);

            const regioesOrdenadas = this.RegioesBlocoOrdenacao.OrderBy(x => x.NovaOrdenacao);
            for (const [regiaoOrdenada, indice] of regioesOrdenadas.ToTupleItemIndex())
            {
                const regiaoDestino = this.RegioesBlocoOrdenacao[indice].RegiaoOrigem;
                regiaoOrdenada.SimuolarOrdenacao(regiaoDestino);
            }

        }

        private RetornarNovaOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            if (blocosCapturados.Count > 0 && blocosCapturados.Sum(x => x.Porcentagem) > 50)
            {
                if (this.PainelLista.SentidoOrdenacao === EnumSentidoOrdenacao.Crescente)
                {
                    return this.RetornarNovaOrdenacaoCrescente(blocosCapturados);
                }
                else
                {
                    return this.RetornarNovaOrdenacaoDecrescente(blocosCapturados);
                }
            }
            return this.ObjetoOrdenacao.Ordenacao;
        }

        private RetornarNovaOrdenacaoCrescente(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            blocosCapturados = blocosCapturados.OrderByDescending(x => x.Porcentagem);
            const regiaoBlocoCapturado = blocosCapturados.First().RegiaoBlocoOrdenacao;

            /*eslint-disable*/
            if (regiaoBlocoCapturado.ItemBlocoOrdenacao == this)
            {
                return this.ObjetoOrdenacao.Ordenacao;
            }
            /*eslint-enable*/
            if (regiaoBlocoCapturado.OrdenacaoOrigem >= this.ObjetoOrdenacao.Ordenacao)
            {
                // ultimo posição
                if (regiaoBlocoCapturado.IndiceOrigem === this.RegioesBlocoOrdenacao.length - 1)
                {
                    return regiaoBlocoCapturado.OrdenacaoOrigem + this.PainelLista.Passo;
                }

                const proximaOrdenacao = this.RegioesBlocoOrdenacao[regiaoBlocoCapturado.IndiceOrigem + 1].OrdenacaoOrigem;
                const novaOrdenacaoProxima = regiaoBlocoCapturado.OrdenacaoOrigem + ((proximaOrdenacao - regiaoBlocoCapturado.OrdenacaoOrigem) / 2);
                return novaOrdenacaoProxima;
            }
            else
            {
                //primeiro
                if (regiaoBlocoCapturado.IndiceOrigem === 0)
                {
                    return regiaoBlocoCapturado.OrdenacaoOrigem - this.PainelLista.Passo;
                }
                const ordenacaoAnterior = this.RegioesBlocoOrdenacao[regiaoBlocoCapturado.IndiceOrigem - 1].OrdenacaoOrigem;
                const novaOrdenacaoAnterior = regiaoBlocoCapturado.OrdenacaoOrigem - ((regiaoBlocoCapturado.OrdenacaoOrigem - ordenacaoAnterior) / 2);
                return novaOrdenacaoAnterior;
            }
        }

        private RetornarNovaOrdenacaoDecrescente(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            throw new Error("Method not implemented.");
        }


    }

   
}
