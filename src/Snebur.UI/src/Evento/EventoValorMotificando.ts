namespace Snebur.UI
{
    export class EventoValorMotificando extends BaseEventoValorAlterado
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ValorModificando, ui.EnumEventoDom.Input);

            if (!((controlePai as IControleEventoValorModificando<any>).EventoValorMotificando instanceof Evento))
            {
                throw new ErroNaoSuportado("controle  pai não implementa  EventoValorMotificando", this);
            }
            (controlePai as IControleEventoValorModificando<any>).EventoValorMotificando.AddHandler(this.Controle_ValorAlterado, this);
        }
    }
}
