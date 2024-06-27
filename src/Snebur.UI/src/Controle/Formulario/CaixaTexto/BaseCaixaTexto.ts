namespace Snebur.UI
{
    export class BaseCaixaTexto<TValor = string> extends BaseControleFormulario<TValor> implements IControleEventoValorModificando<TValor>
    {
        private _isLimparMensagemValidacaoPendente: boolean;
        private _marcaDagua: string;

        public IsRotuloFlutuante: boolean;
        public ElementoLocalRotuloFlutuante: HTMLElement;
        protected MaxLength: number;

        public get MarcaDagua(): string
        {
            return this._marcaDagua;
        }
        public set MarcaDagua(value: string)
        {
            this._marcaDagua = value;
            this.AtualizarMarcaDagua();
        }

        public IsAtualizarDigitando: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            const elemento = this.Elemento;
            if (this.IsDesativarAutoCompletar(elemento))
            {
                const elemenotInput = elemento.querySelector("input");
                elemenotInput.autocomplete = "off";
                elemenotInput.autocapitalize = "off";
                elemenotInput.readOnly = true;
                this.AdicionarEventoDom(EnumEventoDom.Focus, this.DesativarAutoCompletarElementoInput_Focus, elemenotInput);

                this.SetTimeout(this.DesativarReadOnly, 1000);
            }
            this._marcaDagua = this.RetornarValorAtributo(AtributosHtml.MarcaDagua, String.Empty);
            this.AtualizarMarcaDagua();
        }

        //#region Desativar auto completar

        private DesativarReadOnly(): void
        {
            const elemenotInput = this.Elemento.querySelector("input");
            if (elemenotInput.readOnly && !this.IsSomenteLeitura)
            {
                elemenotInput.readOnly = false;
            }
            this.RemoverEventoDom(EnumEventoDom.Focus, this.DesativarAutoCompletarElementoInput_Focus, elemenotInput);
        }

        private DesativarAutoCompletarElementoInput_Focus(e: FocusEvent)
        {
            this.DesativarReadOnly();
        }

        protected IsDesativarAutoCompletar(elemento: HTMLElement): boolean
        {
            return this instanceof CaixaSenha ||
                ConverterUtil.ParaBoolean(elemento.getAttribute(AtributosHtml.DesativarAutoCompletar.Nome));
        }

        //#endregion

        protected override Inicializar()
        {
            super.Inicializar();

            this.ElementoLocalRotuloFlutuante = this.RetornarItemElemento("LocalRotuloFlutuante");
            this.IsAtualizarDigitando = this.RetornarValorAtributoBoolean(AtributosHtml.IsAtualizarDigitando, false);
            this.MaxLength = this.RetornarValorAtributoNumber(AtributosHtml.MaxLength, null, false);

            this.AdicionarEventoDom(EnumEventoDom.Focus, this.BaseCaixaTextoElementoInputInterno_Focus.bind(this), this.ElementoInput, this, true);
            /*this.AdicionarEventoDom(EnumEventoDom.Blur, this.ElementoInputIntero_Blur.bind(this), this.ElementoInput, this, true);*/
            this.AdicionarEventoDom(EnumEventoDom.KeyUp, this.BaseCaixaTextoElementoInputInterno_KeyPress.bind(this), this.ElementoInput, this, true);
            //this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.ElementoInputIntero_MouseDown.bind(this), this.ElementoInput, this, true);

            if (!(this instanceof BaseCaixaNumero))
            {
                this.AdicionarEventoDom(EnumEventoDom.Input, this.BaseCaixaTextoElementoInputInterno_Input.bind(this), this.ElementoInput, this, true);
            }
            //this.AdicionarEventoDom(EnumEventoDom.KeyUp, this.ElementoInputIntero_KeyPress.bind(this), this.ElementoInput, this, true);
            this.AdicionarEventoPropriedadeApresentacaoAlterada(AtributosHtml.CorTextoApresentacao, this.CorTextoApresentacao_PropriedadeApresentacaoAlterada);

            const isSomenteLeitura = this.RetornarValorAtributoBoolean(AtributosHtml.IsSomenteLeitura, false);
            this.IsRotuloFlutuante = this.RetornarValorAtributoBoolean(AtributosHtml.IsRotuloFlutuante, true);

            if (isSomenteLeitura)
            {
                this.IsSomenteLeitura = isSomenteLeitura;
            }

            if (!this.IsRotuloFlutuante || this.IsRotuloVazio)
            {
                this.Elemento.classList.add("sn-sem-rotulo-flutuante");
                this.ElementoLocalRotuloFlutuante.OcultarElemento();
            }

            if (this.MaxLength > 0)
            {
                this.ElementoInput.maxLength = this.MaxLength;
            }
        }

        private CorTextoApresentacao_PropriedadeApresentacaoAlterada(provedor: any, e: PropriedadeApresentacaoAlteradaEventArgs): void
        {
            if (EnumUtil.IsDefindo(EnumCor, e.Valor))
            {
                const classeCor = CorUtil.RetornarClasseCssCorTexto(e.Valor);
                EstiloUtil.RemoverClssClassePrefixo(this.ElementoInput, EnumPrefixoCor.CorTexto);
                EstiloUtil.AdicionarCssClasse(EnumPrefixoCor.CorTexto, classeCor);
            }
        }

        private BaseCaixaTextoElementoInputInterno_Focus(e: FocusEvent)
        {
            if (!this.IsDesabilitado && !this.IsSomenteLeitura)
            {
                if (!(this instanceof CaixaMoeda) && !(this instanceof CaixaQuantidade))
                {
                    this.ElementoInput.select();
                }

                this._isLimparMensagemValidacaoPendente = true;

                const controleLista = this.ControlePai.RetornarControlePai(BaseControleLista, true);
                if (controleLista instanceof BaseControleLista && controleLista.IsMarcarItem)
                {
                    this.MarcarLinha();
                }
                this.AtualizarRotulo(false);
                e.preventDefault();
            }
        }

        private BaseCaixaTextoElementoInputInterno_KeyPress(e: KeyboardEvent): void
        {
            if (this.IsControleInicializado && this._isLimparMensagemValidacaoPendente)
            {
                if (KeyCodeUtil.IsKeyCodeLetraNumero(e.keyCode))
                {
                    this.OcultarMensagemValidacao();
                    this._isLimparMensagemValidacaoPendente = false;
                }

                //    !KeyCodeUtil.IsKeyCodeLetraNumero(e.keyCode))
                //{
                //    let isExisteConteudo = this.ElementoInput.value.length > 0;
                //    if (isExisteConteudo)
                //    {
                //        this.OcultarMensagemValidacao();
                //        this._isLimparMensagemValidacaoPendente = false;
                //    }
                //}
            }
        }

        private BaseCaixaTextoElementoInputInterno_Input(e: KeyboardEvent): void
        {
            if (this.IsAtualizarDigitando)
            {
                this.AlterarValorPropriedade();
            }
            this.EventoValorModificando.Notificar(this, new ValorAlteradoEventArgs(this.Valor));
        }

        private MarcarLinha(): void
        {
            const linhaOuItemBloco = ControleUtil.RetornarLinhaOuItemBloco(this.ControlePai);
            if (linhaOuItemBloco instanceof Linha)
            {
                linhaOuItemBloco.DataLista.MarcarLinha(linhaOuItemBloco.ItemReferencia, false);
                this.ControleApresentacao.__UltimoItemMarcado = linhaOuItemBloco.ItemReferencia;
            }

            if (linhaOuItemBloco instanceof ItemBloco)
            {
                linhaOuItemBloco.PainelLista.MarcarConteudo(linhaOuItemBloco, false);
                this.ControleApresentacao.__UltimoItemMarcado = linhaOuItemBloco.ItemReferencia;
            }
        }

        public override Desabilitar(): void
        {
            if (this.IsControleInicializado)
            {
                ElementoUtil.HabilitarSomenteLeitura(this.ElementoInput);
                ElementoUtil.DesabilitarElemento(this.Elemento, false);
                //this.ElementoInput.readOnly = true;
                //this.ElementoInput.disabled = true;
                for (const elementoValidacao of this.ElementosValidacao)
                {
                    elementoValidacao.classList.add(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
                }
            }
        }

        public override Habilitar(): void
        {
            if (this.IsSomenteLeitura)
            {
                return;
            }

            if (this.IsControleInicializado)
            {
                ElementoUtil.HabilitarElemento(this.Elemento);
                ElementoUtil.DesabilitarSomenteLeitura(this.ElementoInput);
                //this.ElementoInput.readOnly = false;
                //this.ElementoInput.disabled = false;
                //this.ElementoInput.po
                for (const elementoValidacao of this.ElementosValidacao)
                {
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
                }
            }
        }

        public FocusPrimeiroControle(): void
        {
            this._isFocusPrimeiroControleApresentacao = true;
            this._isNaoOcultarValidacao = false;
            this.FocusInternoAsync();
        }

        public SelecionarTexto(): void
        {
            this.ElementoInput?.focus();
            this.ElementoInput?.select();
        }

        public FocusFinal(): void
        {
            if (this.ElementoInput instanceof HTMLElement)
            {
                this.ElementoInput.focus();
                this.ElementoInput.selectionStart = this.ElementoInput.value.length;
                this.ElementoInput.selectionEnd = this.ElementoInput.value.length;
            }
        }

        //#region Rotulo

        public override RetornarRotulo(): string
        {
            const valorAtributoRotuloFlutuante = this.RetornarValorAtributo(AtributosHtml.RotuloFlutuante, null, false);
            if (!String.IsNullOrWhiteSpace(valorAtributoRotuloFlutuante) &&
                (this.IsExisteConteudoDom || (this.ElementoInput === document.activeElement)))
            {
                return valorAtributoRotuloFlutuante;
            }
            return super.RetornarRotulo();
        }
        //#endregion

        //#region Métodos privados

        private AtualizarMarcaDagua()
        {
            if (this.ElementoInput.placeholder !== this.MarcaDagua)
            {
                this.ElementoInput.placeholder = ConverterUtil.ParaString(this.MarcaDagua);
            }
        }

        //#endregion

        protected AlterarValorPropriedade(): void
        {
            if (this.PaiPropriedade instanceof ObjetoControladorPropriedade && this.Propriedade instanceof r.Propriedade)
            {
                u.ReflexaoUtil.AtribuirValorPropriedade(this.PaiPropriedade, this.Propriedade, this.Valor);
            }
        }
    }
}
