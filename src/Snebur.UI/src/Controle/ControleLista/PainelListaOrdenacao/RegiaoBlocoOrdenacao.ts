namespace Snebur.UI
{
    export class RegiaoBlocoOrdenacao
    {
        

        private _ordenacaoDestino: number | null;

        public readonly IndiceOrigem: number;
        public readonly ItemBlocoOrdenacao: ItemBlocoOrdenacao;

        public readonly RegiaoPainel: DOMRect;
        public readonly RegiaoOrigem: DOMRect;

        public readonly OrdenacaoOrigem: number;

        private RegiaoDestino: DOMRect;
        private EstiloPosicaoInicial: Estilo;

        public OrdenacaoDestino: number

        public get NovaOrdenacao(): number
        {
            if (typeof this.OrdenacaoDestino === "number")
            {
                return this.OrdenacaoDestino;
            }
            return this.OrdenacaoOrigem;
        }

        public constructor(regiaoPainel: DOMRect,
            itemBlocoOrdenacao: ItemBlocoOrdenacao,
            indice: number)
        {
            this.IndiceOrigem = indice;
            this.ItemBlocoOrdenacao = itemBlocoOrdenacao;
            this.RegiaoPainel = regiaoPainel;
            this.RegiaoOrigem = itemBlocoOrdenacao.Elemento.getBoundingClientRect();
            this.RegiaoDestino = this.RegiaoOrigem;

            this.ItemBlocoOrdenacao.Elemento.classList.add(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            this.OrdenacaoOrigem = itemBlocoOrdenacao.ObjetoOrdenacao.Ordenacao;
        }

        public AtivarPosicaoAbosoluta(): void
        {
            const elemento = this.ItemBlocoOrdenacao.Elemento;

            this.EstiloPosicaoInicial = new Estilo({
                position: elemento.style.position,
                left: elemento.style.left,
                top: elemento.style.top,
                right: elemento.style.right,
                bottom: elemento.style.bottom,
                width: elemento.style.width,
                height: elemento.style.height
            });

            this.AtualizarPosicaoDestino();
        }

        private RemoverPosicaoAsoluta(): void
        {
            this.EstiloPosicaoInicial?.AplicarEm(this.ItemBlocoOrdenacao.Elemento);
            delete this.EstiloPosicaoInicial;
        }

        public AtualizarPosicao(regiaoDestino: DOMRect): void
        {
            if (!MedidaUtil.IsRegiaoDomIgual(this.RegiaoDestino, regiaoDestino))
            {
                this.RegiaoDestino = regiaoDestino;
                this.AtualizarPosicaoDestino();
            }
        }

        private AtualizarPosicaoDestino(): void
        {
            const regiaoDestino = this.RegiaoDestino;
            const elemento = this.ItemBlocoOrdenacao.Elemento;

            const left = (regiaoDestino.left - this.RegiaoPainel.left ).ToPixels();
            const top = (regiaoDestino.top - this.RegiaoPainel.top).ToPixels();

            const width = regiaoDestino.width.ToPixels();
            const height = regiaoDestino.height.ToPixels();

            console.log(`Left ${left} - Top ${top} `);

            const estilo = new Estilo({
                position: "absolute",
                left: left,
                top: top,
                width: width,
                height: height,
            });
            estilo.AplicarEm(elemento);
        }

        public  Dispose(): void
        {
            this.RemoverPosicaoAsoluta();
            this.ItemBlocoOrdenacao.Elemento.classList.remove(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);

            /*eslint-disable*/
            let _this = this as any;
            delete _this.Bloco;
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
