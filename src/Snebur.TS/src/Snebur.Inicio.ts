namespace Snebur
{
    export const $DataHoraInicio = new Date();
    export declare let __IsScriptNormalizado: boolean;
    export const $Global: Window = (typeof window !== "undefined")
        ? window : (typeof self !== "undefined")
            ? self : globalThis as any as Window;
}

if (typeof globalThis === "undefined")
{
    Object.defineProperty(window, "globalThis", {
        get: function ()
        {
            return window;
        }
    });
}
Snebur.__IsScriptNormalizado = false;


function __checkLibRequeriments()
{
    if (typeof JSZip === "undefined")
        console.error("The lib JSZip is not loaded");

    if (typeof UAParser === "undefined")
        console.error("The lib JSZip is not loaded");

    if (typeof md5 === "undefined")
        console.error("The lib JSZip is not loaded");
}
__checkLibRequeriments();
