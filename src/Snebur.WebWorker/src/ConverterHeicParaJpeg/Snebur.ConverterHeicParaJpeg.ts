importScripts("Bibliotecas/gifshot.js");
importScripts("Bibliotecas/libheif.js?v=1");

importScripts("Bibliotecas/buffers.js");
importScripts("Bibliotecas/encoder.js?v=1");

let __Arquivo: Blob = null;
self.onmessage = function (e: MessageEvent)
{
    try
    {
        const mensagem = e.data as Snebur.IMensagemConverterHeicParaJpeg;

        if (!(libheif && typeof libheif.HeifDecoder === "function"))
        {
            throw new Error(" não foi possível");
        }

        if (!(mensagem.Arquivo instanceof Blob))
        {
            throw new Error("O parâmetro Blob não foi definido na mensagem");
        }
        __Arquivo = mensagem.Arquivo;

        const leitor = new FileReader();
        leitor.onerror = function (erro)
        {
            console.error(erro);

            EnviarErro(new Error("Não foi possível abrir o arquivo "), " leitor.onerror");
        };


        leitor.onload = function ()
        {
            const buffer = leitor.result as ArrayBuffer;
            try
            {
                const decoder = new libheif.HeifDecoder();
                let imagesArr = decoder.decode(buffer);
                if (!imagesArr || !imagesArr.length)
                {
                    EnviarErro(new Error("ERR_LIBHEIF format not supported"), "leitor.onload");
                }

                imagesArr = imagesArr.filter((x) =>
                {
                    let isValido = true;
                    try
                    {
                        /*
                        Pode ocorrer Falsos positivo, o arquivo Heic poderá está corrompido;
                        */
                        x.get_height();
                    }
                    catch (e)
                    {
                        isValido = false;
                    }
                    return isValido;
                });

                if (!imagesArr.length)
                {
                    EnviarErro(new Error("ERR_LIBHEIF Heic doesn't contain valid images"), "leitor.onload");
                }

                Promise.all(imagesArr.map((image) => ProcessSingleImage(image)))
                    .then((imageDataArr) =>
                    {
                        const imagemData = imageDataArr[0];
                        if (!(imagemData instanceof ImageData))
                        {
                            EnviarErro(new Error("ImageData invalido"), ".then");
                        }

                        console.warn(" Snebur.ConverterHeicParaJpeg IMAGEM DATA GERADO COM SUCESSO");
                        const qualidade = NormalizarQualidade(mensagem.Qualidade);
                        const encoder = new JPEGEncoder(qualidade);
                        const bufferJpeg = encoder.encode(imagemData, qualidade);
                        const blobJpeg = new Blob([bufferJpeg], { type: "image/jpeg" });
                        self.postMessage(blobJpeg);

                    })
                    .catch((e) =>
                    {
                        EnviarErro(e, "promise catch ProcessSingleImage");
                    });

            }
            catch (erro)
            {
                EnviarErro(new Error("Não foi possivel converter o Arquivo Heic para Jpeg o"), "leitor.onload catch");
            }
        };

        leitor.readAsArrayBuffer(mensagem.Arquivo);
    }
    catch (erro)
    {
        EnviarErro(erro, "Geral catch");
    }

};

self.onerror = (erro) =>
{
    EnviarErro(erro, "selft.onerror");
};

function ProcessSingleImage(image: libheif.DecodeResult): Promise<ImageData>
{
    return new Promise((resolve, reject) =>
    {
        const w = image.get_width();
        const h = image.get_height();
        const whiteImage = new ImageData(w, h);
        for (let i = 0; i < w * h; i++)
        {
            whiteImage.data[i * 4 + 3] = 255;
        }
        image.display(whiteImage, (imageData) =>
        {
            if (!imageData)
            {
                return reject(
                    "ERR_LIBHEIF Error while processing single image and generating image data, could not ensure image"
                );
            }
            resolve(imageData);
        });
    });
}


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

function EnviarErro(erro: any, info: string)
{
    const nomeArquivo = __Arquivo instanceof Blob ? __Arquivo instanceof File ? __Arquivo.name : `[blob].${__Arquivo.type}` : "null";
    let mensagem = erro?.message ?? erro ?? "Mensagem de erro não definida";
    mensagem += "\r\nInfo: " + info;
    mensagem += "\r\nArquivo:" + nomeArquivo;
    console.error(erro);

    self.postMessage({
        MessagemErro: "W " + mensagem,
        IsErro: true
    });


}
