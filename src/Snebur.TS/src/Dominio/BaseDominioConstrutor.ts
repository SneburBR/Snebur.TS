
namespace Snebur.Dominio
{
    export interface BaseDominioConstrutor<T extends BaseDominio = BaseDominio>
    {
        //(): BaseDominio;
        new (): T;
        prototype: T;
    }
}