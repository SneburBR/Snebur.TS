
namespace Snebur.UI
{
    export class CaixaHora extends BaseCaixaTexto<TimeSpan>
    {

        public override get Valor(): TimeSpan
        {
            if (String.IsNullOrWhiteSpace(this.ElementoInput.value))
            {
                return null;
            }
            return ConverterUtil.ParaTimeSpan(this.ElementoInput.value);
        }

        public override  set Valor(value: TimeSpan)
        {
            /*eslint-disable*/
            if (this.Valor != value)
            {
                this.ElementoInput.value = FormatacaoUtil.FormatarHora(value);
                this.ElementoInput.dispatchEvent(new Event("change"));
                //this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(value));
            }
            /*eslint-enable*/
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override  Inicializar()
        {
            super.Inicializar();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            const isHorasDia = this.RetornarValorAtributoBoolean(AtributosHtml.IsHorasDia, false);

            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindHora, this.CaminhoBind);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Mascara, "Hora");
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.IsHorasDia, isHorasDia);
        }

    }
}