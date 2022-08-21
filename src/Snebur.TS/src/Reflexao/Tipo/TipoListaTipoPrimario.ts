namespace Snebur.Reflexao
{
    export class TipoListaTipoPrimario extends BaseTipoLista
    {

        public TipoPrimario: TipoPrimario;

        public constructor(tipoPrimario: TipoPrimario)
        {
            super(`ListaTipoPrimario_${tipoPrimario.Nome}`, "", `System.Collections.Generic.List\`1[[System.${TipoPrimario.NormalizarTipoDotNet(tipoPrimario.TipoPrimarioEnum, tipoPrimario.Nome)}, mscorlib]], mscorlib`);

            this.TipoReflexao = EnumTipoReflexao.TipoListaTipoPrimario;
            this.TipoPrimario = tipoPrimario;
        }

        public RetornarTipoItemLista(): TipoPrimario
        {
            return this.TipoPrimario;
        }
    }
}