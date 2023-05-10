namespace Snebur.UI
{
    export class EventoValorAlterado extends BaseEventoValorAlterado
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ValorAlterado, ui.EnumEventoDom.Change);
            if (!((controlePai as IControleEventoValorAlterado<any>).EventoValorAlterado instanceof Evento))
            {
                throw new ErroNaoSuportado("controle  pai não implementa  IControleEventoValorAlterado", this);
            }
            (controlePai as IControleEventoValorAlterado<any>).EventoValorAlterado.AddHandler(this.Controle_ValorAlterado, this);
        }
         
    }
}
