
namespace Snebur.Dominio
{
    export interface EntidadeConstrutor<TEntidade extends IEntidade = Entidade>
    {
        new(): TEntidade;
        prototype: TEntidade;
    }
}