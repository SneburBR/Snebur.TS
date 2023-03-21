namespace Snebur.Dominio
{
    export class AjudanteClonarEntidade
    {
        private static Gerenciador: GerenciadorCloneEntidade = null;
        private static __isClonando: boolean = false;

        public static Clonar<TEntidade extends Entidade>(
            entidadeOrigem: d.Entidade,
            opcoes: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.Tudo,
            funcaoClonarValorProprieadede?: FuncaoClonarPropriedade): TEntidade
        {
            if (AjudanteClonarEntidade.__isClonando)
            {
                return AjudanteClonarEntidade.Gerenciador.Clonar(
                    entidadeOrigem,
                    opcoes) as any as TEntidade;
            }

            AjudanteClonarEntidade.__isClonando = true;

            /*const descricaoEntidade = ` ${entidadeOrigem.__IdentificadorEntidade} ${u.EntidadeUtil.RetornarDescricaoEntidade(entidadeOrigem)}`;*/
            /*console.WarmDebug(` Iniciando clone  entidade: ${descricaoEntidade}   ( novo gerenciador_ `);*/
             

            AjudanteClonarEntidade.Gerenciador = new GerenciadorCloneEntidade();
            const entidadeClonada = AjudanteClonarEntidade.Gerenciador.Clonar(entidadeOrigem, opcoes, funcaoClonarValorProprieadede);

            /*console.WarmDebug(` Finalizado clone entidade ${descricaoEntidade} -  ${AjudanteClonarEntidade.Gerenciador.Stopwatch.TotalSeconds}s  (Gerenciador dispensado)`);*/

            AjudanteClonarEntidade.Gerenciador.Dispose();
            AjudanteClonarEntidade.Gerenciador = null;
            delete AjudanteClonarEntidade.Gerenciador;
            AjudanteClonarEntidade.__isClonando = false;

            return entidadeClonada as any  as TEntidade;
        }
    }

    class GerenciadorCloneEntidade implements Snebur.IDisposable
    {
        private __isDepensado: boolean = false;
        private readonly EntidadesClonas = new DicionarioEntidade<Entidade, IEntidadeClonada>();
        public readonly Stopwatch = Stopwatch.StartNew();
        private readonly Clonadores = new List<ClonadorEntidade>();

        public Clonar (entidadeOrigem: d.Entidade,
            opcoes: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.Tudo,
            funcaoClonarValorProprieadede?: FuncaoClonarPropriedade): IEntidadeClonada
        {
            if (this.__isDepensado)
            {
                throw new Erro("O gerenciador do clone de entidade foi dispensado");
            }

            if (this.EntidadesClonas.ContainsKey(entidadeOrigem))
            {
                return this.EntidadesClonas.Item(entidadeOrigem);
            }

            const clonador = new ClonadorEntidade(entidadeOrigem, opcoes, funcaoClonarValorProprieadede);
            this.Clonadores.Add(clonador);
            this.EntidadesClonas.Add(entidadeOrigem, clonador.EntidadeClonada);
            clonador.Clonar();
            return clonador.EntidadeClonada;
        }
         
        public Dispose(): void
        {
            for (const clonador of this.Clonadores)
            {
                clonador.Dispose();
            }
            this.Clonadores.Clear();
            this.EntidadesClonas.Clear();
            this.DispensarInterno();
            this.__isDepensado = true;
        }

        private DispensarInterno(this: any)
        {
            delete this.EntidadesClonas;
            delete this.Clonadores;
        }

    }

    class ClonadorEntidade implements Snebur.IDisposable
    {
        private PropriedadesClonadas = new HashSet<r.Propriedade>();
        private readonly TipoEntidade: r.TipoEntidade;
        public readonly EntidadeClonada: IEntidadeClonada;


        constructor(
            private readonly EntidadeOrigem: d.Entidade,
            private readonly Opcoes: EnumOpcaoClonarEntidade,
            private readonly FuncaoClonarValorProprieadede: FuncaoClonarPropriedade)
        {

            this.TipoEntidade = this.EntidadeOrigem.GetType() as r.TipoEntidade;
            const entidadeClonada = (new this.TipoEntidade.Construtor() as any) as IEntidadeClonada;

            entidadeClonada.___is_entidade_clonada__ = true;
            (entidadeClonada as any as IObjetoControladorPropriedade).DesativarNotificacaoPropriedadeAlterada();
            this.EntidadeClonada = entidadeClonada;

        }

        public Clonar(): void
        {

            const tipoEntidade = this.TipoEntidade;
            const entidadeClonada = this.EntidadeClonada;
            const opcoes = this.Opcoes;
            const origemReferencia = this.EntidadeOrigem as any;

            if (opcoes === EnumOpcaoClonarEntidade.Tudo)
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                propriedades.Remove(tipoEntidade.PropriedadeChavePrimaria);

                for (const propriedade of propriedades)
                {
                    if (!this.IsPodeClonarPropriedade(propriedade))
                    {
                        continue;
                    }

                    const valorPropriedade = origemReferencia[propriedade.Nome];
                    const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedade, valorPropriedade);
                    (entidadeClonada as any)[propriedade.Nome] = valorPropriedaeClonado;
                }
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.PropriedadesTiposComplexo))
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                for (const propriedade of propriedades)
                {
                    if (propriedade.Tipo instanceof r.TipoComplexo)
                    {
                        if (!this.IsPodeClonarPropriedade(propriedade))
                        {
                            continue;
                        }

                        const valorPropriedade = origemReferencia[propriedade.Nome];
                        const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedade, valorPropriedade);
                        if (valorPropriedaeClonado instanceof d.BaseTipoComplexo)
                        {
                            (entidadeClonada as any)[propriedade.Nome] = valorPropriedade.Clone();
                        }
                    }
                }
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.ChavesEstrangeira))
            {
                const propriedadesChavaEstrangeira = tipoEntidade.PropriedadesChaveEstrangeiras;
                for (const propriedadeChaveEstrangeira of propriedadesChavaEstrangeira)
                {
                    if (!this.IsPodeClonarPropriedade(propriedadeChaveEstrangeira))
                    {
                        continue;
                    }

                    const valorPropriedade = origemReferencia[propriedadeChaveEstrangeira.Nome];
                    const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedadeChaveEstrangeira, valorPropriedade);
                    (entidadeClonada as any)[propriedadeChaveEstrangeira.Nome] = valorPropriedaeClonado;
                }
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.PropriedadesTiposPrimario))
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                for (const propriedade of propriedades)
                {
                    if (propriedade.Tipo.IsTipoPrimario &&
                        !propriedade.Nome.startsWith("_"))
                    {
                        if (!this.IsPodeClonarPropriedade(propriedade))
                        {
                            continue;
                        }

                        const valorPropriedade = origemReferencia[propriedade.Nome];
                        const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedade, valorPropriedade);
                        (entidadeClonada as any)[propriedade.Nome] = valorPropriedaeClonado;
                    }
                }
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.PropriedadesAlteradas) &&
                this.EntidadeOrigem.__PropriedadesAlteradas !== null)
            {
                const propriedadesAlteradas = new DicionarioSimples<d.PropriedadeAlterada>();
                for (const chave of this.EntidadeOrigem.__PropriedadesAlteradas.Chaves)
                {
                    const propriedadeAlterada = this.EntidadeOrigem.__PropriedadesAlteradas.Item(chave);
                    propriedadesAlteradas.Add(chave, propriedadeAlterada.Clone());

                    const propriedade = this.GetType().RetornarPropriedade(propriedadeAlterada.NomePropriedade, true);
                    if (propriedade != null)
                    {
                        if (!this.IsPodeClonarPropriedade(propriedade))
                        {
                            continue;
                        }

                        (entidadeClonada as any)[propriedade.Nome] = origemReferencia[propriedade.Nome];
                    }
                }

                (entidadeClonada as any).__propriedadesAlteradas__ = propriedadesAlteradas;
            }

            if (opcoes.HasFlag(EnumOpcaoClonarEntidade.NaoClonarId))
            {
                entidadeClonada.Id = 0;
            }
            else
            {
                entidadeClonada.Id = this.EntidadeOrigem.Id;
            }

            (entidadeClonada as any as IObjetoControladorPropriedade).AtivarNotificacaoPropriedadeAlterada();
            /*     return entidadeClonada as TEntidade;*/
        }

        private RetornarValorPropriedadeClonado(opcoes: EnumOpcaoClonarEntidade,
            propriedade: r.Propriedade,
            valorPropriedade: any): any
        {
            if (typeof this.FuncaoClonarValorProprieadede === "function")
            {
                const valor = this.FuncaoClonarValorProprieadede(propriedade, valorPropriedade);
                if (valor !== undefined)
                {
                    return valor;
                }
            }
            return this.ClonarValorPropriedade(opcoes, propriedade, valorPropriedade);
        }

        private ClonarValorPropriedade(opcoes: EnumOpcaoClonarEntidade, propriedade: r.Propriedade, valorPropriedade: any): any
        {
            if (valorPropriedade instanceof Entidade)
            {
                if ((valorPropriedade as any as IEntidadeClonada).___is_entidade_clonada__)
                {
                    return valorPropriedade;
                }
                return valorPropriedade.Clonar(opcoes, this.FuncaoClonarValorProprieadede);
            }

            if (valorPropriedade instanceof Array)
            {
                const lista = valorPropriedade;
                const novoLista = this.RetornarNovaLista(valorPropriedade);
                for (let i = 0; i < valorPropriedade.length; i++)
                {
                    let item = lista[i];
                    if (item instanceof Entidade)
                    {
                        item = this.RetornarValorPropriedadeClonado(opcoes, propriedade, item);
                    }
                    novoLista.Add(item);
                }
                return novoLista;
            }

            if (valorPropriedade instanceof BaseTipoComplexo)
            {
                return valorPropriedade.Clone();
            }
            return valorPropriedade;
        }

        private RetornarNovaLista(lista: Array<any>): Array<any>  
        {
            switch (lista.TipoLista)
            {
                case EnumTipoLista.Array:

                    return new Array<any>();

                case EnumTipoLista.List:

                    return new List<any>();

                case EnumTipoLista.ListaObservacao:

                    return new ListaObservacao<any>();

                case EnumTipoLista.ListaObservacaoIndexada: {

                    const expressaoChave = (lista as any)["ExpressaoChave"];
                    return new ListaObservacaoIndexada<any>(expressaoChave);
                }
                case EnumTipoLista.ListaEntidades:

                    return new ListaEntidades<any>();

                case EnumTipoLista.ListaEntidadesIndexada:

                    return new ListaEntidadesIndexada<any>();

            }
            throw new Erro("Method not implemented.");
        }

        private IsPodeClonarPropriedade(propriedade: r.Propriedade)
        {
            //está assim para parar nos breakpoint
            //VisualStudio fica muito lento ao aplicar condições nos breakpoints

            if (propriedade.IsSomenteLeitura)
            {
                return false;
            }

            if (this.PropriedadesClonadas.Contains(propriedade))
            {
                return false;
            }
            //apenas para breakpoint
            if (propriedade.Nome.startsWith("_"))
            {
                return false;
            }
            //apenas para breakpoint
            if (propriedade.Nome.startsWith("__"))
            {
                return false;
            }
            this.PropriedadesClonadas.Add(propriedade);
            return true;
        }

        public Dispose()
        {
            this.PropriedadesClonadas.Clear();
            this.DipensarInterno();
        }

        private DipensarInterno(this: any)
        {
            this.PropriedadesClonadas = undefined;
            this.TipoEntidade = undefined;
            this.EntidadeClonada = undefined;

            delete this.PropriedadesClonadas;
            delete this.TipoEntidade;
            delete this.EntidadeClonada;
        }
    }
}
