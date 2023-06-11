
if (typeof HTMLCanvasElement.prototype.toBlob === "undefined")
{
    HTMLCanvasElement.prototype.toBlob = function (this: HTMLCanvasElement, callback: (blob: Blob | null) => void, formato: any, qualidade: number): void
    {
        if (!formato)
        {
            formato = "image/png";
        }

        const binStr = atob(this.toDataURL(formato, qualidade).split(",")[1]);
        const len = binStr.length;
        const arr = new Uint8Array(len);

        for (let i = 0; i < len; i++)
        {
            arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: formato }));
    };
}

HTMLCanvasElement.prototype.ToBlobAsync = (function (this: HTMLCanvasElement, tipo: string, qualidade: number)
{
    return new Promise(resolver =>
    {
        this.onerror = function ()
        {
            resolver(null);
        };

        this.toBlob(function (blob)
        {
            resolver(blob);
        }, tipo, qualidade);
    });
}); 