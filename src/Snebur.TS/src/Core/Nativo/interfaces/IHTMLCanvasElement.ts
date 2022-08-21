interface HTMLCanvasElement extends Snebur.Nativo.IHTMLCanvasElement
{

}

namespace Snebur.Nativo
{
    export interface IHTMLCanvasElement
    {
        //BaseToBlob: (callback: (result: Blob | null) => void, type?: string, ...arguments: any[]) => void
        ToBlobAsync(formato: u.EnumMimeTypeImagemString, qualidade: number): Promise<Blob | null>;

        //toBlob(callback: (blob: Blob) => void, formato: d.EnumFormatoImagem, qualidade: number): void;
        //toBlob(callback: (result: Blob | null) => void, type?: string, ...arguments: any[]): void;

    }
}
