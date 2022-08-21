
namespace Snebur.UI
{
    export interface IBindConstrutor<TBind extends Snebur.UI.BaseBind = Snebur.UI.BaseBind>
    {
        new(controlePai: BaseControle, elemento: Element, valorAtributo: string): TBind;
    }
}
