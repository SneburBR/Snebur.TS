
interface Array<T> extends Snebur.Nativo.IArray<T>
{

}

interface ArrayConstructor
{
    isArrayBase(arg: any): arg is any[];
}


namespace Snebur.Nativo
{
    export interface IArray<T> extends ITipo<Snebur.Reflexao.BaseTipoLista>
    {
        readonly length: number;

        /*item(index: number): T | null;*/

        [index: number]: T;

        indexOfBase(searchElement: T, fromIndex?: number): number;

        indexOf(obj: any): number;

        IndexOf(obj: any): number;
        IndexOf(obj: any, comparador: IEqualityComparer<T>): number;
        IndexOf(item: T): number;

        Contains(valor: T): boolean;

        Contains(valor: T, comparador?: IEqualityComparer<T>): boolean;

        Clear(): void;
        /**
        * Definie o estado para lista nova, IsListaNova = true,
        * Somente para a ListaObservacao
        * @param isDefinirListaNova
        */
        Clear(isDefinirListaNova: boolean): void;

        Select<U>(funcaoMapear: (value: T) => U): U[];

        SelectMany<U>(caminhoColexao: (value: T) => U): U;

        Where(funcaoFiltrar: (value: T) => boolean): T[];

        //GroupBy<TChave>(expressaoChave: (value: T) => TChave): Array<GrupoChaveValores<TChave, T>>;

        //Select<U>(funcaoMapear: (value: T) => U): U[];
        GroupBy<TChave extends Objeto>(expressaoChave: (value: T) => TChave): Array<Snebur.GrupoChaveValores<TChave, T>>;
        GroupBy<TChave extends number | string | boolean>(expressaoChave: (value: T) => TChave): Array<Snebur.GrupoChaveValores<TChave, T>>;
        //GroupBy<TChave extends number | string | Objeto>(expressaoChave: Function): Array<Snebur.GrupoChaveValores<TChave, T>>;

        //DicionarioGroupBy<TChave extends number | string>(expressaoChave: (value: T) => TChave): Snebur.DicionarioSimples<Array<T>>;

        DicionarioGroupBy<TChave extends number | string | Objeto>(expressaoChave: (value: T) => TChave): Snebur.DicionarioTipado<any, Array<T>>;

        OrderBy(expressao: (value: T) => string | number | Date): T[];

        OrderByDescending(expressao: (value: T) => string | number | Date): T[];

        NaturalOrderBy(expressao: (value: T) => string): T[];

        NaturalOrderByDescending(expressao: (value: T) => string): T[];

        OrderByRandow(): T[];
       
        Max(): T | null;
        Max<TResultado = number | Date | TimeSpan>(expressao: (value: T) => TResultado): TResultado | null;

        Min(): T | null;
        Min<TResultado = number | Date | TimeSpan>(expressao: (value: T) => TResultado): TResultado | null;

        FindMostSimilarity(expressao: (value: T) => string, busca: string): ResultadoSimilaridade<T>;
        FindMostSimilarity(expressao: (value: T) => string[], busca: string): ResultadoSimilaridade<T>;

        MaxObjeto(expressao: (value: T) => number | Date | TimeSpan): T | null;

        MinObjeto(expressao: (value: T) => number | Date | TimeSpan): T | null;

        Sum(): number;
        Sum(expressao: (value: T) => number): number;

        Average(): number;
        Average(expressao: (value: T) => number): number;

        All(expressao: (value: T) => any): boolean;

        Any(expressao: (value: T) => any): boolean;

        readonly Count: number;

        First(): T;

        First(funcaoFiltrar: (value: T) => boolean): T;

        FirstOrDefault(): T | null;

        FirstOrDefault(funcaoFiltrar: (value: T) => boolean): T | null;

        Last(): T;

        LastOrDefault(): T;

        Random(): T;

        RandomOrDefault(): T;

        Single(): T;
        Single(mensagemErro?: () => MensagemErroArraySingle): T;

        SingleOrDefault(): T | null;
        SingleOrDefault(mensagemErro?: () => MensagemErroArraySingle): T | null;

        Take(quantidae: number): Array<T>;

        Skip(quantidae: number): Array<T>;

        Distinct(): Array<T>;

        Add(item: T): number;
        AddIsTrue(item: T, isAdd:boolean): number;

        AddRange(itens: Array<T>): void;
        AddRangeAsync(items: Array<T>): Promise<void>;

        /**
         * Limpar antes de adiciona os itens
         * @param itens novos itens
         */
        AddRangeNew(itens: Array<T>): void;
        AddRangeNewAsync(itens: Array<T>): Promise<void>;

        Insert(posicao: number, item: T): number;

        Remove(item: T): boolean;

        RemoveRange(itens: Array<T>): void;

        RemoveAt(index: number): boolean;

        /** Retorna o primeiro item e remover da lista */
        PegarPrimeiro(): T;

        /** Retonar o ultimo item e remove da lista */
        PegarUltimo(): T;

        /** Filtra a lista pelo subtipo passado no parâmetro */
        Cast<U extends T>(): Array<U>;

        Cast<U>(): Array<U>;

        OfType<U extends T>(UConstrutor: IConstrutor<U>): Array<U>;

        //OfType<U extends T>(UConstrutor: any): Array<U>;

        //OfType<U extends T>(UConstrutor: { new (...args: Array<any>): U; }): Array<U>;
         
        ToTupleItemIndex(): List<[T, number]>;

        ToTupleItemProgresso(): List<[T, number]>;

        ToTupleItemProgresso(isContarPrimeiro: boolean): List<[T, number]>;

        ToList(nova: boolean): Array<T>;
        ToList(): List<T>;
        ToList<U>(): List<U>;
        ToList<U>(nova: boolean): List<U>;

        ToListaObservacao(): ListaObservacao<T>;

        ToDicionario<U, TChave extends string | number = string>(expressaoChave: (value: T) => TChave, expressaoItem: (value: T) => U): DicionarioSimples<U, TChave>;
        ToDicionario<TChave extends string | number = string>(expressaoChave: (value: T) => TChave): DicionarioSimples<T, TChave>;
        /*ToDicionario(expressaoPropriedade: (value: T) => string | number): DicionarioSimples<T>;*/

        ToDicionarioTipado<TChave extends TipoItemLista, U>(expressaoChave: (value: T) => TChave, expressaoItem: (value: T) => U): DicionarioTipado<TChave, U>;
         
        CopyTo(lista: Array<T>): void;
        /*IsListaObservacao: boolean;*/


        readonly TipoLista: EnumTipoLista;

        readonly IsListaNova: boolean;

       

        Except(lista: Array<T>): Array<T>;

        Intersect(lista: Array<T>): Array<T>;

        Union(lista: Array<T>): Array<T>;
        Union<U>(lista: Array<U>): Array<T | U>;

        Reverse(): Array<T>;

        ForEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

        GetHashCode(): number;
    }
}

namespace Snebur
{
    export interface MensagemErroArraySingle
    {
        Vazia?: string;
        MaisDeUm: string;
    }
}

