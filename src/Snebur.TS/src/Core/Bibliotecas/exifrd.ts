namespace ExifrJS
{
    const DEFAULT_OPTIONS: ExifrOptions = {
        // APP Segments
        jfif: false,
        tiff: true,
        xmp: false,
        icc: false,
        iptc: false,
        // TIFF Blocks
        ifd0: true, // aka image
        ifd1: false, // aka thumbnail
        exif: true,
        gps: true,
        interop: false,
        // Other TIFF tags
        makerNote: false,
        userComment: false,
        // Filters
        skip: [],
        pick: [],
        // Formatters
        translateKeys: true,
        translateValues: true,
        reviveValues: true,
        sanitize: true,
        mergeOutput: true,
        silentErrors: true,
        // Chunked reader
        chunked: true,
        firstChunkSize: undefined,
        firstChunkSizeNode: 512,
        firstChunkSizeBrowser: 65536, // 64kb
        chunkSize: 65536, // 64kb
        chunkLimit: 5
    };


    declare type input = ArrayBuffer | Uint8Array | Blob;

    export interface ExifrStatic
    {
        parse(input: input, options?: Partial<ExifrOptions>): Promise<Output>;
        parse(input: input, options: Partial<ExifrOptions>, mergeOutput: false): Promise<MargeOutput>;
        gps(input: input): Promise<{ latitude: number; longitude: number }>;
        orientation(input: input): Promise<number>;
        thumbnail(input: input): Promise<Uint8Array>;
        thumbnailUrl(input: input): Promise<string>;
    }

    export interface MargeOutput
    {
        ifd0: ifd0;
        ifd1: ifd1;
        exif: exif;
        gps: gps;
        interop: interop;
        thumbnail: thumbnail;
        iptc: iptc;
        icc: icc;
    }


    export interface Output extends ifd0, ifd1, exif, gps, interop, thumbnail, iptc, icc
    {

    }

    export interface ifd0
    {
        readonly ImageWidth: string;
        readonly ImageHeight: string;
        readonly Make: string;
        readonly Model: string;
        readonly Software: string;
    }

    export interface ifd1
    {
        readonly Compression: number,
        readonly XResolution: number,
        readonly YResolution: number,
        readonly ResolutionUnit: string,
        readonly ThumbnailOffset: number
    }


    export interface exif
    {
        readonly ExposureTime: string;
        readonly ShutterSpeedValue: string;
        readonly FNumber: string;
        readonly ApertureValue: string;
        readonly ISO: string;
        readonly LensModel: string;
        readonly ColorSpace: number;
    }

    export interface gps
    {
        readonly latitude: string;
        readonly longitude: string;
    }

    export interface interop
    {
        readonly InteropIndex: string;
        readonly InteropVersion: string;
    }

    export interface thumbnail
    {
        readonly ImageWidth: string;
        readonly ImageHeight: string;
        readonly ThumbnailLength: string;
    }

    export interface iptc
    {
        readonly Headline: string;
        readonly Byline: string;
        readonly Credit: string;
        readonly Caption: string;
        readonly Source: string;
        readonly Country: string;
    }

    export interface icc
    {
        readonly ProfileVersion: string;
        readonly ProfileClass: string;
        readonly ColorSpaceData: ColorSpaceData;
        readonly ProfileConnectionSpace: string;
        readonly ProfileFileSignature: string;
        readonly DeviceManufacturer: string;
        readonly RenderingIntent: string;
        readonly ProfileCreator: string;
        readonly ProfileDescription: string;
    }


    export interface ExifrOptions
    {
        jfif: false | boolean;
        tiff: true | boolean;
        xmp: false | boolean;
        icc: false | boolean;
        iptc: false | boolean;
        // TIFF Blocks
        ifd0: true | boolean; // aka image
        ifd1: false | boolean; // aka thumbnail
        exif: true | boolean;
        gps: true | boolean;
        interop: false | boolean;
        // Other TIFF tags
        makerNote: false | boolean;
        userComment: false | boolean;
        // Filters
        skip: [];
        pick: [];
        // Formatters
        translateKeys: true | boolean;
        translateValues: true | boolean;
        reviveValues: true | boolean;
        sanitize: true | boolean;
        mergeOutput: true | boolean;
        silentErrors: true | boolean;
        // Chunked reader
        chunked: true | boolean;
        firstChunkSize: undefined | number;
        firstChunkSizeNode: 512 | number;
        firstChunkSizeBrowser: 65536 | number; // 64kb
        chunkSize: 65536 | number; // 64kb
        chunkLimit: 5 | number;
    }


}

declare const exifr: ExifrJS.ExifrStatic;


