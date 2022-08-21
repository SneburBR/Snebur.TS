
namespace Snebur.UI
{
    export interface IAbstractControleConstrutor<TControle extends BaseControle = BaseControle> extends Function
    {
        prototype: TControle;
    }

    export interface IControleConstrutor<TControle extends BaseControle = BaseControle> extends Function
    {
        //constructor?(): TControle;
        //constructor?(controlePai: ): TControle;
        //constructor?(controlePai: BaseContBaseControlerole, ...argumentos: any[]): TControle;

        new(controlePai: BaseControle,...argumentos: any[]): TControle;
        prototype: TControle;
        RetornarConstrutor?(elemento: HTMLElement): IControleConstrutor;
        //new (controlePai: BaseControle, elemento: HTMLElement): Snebur.UI.BaseControle;
    }
}
