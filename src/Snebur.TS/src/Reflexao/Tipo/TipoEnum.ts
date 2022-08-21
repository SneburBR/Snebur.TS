namespace Snebur.Reflexao
{
    export class TipoEnum extends BaseTipo
    {
        public override get Construtor(): Function
        {
            return r.ReflexaoNamespaceUtil.RetornarObjeto(this.CaminhoTipo);
        }

        constructor(nome: string, _namespace: string, assemblyQualifiedName: string)
        {
            super(nome, _namespace, assemblyQualifiedName, null, false);

            this.TipoReflexao = EnumTipoReflexao.TipoEnum;
        }
    }
}