namespace Snebur.AcessoDados
{
    export class AjudanteNormalizarEntidadesSalvas
    {
        private readonly DicionarioSalvas: DicionarioSimples<EntidadeInfo>;
        private readonly DicionarioAlvos: DicionarioSimples<EntidadeInfo>;

        public constructor(
            private readonly EntidadesSalvas: List<Entidade>,
            private readonly EntidadesAlvos: List<Entidade> = [])
        {
            this.DicionarioSalvas = EntidadeInfoUtil.RetornarDicionario(this.EntidadesSalvas);
            this.DicionarioAlvos = EntidadeInfoUtil.RetornarDicionario(this.EntidadesAlvos);
        }

        public Normalizar(resultadoSalvar: ResultadoSalvar): void
        {
            this.LimparPropriedadesAlteradas(this.DicionarioSalvas);
            this.LimparPropriedadesAlteradas(this.DicionarioAlvos);

            const dicionarioSalvas = this.DicionarioSalvas;
            const dicionarioAlvos = this.DicionarioAlvos;

            for (const resultadoEntidadeSalvada of resultadoSalvar.EntidadesSalvas)
            {
                this.AtualizarEntidadeSalvada(dicionarioSalvas, resultadoEntidadeSalvada);
                this.AtualizarEntidadeSalvada(dicionarioAlvos, resultadoEntidadeSalvada);
            }
        }

        private LimparPropriedadesAlteradas(dicionario: DicionarioSimples<EntidadeInfo>)
        {
            for (const entidadeInfo of dicionario.Valores)
            {
                entidadeInfo.LimparPropriedadesAlteradas();
            }
        }

        private AtualizarEntidadeSalvada(
            dicionarEntidades: DicionarioSimples<EntidadeInfo>,
            resultadoEntidadeSalvada: EntidadeSalva)
        {
            if (dicionarEntidades.ContainsKey(resultadoEntidadeSalvada.IdentificadorUnicoEntidade))
            {
                const entidadeInfo = dicionarEntidades.Item(resultadoEntidadeSalvada.IdentificadorUnicoEntidade);
                const tipo = entidadeInfo.Entiade.GetType();
                if (entidadeInfo.Entiade.Id === 0)
                {
                    entidadeInfo.Entiade.Id = resultadoEntidadeSalvada.Id;
                }

                for (const propriedadeComputada of resultadoEntidadeSalvada.PropriedadesComputada)
                {
                    let valorPropriedade = propriedadeComputada.Valor;
                    const propriedade = tipo.RetornarPropriedade(propriedadeComputada.NomePropriedade);
                    if (propriedade instanceof r.Propriedade)
                    {
                        if (propriedade.Tipo instanceof r.TipoPrimario)
                        {
                            const tipoPrimarioEnum = (propriedade.Tipo as r.TipoPrimario).TipoPrimarioEnum;
                            valorPropriedade = u.ConverterUtil.ConverterValorPrimario(valorPropriedade, tipoPrimarioEnum);
                        }
                        (entidadeInfo.Entiade as any)[propriedadeComputada.NomePropriedade] = valorPropriedade;
                    }
                }
            }
        }
    }

    class EntidadeInfo
    {
        //Propriedades que serão salvar no servidor
        public readonly PopriedadesAlteradasSalvas: DicionarioSimples<d.PropriedadeAlterada>;
        public readonly DescricaoPropriedades: string;

        public constructor(
            public readonly Entiade: d.Entidade)
        {
            this.PopriedadesAlteradasSalvas = this.Entiade.__PropriedadesAlteradas?.Clone(true) ?? null;
            if (this.PopriedadesAlteradasSalvas != null)
            {
                this.DescricaoPropriedades = String.Join("--", this.PopriedadesAlteradasSalvas?.Valores.Select(x => x.toString()));
            }

        }

        public LimparPropriedadesAlteradas()
        {
            if (this.PopriedadesAlteradasSalvas == null)
            {
                DebugUtil.ThrowAndContinue("Analisar essa situação");
                return;
            }

            /***
             * no omento que entidade é salva no servidor
             * pode haver alterações na mesmo no lado cliente, 
             * somente serão removidas a propriedades alteras e foram salvo no servidor
             * com mesmo valor da propriedade
             */

            const propriedadesSalvas = this.PopriedadesAlteradasSalvas;
            const propriedadesCliente = this.Entiade.__PropriedadesAlteradas;

            for (const chave of propriedadesSalvas.Chaves)
            {
                if (propriedadesCliente.ContainsKey(chave))
                {
                    const propriedadeSalva = propriedadesSalvas.Item(chave);
                    const propriedadeCliente = this.Entiade.__PropriedadesAlteradas.Item(chave);

                    const isNovoValorIgual = propriedadeSalva.NovoValor === propriedadeCliente.NovoValor;
                    if (isNovoValorIgual)
                    {
                        const valorPropriedadeEntidade = u.ReflexaoUtil.RetornarValorPropriedade(this.Entiade, propriedadeCliente.CaminhoPropriedade);
                        if (valorPropriedadeEntidade !== propriedadeSalva.NovoValor)
                        {
                            DebugUtil.ThrowAndContinue("Valores PropriedadeAltera cliente e salva  igual. Porém o valor da propriedade na entidade é diferente da propriedade alterada salva");
                            continue;
                        }
                        propriedadesCliente.Remove(chave);
                    }
                }
            }

            if (this.Entiade.__PropriedadesAlteradas.Count > 0)
            {
                DebugUtil.ThrowAndContinue("Bing houve alteração");
            }
        }

        public toString(): string
        {
            return `${this.Entiade.toString()}_${this.DescricaoPropriedades}`;
        }

    }

    class EntidadeInfoUtil
    {
        public static RetornarDicionario(entidades: Array<d.Entidade>): DicionarioSimples<EntidadeInfo>
        {
            const dicionario = new DicionarioSimples<EntidadeInfo>();
            const len = entidades.length;
            for (let i = 0; i < len; i++)
            {
                const entidade = entidades[i];
                EntidadeInfoUtil.VarrerEntidadeInterno(dicionario, entidade);
            }
            return dicionario;
        }

        private static VarrerEntidadeInterno(dicionario: DicionarioSimples<EntidadeInfo>, entidade: d.Entidade): void
        {
            if (dicionario.ContainsKey(entidade.RetornarIdentificadorReferencia()))
            {
                return;
            }
            dicionario.Add(entidade.RetornarIdentificadorReferencia(), new EntidadeInfo(entidade));

            const propriedades = entidade.GetType().RetornarPropriedades();
            const propriedadesEntidade = propriedades.Where(x => x.Tipo instanceof r.TipoEntidade).ToList();
            for (const propriedadeEntidade of propriedadesEntidade)
            {
                const entidadeRelacao = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeEntidade.Nome);
                if (entidadeRelacao instanceof d.Entidade)
                {
                    EntidadeInfoUtil.VarrerEntidadeInterno(dicionario, entidadeRelacao);
                }
            }

            const propriedadesListaEntidades = propriedades.Where(x => x.Tipo instanceof r.TipoListaEntidade).ToList();
            for (const propriedadeTipoListaEntidade of propriedadesListaEntidades)
            {
                const entidadesRelacaoFilho = u.ReflexaoUtil.RetornarValorPropriedade(entidade, propriedadeTipoListaEntidade.Nome);
                for (const entidadeFilho of entidadesRelacaoFilho)
                {
                    if (entidadeFilho instanceof d.Entidade)
                    {
                        EntidadeInfoUtil.VarrerEntidadeInterno(dicionario, entidadeFilho);
                    }
                }
            }
        }
    }
}