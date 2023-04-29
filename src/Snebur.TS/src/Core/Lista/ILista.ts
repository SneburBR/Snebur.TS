namespace Snebur
{
    /*eslint-disable*/
    export interface ILista<T = any>
    {
        readonly TipoLista: EnumTipoLista;
        readonly IsListaNova: boolean;

        /**
         * Define o status para lista nova, IsListaNova = true
         * @param isListaNova
         */
        Clear(isListaNova: boolean): void;
    }
}
