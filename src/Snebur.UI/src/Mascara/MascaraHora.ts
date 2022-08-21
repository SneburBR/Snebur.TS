namespace Snebur.UI
{
    export class MascaraHora extends MascaraFormatacao
    {
        private static readonly MASCARA_HORA_ANTES_DAS_10: string = "#:##";

        protected override readonly IsCompletar = true;
        private readonly IsHorasDia: boolean

        private IsFormatacaoAntes10: boolean;

        public override get FormataMascara(): string
        {
            if (this.IsFormatacaoAntes10)
            {
                return MascaraHora.MASCARA_HORA_ANTES_DAS_10;
            }
            return FormatacaoUtil.FORMATACAO_HORA;
        }

        public constructor(controlePai: BaseControle, refElemento: HTMLElement, mascara: string)
        {
            super(controlePai, refElemento, mascara);
            this.IsHorasDia = this.RetornarValorAtributoBoolean(AtributosHtml.IsHorasDia, false);
        }

        protected override IsKeyCodeValido(keycode: number): boolean
        {
            return KeyCodeUtil.IsKeyCodeNumero(keycode) ||
                KeyCodeUtil.IsKeyCodeDoisPontos(keycode);
        }

        protected override MascaraPadrao(event: KeyboardEvent): void
        {
            const elemento = event.target as HTMLInputElement;
            const posicao = elemento.selectionStart;
            this.IsFormatacaoAntes10 = posicao === 1 && KeyCodeUtil.IsKeyCodeDoisPontos(event.keyCode);
            super.MascaraPadrao(event);
        }

        protected override RetornarValorFormatado(valorDom: string, isComplatar: boolean): string
        {
            valorDom = valorDom.trim();

            this.IsFormatacaoAntes10 = this.IsFormatacaoAntes10Interno(valorDom);
            const valorFormatadio = u.FormatacaoUtil.FormatarMascara(valorDom,
                this.FormataMascara,
                isComplatar);

            if (this.IsHorasDia && isComplatar)
            {
                const tempo = u.ConverterUtil.ParaTimeSpan(valorFormatadio);
                return u.FormatacaoUtil.FormatarHora(tempo, this.IsHorasDia);
            }

            return valorFormatadio;
            
        }

        private IsFormatacaoAntes10Interno(valorDom: string): boolean
        {
            const numeros = TextoUtil.RetornarSomenteNumeros(valorDom);

            if (valorDom.length > 2 && valorDom[2] === ":")
            {
                return false;
            }

            if (valorDom.length > 1 && valorDom[1] === ":" && numeros.length <=3)
            {
                return true;
            }

            if (!this.IsHorasDia)
            {
                return false;
            }

            const n1 = parseInt(numeros[0]);
            if (n1 === 0)
            {
                return false;
            } 
             
            if (n1 === 1 || n1 === 2)
            {
                if (numeros.length > 1)
                {
                    const n2 = parseInt(numeros[0]);
                    if (n1 === 1 &&n2 >= 6)
                    {
                        return false;
                    }
                }
                return numeros.length <= 3;
            }
            return true;
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