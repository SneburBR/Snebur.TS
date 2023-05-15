namespace Snebur.UI
{
    export class RegiaoBlocoOrdenacaoEstatico extends RegiaoBlocoOrdenacao
    {
        //public override get RegiaoOrigem(): DOMRect
        //{
        //    return this.ItemBlocoOrdenacao.Elemento.getBoundingClientRect();
        //}

        public override AtualizarRegiaoOrigem(): void
        {
            if (this.ItemBlocoOrdenacao.Elemento.parentElement != null)
            {
                this._regiaoOrigem = this.ItemBlocoOrdenacao.Elemento.getBoundingClientRect();
            }
            else
            {
                const xx = "";
            }
        }

        public Inicializar(): void 
        {
            
        }

        public SimuolarOrdenacao(regiaoDestino: DOMRect): void 
        {
            throw new Error("Method not implemented.");
        }

    }
}
