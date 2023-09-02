namespace Snebur.UI
{
    export class ColunaTexto extends Coluna
    {
        private _sentidoOrdenacao: EnumSentidoOrdenacaoColuna;
        public IsAtivarOrdenacao: boolean;

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

            this.IsAtivarOrdenacao = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsAtivarOrdenacao));

            if (this.IsAtivarOrdenacao)
            {
                this.SentidoOrdenacao = EnumSentidoOrdenacaoColuna.Nenhuma;

                ElementoUtil.AdicionarAtributo(this.Elemento,
                    AtributosHtml.Click,
                    "ColunaOrdenacao_Click");
            }
        }

        protected override RetornarHtmlInterno(): string
        {
            this.IDElementoRotulo = ElementoUtil.RetornarNovoIDElemento(this, "SPAN");
            const html = `<span id="${this.IDElementoRotulo}"> ${this.RetornarRotulo()} </span>`;
            if (this.IsAtivarOrdenacao)
            {
                return `<div class="sn-data-lista-div-ordenacao">${html}</div>`;
            }
            return html;
        }

        //#region Estilo Ordenação

        private AtualizarEstiloOrdenacao(): void
        {
            const cssClass = this.RetornarCssClasseOrdencao(this.SentidoOrdenacao);
            EstiloUtil.AdicionarCssClasse(this.IDElementoRotulo, cssClass);
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