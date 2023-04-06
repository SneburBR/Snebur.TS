namespace Snebur
{
    export interface IDisposable
    {
        Dispose(): void;
    }

    export interface IDisposableAsync
    {
        DisposeAsync(): Promise<void>;
    }

   
}

