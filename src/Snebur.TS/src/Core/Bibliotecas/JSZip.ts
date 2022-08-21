namespace JsZip
{
    export interface JSZipConstructor
    {
        (): JSZip;
        new(): JSZip;
        prototype: JSZip;
    }

    export interface JSZipObject
    {
        name: string;

        dir: boolean;

        date: Date;

        comment: string;

        options: any;

        unixPermissions: number | string | null;

        dosPermissions: number | null;

        asText(): string;

        asUint8Array(): Uint8Array;

        asArrayBuffer(): ArrayBuffer;
    }

    export interface OutputByType
    {
        base64: string;
        text: string;
        binarystring: string;
        array: number[];
        uint8array: Uint8Array;
        arraybuffer: ArrayBuffer;
        blob: Blob;
    }

    export type OutputType = keyof OutputByType;

    export type Compression = "STORE" | "DEFLATE";

    export interface JSZipGeneratorOptions<T extends OutputType = OutputType>
    {
        compression?: Compression;
        compressionOptions?: null | {
            level: number;
        };
        type?: T;
        comment?: string;
        mimeType?: string;
        encodeFileName?(filename: string): string;
        streamFiles?: boolean;
        platform?: "DOS" | "UNIX";
    }
}

interface JSZip
{
    file(nomeArquivo: string): JsZip.JSZipObject;
    file(nomeArquivo: string, conteudo: Uint8Array | ArrayBuffer | Blob | string): JSZip;
    generate(opcoes: JsZip.JSZipGeneratorOptions): Uint8Array;
    load(conteudo: any): any;
    files: { [key: string]: JsZip.JSZipObject };
    file(path: string): JsZip.JSZipObject;
    Arquivos: Array<JsZip.JSZipObject>;
}

declare let JSZip: JsZip.JSZipConstructor;

Object.defineProperty(JSZip.prototype, "Arquivos",
    {
        get: function (this: JSZip)
        {
            return Object.keys(this.files).Select(x => this.files[x]).Where(x => typeof x === "object").ToList();
        },
        enumerable: false
    });

