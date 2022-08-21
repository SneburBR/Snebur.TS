namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoCpfAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoCpfAttribute.prototype.RetornarMensagemValidacao = function (this: ValidacaoCpfAttribute, paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoCpfAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };
    ValidacaoCpfAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            const cpfSemFormatacao = u.TextoUtil.RetornarSomenteNumeros(valorPropriedade);
            return u.ValidacaoUtil.IsCpf(cpfSemFormatacao);
        }
        return true;

    };
}