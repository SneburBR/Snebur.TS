namespace Snebur.UI
{
    export class BlocoAnimado extends BasePainel
    {
        private static readonly CSS_CLASS_OCULTO = "sn-is-bloco-animado-oculto";

        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override InicializarPropriedadesApresentacao(): void
        {
            super.InicializarPropriedadesApresentacao();
            this.Elemento.classList.add(BlocoAnimado.CSS_CLASS_OCULTO);
        }

        public async EntrarAsync() 
        {
            this.Elemento.classList.remove(BlocoAnimado.CSS_CLASS_OCULTO);
            await ThreadUtil.EsperarAsync(190);
        }

        public async SairAsync()
        {
            if (!this.Elemento.classList.contains(BlocoAnimado.CSS_CLASS_OCULTO))
            {
                this.Elemento.classList.add(BlocoAnimado.CSS_CLASS_OCULTO);
            }
            await ThreadUtil.EsperarAsync(190);
        }

        public async ToogleAsyn()
        {
            if (this.Elemento.classList.contains(BlocoAnimado.CSS_CLASS_OCULTO))
            {
                this.Elemento.classList.remove(BlocoAnimado.CSS_CLASS_OCULTO);
            }
            else
            {
                this.Elemento.classList.add(BlocoAnimado.CSS_CLASS_OCULTO);
            }
            await ThreadUtil.EsperarAsync(190);
        }
    }
}
