self.__isMagickCarregado = false;
self.__isInicilizando = false;

async function inicializarMagickAsync(mensagem: IMensagemMagickWorker): Promise<boolean>
{
    if (self.__isMagickCarregado)
    {
        return true;
    }

    if (self.__isInicilizando)
    {
        while (self.__isInicilizando)
        {
            console.error("MAGICK SENDO INICIALIZADO");
            await daley(100);
        }
    }

    if (!self.__isMagickCarregado)
    {
        self.__isInicilizando = true;
        const url = self.URL.createObjectURL(mensagem.MagickInit.BlobWasm);
        try
        {
            importScripts(mensagem.MagickInit.UrlBlobMagick);
            await MagickWasm.initializeImageMagick(url);
           
            if (MagickWasm.Magick.imageMagickVersion != null)
            {
                self.__isMagickCarregado = true;
                console.log("Magick worker Carregado v:" + MagickWasm.Magick.imageMagickVersion);
                return true;
            }
        }
        finally
        {
            self.URL.revokeObjectURL(url);
            self.__isInicilizando = false;
        }
        return false;
    }

}

async function daley(timeout: number)
{
    return new Promise(r => setTimeout(r, timeout));
}

interface WorkerGlobalScope
{
    __isMagickCarregado: boolean;
    __isInicilizando: boolean;
}