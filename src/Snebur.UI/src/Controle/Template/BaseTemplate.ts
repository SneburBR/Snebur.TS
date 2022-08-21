namespace Snebur.UI
{
    export abstract class BaseTemplate extends BaseControle
    {
        protected _html: string;

        protected AtributosIgnorar: Array<string> = ["id", "class", "style"]

        public CssClasse: string;
        public CssTexto: string;
        public Atributos: Array<ParChaveValorSimples<string>>;
        public TagElemento: string;

        public CaminhoBindCssClasse: string;
        public CaminhoBindEstilo: string;
        public CaminhoBindClass: string;
        public OpcaoBindCssClasse: string;

        public get Html(): string
        {
            return this._html;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override Inicializar(): void
        {
            //throw new ErroOperacaoInvalida("O template não pode ser inicializado, utilziar inicializar template", this);
            this.InicializarTemplate();
            //super.Inicializar();

            this.CaminhoBindCssClasse = this.RetornarValorAtributo(AtributosHtml.BindCssClasse, null, true);
            this.CaminhoBindEstilo = this.RetornarValorAtributo(AtributosHtml.BindEstilo, null, true);
            this.CaminhoBindClass = this.RetornarValorAtributo(AtributosHtml.BindClass, null, true);
            this.OpcaoBindCssClasse = this.RetornarValorAtributo(AtributosHtml.OpcaoBindCssClasse, null,true);
         }

        protected InicializarTemplate(): void
        {
            super.CarregarHtmlElemento();

            this.TagElemento = this.RetornarValorAtributo(AtributosHtml.TagElementoItemTemplate);
            this.ControlesFilho.Clear();
            this.ControlesFilho.AddRange(super.RetornarControleFilhosInterno());

            const elemento = this.Elemento;

            this.CssClasse = elemento.className;
            this.CssTexto = elemento.style.cssText;
            this.Atributos = this.RetornarAtributos();

            const novoElemento = this.RetornarNovoElementoTemplate();
            novoElemento.innerHTML = elemento.innerHTML;
            this.LimparIds(novoElemento);
            this._html = novoElemento.innerHTML.trim();
            //delete (elemento as any);

            for (const controleFilho of this.ControlesFilho)
            {
                if (controleFilho instanceof BaseTemplate)
                {
                    controleFilho.Inicializar();
                }
            }

        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            //var elemento = this.Elemento;
            //this.CssClasse = elemento.className;
            //this.CssTexto = elemento.style.cssText;
            //this.Atributos = this.RetornarAtributos();

            //var novoElemento = this.RetornarNovoElementoTemplate();
            //novoElemento.innerHTML = elemento.innerHTML;

            //this.LimparIds(novoElemento);

            //this.Html = novoElemento.innerHTML.trim();
        }

        protected override InicializarControlesFilho(): void
        {
        }

        protected override AtualizarBinds(): void
        {
        }

        protected override AtualizarEventos(): void
        {
        }

        public override AtualizarAparencia(): void
        {

        }

        public override AtualizarPropriedadesApresentacao(): void
        {

        }

        //#region Métodos sobre-escritos

        protected override RetornarElementoDestino(): HTMLElement
        {
            return null;
        }

        protected override RetornarEventos(): Array<UIEvento>
        {
            return new Array<UIEvento>();
        }

        protected override RetornarBinds(): Array<BaseBind>
        {
            return new Array<BaseBind>();
        }

        protected override RetornarTagNovoElemento(): string
        {
            if (!String.IsNullOrWhiteSpace(this.TagElemento))
            {
                return this.TagElemento;
            }
            return super.RetornarTagNovoElemento();
        }
        //#endregion

        //#region Métodos privados

        private RetornarNovoElementoTemplate(): HTMLElement
        {
            const elemento = document.createElement(this.RetornarTagNovoElemento());
            elemento.className = this.CssClasse;
            elemento.style.cssText = this.CssTexto;
            return elemento;
        }

        private LimparIds(elemento: HTMLElement): void
        {
            if (!String.IsNullOrWhiteSpace(elemento.id))
            {
                elemento.id = String.Empty;
            }
            const len = elemento.childNodes.length;
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elemento.childNodes[i];
                if (elementoFilho instanceof HTMLElement)
                {
                    this.LimparIds(elementoFilho);
                }
            }
        }

        protected RetornarAtributos(): Array<ParChaveValorSimples<string>>
        {
            const atributos = new Array<ParChaveValorSimples<string>>();
            const elemento = this.Elemento;
            const len = elemento.attributes.length;

            for (let i = 0; i < len; i++)
            {
                const atributo = elemento.attributes[i];
                if (!this.AtributosIgnorar.Contains(atributo.name))
                {
                    atributos.Add(new ParChaveValorSimples<string>(atributo.name, atributo.value));
                }
            }
            //delete (elemento as any);
            return atributos;
        }
        //#endregion
    }
}