interface HTMLElement extends Snebur.Nativo.IHTMLElement, Snebur.IDisposable
{

}

interface HTMLInputElement extends Snebur.Nativo.IHTMLInputElement 
{
    disabled: boolean;
    inputmode: string;
}

interface HTMLImageElement extends Snebur.Nativo.IHTMLImageElement 
{

}
interface HTMLTableRowElement
{
    height: string;
}


namespace Snebur.Nativo
{
    export interface IHTMLElement
    {
        readonly Dimensao: d.Dimensao;
        readonly IsVisivel: boolean;

        ElementoApresentacao?: HTMLElement;
        Visibilidade: Snebur.UI.EnumVisibilidade | boolean;

        OcultarElemento(invisivel?: boolean): void;
        MostrarElemento(): void;
        Habilitar(): void;
        Desabilitar(): void;
        Clear(): void;

        RetornarValorEstiloComputado(expressao: (value: Snebur.UI.Estilo) => any): string;
        RetornarValorEstiloComputado(expressao: (value: Snebur.UI.Estilo) => any, valorPadrao: string): string;
        __OpacidadeVisivel?: number;
        __ComponenteApresentacao: Snebur.UI.ComponenteApresentacao;
    }

    export interface IHTMLInputElement
    {
        IsCapturandoMascara: boolean;
    }

    export interface IHTMLImageElement
    {
        /*TamanhoImagem: Snebur.Dominio.EnumTamanhoImagem;*/
        UrlImagem: string;
    }



}
