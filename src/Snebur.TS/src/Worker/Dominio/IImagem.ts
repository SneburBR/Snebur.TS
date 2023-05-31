enum EnumTamanhoImagem
{
    Miniatura = 2,
    Pequena = 4,
    Media = 8,
    Grande = 16,
    Impressao = 32,
    Automatico = 999,
}

interface IRecorte
{
	XScalar: number;
	YScalar: number;
}
interface IDimensao
{
    Largura: number;
    Altura: number;
}

type ImagemMimeType = "image/jpeg" | "image/png" | "image/webp";