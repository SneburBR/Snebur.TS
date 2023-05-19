let isMagickCarregado = false;
let isInicilizando = false;

async function inicializarMagickAsync(mensagem: IOpcoesMagick)
{
    if (isInicilizando)
    {
        while (isInicilizando)
        {
            await daley(100);
        }
    }

    if (!isMagickCarregado)
    {
        isInicilizando = true;
        try
        {
            importScripts(mensagem.UrlMagick);

            /*const bytes = new Uint8Array(mensagem.BufferWasm);*/
            const blobWasm = new Blob([mensagem.BufferWasm], { type: "application/wasm" });
            const url = self.URL.createObjectURL(blobWasm);

            await MagickWasm.initializeImageMagick(url);
            /*await MagickWasm.initializeImageMagick("/magick/magick.wasm");*/
            self.URL.revokeObjectURL(url);
            if (MagickWasm.Magick.imageMagickVersion != null)
            {
                console.log("Magick worker Carregado v:" + MagickWasm.Magick.imageMagickVersion);
                isMagickCarregado = true;
            }
        }
        finally
        {
            isInicilizando = false;
        }
    }

}

async function daley(timeout: number)
{
    return new Promise(r => setTimeout(r, timeout));
}