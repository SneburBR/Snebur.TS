namespace Snebur
{
    Array.prototype.__RetornarTipo = function (): Snebur.Reflexao.BaseTipoLista
    {
        if (this.Count === 0)
        {
            return $Reflexao.TipoListaVazia;
        }
        else
        {
            return u.ReflexaoUtil.RetornarTipoItemLista(this);
        }
    };
    Array.prototype.GetType = function (): Snebur.Reflexao.BaseTipoLista
    {
        return this.__RetornarTipo();
    };
}