namespace Snebur.UI
{
    export class CaixaNumero extends BaseCaixaTexto<number>
    {
        private _casasDecimal: number;
        public Minimo: number;
        public Maximo: number;
        public Passo: number;
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

        public get CasasDecimal(): number
        {
            if (this._casasDecimal == null)
            {
                const passoString = this.Passo.toString();
                this._casasDecimal = passoString.Contains(".") ? passoString.split(".").Last().length : 0;
            }
            return this._casasDecimal;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoPropriedadeAlterada.AddHandler(this.Propriedade_Alterada, this);

            this.DeclararPropriedade(x => x.Passo, Number, this.Passo_Alterado);
            this.DeclararPropriedade(x => x.Minimo, Number, this.Minimo_Alterado);
            this.DeclararPropriedade(x => x.Maximo, Number, this.Maximo_Alterado);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.KeyPress, this.ElementoInput_KeyPress, this.ElementoInput);
            this.AdicionarEventoDom(EnumEventoDom.Blur, this.ElementoInput_Blur.bind(this), this.ElementoInput);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, BindNumero.PASSO_PADRAO));
            this.Minimo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Minimo, BindNumero.MINIMO_PADRAO));
            this.Maximo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Maximo, BindNumero.MAXIMO_PADRAO));
            this.IsFormatarInteiro = this.RetornarValorAtributoBoolean(AtributosHtml.IsFormatarInteiro, false);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindNumero, this.CaminhoBind);
        }

        private Propriedade_Alterada(): void
        {
            if (this.Propriedade instanceof r.Propriedade)
            {
                const [passo, minimo, maximo] = this.RetornarValores();
                this.Passo = passo;
                this.Minimo = minimo;
                this.Maximo = maximo;
                const bindNumero = this.Binds.OfType(BindNumero).Where(x => x.Elemento === this.ElementoInput).SingleOrDefault();
                if (bindNumero instanceof BindNumero)
                {
                    bindNumero.AtualizarValores(passo, minimo, maximo);
                }
                this.AtualizarValoresElementoInput();
            }
        }

        private RetornarValores(): [number, number, number]
        {
            const atributos = this.Propriedade.Atributos;

            const atributoInteiro = atributos.OfType<at.ValidacaoInteiroAttribute>(at.ValidacaoInteiroAttribute).SingleOrDefault();
            const atributoIntervalo = atributos.OfType<at.ValidacaoIntervaloAttribute>(at.ValidacaoIntervaloAttribute).SingleOrDefault();
            const atributoMoeda = atributos.OfType<at.ValidacaoMoedaAttribute>(at.ValidacaoMoedaAttribute).SingleOrDefault();

            const passo = this.RetornarPasso(atributoInteiro, atributoMoeda);
            const minimo = this.RetornarMinimo(atributoIntervalo, atributoMoeda);
            const maximo = this.RetornarMaximo(atributoIntervalo, atributoMoeda);

            return [passo, minimo, maximo];
        }

        private RetornarPasso(
            atributoInteiro: at.BaseAtributoDominio,
            atributoMoeda: at.BaseAtributoDominio): number
        {
            if (this.Passo > 0)
            {
                return this.Passo;
            }

            const passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, 0));
            if (passo > 0)
            {
                return passo;
            }

            const tipo = this.Propriedade.Tipo;
            if (atributoInteiro instanceof at.ValidacaoInteiroAttribute || (
                tipo instanceof r.TipoPrimario &&
                (tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Integer || tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Long)))
            {
                return 1;
            }

            if (atributoMoeda instanceof at.ValidacaoMoedaAttribute ||
                tipo instanceof r.TipoPrimario && tipo.TipoPrimarioEnum === r.EnumTipoPrimario.Decimal)
            {
                return 0.01;
            }
            return BindNumero.PASSO_PADRAO;
        }

        private RetornarMinimo(atributoValidacaoIntervalo: at.ValidacaoIntervaloAttribute,
            atributoMoeda: at.ValidacaoMoedaAttribute): any
        {

            if (this.Minimo > 0)
            {
                return this.Minimo;
            }

            const minimo = this.RetornarValorAtributoNumber(AtributosHtml.Minimo, null);
            if (minimo !== null)
            {
                return minimo;
            }

            if (atributoValidacaoIntervalo instanceof at.ValidacaoIntervaloAttribute)
            {
                return atributoValidacaoIntervalo.Minimo;
            }
            if (atributoMoeda instanceof at.ValidacaoMoedaAttribute)
            {
                return atributoMoeda.ValorMinimo;
            }
            return BindNumero.MINIMO_PADRAO;
        }

        private RetornarMaximo(atributoValidacaoIntervalo: at.ValidacaoIntervaloAttribute,
            atributoMoeda: at.ValidacaoMoedaAttribute): any
        {
            if (this.Maximo > 0)
            {
                return this.Maximo;
            }

            const maximo = this.RetornarValorAtributoNumber(AtributosHtml.Maximo, null);
            if (maximo !== null)
            {
                return maximo;
            }

            if (atributoValidacaoIntervalo instanceof at.ValidacaoIntervaloAttribute)
            {
                return atributoValidacaoIntervalo.Maximo;
            }
            if (atributoMoeda instanceof at.ValidacaoMoedaAttribute)
            {
                return atributoMoeda.ValorMaximo;
            }
            return BindNumero.MAXIMO_PADRAO;
        }

        private Minimo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, this.Minimo);
        }

        private Maximo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, this.Maximo);
        }

        private Passo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, this.Passo);
            this._casasDecimal = null;
        }

        private AtualizarValoresElementoInput(): void
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, this.Minimo);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, this.Maximo);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, this.Passo);

            this.ElementoInput.min = this.Minimo?.toString();
            this.ElementoInput.max = this.Maximo?.toString();
            this.ElementoInput.step = this.Passo?.toString();
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

        private FormatarValorParaDom(value: number | string): string
        {
            return FormatacaoUtil.FormatarMelhorDecimal(value,
                this.Minimo,
                this.Maximo,
                this.Passo,
                this.CasasDecimal,
                this.IsFormatarInteiro);
        }

        private NormalizarValor(value: number | string): number
        {
            if (value == null || String.IsNullOrWhiteSpace(value))
            {
                return null;
            }
            return NormalizacaoUtil.NormalizarPasso(
                NormalizacaoUtil.NormalizarIntervalo(ConverterUtil.ParaNumero(value), this.Minimo, this.Maximo),
                this.Passo);
        }

        protected override ElementoInput_Blur(e: FocusEvent) 
        {
            super.ElementoInput_Blur(e);
            // eslint-disable-next-line no-self-assign
            this.Valor = this.Valor;
        }
    }
}