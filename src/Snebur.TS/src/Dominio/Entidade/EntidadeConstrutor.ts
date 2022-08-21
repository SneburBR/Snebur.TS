
namespace Snebur.Dominio
{
    export interface EntidadeConstrutor<TEntidade extends Entidade = Entidade>
    {
        new(): TEntidade;
        prototype: TEntidade;
    }
}