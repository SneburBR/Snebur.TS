namespace Snebur.UI
{
    export abstract class Coluna extends BaseItemTemplate<TemplateColuna> implements IControleRotulo
    {
        private _elementoRotulo: HTMLElement;
        private _rotulo: string;

        /*@internal*/
        public BindRotulo: BindPropriedadeComum;
        /*@internal*/
        public IsExisteBindRotulo: boolean = false;
        /*@internal*/
        public IsRotuloVazio: boolean = false;
        /*@internal*/
        public IsRotuloHtmlInterno: boolean = true;

        public RotuloApresentacao: string;

        protected _idElementoRotulo: string;
        protected _idElementoDivOrdenacao: string;

        public readonly Propriedade: r.Propriedade;
        public readonly CaminhoPropriedade: string;
        public readonly IsPropriedadeEntidade: boolean;

        public get IDElementoDivOrdenacao(): string
        {
            return this._idElementoDivOrdenacao;
        }

        public get TemplateColuna(): TemplateColuna
        {
            return this.Template;
        }

        public get ColunasColecao(): ColunasColecao
        {
            return this.ControlePai as ColunasColecao;
        }

        public get ElementoRotulo(): HTMLElement
        {
            if (!(this._elementoRotulo instanceof HTMLElement))
            {
                this._elementoRotulo = document.getElementById(this._idElementoRotulo);
            }
            return this._elementoRotulo;
        }

        public get Rotulo(): string
        {
            return this._rotulo ?? this.ElementoRotulo?.innerHTML ?? String.Empty;
        }
        public set Rotulo(value: string)
        {
            if (this.ElementoRotulo instanceof HTMLElement)
            {
                this.ElementoRotulo.innerHTML = value;
            }
            this._rotulo = value;
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

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (this.Propriedade instanceof r.Propriedade)
            {
                EstiloUtil.AdicionarCssClasse(this.IDElementoDivOrdenacao, this.RetornarCssClasse());
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.InicializarBindRotulo();
            this.AtualizarRotulo(true);
            this.AtualizarRotuloApresentacao();

            this.AdicionarEventoPropriedadeApresentacaoAlterada(
                AtributosHtml.Visibilidade,
                this.Coluna_VisiblidadeAlterada);

            this.Visibilidade = this.TemplateColuna.Coluna.Visibilidade;
        }

        public override RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any = null, isAceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): string
        {
            elemento = elemento ?? this.TemplateColuna.Elemento;
            if (elemento == null)
            {
                return valorPadrao;
            }
            return super.RetornarValorAtributo(atributo, valorPadrao, isAceitarBind, elemento);
        }

        protected InicializarBindRotulo(): void
        {
            ControleRotuloUtil.InicializarBindRotulo(this);
        }

        protected AtualizarRotulo(isInicializar: boolean)
        {
            ControleRotuloUtil.AtualizarRotulo(this, isInicializar);
        }


        public RetornarRotulo(): string
        {
            const xx = this.RetornarRotuloObsoleto();
            return ControleRotuloUtil.RetornarRotulo(this);
        }

        protected RetornarRotuloObsoleto(): string
        {
            if (!String.IsNullOrWhiteSpace(this.TemplateColuna.Rotulo) &&
                (!u.ValidacaoUtil.IsBind(this.TemplateColuna.Rotulo)))
            {
                return this.TemplateColuna.Rotulo;
            }

            if (this.Propriedade instanceof r.Propriedade)
            {
                return u.GlobalizacaoUil.RetornarRotuloPropriedade(this.Propriedade);
            }

            return String.Empty;
        }

        /*@internal*/
        public RetornarRotuloInterno(): string
        {
            return ControleRotuloUtil.RetornarRotuloInterno(this);
        }

        protected AtualizarRotuloApresentacao(): void
        {
            const propriedadeRorutloApresetancao = this.MapeamentoPropriedadeApresentacao.DicionarioPropriedades.TryItem(this.RetornarNomePropriedade(x => x.RotuloApresentacao));
            if (!(propriedadeRorutloApresetancao instanceof PropriedadeRotuloApresentacao))
            {
                throw new Erro(`A propriedade rotulo apresentação não foi mapeada para o tipo ${this.GetType().Nome}`);
            }
            propriedadeRorutloApresetancao.Atualizar(this);
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


        //#endregion
    }
}