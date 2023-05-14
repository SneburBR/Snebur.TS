namespace Snebur.UI
{
    export class RegiaoBlocoOrdenacaoEstatico extends RegiaoBlocoOrdenacao
    {
        //public override get RegiaoOrigem(): DOMRect
        //{
        //    return this.ItemBlocoOrdenacao.Elemento.getBoundingClientRect();
        //}
         
        public Inicializar(): void 
        {
            
        }

        public SimuolarOrdenacao(regiaoDestino: DOMRect): void 
        {
            throw new Error("Method not implemented.");
        }

    }
}
