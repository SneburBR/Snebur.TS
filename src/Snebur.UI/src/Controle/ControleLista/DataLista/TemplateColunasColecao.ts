namespace Snebur.UI
{
    export class TemplateColunasColecao extends BaseTemplate
    {
        public CaminhoManipuladorClick: string;

        public get TemplatesColuna(): Array<TemplateColuna>
        {
            return this.ControlesFilho.OfType<TemplateColuna>(TemplateColuna).ToList();
        }

        public TemplatesLinhaDetalhes: List<TemplateLinhaDetalhes>;
        public TemplateLinhaDetalhesPadrao: TemplateLinhaDetalhes;


        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {

            super.Inicializar();

            this.CaminhoManipuladorClick = this.RetornarValorAtributo(AtributosHtml.Click, String.Empty);
            this.TemplatesLinhaDetalhes = this.ControlesFilho.OfType<TemplateLinhaDetalhes>(TemplateLinhaDetalhes).ToList();

            this.TemplateLinhaDetalhesPadrao = this.ControlesFilho.OfType<TemplateLinhaDetalhes>(TemplateLinhaDetalhes).
                Where(x => x.Tipo == null).
                SingleOrDefault(this.MensagemNenhumLinhaDetalhesEncontrada.bind(this));

        }

        private MensagemNenhumLinhaDetalhesEncontrada(): Snebur.MensagemErroArraySingle
        {
            return {
                Vazia: `Nenhuma elemento sn-linha-detalhes foi encontrada em ${this.ControleApresentacao.___NomeConstrutor}`,
                MaisDeUm: `Mais de um elemento sn-linha-detalhes foi encontrado em ${this.ControleApresentacao.___NomeConstrutor}`
            };
        }

    }
}