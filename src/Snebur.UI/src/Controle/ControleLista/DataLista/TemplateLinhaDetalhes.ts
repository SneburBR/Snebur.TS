namespace Snebur.UI
{
    export class TemplateLinhaDetalhes extends BaseTemplate
    {
        public Tipo: r.BaseTipo = null;
        public IsPropagarBindDataSource: boolean = true;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Tipo = this.RetornarTipoInterno();
            this.IsPropagarBindDataSource = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.PropagarBindDataSource, true));
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        private RetornarTipoInterno(): r.BaseTipo
        {
            const caminhoTipo = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                return u.ReflexaoUtil.RetornarTipo(caminhoTipo);
            }

            return null;
        }
    }
}