namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoLongoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoLongAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoLongAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };
    ValidacaoLongAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (u.ValidacaoUtil.IsNumber(valorPropriedade))
            {
                const valorLongo = u.ConverterUtil.ParaInteiro(valorPropriedade);
                return ((valorLongo > Number.Int64MinValue) && (valorLongo < Number.Int64MaxValue));
            }
            return false;
        }
        return true;
    };
}