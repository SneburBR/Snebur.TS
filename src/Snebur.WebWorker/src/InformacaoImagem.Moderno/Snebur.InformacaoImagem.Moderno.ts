importScripts("Bibliotecas/buffers.js");
importScripts("Bibliotecas/sizeof.js");

self.onmessage = function (e)
{
    const arquivo = e.data as Blob;
    const leitor = new FileReader();

    leitor.onerror = function (e: ProgressEvent<FileReader>)
    {
        const nomeArquivo = RetornarNomeArquivo(arquivo);
        const mensagemErro = `Checksum Não foi possivel ler o arquivo '${nomeArquivo}`;
        const erro = leitor.error ?? e.target.error ?? new Error(mensagemErro);
        console.error(`${mensagemErro} ${erro.message} `);

        const resultado = InvalidoResultado();
        self.postMessage(resultado);
    };

    leitor.onload = function ()
    {
        try
        {
            const buffer = Buffer.from(leitor.result as ArrayBuffer);
            const info = RetornarInfo(buffer);
            const isImagem = info.width > 0 && info.height > 0;
            const nomeArquivo = (arquivo as File)?.name ?? "[blob]." + info.type;
            const type = isImagem ? "image/" + info.type : info.type;

            const resultado: Snebur.IInformacaoImagem = {
                IsImagem: isImagem,
                NomeArquivo: nomeArquivo,
                TotalBytes: arquivo.size,
                Largura: info.width,
                Altura: info.height,
                Type: type,
                Orientacao: info.orientation
            };
            self.postMessage(resultado);

        }
        catch (erro)
        {
            console.error("leitor.onload " + erro?.message ?? erro);

            const resultado = InvalidoResultado();
            self.postMessage(resultado);
        }
    };
    leitor.readAsArrayBuffer(arquivo);
};


function RetornarInfo(buffer): ImageInfo
{
    try
    {
        return self.Sizeof(buffer);
    }
    catch (erro)
    {
        console.error("  self.Sizeof " +  erro?.message ?? erro);
        return InvalidoResultado();
    }
}

function InvalidoResultado(): ImageInfo
{
    return {
        type: "invalido",
        width: 0,
        height: 0,
        orientation: null
    };
}

function RetornarNomeArquivo(arquivoOuBlob: Blob)
{
    if (arquivoOuBlob instanceof File)
    {
        return arquivoOuBlob.name;
    }
    return `[blob (${arquivoOuBlob.size})].${arquivoOuBlob.type}`;
}


interface Window
{
    Sizeof: Function;
}