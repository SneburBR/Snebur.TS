namespace Snebur.UI
{
    export class LinhasColecaoOrdenacao<TItem extends d.IOrdenacaoEntidade> extends Snebur.UI.LinhasColecao<TItem>
    {
        public IsMovendoLinha: boolean = false;
        public LinhaMovendo: LinhaOrdenacao<TItem> = null;
        public LinhaReferenciaDestino: LinhaOrdenacao<TItem> = null;

        public get DataListaOrdenacao(): DataListaOrdenacao
        {
            return this.ControlePai as DataListaOrdenacao;
        }

        public constructor(
            controlePai: DataLista,
            idElemento: string,
            colunasColecao: ColunasColecao,
            template: TemplateColunasColecao,
            tipoItemLista: r.BaseTipo)
        {
            super(controlePai, idElemento, colunasColecao, template, tipoItemLista);
        }

        protected override RetornarNovaLinha(id: string, item: any): Linha<TItem>
        {
            return new LinhaOrdenacao(this, id, this.Template, item, this.DataLista.ManipuladorLinhaClick);
        }
    }
}