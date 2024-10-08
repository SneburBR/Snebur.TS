﻿namespace Snebur.UI
{
    export class ComboBoxNnItensSelecionado extends Snebur.UI.BaseControle
    {
        private static readonly CHAVE_SUBSTITUICAO_HTML_ITEM_TEMPLATE_SELECIONADO = "[[DESTINO_HTML_ITEM_TEMPLATE_SELECIONADO]]";

        public ItemTemplateSelecionado: ItemTemplateSelecionado;

        public ElementoItemTemplate: HTMLElement;

        public get ComboBox(): ComboBoxNn
        {
            return this.ControlePai as ComboBoxNn;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override RetornarHtmlInterno(atributos:DicionarioSimples): string
        {
            const htmlItemSelecionado = this.ComboBox.ItemTemplateSelecionado.Html;
            const htmlInterno = super.RetornarHtmlInterno(atributos);
            const retorno = htmlInterno.Replace(ComboBoxNnItensSelecionado.CHAVE_SUBSTITUICAO_HTML_ITEM_TEMPLATE_SELECIONADO, htmlItemSelecionado);
            return retorno;
        }

        protected override Inicializar()
        {
            super.Inicializar();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        public AtualizarItemTemplate(itemTemplateSelecionado: ItemTemplateSelecionado): void
        {
            this.ItemTemplateSelecionado = itemTemplateSelecionado;
        }

        public BtnRemover_Click(provedor: Botao, e: UIEventArgs): void
        {
            const mouseEvent = e.DomEvent as MouseEvent;

            mouseEvent.stopImmediatePropagation();
            mouseEvent.stopPropagation();

            const itemSelecionado = provedor.DataSource;
            (this.ControlePai as ComboBoxNn).RemoverItem(itemSelecionado);
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-comboBox-itens-selecionado";
        }
    }

	//#region Elementos da apresentação - código gerado automaticamente #

	export interface ComboBoxNnItensSelecionado
	{
		readonly ControleLista: ui.PainelLista;
		readonly BtnRemover: ui.Botao;
	}

	//#endregion

}