namespace Snebur.AcessoDados
{
    export class AjudanteNormalizarEntidadesSalvas
    {
        public constructor(
            private readonly EntidadesSalvas: List<Entidade>,
            private readonly EntidadesAlvos: List<Entidade> = [])
        {
             

        }

        public Normalizar(resultadoSalvar: ResultadoSalvar): void
        {
            const dicionarioSalvas = u.EntidadeUtil.RetornarDicionario(this.EntidadesSalvas);
            const dicionarioAlvos = u.EntidadeUtil.RetornarDicionario(this.EntidadesAlvos);

            dicionarioSalvas.Valores.ForEach(x => x.__PropriedadesAlteradas.Clear());
            dicionarioAlvos.Valores.ForEach(x => x.__PropriedadesAlteradas.Clear());

            for (const resultadoEntidadeSalvada of resultadoSalvar.EntidadesSalvas)
            {
                this.AtualizarEntidadeSalvada(dicionarioSalvas,resultadoEntidadeSalvada);
                this.AtualizarEntidadeSalvada(dicionarioAlvos,resultadoEntidadeSalvada);
            }
        }
        private AtualizarEntidadeSalvada(
            dicionarEntidades: DicionarioSimples<d.Entidade>,
            resultadoEntidadeSalvada: EntidadeSalva)
        {
            if (dicionarEntidades.ContainsKey(resultadoEntidadeSalvada.IdentificadorUnicoEntidade))
            {
                const entidade = dicionarEntidades.Item(resultadoEntidadeSalvada.IdentificadorUnicoEntidade);
                const tipo = entidade.GetType();
                if (entidade.Id === 0)
                {
                    entidade.Id = resultadoEntidadeSalvada.Id;
                }

                for (const propriedadeComputada of resultadoEntidadeSalvada.PropriedadesComputada )
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
                        (entidade as any)[propriedadeComputada.NomePropriedade] = valorPropriedade;
                    }
                }
            }
        }
    }
}