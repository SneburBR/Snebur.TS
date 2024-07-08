namespace Snebur.UI
{
    export class CaixaPesquisa extends BaseControle
    {
        public IDElementoInput: string;
        private __ElementoInput_Focus: EventListener;
        private __ElementoInput_Blur: EventListener;

        private Metodo: EventoHandler<TextoPesquisaEventArgs>;
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.__ElementoInput_Focus = this.ElementoInput_Focus.bind(this);
            this.__ElementoInput_Blur = this.ElementoInput_Blur.bind(this);

            const nomeManipulador = this.RetornarValorAtributo(AtributosHtml.TextoPesquisa);

            if (!String.IsNullOrEmpty(nomeManipulador))
            {
                this.Metodo = this.RetornarMetodo(nomeManipulador) as EventoHandler<TextoPesquisaEventArgs>;
            }

            //let elementox = ElementoUtil.RetornarElemento(this.IDElementoInput);
            //this.Metodo(new TextoPesquisaEventArgs(this.Elemento, null, null, String.Empty));
            //this.Metodo(new TextoPesquisaEventArgs(this.Elemento, null, null, this.ElementoInput.Value));
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventosDom();
        }

        protected override  HtmlCarregado(): void
        {
            super.HtmlCarregado();

            //this.IDElementoInput = this.RetornarIDElementoItemElemento("ControleInput");
            //CssClassUtil.AdicionarCssClasse(this.IDElemento, "sn-pesquisa");
        }

        private AdicionarEventosDom(): void
        {
            this.ControleInput.AdicionarEventoDom("focus", this.__ElementoInput_Focus);
            this.ControleInput.AdicionarEventoDom("blur", this.__ElementoInput_Blur);
            //delete (elemento as any);
        }

        private RemoverEventosDom(): void
        {

            this.ControleInput.RemoverEventoDom("focus", this.__ElementoInput_Focus);
            this.ControleInput.RemoverEventoDom("blur", this.__ElementoInput_Blur);
            //delete (elemento as any);
        }

        private ElementoInput_Focus(): void
        {
            //CssClassUtil.AdicionarCssClasse(this.IDElementoInput, "is-focused");
        }

        private ElementoInput_Blur(): void
        {
            //EstiloUtil.RemoverCssClasse(this.IDElementoInput, "is-focused");
        }

        private async BtnPesquisar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.Metodo(this, new TextoPesquisaEventArgs(this.Elemento, null, null, this.ControleInput.Valor));
        }
       
        //#region IDisposable 

        public override  Dispose(): void
        {
            this.RemoverEventosDom();
            super.Dispose();
        }
        //#endregion
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaPesquisa
	{
		readonly ControleInput: ui.CaixaTexto;
		readonly BotaoPesquisa: ui.Botao;
	}

	//#endregion

}