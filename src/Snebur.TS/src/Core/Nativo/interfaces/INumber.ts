
interface Number extends Snebur.Nativo.INumber
{

}

interface NumberConstructor extends Snebur.Nativo.INumberConstructor
{

}

namespace Snebur.Nativo
{

    export interface INumber extends IObject<Snebur.Reflexao.TipoPrimario>, IParse<number>
    {
        //ToString(args?: any): string;

        //ToString(args?: any): string;

        ToString(formatacao: EnumFormatacao): string;
        ToString(formatacao: string): string;
        ToString(): string;


        ToInteger(): number;

        ToDecimal(casasDecimais?: number): number;

        /** @description retorna o valor positivo 
         */
        ToAbsoluto(): number;

        /** @description multiplica por - 1 
         * **/
        ToContrario(): number;


        ToNegativo(): number;

        /** @description formata para pixel, (10).ToPixels() => 10p 
        * **/
        ToPixels(): string;
        /** @description formatar para pixel,  (15.24).ToPixels(300) => 1800px
         *  @param dpi para converter
         * **/
        ToPixels(dpi: number): string;
        ToPixels(dpi: number, formatar: true): string;
        ToPixels(dpi: number, formatar: false): number;
        ToPixels(dpi: number, formatar: boolean): string | number;

        //ToPixels(dpi: number, formatar: boolean): string;

        ToCentimetos(dpi: number): number;

        /**
         * 
         * @param tamanhoFonteDocumento padrão 16 
         */
        ToRems(tamanhoFonteDocumento?: number): string;

        HasFlag(valor: number): boolean;

        replace(searchValue: string | RegExp, replaceValue: string): string;

        replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

        Formatar(formado: EnumFormatacao): string;
        ToString(formacao: EnumFormatacao): string;

    }



    export interface INumberConstructor extends ITipo<Snebur.Reflexao.TipoPrimario>, ICaminhoTipo, IParse<number>
    {
        IsInteger(obj: any): boolean;

        IsNumber(obj: any): boolean;

        IsDecimal(obj: any): boolean;

        Int8MinValue: number;

        Int8MaxValue: number;

        Int16MinValue: number;

        Int16MaxValue: number;

        Int32MinValue: number;

        Int32MaxValue: number;

        Int64MinValue: number;

        Int64MaxValue: number;

        Uint8MinValue: number;

        Uint8MaxValue: number;

        UInt16MinValue: number;
        UInt16MaxValue: number;

        UInt32MinValue: number;
        UInt32MaxValue: number;

        UInt64MinValue: number;
        UInt64MaxValue: number;

    }

}


