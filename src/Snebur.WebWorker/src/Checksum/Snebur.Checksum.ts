importScripts("Bibliotecas/md5.js");

const ReceberMensagem = (function (e: MessageEvent)
{

    if (!(e.data instanceof Uint8Array ||
        e.data instanceof ArrayBuffer ||
        e.data instanceof Blob))
    {
        throw new Error("O e.Data, ( bytes ou File) não são validos");
    }

    try
    {
        if (e.data instanceof Blob)
        {
            const leitor = new FileReader();
            leitor.onload = function ()
            {
                const bytes = leitor.result;
                if (!(bytes instanceof ArrayBuffer))
                {
                    const erro = new Error(`Checksum: O bytes não são validos`);
                    console.error(erro.message);
                    EnviarErro(erro);
                    return;
                }
                const checksum = md5(bytes);
                self.postMessage(checksum);
            };
            leitor.onerror = function ()
            {
                const nomeArquivo = RetornarNomeArquivo(e.data);
                const mensagem = `Não foi possivel ler arquivo ${nomeArquivo}`;
                const erro = leitor.error ?? new Error(mensagem);
                console.error("Checksum worker '" + mensagem + "' " + leitor.error?.message);

                EnviarErro(erro);
            };
            leitor.readAsArrayBuffer(e.data);

        }
        else
        {
            const checksum = md5(e.data);
            self.postMessage(checksum);
        }
    }
    catch (erro)
    {
        console.error(`Checksum worker ${erro?.message ?? erro} `);
        EnviarErro(erro);
    }


});
self.onmessage = ReceberMensagem;

function RetornarNomeArquivo(arquivo:any): string
{
    const nome = arquivo?.name ?? "sem nome";
    const tipo = arquivo?.type ?? "";
    const size = arquivo?.size ?? 0;
    return `${nome} ${tipo} (${size}) bytes`;
}


function EnviarErro(erro)
{
    const mensagem = erro?.message ?? erro;
    console.error(erro);
    self.postMessage({
        MessagemErro: "W" + mensagem,
        IsErro: true
    });
}

 