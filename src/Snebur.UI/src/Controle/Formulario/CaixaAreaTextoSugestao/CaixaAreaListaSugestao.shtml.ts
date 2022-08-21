
namespace Snebur.UI
{
    export class CaixaAreaListaSugestao extends Snebur.UI.ControleFlutuante
    {
        public MargemFixa = 16;
        public AlturaItemSugestao: number = 30;

        private PosicaoSelecaoAtual: number = -1;

        public get CaixaAreaTextoSugestao()
        {
            return this.RetornarControlePai(CaixaAreaTextoSugestao);
        }

        protected override get LarguraInicial(): number
        {
            return 200;
        }

        protected override get AlturaInicial(): number
        {
            if (Array.isArray(this.DataSource))
            {
                return this.MargemFixa + (this.DataSource.length * this.AlturaItemSugestao);
            }
            return 0;
        }

        protected override get DiferencaPosicaoY()
        {
            return 8;
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
            return this.CaixaAreaTextoSugestao.ElementoCaixa;
        }

        public get Itens(): Array<any>
        {
            return (this.DataSource as Array<any>);
        }

        private get TotalItems()
        {
            return this.Itens?.length ?? -1;
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

        protected override RetornarPosicaoElementoRelativo()
        {
            return this.CaixaAreaTextoSugestao.PosicaoListaSugestao as ClientRect;
        }

        private Elemento_MouseDown(e: MouseEvent)
        {
            this.CaixaAreaTextoSugestao.DesativarBlur();
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
            this.CaixaAreaTextoSugestao.AdicionarSugestao(botao.DataSource);
            this.Fechar();
        }

        public LimparSelecao(): void
        {
            this.DeselecionarItemBlocoAtual();
            this.PosicaoSelecaoAtual = -1;
        }

        public SelecionarPrimeiro()
        {
            this.PosicaoSelecaoAtual = 0;
            this.SelecionarItemBlocoAtual();
        }

        public Subir(): void
        {
            this.DeselecionarItemBlocoAtual();
            let proximaPosicao = this.PosicaoSelecaoAtual - 1;
            if (proximaPosicao < 0)
            {
                proximaPosicao = this.TotalItems -1;
            }
            this.PosicaoSelecaoAtual = proximaPosicao;
            this.SelecionarItemBlocoAtual();
            this.Completar();
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
            this.Completar();
        }

        public Completar(): void
        {
            const itemAtual = this.ItemAtual ?? this.Itens?.FirstOrDefault();
            if (itemAtual != null)
            {
                const descricao = this.CaixaAreaTextoSugestao.RetornarDescricaoSugestaoFormatada(itemAtual);
                this.CaixaAreaTextoSugestao.CompletarEspelho(descricao);
            }
        }

        private SelecionarItemBlocoAtual()
        {
            const elemento = this.ItemBlocoAtual?.Elemento;
            if (elemento != null)
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

       

        private RetornarDescricao(item: any): any
        {
            const descricao = this.CaixaAreaTextoSugestao.RetornarDescricaoSugestaoFormatada(item);
            if (!String.IsNullOrEmpty(this.CaixaAreaTextoSugestao.UltimaPesquisa))
            {
                return u.HtmlUtil.NegritarConteudo(descricao, this.CaixaAreaTextoSugestao.UltimaPesquisa);
            }
            return descricao;
        }

        public override Fechar()
        {
            super.Fechar();
        }


    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaAreaListaSugestao
    {
        readonly PainelLista: ui.PainelLista;
    }

    //#endregion

}