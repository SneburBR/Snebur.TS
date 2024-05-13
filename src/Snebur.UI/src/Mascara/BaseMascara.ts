namespace Snebur.UI
{

    export abstract class BaseMascara extends BaseUIElemento
    {
        protected _formataMascara: string;

        protected readonly IsCompletar: boolean = false;
        protected IsNaoFormatarValorVazio: boolean;

        public get ElementoTipado(): HTMLInputElement
        {
            return this.Elemento as HTMLInputElement;
        }

        public readonly EventoValorMascaraAlterado = new Evento<MascaraAlteradaEventArgs>(this);

        public get FormataMascara(): string
        {
            return this._formataMascara;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, formatoMascara: string)
        {
            super(controlePai, elemento);

            this._formataMascara = formatoMascara;

            if (!(this.Elemento instanceof HTMLInputElement))
            {
                throw new ErroNaoSuportado("O elemento não é suportado pela mascara", this);
            }
        }

        public InicializarMascara(): void
        {
            this.Inicializar();
            this.IsNaoFormatarValorVazio = this.RetornarValorAtributoBoolean(AtributosHtml.IsNaoFormatarValorVazio, false);
        }
        // #region Formatar Valor

        public AtualizarValorFormatado(event: UIEvent, isCompletar: boolean): void
        {
            const elemento = this.ElementoTipado;
            if (elemento instanceof HTMLInputElement)
            {
                const valorDom = elemento.value;
                const mascaraFormatada = this.RetornarValorFormatado(valorDom, isCompletar);

                if (valorDom !== mascaraFormatada)
                {
                    elemento.value = mascaraFormatada;
                }
                this.NotificarValorFormatadoAlterado(event, mascaraFormatada);
            }
        }

        protected RetornarValorFormatado(valorDom: string, isCompletar:boolean): string
        {
            if (this.IsNaoFormatarValorVazio &&  String.IsNullOrWhiteSpace(valorDom))
            {
                return String.Empty;
            }
            return u.FormatacaoUtil.FormatarMascara(valorDom, this.FormataMascara,isCompletar);
        }
        // #endregion

        // #region Métodos

        protected IsKeyCodeValido(keycode: number): boolean
        {
            return (keycode > 47 && keycode < 58) || // numeros key
                (keycode > 95 && keycode < 112) ||  // numero - teclado direita
                (keycode > 185 && keycode <= 194) || // ;=,-./` seperados das mascaras
                (keycode > 218 && keycode < 223) ||
                keycode === 32 || keycode === 13;   // [\] () '

            //keycode == 32 || keycode == 13 || // spaco
            //(keycode > 64 && keycode < 91) || // letras
            //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        }

        public TeclaPermitida(keycode: number): boolean
        {
            return keycode === 8 ||    //backspace
                keycode === 9 ||    //tab
                (keycode >= 37 && keycode <= 41) ||      // setas
                keycode === 46 ||   //delete
                keycode === 16 ||   //shift
                keycode === 36 ||   //home
                keycode === 35 ||   //end
                keycode === 16 ||   //delete
                keycode === 17 ||   // crl
                keycode === 86 ||   // V  - 
                keycode === 67;   // C
        }

        public NotificarValorFormatadoAlterado(event: UIEvent, valor: string): void
        {
            const args = new MascaraAlteradaEventArgs(event, valor);
            this.EventoValorMascaraAlterado.Notificar(this, args);
        }
        // #endregion

        //#region IDisposable

        public override Dispose()
        {
            this.EventoValorMascaraAlterado.Clear();
            super.Dispose();
        }
        //#endregion
    }

    export class MascaraAlteradaEventArgs extends EventArgs
    {
        public readonly EventoNativo: UIEvent;
        public readonly Valor: string;
        public constructor(eventoNativo: UIEvent, valor: string)
        {
            super();
            this.EventoNativo = eventoNativo;
            this.Valor = valor;
        }
    }

}