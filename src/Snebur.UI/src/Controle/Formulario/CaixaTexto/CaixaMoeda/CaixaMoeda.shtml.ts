namespace Snebur.UI
{
    export class CaixaMoeda extends BaseCaixaTexto<number>
    {
        public Minimo: number | null = null;
        public Maximo: number | null = null;

        private IsNaoPermitirValorZero: boolean;
        private IsNaoFormatarValorVazio: boolean;

        public override get Valor(): any
        {
            if (String.IsNullOrWhiteSpace(this.ElementoInput.value))
            {
                return null;
            }

            const valor = ConverterUtil.ParaDecimal(this.ElementoInput.value);
            if (valor === 0 && this.IsNaoPermitirValorZero)
            {
                return null;
            }
            return valor;
        }

        public override set Valor(value: any)
        {
            const valorDecimal = ConverterUtil.ParaDecimal(value);
            if (this.Valor !== valorDecimal)
            {
                this.ElementoInput.value = this.FormatarValorInput(valorDecimal);

                if (SistemaUtil.NavegadorEnum !== d.EnumNavegador.InternetExplorer)
                {
                    this.ElementoInput.dispatchEvent(new Event("change"));
                }
                this.AtribuirValorPropriedade(value);
            }
        }

        public override get IsExisteConteudoDom(): boolean
        {
            const valor = this.Valor;
            return typeof valor === "number";
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override  Inicializar()
        {
            super.Inicializar();
            this.EventoValorAlterado.AddHandler(this.CaixaMoeda_ValorAlterado, this);

        }

        private ElementoInputMoeda_EvitarMenuCopiarColar(e: Event)
        {
            e.preventDefault();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Minimo = this.RetornarValorAtributoNumber(AtributosHtml.Minimo, null);
            this.Maximo = this.RetornarValorAtributoNumber(AtributosHtml.Maximo, null);

            this.IsNaoPermitirValorZero = this.RetornarValorAtributoBoolean(AtributosHtml.IsNaoPermitirValorZero, false);
            this.IsNaoFormatarValorVazio = this.RetornarValorAtributoBoolean(AtributosHtml.IsNaoFormatarValorVazio, false);

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Mascara, "Moeda");

            if (this.IsNaoPermitirValorZero === true)
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.IsNaoPermitirValorZero, this.IsNaoPermitirValorZero.ToString());
            }

            if (this.IsNaoFormatarValorVazio === true)
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.IsNaoFormatarValorVazio, this.IsNaoFormatarValorVazio.ToString());
            }

            this.ElementoInput.inputmode = "decimal";
        }

        private CaixaMoeda_ValorAlterado(provedor: any, e: ValorAlteradoEventArgs): void
        {
            const valor = this.Valor;
            const valorNormalizado = this.NormalizarValor(valor);
            if (valorNormalizado !== valor)
            {
                this.Valor = valorNormalizado;
            }
        }

        private NormalizarValor(valor: any): number
        {
            if (u.ValidacaoUtil.IsNumber(this.Minimo) && valor < this.Minimo)
            {
                return this.Minimo;
            }

            if (u.ValidacaoUtil.IsNumber(this.Maximo) && valor > this.Maximo)
            {
                return this.Maximo;
            }
            return valor;
        }

        protected override AtualizarConteudoDom(): void
        {
            if (this.IsNaoPermitirValorZero && this.Valor === null)
            {
                if (this.ElementoInput.value !== String.Empty)
                {
                    this.ElementoInput.value = String.Empty;
                }
            }
        }

        private FormatarValorInput(valorDecimal: number): string
        {
            if (valorDecimal === 0 && this.IsNaoPermitirValorZero)
            {
                return String.Empty;
            }
            return FormatacaoUtil.FormatarMoeda(valorDecimal);
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaMoeda
    {
    }

    //#endregion

}