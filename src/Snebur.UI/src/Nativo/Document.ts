

//type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
//type FontFaceSetLoadStatus = "loading" | "loaded";
//type BinaryData = ArrayBuffer | ArrayBufferView;

//interface FontFaceDescriptors
//{
//    style?: string;
//    weight?: string;
//    stretch?: string;
//    unicodeRange?: string;
//    variant?: string;
//    featureSettings?: string;
//}

//interface FontFaceSetLoadEventInit extends EventInit
//{
//    fontfaces?: FontFace[];
//}

//interface FontFaceSetEventMap
//{
//    "loading": (this: FontFaceSet, event: FontFaceSetLoadEvent) => any;
//    "loadingdone": (this: FontFaceSet, event: FontFaceSetLoadEvent) => any;
//    "loadingerror": (this: FontFaceSet, event: FontFaceSetLoadEvent) => any;
//}

//interface FontFaceSet extends EventTarget
//{

//    //onloading: ((this: FontFaceSet, event: FontFaceSetLoadEvent) => any) | null;
//    //onloadingdone: ((this: FontFaceSet, event: FontFaceSetLoadEvent) => any) | null;
//    //onloadingerror: ((this: FontFaceSet, event: FontFaceSetLoadEvent) => any) | null;


//    addEventListener<K extends keyof FontFaceSetEventMap>(type: K, listener: FontFaceSetEventMap[K], options?: boolean | AddEventListenerOptions): void;
//    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
//    removeEventListener<K extends keyof FontFaceSetEventMap>(type: K, listener: FontFaceSetEventMap[K], options?: boolean | EventListenerOptions): void;
//    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;


//    load(font: string, text?: string): Promise<FontFace[]>;
//    check(font: string, text?: string): boolean;

//    readonly ready: Promise<FontFaceSet>;
//    readonly status: FontFaceSetLoadStatus;
//}


//interface FontFace
//{
//    load(): Promise<FontFace>;
//    family: string;
//    style: string;
//    weight: string;
//    stretch: string;
//    unicodeRange: string;
//    variant: string;
//    featureSettings: string;
//    variationSettings: string;
//    display: string;
//    readonly status: FontFaceLoadStatus;
//    readonly loaded: Promise<FontFace>;
//}

//interface FontFaceSetLoadEvent extends Event
//{
//    readonly fontfaces: FontFace[];
//}

//interface Document
//{
//    fonts?: FontFaceSet;
//}

interface WorkerGlobalScope
{
    fonts: FontFaceSet;
}

interface WheelEvent
{
    wheelDelta: number
}

interface HTMLCollectionOf<T>  
{
    [Symbol.iterator](): IterableIterator<T>;
}

 