
namespace Snebur.Reflexao
{
    export class TipoNulo extends Snebur.Reflexao.BaseTipo
    {

        public constructor()
        {
            super("TipoNulo",null, "null", null, false);
            this.TipoReflexao = EnumTipoReflexao.TipoPrimario;
        }
    }
}