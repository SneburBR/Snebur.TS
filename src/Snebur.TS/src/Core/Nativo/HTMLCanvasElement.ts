

if (!HTMLCanvasElement.prototype.toBlob)
{
    //HTMLCanvasElement.prototype.BaseToBlob = HTMLCanvasElement.prototype.toBlob;
}

//HTMLCanvasElement.prototype.toBlob = function ()
//{
//    throw new Erro("Utilizar SalvarJpeg no workder");
//}

if (!HTMLCanvasElement.prototype.toBlob)
{
    HTMLCanvasElement.prototype.toBlob = function (callback: (blob: Blob | null) => void, formato: any, qualidade: number): void
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

HTMLCanvasElement.prototype.ToBlobAsync = (function (tipo: string, qualidade: number)
{
    const canvas = this as HTMLCanvasElement;
    return new Promise<Blob | null>(resolver =>
    {
        canvas.toBlob(function (blob)
        {
            resolver(blob);
        }, tipo, qualidade);
    });
});



//Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
//    value: function (callback: any, type: string, quality: number)
//    {
//        let binStr = atob(this.toDataURL(type, quality).split(',')[1]);
//        let len = binStr.length;
//        let arr = new Uint8Array(len);

//        for (var i = 0; i < len; i++)
//        {
//            arr[i] = binStr.charCodeAt(i);
//        }
//        callback(new Blob([arr], { type: type || 'image/png' }));
//    }
//});


