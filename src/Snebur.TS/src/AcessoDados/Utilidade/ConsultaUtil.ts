namespace Snebur.AcessoDados
{
    export class ConsultaUtil
    {
        public static readonly NOME_PROPRIEDADE_NOME_TIPO_ENTIDADE = "__NomeTipoEntidade";
        public static RetornarFitroNomeTipoEntidade(tipoEntidade: r.TipoEntidade): FiltroPropriedade
        {
            return new a.FiltroPropriedade({
                CaminhoPropriedade: ConsultaUtil.NOME_PROPRIEDADE_NOME_TIPO_ENTIDADE,
                Operador: a.EnumOperadorFiltro.Igual,
                TipoPrimarioEnum: r.EnumTipoPrimario.String,
                Valor: tipoEntidade.Nome
            });
        }


        public static RetornarNovoFiltroPropriedade(
            propriedade: r.Propriedade,
            operador: EnumOperadorFiltro,
            valorPropriedade: any): FiltroPropriedade
        {
            const tipo = propriedade.Tipo;
            if (tipo instanceof r.TipoPrimario || tipo instanceof r.TipoEnum)
            {
                const tipoPrimario = ConsultaUtil.RetornarTipoPrimario(tipo);
                const filtroPropriedade = new FiltroPropriedade();
                filtroPropriedade.CaminhoPropriedade = propriedade.Nome;
                filtroPropriedade.Operador = operador;
                filtroPropriedade.TipoPrimarioEnum = tipoPrimario;
                filtroPropriedade.Valor = ConsultaUtil.NormalizarValorPropriedade(propriedade, valorPropriedade);
                return filtroPropriedade;
            }

            throw new ErroNaoSuportado("O tipo da propriedade não é suportado para o filtro ", this);
        }


        private static RetornarTipoPrimario(tipo: r.TipoPrimario | r.TipoEnum): r.EnumTipoPrimario
        {
            if (tipo instanceof r.TipoPrimario)
            {
                return tipo.TipoPrimarioEnum;
            }

            if (tipo instanceof r.TipoEnum)
            {
                return r.EnumTipoPrimario.EnumValor;
            }

            throw new ErroNaoSuportado("O tipo da propriedade não é suportado para o filtro ", this);
        }

        private static NormalizarValorPropriedade(
            propriedade: r.Propriedade,
            valorPropriedade: any): any
        {
            if (propriedade.Tipo instanceof r.TipoPrimario &&
                propriedade.Tipo.TipoPrimarioEnum === r.EnumTipoPrimario.String)
            {
                const atributoNormalizarString = propriedade.Atributos
                    .OfType<at.NormalizarStringAttribute>(at.NormalizarStringAttribute)
                    .FirstOrDefault();

                if (atributoNormalizarString != null)
                {
                    return atributoNormalizarString.Normalizar(valorPropriedade);
                }
            }
            return valorPropriedade;
            
        }
    }
}