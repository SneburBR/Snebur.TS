namespace Snebur.Reflexao
{
    export class GerenciadorNamespace
    {
        private static _isInicializado = false;
        private static readonly _todosNamespace = new List<BaseNamespace>();

        private static readonly NamespaceFramework = ["Snebur",
            "Snebur.Dominio",
            "Snebur.UI",
            "Snebur.Reflexao",
            "Snebur.Utilidade",
            "Snebur.Imagem",
            "Snebur.Dominio.Atributos"];

        private static readonly AtalhosNamespaceFramework: List<[string, string]> = [
            ["d", "Snebur.Dominio"],
            ["ui", "Snebur.UI"],
            ["r", "Snebur.Reflexao"],
            ["u", "Snebur.Utilidade"],
            ["i", "Snebur.Imagem"],
            ["at", "Snebur.Dominio.Atributos"],
        ];

        private static readonly DicionarioTodosNamespace = new DicionarioSimples<BaseNamespace>();
        private static readonly NamespaceRaiz = new DicionarioSimples<NamespaceRaiz>();
        private static readonly AtalhosNamespace = new DicionarioSimples<BaseNamespace>();

        public static get TodosNamespace(): List<BaseNamespace>
        {
            return GerenciadorNamespace._todosNamespace;
        }

        public static Inicializar()
        {
            GerenciadorNamespace.PopularNamespaces(EnumTipoNamespace.Framework, GerenciadorNamespace.NamespaceFramework);
            GerenciadorNamespace.PopularNamespaces(EnumTipoNamespace.Depedencia, $Configuracao.NamespacesDependecia);
            GerenciadorNamespace.PopularNamespaces(EnumTipoNamespace.Entidades, $Configuracao.NamespacesEntidade);
            GerenciadorNamespace.PopularNamespaces(EnumTipoNamespace.Aplicacao, [$Configuracao.NamespaceAplicacao]);
            GerenciadorNamespace.PopularAtalhosNamespace();

            const todosNamespace = this.DicionarioTodosNamespace.ToArray();
            GerenciadorNamespace._todosNamespace.AddRange(todosNamespace.OrderBy(x => x.Prioridade));
            GerenciadorNamespace.TodosNamespace.ForEach(x => x.ValidarScriptsNormalizado());
            GerenciadorNamespace._isInicializado = true;
            //GerenciadorNamespace.Testes();
           
        }

        public static AdicionarNamespace(namespace: BaseNamespace)
        {
            if (GerenciadorNamespace.DicionarioTodosNamespace.ContainsKey(namespace.Caminho))
            {
                throw new Erro(`O namesoace ${namespace.Caminho} já foi adicionado no GerenciadorNamespace`);
            }
            GerenciadorNamespace.DicionarioTodosNamespace.Add(namespace.Caminho, namespace);
        }
         
        public static RetornarNamespace(caminho: string): BaseNamespace
        {
            if (GerenciadorNamespace.DicionarioTodosNamespace.ContainsKey(caminho))
            {
                return GerenciadorNamespace.DicionarioTodosNamespace.Item(caminho);
            }

            const seguimentos = caminho.split(".");
            if (seguimentos.Count > 1)
            {
                seguimentos.RemoveAt(seguimentos.length - 1);
                if (seguimentos.Count > 0)
                {
                    const subCaminho = String.Join(".", seguimentos);
                    return GerenciadorNamespace.RetornarNamespace(subCaminho);
                }
            }
            return null;
        }
 
        public static RetornarInstanciaDoAtalho(
            atalho: string, caminho: string)
        {
            if (!GerenciadorNamespace.AtalhosNamespace.ContainsKey(atalho))
            {
                throw new Erro(`Não foi encontrado o atalho ${atalho}`);
            }
            return GerenciadorNamespace.AtalhosNamespace.Item(atalho).RetornarInstanciaObjeto(caminho);
        }

        private static PopularNamespaces(tipoNamespace: EnumTipoNamespace, caminhos: string[]): void
        {
            for (const caminho of caminhos)
            {
                const seguementos = caminho.split(".");
                const raiz = seguementos.First();
                if (!GerenciadorNamespace.NamespaceRaiz.ContainsKey(raiz))
                {
                    GerenciadorNamespace.NamespaceRaiz.Add(raiz, new NamespaceRaiz(tipoNamespace, raiz));
                }

                if (seguementos.length > 1)
                {
                    const namespaceRaiz = GerenciadorNamespace.NamespaceRaiz.Item(raiz);
                    namespaceRaiz.PopularNamespaceFilhos(tipoNamespace, seguementos.Skip(1));
                }
            }
        }

        private static PopularAtalhosNamespace(): void
        {
            GerenciadorNamespace.PopularAtalhosNamespaceInterno(GerenciadorNamespace.AtalhosNamespaceFramework);

            if ($Configuracao.AtalhosNamespace != null && Array.isArray($Configuracao.AtalhosNamespace))
            {
                GerenciadorNamespace.PopularAtalhosNamespaceInterno($Configuracao.AtalhosNamespace);
            }
        }

        private static PopularAtalhosNamespaceInterno(atalhosNamespace: [string, string][])
        {
            for (const [atalho, caminho] of atalhosNamespace)
            {
                if (String.IsNullOrWhiteSpace(atalho))
                {
                    throw new Erro(`O atalho para namespace '$caminho{}' não foi definido`);
                }

                if (String.IsNullOrWhiteSpace(caminho))
                {
                    throw new Erro(`O caminho para o atalho '${atalho}' para namespace não foi definido`);
                }

                if (atalho[0] !== atalho[0].toLocaleLowerCase())
                {
                    throw new Erro(`O atalho '${at}' para o namepsace '${caminho}' ser lowercase`);
                }

                if (GerenciadorNamespace.AtalhosNamespace.ContainsKey(atalho))
                {
                    const namespaceAtalho = GerenciadorNamespace.AtalhosNamespace.Item(atalho);
                    if (namespaceAtalho.Caminho !== caminho)
                    {
                        throw new Erro(`Já existe um atalho '${atalho}' para o namepsace '${namespaceAtalho.Caminho}'.
                                        Não foi possivel adicionor o atalho para '${caminho}'`);
                    }
                    return;
                }

                if (!GerenciadorNamespace.DicionarioTodosNamespace.ContainsKey(caminho))
                {
                    throw new Erro(`Não foi encontrado a namespace para o caminho '${caminho}'.
                                    Adicione o caminho em $Configuracao.NamespacesDependecia`);
                }
                const namespace = GerenciadorNamespace.DicionarioTodosNamespace.Item(caminho);
                GerenciadorNamespace.AtalhosNamespace.Add(atalho, namespace);
            }
        }

        private static Teste()
        {
            const aaaa = r.ReflexaoNamespaceUtil.RetornarConstrutor("Converter.DefinidoParaVisibilidade");
            const x8 = r.ReflexaoNamespaceUtil.RetornarConstrutor("u.FormatacaoUtil");

            const a1 = r.GerenciadorNamespace.RetornarNamespace("Snebur.XXX.Teste");
            const x1 = r.ReflexaoNamespaceUtil.RetornarConstrutor("Snebur.XXX.Teste", true);
            const a2 = r.GerenciadorNamespace.RetornarNamespace("Snebur.Dominio.Teste");
            const a2aaa = r.GerenciadorNamespace.RetornarNamespace("Snebur.Dominio.Atributos");
            const a3 = r.ReflexaoNamespaceUtil.RetornarConstrutor("Snebur.Aplicacao.BaseAplicacao");
            const x3 = r.ReflexaoNamespaceUtil.RetornarObjeto("Snebur.Dominio.Atributos");
            const a5 = r.ReflexaoNamespaceUtil.RetornarConstrutor("Snebur.Dominio.Atributos.ValidacaoRequeridoAttribute");
            const a6 = r.ReflexaoNamespaceUtil.RetornarConstrutor("Snebur.Imagem.AbrirImagemImpressao");
            const x7 = r.ReflexaoNamespaceUtil.RetornarConstrutor("Snebur.Imagem.Processamento.Local.Seguimento2.TesteXXX");

            const xaa = r.ReflexaoNamespaceUtil.RetornarConstrutor("ui.BaseControle");
            const x9 = r.ReflexaoNamespaceUtil.RetornarConstrutor("ui.Converter.DefinidoParaVisibilidade");
            const xaaaa = r.ReflexaoNamespaceUtil.RetornarConstrutor("ImagemUtil");
        }
    }

    export enum EnumTipoNamespace
    {
        Aplicacao = 0,
        Entidades = 1,
        Depedencia = 2,
        Framework = 3
    }
}
