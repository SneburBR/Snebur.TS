namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoRequeridoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoRequeridoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, controle?: IRotulo): string
    {
        const rotuloPropriedade = controle?.Rotulo ?? u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade);
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoRequeridoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade.toLowerCase());
        return mensagemValidacao;
    };

    ValidacaoRequeridoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
        {
            if (propriedade.Tipo instanceof r.TipoPrimario)
            {
                const tipoPrimario = (propriedade.Tipo as r.TipoPrimario).TipoPrimarioEnum;
                return ValidacaoUtil.IsTipoPrimarioDefinido(valorPropriedade, tipoPrimario, true);
            }

            if (propriedade.Tipo instanceof r.TipoEntidade)
            {
                if (paiPropriedade instanceof d.Entidade)
                {
                    if (!u.ValidacaoUtil.IsDefinido(valorPropriedade))
                    {
                        const idChaveEstrangeira = u.EntidadeUtil.RetornarIdChaveEstrangeira(paiPropriedade, propriedade);
                        return idChaveEstrangeira > 0;
                    }
                }
                return (valorPropriedade instanceof Entidade);
            }
           
            if (propriedade.Tipo instanceof r.TipoEnum)
            {
                if (u.ValidacaoUtil.IsNumber(valorPropriedade))
                {
                    const construtorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(propriedade.Tipo);
                    return u.EnumUtil.IsDefindo(construtorEnum, u.ConverterUtil.ParaNumero(valorPropriedade));
                }
            }

            if (propriedade.Tipo instanceof r.TipoBaseDominio)
            {
                return valorPropriedade instanceof BaseDominio;
            }
        }
        return false;
    };
}