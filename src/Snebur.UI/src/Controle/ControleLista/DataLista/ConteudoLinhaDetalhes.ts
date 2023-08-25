namespace Snebur.UI
{
    export class ConteudoLinhaDetalhes extends BaseItemTemplate
    {
        public NumeroColunas: number;

        public get TemplateLinhaDetalhes(): TemplateLinhaDetalhes
        {
            return (this.Template as TemplateLinhaDetalhes);
        }

      

        public constructor(controlePai: BaseControle, template: TemplateLinhaDetalhes, numeroColunas: number, )
        {
            super(controlePai, ElementoUtil.RetornarNovoIDElemento(controlePai, "conteudo-linha-detalhes"), template);
            this.NumeroColunas = numeroColunas;
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Elemento.setAttribute("colspan", this.NumeroColunas.toString());
        }

        protected override RetornarTagNovoElemento()
        {
            return "td";
        }
    }
}