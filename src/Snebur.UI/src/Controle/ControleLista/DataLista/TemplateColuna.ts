namespace Snebur.UI
{
    export abstract class TemplateColuna extends BaseTemplate
    {
        private _coluna: Coluna;

        public readonly TemplateTituloColuna: TemplateTiluloColuna;
        public Propriedade: r.Propriedade;
        public CaminhoPropriedade: string;
        public Rotulo: string

        public get Coluna(): Coluna
        {
            if (this._coluna == null)
            {
                throw new Erro("A coluna foi definida");
            }
            return this._coluna;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.AtributosIgnorar.Add(AtributosHtml.Bind.Nome);
            this.AtributosIgnorar.Add(AtributosHtml.BindTexto.Nome);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            //this.TemplateTituloColuna = this.ControlesFilho.OfType<TemplateTiluloColuna>(TemplateTiluloColuna).SingleOrDefault();
            this.Rotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo, null);
        }

        public SetColuna(coluna: Coluna)
        {
            if (this._coluna != null)
            {
                throw new Erro("A coluna j� esta definida");
            }
            this._coluna = coluna;
        }
    }
}