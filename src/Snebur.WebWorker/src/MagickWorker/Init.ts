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
            console.warn("Magick já está sendo inicializado. Aguardando...");
            await daley(100);
        }
    }

    if (!self.__isMagickCarregado)
    {
        self.__isInicilizando = true;
        const bytes = mensagem.MagickInit.BytesWasm;
        try
        {
            importScripts(mensagem.MagickInit.UrlBlobMagick);
            await MagickWasm.initializeImageMagick(bytes);
           
            if (MagickWasm.Magick.imageMagickVersion != null)
            {
                self.__isMagickCarregado = true;
                return true;
            }
        }
        catch (erro)
        {
            console.error(`Falha ao inicializar o Magick no Worker: ${erro}`);
        }
        finally
        {
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