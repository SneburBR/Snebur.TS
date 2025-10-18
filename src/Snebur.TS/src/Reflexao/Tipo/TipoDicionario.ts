namespace Snebur.Reflexao
{
    export class TipoDicionario extends BaseTipoLista
    {
        public readonly KeyType: BaseTipo
        public readonly ValueType: BaseTipo

        public constructor(keyType: BaseTipo, valueType: BaseTipo)
        {
            super(`Dicionario_${valueType.Nome}`, "System.Collections.Generic", `System.Collections.Generic.Dictionary\`2[[${keyType.AssemblyQualifiedName}],[${valueType.AssemblyQualifiedName}]], System.Private.CoreLib`);
            this.KeyType = keyType;
            this.ValueType = valueType;
            this.TipoReflexao = EnumTipoReflexao.Dicionario;
        }

        public RetornarTipoItemLista(): BaseTipo
        {
            return this.ValueType;
        }

        public static GetOrCreate(keyType: BaseTipo, valueType: BaseTipo, keyTypeName: string): TipoDicionario
        {
            if ($Reflexao.Tipos.ContainsKey(keyTypeName))
            {
                const type = $Reflexao.Tipos.Item(keyTypeName);
                if (!(type instanceof TipoDicionario))
                    throw new Erro("Tipo ja registrado com esse nome, mas não é um TipoDicionario");
                return type;
            }

            const newType = new TipoDicionario(keyType, valueType);
            $Reflexao.Tipos.Adicionar(keyTypeName, newType);
            return newType;
        }
    }
}