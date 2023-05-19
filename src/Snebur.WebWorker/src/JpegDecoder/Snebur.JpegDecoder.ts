importScripts("wasm-loader.js?v=4");
importScripts("Bibliotecas/pica.imagedata.js?v=6");
importScripts("Bibliotecas/buffers.js?v=1");
importScripts("Bibliotecas/encoder.js?v=1");
 
const LEITURA_ARQUIVO = 0;
const ETAPA_DECODER = 1;
const ETAPA_RESIZE = 2;
const ETAPA_ENCODER = 3;

let JpegDecoder = null;
let ARQUIVO = null;
let __identificadorTimeout: number = null;

declare const __wasm_image_loader: any;
/*declare const Promise: any;*/
declare const pica: any;
declare const JPEGEncoder: any;
declare const Buffer: any;


self.onmessage = function (e)
{
    try
    {
        if (__wasm_image_loader == null)
        {
            EnviarErro("__wasm_image_loader não definida");
            return;
        }
        __identificadorTimeout = setTimeout(ErroTimeout, 5000);

        Promise.all([__wasm_image_loader()])
            .then(([decoder]) =>
            {
                clearTimeout(__identificadorTimeout);
                JpegDecoder = decoder;
                Inicializar(e);
                return decoder;
            });
    }
    catch (erro)
    {
        console.error("Promise.all" + erro);
        erro.Origem = "Promise.all";
        EnviarErro(erro);
    }

};

function ErroTimeout()
{
    console.error("Timeout");
    EnviarErro(new Error("Timeout ao carregar wasm_image_loader "));
}

function Inicializar(e)
{
    try
    {
        const inicio = new Date().getTime();

        const mensagem: Snebur.WebWorker.IMensageJpegDecoder = e.data ;
        const arquivo = mensagem.Arquivo;
        const larguraDestino = mensagem.LarguraDestino;
        const alturaDestino = mensagem.AlturaDestino;
        const rotacao = mensagem.RotacaoExif;
        const recorte = mensagem.Recorte;
        const dimensaoFoto = mensagem.DimensaoFoto;
        const qualidade = NormalizarQualidade(mensagem.Qualidade);

        ARQUIVO = arquivo;

        console.error(" ROTACAO IMAGEM " + rotacao);

        if (!(arquivo instanceof Blob))
        {
            throw new Error("Arquivo não suportado");
        }

        const leitor = new FileReader();
        leitor.onload = function ()
        {
            try
            {
                NotificarProgresso(10, LEITURA_ARQUIVO);

                const bytes = new Uint8Array(leitor.result as ArrayBuffer);
                const canais = 4; //rgba
                const rawPixels = JpegDecoder.decode(bytes, bytes.length, canais);
                const dimensao = JpegDecoder.dimensions();

                const tempoDecoder = new Date().getTime() - inicio;
                console.log(" TEMPO DO DECODER : " + tempoDecoder);

                NotificarProgresso(50, ETAPA_DECODER);

                const inicioResize = new Date().getTime();

                const imageDataOrigem = new ImageData(
                    new Uint8ClampedArray(rawPixels),
                    dimensao.width,
                    dimensao.height
                );

                const imageDataDestino = {
                    width: larguraDestino,
                    height: alturaDestino,
                    data: null
                };

                console.log(`Destino ${larguraDestino} X ${alturaDestino}`);

                const opcoes = {
                    features: ["js", "wasm"],
                    concurrency: 1,
                    tile: 100000,
                    isImageData: true
                };

                const opcoesResize = {
                    quality: 0,
                    unsharpAmount: 0,
                    unsharpRadius: 0,
                    unsharpThreshold: 0,
                    alpha: false
                };

                const nomeArquivo = RetornarNomeArquivo();

                const picaInstancia = new pica(opcoes);
                picaInstancia.resize(imageDataOrigem,
                    imageDataDestino,
                    opcoesResize).
                    then(function (resultado)
                    {
                        JpegDecoder.free();

                        try
                        {
                            const tempoResize = new Date().getTime() - inicioResize;
                            console.log(nomeArquivo + " TEMPO DO RESIZE  : " + tempoResize);
                            const inicoEncoder = new Date().getTime();

                            NotificarProgresso(75, ETAPA_RESIZE);

                            if (rotacao !== 0 && rotacao !== 360)
                            {
                                console.log(nomeArquivo + " ROTACIONADO ");
                                resultado = RotacionarPixels(resultado, rotacao);
                            }


                            if (recorte != null)
                            {
                                console.log(nomeArquivo + " RECORTANDO A FOTO NO WORKER ");
                                resultado = RetornarImagemData(resultado, recorte, dimensaoFoto);
                            }

                            console.log(nomeArquivo + " ENCODER SALVANDO IMAGEM QUALIDADE  " + qualidade);

                            try
                            {
                                const encoder = new JPEGEncoder(qualidade);
                                const bufferJpeg = encoder.encode(resultado, qualidade);
                                const blob = new Blob([bufferJpeg], { type: "image/jpeg" });

                                const tempoEncoder = new Date().getTime() - inicoEncoder;
                                const tempoGeral = new Date().getTime() - inicio;

                                console.log("ARQUIVO " + nomeArquivo +
                                    "\rTEMPO DECODER " + tempoDecoder +
                                    "\r\nTEMPO DO RESIZE WASM : " + tempoResize +
                                    "\r\nENCODER " + tempoEncoder +
                                    "\r\nSOMA " + (tempoDecoder + tempoResize + tempoEncoder) +
                                    "\r\nGERAL " + tempoGeral);

                                NotificarProgresso(90, ETAPA_ENCODER);

                                self.postMessage(blob);

                            }
                            catch (erro)
                            {
                                console.error(nomeArquivo + " FALHA NO ENCODER, não foi possível salvar ");
                                EnviarErro(erro);

                            }

                        }
                        catch (erro)
                        {
                            console.error(nomeArquivo + "Durante o processo depois do Resize");
                            EnviarErro(erro);
                        }
                    }).
                    catch(function (erro)
                    {
                        console.error(nomeArquivo + "Durante RESIZE DO PICAJS");
                        EnviarErro(erro);
                    });

            }
            catch (erro)
            {
                console.error("leitor.onload = " + erro);
                EnviarErro(erro);
            }

        };
        leitor.onerror = function ()
        {
            console.error("leitor.onerror" + leitor.error);
            EnviarErro(leitor.error);
        };
        leitor.readAsArrayBuffer(arquivo);

    }
    catch (erro)
    {
        console.error("Geral" + erro);
        EnviarErro(erro);
    }
}


