namespace Snebur
{
    export interface IInformacaoImagem
    {
        IsImagem: boolean;
        Largura: number;
        Altura: number;
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
