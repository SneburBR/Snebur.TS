namespace Snebur.UI
{
    export class TemplateColunaPersonalizada extends TemplateColuna
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            if (u.ValidacaoUtil.IsBind(this.Rotulo))
            {
                this.CaminhoPropriedade = BindUtil.RetornarCaminhoPropriedade(this.Rotulo, false);
            }
        }
    }
}