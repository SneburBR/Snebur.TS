namespace Snebur.UI
{
    export class ItemBlocoOrdenacaoEstatico extends ItemBlocoOrdenacao
    {
        protected override RetornarRegiaoBloco(
            itemBloco: ItemBlocoOrdenacao,
            regiaoPainel: DOMRect,
            indice: number)
        {
            return new RegiaoBlocoOrdenacaoEstatico(itemBloco, indice);
        }

        protected override SimularOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>)
        {
            this.RegiaoBlocoAtual.OrdenacaoDestino = this.RetornarNovaOrdenacao(blocosCapturados);
            const isIserirAntes = this.RegiaoBlocoAtual.OrdenacaoDestino <= this.ObjetoOrdenacao.Ordenacao;

            console.warn(`Atual: ${this.ObjetoOrdenacao.Ordenacao} -- Destino : ${this.RegiaoBlocoAtual.OrdenacaoDestino}, Antes ${isIserirAntes}`);

            const melhorBlocoCapturado = blocosCapturados.OrderByDescending(x => x.Porcentagem).First();
            const elementoDestino = this.Elemento.parentElement;

            if (elementoDestino !== this.PainelLista.ElementoApresentacao)
            {
                console.error("elemento destino inválido");
            }

            const elementoCapturado = melhorBlocoCapturado.RegiaoBlocoOrdenacao.ItemBlocoOrdenacao.Elemento;
            const elementoReferencia = this.RetornarElementoReferencia(elementoCapturado);
            if (elementoReferencia != null)
            {
                const label = elementoReferencia.querySelector(".foto-album-lamina-encadernacao-descricao-formatada");
                console.warn(`Label ${label?.textContent ?? "null"}`);
                elementoDestino.insertBefore(
                    this.Elemento,
                    elementoReferencia);
            }
            else
            {
                elementoDestino.appendChild(this.Elemento);
            }
 
        }

        private RetornarElementoReferencia(elementoCapturado: HTMLElement): HTMLElement
        {
            if (this.Elemento === elementoCapturado)
            {
                return this.NextElementSibling;
            }
          
            const isIserirAntes = this.RegiaoBlocoAtual.OrdenacaoDestino <= this.ObjetoOrdenacao.Ordenacao;
            return isIserirAntes ? elementoCapturado : elementoCapturado.nextElementSibling as HTMLElement;
        }
    }
}
