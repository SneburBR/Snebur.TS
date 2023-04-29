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

    export class RegiaoBlocoOrdenacaoAnimado extends RegiaoBlocoOrdenacao
    {
        public readonly RegiaoPainel: DOMRect;
        private RegiaoDestino: DOMRect;
        private EstiloPosicaoInicial: Estilo;

        public constructor(
            itemBlocoOrdenacao: ItemBlocoOrdenacao,
            regiaoPainel: DOMRect,
            indice: number)
        {
            super(itemBlocoOrdenacao, indice);

            this.RegiaoPainel = regiaoPainel;
            this.RegiaoDestino = this.RegiaoOrigem;
        }

        public override Inicializar(): void
        {
            this.AtivarPosicaoAbosoluta();
        }

        private AtivarPosicaoAbosoluta(): void
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

        public override SimuolarOrdenacao(regiaoDestino: DOMRect): void
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

            const left = (regiaoDestino.left - this.RegiaoPainel.left).ToPixels();
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

        public override Dispose(): void
        {
            this.RemoverPosicaoAsoluta();
            super.Dispose();
        }
    }

    export interface RegiaoBlocoPorcentagem
    {
        RegiaoBlocoOrdenacao: RegiaoBlocoOrdenacao;
        Porcentagem: number
    }
}
