namespace Snebur.Reflexao
{
    export class TipoEnum extends BaseTipo
    {
        private readonly _constructor: Function;
        public override get Construtor(): Function
        {
            const _obj = r.ReflexaoNamespaceUtil.RetornarObjeto(this.CaminhoTipo);
            if (_obj != this._constructor)
            {
                throw new Erro(`O construtor do tipo '${this.CaminhoTipo}' foi alterado. Isso não é permitido.`);
            }
            return this._constructor;
        }

        public constructor(
            construtor: object, nome:
                string, _namespace: string,
            assemblyQualifiedName: string,
            tipoBase: null = null,
            abstrato: false = false)
        {
            super(nome, _namespace, assemblyQualifiedName, tipoBase, abstrato);
            this.TipoReflexao = EnumTipoReflexao.TipoEnum;
        }
    }
}