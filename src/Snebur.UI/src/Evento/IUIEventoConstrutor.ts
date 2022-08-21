
namespace Snebur.UI
{
    export declare type UIEventoHandler = (provedor: any, e: UIEventArgs | EventArgs) => void;
    export declare type UIEventoHandlerAsync = (provedor: any, e: UIEventArgs | EventArgs) => Promise<void>;

    export interface IUIEventoConstrutor
    {
        new(controlePai: BaseControle, elemento: HTMLElement): Snebur.UI.UIEvento
    }
}
