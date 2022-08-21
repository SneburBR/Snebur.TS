importScripts("Bibliotecas/buffers.js");
importScripts("Bibliotecas/image-size/jpg.js");
importScripts("Bibliotecas/image-size/png.js");

self.onmessage = function (e)
{

    const arquivo = e.data as File;
    const informacaoImagem = new InformacaoImagem(arquivo);
    informacaoImagem.RetornarResultadoAsync(function (resultado: Snebur.IInformacaoImagem)
    {
        self.postMessage(resultado);
    });
};

class InformacaoImagem
{
    private Arquivo: File;
    private Leitor: FileReader;

    private Callback: (resultado: Snebur.IInformacaoImagem) => void;

    public constructor(arquivo: File)
    {
        this.Arquivo = arquivo;
    }

    public RetornarResultadoAsync(callback: (resultado: Snebur.IInformacaoImagem) => void)
    {
        this.Callback = callback;
        this.Leitor = new FileReader();
        this.Leitor.onload = this.Arquivo_Carregado.bind(this);
        this.Leitor.onerror = this.Arquivo_Erro.bind(this);
        this.Leitor.onabort = this.Arquivo_Erro.bind(this);
        this.Leitor.readAsArrayBuffer(this.Arquivo);
    }

    private Arquivo_Erro(e: ErrorEvent)
    {
        this.FinalizarErro();
    }

    private Arquivo_Carregado(e: Event)
    {
        const infoImage = this.RetornarInfoImage();
        if (infoImage)
        {
            this.FinalizarSucesso(infoImage);
        }
        else
        {
            this.FinalizarErro();
        }
    }

    private RetornarInfoImage(): ImageInfo
    {
        if (this.Leitor.result instanceof ArrayBuffer)
        {
            try
            {
                const buffer = Buffer.from(this.Leitor.result);
                if (JpegInfo.IsJpeg(buffer))
                {
                    const info = JpegInfo.RetornarInfo(buffer);
                    info.type = "image/jpeg";
                    return info;
                }
                if (PnegInfo.IsPneg(buffer))
                {
                    const info = PnegInfo.RetornarInfo(buffer);
                    info.type = "image/png";
                    return info;
                }
            }
            catch (erro)
            {
                console.error("Informa��o imagem " + erro?.message ?? erro);

            }
        }
        return null;
    }

    private FinalizarErro()
    {
        const resultado: Snebur.IInformacaoImagem = {
            IsImagem: false,
            NomeArquivo: this.Arquivo.name,
            TotalBytes: this.Arquivo.size,
            Altura: Number.NaN,
            Largura: Number.NaN
        };
        this.Finalizar(resultado);
    }

    private FinalizarSucesso(info: ImageInfo)
    {
        const resultado: Snebur.IInformacaoImagem = {
            IsImagem: true,
            NomeArquivo: this.Arquivo.name,
            TotalBytes: this.Arquivo.size,
            Largura: info.width,
            Altura: info.height,
            Type: info.type
        };
        this.Finalizar(resultado);
    }
    private Finalizar(resultado: Snebur.IInformacaoImagem)
    {
        const callback = this.Callback;
        delete this.Arquivo;
        delete this.Callback;
        delete this.Leitor;
        callback(resultado);
    }
}