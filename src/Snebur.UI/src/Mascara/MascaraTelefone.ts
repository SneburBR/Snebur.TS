namespace Snebur.UI
{
    export class MascaraTelefone extends MascaraFormatacao
    {
        private IsCelular: boolean = false;

        public override get FormataMascara(): string
        {
            const valor = (this.Elemento as HTMLInputElement).value;
            if (this.IsCelular || ValidacaoUtil.IsCelular(valor))
            {
                return FormatacaoUtil.FORMATACAO_CELULAR;
            }
            return FormatacaoUtil.FORMATACAO_TELEFONE;
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
            this.IsCelular = posicao >= FormatacaoUtil.FORMATACAO_TELEFONE.length;
            super.MascaraPadrao(event);
        }


        protected override RetornarValorFormatado(valorAtual: string, isCompletar:boolean): string
        {
            this.IsCelular = this.IsCelularInterno(valorAtual);
            return super.RetornarValorFormatado(valorAtual, isCompletar);
        }

        public IsCelularInterno(valorAtual: string): boolean
        {
            const totalNumeros = TextoUtil.RetornarSomenteNumeros(valorAtual);
            return totalNumeros.length >= 11;
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