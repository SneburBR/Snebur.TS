namespace Snebur
{
    export interface IInformacaoImagem extends IDimensao
    {
        IsImagem: boolean;
        NomeArquivo: string;
        TotalBytes: number;
        Type?: string;
        Rotacao?: number;
        Tamanho?: string;
        Orientacao?: number;
        IsHeic?: boolean;
        IsIcone?: boolean;
        Url?: string;
        PerfilCor?: string;
        IsAlertaPerfilCor?: boolean;
        ColorSpace?: ColorSpaceData;
    }
}

enum ColorSpaceData
{
    RGB = "RGB",
    CMYK = "CMYK",
    GrayScale = "GrayScale",
    Desconhecido = "Desconhecido"
}