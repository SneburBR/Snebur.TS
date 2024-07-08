namespace Snebur.UI
{
    export class Checkbox extends BaseControleFormulario<boolean> implements IControleSelecionado
    {
        private static readonly CSS_IS_SELECIONADO = "sn-is-selecionado";

        public override get Valor(): boolean
        {
            return this.ElementoInput.checked;
        }

        public override set Valor(value: boolean)
        {
            if (this.Valor !== value)
            {
                value = u.ConverterUtil.ParaBoolean(value);
                this.ElementoInput.checked = value;
                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(value));
                this.AtualizarEstiloChecado(value);
            }
        }

        public get IsSelecionado(): boolean
        {
            return this.Valor;
        }
        public set IsSelecionado(value: boolean)
        {
            this.Valor = value;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.Change, this.ElementoCheckbox_Change, this.ElementoInput);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
        }

        public override ValorPropriedadeAlterado(paiPropriedade: d.BaseDominio, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any): void
        {
            super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);
            if (this.IsControleInicializado && !this.IsDispensado)
            {
                const isChecked = u.ConverterUtil.ParaBoolean(valorPropriedade);
                this.AtualizarEstiloChecado(isChecked);
                this.ElementoInput.checked = isChecked;
            }
        }
         
        protected override VinalizarRotuloInput(): void
        {
            const elementoRotuloPara = this.ElementoCaixa as HTMLLabelElement;
            elementoRotuloPara.htmlFor = this.ElementoInput.id;
        }

        private ElementoCheckbox_Change()
        {
            this.AtualizarEstiloChecado(this.Valor);
        }

        private AtualizarEstiloChecado(isChecked: boolean): void
        {
            if (isChecked)
            {
                CssClassUtil.AdicionarCssClasse(this.Elemento, Checkbox.CSS_IS_SELECIONADO);
            }
            else
            {
                CssClassUtil.RemoverCssClasse(this.Elemento, Checkbox.CSS_IS_SELECIONADO);
            }
        }
        public override Habilitar(): void
        {
            super.Habilitar();
            //if (this.ElementoCaixa.classList.contains("is-disabled"))
            //{
            //    this.ElementoCaixa.classList.remove("is-disabled");
            //}
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
            //if (!this.ElementoCaixa.classList.contains("is-disabled"))
            //{
            //    this.ElementoCaixa.classList.add("is-disabled");
            //}
        }
    }

   
}