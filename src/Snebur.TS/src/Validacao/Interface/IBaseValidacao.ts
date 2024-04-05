namespace Snebur
{
    export interface IBaseValidacao
    {
        readonly TipoValidacao: EnumTipoValidacao;
        readonly IsAlerta?: boolean;
        readonly IsForcando?: boolean;

        UltimaMensagemValidacao?: string;

        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, rotulo?: string): string;

        IsValidoAsync(paiPropriedade: ObjetoControladorPropriedade, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean> | boolean;
    }
}
