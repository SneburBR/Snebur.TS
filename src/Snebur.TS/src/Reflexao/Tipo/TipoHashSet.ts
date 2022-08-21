namespace Snebur.Reflexao
{
    export class TipoHashSet extends BaseTipoLista
    {
        public TipoItemValor: BaseTipo

        public constructor(tipoItemValor: BaseTipo)
        {
            super(`HashSet_${tipoItemValor.Nome}`, "System.Collections.Generic", `System.Collections.Generic.HashSet\`1[[${tipoItemValor.AssemblyQualifiedName}]], System.Core`);
            this.TipoItemValor;
            this.TipoReflexao = EnumTipoReflexao.Dicionario;
        }

        public RetornarTipoItemLista(): BaseTipo
        {
            return this.TipoItemValor;
        }
    }
}