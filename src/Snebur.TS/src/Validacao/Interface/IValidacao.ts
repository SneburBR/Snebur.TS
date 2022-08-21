namespace Snebur
{
    export interface IValidacao extends IBaseValidacao
    {
        IsValido(paiPropriedade: ObjetoControladorPropriedade, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
}
 