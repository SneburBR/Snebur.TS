//declare namespace JsZip
//{
//    interface JSZipConstructor
//    {
//        (): JSZip;
//        new(): JSZip;
//        prototype: JSZip;
//    }

//    interface JSZipObject
//    {
//        name: string;

//        dir: boolean;

//        date: Date;

//        comment: string;

//        options: any;

//        unixPermissions: number | string | null;

//        dosPermissions: number | null;

//        asText(): string;

//        asUint8Array(): Uint8Array;

//        asArrayBuffer(): ArrayBuffer;
//    }

//    interface OutputByType
//    {
//        base64: string;
//        text: string;
//        binarystring: string;
//        array: number[];
//        uint8array: Uint8Array;
//        arraybuffer: ArrayBuffer;
//        blob: Blob;
//    }

//    type OutputType = keyof OutputByType;

//    type Compression = "STORE" | "DEFLATE";

//    interface JSZipGeneratorOptions<T extends OutputType = OutputType>
//    {
//        compression?: Compression;
//        compressionOptions?: null | {
//            level: number;
//        };
//        type?: T;
//        comment?: string;
//        mimeType?: string;
//        encodeFileName?(filename: string): string;
//        streamFiles?: boolean;
//        platform?: "DOS" | "UNIX";
//    }

//    interface InputByType
//    {
//        base64: string;
//        string: string;
//        text: string;
//        binarystring: string;
//        array: number[];
//        uint8array: Uint8Array;
//        arraybuffer: ArrayBuffer;
//        blob: Blob;
//    }

//    type InputFileFormat = InputByType[keyof InputByType];
//}


//interface JSZip
//{
//    file(nomeArquivo: string): JsZip.JSZipObject;
//    file(nomeArquivo: string, conteudo: Uint8Array | ArrayBuffer | Blob | string): JSZip;
//    generate(opcoes: JsZip.JSZipGeneratorOptions): Uint8Array;
//    load(conteudo: JsZip.InputFileFormat): any;
//    files: { [key: string]: JsZip.JSZipObject };
//    file(path: string): JsZip.JSZipObject;
//    Arquivos: Array<JsZip.JSZipObject>;
//}

//declare let JSZip: JsZip.JSZipConstructor;

//Object.defineProperty(JSZip.prototype, "Arquivos",
//    {
//        get: function (this: JSZip)
//        {
//            return Object.keys(this.files).Select(x => this.files[x]).Where(x => typeof x === "object").ToList();
//        },
//        enumerable: false
//    });

