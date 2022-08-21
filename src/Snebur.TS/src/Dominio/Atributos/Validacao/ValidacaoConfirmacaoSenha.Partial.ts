namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoConfirmacaoSenhaAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoConfirmacaoSenhaAttribute.prototype.RetornarMensagemValidacao = function (this: ValidacaoConfirmacaoSenhaAttribute, paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoConfirmacaoSenhaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade);
        return mensagemValidacao;
    };
    ValidacaoConfirmacaoSenhaAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            const atributo = this as ValidacaoConfirmacaoSenhaAttribute;
            if (paiPropriedade)
            {
                const senha = (paiPropriedade as any)[atributo.NomePropriedadeSenha];
                if (!String.IsNullOrEmpty(senha))
                {
                    const valido = senha === valorPropriedade;
                    return valido;
                }
            }
        }
        return true;

    };
}