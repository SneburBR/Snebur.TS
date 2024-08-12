namespace Snebur.Dominio
{
    export interface IConstrutorImagem
    {
        new (arquivo: SnBlob, informacaoImagem: IInformacaoImagem): d.IImagem;
    }
}
