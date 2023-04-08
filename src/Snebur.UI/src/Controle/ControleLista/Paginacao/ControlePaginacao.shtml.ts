namespace Snebur.UI
{
    export class ControlePaginacao extends BaseControlePaginacao
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
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
         
        private BtnPaginacao_Click(botao: ui.Botao, e: UIEventArgs): void
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

        private BtnLimite_Click(botao: ui.Botao, e: UIEventArgs): void
        {
            const limite = u.ConverterUtil.ParaInteiro(e.Parametros.Item("Limite"));
            this.RegistroPorPagina = limite;
            this.AtualizarPaginacao();
            this.NotificarEventoPaginacaoAlterada();
        }

     
         
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

     
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface ControlePaginacao
	{
		readonly BtnPaginacaoVoltar: ui.Botao;
		readonly ControleListaPaginas: ui.ControleLista;
		readonly BtnPaginacaoAvancar: ui.Botao;
	}

	//#endregion

}