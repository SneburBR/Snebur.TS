
namespace Snebur.Nativo
{
    export class StopPropagationEventArgs extends EventArgs
    {
        public readonly EventoNativo: Event;
        public ContinarPropagacao: boolean = false;;

        public constructor(eventoNativo: Event)
        {
            super();
            this.EventoNativo = eventoNativo;
        }
    }
}
