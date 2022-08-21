namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoTextoTamanhoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoTextoTamanhoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const atributo: ValidacaoTextoTamanhoAttribute = this;
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();

        if (atributo.TamanhoMinimo > 0 && atributo.TamanhoMaximo > 0)
        {
            if (atributo.TamanhoMinimo === atributo.TamanhoMaximo)
            {
                return `O campo  ${rotuloPropriedade}  deve ter ${atributo.TamanhoMaximo} caracteres`;
            }

            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoTextoTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO, rotuloPropriedade, atributo.TamanhoMinimo.ToString(), atributo.TamanhoMaximo.ToString());
        }
        if (atributo.TamanhoMinimo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoTextoTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO, rotuloPropriedade, atributo.TamanhoMinimo.ToString());
        }
        if (atributo.TamanhoMaximo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoTextoTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO, rotuloPropriedade, atributo.TamanhoMaximo.ToString());
        }

        throw new ErroOperacaoInvalida("O tamanho maximo e minimo, ambos não podem ser 0 'zero'", this);
    };

    ValidacaoTextoTamanhoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            const atributo: ValidacaoTextoTamanhoAttribute = this;
            const texto = u.ConverterUtil.ParaString(valorPropriedade);
            const comprimento = texto.trim().length;
            return ((comprimento >= atributo.TamanhoMinimo) && (comprimento <= atributo.TamanhoMaximo));
        }
        return true;

    };
}