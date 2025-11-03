namespace Snebur.Reflexao
{
    export class TipoListaBaseDominio extends BaseTipoLista
    {
        public readonly TipoBaseDominio: TipoBaseDominio;

        public constructor(nome: string, _namespace: string, assemblyQualifiedName: string, tipoBaseDominio: TipoBaseDominio)
        {
            super(nome, _namespace, NormalizarListaAssemblyNamesUtil.Normalize(assemblyQualifiedName));

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

    class NormalizarListaAssemblyNamesUtil
    {
        private static AssemblyNames = [
            "System.Collections.Generic.List`1[[Zyoncore.Sigi.Online.Dominio.ItemMontagem, Zyoncore.Sigi.Online.Dominio]], System.Private.CoreLib",
        ];

        private static AssemblyNamesReplace = [
            "System.Collections.Generic.List`1[[Zyoncore.Sigi.Dominio.ItemMontagem, Zyoncore.Sigi.Dominio]], mscorlib",
        ];

        public static Normalize(assemblyQualifiedName: string): string
        {
            for (let i = 0; i < this.AssemblyNames.length; i++)
            {
                if (assemblyQualifiedName === this.AssemblyNames[i])
                {
                    return this.AssemblyNamesReplace[i];
                }
            }
            return assemblyQualifiedName;
        }
    }

}