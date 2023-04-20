
declare function parseInt(s: number | string, radix?: number): number;
declare function parseFloat(string: number | string): number;
declare function baseisNaN(value: number): boolean;


interface Function
{
    readonly name: string;
}
//declare function nameof(o: any): string;

if (Function.prototype.name === undefined)
{
    Object.defineProperty(Function.prototype, "name", {
        get: function ()
        {
            return Snebur.Utilidade.FuncaoUtil.RetornarNomeConstrutor((this).constructor.toString());
        }
    });
}

namespace Snebur
{
    if (globalThis.baseisNaN === undefined)
    {
        globalThis.baseisNaN = globalThis.isNaN;
        globalThis.isNaN = function (value: number)
        {
            if (value == null)
            {
                return true;
            }
            return globalThis.baseisNaN(value) || !isFinite(value);
        };
    }

    export function Init<T>(obj: T, init?: Partial<T>)
    {
        if (init != null)
        {
            for (const key of Object.keys(init))
            {
                (obj as any)[key] = (init as any)[key];
            }
        }
    }
}
