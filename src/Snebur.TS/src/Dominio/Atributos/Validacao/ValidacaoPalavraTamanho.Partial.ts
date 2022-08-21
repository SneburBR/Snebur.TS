namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoPalavraTamanhoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoPalavraTamanhoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, controle?: IRotulo): string
    {
        const atributo: ValidacaoPalavraTamanhoAttribute = this;
        /*const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();*/
        const palavraInvalida = ConverterUtil.ParaString(valorPropriedade).split(/\s+/).
            Where(x => !ValidacaoUtil.ValidarTextoTamanho(x, this.TamanhoMinimo, this.TamanhoMaximo)).
            First();

        if (atributo.TamanhoMinimo > 0 && atributo.TamanhoMaximo > 0)
        {
            if (atributo.TamanhoMinimo === atributo.TamanhoMaximo)
            {
                return `A palavra  '${palavraInvalida}'  deve ter ${atributo.TamanhoMaximo} caracteres`;
            }

            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoPalavraTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_INTERVALO, palavraInvalida, atributo.TamanhoMinimo.ToString(), atributo.TamanhoMaximo.ToString());
        }
        if (atributo.TamanhoMinimo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoPalavraTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MINIMO, palavraInvalida, atributo.TamanhoMinimo.ToString());
        }
        if (atributo.TamanhoMaximo > 0)
        {
            return u.GlobalizacaoUil.RetornarMensagemValidacao(atributo, ValidacaoPalavraTamanhoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO_MAXIMO, palavraInvalida, atributo.TamanhoMaximo.ToString());
        }

        throw new ErroOperacaoInvalida("O tamanho m�ximo e minimo, ambos n�o podem ser 0 'zero'", this);
    };

    ValidacaoPalavraTamanhoAttribute.prototype.IsValido = function (this: ValidacaoPalavraTamanhoAttribute, paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!String.IsNullOrWhiteSpace(valorPropriedade))
        {
            return ValidacaoUtil.ValidarPalavraTamanho(valorPropriedade, this.TamanhoMinimo, this.TamanhoMaximo);
        }
        return true;
    };
}