
namespace Snebur.Reflexao
{
    export class TipoComplexo extends TipoBaseDominio
    {
        public constructor(construtor: Function, nome: string, _namespace: string, assemblyQualifiedName: string, tipoBase: BaseTipo, abstrato: boolean)
        {
            super(construtor, nome, _namespace, assemblyQualifiedName, tipoBase, abstrato);
            this.TipoReflexao = EnumTipoReflexao.TipoBaseEntidade;
        }
    }
}