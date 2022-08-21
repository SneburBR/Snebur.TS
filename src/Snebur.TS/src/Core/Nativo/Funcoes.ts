
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

    //Object.defineProperty(window, "nameof", {
    //    value: function (o: any)
    //    {
    //        if (typeof o === "string")
    //        {
    //            let inicio = o.lastIndexOf('.');
    //            if (inicio > 0)
    //            {
    //                return o.substring(inicio + 1);
    //            }
    //            return o;
    //        }

    //        if ($Configuracao.IsDebug)
    //        {
    //            throw new Erro("O valor do argumento não é do tipo String, verifique se a extensão está ativa e atualize os projetos se os projetos");
    //        }
    //        return o?.toString() ?? 'não definido';
    //    },
    //    writable: false,
    //    configurable: false,
    //    enumerable: false,
    //});

}
