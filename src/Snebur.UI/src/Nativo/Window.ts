interface Window
{
    EventoStopPropagation: Snebur.Evento<Snebur.Nativo.StopPropagationEventArgs>;
    __ExpressoesBind: any;
}

window.__ExpressoesBind = {};
 
namespace Snebur.Nativo
{
    export class StopPropagationEventArgs extends EventArgs
    {
        public readonly EventoNativo: Event;
        public constructor(eventoNativo: Event)
        {
            super();
            this.EventoNativo = eventoNativo;
        }

    }
}

