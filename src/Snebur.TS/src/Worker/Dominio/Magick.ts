
const QUALIDADE_APRESENTACAO_MAGICK = 70;
const QUALIDADE_IMPRESSAO_MAGICK = 90;
 
interface IMagickInit
{
    readonly UrlBlobMagick: string;
    readonly BlobWasm: Blob;
    readonly BytesPerfilSRGB: Uint8Array;
}

interface IMensagemMagickWorker
{
    readonly IdentificadorMensagem: string;
    readonly MagickInit: IMagickInit;
    readonly Opcoes: IOpcoesMagick;
}

interface IOpcoesMagick
{
    readonly NomeArquivoOrigem: string;
    /*readonly BufferWasm: ArrayBuffer;*/
    /*readonly BytesOrigem: Uint8Array;*/
    readonly ArquivoOrigem: Blob;
    readonly IsConverterSRGB: boolean;
    readonly IsRemoverExif: boolean;
    readonly IsPngParaJpeg: boolean;
    readonly Redimensinamentos: RedimensionarImagemMagick[];
    readonly Qualidade: number;

}
interface RedimensionarImagemMagick
{
    Dimensao: IDimensao;
    TamanhoImagem: EnumTamanhoImagem;
    Recorte?: IRecorte;
    DimensaoRecorte?:IDimensao
}

interface IResultadoMagick
{
    readonly IsSucesso: boolean;
    readonly MagickFormat: "JPEG" | "PNG" | "WEBP";
    readonly MimeType: ImagemMimeType;
    readonly DimensaoLocal: IDimensao;
    readonly ImagensCarregada: ImagemCarregada[];
}

interface IResultadoMagickWorker extends IResultadoMagick
{
    IdentificadorMensagem: string;
}

interface ImagemCarregada
{
    readonly Arquivo: Blob;
    readonly Dimensao: IDimensao;
    readonly TamanhoImagem: EnumTamanhoImagem;
}




