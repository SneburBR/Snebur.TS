namespace Snebur
{
    export interface IInicializacaoAsync
    {
        readonly IsInicializado: boolean;
        InicializarAsync(): Promise<void>;
    }
 
}

