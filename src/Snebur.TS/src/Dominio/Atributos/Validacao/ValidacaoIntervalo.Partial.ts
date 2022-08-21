namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoIntervaloAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoIntervaloAttribute.prototype.RetornarMensagemValidacao = function (this: ValidacaoIntervaloAttribute, aiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoIntervaloAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade, this.Minimo.ToString(), this.Maximo.ToString());
        return mensagemValidacao;
    };
    ValidacaoIntervaloAttribute.prototype.IsValido = function (this: ValidacaoIntervaloAttribute, paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (u.ValidacaoUtil.IsNumber(valorPropriedade, true))
            {

                return (valorPropriedade >= this.Minimo && valorPropriedade <= this.Maximo);
            }
            return false;
        }
        return true;
    };
}