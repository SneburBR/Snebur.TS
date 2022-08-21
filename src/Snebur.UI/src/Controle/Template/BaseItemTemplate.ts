namespace Snebur.UI
{
    export abstract class BaseItemTemplate<TTemplate extends BaseTemplate = BaseTemplate> extends BaseControleApresentacaoFormulario
    {
        protected readonly IsNaoUserHtmlTemplate: boolean;
        private _template: TTemplate;

        public get Template(): TTemplate
        {
            return this.NormalizarTemplate(this._template);
        }

        public ElementoInserirAntes: HTMLElement;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, template: TTemplate)
        public constructor(controlePai: BaseControle, idElemento: string, template: TTemplate)
        public constructor(controlePai: BaseControle, refElemento: any, template: TTemplate)
        {
            super(controlePai, refElemento);

            this.ElementoInserirAntes = null;
            this._template = template;
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            const template = this.Elemento;
            if (u.ValidacaoUtil.IsBind(this.Template.CaminhoBindEstilo))
            {
                ElementoUtil.AdicionarAtributo(template, AtributosHtml.BindEstilo, this.Template.CaminhoBindEstilo);
            }

            if (u.ValidacaoUtil.IsBind(this.Template.CaminhoBindClass))
            {
                ElementoUtil.AdicionarAtributo(template, AtributosHtml.BindClass, this.Template.CaminhoBindClass);
            }

            if (!String.IsNullOrWhiteSpace(this.Template.OpcaoBindCssClasse))
            {
                ElementoUtil.AdicionarAtributo(template, AtributosHtml.OpcaoBindCssClasse, this.Template.OpcaoBindCssClasse);
            }

            this.AdicionarEstilos();
        }

        protected AdicionarEstilos(): void
        {
            const template: BaseTemplate = this.Template;
            if (!String.IsNullOrWhiteSpace(template.CssClasse))
            {
                EstiloUtil.AdicionarCssClasse(this.IDElemento, template.CssClasse);
            }

            EstiloUtil.AtualizarCssTexto(this.IDElemento, template.CssTexto);
            const len = template.Atributos.length;
            const elemento = this.Elemento;
            for (let i = 0; i < len; i++)
            {
                const atributo = template.Atributos[i];
                ElementoUtil.AdicionarAtributo(this.IDElemento, atributo.Chave, atributo.Valor);
            }
            const elementosDesabilitados = Util.CopiarArray(elemento.getElementsByClassName(ConstantesCssClasses.CSS_CLASSE_DESABILITADO));
            for (const elementoDesabilitado of elementosDesabilitados)
            {
                elementoDesabilitado.classList.remove(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
            }

            if (elemento.classList.contains(ConstantesCssClasses.CSS_CLASSE_DESABILITADO))
            {
                elemento.classList.remove(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
            }

            ElementoUtil.HabilitarElemento(elemento);
        }

        protected NormalizarTemplate(template: TTemplate): TTemplate
        {
            return template;

        }

        protected override RetornarHtmlInterno(atributos: DicionarioSimples): string
        {
            if (this.IsNaoUserHtmlTemplate)
            {
                return super.RetornarHtmlInterno(atributos);
            }
            return this.Template.Html;
        }

        protected override RetornarTagNovoElemento(): string
        {
            if (!String.IsNullOrWhiteSpace(this.Template.TagElemento))
            {
                return this.Template.TagElemento;
            }
            return super.RetornarTagNovoElemento();
        }

        public override RetornarRefElementoAntesDe(): any
        {
            return this.ElementoInserirAntes;
        }
    }
}