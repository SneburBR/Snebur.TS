namespace Snebur.UI
{
    export class CelulaExibirDetalhes extends Celula
    {
        public get TemplateColunaExibirDetalhes(): TemplateColunaExibirDetalhes
        {
            return (this.TemplateColunaExibirDetalhes as TemplateColunaExibirDetalhes);
        }
        public constructor(controlePai: BaseControle, idElemento: string, coluna:Coluna, template: TemplateColunaExibirDetalhes)
        {
            super(controlePai, idElemento, coluna, template);
        }

        public get DataLista(): DataLista
        {
            return this.RetornarControlePai<DataLista>(DataLista);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Elemento.style.width = (50).ToRems();
            //this.Elemento.style.backgroundColor = 'white';
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            return super.NormalizarHtmlInterno(htmlInterno);
        }


        protected BtnExpandir_Click(botao: ui.Botao, e: UIEventArgs)
        {
            if (botao instanceof ui.BaseUIElemento)
            {
                this.DataLista.ExpandirLinhaDatalhes(botao, e, botao);
            }
        }
    }
}