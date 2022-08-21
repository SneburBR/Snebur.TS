namespace Snebur.UI
{
    export class CaixaNumero extends BaseCaixaTexto<number>
    {
        public Minimo: number
        public Maximo: number;
        public Passo: number;

        public override  get Valor(): number
        {
            return u.ConverterUtil.ParaNumero(this.ElementoInput.value);
        }

        public override set Valor(value: number)
        {
            if (this.Valor !== value)
            {
                this.ElementoInput.value = u.ConverterUtil.ParaNumero(value) as any;
                this.ElementoInput.dispatchEvent(new Event("change"));
            }
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoPropriedadeAlterada.AddHandler(this.Propriedade_Alterada, this);

            this.DeclararPropriedade(x => x.Minimo, Number, this.Minimo_Alterado);
            this.DeclararPropriedade(x => x.Maximo, Number, this.Maximo_Alterado);
            this.DeclararPropriedade(x => x.Passo, Number, this.Passo_Alterado);
        }

        protected override  Inicializar()
        {
            super.Inicializar();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Minimo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Minimo, BindNumero.MINIMO_PADRAO));
            this.Maximo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Maximo, BindNumero.MAXIMO_PADRAO));
            this.Passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, BindNumero.PASSO_PADRAO));

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
        private RetornarPasso(atributoInteiro: at.BaseAtributoDominio, atributoMoeda: at.BaseAtributoDominio): number
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
    }
}