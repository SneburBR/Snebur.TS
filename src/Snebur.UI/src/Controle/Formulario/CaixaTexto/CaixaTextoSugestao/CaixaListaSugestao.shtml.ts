
namespace Snebur.UI
{
    export class CaixaListaSugestao extends Snebur.UI.ControleFlutuante
    {
        public MargemFixa = 16;
        public AlturaItemSugestao: number = 30;

        private PosicaoSelecaoAtual: number = -1;

        public get CaixaTextoSugestao()
        {
            return this.RetornarControlePai(CaixaTextoSugestao);
        }

        protected override get LarguraInicial(): number
        {
            return this.CaixaTextoSugestao.ElementoCaixa.getBoundingClientRect().width;
        }

        protected override get AlturaInicial(): number
        {
            if (Array.isArray(this.DataSource))
            {
                return this.MargemFixa + (this.DataSource.length * this.AlturaItemSugestao);
            }
            return 0;
        }

        private get ItemBlocoAtual()
        {
            if (this.PosicaoSelecaoAtual >= 0)
            {
                return this.PainelLista.ItensBloco[this.PosicaoSelecaoAtual];
            }
            return null;
        }

        public get ItemAtual(): any
        {
            return this.ItemBlocoAtual?.ItemReferencia ?? null;
        }

        protected override RetornarElementoRelativo(): HTMLElement
        {
            return this.CaixaTextoSugestao.ElementoCaixa;
        }

        private get TotalItems()
        {
            return (this.DataSource as Array<any>).length ?? -1;
        }

        public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement | string) 
        {
            super(controlePai, refElemento);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
            this.DestinoControleFlutuante = ui.EnumDestinoControleFlutuante.Inferior;
            this._dataSource = null;
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.Elemento_MouseDown, this);
            this.AdicionarEventoDom(EnumEventoDom.MouseUp, this.Elemento_MouseUp, this);
        }

        private Elemento_MouseDown(e:MouseEvent)
        {
            this.CaixaTextoSugestao.DesativarBlur();
        }

        private Elemento_MouseUp(e: MouseEvent)
        {
            /*this.Fechar();*/
            this.LimparSelecao();
            this.Fechar();
        }

        private Controle_Carregado(provedor: any, e: EventArgs) 
        {
            //controle carregada
        }

        private BtnSelecionar_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            this.CaixaTextoSugestao.SelecionarSugestao(botao.DataSource);
            this.Fechar();
        }

        public LimparSelecao(): void
        {
            this.DeselecionarItemBlocoAtual();
            this.PosicaoSelecaoAtual = -1;
        }

        public Subir(): void
        {
            this.DeselecionarItemBlocoAtual();
            let proximaPosicao = this.PosicaoSelecaoAtual -1;
            if (proximaPosicao < 0)
            {
                proximaPosicao = this.TotalItems;
            }
            this.PosicaoSelecaoAtual = proximaPosicao;
            this.SelecionarItemBlocoAtual();
        }

        private SelecionarItemBlocoAtual()
        {
            const elemento = this.ItemBlocoAtual?.Elemento;
            if (elemento != null )
            {
                ui.EstiloUtil.AdicionarCssClasse(elemento, "sn-item-sugestao-selecionado");
            }
        }

        private DeselecionarItemBlocoAtual()
        {
            const elemento = this.ItemBlocoAtual?.Elemento;
            if (elemento != null)
            {
                ui.EstiloUtil.RemoverCssClasse(elemento, "sn-item-sugestao-selecionado");
            }
        }

        public Descer(): void
        {
            this.DeselecionarItemBlocoAtual();
            let proximaPosicao = this.PosicaoSelecaoAtual + 1;
            if (proximaPosicao >= this.TotalItems)
            {
                proximaPosicao = 0;
            }
            this.PosicaoSelecaoAtual = proximaPosicao;
            this.SelecionarItemBlocoAtual();
        }

        private RetornarDescricao(obj: any): any
        {
            const descricao = this.CaixaTextoSugestao.RetornarDescricaoSugestao(obj);
            if (!String.IsNullOrEmpty(this.CaixaTextoSugestao.UltimaPesquisa))
            {
                return u.HtmlUtil.BoldContent(descricao, this.CaixaTextoSugestao.UltimaPesquisa);
            }
            return descricao;
        }

        public override Fechar()
        {
            super.Fechar();
        }

       
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface CaixaListaSugestao
	{
		readonly PainelLista: ui.PainelLista;
	}

	//#endregion

}