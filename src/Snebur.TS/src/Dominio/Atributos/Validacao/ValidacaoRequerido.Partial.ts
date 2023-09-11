namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoRequeridoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoRequeridoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, controle?: IRotulo): string
    {
        const opcao = this.OpcoesComparacaoAuxiliar;
        if (opcao != null && opcao !== EnumOpcoesComparacaoAuxiliar.Nenhuma)
        {
            const valorPropriedadeAuxiliza = this.RetornarValorPropriedadeAuxiliar(paiPropriedade);
            switch (opcao)
            {
                case EnumOpcoesComparacaoAuxiliar.Igual:

                    return `O valor da propriedade ${propriedade.Nome} deve ser igual a ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Diferente:

                    return `O valor da propriedade ${propriedade.Nome} deve ser diferente de ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Maior:

                    return `O valor da propriedade ${propriedade.Nome} deve ser maior que ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.MaiorIgual:

                    return `O valor da propriedade ${propriedade.Nome} deve ser maior ou igual a ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Menor:

                    return `O valor da propriedade ${propriedade.Nome} deve ser menor que ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.MenorIgual:

                    return `O valor da propriedade ${propriedade.Nome} deve ser menor ou igual a ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.True:

                    return `O valor da propriedade ${this.NomePropridadeAuxiliar} deve ser verdadeiro.`;

                case EnumOpcoesComparacaoAuxiliar.False:

                    return `O valor da propriedade ${this.NomePropridadeAuxiliar} deve ser falso.`;
            }


        }
        const rotuloPropriedade = controle?.Rotulo ?? u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade);
        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoRequeridoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade.toLowerCase());
        return mensagemValidacao;
    };

    ValidacaoRequeridoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!this.IsAuxiliarValido(paiPropriedade, valorPropriedade))
        {
            return false;
        }

        if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
        {
            if (propriedade.Tipo instanceof r.TipoPrimario)
            {
                const tipoPrimario = (propriedade.Tipo as r.TipoPrimario).TipoPrimarioEnum;
                return ValidacaoUtil.IsTipoPrimarioDefinido(valorPropriedade, tipoPrimario, true);
            }

            if (propriedade.Tipo instanceof r.TipoEntidade)
            {
                if (paiPropriedade instanceof d.Entidade)
                {
                    if (!u.ValidacaoUtil.IsDefinido(valorPropriedade))
                    {
                        const idChaveEstrangeira = u.EntidadeUtil.RetornarIdChaveEstrangeira(paiPropriedade, propriedade);
                        return idChaveEstrangeira > 0;
                    }
                }
                return (valorPropriedade instanceof Entidade);
            }

            if (propriedade.Tipo instanceof r.TipoEnum)
            {
                if (u.ValidacaoUtil.IsNumber(valorPropriedade))
                {
                    const construtorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(propriedade.Tipo);
                    return u.EnumUtil.IsDefindo(construtorEnum, u.ConverterUtil.ParaNumero(valorPropriedade));
                }
            }

            if (propriedade.Tipo instanceof r.TipoBaseDominio)
            {
                return valorPropriedade instanceof BaseDominio;
            }
        }
        return false;
    };

    ValidacaoRequeridoAttribute.prototype.IsAuxiliarValido = function (paiPropriedade: any, valorPropriedade: any): boolean
    {
        const opcao = this.OpcoesComparacaoAuxiliar;
        if (opcao == null ||
            opcao === EnumOpcoesComparacaoAuxiliar.Nenhuma)
        {
            return true;
        }

        if (paiPropriedade == null)
        {
            return false;
        }

        const tipoPaiPropriedade = paiPropriedade.GetType() as r.BaseTipo;
        if (paiPropriedade[this.NomePropridadeAuxiliar] === undefined)
        {
            console.error(`A propriedade auxiliar ${this.NomePropridadeAuxiliar} não foi definida no tipo ${tipoPaiPropriedade.Nome}.`);
            return false;
        }

        const valorPropriedadeAuxiliar = paiPropriedade[this.NomePropridadeAuxiliar];
        switch (opcao)
        {
            case EnumOpcoesComparacaoAuxiliar.True:

                return ConverterUtil.ParaBoolean(valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.False:

                return !ConverterUtil.ParaBoolean(valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Igual:

                return Util.IsIgual(valorPropriedade, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Diferente:

                return Util.IsDiferente(valorPropriedade, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Maior:

                return Util.IsMaior(valorPropriedade, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.MaiorIgual:

                return Util.IsMaiorOuIgual(valorPropriedade, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Menor:

                return Util.IsMenor(valorPropriedade, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.MenorIgual:

                return Util.IsMenorOuIgual(valorPropriedade, valorPropriedadeAuxiliar);

            default:
                console.error(`A opção ${opcao} não é suportada.`);
                return false;
        }
    };

    ValidacaoRequeridoAttribute.prototype.RetornarValorPropriedadeAuxiliar = function (paiPropriedade): any
    {
        const tipoPaiPropriedade = paiPropriedade.GetType() as r.BaseTipo;
        if (paiPropriedade[this.NomePropridadeAuxiliar] === undefined)
        {
            console.error(`A propriedade auxiliar ${this.NomePropridadeAuxiliar} não foi definida no tipo ${tipoPaiPropriedade.Nome}.`);
            return false;
        }
        return paiPropriedade[this.NomePropridadeAuxiliar];
    };

    export interface ValidacaoRequeridoAttribute
    {
        IsAuxiliarValido(paiPropriedade: any, valorPropriedade: any): boolean
        RetornarValorPropriedadeAuxiliar(paiPropriedade: any): any
    }

}