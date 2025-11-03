namespace Snebur.Reflexao
{
    export class TipoBaseDominio extends BaseTipo
    {
        //private static readonly ASSEMBLY_NAME = "Zyoncore.Sigi.Online.Dominio";
        //private static readonly TEMP_FIX_ASSEMBLY_NAME_ENDS = `, ${TipoBaseDominio.ASSEMBLY_NAME}`;
        //private static readonly TEMP_FIX_ASSEMBLY_NAME_STARTS = `${TipoBaseDominio.ASSEMBLY_NAME}.`;

        protected readonly _construtor: d.BaseDominioConstrutor;

        public override get Construtor(): d.BaseDominioConstrutor
        {
            return this._construtor;
        }

        public constructor(construtor: Function,
            nome: string,
            _namespace: string,
            assemblyQualifiedName: string,
            tipoBase: BaseTipo,
            abstrato: boolean)
        {
            super(nome, _namespace, NormalizarAssemblyNamesUtil.Normalize(assemblyQualifiedName), tipoBase, abstrato);

            this._construtor = (construtor as any) as d.BaseDominioConstrutor;
            this.TipoReflexao = EnumTipoReflexao.TipoBaseDominio;
        }

        //private static fixAssemblyDebug(assemblyQualifiedName: string): string
        //{
        //    if (assemblyQualifiedName?.endsWith(TipoBaseDominio.TEMP_FIX_ASSEMBLY_NAME_ENDS))
        //    {
        //        assemblyQualifiedName = assemblyQualifiedName.substring(0, assemblyQualifiedName.length - TipoBaseDominio.TEMP_FIX_ASSEMBLY_NAME_ENDS.length);
        //        assemblyQualifiedName = `${assemblyQualifiedName}, Zyoncore.Sigi.Dominio`;

        //        if (assemblyQualifiedName.startsWith(TipoBaseDominio.TEMP_FIX_ASSEMBLY_NAME_STARTS))
        //        {
        //            assemblyQualifiedName = assemblyQualifiedName.substring(TipoBaseDominio.TEMP_FIX_ASSEMBLY_NAME_STARTS.length);
        //            assemblyQualifiedName = `Zyoncore.Sigi.Dominio.${assemblyQualifiedName}`;
        //        }
        //    }
        //    return assemblyQualifiedName;
        //}
    }

    class NormalizarAssemblyNamesUtil
    {
        private static AssemblyNames = [
            "Zyoncore.Sigi.Online.Dominio.MontagemFotoProduto, Zyoncore.Sigi.Online.Dominio",
            "Zyoncore.Sigi.Online.Dominio.ItemMontagemServidor, Zyoncore.Sigi.Online.Dominio",
            "Zyoncore.Sigi.Online.Dominio.ItemMontagemAreaFoto, Zyoncore.Sigi.Online.Dominio",
            "Zyoncore.Sigi.Online.Dominio.ItemMontagemAreaMontagemLivre, Zyoncore.Sigi.Online.Dominio"
        ];

        private static AssemblyNamesReplace = [
            "Zyoncore.Sigi.Dominio.MontagemFotoProduto, Zyoncore.Sigi.Dominio",
            "Zyoncore.Sigi.Dominio.ItemMontagemServidor, Zyoncore.Sigi.Dominio",
            "Zyoncore.Sigi.Dominio.ItemMontagemAreaFoto, Zyoncore.Sigi.Dominio",
            "Zyoncore.Sigi.Dominio.ItemMontagemAreaMontagemLivre, Zyoncore.Sigi.Dominio"
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
