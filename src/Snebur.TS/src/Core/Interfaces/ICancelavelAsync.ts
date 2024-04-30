namespace Snebur
{
    export interface ICancelavelAsync
    {
        readonly IsCancelado: boolean;
        CancelarAsync(): void;
    }
}

