namespace Snebur.Utilidade
{
    export class NamespaceUtil
    {
        public static RetornarNamespace(tipo: r.TipoEntidade): string
        public static RetornarNamespace(_namaspace: string): string
        public static RetornarNamespace(parametro: any): string
        {
            let localNamespace: string;
            if (parametro instanceof r.TipoEntidade)
            {
                const tipo: r.TipoEntidade = parametro as r.TipoEntidade;
                localNamespace = tipo.Namespace;
            }
            if (u.ValidacaoUtil.IsString(parametro) && !String.IsNullOrEmpty(parametro))
            {
                localNamespace = u.ConverterUtil.ParaString(parametro);
            }
            if (String.IsNullOrEmpty(localNamespace))
            {
                throw new ErroNaoDefinido("O namespace não foi defindio", this);
            }
            return localNamespace;
        }
    }
}