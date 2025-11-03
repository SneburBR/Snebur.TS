namespace Snebur.Reflexao
{
    export class TipoGenerico extends TipoBaseDominio
    {
        public constructor(construtor: Function, tipoBase: r.BaseTipo)
        {
            super(construtor, construtor.name, null, null, tipoBase, false);
            this.TipoReflexao = EnumTipoReflexao.Generico;
        }
    }

}
