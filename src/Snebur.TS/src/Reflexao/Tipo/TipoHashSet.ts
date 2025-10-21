namespace Snebur.Reflexao
{
    export class TipoHashSet extends BaseTipoLista
    {
        public readonly TipoItemValor: BaseTipo

        public constructor(tipoItem: BaseTipo)
        {
            super(`HashSet_${tipoItem.Nome}`, "System.Collections.Generic", `System.Collections.Generic.HashSet\`1[[${tipoItem.AssemblyQualifiedName}]], System.Private.CoreLib`);
            this.TipoItemValor;
            this.TipoReflexao = EnumTipoReflexao.HashSet;
        }

        public RetornarTipoItemLista(): BaseTipo
        {
            return this.TipoItemValor;
        }

        public static GetOrCreate(
            itemType: BaseTipo,
            keyTypeName: string): TipoHashSet
        {
            if ($Reflexao.Tipos.ContainsKey(keyTypeName))
            {
                const type = $Reflexao.Tipos.Item(keyTypeName);
                if (!(type instanceof TipoHashSet))
                    throw new Erro("Tipo ja registrado com esse nome, mas não é um TipoDicionario");
                return type;
            }

            const newType = new TipoHashSet(itemType);
            $Reflexao.Tipos.Adicionar(keyTypeName, newType);
            return newType;
        }
    }

}