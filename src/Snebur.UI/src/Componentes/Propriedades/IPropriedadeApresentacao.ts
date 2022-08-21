namespace Snebur.UI
{
    export interface IPropriedadeApresentacao<TValor = any>
    {
        NomePropriedade: string;

        IsRedundante: boolean;

        Atualizar(componenteApresentacao: ComponenteApresentacao): void;

        RetornarValor(componenteApresentacao: ComponenteApresentacao): TValor;

        AtribuirValor(componenteApresentacao: ComponenteApresentacao, valor: TValor): void;
    }
}
