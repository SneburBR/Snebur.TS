const xxx = "";
self.addEventListener("message", async function (e: MessageEvent)
{
    const opcoes = e.data as IOpcoesMagick;
    try
    {
        await inicializarMagickAsync(opcoes);
        const processador = new MagickProcessador(opcoes);
        const resultado = await processador.ProcessarAsync();
        self.postMessage(resultado);
    }
    catch (erro)
    {
        self.postMessage(erro);
    }

});
