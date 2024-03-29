namespace Snebur.AcessoDados
{
    export class ConstrutorConsultaEntidade<TEntidade extends Snebur.Dominio.IEntidade> implements IConsultaEntidade<TEntidade>
    {
        public readonly TipoEntidadeConsulta: r.TipoEntidade;

        public readonly ContextoDados: BaseContextoDados;

        public get EstruturaConsulta(): a.EstruturaConsulta
        {
            throw new Erro("a consulta não foi criar, utilize o método criar caso não precisa fazer nenhuma consulta", this);
        }

        public constructor(contextoDados: BaseContextoDados, tipoEntidade: r.TipoEntidade)
        {
            this.ContextoDados = contextoDados;
            this.TipoEntidadeConsulta = tipoEntidade;
        }

        public Criar(): IConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade(this.ContextoDados, this.TipoEntidadeConsulta);
        }

        //#region Chamadas Sincronas 

        //public RetornarResultadoConsulta(): ResultadoConsulta
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).RetornarResultadoConsulta();
        //}

        //public ToList(): ListaEntidades<TEntidade>
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).ToList();
        //}

        //public Single(): TEntidade
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Single();
        //}

        //public SingleOrDefault(): TEntidade
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).SingleOrDefault();
        //}

        //public First(): TEntidade
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).First();
        //}

        //public FirstOrDefault(): TEntidade
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).FirstOrDefault();
        //}
        ////Funcoes

        //public Count(): number
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Count();
        //}

        //public Min(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): number
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Min(expressaoPropriedade);
        //}

        //public Max(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): number
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Max(expressaoPropriedade);
        //}

        //public Average(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): number
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Average(expressaoPropriedade);
        //}

        //public Sum(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): number
        //{
        //    return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Sum(expressaoPropriedade);
        //}

        //#endregion

        //#region Chamadas Assincronas

        //public RetornarResultadoConsultaAsync(callback: CallbackResultado<ResultadoConsulta>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.RetornarResultadoConsultaAsync(callback);
        //}

        ////public __ToListInternoAsync(callback: CallbackResultado<ListaEntidades<TEntidade>>): void
        ////{
        ////    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        ////    consulta.__ToListInternoAsync(callback);
        ////}

        //public SingleAsync(callback: CallbackResultado<TEntidade>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.SingleAsync(callback);
        //}

        //public __SingleOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__SingleOrDefaultInternoAsync(callback);
        //}

        //public __FirstInternoAsync(callback: CallbackResultado<TEntidade>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__FirstInternoAsync(callback);
        //}

        //public __FirstOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__FirstOrDefaultInternoAsync(callback);
        //}
        //// funcoes
        //public __CountInternoAsync(callback: CallbackResultado<number>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__CountInternoAsync(callback);
        //}

        //public __MinInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__MinInternoAsync(expressaoPropriedade, callback);
        //}

        //public MaxAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.MaxAsync(expressaoPropriedade, callback);
        //}

        //public AverageAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.AverageAsync(expressaoPropriedade, callback);
        //}

        //public SumAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void
        //{
        //    const consulta = new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta);
        //    consulta.__SumInternoAsync(expressaoPropriedade, callback);
        //}

        //#endregion

        //#region Chamadas Async

        public RetornarResultadoConsultaAsync(): Promise<ResultadoConsulta>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).RetornarResultadoConsultaAsync();
        }

        public ToListAsync(): Promise<ListaEntidades<TEntidade>>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).ToListAsync();
        }

        public FindAsync(id:number): Promise<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).FindAsync(id);
        }

        public SingleAsync(): Promise<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).SingleAsync();
        }

        public SingleOrDefaultAsync(): Promise<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).SingleOrDefaultAsync();
        }

        public FirstAsync(): Promise<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).FirstAsync();
        }

        public FirstOrDefaultAsync(): Promise<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).FirstOrDefaultAsync();
        }
        //Funcoes

        public CountAsync(): Promise<number>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).CountAsync();
        }

        public MinAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): Promise<number | Date>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).MinAsync(expressaoPropriedade);
        }

        public MaxAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number | Date>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).MaxAsync(expressaoPropriedade);
        }

        public AverageAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).AverageAsync(expressaoPropriedade);
        }

        public SumAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).SumAsync(expressaoPropriedade);
        }
        //#endregion

        //#region Paginacao

        public Take(take: number): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Take(take);
        }

        public Skip(skip: number): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Skip(skip);
        }
        //#endregion

        //#region Where

        public Where(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: TEntidade[]) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).Where(expressaoFuncaoFiltro, ...argumentos);
        }

        public WhereOr(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: TEntidade[]) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).WhereOr(expressaoFuncaoFiltro, ...argumentos);
        }

        public OfType<TEspecializacao extends TEntidade>(TConstrutorEspecializacao: IConstrutor<TEspecializacao>): ConsultaEntidade<TEspecializacao>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).OfType(TConstrutorEspecializacao);
        }
        //#endregion

        //#region AbrirRelacao 

        public AbrirRelacoes(caminho: string): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).AbrirRelacoes(caminho);
        }

        public AbrirRelacao(caminhoPropriedade: string): ConsultaEntidade<TEntidade>
        public AbrirRelacao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => d.Entidade): ConsultaEntidade<TEntidade>
        public AbrirRelacao(argumento: any): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).AbrirRelacao(argumento);
        }

        public AbrirColecao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<d.Entidade>): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).AbrirColecao(expressaoPropriedade);
        }

        public AbrirRelacaoOuColecao(expressaoPropriedade: (value: TEntidade, index: number, array: TEntidade[]) => d.Entidade | d.Entidade[]): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).AbrirRelacaoOuColecao(expressaoPropriedade);
        }
        //#endregion

        //#region Ordenacao

        public OrderBy(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).OrderBy(expressaoPropriedade);
        }

        public OrderByDescending(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).OrderByDescending(expressaoPropriedade);
        }
        //#endregion

        //#region Colecao 

        public WhereColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoFiltro: (value: TRelacao, index: number, array: Array<TRelacao>) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).WhereColecao(expressaoCaminhoColecao, expressaoFiltro);
        }

        public OrderByColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).OrderByColecao(expressaoCaminhoColecao, expressaoPropriedade);
        }

        public OrderByDescendingColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).OrderByDescendingColecao(expressaoCaminhoColecao, expressaoPropriedade);
        }

        public TakeColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, take: number): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).TakeColecao(expressaoCaminhoColecao, take);
        }

        public SkipColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, skip: number): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).SkipColecao(expressaoCaminhoColecao, skip);
        }
        //#endregion

        //#region Estrutura consulta

        public RetornarEstruturaConsulta(): Snebur.AcessoDados.EstruturaConsulta
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).
                RetornarEstruturaConsulta();
        }

        public IncluirDeletados(): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).
                IncluirDeletados();
        }

        public WhereIds(ids: List<number>): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).
                WhereIds(ids);
        }

        public WhereIn(expressaoCaminhoPropriedade: (value: TEntidade) => number | string, lista: List<number | string>): ConsultaEntidade<TEntidade>
        {
            return new ConsultaEntidade<TEntidade>(this.ContextoDados, this.TipoEntidadeConsulta).
                WhereIn(expressaoCaminhoPropriedade, lista);
        }
    }
}