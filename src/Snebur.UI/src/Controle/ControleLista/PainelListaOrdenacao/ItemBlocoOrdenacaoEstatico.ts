namespace Snebur.UI
{
    export class ItemBlocoOrdenacaoEstatico extends BaseItemBlocoOrdenacao
    {

        protected override SimularOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>)
        {
            const melhorBlocoCapturado = blocosCapturados.OrderByDescending(x => x.Porcentagem).First();
            const elementoDestino = this.Elemento.parentElement;

            if (elementoDestino !== this.PainelLista.ElementoApresentacao)
            {
                console.error("elemento destino errado");
            }

            const elementoReferencia = melhorBlocoCapturado.RegiaoBlocoOrdenacao.ItemBlocoOrdenacao.Elemento;
            elementoDestino.insertBefore(
                this.Elemento,
                elementoReferencia.nextElementSibling);
        }
    }
}
