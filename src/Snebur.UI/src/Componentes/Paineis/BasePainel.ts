namespace Snebur.UI
{
    export abstract class BasePainel extends ComponenteApresentacaoConteudo
    {
        private static readonly NOME_CSS_CLASSE_PONTILHAR = "debug-pontilhar-areas";

        private ElementoDebugNomeTextoFundo: HTMLElement;

        public get IsPontilharAreas(): boolean
        {
            return this.ControleApresentacao.IsPontilharAreas;
        }

        //#region Propriedade de apresentação
         
        //#endregion
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected InicializarDebug(): void
        {
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                this.PontilhasAreas();
                this.NomeComoTextoFundo();
            }
        }

        private RetornarEstiloDisplayElementoApresentacao(): string
        {
            const retorno = window.getComputedStyle(this.Elemento, null).getPropertyValue("display");
            if (!String.IsNullOrEmpty(retorno))
            {
                return retorno;
            }
            return "block";
        }

        private PontilhasAreas(): void
        {
            const elemento = this.Elemento;
            if (this.IsPontilharAreas)
            {
                elemento.classList.add(BasePainel.NOME_CSS_CLASSE_PONTILHAR);
            }
            else
            {
                elemento.classList.remove(BasePainel.NOME_CSS_CLASSE_PONTILHAR);
            }
        }

        protected override NomeAlterado(): void
        {
            // this.NomeComoTextoFundo();
        }

        private NomeComoTextoFundo(): void
        {
            if (this.IsPontilharAreas)
            {
                if (!String.IsNullOrWhiteSpace(this.Nome))
                {
                    this.AdicionarElementoNomTextoFundo();
                }
            }
            else
            {
                this.RemoverElementoNomeTextoFundo();
            }
        }

        private AdicionarElementoNomTextoFundo(): void
        {
            this.RemoverElementoNomeTextoFundo();
            const nome = this.Nome;
            if (!String.IsNullOrWhiteSpace(nome))
            {
                this.ElementoDebugNomeTextoFundo = document.createElement("debug-nome-como-texto-fundo");

                const elementoNomeTexto = document.createElement("nome-texto");
                elementoNomeTexto.innerHTML = nome;
                this.ElementoDebugNomeTextoFundo.appendChild(elementoNomeTexto);
                this.Elemento.appendChild(this.ElementoDebugNomeTextoFundo);
                //EstiloUtil. (this.ElementoDebugNomeTextoFundo, elementoNomeTexto, 20);
            }
        }

        private RemoverElementoNomeTextoFundo(): void
        {
            if (this.ElementoDebugNomeTextoFundo)
            {
                if (this.ElementoDebugNomeTextoFundo instanceof HTMLElement)
                {
                    this.ElementoDebugNomeTextoFundo.remove();
                    //this.Elemento.removeChild(this.ElementoDebugNomeTextoFundo);
                    //this.ElementoDebugNomeTextoFundo.remove();
                    delete this.ElementoDebugNomeTextoFundo;
                }
            }
        }

        public override Dispose(): void
        {
            this.RemoverElementoNomeTextoFundo();
            super.Dispose();
        }
    }
}
