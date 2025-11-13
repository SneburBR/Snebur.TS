namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoDataFimAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoDataFimAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const propriedadePublicacao = (paiPropriedade.GetType() as r.BaseTipo)?.RetornarPropriedade(this.NomePropriedadeDataInicio);
        if (propriedadePublicacao != null)
        {
            const rotuloPropriedadePublicacao = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedadePublicacao).toLowerCase();
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataExpiracaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_COMPOSTA, rotuloPropriedade, rotuloPropriedadePublicacao);
        }

        return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataExpiracaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
    };

    ValidacaoDataFimAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        const dataFim = valorPropriedade;
        if (String.IsNullOrWhiteSpace((dataFim)) || !u.ValidacaoUtil.IsDataValida(valorPropriedade))
        {
            return true;
        }

        const atrubuto = this as ValidacaoDataFimAttribute;
        const dataInicio = (paiPropriedade as any)[atrubuto.NomePropriedadeDataInicio];
        if (dataInicio === undefined)
        {
            console.error(`A propriedade ${atrubuto.NomePropriedadeDataInicio} não foi encontrada na entidade do tipo ${paiPropriedade?.GetType().Nome}`);
        }

        if (!u.ValidacaoUtil.IsDataValida(dataInicio))
        {
            return true;
        }
        return dataFim.AddDays(1).DataZeroHora > dataInicio;
    };
}