namespace Snebur.Utilidade
{
    export class NamespaceUtil
    {
        public static RetornarNamespace(tipoEntidadeOuNamespace: r.TipoEntidade | string): string
        {
            let localNamespace: string;
            if (tipoEntidadeOuNamespace instanceof r.TipoEntidade)
            {
                const tipo: r.TipoEntidade = tipoEntidadeOuNamespace as r.TipoEntidade;
                localNamespace = tipo.Namespace;
            }
            if (u.ValidacaoUtil.IsString(tipoEntidadeOuNamespace) && !String.IsNullOrEmpty(tipoEntidadeOuNamespace))
            {
                localNamespace = u.ConverterUtil.ParaString(tipoEntidadeOuNamespace);
            }
            if (String.IsNullOrEmpty(localNamespace))
            {
                throw new ErroNaoDefinido("O namespace não foi defindio", this);
            }
            return localNamespace;
        }
    }
}