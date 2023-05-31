self.addEventListener("message", async function (e: MessageEvent)
{
    const mensagem = e.data as IMensagemMagickWorker;
    try
    {
        const isSucesso = await inicializarMagickAsync(mensagem);
        if (!isSucesso)
        {
            throw new Error("Magick não inicializado");
        }

        const processador = new MagickProcessador(mensagem.Opcoes, mensagem.MagickInit.BytesPerfilSRGB);
        const resultado = await processador.ProcessarAsync() as IResultadoMagickWorker;
        if (resultado instanceof Error)
        {
            throw resultado;
        }

        if (resultado == null)
        {
            throw new Error(`O resultado do processamento do  Worker não foi definido`);
        }

        resultado.IdentificadorMensagem = mensagem.IdentificadorMensagem;
        self.postMessage(resultado);
    }
    catch (erro)
    {
        self.reportError(erro);
    }
});
