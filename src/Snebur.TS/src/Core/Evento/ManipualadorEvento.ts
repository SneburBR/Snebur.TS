

namespace Snebur.Core
{
    export class ManipuladorEvento<TEventArgs = EventArgs> implements IEquals
    {
        public readonly Manipulador: EventoHandler<TEventArgs>;
        public readonly ObjetoBind: any;

        public constructor(manipualdor: EventoHandler<TEventArgs>, objetoBind: any)
        {
            this.Manipulador = manipualdor;
            this.ObjetoBind = objetoBind;
        }

        public Equals(manipuladorEvento: ManipuladorEvento): boolean
        {
            if (manipuladorEvento != null)
            {
                if (manipuladorEvento.ObjetoBind != null)
                {
                    return this.Manipulador === manipuladorEvento.Manipulador &&
                        this.ObjetoBind === manipuladorEvento.ObjetoBind;
                }
                return this.Manipulador === manipuladorEvento.Manipulador;
            }
            return false;
        }
    }
}
