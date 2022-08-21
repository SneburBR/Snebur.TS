namespace Snebur
{
    export class List<T> extends Array<T>
    {
        //private _tipoLista: EnumTipoLista;

        public constructor()
        {
            super();
            (this as any)["_tipoLista"] = EnumTipoLista.List;
        }
    }
}
