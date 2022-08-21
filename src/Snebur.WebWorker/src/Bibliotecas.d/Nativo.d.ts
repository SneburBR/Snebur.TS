interface Window
{
    postMessage(message: any);
    
}

declare function parseInt(args: number): number;

interface IDimensao
{
    Largura: number;
    Altura: number;
}

interface IRecorte
{
    XScalar: number;
    YScalar: number;
}

interface IWorkerMensagemDecoder
{

}