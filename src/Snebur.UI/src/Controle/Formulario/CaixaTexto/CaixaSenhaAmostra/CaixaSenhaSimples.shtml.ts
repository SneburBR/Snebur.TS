namespace Snebur.UI
{
    export class CaixaSenhaSimples extends BaseCaixaTexto<string>
    {
        private IsSenhaMd5: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar()
        {
            super.Inicializar();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this.IsSenhaMd5 = this.RetornarValorAtributoBoolean(AtributosHtml.IsSenhaMd5, true);
            if (this.IsSenhaMd5)
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindSenha, this.CaminhoBind);
            }
            else
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            }
                
        }
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaSenhaSimples
	{
	}

	//#endregion

}