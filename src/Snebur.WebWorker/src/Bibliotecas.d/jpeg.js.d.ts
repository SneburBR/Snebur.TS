interface JpegImageConstructor
{
    new(): JpegImage;
}
interface JpegImage 
{
    width: number;
    height: number;
    parse(buffer: Uint8Array): void;
    getData(largura: number, altura: number, x: boolean);
    copyToImageData(imagemData: ImageData);
}
declare let JpegImage: JpegImageConstructor;

interface JPEGEncoderConstrutor
{
    new(qualidade: number): JPEGEncoder;

}
interface JPEGEncoder
{
    encode(imageData: ImageData, qualidade: number): ArrayBuffer;

}
declare let JPEGEncoder: JPEGEncoderConstrutor;