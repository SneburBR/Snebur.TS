let isMagickCarregado = false;
let isInicilizando = false;

async function inicializarMagickAsync(mensagem: IMensagemMagickWorker): Promise<boolean>
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
            importScripts(mensagem.MagickInit.UrlBlobMagick);

            /*const bytes = new Uint8Array(mensagem.BufferWasm);*/
            /*const blobWasm = new Blob([mensagem.BufferWasm], { type: "application/wasm" });*/
            /*const url = self.URL.createObjectURL(blobWasm);*/

            const url = self.URL.createObjectURL(mensagem.MagickInit.BlobWasm);

            await MagickWasm.initializeImageMagick(url);
            /*await MagickWasm.initializeImageMagick("/magick/magick.wasm");*/
            self.URL.revokeObjectURL(url);
            if (MagickWasm.Magick.imageMagickVersion != null)
            {
                isMagickCarregado = true;
                console.log("Magick worker Carregado v:" + MagickWasm.Magick.imageMagickVersion);
                return true;
            }
        }
        finally
        {
            isInicilizando = false;
        }
        return false;
    }

}

async function daley(timeout: number)
{
    return new Promise(r => setTimeout(r, timeout));
}