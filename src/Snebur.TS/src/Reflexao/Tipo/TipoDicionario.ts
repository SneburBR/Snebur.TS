namespace Snebur.Reflexao
{
    export class TipoDicionario extends BaseTipoLista
    {
        public readonly TipoItemValor: BaseTipo

        public constructor(tipoItemValor: BaseTipo)
        {
            super(`Dicionario_${tipoItemValor.Nome}`, "System.Collections.Generic", `System.Collections.Generic.Dictionary\`2[[System.String, mscorlib],[${tipoItemValor.AssemblyQualifiedName}]], mscorlib`);
            this.TipoItemValor = tipoItemValor;
            this.TipoReflexao = EnumTipoReflexao.Dicionario;
        }

        public RetornarTipoItemLista(): BaseTipo
        {
            return this.TipoItemValor;
        }
    }
}