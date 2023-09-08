namespace Snebur.UI
{
    export class CaixaTexto extends BaseCaixaTexto<string>
    {
        private RegexPattern: RegExp;
        
        private _tipoEntrada: EnumTipoEntrada;
        private _pattern: string;
        protected Mascara: string;

        public get TipoEntrada(): EnumTipoEntrada
        {
            return this._tipoEntrada;
        }
        public set TipoEntrada(value: EnumTipoEntrada)
        {
            this._tipoEntrada = value;
            this.AtualizarTipoEntrada();
        }

        public get Pattern(): string
        {
            return this._pattern;
        }
        public set Pattern(value: string)
        {
            this._pattern = value;
            this.AtualizarPattern();
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Mascara = this.RetornarValorAtributo(AtributosHtml.Mascara);
            
            this._pattern = this.RetornarValorAtributo(AtributosHtml.Pattern, String.Empty);
            this._tipoEntrada = this.RetornarValorAtributoEnum(EnumTipoEntrada, AtributosHtml.TipoEntrada, EnumTipoEntrada.Texto);
             
            if (!String.IsNullOrWhiteSpace(this.Mascara))
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Mascara, this.Mascara);

                const atributoBind = this.Mascara?.toLowerCase() === "data"
                    ? AtributosHtml.BindData
                    : AtributosHtml.BindTexto;

                ElementoUtil.AdicionarAtributo(this.ElementoInput, atributoBind, this.CaminhoBind);
            }
            else
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            }
             
            this.AtualizarTipoEntrada();
            this.AtualizarPattern();
        }
         
        //#region TipoEntrada 
        private AtualizarTipoEntrada(): void
        {
            const elementInput = this.ElementoInput;
            const inputMode = this.RetornarInputMode(this.TipoEntrada);
            const inputType = this.RetornarInputType(this.TipoEntrada);
            if (elementInput.inputMode !== inputMode)
            {
                elementInput.inputMode = inputMode;
            }
            if (elementInput.type !== inputType)
            {
                elementInput.type = inputType;
            }
        }
         
        private RetornarInputMode(tipoEntrada: EnumTipoEntrada): string
        {
            switch (tipoEntrada)
            {
                case EnumTipoEntrada.Nenhum:
                    return "none";
                case EnumTipoEntrada.Texto:
                    return "text";
                case EnumTipoEntrada.Decimal:
                    return "decimal";
                case EnumTipoEntrada.Numero:
                    return "numeric";
                case EnumTipoEntrada.Telefone:
                    return "tel";
                case EnumTipoEntrada.Pesquisa:
                    return "search";
                case EnumTipoEntrada.Email:
                    return "email";
                case EnumTipoEntrada.Url:
                    return "url";
                default:
                    throw new Erro("O tipo da entrada não é suportada");
            }
        }

        private RetornarInputType(tipoEntrada: EnumTipoEntrada): string
        {
            switch (tipoEntrada)
            {
                case EnumTipoEntrada.Telefone:
                    return "tel";
                case EnumTipoEntrada.Pesquisa:
                    return "search";
                case EnumTipoEntrada.Email:
                    return "email";
                case EnumTipoEntrada.Url:
                    return "url";
                default:
                    return "text";
            }
        }

        //#endregion

        //#region Pattern

        private AtualizarPattern(): void
        {
            if (this.ElementoInput.pattern !== this.Pattern)
            {
                this.ElementoInput.pattern = ConverterUtil.ParaString(this.Pattern);

                const eventoKey = u.SistemaUtil.IsAndroid ? EnumEventoDom.KeyUp : EnumEventoDom.KeyDown;

                if (!String.IsNullOrWhiteSpace(this.Pattern))
                {
                    this.RegexPattern = new RegExp(this.Pattern);
                    this.AdicionarEventoDom(eventoKey, this.ElementoInput_KeyUp, this.ElementoInput);
                }
                else
                {
                    this.RemoverEventoDom(eventoKey, this.ElementoInput_KeyUp, this.ElementoInput);
                }
            }
        }

        private ElementoInput_KeyUp(e: KeyboardEvent)
        {
            if (this.RegexPattern != null)
            {
                if (KeyCodeUtil.IsBackSpace(e.keyCode))
                {
                    return;
                }

                let keyCode = e.keyCode || e.which;
                if (keyCode >= 96 && keyCode <= 105)
                {
                    keyCode -= 48;
                }

                
                const key = String.fromCharCode(keyCode);
                if (!this.RegexPattern.test(key))
                {
                    event.preventDefault();
                }
            }

        }
        //#endregion

    }
}