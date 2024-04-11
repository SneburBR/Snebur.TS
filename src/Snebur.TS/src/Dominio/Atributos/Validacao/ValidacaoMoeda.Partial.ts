namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoMoedaAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }
    ValidacaoMoedaAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const atributo: ValidacaoMoedaAttribute = this;
        const valor = u.ConverterUtil.ParaDecimal(valorPropriedade);

        if (!u.ValidacaoUtil.IsNumber(valorPropriedade))
        {
            return "valor invalido";
        }

        if (!atributo.AceitarNegativo && valor < 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this,
                ValidacaoMoedaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_NEGATIVA, rotuloPropriedade);
        }
        if (!atributo.AceitarNulo && valor === 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoMoedaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_NAO_NULO, rotuloPropriedade);
        }
        if (atributo.ValorMaximo > 0 && valor > atributo.ValorMaximo)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoMoedaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MAXIMO, rotuloPropriedade, u.FormatacaoUtil.FormatarMoeda(atributo.ValorMaximo));
        }
        if (valor < atributo.ValorMinimo)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoMoedaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_VALOR_MINIMO, rotuloPropriedade, u.FormatacaoUtil.FormatarMoeda(atributo.ValorMinimo));
        }
        throw new ErroOperacaoInvalida("Operação invalida, não possível retornar um mensagem de validação de moeda", this);
    };

    ValidacaoMoedaAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace((valorPropriedade)))
        {
            const atributo: ValidacaoMoedaAttribute = this;
            if (valorPropriedade == null)
            {
                return atributo.AceitarNulo;
            }

            if (!u.ValidacaoUtil.IsNumber(valorPropriedade))
            {
                return false;
            }
            const valor = u.ConverterUtil.ParaDecimal(valorPropriedade);
           

            if (!atributo.AceitarNegativo && valor < 0)
            {
                return false;
            }
             
            if (atributo.ValorMaximo > 0 && valor > atributo.ValorMaximo)
            {
                return false;
            }
            if (valor < atributo.ValorMinimo)
            {
                return false;
            }
        }
        return true;
    };
}