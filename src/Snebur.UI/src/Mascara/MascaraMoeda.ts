namespace Snebur.UI
{
    export class MascaraMoeda extends BaseMascara
    {
        public get BaseCaixaTexto(): BaseCaixaTexto
        {
            return this.ControlePai as BaseCaixaTexto;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, formatoMascara: string)
        {
            super(controlePai, elemento, formatoMascara);

            if (!(controlePai instanceof BaseCaixaTexto))
            {
                throw new Erro("O controle pai não é suportado");
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarEventoDom(EnumEventoDom.Focus, this.Elemento_Focus);
            this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.Elemento_Keydown);
            this.AdicionarEventoDom(EnumEventoDom.Blur, this.Elemento_Blur);
        }

        //#region Métodos sobre escritos

        public override RetornarValorFormatado(valorDom: string): string
        {
            if (this.IsNaoFormatarValorVazio && String.IsNullOrWhiteSpace(valorDom))
            {
                return String.Empty;
            }
            return u.FormatacaoUtil.FormatarMoeda(ConverterUtil.ParaNumero(valorDom));
        }
        //#endregion

        //#region Eventos Dom


        private Elemento_Focus(e: FocusEvent): void
        {
            if (!this.BaseCaixaTexto.IsSomenteLeitura && !this.BaseCaixaTexto.IsDesabilitado)
            {
                const elemento = ElementoUtil.RetornarElemento(this.IDElemento) as HTMLInputElement;
                elemento.value = this.FormatarValorDomComFocus(elemento.value);
                elemento.select();
                e.preventDefault();
            }
        }

        private FormatarValorDomComFocus(value: string): string
        {
            if (this.IsNaoFormatarValorVazio && String.IsNullOrWhiteSpace(value))
            {
                return String.Empty;
            }
            return FormatacaoUtil.FormatarDecimal(value);
        }

        private Elemento_Keydown(e: KeyboardEvent): void
        {
            if (!this.IsKeyCodeValido(e.keyCode))
            {
                if (!this.TeclaPermitida(e.keyCode))
                {
                    event.preventDefault();
                }
            }
        }

        private Elemento_Blur(e: FocusEvent): void
        {
            const elemento = event.target as HTMLInputElement;
            elemento.value = this.RetornarValorFormatado(elemento.value);
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            super.Dispose();
        }
        //#endregion
    }

}
