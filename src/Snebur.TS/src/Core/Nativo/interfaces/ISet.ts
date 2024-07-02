interface Set<T> extends Snebur.Nativo.ISet<T>
{

}


namespace Snebur.Nativo
{
    export interface ISet<T>
    {
        readonly Count: number
        AddRange(itens: Array<any>): void;
        AddRange(itens: Set<any>): void;
        AddRangeNew(itens: Array<any>): void;
        AddRangeNew(itens: Set<any>): void;
        Clear(): void;
    }
}
