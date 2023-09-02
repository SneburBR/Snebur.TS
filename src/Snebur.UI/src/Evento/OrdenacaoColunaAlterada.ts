namespace Snebur.UI
{
    export class EventoOrdenacaoColunaAlterada extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.OrdenacaoColunaAlterada, "");
            this.AdicionarManipuladorNoControlePai();
        }

        private AdicionarManipuladorNoControlePai()
        {
            if (this.ControlePai instanceof DataLista)
            {
                this.ControlePai.EventoOrdenacaoColunaAlterada.AddHandler(this.DataLista_EventoOrdenacaoColunaAlterada, this);
                return;
            }
            throw new ErroNaoSuportado("o controle não é suportado", this);
        }

        private DataLista_EventoOrdenacaoColunaAlterada(proverdor: any, e: OrdenacaoColunaAlteradaEventArgs): void
        {
            this.Manipulador(proverdor, e);
        }
    }
}
