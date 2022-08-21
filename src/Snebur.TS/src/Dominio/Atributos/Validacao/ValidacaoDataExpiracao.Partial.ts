namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoDataExpiracaoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoDataExpiracaoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataExpiracaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };

    ValidacaoDataExpiracaoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (paiPropriedade instanceof d.Entidade)
            {
                if (u.ValidacaoUtil.IsDataValida(valorPropriedade))
                {
                    const dataExpiracao = valorPropriedade;
                    const atrubuto = this as ValidacaoDataExpiracaoAttribute;
                    const propriedadeDataPublicacao = paiPropriedade.GetType().RetornarPropriedade(atrubuto.NomePropriedadeDataPublicacao);
                    const dataPublicacao = u.ReflexaoUtil.RetornarValorPropriedade(paiPropriedade, propriedadeDataPublicacao);
                    if (u.ValidacaoUtil.IsDataValida(dataPublicacao))
                    {
                        return dataExpiracao > dataPublicacao;
                    }
                }
                return false;
            }
        }
        return true;

    };
}