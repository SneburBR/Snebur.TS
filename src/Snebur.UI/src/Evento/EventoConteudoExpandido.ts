namespace Snebur.UI
{
    export class EventoConteudoExpandido<TItem> extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ConteudoExpandido, "");
            this.AdicionarManipuladorNoControlePai();
        }

        private AdicionarManipuladorNoControlePai()
        {
            if (this.ControlePai instanceof Expandir)
            {
                this.ControlePai.EventoConteudoExpandido.AddHandler(this.ControleExpandir_ConteudoExpandido, this);
                return;
            }
            throw new ErroNaoSuportado("o controle não é suportado", this);
        }

        private ControleExpandir_ConteudoExpandido(proverdor: any, e: ConteudoExpandidoEventArgs): void
        {
            this.Manipulador(proverdor, e);
        }
    }
}