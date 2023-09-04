namespace Snebur.UI
{
    export class ColunaTexto extends Coluna
    {
        private _isAtivarOdernacao: boolean;
        private _sentidoOrdenacao: EnumSentidoOrdenacaoColuna;

        public get IsAtivarOrdenacao(): boolean
        {
            return this._isAtivarOdernacao;
        }

        public get SentidoOrdenacao(): EnumSentidoOrdenacaoColuna
        {
            return this._sentidoOrdenacao;
        }

        public set SentidoOrdenacao(value: EnumSentidoOrdenacaoColuna)
        {
            this._sentidoOrdenacao = value;
            this.AtualizarEstiloOrdenacao();
        }

        public override get ColunasColecao(): ColunasColecao
        {
            return this.ControlePai as ColunasColecao;
        }

        public constructor(controlePai: ColunasColecao, idElemento: string, template: TemplateColuna)
        {
            super(controlePai, idElemento, template);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this._isAtivarOdernacao = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsAtivarOrdenacao));
            if (this.IsAtivarOrdenacao)
            {
                const elementoRotulo = ElementoUtil.RetornarElemento(this.IDElementoRotulo, true);
                elementoRotulo.remove();
                this._idElementoDivOrdenacao = ElementoUtil.RetornarNovoIDElemento(this, "div");
                const div = document.createElement("div");
                div.className = "sn-data-lista-div-ordenacao";
                div.id = this.IDElementoDivOrdenacao;
                div.appendChild(elementoRotulo);
                this.Elemento.appendChild(div);
                this.SentidoOrdenacao = this.RetornarValorAtributoEnum(EnumSentidoOrdenacaoColuna, AtributosHtml.SentidoOrdenacao, EnumSentidoOrdenacaoColuna.Nenhuma);
                ElementoUtil.AdicionarAtributo(this.Elemento,
                    AtributosHtml.Click,
                    "ColunaOrdenacao_Click");
            }
        }

        protected override RetornarHtmlInterno(atributos: DicionarioSimples<string>): string
        {
            this._idElementoRotulo = ElementoUtil.RetornarNovoIDElemento(this, "SPAN");
            return `<span id="${this.IDElementoRotulo}"> ${this.RetornarRotulo()} </span>`;
        }

        //#region Estilo Ordenação

        private AtualizarEstiloOrdenacao(): void
        {
            const cssClass = this.RetornarCssClasseOrdencao(this.SentidoOrdenacao);
            EstiloUtil.AdicionarCssClasse(this.IDElementoDivOrdenacao, cssClass);
        }

        private RetornarCssClasseOrdencao(ordenacao: EnumSentidoOrdenacaoColuna): string
        {
            switch (ordenacao)
            {
                case (EnumSentidoOrdenacaoColuna.Nenhuma):

                    return "sn-data-lista-coluna-ordenacao--nenhuma";

                case (EnumSentidoOrdenacaoColuna.Crescente):

                    return "sn-data-lista-coluna-ordenacao--crescente";

                case (EnumSentidoOrdenacaoColuna.Decrescente):

                    return "sn-data-lista-coluna-ordenacao--decrescente";

                default:

                    throw new ErroNaoSuportado("A ordenação não é suportada", this);
            }
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            super.Dispose();
        }

        //#endregion
    }
}