namespace Snebur.UI
{
    export class EventoItemSelecionadoAlterado extends EventoControleHandler
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ItemSelecionadoAlterado, "");
            this.AdicionarManipuladorNoControlePai();
        }

        private AdicionarManipuladorNoControlePai()
        {
            if (this.ControlePai instanceof ComboBox)
            {
                this.ControlePai.EventoValorAlterado.AddHandler(this.Controle_ItemSelecionadoAlterado, this);
                return;
            }

            if (this.ControlePai instanceof PainelListaSelecao)
            {
                this.ControlePai.EventoItemSelecionadoAlterado.AddHandler(this.Controle_ItemSelecionadoAlterado, this);
                return;
            }

            throw new ErroNaoSuportado("o controle não é suportado", this);
        }

        private Controle_ItemSelecionadoAlterado(proverdor: any, e: ItemEventArgs<any>): void
        private Controle_ItemSelecionadoAlterado(proverdor: any, e: ValorAlteradoEventArgs<any>): void
        private Controle_ItemSelecionadoAlterado(proverdor: any, e: ItemEventArgs<any> | ValorAlteradoEventArgs<any>): void
        {
            this.Manipulador(proverdor, e as any);
        }

        public override ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            this.Manipulador(this.ControlePai, new UIEventArgs(this.Elemento, this.RetornarParametros(), domEvent));
        }
    }
}