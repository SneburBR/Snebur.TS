
namespace Snebur.UI
{
    export interface IBindPropriedadeComumConstrutor
    {
        new(controlePai: BaseControle, elemento: Element, valorAtributo:string, nomePropriedade:string): Snebur.UI.BaseBind;
    }
}
