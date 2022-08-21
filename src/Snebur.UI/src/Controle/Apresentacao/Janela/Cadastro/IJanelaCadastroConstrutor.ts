namespace Snebur.UI
{
    export interface IJanelaCadastroConstrutor
    {
        new (controlePai: BaseControle, entidade: d.Entidade): Snebur.UI.BaseJanelaCadastro;
        new (controlePai: BaseControle, tipoEntidade: r.TipoEntidade): Snebur.UI.BaseJanelaCadastro;
    }
}