function NormalizarQualidade(qualidade)
{
    if (typeof qualidade === "number")
    {
        if (isNaN(qualidade))
        {
            qualidade = 92;
        }
        qualidade = Math.max(qualidade, 87);
        qualidade = Math.min(qualidade, 100);
        return qualidade;

    }
    return 92;
}


let ProgressoAtual = 0;

function NotificarProgresso(progresso: number, etapa: number)
{
    ProgressoAtual = progresso;

    self.postMessage({
        IsProgresso: true,
        Progresso: progresso,
        Etapa: etapa
    });
}

function RotacionarPixels(imageDataOrigem, rotacao)
{
    if (rotacao !== 0 && rotacao !== 360)
    {
        let width = imageDataOrigem.width;
        let height = imageDataOrigem.height;

        let buffer = new Buffer(imageDataOrigem.data.buffer);
        let loops = rotacao / 90;
        while (loops > 0)
        {
            const bufferDestino = Buffer.alloc(buffer.length);
            let newOffset = 0;
            for (let x = 0; x < width; x += 1)
            {
                for (let y = height - 1; y >= 0; y -= 1)
                {
                    const offset = (width * y + x) << 2;
                    const pixel = buffer.readUInt32BE(offset, true);
                    bufferDestino.writeUInt32BE(pixel, newOffset, true);
                    newOffset += 4;
                }
            }
            buffer = bufferDestino;
            const newHeight = width;
            width = height;
            height = newHeight;
            loops -= 1;
        }

        return {
            data: buffer,
            width: width,
            height: height
        };
    }
    return imageDataOrigem;
}


