namespace Snebur.UI
{
    export class MascaraCartaoCredito extends MascaraFormatacao
    {
        private _identificaoCartaoCredito: u.ResultadoIdentificacaoCartaoCredito;
        private _bandeiraAtual = u.EnumBandeira.Outro;

        public override  get FormataMascara(): string
        {
            if (this.IdentificaoCartaoCredito instanceof u.ResultadoIdentificacaoCartaoCredito)
            {
                return this.RetornarMascaraCartaoCredito();
            }
            return FormatacaoUtil.MASCARA_CARTAO_CREDITO_PADRAO;
        }

        public get IdentificaoCartaoCredito(): u.ResultadoIdentificacaoCartaoCredito
        {
            return this._identificaoCartaoCredito;
        }
        public set IdentificaoCartaoCredito(value: u.ResultadoIdentificacaoCartaoCredito)
        {
            this._identificaoCartaoCredito = value;
            this.BadeiraAtual = value?.Bandeira ?? u.EnumBandeira.Outro;
        }

        public get BadeiraAtual(): u.EnumBandeira
        {
            return this._bandeiraAtual;
        }
        public set BadeiraAtual(value: u.EnumBandeira)
        {
            if (this._bandeiraAtual !== value)
            {
                this._bandeiraAtual = value;
                this.EventoBandeiraAlterada.Notificar(this, new BandeiraAlteradaEventArgs(value));
            }
        }

        public readonly EventoBandeiraAlterada = new Evento<BandeiraAlteradaEventArgs>(this);

        public constructor(controlePai: BaseControle, refElemento: HTMLElement, mascara: string)
        {
            super(controlePai, refElemento, FormatacaoUtil.MASCARA_CARTAO_CREDITO_PADRAO);
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
            /*let posicao = elemento.selectionStart;*/
            this.IdentificaoCartaoCredito = this.IdentificarCartaoCredito(elemento.value);
            super.MascaraPadrao(event);
        }

        public override RetornarValorFormatado(valorDom: string, isCompletar: boolean): string
        {
            this.IdentificaoCartaoCredito = this.IdentificarCartaoCredito(valorDom);
            return super.RetornarValorFormatado(valorDom, isCompletar);
        }

        private IdentificarCartaoCredito(cartaoCredito: string): u.ResultadoIdentificacaoCartaoCredito
        {
            const numeros = TextoUtil.RetornarSomenteNumeros(cartaoCredito);
            if (numeros.length >= 2)
            {
                return u.CartaoCreditoUtil.Identificar(numeros);
            }
            return null;
        }

        private RetornarMascaraCartaoCredito(): string
        {
            if (this.IdentificaoCartaoCredito instanceof u.ResultadoIdentificacaoCartaoCredito)
            {
                return FormatacaoUtil.RetornarMascaraCartaoCredito(this.IdentificaoCartaoCredito);
            }
            return FormatacaoUtil.MASCARA_CARTAO_CREDITO_PADRAO;

        }

        // #region Métodos

        //#region IDisposable

        public override Dispose()
        {
            super.Dispose();
        }
        //#endregion
    }

    export class BandeiraAlteradaEventArgs extends EventArgs
    {
        public readonly Bandeira: u.EnumBandeira;

        public constructor(bandeira: u.EnumBandeira)
        {
            super();
            this.Bandeira = bandeira;
        }

    }
}
