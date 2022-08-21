
namespace Snebur.Reflexao
{
    export class TipoDesconhecido extends Snebur.Reflexao.BaseTipo
    {

        public constructor()
        {
            super("TipoDesconhecido", null, "null", null, false);
            this.TipoReflexao = EnumTipoReflexao.Desconhecido;
        }
    }
}