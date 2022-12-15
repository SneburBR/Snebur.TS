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

        //protected  AtualizarRotulo(): void
        //{

        //    let elementoRotulo = this.ElementoRotulo;
        //    let isRotuloVazio = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.RotuloVazio));
        //    if (isRotuloVazio)
        //    {
        //        elementoRotulo.style.visibility = "hidden";
        //        elementoRotulo.style.display=  "unset";
        //    }
        //    else
        //    {
        //        let rotulo = this.RetornarRotulo();
        //        elementoRotulo.innerHTML = rotulo;
        //    }

        //    //super.AtualizarRotulo();



        //    //var elementoRotulo = ElementoUtil.RetornarElemento(this.IDElementoRotulo) as HTMLSpanElement;
        //    //elementoRotulo.innerHTML = String.Format("{0}", u.ConverterUtil.ParaString(this.CaminhoBind));
        //    //delete (elementoRotulo as any);
        //}

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
                EstiloUtil.AdicionarCssClasse(this.Elemento, Checkbox.CSS_IS_SELECIONADO);
            }
            else
            {
                EstiloUtil.RemoverCssClasse(this.Elemento, Checkbox.CSS_IS_SELECIONADO);
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