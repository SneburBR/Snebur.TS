namespace Snebur
{
    export interface IEqualityComparer<T =any>
    {
        Equals(x: T, y: T): boolean;

        GetHashCode(obj: T): number;
    }
}
