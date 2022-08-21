namespace Snebur.AcessoDados
{
    export interface IConsultaEntidade<TEntidade extends Snebur.Dominio.IEntidade>
    {
        EstruturaConsulta: Snebur.AcessoDados.EstruturaConsulta;

        ContextoDados: BaseContextoDados;

        TipoEntidadeConsulta: r.TipoEntidade;

        //#region Chamadas sincronas

        /*RetornarResultadoConsulta(): ResultadoConsulta;*/

        //ToList(): ListaEntidades<TEntidade>;

        //Single(): TEntidade;

        //SingleOrDefault(): TEntidade;

        //First(): TEntidade;

        //FirstOrDefault(): TEntidade;

        //Count(): number;

        //Min(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number | Date;

        //Max(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number | Date;

        //Average(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number | Date;

        //Sum(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): number | Date;

        //#endregion

        //#region Chamdas Assincronas

        RetornarResultadoConsultaAsync(callback: CallbackResultado<ResultadoConsulta>): void;

        //__ToListInternoAsync(callback: CallbackResultado<ListaEntidades<TEntidade>>): void;

        //__SingleInternoAsync(callback: CallbackResultado<TEntidade>): void;

        //__SingleOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void;

        //__FirstInternoAsync(callback: CallbackResultado<TEntidade>): void;

        //__FirstOrDefaultInternoAsync(callback: CallbackResultado<TEntidade>): void;

        //__CountInternoAsync(callback: CallbackResultado<number>): void;

        //__MinInternoAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void;

        MaxAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void;

        AverageAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void;

        SumAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date, callback: CallbackResultado<number | Date>): void;

        //#endregion

        //#region Chamadas Async

        RetornarResultadoConsultaAsync(): Promise<ResultadoConsulta>;

        ToListAsync(): Promise<ListaEntidades<TEntidade>>;

        FindAsync(id: number): Promise<TEntidade>;

        SingleAsync(): Promise<TEntidade>;

        SingleOrDefaultAsync(): Promise<TEntidade>;

        FirstAsync(): Promise<TEntidade>;

        FirstOrDefaultAsync(): Promise<TEntidade>;

        CountAsync(): Promise<number>;

        MinAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): Promise<number | Date>;

        MaxAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number | Date): Promise<number | Date>;

        AverageAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>;

        SumAsync(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => number): Promise<number>;

        //#endregion
         
        Where(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: Array<TEntidade>) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>;

        WhereOr(expressaoFuncaoFiltro: (value: TEntidade, index: number, array: Array<TEntidade>) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>;

        OfType<TEspecializacao extends TEntidade>(TConstrutorEspecializacao: IConstrutor<TEspecializacao>): ConsultaEntidade<TEspecializacao>;

        AbrirRelacoes(relacoes: string): ConsultaEntidade<TEntidade>;

        AbrirRelacao(caminhoPropriedade: string): ConsultaEntidade<TEntidade>;

        AbrirRelacao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => d.Entidade): ConsultaEntidade<TEntidade>;

        //AbrirRelacao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<d.Entidade>): ConsultaEntidade<TEntidade>;

        AbrirColecao(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<d.Entidade>): ConsultaEntidade<TEntidade>;

        OrderBy(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>;

        OrderByDescending(expressaoPropriedade: (value: TEntidade, index: number, array: Array<TEntidade>) => string | number | Date): ConsultaEntidade<TEntidade>;

        Take(take: number): ConsultaEntidade<TEntidade>;

        Skip(skip: number): ConsultaEntidade<TEntidade>;

        WhereColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoFiltro: (value: TRelacao, index: number, array: Array<TRelacao>) => boolean, ...argumentos: any[]): ConsultaEntidade<TEntidade>;

        OrderByColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>;

        OrderByDescendingColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade, index: number, array: Array<TEntidade>) => ListaEntidades<TRelacao>, expressaoPropriedade: (value: TRelacao, index: number, array: Array<TRelacao>) => string | number | Date): ConsultaEntidade<TEntidade>;

        TakeColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade) => ListaEntidades<TRelacao>, take: number): ConsultaEntidade<TEntidade>;

        SkipColecao<TRelacao extends d.Entidade>(expressaoCaminhoColecao: (value: TEntidade) => ListaEntidades<TRelacao>, skip: number): ConsultaEntidade<TEntidade>;

        IncluirDeletados(): ConsultaEntidade<TEntidade>;
        IncluirDeletados(incluir: boolean): ConsultaEntidade<TEntidade>;

        WhereIds(ids: List<number>): ConsultaEntidade<TEntidade>;

        WhereIn(expressaoCaminhoPropriedade: (value: TEntidade) => number | string, lista: List<number | string>): ConsultaEntidade<TEntidade>;
    }
}