namespace Snebur.Reflexao
{
    export class TipoListaBaseDominio extends BaseTipoLista
    {
        public TipoBaseDominio: TipoBaseDominio;

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoBaseDominio: TipoBaseDominio)
        {
            super(nome, _namespace, assemblyQualifiedName);

            this.TipoBaseDominio = tipoBaseDominio;
            this.TipoReflexao = EnumTipoReflexao.TipoListaBaseDominio;

            if (!(this.TipoBaseDominio instanceof r.TipoBaseDominio))
            {
                throw new ErroOperacaoInvalida("O tipo basedominio é invalido", this);
            }
        }

        public RetornarTipoItemLista(): TipoBaseDominio
        {
            return this.TipoBaseDominio;
        }
    }
}