declare namespace MagickWasm
{
    export interface IMagickImage extends IDisposable
    {
        readFromCanvas(canvas: HTMLCanvasElement): void;
        writeToCanvas(canvas: HTMLCanvasElement): void;
    }
    export interface MagickImage  
    {
        readFromCanvas(canvas: HTMLCanvasElement): void;
        writeToCanvas(canvas: HTMLCanvasElement): void;

    }

    //export interface ImageMagickConstructor
    //{
    //    readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType): TReturnType;
    //    readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    //}
    
}