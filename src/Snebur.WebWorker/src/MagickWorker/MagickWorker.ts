const xxx = "";
self.addEventListener("message", async function (e: MessageEvent)
{
    const opcoes = e.data as IOpcoesMagick;
    try
    {
        const isSucesso = await inicializarMagickAsync(opcoes);
        if (isSucesso)
        {
            const processador = new MagickProcessador(opcoes);
            const resultado = await processador.ProcessarAsync();
            self.postMessage(resultado);
        }
    }
    catch (erro)
    {
        self.postMessage(erro);
    }

});
