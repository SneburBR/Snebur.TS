namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoIdenticadorUsuarioAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValidoAsync(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>
    }
    ValidacaoIdenticadorUsuarioAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const atributo = this as ValidacaoIdenticadorUsuarioAttribute;
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const mensagem = atributo.IsNovoIdentificador ? ValidacaoIdenticadorUsuarioAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_NOVO_IDENTIFICADOR : ValidacaoIdenticadorUsuarioAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_IDENTIFICADOR;
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, mensagem, rotuloPropriedade, u.ConverterUtil.ParaString(valorPropriedade));
        return mensagemValidacao;
    };


    ValidacaoIdenticadorUsuarioAttribute.prototype.IsValidoAsync = async function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>
    {
        if (String.IsNullOrWhiteSpace(u.ConverterUtil.ParaString(valorPropriedade)))
        {
            return true;
        }

        const atributo = this as ValidacaoIdenticadorUsuarioAttribute;
        if (u.ValidacaoUtil.IsTelefone(valorPropriedade))
        {
            valorPropriedade = u.TextoUtil.RetornarSomenteNumeros(valorPropriedade);
        }
        const resultadoIdentificador = await $Aplicacao.ServicoUsuario.ExisteIdentificadorUsuarioAsync(valorPropriedade);
        return atributo.IsNovoIdentificador ? !resultadoIdentificador.IsExiste : resultadoIdentificador.IsExiste;
    };
}