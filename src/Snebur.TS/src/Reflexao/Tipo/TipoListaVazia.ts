namespace Snebur.Reflexao
{
    export class TipoListaVazia extends BaseTipoLista
    {

        public constructor()
        {
            super("TipoListaVazia", null, null);
            this.TipoReflexao = EnumTipoReflexao.TipoListaTipoPrimario;
        }

        public RetornarTipoItemLista(): TipoNulo
        {
            return $Reflexao.TipoNulo;
        }
    }

    export class TipoListaItemDesconhecido extends BaseTipoLista
    {

        public constructor()
        {
            super("TipoListaVazia", null, null);
            this.TipoReflexao = EnumTipoReflexao.TipoListaTipoPrimario;
        }

        public RetornarTipoItemLista(): TipoNulo
        {
            return $Reflexao.TipoDesconhecido;
        }
    }
}