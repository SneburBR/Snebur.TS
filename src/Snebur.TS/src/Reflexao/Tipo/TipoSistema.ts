namespace Snebur.Reflexao
{
    export class TipoSistema extends BaseTipo
    {
        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string)
        {
            super(nome, _namespace, assemblyQualifiedName, null, false);
            this.TipoReflexao = -1;
        }
    }
}