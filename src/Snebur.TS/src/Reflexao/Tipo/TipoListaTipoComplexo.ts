namespace Snebur.Reflexao
{
    export class TipoListaTipoComplexo extends TipoListaBaseDominio
    {
        public get TipoComplexo(): TipoComplexo
        {
            return this.TipoBaseDominio as TipoComplexo;
        }

        public constructor(
            nome: string,
            _namespace: string,
            assemblyQualifiedName: string,
            tipoBaseDominio: TipoComplexo)
        {
            super(nome, _namespace, assemblyQualifiedName, tipoBaseDominio);
        }
    }
}
