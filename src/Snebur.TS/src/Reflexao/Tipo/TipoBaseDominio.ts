
namespace Snebur.Reflexao
{
    export class TipoBaseDominio extends BaseTipo
    {
        protected _construtor: d.BaseDominioConstrutor;

        public override get Construtor(): d.BaseDominioConstrutor
        {
            return this._construtor;
        }

        public constructor(construtor: Function, nome: string, _namespace: string, assemblyQualifiedName: string, tipoBase: BaseTipo, abstrato: boolean)
        {
            super(nome, _namespace, assemblyQualifiedName, tipoBase, abstrato);

            this._construtor = (construtor as any) as d.BaseDominioConstrutor;
            this.TipoReflexao = EnumTipoReflexao.TipoBaseDominio;
        }
    }

    export class TipoGenerico extends TipoBaseDominio
    {
        /*protected _construtor: Function*/
        //public override get Construtor(): Function
        //{
        //    return this._construtor;
        //}

        public constructor(construtor: Function, tipoBase: r.BaseTipo)
        {
            super(construtor, construtor.name , null, null, tipoBase, false);
            this.TipoReflexao = EnumTipoReflexao.Generico;
        }
    }
}