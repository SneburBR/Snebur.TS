namespace Snebur.UI
{
    export class CaixaSenha extends BaseCaixaTexto<string>
    {
        private IsSenhaMd5: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.Elemento.style.cursor
        }

        protected override Inicializar()
        {
            super.Inicializar();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

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

        private BtnMostrarSenhaAlternancia_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            const elementoInput = this.ElementoInput;
            if (elementoInput != null)
            {
                if (elementoInput.type === "password")
                {
                    this.Icone.Icone = EnumIcone.VisibilityOff;
                    elementoInput.type = "text";
                }
                else
                {
                    this.Icone.Icone = EnumIcone.Visibility;
                    elementoInput.type = "password";
                }
            }
        }
    }
     
	//#region Elementos da apresenta��o - c�digo gerado automaticamente #

	export interface CaixaSenha
	{
		readonly Icone: ui.Icone;
	}

	//#endregion

}