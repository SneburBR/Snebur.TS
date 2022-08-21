namespace Snebur.UI
{
    export class CelulaTexto extends Celula
    {
        public get TemplateColunaTexto(): TemplateColunaTexto
        {
            return (this.Template as TemplateColunaTexto);
        }

        public constructor(controlePai: BaseControle, idElemento: string, coluna: Coluna, template: TemplateColunaTexto)
        {
            super(controlePai, idElemento,coluna, template);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override RetornarHtmlInterno(): string
        {
            const span = document.createElement("span");
            EstiloUtil.AdicionarCssClasse(span, this.Template.CssClasse);
            EstiloUtil.AtualizarCssTexto(span, this.Template.CssTexto);

            if (u.ValidacaoUtil.IsBind(this.TemplateColunaTexto.CaminhoBind))
            {
                ElementoUtil.AdicionarAtributo(span, AtributosHtml.BindTexto, this.TemplateColunaTexto.CaminhoBind);
            }
            if (!String.IsNullOrWhiteSpace(this.TemplateColunaTexto.Formatar))
            {
                ElementoUtil.AdicionarAtributo(span, AtributosHtml.Formatar, this.TemplateColunaTexto.Formatar);
            }
            return span.outerHTML;
        }
    }
}