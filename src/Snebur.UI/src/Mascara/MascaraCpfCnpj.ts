namespace Snebur.UI
{
    export class MascaraCpfCnpj extends MascaraFormatacao
    {

        private IsCnpj: boolean = false;

        public override  get FormataMascara(): string
        {
            const valor = (this.Elemento as HTMLInputElement).value;
            if (this.IsCnpj || ValidacaoUtil.IsCnpj(valor))
            {
                return FormatacaoUtil.FORMATACAO_CNPJ;
            }
            return FormatacaoUtil.FORMATACAO_CPF;
        }

        public constructor(controlePai: BaseControle, refElemento: HTMLElement, mascara: string)
        {
            super(controlePai, refElemento, mascara);

        }

        protected override IsKeyCodeValido(keycode: number): boolean
        {
            return KeyCodeUtil.IsKeyCodeNumero(keycode) ||
                KeyCodeUtil.IsKeyCodeAbreParemtes(keycode) ||
                KeyCodeUtil.IsKeyCodeFechaParantes(keycode) ||
                KeyCodeUtil.IsKeyCodeTraco(keycode);
        }
        
        protected override MascaraPadrao(event: KeyboardEvent): void
        {
            const elemento = event.target as HTMLInputElement;
            const posicao = elemento.selectionStart;
            this.IsCnpj = posicao >= FormatacaoUtil.FORMATACAO_CPF.length;
            super.MascaraPadrao(event);
        }

        public override RetornarValorFormatado(valorDom: string, isCompletar:boolean): string
        {
            this.IsCnpj = this.RetornarIsCnpjInterno(valorDom);
            return super.RetornarValorFormatado(valorDom, isCompletar);
        }

        private RetornarIsCnpjInterno(valorDom: string): boolean
        {
            const totalNumeros = TextoUtil.RetornarSomenteNumeros(valorDom).length;
            return totalNumeros > 11;
        }
         
        // #region Métodos

        //#region IDisposable

        public override Dispose()
        {
            super.Dispose();
        }
        //#endregion
    }



}
