namespace Snebur.Reflexao
{
    export class ReflexaoNamespaceUtil
    {
        public static RetornarConstrutor(caminho: string,
            isIgnorarErro: boolean = false,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void = null): IConstrutor | IFunction
        {
            return ReflexaoNamespaceUtil.RetornarInstancia(
                EnumTipoInstancia.Function,
                caminho,
                isIgnorarErro,
                callbackAmbiguidade);
        }

        public static RetornarObjeto(caminho: string,
            isIgnorarErro: boolean = false,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void = null): any
        {
            return ReflexaoNamespaceUtil.RetornarInstancia(
                EnumTipoInstancia.Object,
                caminho,
                isIgnorarErro,
                callbackAmbiguidade);
        }

        public static RetornarObjetoOuConstrutor(caminho: string,
            isIgnorarErro: boolean = false,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void = null): any
        {
            return ReflexaoNamespaceUtil.RetornarInstancia(
                EnumTipoInstancia.FunctionOrObject,
                caminho,
                isIgnorarErro,
                callbackAmbiguidade);
        }

        public static RetornarConstrutorEntidade(caminho: string,
            isIgnorarErro: boolean = false,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void = null): IConstrutor<d.Entidade>
        {
            return this.RetornarInstancia(
                EnumTipoInstancia.ConstrutorEntidade,
                caminho,
                isIgnorarErro,
                callbackAmbiguidade);
        }

        private static RetornarInstancia(
            tipoInstancia: EnumTipoInstancia,
            caminho: string,
            isIgnorarErro: boolean,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void): any
        {
            const instancia = ReflexaoNamespaceUtil.RetornarInstanciaInterno(caminho,
                isIgnorarErro,
                callbackAmbiguidade);

            if (instancia != null)
            {
                ReflexaoNamespaceUtil.ValidarTipoInstancia(tipoInstancia, instancia, isIgnorarErro);
            }
            return instancia;
        }


        private static RetornarInstanciaInterno(
            caminho: string,
            isIgnorarErro: boolean,
            callbackAmbiguidade: (construtores: List<IConstrutor | IFunction>) => void): any
        {
            const instancias = ReflexaoNamespaceUtil.RetornarInstancias(caminho);
            if (instancias == null ||
                instancias.length === 0)
            {
                if (isIgnorarErro)
                {
                    return null;
                }
                throw new Erro(`Não foi encontrando uma instancia para o caminho '${caminho}'`);
            }

            if (instancias.length > 1)
            {
                const descricao = String.Join(", ", instancias.Select(x => x.__CaminhoTipo ?? "__tipoDesconhecido"));
                const mensagemErro = `Ambiguidade. Foram encontrado mais de uma instancia para o caminho '${caminho}.
                                      Instancias ${descricao}.
                                      Utilize caminho completo para evitar ambiguidade`;

                if ($Configuracao.IsDebug)
                {
                    throw new Erro(mensagemErro);
                }

                if (typeof callbackAmbiguidade === "function")
                {
                    callbackAmbiguidade(instancias);
                }
                 
                if (isIgnorarErro)
                {
                    console.warn(mensagemErro);
                    return null;
                }
                throw new Erro(mensagemErro);
            }
            return instancias[0];

        }
        private static RetornarInstancias(caminho: string): any[]
        {
            const ultimoPonto = caminho.lastIndexOf(".");
            if (ultimoPonto > 0)
            {
                if (u.CharUtil.IsLower(caminho[0]))
                {
                    const atalho = caminho.substring(0, caminho.indexOf("."));
                    if (atalho.toLowerCase() === atalho)
                    {
                        const instancia = GerenciadorNamespace.RetornarInstanciaDoAtalho(atalho, caminho.substring(atalho.length + 1));
                        return instancia != null ? [instancia] : null;
                    }
                }

                const namespace = GerenciadorNamespace.RetornarNamespace(caminho);
                if (namespace != null)
                {
                    const instancia = namespace.RetornarInstanciaObjeto(caminho);
                    return instancia != null ? [instancia] : null;
                }
            }

            const instancias = new List<any>();
            for (const namespace of GerenciadorNamespace.TodosNamespace)
            {
                const instancia = namespace.RetornarInstanciaObjeto(caminho);
                if (instancia != null && !instancias.Contains(instancia))
                {
                    instancias.Add(instancia);
                }
            }
            return instancias.Distinct();
        }

        private static ValidarTipoInstancia(
            tipoInstancia: EnumTipoInstancia,
            instancia: any,
            isIgnorarErro: boolean)
        {
            const mensagemValiacao = ReflexaoNamespaceUtil.RetornarMensagemValidacao(
                tipoInstancia, instancia);
            if (mensagemValiacao != null)
            {
                if (isIgnorarErro)
                {
                    console.error(mensagemValiacao);
                }
                throw new Erro(mensagemValiacao);
            }
        }

        private static RetornarMensagemValidacao(
            tipoInstancia: EnumTipoInstancia,
            instancia: any): string | null
        {
            const type = typeof instancia;
            switch (tipoInstancia)
            {
                case EnumTipoInstancia.Function:

                    if (type !== "function")
                    {
                        return `Instancia não é do tipo ${type}. Esperado function`;
                    }
                    break;
                case EnumTipoInstancia.Object:

                    if (type !== "object")
                    {
                        return `Instancia não é do tipo ${type}. Esperado object`;
                    }
                    break;
            }
            return null;
        }
    }


    enum EnumTipoInstancia
    {
        Function,
        Object,
        FunctionOrObject,
        ConstrutorEntidade
    }
}