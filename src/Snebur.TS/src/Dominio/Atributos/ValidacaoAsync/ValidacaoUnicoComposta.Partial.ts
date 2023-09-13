namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoUnicoCompostaAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValidoAsync(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>;

        RetornarEntidade(paiPropriedade: any): Entidade;
    }

    ValidacaoUnicoCompostaAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        return u.GlobalizacaoUil.RetornarMensagemValidacao(this,
            ValidacaoUnicoCompostaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO,
            rotuloPropriedade,
            u.ConverterUtil.ParaString(valorPropriedade));
    };

    ValidacaoUnicoCompostaAttribute.prototype.IsValidoAsync =
        async function IsValidoAsync(this: ValidacaoUnicoCompostaAttribute,
            paiPropriedade2: Snebur.Dominio.BaseDominio,
            propriedade: Snebur.Reflexao.Propriedade,
            valorPropriedade: any): Promise<boolean> 
        {

            if (!this.NomesPropriedadeOuFiltro.Contains(propriedade.Nome))
            {
                const nomesPropriedadeString = String.Join(",  ", this.NomesPropriedadeOuFiltro);
                console.error(`A propriedade ${propriedade.Nome} não está configurada na validação único composta, ${nomesPropriedadeString}`);
            }

            const entidade = this.RetornarEntidade(paiPropriedade2);
            if (entidade == null)
            {
                return true;
            }

            const tipoEntidade = entidade.GetType() as r.TipoEntidade;
            const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
            const consulta = contexto.RetornarNovaEstruturaConsulta(tipoEntidade);

            consulta.Take = 1;

            consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(tipoEntidade.PropriedadeChavePrimaria, a.EnumOperadorFiltro.Diferente, entidade.Id));

            for (const nomePropriedade of this.NomesPropriedadeOuFiltro)
            {
                let propriedadeFiltro = tipoEntidade.RetornarPropriedade(nomePropriedade, false);
                let valorPropriedadeFiltro: any;
                if (propriedadeFiltro.IsIdentificadorProprietario)
                {
                    valorPropriedadeFiltro = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeFiltro.Nome, false);
                    if ((typeof valorPropriedadeFiltro === "string" && valorPropriedadeFiltro.trim().length > 1) ||
                        typeof valorPropriedadeFiltro === "number" && valorPropriedadeFiltro > 0)
                    {
                        consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(propriedadeFiltro, a.EnumOperadorFiltro.Igual, valorPropriedadeFiltro));
                    }
                }
                if (!propriedadeFiltro.IsIdentificadorProprietario)
                {
                    if (propriedadeFiltro.Tipo instanceof r.TipoEntidade)
                    {
                        valorPropriedadeFiltro = u.EntidadeUtil.RetornarIdChaveEstrangeira(entidade, propriedadeFiltro);
                        propriedadeFiltro = u.EntidadeUtil.RetornarPropriedadeChaveEstrangeira(tipoEntidade, propriedadeFiltro);
                    }
                    else
                    {
                        valorPropriedadeFiltro = nomePropriedade === propriedade.Nome
                            ? valorPropriedade
                            : u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeFiltro.Nome, false);

                        if (valorPropriedadeFiltro == null)
                        {
                            const isAceitaNulo = nomePropriedade.EndsWith("?");
                            if (isAceitaNulo)
                            {
                                return true;
                            }
                        }
                    }

                    if (typeof valorPropriedadeFiltro === "undefined")
                    {
                        valorPropriedadeFiltro = null;
                    }
                    consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(propriedadeFiltro, a.EnumOperadorFiltro.Igual, valorPropriedadeFiltro));
                }
            }

            const resultado = await contexto.RetornarResultadoConsultaAsync(consulta);
            const existe = resultado.Entidades.Count > 0;
            return !existe;
        };


    ValidacaoUnicoCompostaAttribute.prototype.RetornarEntidade = function (paiPropriedade: any): Entidade
    {
        if (paiPropriedade == null)
        {
            return null;
        }

        if (paiPropriedade instanceof Entidade)
        {
            return paiPropriedade;
        }

        if (paiPropriedade.RetornarEntidade != null)
        {
            const entidade = (paiPropriedade as IRetonarEntidade).RetornarEntidade();
            if (entidade instanceof Entidade)
            {
                return entidade;
            }
        }
        const nomeTipo = paiPropriedade?.GetType().Name ?? paiPropriedade.constructor?.name ?? paiPropriedade;
        console.error(`Não foi possível retornar a entidade do pai da propriedade. 
                        Implemente a interface IRetonarEntidade no objeto ${nomeTipo} e retornar a entidade da validação`);
        return null;
    };
}