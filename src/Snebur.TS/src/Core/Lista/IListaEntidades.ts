
namespace Snebur
{
    export interface IListaEntidades extends ILista
    {
        EntidadesRemovida: Array<Snebur.Dominio.IEntidade | Snebur.Dominio.Entidade>;
        EntidadesAdicionada: Array<Snebur.Dominio.IEntidade | Snebur.Dominio.Entidade>;
    }
}
