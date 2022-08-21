
namespace Snebur
{
    export class EventArgs
    {
        public static get Empty(): EventArgs
        {
            return new EventArgs();
        }
    }

    export class SelecionadoEventArgs extends EventArgs implements d.ISelecionado
    {
        public readonly IsSelecionado: boolean

        public constructor(isSelecionado: boolean)
        {
            super();
            this.IsSelecionado = isSelecionado;
        }
    }

}
