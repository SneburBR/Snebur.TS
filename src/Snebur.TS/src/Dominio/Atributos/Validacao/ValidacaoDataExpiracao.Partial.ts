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
        const propriedadePublicacao = (paiPropriedade.GetType() as r.BaseTipo)?.RetornarPropriedade(this.NomePropriedadeDataPublicacao);
        if (propriedadePublicacao != null)
        {
            const rotuloPropriedadePublicacao = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedadePublicacao).toLowerCase();
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataExpiracaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_COMPOSTA, rotuloPropriedade, rotuloPropriedadePublicacao);
        }

        return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataExpiracaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
    };

    ValidacaoDataExpiracaoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (!u.InterfaceUtil.IsIEntidade(paiPropriedade))
            {
                console.error(`O pai da propriedade do tipo ${paiPropriedade?.GetType().Nome} não é uma implementa  interface IEntidade,
                               O ValidacaoDataExpiracaoAttribute deve pertence uma entidade ou implementar a Interface IEntidade em caso de ViewModel`);
                return false;
            }
            if (u.ValidacaoUtil.IsDataValida(valorPropriedade))
            {
                const dataExpiracao = valorPropriedade as Date;
                const atrubuto = this as ValidacaoDataExpiracaoAttribute;
                const propriedadeDataPublicacao = paiPropriedade.GetType().RetornarPropriedade(atrubuto.NomePropriedadeDataPublicacao);
                const dataPublicacao = u.ReflexaoUtil.RetornarValorPropriedade(paiPropriedade, propriedadeDataPublicacao);
                if (u.ValidacaoUtil.IsDataValida(dataPublicacao))
                {
                    return dataExpiracao.AddDays(1).DataZeroHora > dataPublicacao;
                }
            }
            return false;
        }
        return true;
    };
}