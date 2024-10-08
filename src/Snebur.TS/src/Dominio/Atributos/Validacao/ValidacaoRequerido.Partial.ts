﻿namespace Snebur.Dominio.Atributos
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
        if (opcao != null && opcao !== EnumOpcoesComparacaoAuxiliar.Nenhuma && paiPropriedade != null)
        {
            if (!this.IsIgnorarValidacaoSeAuxiliarInvalido &&
                !this.IsAuxiliarValido(paiPropriedade, valorPropriedade))
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


                        return `O valor da propriedade ${rotuloPropriedadeAuxiliar} deve ser verdadeiro.`;


                    case EnumOpcoesComparacaoAuxiliar.False:


                        return `O valor da propriedade ${rotuloPropriedadeAuxiliar} deve ser falso.`;

                }
            }

        }

        const mensagemValidacao = u.GlobalizacaoUil.RetornarMensagemValidacao(this, ValidacaoRequeridoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO, rotuloPropriedade.toLowerCase());
        return mensagemValidacao;
    };

    ValidacaoRequeridoAttribute.prototype.IsValido = function (paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): boolean
    {
        if (!this.IsAuxiliarValido(paiPropriedade, valorPropriedade))
        {
            return this.IsIgnorarValidacaoSeAuxiliarInvalido;
        }


        if (propriedade.Tipo instanceof r.TipoEntidade)
        {
            if (paiPropriedade instanceof d.Entidade)
            {
                if (valorPropriedade == null)
                {
                    const propriedadeChaveEstrangeira = u.EntidadeUtil.RetornarPropriedadeChaveEstrangeira(paiPropriedade.GetType() as r.TipoEntidade, propriedade);
                    if (propriedadeChaveEstrangeira.IsIdentificadorProprietario)
                    {
                        return true;
                    }
                    const idChaveEstrangeira = (paiPropriedade as any)[propriedadeChaveEstrangeira.Nome];
                    return idChaveEstrangeira > 0;
                }
            }
            return (valorPropriedade instanceof Entidade);
        }

        if (propriedade.IsIdentificadorProprietario)
        {
            return true;
        }

        if (u.ValidacaoUtil.IsDefinido(valorPropriedade))
        {
            if (propriedade.Tipo instanceof r.TipoPrimario)
            {
                const tipoPrimario = (propriedade.Tipo as r.TipoPrimario).TipoPrimarioEnum;
                return ValidacaoUtil.IsTipoPrimarioDefinido(valorPropriedade, tipoPrimario, true);
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
                return Array.isArray(valorPropriedade) && valorPropriedade.length > 0;
            }
        }

        return false;
    };

    ValidacaoRequeridoAttribute.prototype.IsAuxiliarValido = function (paiPropriedade: any, valorPropriedade2: any): boolean
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
        const valorPropriedadeComparar = this.ValorComparar ?? valorPropriedade2;

        switch (opcao)
        {
            case EnumOpcoesComparacaoAuxiliar.True:

                return ConverterUtil.ParaBoolean(valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.False:

                return !ConverterUtil.ParaBoolean(valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Igual:

                return Util.IsIgual(valorPropriedadeComparar, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Diferente:

                return Util.IsDiferente(valorPropriedadeComparar, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Maior:

                return Util.IsMaior(valorPropriedadeComparar, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.MaiorIgual:

                return Util.IsMaiorOuIgual(valorPropriedadeComparar, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.Menor:

                return Util.IsMenor(valorPropriedadeComparar, valorPropriedadeAuxiliar);

            case EnumOpcoesComparacaoAuxiliar.MenorIgual:

                return Util.IsMenorOuIgual(valorPropriedadeComparar, valorPropriedadeAuxiliar);

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