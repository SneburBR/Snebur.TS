namespace Snebur.UI
{
    export class CaixaQuantidade extends BaseCaixaTexto<number>
    {
        public Minimo: number;
        public Maximo: number;
        public Passo: number = 1;

        public override get Valor(): number
        {
            return u.ConverterUtil.ParaNumero(this.ElementoInput.value);
        }

        public override set Valor(value: number)
        {
            if (this.Valor !== value)
            {
                this.ElementoInput.value = this.NormalizarValor(value).toString();
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

        protected override Inicializar()
        {
            super.Inicializar();

/*            this.AdicionarEventoDom(EnumEventoDom.Blur, this.ElementoInput_Blur, this.ElementoInput);*/
            this.AdicionarEventoDom(ui.EnumEventoDom.Blur, this.ElementoInput_Blur.bind(this), this.Elemento);
            this.AdicionarEventoDom(ui.EnumEventoDom.FocusOut, this.ElementoInput_Blur.bind(this), this.Elemento);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Minimo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Minimo, BindNumero.MINIMO_PADRAO));
            this.Maximo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Maximo, BindNumero.MAXIMO_PADRAO));
            this.Passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, 1));

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindNumero, this.CaminhoBind);
        }

        private Propriedade_Alterada(): void
        {
            if (this.Propriedade instanceof r.Propriedade)
            {
                this.AtualizarPassosMinimoMaximo();
            }
        }

        private AtualizarPassosMinimoMaximo()
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

        private RetornarValores(): [number, number, number]
        {
            const atributos = this.Propriedade?.Atributos;
            const atributoInteiro = atributos?.OfType(at.ValidacaoInteiroAttribute).SingleOrDefault();
            const atributoIntervalo = atributos?.OfType(at.ValidacaoIntervaloAttribute).SingleOrDefault();
            const atributoMoeda = atributos?.OfType(at.ValidacaoMoedaAttribute).SingleOrDefault();

            const passo = this.RetornarPasso(atributoInteiro, atributoMoeda);
            const minimo = this.RetornarMinimo(atributoIntervalo, atributoMoeda);
            const maximo = this.RetornarMaximo(atributoIntervalo, atributoMoeda);
 
            return [passo, minimo, maximo];
        }

        private RetornarPasso(atributoInteiro: at.BaseAtributoDominio, atributoMoeda: at.BaseAtributoDominio): number
        {
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

            if (this.Passo > 0)
            {
                return this.Passo;
            }

            return BindNumero.PASSO_PADRAO;
        }

        private RetornarMinimo(atributoValidacaoIntervalo: at.ValidacaoIntervaloAttribute,
            atributoMoeda: at.ValidacaoMoedaAttribute): any
        {
        
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

            if (this.Minimo > 0)
            {
                return this.Minimo;
            }
            return BindNumero.MINIMO_PADRAO;
        }

        private RetornarMaximo(atributoValidacaoIntervalo: at.ValidacaoIntervaloAttribute,
            atributoMoeda: at.ValidacaoMoedaAttribute): any
        {
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

            if (this.Maximo > 0)
            {
                return this.Maximo;
            }
            return BindNumero.MAXIMO_PADRAO;
        }

        private Minimo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, this.Minimo.toString());
            this.AtualizarPassosMinimoMaximo();
        }

        private Maximo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, this.Maximo.toString());
            this.AtualizarPassosMinimoMaximo();
        }

        private Passo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, this.Passo.toString());
            this.Valor = this.NormalizarValor(this.Valor);
            this.AtualizarPassosMinimoMaximo();
        }

        private AtualizarValoresElementoInput(): void
        {
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, this.Minimo.toString());
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, this.Maximo.toString());
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, this.Passo.toString());

            this.ElementoInput.min = this.Minimo.toString();
            this.ElementoInput.max = this.Maximo.toString();
            this.ElementoInput.step = this.Passo.toString();
        }

        protected override ElementoInput_Blur(e: FocusEvent): void
        {
            super.ElementoInput_Blur(e);
            this.AtualizarValorAsync();
        }

        private async AtualizarValorAsync()
        {
            await ThreadUtil.EsperarAsync(10);
            this.Valor = this.NormalizarValor(this.Valor);
        }

        private BtnMenos_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.Passo;
            let valor = this.Valor;
            valor -= passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            if (valor < this.Minimo)
            {
                valor = this.Minimo;
            }
            this.Valor = valor;
            this.AlterarValorPropriedade();
            /*this.ElementoInput?.focus();*/
            this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_FOCUS);
            this.Elemento.focus();
        }

        private BtnMais_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.Passo;
            let valor = this.Valor;
            valor += passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            if (valor > this.Maximo)
            {
                valor = this.Maximo;
            }
            this.Valor = valor;
            this.AlterarValorPropriedade();
            /*this.ElementoInput?.focus();*/
            /*this.ElementoInput.setSelectionRange(0, 0);*/
            this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_FOCUS);
      
        }

        public NormalizarValor(valor: number): number
        {
            if (this.Passo > 0)
            {
                if (valor < this.Minimo)
                {
                    return NormalizacaoUtil.NormalizarPasso(this.Minimo, this.Passo, u.EnumOpcoesNormalizarPasso.ParaCima);
                }

                if (valor > this.Maximo)
                {
                    return NormalizacaoUtil.NormalizarPasso(this.Maximo, this.Passo, u.EnumOpcoesNormalizarPasso.ParaBaixo);
                }
                return NormalizacaoUtil.NormalizarPasso(valor, this.Passo, u.EnumOpcoesNormalizarPasso.Media);
            }
            return valor;
        }

    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaQuantidade
    {
        readonly BtnDiminuir: ui.Botao;
        readonly BtnAumentar: ui.Botao;
    }

    //#endregion

}