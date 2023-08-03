 


namespace Snebur.UI
{
    export abstract class BaseMenu extends Snebur.UI.BaseControle implements IComponenteApresentacaoIcone
    {
        //#region Propriedades

        protected static CSS_CLASS_SELECIONADO: string = "local-is-selecionado";

        private _elementoRecipienteIcone: HTMLElement;

        private _rotulo: string = null;
        private _tags: List<string>;
        private _icone: string = null;
        private _iconeSeta: string = null;
        private _elementoIcone: HTMLElement

        public get ElementoRecipienteIcone(): HTMLElement
        {
            return this._elementoRecipienteIcone;
        }

        protected readonly ElementoConteudo: HTMLElement
        protected readonly ElementoRotulo: HTMLSpanElement;
        protected readonly ElementoIconeSeta: HTMLElement;

        //protected get ElementoIcone(): HTMLElement
        //{
        //    if (!this._elementoIcone)
        //    {
        //        this._elementoIcone = this.CriarElementoIcone();
        //    }
        //    return this._elementoIcone;
        //}

        public get Rotulo(): string
        {
            return this._rotulo;
        }

        public set Rotulo(rotulo: string)
        {
            this._rotulo = rotulo;
            this.SetarRotulo();
        }

        public get Tags(): List<string>
        {
            return this._tags;
        }

        //private get Icone(): string
        //{
        //    return this._icone;
        //}

        //private set Icone(icone: string)
        //{
        //    this._icone = icone;
        //    this.AtribuirIcone(this.Icone);
        //}

        protected get IconeSeta(): string
        {

            return this._iconeSeta;
        }

        protected set IconeSeta(icone: string)
        {
            this._iconeSeta = icone;
            this.ElementoIconeSeta.innerHTML = this.IconeSeta;
            this.ElementoIconeSeta.Visibilidade = !String.IsNullOrWhiteSpace(this.IconeSeta);
        }

        //#endregion

        //#region Propriedades de apresentacao 

        public Icone: EnumIcone;
        public IconeCategoria: EnumIconeCategoria;

        //#endregion

        //#region Inicialização

        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-base-menu";
        }

        protected override RetornarHtmlInterno(): string
        {
            return HtmlReferenciaUtil.RetornarHtml(BaseMenu.GetType() as r.TipoUIHtml) + this.HtmlInternoInicial;
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this._elementoRecipienteIcone = this.RetornarItemElemento("RecipienteIcone");
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.Rotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo);
            this._tags = this.RetornarTags();
            //this.Icone = this.RetornarValorAtributo(AtributosHtml.Icone);
        }
        //#endregion

        public Selecionar(): void
        {
            const nomeClasseCssSelecionar = this.RetornarClassCssSelecionar();
            this.ElementoConteudo?.classList.add(nomeClasseCssSelecionar);
            if (this.ControlePai instanceof BaseMenu)
            {
                this.ControlePai.Selecionar();
            }
        }

        protected RetornarClassCssSelecionar(): string
        {
            return BaseMenu.CSS_CLASS_SELECIONADO;
        }

        public Deselecionar(): void
        {
            if (this.IsControleInicializado)
            {
                const nomeClasseCssSelecionar = this.RetornarClassCssSelecionar();
                this.ElementoConteudo?.classList.remove(nomeClasseCssSelecionar);
            }
            
        }

        //#region Métodos Privados

        private SetarRotulo(): void
        {
            if (String.IsNullOrWhiteSpace(this.Rotulo))
            {
                return;
            }
            ElementoUtil.AtualizarInnerHtml(this.ElementoRotulo, this.Rotulo);
        }

        //private AtribuirIcone(icone: string): void
        //{
        //    if (!String.IsNullOrWhiteSpace(icone))
        //    {
        //        ElementoUtil.AtualizarInnerHtml(this.ElementoIcone, icone);
        //    }
        //}

        //private CriarElementoIcone(): HTMLElement
        //{
        //    let elementoIcone = document.createElement("i");
        //    elementoIcone.className = "material-icons";

        //    ElementoUtil.AdicionarElemento(this.ElementoRecipienteIcone, elementoIcone);
        //    return elementoIcone;
        //}

        //#endregion

        private RetornarTags(): List<string>
        {
            const tags = this.RetornarValorAtributo(AtributosHtml.Tags);
            if (!String.IsNullOrEmpty(tags))
            {
                return TextoUtil.RetornarPartesPequisa(tags);
            }
            return null;
        }

      
    }
}