namespace Snebur.Dominio
{
    export class ListaInt32 extends BaseListaTipoComplexo<number>
    {
        public constructor();
        public constructor(lista: List<number>)
        public constructor(lista?: List<number>)
        {
            super(lista);
        }

        public Clone(): ListaInt32
        {
            return new ListaInt32(this.ListaInterna);
        }

        public Equals(obj: ListaInt32): boolean
        {
            if (obj instanceof ListaInt32)
            {
                /*eslint-disable*/
                if (this == obj)
                {
                    return true;
                }
                return u.Util.IsArrayIgual(this.ListaInterna, obj.ListaInterna);
            }
            return false;
        }
    }
}