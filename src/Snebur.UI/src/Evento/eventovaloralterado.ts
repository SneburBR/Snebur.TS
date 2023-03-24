namespace Snebur.UI
{
    export class EventoValorAlterado extends BaseEventoValorAlterado
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ValorAlterado, ui.EnumEventoDom.Change);

            this.AdicionarEventoDEBUG(controlePai);

            if (!((controlePai as IControleEventoValorAlterado<any>).EventoValorAlterado instanceof Evento))
            {
                throw new ErroNaoSuportado("controle  pai não implementa  IControleEventoValorAlterado", this);
            }
            (controlePai as IControleEventoValorAlterado<any>).EventoValorAlterado.AddHandler(this.Controle_ValorAlterado, this);
        }

        private AdicionarEventoDEBUG(controlePai: BaseControle)
        {
            if (Snebur.$Configuracao.IsDebug)
            {
                if (controlePai instanceof CaixaSlider)
                {
                    if (controlePai.Nome === "SliderDesfoque")
                    {
                        controlePai.EventoValorAlterado.
                            EventoManipuladoresAlterado_DEBUG.AddHandler(this.EventoValorAlterado_ManipuladoresAlterado, this)
                    }

                }
            }
        }

        private EventoValorAlterado_ManipuladoresAlterado(provedor: any, e: ItemAlteradoEventArgs)
        {
            const xx = e.Item;
        }
    }
}
