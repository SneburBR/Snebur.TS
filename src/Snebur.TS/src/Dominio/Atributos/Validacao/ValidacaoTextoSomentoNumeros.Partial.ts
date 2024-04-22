
namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoTextoSomentoNumerosAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;

    }

    ValidacaoTextoSomentoNumerosAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoTextoSomentoNumerosAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };

    ValidacaoTextoSomentoNumerosAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (this.IsAceitarPontosSinais)
            {
                return u.ValidacaoUtil.IsSomenteNumerosPontosSinais(valorPropriedade);
            }
            return u.ValidacaoUtil.IsSomenteNumeros(valorPropriedade);
        }
        return true;
    };
}

