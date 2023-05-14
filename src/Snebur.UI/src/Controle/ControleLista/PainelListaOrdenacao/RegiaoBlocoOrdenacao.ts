namespace Snebur.UI
{
    export abstract class RegiaoBlocoOrdenacao
    {
        private _regiaoOrigem: DOMRect;
        public OrdenacaoDestino: number
        public readonly OrdenacaoOrigem: number;
        public readonly IndiceOrigem: number;
        public readonly ItemBlocoOrdenacao: ItemBlocoOrdenacao;

        public get NovaOrdenacao(): number
        {
            if (typeof this.OrdenacaoDestino === "number")
            {
                return this.OrdenacaoDestino;
            }
            return this.OrdenacaoOrigem;
        }

        public get RegiaoOrigem(): DOMRect
        {
            return this._regiaoOrigem;
            /*return this.ItemBlocoOrdenacao.Elemento.getBoundingClientRect();*/
        }

        public constructor(
            itemBlocoOrdenacao: ItemBlocoOrdenacao,
            indice: number)
        {
            this.IndiceOrigem = indice;
            this.ItemBlocoOrdenacao = itemBlocoOrdenacao;
            this.ItemBlocoOrdenacao.Elemento.classList.add(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            this.OrdenacaoOrigem = itemBlocoOrdenacao.ObjetoOrdenacao.Ordenacao;
            this._regiaoOrigem = itemBlocoOrdenacao.Elemento.getBoundingClientRect();
        }

        public abstract Inicializar(): void;
        public abstract SimuolarOrdenacao(regiaoDestino: DOMRect): void;

        public Dispose()
        {
            this.ItemBlocoOrdenacao.Elemento.classList.remove(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            /*eslint-disable*/
            let _this = this as any;
            delete _this.ItemBlocoOrdenacao;
            delete _this.RegiaoPainel;
            delete _this.RegiaoOrigem;
            /*eslint-enable*/
        }
    }

   
    
     
    export interface RegiaoBlocoPorcentagem
    {
        RegiaoBlocoOrdenacao: RegiaoBlocoOrdenacao;
        Porcentagem: number
    }
}
