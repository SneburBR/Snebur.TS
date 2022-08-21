namespace Snebur.UI
{
    export class ColunaTexto extends Coluna
    {
        private _ordenacao: EnumOrdenacaoColuna;
        private IDElementoSpanOrdenacao: string;

        public IsOrdenacaoAtiva: boolean;

        public get Ordenacao(): EnumOrdenacaoColuna
        {
            return this._ordenacao;
        }

        public set Ordenacao(value: EnumOrdenacaoColuna)
        {
            this._ordenacao = value;
            this.AtualizarEstiloOrdenacao();
        }

        public override get  ColunasColecao(): ColunasColecao
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

            this.IsOrdenacaoAtiva = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.AtivarOrdenacao));

            if (this.IsOrdenacaoAtiva)
            {
                this.Ordenacao = EnumOrdenacaoColuna.Nenhuma;

                ElementoUtil.AdicionarAtributo(this.IDElemento,
                    AtributosHtml.Click,
                    "ColunaOrdenacao_Click");
            }
        }

        protected override RetornarHtmlInterno(): string
        {
            this.IDElementoRotulo = ElementoUtil.RetornarNovoIDElemento(this, "SPAN");
            const html = `<span id="${this.IDElementoRotulo}"> ${this.RetornarRotulo()} </span>`;
            if (this.IsOrdenacaoAtiva)
            {
                return `<div class="sn-data-lista-div-ordenacao">${html}</div>`;
            }
            return html;
        }

        //#region Estilo Ordenação

        private AtualizarEstiloOrdenacao(): void
        {
            this.RemoverTodosEstiloOrdencao();
            EstiloUtil.AdicionarCssClasse(this.IDElementoRotulo, this.RetornarCssClasseOrdencao(this.Ordenacao));
        }

        private RemoverTodosEstiloOrdencao(): void
        {
            const classes = new Array<string>();
            classes.Add(this.RetornarCssClasseOrdencao(EnumOrdenacaoColuna.Nenhuma));
            classes.Add(this.RetornarCssClasseOrdencao(EnumOrdenacaoColuna.Crescente));
            classes.Add(this.RetornarCssClasseOrdencao(EnumOrdenacaoColuna.Decrescente));

            const juntar = String.Join(" ", classes);
            EstiloUtil.RemoverCssClasse(this.IDElementoRotulo, juntar);
        }

        private RetornarCssClasseOrdencao(ordenacao: EnumOrdenacaoColuna): string
        {
            switch (ordenacao)
            {
                case (EnumOrdenacaoColuna.Nenhuma):

                    return "sn-data-lista-coluna-ordenacao-nenhuma";

                case (EnumOrdenacaoColuna.Crescente):

                    return "sn-data-lista-coluna-ordenacao-crescente";

                case (EnumOrdenacaoColuna.Decrescente):

                    return "sn-data-lista-coluna-ordenacao-decrescente";

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