namespace Snebur
{
    export interface IBaseValidacao
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        readonly TipoValidacao: EnumTipoValidacao;

        readonly IsAlerta?: boolean;

        IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean> | boolean;

        UltimaMensagemValidacao?: string;

        readonly IsForcando?: boolean;
    }
}
