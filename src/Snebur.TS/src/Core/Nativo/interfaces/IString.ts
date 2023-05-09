
interface String extends Snebur.Nativo.IString
{
    startsWith(str: string): boolean
}

interface StringConstructor extends Snebur.Nativo.IStringConstructor
{

}

namespace Snebur.Nativo
{
    export interface IString extends IObject<Snebur.Reflexao.TipoPrimario>
    {
        //replaceAll(procurar: string | RegExp, substituir: string): string;
        //replaceAll(procurar: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

        StartsWith(texto: string): boolean;
        StartsWith(texto: string, isIgnorarCasoSensivel: boolean): boolean;

        EndsWith(texto: string): boolean;
        EndsWith(texto: string, isIgnorarCasoSensivel: boolean): boolean;

        Remove(startIndex: number, count: number): string;

        Replace(procurar: string | RegExp, substituir: string): string;
        Replace(procurar: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
        ReplaceAll(procurar: string | RegExp, substituir: string): string;
        ReplaceAll(procurar: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

        Equals(comparar: string): boolean;
        Equals(comparar: string, ignorarCaso?: boolean): boolean;
        Equals(comparar: string, comparacao?: EnumStringComparacao  ): boolean;

        Contains(texto: string): boolean;
        Contains(texto: string, ignoreCase?: boolean): boolean;

        //ToString(args?: any): string;

        All(funcaoTodos: (value: string) => boolean): boolean;

        Any(funcaoAny: (value: string) => boolean): boolean;

        Split(divisor: string): Array<string>;

        ToNumber(removerPixelsOrRem?: boolean): number;

        GetHashCode(): number;

        /**Retornar um arrar de caracteres */
        ToArray(): string[];

        repeat(n: number): string;

        Formatar(formado: EnumFormatacao): string;
        ToString(formacao: EnumFormatacao): string;
        IsParecido(texto: string, porcentagem: number): boolean;

    }

    export interface IStringConstructor extends ITipo<Snebur.Reflexao.TipoPrimario>, ICaminhoTipo, IParse<string>
    {
        readonly Empty: string;

        Format(...argumentos: Array<string | number>): string;

        IsNullOrWhiteSpace(texto: string): boolean;

        IsNullOrEmpty(texto: string): boolean;

        IsCharWhiteSpace(char: string): boolean;

        Join(separador: string, lista: Array<string>): string;

        Concat(...args: Array<string>): string;

        IsIniciaComNumero(texto: string): boolean;

    }

    
}
namespace Snebur
{
    export enum EnumStringComparacao
    {
        Normal,
        IgnorarCaso,
        IgnorarAcentos,
        IgnorarCasoAcentos, 
        IgnorarCasoTrim,
        IgnorarAcentosTrim,
        IgnorarCasoAcentosTrim
    }
}