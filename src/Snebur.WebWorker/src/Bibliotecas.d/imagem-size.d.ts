
//declare function isJPG(buffer: Buffer): boolean;
//declare function calculate(buffer: Buffer): ImageInfo;

interface ImageInfo
{
    width: number;
    height: number;
    type: string;
    orientation?: number
}


interface JpegInfo
{
    IsJpeg(buffer: Buffer): boolean;
    RetornarInfo(buffer: Buffer): ImageInfo;
}

interface PnegInfo
{
    IsPneg(buffer: Buffer): boolean;
    RetornarInfo(buffer: Buffer): ImageInfo;
}

declare let JpegInfo: JpegInfo;
declare let PnegInfo: PnegInfo;

