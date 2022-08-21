namespace Snebur.UI
{
    export interface IPaginaConstrutor<TPagina extends Snebur.UI.Pagina = Snebur.UI.Pagina>
    {
        new(controlePai: BaseControle): TPagina;
        new(controlePai: BaseControle, ...argumentos: any[]): TPagina;
    }
}