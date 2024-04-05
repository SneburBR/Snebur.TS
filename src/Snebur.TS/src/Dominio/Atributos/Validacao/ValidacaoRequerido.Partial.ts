namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoRequeridoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any, rotuloControle?: string): string;

        IsValido(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean;
    }

    ValidacaoRequeridoAttribute.prototype.RetornarMensagemValidacao = function (
        paiPropriedade: any,
        propriedade: Snebur.Reflexao.Propriedade,
        valorPropriedade: any,
        rotuloControle?: string): string
    {
        const rotuloPropriedade = rotuloControle?.toLowerCase() ?? u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        const opcao = this.OpcoesComparacaoAuxiliar;
        if (opcao != null && opcao !== EnumOpcoesComparacaoAuxiliar.Nenhuma && paiPropriedade!= null)
        {
            const propriedadeAuxiliar = paiPropriedade.GetType()?.RetornarPropriedade(this.NomePropridadeAuxiliar);
            const valorPropriedadeAuxiliza = this.RetornarValorPropriedadeAuxiliar(paiPropriedade);
            const rotuloPropriedadeAuxiliar = propriedadeAuxiliar == null
                ? this.NomePropridadeAuxiliar.toLowerCase()
                : u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedadeAuxiliar).toLowerCase();

            switch (opcao)
            {
                case EnumOpcoesComparacaoAuxiliar.Igual:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser igual a ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Diferente:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser diferente de ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Maior:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser maior que ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.MaiorIgual:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser maior ou igual a ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.Menor:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser menor que ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.MenorIgual:

                    return `O valor da propriedade ${rotuloPropriedade} deve ser menor ou igual a ${rotuloPropriedadeAuxiliar}: ${valorPropriedadeAuxiliza}.`;

                case EnumOpcoesComparacaoAuxiliar.True:

                    if (!this.IsValidoSeAuxiliarInvalido)
                    {
                        return `O valor da propriedade ${rotuloPropriedadeAuxiliar} deve ser verdadeiro.`;
                    }
                    break;

                case EnumOpcoesComparacaoAuxiliar.False:

                    if (!this.IsValidoSeAuxiliarInvalido)
                    {
                        return `O valor da propriedade ${rotuloPropriedadeAuxiliar} deve ser falso.`;
                    }
                    break;
            }
        }

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

            if (propriedade.Tipo instanceof r.BaseTipoLista)
            {
                return Array.isArray(valorPropriedade) && valorPropriedade.length > 0 ;
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