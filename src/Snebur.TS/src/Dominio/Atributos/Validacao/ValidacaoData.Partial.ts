namespace Snebur.Dominio.Atributos
{

    export interface ValidacaoDataAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;

        InicializarDatas(): void;
    }

    ValidacaoDataAttribute.prototype.InicializarDatas = function (this: ValidacaoDataAttribute)
    {
        if (this.DataMinima == null)
        {
            this.DataMinima = DataHoraUtil.RetornarDataInicio(this.TipoData);
        }
        if (this.DataMaxima == null)
        {
            this.DataMaxima = DataHoraUtil.RetornarDataFim(this.TipoData);
        }
    };
     
    ValidacaoDataAttribute.prototype.RetornarMensagemValidacao = function (this: ValidacaoDataAttribute,
        paiPropriedade: any,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        switch (this.TipoData)
        {
            case EnumTipoData.DataFutura:
            case EnumTipoData.DataMuitoFutura:

                return `${rotuloPropriedade} dever ser no futuro`;

            case EnumTipoData.DataFuturaProxima:

                return `${rotuloPropriedade} dever ser em um futuro próximo`;

            case EnumTipoData.DataPassado:
            case EnumTipoData.DataPassadoFuturo:

                return `${rotuloPropriedade} dever hoje ou anterior`;

            case EnumTipoData.DataPassadoRecente:

                return `${rotuloPropriedade} dever ser hoje ou anterior`;

            default: {

                const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this,
                    ValidacaoDataAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO,
                    rotuloPropriedade);

                return mensagemValidacao;
            }

        }
    };

    ValidacaoDataAttribute.prototype.IsValido = function (this: ValidacaoDataAttribute,
        paiPropriedade: Snebur.Dominio.BaseDominio,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any): boolean
    {
        this.InicializarDatas();

        if (valorPropriedade instanceof Date)
        {
            return valorPropriedade >= this.DataMinima && valorPropriedade <= this.DataMaxima;
        }
        return true;
    };
}