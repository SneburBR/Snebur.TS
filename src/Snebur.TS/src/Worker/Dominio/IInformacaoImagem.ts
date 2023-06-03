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
   }
}
