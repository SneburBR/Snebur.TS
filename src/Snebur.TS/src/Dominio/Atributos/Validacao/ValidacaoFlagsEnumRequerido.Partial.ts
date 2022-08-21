namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoFlagsEnumRequeridoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoFlagsEnumRequeridoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoFlagsEnumRequeridoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };

    ValidacaoFlagsEnumRequeridoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio,
        propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (propriedade.Tipo instanceof r.TipoEnum)
            {
                const construtorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(propriedade.Tipo.CaminhoTipo);
                return ValidacaoUtil.IsFlagsEnumDefinida(construtorEnum, valorPropriedade);
            }
        }

        return true;

    };
    
}