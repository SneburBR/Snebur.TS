namespace Snebur.Dominio
{

    export interface IEntidade extends Snebur.ObjetoControladorPropriedade
    {
        CloneSomenteId(): d.Entidade;
        CloneSomenteId<TEntidade extends Entidade>(): TEntidade;
        CloneSomenteId<TEntidade extends IEntidade>(): TEntidade;

        RetornarMelhorDescricao(): string;

        //Inicializar(): void;
    }
}