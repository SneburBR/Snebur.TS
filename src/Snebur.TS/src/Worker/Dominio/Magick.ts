const QUALIDADE_APRESENTACAO_MAGICK = 85;

 enum EnumTamanhoImagem
{
    Miniatura = 2,
    Pequena = 4,
    Media = 8,
    Grande = 16,
    Impressao = 32,
    Automatico = 999,
}

interface IOpcoesMagick
{
    readonly Identificador: string;
    readonly NomeArquivoOrigem: string;
    readonly UrlMagick: string;
    readonly BufferWasm: ArrayBuffer;
    readonly BytesOrigem: Uint8Array;
    readonly BytesPerfilDestino: Uint8Array;
    readonly IsRemoverExif: boolean;
    readonly Redimensinamentos: RedimensionarImagemMagick[];
    readonly Qualidade: number;

}
interface RedimensionarImagemMagick
{
    Dimensao: IDimensao;
    TamanhoImagem: EnumTamanhoImagem;
}

interface IResultadoMagick
{
    readonly Identificador: string;
    readonly IsSucesso: boolean;
    readonly MagickFormat: "JPEG" | "WEBP";
    readonly MimeType: "image/jpeg" | "image/webp";
    readonly DimensaoLocal: IDimensao;
    readonly ImagensCarregada: ImagemCarregada[];
}

interface ImagemCarregada
{
    readonly Arquivo: Blob;
    readonly Dimensao: IDimensao;
    readonly TamanhoImagem: EnumTamanhoImagem;
}

interface IDimensao
{
    Largura: number;
    Altura: number;
}

