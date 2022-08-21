namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoSenhaAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoSenhaAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const atributo: ValidacaoSenhaAttribute = this;
         
        valorPropriedade = atributo.NormalizarValorPropriedade(paiPropriedade, propriedade, valorPropriedade);

        if (!u.SenhaUtil.IsSenhaValida(valorPropriedade))
        {
            return "O senha não é suportada. Verifique os espaços ";

        }
        if ((atributo.TamanhoMinimo > 0) && (atributo.TamanhoMaximo > 0))
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoSenhaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO, rotuloPropriedade, atributo.TamanhoMinimo.ToString(), atributo.TamanhoMaximo.ToString());
        }
        if (atributo.TamanhoMinimo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoSenhaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO, rotuloPropriedade, atributo.TamanhoMinimo.ToString());
        }
        if (atributo.TamanhoMaximo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoSenhaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO, rotuloPropriedade, atributo.TamanhoMaximo.ToString());
        }
        throw new ErroOperacaoInvalida("O tamanho máximo e minimo, ambos não podem ser 0 'zero'", this);
    };


    ValidacaoSenhaAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            const atributo: ValidacaoSenhaAttribute = this;

            valorPropriedade = atributo.NormalizarValorPropriedade(paiPropriedade, propriedade, valorPropriedade);
            const tamanho = valorPropriedade?.trim().length ?? 0;

            if (u.SenhaUtil.IsSenhaValida(valorPropriedade))
            {
                return ((tamanho >= atributo.TamanhoMinimo) && (tamanho <= atributo.TamanhoMaximo));
            }
            return false;

        }
        return true;
    };

    ValidacaoSenhaAttribute.prototype.NormalizarValorPropriedade = function (paiPropriedade: Snebur.Dominio.BaseDominio,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any): string
    {
        const nomePropriedadeValorNormal = u.SenhaUtil.RetornarNomePropriedadeValorNormal(propriedade);
        const valorNormal = (paiPropriedade as any)[nomePropriedadeValorNormal];
        if (typeof valorNormal === "string")
        {
            return valorNormal;
        }
        return u.ConverterUtil.ParaString(valorPropriedade);
    };

    export interface ValidacaoSenhaAttribute
    {
        NormalizarValorPropriedade(paiPropriedade: Snebur.Dominio.BaseDominio,
            propriedade: Snebur.Reflexao.Propriedade,
            valorPropriedade: any): string;
    }

}