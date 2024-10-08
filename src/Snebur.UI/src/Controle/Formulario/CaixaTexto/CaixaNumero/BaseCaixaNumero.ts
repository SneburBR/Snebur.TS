﻿namespace Snebur.UI
{
    export abstract class BaseCaixaNumero extends BaseCaixaTexto<number>
    {
        public abstract readonly PASSAO_PADRAO: number;

        private _casasDecimal: number;

        private _atributoValidacaoInteiro: at.ValidacaoInteiroAttribute = null;
        private _atributoValidacaoMoeda: at.ValidacaoMoedaAttribute = null;
        private _atributoValidacaoIntervalo: at.ValidacaoIntervaloAttribute = null;

        private _maximoManual: number = null;
        private _minimoManual: number = null;
        private _passoManual: number = undefined;
         
        //public Minimo: number;
        //public Maximo: number;
        //public Passo: number;
        public IsFormatarInteiro: boolean;
        
        public override get Valor(): number
        {
            return this.NormalizarValor(this.ElementoInput.value);
        }
        public override set Valor(value: number)
        {
            const valorDom = this.FormatarValorParaDom(value);
            if (this.Valor !== value ||
                //eslint-disable-next-line eqeqeq
                this.ElementoInput.value != valorDom)
            {
                this.ElementoInput.value = valorDom;
                this.ElementoInput.dispatchEvent(new Event("change"));
            }
        }

        public get Maximo(): number
        {
            return this.RetornarMaximo();
        }
        public set Maximo(value: number)
        {
            this._maximoManual = value;
            this.AtualizarAtributosValidacoes();
        }

        public get Minimo(): number
        {
            return this.RetornarMinimo();
        }
        public set Minimo(value: number)
        {
            this._minimoManual = value;
            this.AtualizarAtributosValidacoes();
        }

        public get Passo(): number
        {
            return this.RetornarPasso();
        }
        public set Passo(value: number)
        {
            this._passoManual = value;
            this.AtualizarAtributosValidacoes();
        }

        public get CasasDecimal(): number
        {
            if (this._casasDecimal == null)
            {
                const passoString = this.RetornarPasso().toString();
                this._casasDecimal = passoString.Contains(".") ? passoString.split(".").Last().length : 0;
            }
            return this._casasDecimal;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoPropriedadeAlterada.AddHandler(this.Propriedade_Alterada, this);

            //this.DeclararPropriedade(x => x.Passo, Number, this.Passo_Alterado);
            //this.DeclararPropriedade(x => x.Minimo, Number, this.Minimo_Alterado);
            //this.DeclararPropriedade(x => x.Maximo, Number, this.Maximo_Alterado);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.KeyPress, this.ElementoInput_KeyPress, this.ElementoInput);
            this.AtualizarAtributosValidacoes();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            //this.Passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, null));
            //this.Minimo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Minimo, null));
            //this.Maximo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Maximo, null));
            this.IsFormatarInteiro = this.RetornarValorAtributoBoolean(AtributosHtml.IsFormatarInteiro, false);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindNumero, this.CaminhoBind);
        }

        private Propriedade_Alterada(): void
        {
            const atributos = this.Propriedade?.Atributos ?? [];

            this._atributoValidacaoInteiro = atributos.OfType<at.ValidacaoInteiroAttribute>(at.ValidacaoInteiroAttribute).SingleOrDefault();
            this._atributoValidacaoMoeda = atributos.OfType<at.ValidacaoMoedaAttribute>(at.ValidacaoMoedaAttribute).SingleOrDefault();
            this._atributoValidacaoIntervalo = atributos.OfType<at.ValidacaoIntervaloAttribute>(at.ValidacaoIntervaloAttribute).SingleOrDefault();

            const [passo, minimo, maximo] = this.RetornarValores();
            //this.Passo = passo;
            //this.Minimo = minimo;
            //this.Maximo = maximo;
            const bindNumero = this.Binds.OfType(BindNumero).Where(x => x.Elemento === this.ElementoInput).SingleOrDefault();
            if (bindNumero instanceof BindNumero)
            {
                bindNumero.AtualizarValores(passo, minimo, maximo);
            }
            this.AtualizarAtributosValidacoes();

        }

        private NormalizarValor(value: number | string): number
        {
            if (value == null || String.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            const [passo, minimo, maximo] = this.RetornarValores();
            return NormalizacaoUtil.NormalizarPasso(
                NormalizacaoUtil.NormalizarIntervalo(ConverterUtil.ParaNumero(value), minimo, maximo), passo);
        }

        private FormatarValorParaDom(value: number | string): string
        {
            //const minimo = this.Minimo ?? this.RetornarMinimo();
            //const maximo = this.Maximo ?? this.RetornarMaximo();
            //const passo = this.Passo ?? this.RetornarPasso();

            const [passo, minimo, maximo] = this.RetornarValores();
            return FormatacaoUtil.FormatarMelhorDecimal(value,
                minimo,
                maximo,
                passo,
                this.CasasDecimal,
                this.IsFormatarInteiro);
        }

      
        private RetornarValores(): [number, number, number]
        {
            const passo = this.RetornarPasso();
            const minimo = this.RetornarMinimo();
            const maximo = this.RetornarMaximo();

            return [passo, minimo, maximo];
        }

        protected RetornarPassoLargo(): number
        {
            const passoLargo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.PassoLargo, 0));
            if (passoLargo > 0)
            {
                return passoLargo;
            }
            return this.RetornarPasso();
        }

        public RetornarPasso(): number
        {
            if (this._passoManual >= 0)
            {
                return this._passoManual;
            }
             
            const tipo = this.Propriedade?.Tipo;
            if (this._atributoValidacaoInteiro instanceof at.ValidacaoInteiroAttribute || (
                tipo instanceof r.TipoPrimario &&
                (tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Integer || tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Long)))
            {
                return 1;
            }

            if (this._atributoValidacaoMoeda instanceof at.ValidacaoMoedaAttribute)
            {
                return 0.01;
            }
            
            if (tipo instanceof r.TipoPrimario && tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Decimal)
            {
                return 0.01;
            }
            return this.PASSAO_PADRAO;
        }

        protected RetornarMinimo(): any
        {
            if (this._minimoManual > 0)
            {
                return this._minimoManual;
            }

            const minimo = this.RetornarValorAtributoNumber(AtributosHtml.Minimo, null);
            if (minimo !== null)
            {
                return minimo;
            }

            if (this._atributoValidacaoIntervalo instanceof at.ValidacaoIntervaloAttribute)
            {
                return this._atributoValidacaoIntervalo.Minimo;
            }

            if (this._atributoValidacaoMoeda instanceof at.ValidacaoMoedaAttribute)
            {
                return this._atributoValidacaoMoeda.ValorMinimo;
            }
             
            return BindNumero.MINIMO_PADRAO;
        }

        protected RetornarMaximo(): any
        {
            if (this._maximoManual > 0)
            {
                return this._maximoManual;
            }

            const maximo = this.RetornarValorAtributoNumber(AtributosHtml.Maximo, null);
            if (maximo !== null)
            {
                return maximo;
            }

            if (this._atributoValidacaoIntervalo instanceof at.ValidacaoIntervaloAttribute)
            {
                return this._atributoValidacaoIntervalo.Maximo;
            }

            if (this._atributoValidacaoMoeda instanceof at.ValidacaoMoedaAttribute)
            {
                return this._atributoValidacaoMoeda.ValorMaximo;
            }
            return BindNumero.MAXIMO_PADRAO;
        }

        private AtualizarAtributosValidacoes(): void
        {
            const [passo, minimo, maximo] = this.RetornarValores();

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, minimo);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, maximo);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, passo);

            this.ElementoInput.min = minimo.toString();
            this.ElementoInput.max = maximo.toString();
            this.ElementoInput.step = maximo.toString();
        }

        private ElementoInput_KeyPress(e: KeyboardEvent): void
        {
            const validCharacters = "0123456789,.-";
            const key = e.key;
            if (!validCharacters.includes(key))
            {
                e.preventDefault();
                return;
            }

            if (this.ElementoInput.value.includes(",") || this.ElementoInput.value.includes("."))
            {
                if (key === "." || key === ",")
                {
                    e.preventDefault();
                    return;
                }

                const numerosCasasDecimaisValue = this.ElementoInput.value.split(/\.|,/).Last()?.length;
                if (numerosCasasDecimaisValue >= this.CasasDecimal)
                {
                    const isSelection = this.ElementoInput.selectionStart !== this.ElementoInput.selectionEnd;
                    if (!isSelection)
                    {
                        e.preventDefault();
                    }
                    return;
                }
            }
        }


        protected override ElementoInput_Blur(e: FocusEvent) 
        {
            super.ElementoInput_Blur(e);
            // eslint-disable-next-line no-self-assign
            this.Valor = this.Valor;
        }
    }
}
