namespace Snebur.Dominio
{
    export class AjudanteClonaEntidade
    {
        private readonly TipoEntidade: r.TipoEntidade;
        public constructor(
            private readonly EntidadeOrigem: Entidade)
        {
            this.TipoEntidade = this.EntidadeOrigem.GetType() as r.TipoEntidade;
        }

        public Clonar<TEntidade extends Entidade>(
            opcoes: EnumOpcaoClonarEntidade = EnumOpcaoClonarEntidade.Tudo,
            funcaoClonarValorProprieadede?: FuncaoClonarPropriedade): Entidade
        {
            const tipoEntidade = this.TipoEntidade;
            const entidadeClonada = new tipoEntidade.Construtor() as Entidade;

            (entidadeClonada as any as IEntidadeClonada).___is_entidade_clonada__ = true;

            (entidadeClonada as any as IObjetoControladorPropriedade).DesativarNotificacaoPropriedadeAlterada();

            const referencia = this.EntidadeOrigem as any;

            if (opcoes === EnumOpcaoClonarEntidade.Tudo)
            {
                const propriedades = tipoEntidade.RetornarPropriedades(false);
                propriedades.Remove(tipoEntidade.PropriedadeChavePrimaria);

                for (const propriedade of propriedades)
                {
                    if (propriedade.IsSomenteLeitura)
                    {
                        continue;
                    }

                    const valorPropriedade = referencia[propriedade.Nome];
                    const valorPropriedaeClonado = this.RetornarValorPropriedadeClonado(opcoes, propriedade, valorPropriedade, funcaoClonarValorProprieadede);
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
                        const valorPropriedade = referencia[propriedade.Nome];
                        if (valorPropriedade instanceof d.BaseTipoComplexo)
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
                    (entidadeClonada as any)[propriedadeChaveEstrangeira.Nome] = referencia[propriedadeChaveEstrangeira.Nome];
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
                        const valorPropriedade = referencia[propriedade.Nome];
                        (entidadeClonada as any)[propriedade.Nome] = valorPropriedade;
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
                        (entidadeClonada as any)[propriedade.Nome] = referencia[propriedade.Nome];
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
            return entidadeClonada as TEntidade;
        }

        private RetornarValorPropriedadeClonado(opcoes: EnumOpcaoClonarEntidade, propriedade: r.Propriedade, valorPropriedade: any, funcaoClonarValorProprieade: FuncaoClonarPropriedade): any
        {
            if (typeof funcaoClonarValorProprieade === "function")
            {
                const valor = funcaoClonarValorProprieade(propriedade, valorPropriedade);
                if (valor !== undefined)
                {
                    return valor;
                }
            }
            return this.ClonarValorPropriedade(opcoes, propriedade, valorPropriedade, funcaoClonarValorProprieade);
        }

        private ClonarValorPropriedade(opcoes: EnumOpcaoClonarEntidade, propriedade: r.Propriedade, valorPropriedade: any, funcaoClonarValorProprieade: FuncaoClonarPropriedade): any
        {
            if (valorPropriedade instanceof Entidade)
            {
                if ((valorPropriedade as any as IEntidadeClonada).___is_entidade_clonada__)
                {
                    return valorPropriedade;
                }
                return valorPropriedade.Clonar(opcoes, funcaoClonarValorProprieade);
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
                        item = this.RetornarValorPropriedadeClonado(opcoes, propriedade, item, funcaoClonarValorProprieade);
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
    }
}
