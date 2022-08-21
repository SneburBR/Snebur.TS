namespace Snebur.Dominio
{
    export interface IEntidadeClonada extends IEntidade
    {
        ___IsEntidadeClonada: boolean;
        ___IsSalvarApenasPropriedades: boolean;
    }
}
