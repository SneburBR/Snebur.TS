namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoUnicoCompostaAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValidoAsync(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>;
    }

    ValidacaoUnicoCompostaAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        return u.GlobalizacaoUil.RetornarMensagemValidacao(this,
            ValidacaoUnicoCompostaAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO,
            rotuloPropriedade,
            u.ConverterUtil.ParaString(valorPropriedade));
    };

    ValidacaoUnicoCompostaAttribute.prototype.IsValidoAsync = async function IsValidoAsync(this: ValidacaoUnicoCompostaAttribute, paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean> 
    {
        if (!(paiPropriedade instanceof Entidade))
        {
            return true;
        }

        const entidade: Entidade = paiPropriedade as Entidade;
        const tipoEntidade = entidade.GetType() as r.TipoEntidade;
        const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
        const consulta = contexto.RetornarNovaEstruturaConsulta(tipoEntidade);

        consulta.Take = 1;

        consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(tipoEntidade.PropriedadeChavePrimaria, a.EnumOperadorFiltro.Diferente, (paiPropriedade as Entidade).Id));

        for (const nomePropriedade of this.NomesPropriedadeOuFiltro)
        {
            let propriedadeFiltro = tipoEntidade.RetornarPropriedade(nomePropriedade, false);
            let valorPropriedadeFiltro: any;
            if (propriedadeFiltro.IsIdentificadorProprietario)
            {
                valorPropriedadeFiltro = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeFiltro.Nome, false);
                if ((typeof valorPropriedadeFiltro === "string" && valorPropriedadeFiltro.trim().length > 1) ||
                    typeof valorPropriedadeFiltro === "number" && valorPropriedadeFiltro > 0 )
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
                    valorPropriedadeFiltro = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeFiltro.Nome, false);
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
     
}