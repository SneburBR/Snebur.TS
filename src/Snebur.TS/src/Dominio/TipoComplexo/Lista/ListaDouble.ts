namespace Snebur.Dominio
{
    export class ListaDouble extends BaseListaTipoComplexo<number>
    {

        public constructor();
        public constructor(lista: List<number>)
        public constructor(lista?: List<number> )
        {
            super(lista);
        }

        public Clone(): ListaDouble
        {
            return new ListaDouble(this.ListaInterna);
        }

        public Equals(obj: ListaDouble): boolean
        {
            if (obj instanceof ListaDouble)
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