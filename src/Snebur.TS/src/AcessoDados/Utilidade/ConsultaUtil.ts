namespace Snebur.AcessoDados
{
    export class ConsultaUtil
    {
       

        public static RetornarNovoFiltroPropriedade(propriedade: r.Propriedade, operador: EnumOperadorFiltro, valorPropriedade: any): FiltroPropriedade
        {
            const tipo = propriedade.Tipo;
            if (tipo instanceof r.TipoPrimario || tipo instanceof r.TipoEnum)
            {
                const tipoPrimario = ConsultaUtil.RetornarTipoPrimario(tipo);
                const filtroPropriedade = new FiltroPropriedade();
                filtroPropriedade.CaminhoPropriedade = propriedade.Nome;
                filtroPropriedade.Operador = operador;
                filtroPropriedade.TipoPrimarioEnum = tipoPrimario;
                filtroPropriedade.Valor = valorPropriedade;
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
    }
}