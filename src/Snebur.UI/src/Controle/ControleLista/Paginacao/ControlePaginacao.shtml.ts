namespace Snebur.UI
{
    export class ControlePaginacao extends Snebur.UI.BaseControlePaginacao
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.EventoCarregado.AddHandler(this.ControlePaginacao_Carregado, this);
        }

        private ControlePaginacao_Carregado()
        {
            this.AtualizarPaginacao();
        }

        protected override Inicializar()
        {
            super.Inicializar();
        }

        protected override RetornarTagNovoElemento()
        {
            return "sn-controle-paginacao";
        }

        public override AtualizarPaginacao(): void
        {
            super.AtualizarPaginacao();
            this.AtualizarVisibilidadeBotaoAnterior();
            this.AtualizarVisibilidadeBotaoProximo();
        }

        public BtnPaginacao_Click(botao: ui.Botao, e: ui.UIEventArgs): void
        {
            const pagina = e.Parametros.Item("Pagina");
            if (pagina === "Proxima")
            {
                this.PaginaAtual += 1;
            }
            else if (pagina === "Anterior")
            {
                this.PaginaAtual -= 1;
            }
            else
            {
                this.PaginaAtual = u.ConverterUtil.ParaNumero(pagina);
            }
            this.AtualizarPaginacao();
            this.NotificarEventoPaginacaoAlterada();
        }

        //#region Visibilidades

        private AtualizarVisibilidadeBotaoAnterior(): void
        {
            if (this.PaginaAtual === 1)
            {
                this.BtnPaginacaoVoltar.Visibilidade = EnumVisibilidade.Invisivel;
            }
            else
            {
                this.BtnPaginacaoVoltar.Visibilidade = EnumVisibilidade.Visivel;
            }
        }

        private AtualizarVisibilidadeBotaoProximo(): void
        {
            if (this.PaginaAtual < this.TotalPaginas)
            {
                this.BtnPaginacaoAvancar.Visibilidade = EnumVisibilidade.Visivel;
            }
            else
            {
                this.BtnPaginacaoAvancar.Visibilidade = EnumVisibilidade.Invisivel;
            }
        }

        //#endregion

        private FormatarNumeroRegistros(totalRegistros: any, dataSource: any): any
        {
            if (typeof totalRegistros === "number")
            {
                if (totalRegistros === 0)
                {
                    return "Nenhum registro encontrado";
                }
                return `${totalRegistros} ${totalRegistros === 1 ? "registro" : "registros"}`;
            }
            return String.Empty;
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface ControlePaginacao
    {
        readonly BtnPaginacaoVoltar: ui.Botao;
        readonly ControleListaPaginas: ui.PainelLista;
        readonly BtnPaginacaoAvancar: ui.Botao;
    }

    //#endregion

  

}