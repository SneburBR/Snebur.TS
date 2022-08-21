namespace Snebur.UI
{
    export interface IComponenteApresentacaoConstrutor<TApresentacao extends ComponenteApresentacao = ComponenteApresentacao> extends Function
    {
        new(controlePai: BaseControle, elemento: HTMLElement, componenteApresentacaoPai: ComponenteApresentacao): TApresentacao;
        prototype: TApresentacao;
    }
}
