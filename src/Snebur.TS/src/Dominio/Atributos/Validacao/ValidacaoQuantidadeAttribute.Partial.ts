namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoQuantidadeAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, rotuloControle?: string): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoQuantidadeAttribute.prototype.RetornarMensagemValidacao = function (
        paiPropriedade: any,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any,
        rotuloControle?: string): string
    {
        const rotuloPropriedade = rotuloControle?.toLowerCase() ?? u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoRequeridoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade.toLowerCase());
        return mensagemValidacao;
    };

    ValidacaoQuantidadeAttribute.prototype.IsValido = function (
        paiPropriedade: Snebur.Dominio.BaseDominio,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any): boolean
    {
        if (valorPropriedade == null)
            return false;

        if (!ValidacaoUtil.IsNumber(valorPropriedade, true))
            return false;

        return u.ConverterUtil.ParaNumero(valorPropriedade) >= 0;
    };
}