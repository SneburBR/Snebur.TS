namespace Snebur.UI
{
    export abstract class Coluna extends BaseItemTemplate<TemplateColuna>
    {
        public readonly Propriedade: r.Propriedade;
        public readonly CaminhoPropriedade: string;
        public readonly IsPropriedadeEntidade: boolean;

        public IDElementoRotulo: string;

        public get TemplateColuna(): TemplateColuna
        {
            return this.Template;
        }

        public get ColunasColecao(): ColunasColecao
        {
            return this.ControlePai as ColunasColecao;
        }

        public get Rotulo(): string
        {
            const elemento = ElementoUtil.RetornarElemento(this.IDElementoRotulo, true);
            if (elemento instanceof HTMLElement)
            {
                return elemento.innerHTML;
            }
            return String.Empty;
        }
        public set Rotulo(value: string)
        {
            const elemento = ElementoUtil.RetornarElemento(this.IDElementoRotulo, true);
            if (elemento instanceof HTMLElement)
            {
                elemento.innerHTML = value;
            }
        }

        public readonly Celulas = new List<Celula>();

        public constructor(controlePai: ColunasColecao, idElemento: string, templateColuna: TemplateColuna)
        {
            super(controlePai, idElemento, templateColuna);

            this.Propriedade = templateColuna.Propriedade;
            this.CaminhoPropriedade = templateColuna.CaminhoPropriedade;

            this.IsPropriedadeEntidade = (this.Propriedade instanceof r.Propriedade) ? (this.Propriedade.TipoDeclarado instanceof r.TipoEntidade) : false;
            this.IsAdicionarElementoConteudoApresentacao = false;
            this.Template.SetColuna(this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarEventoPropriedadeApresentacaoAlterada(AtributosHtml.Visibilidade, this.Coluna_VisiblidadeAlterada);
            this.Visibilidade = this.TemplateColuna.Coluna.Visibilidade;
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (this.Propriedade instanceof r.Propriedade)
            {
                EstiloUtil.AdicionarCssClasse(this.Elemento, this.RetornarCssClasse());
            }
        }

        public override RetornarElementoDestino(): HTMLElement
        {
            return ElementoUtil.RetornarElemento(this.ColunasColecao.IDElementoDestino);
        }

        //#region Css 
         
        protected RetornarCssClasse(): string
        {
            if (!u.ReflexaoUtil.TipoRetronarTipoNumerico(this.Propriedade.Tipo))
            {
                return "";
            }
            return String.Empty;
        }
        //#endregion

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento()
        {
            return "th";
        }

        //#endregion

        //#region Métodos privados

        private Coluna_VisiblidadeAlterada()
        {
            /*this.Visibilidade = this.TemplateColuna.Coluna.Visibilidade;*/

        }

        protected RetornarRotulo(): string
        {
            if (!String.IsNullOrWhiteSpace(this.TemplateColuna.Rotulo) && (!u.ValidacaoUtil.IsBind(this.TemplateColuna.Rotulo)))
            {
                return this.TemplateColuna.Rotulo;
            }

            if (this.Propriedade instanceof r.Propriedade)
            {
                return u.GlobalizacaoUil.RetornarRotuloPropriedade(this.Propriedade);
            }

            return String.Empty;
        }
        //#endregion
    }
}