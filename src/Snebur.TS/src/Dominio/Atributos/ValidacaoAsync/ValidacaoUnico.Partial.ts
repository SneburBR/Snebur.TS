namespace Snebur.Dominio.Atributos
{
    export interface ValidacaoUnicoAttribute
    {
        RetornarMensagemValidacao(paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string;

        IsValidoAsync(paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>
    }

    ValidacaoUnicoAttribute.prototype.RetornarMensagemValidacao = function (paiPropriedade: any, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): string
    {
        const rotuloPropriedade = u.GlobalizacaoUil.RetornarRotuloPropriedade(propriedade).toLowerCase();
        return u.GlobalizacaoUil.RetornarMensagemValidacao(this,
            ValidacaoUnicoAttribute.IDENTIFICADOR_MENSAGEM_VALIDACAO,
            rotuloPropriedade,
            u.ConverterUtil.ParaString(valorPropriedade));

    };

    ValidacaoUnicoAttribute.prototype.IsValidoAsync = async function IsValidoAsync(this: ValidacaoUnicoAttribute, paiPropriedade: Snebur.Dominio.BaseDominio, propriedade: Snebur.Reflexao.Propriedade, valorPropriedade: any): Promise<boolean>
    {
        if (!(paiPropriedade instanceof d.Entidade))
        {
            throw new ErroNaoSuportado("O pai da propriedade não é suportado", this);
        }

        const tipoEntidade = paiPropriedade.GetType() as r.TipoEntidade;

        if (valorPropriedade === null && this.IsAceitaNulo)
        {
            return true;
        }

        if (String.IsNullOrWhiteSpace(u.ConverterUtil.ParaString(valorPropriedade)))
        {
            return false;
        }

        const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
        const consulta = contexto.RetornarNovaEstruturaConsulta(tipoEntidade);
        consulta.Take = 1;

        consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(tipoEntidade.PropriedadeChavePrimaria, a.EnumOperadorFiltro.Diferente, (paiPropriedade as Entidade).Id));
        consulta.FiltroGrupoE.Filtros.Add(a.ConsultaUtil.RetornarNovoFiltroPropriedade(propriedade, a.EnumOperadorFiltro.Igual, valorPropriedade));

        const resultado = await contexto.RetornarResultadoConsultaAsync(consulta);
        const existe = resultado.Entidades.Count > 0;
        return !existe;
    };

   
}