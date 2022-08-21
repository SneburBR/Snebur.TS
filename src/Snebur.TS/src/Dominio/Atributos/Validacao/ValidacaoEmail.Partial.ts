namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoEmailAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;

        IsNaoValidarSugestaoEmail : boolean;

    }
    ValidacaoEmailAttribute.prototype.RetornarMensagemValidacao = function (this: ValidacaoEmailAttribute, paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        if (u.ValidacaoUtil.IsEmail(valorPropriedade))
        {
            const dominio = u.EmailUtil.RetornarDominio(valorPropriedade);
            const [isDigitouErrado, dominioCorreto] = u.EmailUtil.IsDominioDigitadoErrado(dominio);
            if (isDigitouErrado)
            {
                return `'${dominio}' inválido talvez seja '${dominioCorreto}'`;
            }
            return `O domínio '${dominio}' não é valido.`;
        }

        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoEmailAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };

    ValidacaoEmailAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            if (u.ValidacaoUtil.IsEmail(valorPropriedade))
            {
                if (!this.IsNaoValidarSugestaoEmail)
                {
                    const dominio = u.EmailUtil.RetornarDominio(valorPropriedade);
                    const isDigitouErrado = u.EmailUtil.IsDominioDigitadoErrado(dominio, true);
                    return !isDigitouErrado;
                }
                return true;
            }
            return false;
        }
        return true;

    };
}