
namespace Snebur.Reflexao
{
    export class TipoListaEnum extends BaseTipoLista
    {

        public TipoEnum: TipoEnum;

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoEnum: TipoEnum)
        {
            super(nome, _namespace, assemblyQualifiedName);

            this.TipoEnum = tipoEnum;

            this.TipoReflexao = EnumTipoReflexao.TipoListaEnum;
        }

        public RetornarTipoItemLista(): TipoEnum
        {
            return this.TipoEnum;
        }
    }
}