function RetornarImagemData(imageDataOrigem :ImageData, recorte :IRecorte, dimensaoFoto : IDimensao) 
{
    dimensaoFoto = this.NormalizarDimensaoFoto(dimensaoFoto, imageDataOrigem.width, imageDataOrigem.height);
    const dimensaoDestino = RetornarDimencaoUniformeDentro(dimensaoFoto.Largura,
        dimensaoFoto.Altura,
        imageDataOrigem.width,
        imageDataOrigem.height, false, true);

    const imageDataDestino = new ImageData(dimensaoDestino.Largura, dimensaoDestino.Altura);

    const colunaInicio = Math.round(imageDataOrigem.width * recorte.XScalar);
    let colunaFim = colunaInicio + dimensaoDestino.Largura;

    const linhaInicio = Math.round(imageDataOrigem.height * recorte.YScalar);
    let linhaFim = linhaInicio + dimensaoDestino.Altura;

    colunaFim = Math.min(imageDataOrigem.width, colunaFim);
    linhaFim = Math.min(imageDataOrigem.height, linhaFim);


    for (let linha = linhaInicio; linha < linhaFim; linha++)
    {
        for (let coluna = colunaInicio; coluna < colunaFim; coluna++)
        {
            const posicaoOrigem = ((linha * imageDataOrigem.width) + coluna) * 4;
            const posicaoDestino = (((linha - linhaInicio) * imageDataDestino.width) + (coluna - colunaInicio)) * 4;

            imageDataDestino.data[posicaoDestino] = imageDataOrigem.data[posicaoOrigem];
            imageDataDestino.data[posicaoDestino + 1] = imageDataOrigem.data[posicaoOrigem + 1];
            imageDataDestino.data[posicaoDestino + 2] = imageDataOrigem.data[posicaoOrigem + 2];
            imageDataDestino.data[posicaoDestino + 3] = imageDataOrigem.data[posicaoOrigem + 3];
        }
    }
    return imageDataDestino;

}

function NormalizarDimensaoFoto(dimensao: IDimensao, larguraImagem: number, alturaImagem: number)
{

    const ladoMaior = Math.max(dimensao.Largura, dimensao.Altura);
    const ladoMenor = Math.min(dimensao.Largura, dimensao.Altura);

    if (larguraImagem >= alturaImagem)
    {
        return {
            Largura: ladoMaior,
            Altura: ladoMenor
        };
    }

    return {
        Largura: ladoMenor,
        Altura: ladoMaior
    };
}

function RetornarDimencaoUniformeDentro(largura: number, altura: number, larguraRecipiente: number, alturaRecipente: number, valorDecimal: boolean, aumentar: boolean) : IDimensao
{
    let novaLargura = 0;
    let novaAltura = 0;

    if (largura > altura)
    {
        //IMAGEM NA HORIZONTAL
        novaLargura = larguraRecipiente;
        novaAltura = altura * novaLargura / largura;
        if (novaAltura > alturaRecipente)
        {
            novaAltura = alturaRecipente;
            novaLargura = largura * novaAltura / altura;
        }
    }
    else if (altura > largura)
    {
        //IMAGEM NA VERTICAL
        novaAltura = alturaRecipente;
        novaLargura = largura * novaAltura / altura;

        if (novaLargura > larguraRecipiente)
        {
            novaLargura = larguraRecipiente;
            novaAltura = altura * novaLargura / largura;
        }
    }
    else if (largura === altura)
    {
        //IMAGEM QUADRADA ' SELECIONAR O MENOR LADO
        novaLargura = Math.min(alturaRecipente, larguraRecipiente);
        novaAltura = novaLargura;
    }

    if (!aumentar && (largura < novaLargura || altura < novaAltura))
    {
        return {
            Largura: novaLargura,
            Altura: novaAltura
        };
    }

    if (!valorDecimal)
    {
        novaLargura = parseInt(Math.round(novaLargura));
        novaAltura = parseInt(Math.round(novaAltura));
    }

    return {
        Largura: novaLargura,
        Altura: novaAltura
    };

}

function EnviarErro(erro): void
{
    const mensagem = erro?.message ?? erro?.toString() ?? "mensagem erro não disponível";
    const nomeArquivo = RetornarNomeArquivo();

    console.error(nomeArquivo + " " + mensagem);

    self.postMessage({
        MessagemErro: "W " + nomeArquivo + " : " + mensagem,
        IsErro: true
    });
}

function RetornarNomeArquivo(): string
{
    const nome = ARQUIVO?.name ?? "sem nome";
    const tipo = ARQUIVO?.type ?? "";
    const size = ARQUIVO?.size ?? 0;
    return `${nome} ${tipo} (${size}) bytes`;
}