namespace Snebur.WebWorker
{
    export interface IMensageJpegDecoder
    {
        Arquivo: Blob,
        LarguraDestino: number;
        AlturaDestino: number;
        RotacaoExif: number;
        Recorte: IRecorte;
        DimensaoFoto: IDimensao;
        Qualidade: number;
    }

    export interface IRecorte
    {
        XScalar: number;
        YScalar: number;
        //LarguraBase: number;
        //AlturaBase: number;
        //LarguraFoto: number;
        //AlturaFoto: number;

    }

    export enum EnumEtapaDecoder
    {
        LeituraArquivo = 0,
        Decoder = 1,
        Resize = 2,
        Encoder = 3
    }

}
