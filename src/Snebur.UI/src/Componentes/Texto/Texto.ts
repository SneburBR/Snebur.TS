namespace Snebur.UI
{
    export class Texto extends ComponenteApresentacaoRotulo
    {
        public get Texto(): string
        {
            return this.ElementoApresentacao.innerHTML;
        }
        public set Texto(texto: string)
        {
            this.ElementoApresentacao.innerHTML = texto;
            this.InicializarLegendaAsync();
        }
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento, componenteApresentacaoPai);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.InicializarLegendaAsync();
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return this.ElementoApresentacao;
        }
 
        public async InicializarLegendaAsync()
        {
            await ThreadUtil.QuebrarAsync();
            if (!this.IsDispensado)
            {
                if (this.Quebrar === EnumQuebrar.NaoQuebrar && String.IsNullOrEmpty(this.Legenda))
                {
                    const elemento = this.Elemento;
                    const elementoApresentacao = this.ElementoApresentacao;
                    if (elementoApresentacao instanceof HTMLElement &&
                        elementoApresentacao.offsetWidth < elementoApresentacao.scrollWidth ||
                        elementoApresentacao.clientWidth > elemento.clientWidth)
                    {
                        this.Legenda = this.Texto;
                    }
                }
            }
        }
    }
}
