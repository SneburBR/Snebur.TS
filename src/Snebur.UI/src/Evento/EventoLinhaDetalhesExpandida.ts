namespace Snebur.UI
{
    export class EventoLinhaDetalhesExpandida<TItem> extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.LinhaDetalhesExpandida, "");
            this.AdicionarManipuladorNoControlePai();
        }

        private AdicionarManipuladorNoControlePai()
        {
            if (this.ControlePai instanceof DataLista)
            {
                this.ControlePai.EventoLinhaDetalhesExpandida.AddHandler(this.DataLista_LinhaDetalhesExpandida, this);
                return;
            }
            throw new ErroNaoSuportado("o controle não é suportado", this);
        }

        private DataLista_LinhaDetalhesExpandida(proverdor: any, e: LinhaDetalhesExpandidaEventArgs<TItem>): void
        {
            this.Manipulador(proverdor, e);
        }

        //public ManipuladorkEventListenerDom(domEvent: UIEvent)
        //{
        //    this.Manipulador(this.ControlePai, new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent));
        //}
    }
}