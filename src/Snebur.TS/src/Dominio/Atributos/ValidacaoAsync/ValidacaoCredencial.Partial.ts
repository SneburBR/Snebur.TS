namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoCredencialAttribute
    {
        ResultadoValidacao: d.EnumResultadoValidacaoCredencial;

        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValidoAsync(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean> 
    }

    ValidacaoCredencialAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const atributo = this as ValidacaoCredencialAttribute;

        if (u.EnumUtil.IsDefindo(d.EnumResultadoValidacaoCredencial, atributo.ResultadoValidacao))
        {
            switch (atributo.ResultadoValidacao)
            {
                case d.EnumResultadoValidacaoCredencial.SenhaIncorreta:

                    return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoCredencialAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_SENHA_INCORRETA);

                case d.EnumResultadoValidacaoCredencial.UsuarioNaoExiste:

                    return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoCredencialAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_USUARIO_NAO_EXISTE);

                    /*return String.Empty;*/
                default:

                    throw new ErroNaoSuportado("O resultado da validação da credencial não é suportado", this);
            }
        }
        return String.Empty;
    };

    ValidacaoCredencialAttribute.prototype.IsValidoAsync = async function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>
    {
        if (String.IsNullOrWhiteSpace(u.ConverterUtil.ParaString(valorPropriedade)))
        {
            return false;
        }

        const atributo = this as ValidacaoCredencialAttribute;
        atributo.ResultadoValidacao = null;

        let identificadorUsuario = u.ReflexaoUtil.RetornarValorPropriedade(paiPropriedade, atributo.NomePropriedadeIdentificador);
        if (!String.IsNullOrWhiteSpace(identificadorUsuario))
        {
            if (u.ValidacaoUtil.IsTelefone(identificadorUsuario))
            {
                identificadorUsuario = u.TextoUtil.RetornarSomenteNumeros(identificadorUsuario);
            }

            const credencial = new s.CredencialUsuario();
            credencial.IdentificadorUsuario = identificadorUsuario;
            credencial.Senha = valorPropriedade;
            atributo.ResultadoValidacao = await $Aplicacao.ServicoUsuario.ValidarCredencialAsync(credencial);
            return atributo.ResultadoValidacao === d.EnumResultadoValidacaoCredencial.Sucesso;
        }
        else
        {
            return false;
        }
    };
}