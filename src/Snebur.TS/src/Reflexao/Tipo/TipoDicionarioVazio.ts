namespace Snebur.Reflexao
{
    export class TipoDicionarioVazio extends TipoDicionario
    {

        public constructor()
        {
            super(new TipoNulo());
            this.TipoReflexao = EnumTipoReflexao.Dicionario;
        }

        public override RetornarTipoItemLista(): TipoNulo
        {
            return $Reflexao.TipoNulo;
        }
    }
}