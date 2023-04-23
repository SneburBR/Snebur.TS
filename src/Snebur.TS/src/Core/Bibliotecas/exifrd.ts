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
        parse(input: input, options?: Partial<ExifrOptions>): Promise<ResultadoOutput>;
        parse(input: input, options: Partial<ExifrOptions>, mergeOutput: false): Promise<ResultadoMargeOutput>;
        gps(input: input): Promise<{ latitude: number; longitude: number }>;
        orientation(input: input): Promise<number>;
        thumbnail(input: input): Promise<Uint8Array>;
        thumbnailUrl(input: input): Promise<string>;
    }

    export interface ResultadoMargeOutput
    {
        ifd0: ifd0;
        exif: exif;
        gps: gps;
        interop: interop;
        thumbnail: thumbnail;
        iptc: iptc;
        icc: icc;
    }


    export interface ResultadoOutput extends ifd0, exif, gps, interop, thumbnail, iptc, icc
    {

    }

    export interface ifd0
    {
        ImageWidth: string;
        ImageHeight: string;
        Make: string; Model: string;
        Software: string;
    }

    export interface exif
    {

        ExposureTime: string;
        ShutterSpeedValue: string;
        FNumber: string;
        ApertureValue: string;
        ISO: string;
        LensModel: string;
    }

    export interface gps
    {
        latitude: string;
        longitude: string;
    }

    export interface interop
    {
        InteropIndex: string;
        InteropVersion: string;
    }

    export interface thumbnail
    {
        ImageWidth: string;
        ImageHeight: string;
        ThumbnailLength: string;
    }

    export interface iptc
    {
        Headline: string;
        Byline: string;
        Credit: string;
        Caption: string;
        Source: string;
        Country: string;
    }

    export interface icc
    {
        ProfileVersion: string;
        ProfileClass: string;
        ColorSpaceData: string;
        ProfileConnectionSpace: string;
        ProfileFileSignature: string; DeviceManufacturer: string;
        RenderingIntent: string;
        ProfileCreator: string;
        ProfileDescription: string;
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


