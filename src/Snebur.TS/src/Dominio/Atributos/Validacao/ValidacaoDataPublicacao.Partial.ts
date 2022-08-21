namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoDataPublicacaoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoDataPublicacaoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoDataPublicacaoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };

    ValidacaoDataPublicacaoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (paiPropriedade instanceof d.Entidade)
            {
                if (u.ValidacaoUtil.IsDataValida(valorPropriedade))
                {
                    if (paiPropriedade.Id === 0 || (propriedade instanceof r.Propriedade &&
                        paiPropriedade.__PropriedadesAlteradas.ContainsKey(propriedade.Nome)))
                    {
                        return valorPropriedade >= new Date().DataZeroHora;
                    }
                    return true;
                }
                return false;
            }
        }

        return true;

    };
}