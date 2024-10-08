﻿
namespace Snebur
{
    export interface IFunction<T extends any = any> extends Function
    {
        (...args: any[]): T;
    }

    export interface IConstrutor<T extends any = any> extends Function
    {
        new?(): T;
        new?(controlePai: any, idElemento: any): T;
        new?(...args: any[]): T;
        prototype: T;
    }

    export interface IConstrutorEntidade<T extends IEntidade = IEntidade> extends Function
    {
        new(init?: Partial<T>): T;
        prototype: T;
    }
}
