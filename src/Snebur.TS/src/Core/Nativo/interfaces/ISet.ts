interface Set<T> extends Snebur.Nativo.ISet<T>
{

}


namespace Snebur.Nativo
{
    export interface ISet<T>
    {
        AddRange(itens: Array<any>): void;
        AddRangeNew(itens: Array<any>): void;
        Clear(): void;
    }
}
