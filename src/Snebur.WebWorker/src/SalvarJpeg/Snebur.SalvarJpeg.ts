importScripts("Bibliotecas/buffers.js");
importScripts("Bibliotecas/encoder.js?v=1");

self.onmessage = function (e)
{
    try
    {
        const memsagem: ISalvarJpegMensagem = e.data;
        const imagemData = e.data.ImagemData;
        const qualidade = NormalizarQualidade(memsagem.Qualidade);

        if (!JPEGEncoder)
        {
            throw new Error(`O  JPEGEncoder não está definido`);
        }

        const encoder = new JPEGEncoder(qualidade);
        const bufferJpeg = encoder.encode(imagemData, qualidade);
        //var blob = new Blob([bufferJpeg], { type: formato });
        self.postMessage(bufferJpeg);
        return;

    }
    catch (erro)
    {
        EnviarErro(erro);
    }

};
 
function NormalizarQualidade(qualidade: number): number
{
    if (typeof qualidade === "number")
    {
        if (isNaN(qualidade))
        {
            qualidade = 92;
        }
        qualidade = Math.max(qualidade, 70);
        qualidade = Math.min(qualidade, 100);
        return qualidade;

    }
    return 92;
}
 
function EnviarErro(erro)
{
    const mensagem = (erro instanceof Error || erro instanceof DOMException) ? erro.message : erro;
    console.error(erro);
    self.postMessage({
        MessagemErro: "W" + mensagem,
        IsErro: true
    });


}
