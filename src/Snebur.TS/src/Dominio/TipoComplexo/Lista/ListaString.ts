namespace Snebur.Dominio
{
    export class ListaString extends BaseListaTipoComplexo<string>
    {

        public constructor();
        public constructor(lista: List<string>)
        public constructor(lista?: List<string>)
        {
            super(lista);
        }

        public Clone(): ListaString
        {
            return new ListaString(this.ListaInterna);
        }

        public Equals(obj: ListaString): boolean
        {
            if (obj instanceof ListaString)
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