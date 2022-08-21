namespace Snebur.UI
{
    export interface IControleSelecionado extends BaseControle, ISelecionado
    {

    }

    export interface IControleSomenteLeitura extends BaseControle 
    {
        IsSomenteLeitura: boolean;
    }
}
