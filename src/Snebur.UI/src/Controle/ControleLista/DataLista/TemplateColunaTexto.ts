namespace Snebur.UI
{
    export class TemplateColunaTexto extends TemplateColuna
    {
        public Formatar: string;
        public CaminhoBind: string;
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            //teste
            this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.BindTexto, null, true);
            if (String.IsNullOrWhiteSpace(this.CaminhoBind))
            {
                this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.Bind, null, true);
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();


            this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.BindTexto, null, true);
            if (String.IsNullOrWhiteSpace(this.CaminhoBind))
            {
                this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.Bind, null, true);
            }
            this.Formatar = this.RetornarValorAtributo(AtributosHtml.Formatar);
  
            if (u.ValidacaoUtil.IsBind(this.CaminhoBind))
            {
                this.CaminhoPropriedade = BindUtil.RetornarCaminhoPropriedade(this.CaminhoBind, false);
            }
        }
    }
}