namespace Snebur.UI
{
    export abstract class Celula extends BaseItemTemplate<TemplateColuna>
    {
        public readonly Coluna: Coluna;

        public constructor(controlePai: BaseControle, idElemento: string, coluna:Coluna, template: TemplateColuna)
        {
            super(controlePai, idElemento, template);
            this.IsAdicionarElementoConteudoApresentacao = false;
            this.Coluna = coluna;
            this.Coluna.Celulas.Add(this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            const elemento = this.Elemento;
            if (u.ValidacaoUtil.IsBind(this.Template.CaminhoBindCssClasse))
            {
                ElementoUtil.AdicionarAtributo(elemento, AtributosHtml.BindCssClasse, this.Template.CaminhoBindCssClasse);
            }

            if (u.ValidacaoUtil.IsBind(this.Template.CaminhoBindEstilo))
            {
                ElementoUtil.AdicionarAtributo(elemento, AtributosHtml.BindEstilo, this.Template.CaminhoBindEstilo);
            }

            if (u.ValidacaoUtil.IsBind(this.Template.CaminhoBindClass))
            {
                ElementoUtil.AdicionarAtributo(elemento, AtributosHtml.BindClass, this.Template.CaminhoBindClass);
            }
            if (this.Visibilidade !== this.Coluna.Visibilidade)
            {
                this.Visibilidade = this.Coluna.Visibilidade;
            }
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            return super.NormalizarHtmlInterno(htmlInterno);
        }

        //#region Css 
         
        //#endregion

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento()
        {
            return "td";
        }
        //#endregion

        public override Dispose()
        {
            this.Coluna.Celulas.Remove(this);
            super.Dispose();
        }
    }
}