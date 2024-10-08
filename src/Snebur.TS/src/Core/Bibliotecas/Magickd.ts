﻿declare namespace MagickWasm
{
    enum AlphaOption
    {
        Undefined = 0,
        Activate = 1,
        Associate = 2,
        Background = 3,
        Copy = 4,
        Deactivate = 5,
        Discrete = 6,
        Disassociate = 7,
        Extract = 8,
        Off = 9,
        On = 10,
        Opaque = 11,
        Remove = 12,
        Set = 13,
        Shape = 14,
        Transparent = 15
    }
    enum AutoThresholdMethod
    {
        Undefined = 0,
        Kapur = 1,
        OTSU = 2,
        Triangle = 3
    }
    enum PixelChannel
    {
        Red = 0,
        Cyan = 0,
        Gray = 0,
        Green = 1,
        Magenta = 1,
        Blue = 2,
        Yellow = 2,
        Black = 3,
        Alpha = 4,
        Index = 5,
        Composite = 64
    }
    export interface IChannelStatistics
    {
        channel: PixelChannel;
        depth: number;
        entropy: number;
        kurtosis: number;
        maximum: number;
        mean: number;
        minimum: number;
        skewness: number;
        standardDeviation: number;
    }
    enum Channels
    {
        Undefined = 0,
        Red = 1,
        Gray = 1,
        Cyan = 1,
        Green = 2,
        Magenta = 2,
        Blue = 4,
        Yellow = 4,
        Black = 8,
        Alpha = 16,
        Opacity = 16,
        Index = 32,
        Composite = 31,
        All = 134217727,
        TrueAlpha = 256,
        RGB = 7,
        CMYK = 15,
        Grays = 1024,
        Sync = 131072,
        Default = 134217727
    }
    class PrimaryInfo
    {
        private _x;
        private _y;
        private _z;
        constructor(x: number, y: number, z: number);
        get x(): number;
        get y(): number;
        get z(): number;
    }
    class ChromaticityInfo
    {
        red: PrimaryInfo;
        green: PrimaryInfo;
        blue: PrimaryInfo;
        white: PrimaryInfo;
        constructor(red: PrimaryInfo, green: PrimaryInfo, blue: PrimaryInfo, white: PrimaryInfo);
    }
    enum ClassType
    {
        Undefined = 0,
        Direct = 1,
        Pseudo = 2
    }
    enum ColorSpace
    {
        Undefined = 0,
        CMY = 1,
        CMYK = 2,
        Gray = 3,
        HCL = 4,
        HCLp = 5,
        HSB = 6,
        HSI = 7,
        HSL = 8,
        HSV = 9,
        HWB = 10,
        Lab = 11,
        LCH = 12,
        LCHab = 13,
        LCHuv = 14,
        Log = 15,
        LMS = 16,
        Luv = 17,
        OHTA = 18,
        Rec601YCbCr = 19,
        Rec709YCbCr = 20,
        RGB = 21,
        scRGB = 22,
        sRGB = 23,
        Transparent = 24,
        XyY = 25,
        XYZ = 26,
        YCbCr = 27,
        YCC = 28,
        YDbDr = 29,
        YIQ = 30,
        YPbPr = 31,
        YUV = 32,
        LinearGray = 33
    }
    enum ColorType
    {
        Undefined = 0,
        Bilevel = 1,
        Grayscale = 2,
        GrayscaleAlpha = 3,
        Palette = 4,
        PaletteAlpha = 5,
        TrueColor = 6,
        TrueColorAlpha = 7,
        ColorSeparation = 8,
        ColorSeparationAlpha = 9,
        Optimize = 10,
        PaletteBilevelAlpha = 11
    }
    enum CompositeOperator
    {
        Undefined = 0,
        Alpha = 1,
        Atop = 2,
        Blend = 3,
        Blur = 4,
        Bumpmap = 5,
        ChangeMask = 6,
        Clear = 7,
        ColorBurn = 8,
        ColorDodge = 9,
        Colorize = 10,
        CopyBlack = 11,
        CopyBlue = 12,
        Copy = 13,
        CopyCyan = 14,
        CopyGreen = 15,
        CopyMagenta = 16,
        CopyAlpha = 17,
        CopyRed = 18,
        CopyYellow = 19,
        Darken = 20,
        DarkenIntensity = 21,
        Difference = 22,
        Displace = 23,
        Dissolve = 24,
        Distort = 25,
        DivideDst = 26,
        DivideSrc = 27,
        DstAtop = 28,
        Dst = 29,
        DstIn = 30,
        DstOut = 31,
        DstOver = 32,
        Exclusion = 33,
        HardLight = 34,
        HardMix = 35,
        Hue = 36,
        In = 37,
        Intensity = 38,
        Lighten = 39,
        LightenIntensity = 40,
        LinearBurn = 41,
        LinearDodge = 42,
        LinearLight = 43,
        Luminize = 44,
        Mathematics = 45,
        MinusDst = 46,
        MinusSrc = 47,
        Modulate = 48,
        ModulusAdd = 49,
        ModulusSubtract = 50,
        Multiply = 51,
        No = 52,
        Out = 53,
        Over = 54,
        Overlay = 55,
        PegtopLight = 56,
        PinLight = 57,
        Plus = 58,
        Replace = 59,
        Saturate = 60,
        Screen = 61,
        SoftLight = 62,
        SrcAtop = 63,
        Src = 64,
        SrcIn = 65,
        SrcOut = 66,
        SrcOver = 67,
        Threshold = 68,
        VividLight = 69,
        Xor = 70,
        Stereo = 71
    }
    enum CompressionMethod
    {
        Undefined = 0,
        B44A = 1,
        B44 = 2,
        BZip = 3,
        DXT1 = 4,
        DXT3 = 5,
        DXT5 = 6,
        Fax = 7,
        Group4 = 8,
        JBIG1 = 9,
        JBIG2 = 10,
        JPEG2000 = 11,
        JPEG = 12,
        LosslessJPEG = 13,
        LZMA = 14,
        LZW = 15,
        NoCompression = 16,
        Piz = 17,
        Pxr24 = 18,
        RLE = 19,
        Zip = 20,
        ZipS = 21,
        Zstd = 22,
        WebP = 23,
        DWAA = 24,
        DWAB = 25,
        BC7 = 26,
        BC5 = 27
    }
    enum MagickFormat
    {
        Unknown = "UNKNOWN",
        ThreeFr = "3FR",
        ThreeG2 = "3G2",
        ThreeGp = "3GP",
        A = "A",
        Aai = "AAI",
        Ai = "AI",
        Apng = "APNG",
        Art = "ART",
        Arw = "ARW",
        Ashlar = "ASHLAR",
        Avi = "AVI",
        Avif = "AVIF",
        Avs = "AVS",
        B = "B",
        Bayer = "BAYER",
        Bayera = "BAYERA",
        Bgr = "BGR",
        Bgra = "BGRA",
        Bgro = "BGRO",
        Bmp = "BMP",
        Bmp2 = "BMP2",
        Bmp3 = "BMP3",
        Brf = "BRF",
        C = "C",
        Cal = "CAL",
        Cals = "CALS",
        Canvas = "CANVAS",
        Caption = "CAPTION",
        Cin = "CIN",
        Cip = "CIP",
        Clip = "CLIP",
        Cmyk = "CMYK",
        Cmyka = "CMYKA",
        Cr2 = "CR2",
        Cr3 = "CR3",
        Crw = "CRW",
        Cube = "CUBE",
        Cur = "CUR",
        Cut = "CUT",
        Data = "DATA",
        Dcm = "DCM",
        Dcr = "DCR",
        Dcraw = "DCRAW",
        Dcx = "DCX",
        Dds = "DDS",
        Dfont = "DFONT",
        Dng = "DNG",
        Dpx = "DPX",
        Dxt1 = "DXT1",
        Dxt5 = "DXT5",
        Epdf = "EPDF",
        Epi = "EPI",
        Eps = "EPS",
        Eps2 = "EPS2",
        Eps3 = "EPS3",
        Epsf = "EPSF",
        Epsi = "EPSI",
        Ept = "EPT",
        Ept2 = "EPT2",
        Ept3 = "EPT3",
        Erf = "ERF",
        Exr = "EXR",
        Farbfeld = "FARBFELD",
        Fax = "FAX",
        FF = "FF",
        File = "FILE",
        Fits = "FITS",
        Fl32 = "FL32",
        Flv = "FLV",
        Fractal = "FRACTAL",
        Ftp = "FTP",
        Ftxt = "FTXT",
        Fts = "FTS",
        G = "G",
        G3 = "G3",
        G4 = "G4",
        Gif = "GIF",
        Gif87 = "GIF87",
        Gradient = "GRADIENT",
        Gray = "GRAY",
        Graya = "GRAYA",
        Group4 = "GROUP4",
        Hald = "HALD",
        Hdr = "HDR",
        Heic = "HEIC",
        Heif = "HEIF",
        Histogram = "HISTOGRAM",
        Hrz = "HRZ",
        Htm = "HTM",
        Html = "HTML",
        Http = "HTTP",
        Https = "HTTPS",
        Icb = "ICB",
        Ico = "ICO",
        Icon = "ICON",
        Iiq = "IIQ",
        Info = "INFO",
        Inline = "INLINE",
        Ipl = "IPL",
        Isobrl = "ISOBRL",
        Isobrl6 = "ISOBRL6",
        J2c = "J2C",
        J2k = "J2K",
        Jng = "JNG",
        Jnx = "JNX",
        Jp2 = "JP2",
        Jpc = "JPC",
        Jpe = "JPE",
        Jpeg = "JPEG",
        Jpg = "JPG",
        Jpm = "JPM",
        Jps = "JPS",
        Jpt = "JPT",
        Json = "JSON",
        Jxl = "JXL",
        K = "K",
        K25 = "K25",
        Kdc = "KDC",
        Label = "LABEL",
        M = "M",
        M2v = "M2V",
        M4v = "M4V",
        Mac = "MAC",
        Map = "MAP",
        Mask = "MASK",
        Mat = "MAT",
        Matte = "MATTE",
        Mef = "MEF",
        Miff = "MIFF",
        Mkv = "MKV",
        Mng = "MNG",
        Mono = "MONO",
        Mov = "MOV",
        Mp4 = "MP4",
        Mpc = "MPC",
        Mpeg = "MPEG",
        Mpg = "MPG",
        Mrw = "MRW",
        Msl = "MSL",
        Msvg = "MSVG",
        Mtv = "MTV",
        Mvg = "MVG",
        Nef = "NEF",
        Nrw = "NRW",
        Null = "NULL",
        O = "O",
        Ora = "ORA",
        Orf = "ORF",
        Otb = "OTB",
        Otf = "OTF",
        Pal = "PAL",
        Palm = "PALM",
        Pam = "PAM",
        Pango = "PANGO",
        Pattern = "PATTERN",
        Pbm = "PBM",
        Pcd = "PCD",
        Pcds = "PCDS",
        Pcl = "PCL",
        Pct = "PCT",
        Pcx = "PCX",
        Pdb = "PDB",
        Pdf = "PDF",
        Pdfa = "PDFA",
        Pef = "PEF",
        Pes = "PES",
        Pfa = "PFA",
        Pfb = "PFB",
        Pfm = "PFM",
        Pgm = "PGM",
        Pgx = "PGX",
        Phm = "PHM",
        Picon = "PICON",
        Pict = "PICT",
        Pix = "PIX",
        Pjpeg = "PJPEG",
        Plasma = "PLASMA",
        Png = "PNG",
        Png00 = "PNG00",
        Png24 = "PNG24",
        Png32 = "PNG32",
        Png48 = "PNG48",
        Png64 = "PNG64",
        Png8 = "PNG8",
        Pnm = "PNM",
        Pocketmod = "POCKETMOD",
        Ppm = "PPM",
        Ps = "PS",
        Ps2 = "PS2",
        Ps3 = "PS3",
        Psb = "PSB",
        Psd = "PSD",
        Ptif = "PTIF",
        Pwp = "PWP",
        Qoi = "QOI",
        R = "R",
        RadialGradient = "RADIAL-GRADIENT",
        Raf = "RAF",
        Ras = "RAS",
        Raw = "RAW",
        Rgb = "RGB",
        Rgb565 = "RGB565",
        Rgba = "RGBA",
        Rgbo = "RGBO",
        Rgf = "RGF",
        Rla = "RLA",
        Rle = "RLE",
        Rmf = "RMF",
        Rw2 = "RW2",
        Scr = "SCR",
        Screenshot = "SCREENSHOT",
        Sct = "SCT",
        Sfw = "SFW",
        Sgi = "SGI",
        Shtml = "SHTML",
        Six = "SIX",
        Sixel = "SIXEL",
        SparseColor = "SPARSE-COLOR",
        Sr2 = "SR2",
        Srf = "SRF",
        Stegano = "STEGANO",
        StrImg = "STRIMG",
        Sun = "SUN",
        Svg = "SVG",
        Svgz = "SVGZ",
        Text = "TEXT",
        Tga = "TGA",
        Thumbnail = "THUMBNAIL",
        Tiff = "TIFF",
        Tiff64 = "TIFF64",
        Tile = "TILE",
        Tim = "TIM",
        Tm2 = "TM2",
        Ttc = "TTC",
        Ttf = "TTF",
        Txt = "TXT",
        Ubrl = "UBRL",
        Ubrl6 = "UBRL6",
        Uil = "UIL",
        Uyvy = "UYVY",
        Vda = "VDA",
        Vicar = "VICAR",
        Vid = "VID",
        Viff = "VIFF",
        Vips = "VIPS",
        Vst = "VST",
        Wbmp = "WBMP",
        Webp = "WEBP",
        Webm = "WEBM",
        Wmv = "WMV",
        Wpg = "WPG",
        X3f = "X3F",
        Xbm = "XBM",
        Xc = "XC",
        Xcf = "XCF",
        Xpm = "XPM",
        Xps = "XPS",
        Xv = "XV",
        Y = "Y",
        Yaml = "YAML",
        Ycbcr = "YCbCr",
        Ycbcra = "YCbCrA",
        Yuv = "YUV"
    }
    export interface IDefine
    {
        readonly format: MagickFormat;
        readonly name: string;
        readonly value: string;
    }
    export interface IDefines
    {
        getDefines(): IDefine[];
    }
    class MagickDefine implements IDefine
    {
        constructor(format: MagickFormat, name: string, value: string);
        readonly format: MagickFormat;
        readonly name: string;
        readonly value: string;
    }
    abstract class DefinesCreator implements IDefines
    {
        protected format: MagickFormat;
        constructor(format: MagickFormat);
        abstract getDefines(): IDefine[];
        createDefine(name: string, value: boolean): MagickDefine;
        createDefine(name: string, value: number): MagickDefine;
        createDefine(name: string, value: string): MagickDefine;
    }
    enum DensityUnit
    {
        Undefined = 0,
        PixelsPerInch = 1,
        PixelsPerCentimeter = 2
    }
    class Density
    {
        constructor(xy: number);
        constructor(xy: number, unit: DensityUnit);
        constructor(x: number, y: number, units: DensityUnit);
        readonly x: number;
        readonly y: number;
        readonly units: DensityUnit;
    }
    export interface IDisposable
    {
        dispose(): void;
    }
    enum DistortMethod
    {
        Undefined = 0,
        Affine = 1,
        AffineProjection = 2,
        ScaleRotateTranslate = 3,
        Perspective = 4,
        PerspectiveProjection = 5,
        BilinearForward = 6,
        BilinearReverse = 7,
        Polynomial = 8,
        Arc = 9,
        Polar = 10,
        DePolar = 11,
        Cylinder2Plane = 12,
        Plane2Cylinder = 13,
        Barrel = 14,
        BarrelInverse = 15,
        Shepards = 16,
        Resize = 17,
        Sentinel = 18,
        RigidAffine = 19
    }
    enum Gravity
    {
        Undefined = 0,
        Forget = 0,
        Northwest = 1,
        North = 2,
        Northeast = 3,
        West = 4,
        Center = 5,
        East = 6,
        Southwest = 7,
        South = 8,
        Southeast = 9
    }
    class MagickColor
    {
        private _r;
        private _g;
        private _b;
        private _a;
        private _k;
        private _isCmyk;
        constructor(color?: string);
        constructor(r: number, g: number, b: number);
        constructor(r: number, g: number, b: number, a: number);
        constructor(c: number, m: number, y: number, k: number, a: number);
        get r(): number;
        set r(value: number);
        get g(): number;
        set g(value: number);
        get b(): number;
        set b(value: number);
        get a(): number;
        set a(value: number);
        get k(): number;
        set k(value: number);
        get isCmyk(): boolean;
        toShortString(): string;
        toString(): string;
        private initialize;
        private toHex;
    }
    abstract class NativeInstance
    {
        private readonly disposeMethod;
        private instance;
        dispose(): void;
        private disposeInstance;
    }
    enum PaintMethod
    {
        Undefined = 0,
        Point = 1,
        Replace = 2,
        Floodfill = 3,
        FillToBorder = 4,
        Reset = 5
    }
    export interface IDrawingWand extends IDisposable
    {
        color(x: number, y: number, paintMethod: number): void;
        draw(drawables: IDrawable[]): void;
        fillColor(value: MagickColor): void;
        fillOpacity(value: number): void;
        font(family: string): void;
        fontPointSize(value: number): void;
        gravity(value: Gravity): void;
        rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void;
        roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void;
        text(x: number, y: number, value: string): void;
    }
    class DrawingWand extends NativeInstance implements IDrawingWand
    {
        private constructor();
        color(x: number, y: number, paintMethod: PaintMethod): void;
        draw(drawables: IDrawable[]): void;
        fillColor(value: MagickColor): void;
        fillOpacity(value: number): void;
        font(fileName: string): void;
        fontPointSize(value: number): void;
        gravity(value: Gravity): void;
        rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void;
        roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void;
        text(x: number, y: number, value: string): void;
    }
    export interface IDrawable
    {
        draw(wand: IDrawingWand): void;
    }
    class DrawableColor implements IDrawable
    {
        private readonly _x;
        private readonly _y;
        private readonly _paintMethod;
        constructor(x: number, y: number, paintMethod: PaintMethod);
        draw(wand: IDrawingWand): void;
    }
    class DrawableFillColor implements IDrawable
    {
        private readonly _color;
        constructor(color: MagickColor);
        draw(wand: IDrawingWand): void;
    }
    class Percentage
    {
        private _value;
        constructor(value: number);
        multiply(value: number): number;
        toDouble(): number;
        toQuantum(): number;
    }
    class DrawableFillOpacity implements IDrawable
    {
        private readonly _opacity;
        constructor(opacity: Percentage);
        draw(wand: IDrawingWand): void;
    }
    class DrawableFontPointSize implements IDrawable
    {
        private readonly _pointSize;
        constructor(pointSize: number);
        draw(wand: IDrawingWand): void;
    }
    class DrawableFont implements IDrawable
    {
        private readonly _font;
        constructor(font: string);
        draw(wand: IDrawingWand): void;
    }
    class DrawableGravity implements IDrawable
    {
        private readonly _gravity;
        constructor(gravity: Gravity);
        draw(wand: IDrawingWand): void;
    }
    class DrawableRectangle implements IDrawable
    {
        private readonly _upperLeftX;
        private readonly _upperLeftY;
        private readonly _lowerRightX;
        private readonly _lowerRightY;
        constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number);
        draw(wand: IDrawingWand): void;
    }
    class DrawableRoundRectangle implements IDrawable
    {
        private readonly _upperLeftX;
        private readonly _upperLeftY;
        private readonly _lowerRightX;
        private readonly _lowerRightY;
        private readonly _cornerWidth;
        private readonly _cornerHeight;
        constructor(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number);
        draw(wand: IDrawingWand): void;
    }
    class DrawableText implements IDrawable
    {
        private readonly _x;
        private readonly _y;
        private readonly _value;
        constructor(x: number, y: number, value: string);
        draw(wand: IDrawingWand): void;
    }
    enum ErrorMetric
    {
        Undefined = 0,
        Absolute = 1,
        Fuzz = 2,
        MeanAbsolute = 3,
        MeanErrorPerPixel = 4,
        MeanSquared = 5,
        NormalizedCrossCorrelation = 6,
        PeakAbsolute = 7,
        PeakSignalToNoiseRatio = 8,
        PerceptualHash = 9,
        RootMeanSquared = 10,
        StructuralSimilarity = 11,
        StructuralDissimilarity = 12
    }
    enum EvaluateOperator
    {
        Undefined = 0,
        Abs = 1,
        Add = 2,
        AddModulus = 3,
        And = 4,
        Cosine = 5,
        Divide = 6,
        Exponential = 7,
        GaussianNoise = 8,
        ImpulseNoise = 9,
        LaplacianNoise = 10,
        LeftShift = 11,
        Log = 12,
        Max = 13,
        Mean = 14,
        Median = 15,
        Min = 16,
        MultiplicativeNoise = 17,
        Multiply = 18,
        Or = 19,
        PoissonNoise = 20,
        Pow = 21,
        RightShift = 22,
        RootMeanSquare = 23,
        Set = 24,
        Sine = 25,
        Subtract = 26,
        Sum = 27,
        ThresholdBlack = 28,
        Threshold = 29,
        ThresholdWhite = 30,
        UniformNoise = 31,
        Xor = 32,
        InverseLog = 33
    }
    enum FilterType
    {
        Undefined = 0,
        Point = 1,
        Box = 2,
        Triangle = 3,
        Hermite = 4,
        Hann = 5,
        Hamming = 6,
        Blackman = 7,
        Gaussian = 8,
        Quadratic = 9,
        Cubic = 10,
        Catrom = 11,
        Mitchell = 12,
        Jinc = 13,
        Sinc = 14,
        SincFast = 15,
        Kaiser = 16,
        Welch = 17,
        Parzen = 18,
        Bohman = 19,
        Bartlett = 20,
        Lagrange = 21,
        Lanczos = 22,
        LanczosSharp = 23,
        Lanczos2 = 24,
        Lanczos2Sharp = 25,
        Robidoux = 26,
        RobidouxSharp = 27,
        Cosine = 28,
        Spline = 29,
        LanczosRadius = 30,
        CubicSpline = 31
    }
    enum DngOutputColor
    {
        Raw = 0,
        SRGB = 1,
        AdobeRGB = 2,
        WideGamutRGB = 3,
        KodakProPhotoRGB = 4,
        XYZ = 5,
        ACES = 6
    }
    class DngReadDefines extends DefinesCreator
    {
        constructor();
        disableAutoBrightness?: boolean;
        outputColor?: DngOutputColor;
        useAutoWhitebalance?: boolean;
        useCameraWhitebalance?: boolean;
        getDefines(): IDefine[];
        private hasValue;
    }
    class MagickGeometry
    {
        private _width;
        private _height;
        private _x;
        private _y;
        private _aspectRatio;
        private _fillArea;
        private _greater;
        private _isPercentage;
        private _ignoreAspectRatio;
        private _less;
        private _limitPixels;
        constructor(value: string);
        constructor(widthAndHeight: number);
        constructor(width: number, height: number);
        constructor(x: number, y: number, width: number, height: number);
        get aspectRatio(): boolean;
        get fillArea(): boolean;
        set fillArea(value: boolean);
        get greater(): boolean;
        set greater(value: boolean);
        get ignoreAspectRatio(): boolean;
        set ignoreAspectRatio(value: boolean);
        get isPercentage(): boolean;
        set isPercentage(value: boolean);
        get less(): boolean;
        set less(value: boolean);
        get limitPixels(): boolean;
        set limitPixels(value: boolean);
        get height(): number;
        set height(value: number);
        get width(): number;
        set width(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        toString(): string;
        private initialize;
        private initializeFromAspectRation;
        private parseNumber;
        private isNumber;
        private hasFlag;
    }
    class DistortSettings
    {
        bestFit: boolean;
        scale?: number;
        viewport?: MagickGeometry;
    }
    export interface IImageProfile
    {
        readonly name: string;
        getData(): Uint8Array;
    }
    class ImageProfile implements IImageProfile
    {
        private _data;
        constructor(name: string, data: Uint8Array);
        readonly name: string;
        getData(): Uint8Array;
    }
    class MagickSettings
    {
        backgroundColor?: MagickColor;
        colorType?: ColorType;
        fillColor?: MagickColor;
        font?: string;
        fontPointsize?: number;
        format?: MagickFormat;
        strokeColor?: MagickColor;
        strokeWidth?: number;
        textInterlineSpacing?: number;
        textKerning?: number;
        getDefine(name: string): string;
        getDefine(format: MagickFormat, name: string): string;
        setDefine(name: string, value: string): void;
        setDefine(format: MagickFormat, name: string, value: string): void;
        setDefine(format: MagickFormat, name: string, value: number): void;
        setDefine(format: MagickFormat, name: string, value: boolean): void;
        setDefines(defines: IDefines): void;
        private parseDefine;
    }
    class MagickReadSettings extends MagickSettings
    {
        constructor(partialSettings?: Partial<MagickReadSettings>);
        height?: number;
        width?: number;
        private getSize;
    }
    class MontageSettings
    {
        backgroundColor?: MagickColor;
        borderColor?: MagickColor;
        borderWidth?: number;
        fillColor?: MagickColor;
        font?: string;
        fontPointsize?: number;
        frameGeometry?: MagickGeometry;
        geometry?: MagickGeometry;
        gravity?: Gravity;
        label?: string;
        shadow?: boolean;
        strokeColor?: MagickColor;
        textureFileName?: string;
        tileGeometry?: MagickGeometry;
        title?: string;
        transparentColor?: MagickColor;
    }
    export interface IMagickImageCollection extends Array<IMagickImage>, IDisposable
    {
        appendHorizontally<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        appendHorizontally<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        appendVertically<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        appendVertically<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        clone<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => TReturnType): TReturnType;
        evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        flatten<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        flatten<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        merge<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        merge<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
        montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        mosaic<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        mosaic<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        read(fileName: string, settings?: MagickReadSettings): void;
        read(array: Uint8Array, settings?: MagickReadSettings): void;
        write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
        write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
    }
    class MagickImageCollection extends Array<MagickImage> implements IMagickImageCollection
    {
        private constructor();
        dispose(): void;
        appendHorizontally<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        appendHorizontally<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        appendVertically<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        appendVertically<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        clone<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        clone<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => TReturnType): TReturnType;
        evaluate<TReturnType>(evaluateOperator: EvaluateOperator, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        flatten<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        flatten<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        merge<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        merge<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
        montage<TReturnType>(settings: MontageSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        mosaic<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        mosaic<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        read(fileName: string, settings?: MagickReadSettings): void;
        read(array: Uint8Array, settings?: MagickReadSettings): void;
        write<TReturnType>(func: (data: Uint8Array) => TReturnType, format?: MagickFormat): TReturnType;
        write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>, format?: MagickFormat): Promise<TReturnType>;
        static create(): IMagickImageCollection;
        private addImages;
        private attachImages;
        private static createObject;
        private createImage;
        private static createSettings;
        private detachImages;
        private getSettings;
        private mergeImages;
        private throwIfEmpty;
        private checkResult;
    }
    enum OrientationType
    {
        Undefined = 0,
        TopLeft = 1,
        TopRight = 2,
        BottomRight = 3,
        BottomLeft = 4,
        LeftTop = 5,
        RightTop = 6,
        RightBottom = 7,
        LeftBotom = 8
    }
    export type quantumArray = Uint8Array;
    export interface IPixelCollection extends IDisposable
    {
        getArea(x: number, y: number, width: number, height: number): quantumArray;
        getPixel(x: number, y: number): quantumArray;
        setArea(x: number, y: number, width: number, height: number, quantumPixels: quantumArray): void;
        setArea(x: number, y: number, width: number, height: number, numberPixels: number[]): void;
        setPixel(x: number, y: number, quantumPixels: quantumArray): void;
        setPixel(x: number, y: number, numberPixels: number[]): void;
        toByteArray(x: number, y: number, width: number, height: number, mapping: string): quantumArray | null;
    }
    class PixelCollection extends NativeInstance implements IPixelCollection
    {
        private readonly image;
        private constructor();
        getArea(x: number, y: number, width: number, height: number): quantumArray;
        getPixel(x: number, y: number): quantumArray;
        setArea(x: number, y: number, width: number, height: number, quantumPixels: quantumArray): void;
        setArea(x: number, y: number, width: number, height: number, numberPixels: number[]): void;
        setPixel(x: number, y: number, quantumPixels: quantumArray): void;
        setPixel(x: number, y: number, numberPixels: number[]): void;
        toByteArray(x: number, y: number, width: number, height: number, mapping: string): quantumArray | null;
        private static createArray;
        private use;
    }
    enum PixelInterpolateMethod
    {
        Undefined = 0,
        Average = 1,
        Average9 = 2,
        Average16 = 3,
        Background = 4,
        Bilinear = 5,
        Blend = 6,
        Catrom = 7,
        Integer = 8,
        Mesh = 9,
        Nearest = 10,
        Spline = 11
    }
    class Point
    {
        private _x;
        private _y;
        constructor(xy: number);
        constructor(x: number, y: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
    }
    export interface IStatistics
    {
        readonly channels: ReadonlyArray<PixelChannel>;
        composite(): IChannelStatistics;
        getChannel(channel: PixelChannel): IChannelStatistics | null;
    }
    enum VirtualPixelMethod
    {
        Undefined = 0,
        Background = 1,
        Dither = 2,
        Edge = 3,
        Mirror = 4,
        Random = 5,
        Tile = 6,
        Transparent = 7,
        Mask = 8,
        Black = 9,
        Gray = 10,
        White = 11,
        HorizontalTile = 12,
        VerticalTile = 13,
        HorizontalTileEdge = 14,
        VerticalTileEdge = 15,
        CheckerTile = 16
    }
    export interface IMagickImage extends IDisposable
    {
        animationDelay: number;
        animationIterations: number;
        animationTicksPerSecond: number;
        readonly artifactNames: ReadonlyArray<string>;
        readonly attributeNames: ReadonlyArray<string>;
        backgroundColor: MagickColor;
        readonly baseHeight: number;
        readonly baseWidth: number;
        blackPointCompensation: boolean;
        borderColor: MagickColor;
        boundingBox: MagickGeometry | null;
        readonly channelCount: number;
        readonly channels: ReadonlyArray<PixelChannel>;
        chromaticity: ChromaticityInfo;
        classType: ClassType;
        colorFuzz: Percentage;
        colormapSize: number;
        colorSpace: ColorSpace;
        colorType: ColorType;
        comment: string | null;
        compose: CompositeOperator;
        readonly compression: CompressionMethod;
        density: Density;
        depth: number;
        filterType: FilterType;
        format: MagickFormat;
        hasAlpha: boolean;
        readonly height: number;
        interpolate: PixelInterpolateMethod;
        label: string | null;
        orientation: OrientationType;
        page: MagickGeometry;
        quality: number;
        readonly settings: MagickSettings;
        readonly signature: string | null;
        virtualPixelMethod: VirtualPixelMethod;
        width: number;
        addProfile(name: string, data: Uint8Array): void;
        alpha(value: AlphaOption): void;
        autoOrient(): void;
        autoThreshold(method: AutoThresholdMethod): void;
        blur(): void;
        blur(channels: Channels): void;
        blur(radius: number, sigma: number): void;
        blur(radius: number, sigma: number, channels: Channels): void;
        border(size: number): void;
        border(width: number, height: number): void;
        brightnessContrast(brightness: Percentage, contrast: Percentage): void;
        brightnessContrast(brightness: Percentage, contrast: Percentage, channels: Channels): void;
        channelOffset(pixelChannel: PixelChannel): number;
        charcoal(): void;
        charcoal(radius: number, sigma: number): void;
        clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;
        clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;
        clone<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        clone<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        colorAlpha(color: MagickColor): void;
        compare(image: IMagickImage, metric: ErrorMetric): number;
        compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;
        composite(image: IMagickImage): void;
        composite(image: IMagickImage, compose: CompositeOperator): void;
        composite(image: IMagickImage, compose: CompositeOperator, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, args: string): void;
        composite(image: IMagickImage, compose: CompositeOperator, args: string, channels: Channels): void;
        composite(image: IMagickImage, point: Point): void;
        composite(image: IMagickImage, point: Point, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, point: Point): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, point: Point, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
        contrast(): void;
        contrastStretch(blackPoint: Percentage): void;
        contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;
        contrastStretch(blackPoint: Percentage, whitePoint?: Percentage, channels?: Channels): void;
        crop(geometry: MagickGeometry): void;
        crop(geometry: MagickGeometry, gravity: Gravity): void;
        crop(width: number, height: number): void;
        crop(width: number, height: number, gravity: Gravity): void;
        cropToTiles(geometry: MagickGeometry): IMagickImageCollection;
        deskew(threshold: Percentage): number;
        distort(method: DistortMethod, params: number[]): void;
        distort(method: DistortMethod, settings: DistortSettings, params: number[]): void;
        draw(drawables: IDrawable[]): void;
        draw(...drawables: IDrawable[]): void;
        evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;
        evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;
        evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: number): void;
        evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: Percentage): void;
        extent(width: number, height: number): void;
        extent(width: number, height: number, gravity: Gravity): void;
        extent(width: number, height: number, backgroundColor: MagickColor): void;
        extent(geometry: MagickGeometry): void;
        extent(geometry: MagickGeometry, gravity: Gravity): void;
        extent(geometry: MagickGeometry, gravity: Gravity, backgroundColor: MagickColor): void;
        extent(geometry: MagickGeometry, backgroundColor: MagickColor): void;
        flip(): void;
        flop(): void;
        getArtifact(name: string): string | null;
        getAttribute(name: string): string | null;
        getProfile(name: string): IImageProfile | null;
        getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;
        getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;
        getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;
        getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
        histogram(): Map<string, number>;
        inverseContrast(): void;
        inverseOpaque(target: MagickColor, fill: MagickColor): void;
        inverseSigmoidalContrast(contrast: number): void;
        inverseSigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
        inverseSigmoidalContrast(contrast: number, midpoint: number): void;
        inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
        inverseTransparent(color: MagickColor): void;
        level(blackPoint: Percentage, whitePoint: Percentage): void;
        level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
        level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage): void;
        level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
        linearStretch(blackPoint: Percentage, whitePoint: Percentage): void;
        liquidRescale(geometry: MagickGeometry): void;
        liquidRescale(width: number, height: number): void;
        modulate(brightness: Percentage): void;
        modulate(brightness: Percentage, saturation: Percentage): void;
        modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;
        negate(): void;
        negate(channels: Channels): void;
        negateGrayScale(): void;
        negateGrayScale(channels: Channels): void;
        normalize(): void;
        oilPaint(): void;
        oilPaint(radius: number): void;
        opaque(target: MagickColor, fill: MagickColor): void;
        ping(fileName: string, settings?: MagickReadSettings): void;
        ping(array: Uint8Array, settings?: MagickReadSettings): void;
        read(color: MagickColor, width: number, height: number): void;
        read(fileName: string, settings?: MagickReadSettings): void;
        read(array: Uint8Array, settings?: MagickReadSettings): void;

        removeArtifact(name: string): void;
        removeAttribute(name: string): void;
        removeProfile(name: string): void;
        removeWriteMask(): void;
        repage(): void;
        resize(geometry: MagickGeometry): void;
        resize(width: number, height: number): void;
        rotate(degrees: number): void;
        separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType, channels: Channels): TReturnType;
        separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>, channels: Channels): Promise<TReturnType>;
        setArtifact(name: string, value: string): void;
        setArtifact(name: string, value: boolean): void;
        setAttribute(name: string, value: string): void;
        setWriteMask(image: IMagickImage): void;
        sharpen(): void;
        sharpen(radius: number, sigma: number): void;
        sharpen(radius: number, sigma: number, channels: Channels): void;
        shave(leftRight: number, topBottom: number): void;
        sigmoidalContrast(contrast: number): void;
        sigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
        sigmoidalContrast(contrast: number, midpoint: number): void;
        sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
        splice(geometry: MagickGeometry): void;
        statistics(): IStatistics;
        statistics(channels: Channels): IStatistics;
        strip(): void;
        toString(): string;
        transparent(color: MagickColor): void;
        trim(): void;
        trim(...edges: Gravity[]): void;
        trim(percentage: Percentage): void;
        vignette(): void;
        vignette(radius: number, sigma: number, x: number, y: number): void;
        wave(): void;
        wave(method: PixelInterpolateMethod, amplitude: number, length: number): void;
        write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;
        write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;
        write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
        write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;

    }
    class MagickImage extends NativeInstance implements IMagickImage
    {
        private readonly _settings;
        private constructor();
        get animationDelay(): number;
        set animationDelay(value: number);
        get animationIterations(): number;
        set animationIterations(value: number);
        get animationTicksPerSecond(): number;
        set animationTicksPerSecond(value: number);
        get artifactNames(): ReadonlyArray<string>;
        get attributeNames(): ReadonlyArray<string>;
        get backgroundColor(): MagickColor;
        set backgroundColor(value: MagickColor);
        get baseHeight(): number;
        get baseWidth(): number;
        get blackPointCompensation(): boolean;
        set blackPointCompensation(value: boolean);
        get borderColor(): MagickColor;
        set borderColor(value: MagickColor);
        get boundingBox(): MagickGeometry | null;
        get channelCount(): number;
        get channels(): ReadonlyArray<PixelChannel>;
        get chromaticity(): ChromaticityInfo;
        set chromaticity(value: ChromaticityInfo);
        get classType(): ClassType;
        set classType(value: ClassType);
        get colorFuzz(): Percentage;
        set colorFuzz(value: Percentage);
        get colormapSize(): number;
        set colormapSize(value: number);
        get colorSpace(): ColorSpace;
        set colorSpace(value: ColorSpace);
        get colorType(): ColorType;
        set colorType(value: ColorType);
        get comment(): string | null;
        set comment(value: string | null);
        get compose(): CompositeOperator;
        set compose(value: CompositeOperator);
        get compression(): CompressionMethod;
        get density(): Density;
        set density(value: Density);
        get depth(): number;
        set depth(value: number);
        get filterType(): number;
        set filterType(value: number);
        get format(): MagickFormat;
        set format(value: MagickFormat);
        get hasAlpha(): boolean;
        set hasAlpha(value: boolean);
        get height(): number;
        get interpolate(): PixelInterpolateMethod;
        set interpolate(value: PixelInterpolateMethod);
        get label(): string | null;
        set label(value: string | null);
        get orientation(): OrientationType;
        set orientation(value: OrientationType);
        get page(): MagickGeometry;
        set page(value: MagickGeometry);
        get quality(): number;
        set quality(value: number);
        get settings(): MagickSettings;
        get signature(): string | null;
        get virtualPixelMethod(): VirtualPixelMethod;
        set virtualPixelMethod(value: VirtualPixelMethod);
        get width(): number;
        addProfile(name: string, data: Uint8Array): void;
        alpha(value: AlphaOption): void;
        autoOrient(): void;
        autoThreshold(method: AutoThresholdMethod): void;
        blur(): void;
        blur(channels: Channels): void;
        blur(radius: number, sigma: number): void;
        blur(radius: number, sigma: number, channels: Channels): void;
        border(size: number): void;
        border(width: number, height: number): void;
        brightnessContrast(brightness: Percentage, contrast: Percentage): void;
        brightnessContrast(brightness: Percentage, contrast: Percentage, channels: Channels): void;
        channelOffset(pixelChannel: PixelChannel): number;
        charcoal(): void;
        charcoal(radius: number, sigma: number): void;
        clahe(xTiles: number, yTiles: number, numberBins: number, clipLimit: number): void;
        clahe(xTiles: Percentage, yTiles: Percentage, numberBins: number, clipLimit: number): void;
        clone<TReturnType>(func: (image: IMagickImage) => TReturnType): TReturnType;
        clone<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        colorAlpha(color: MagickColor): void;
        compare(image: IMagickImage, metric: ErrorMetric): number;
        compare(image: IMagickImage, metric: ErrorMetric, channels: Channels): number;
        composite(image: IMagickImage): void;
        composite(image: IMagickImage, compose: CompositeOperator): void;
        composite(image: IMagickImage, compose: CompositeOperator, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, args: string): void;
        composite(image: IMagickImage, compose: CompositeOperator, args: string, channels: Channels): void;
        composite(image: IMagickImage, point: Point): void;
        composite(image: IMagickImage, point: Point, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, channels: Channels): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string): void;
        composite(image: IMagickImage, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, args: string, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, point: Point): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, point: Point, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, channels: Channels): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string): void;
        compositeGravity(image: IMagickImage, gravity: Gravity, compose: CompositeOperator, point: Point, args: string, channels: Channels): void;
        contrast: () => void;
        contrastStretch(blackPoint: Percentage): void;
        contrastStretch(blackPoint: Percentage, whitePoint: Percentage): void;
        static create(): IMagickImage;
        static create(color: MagickColor, width: number, height: number): IMagickImage;
        static create(fileName: string, settings?: MagickReadSettings): IMagickImage;
        static create(array: Uint8Array, settings?: MagickReadSettings): IMagickImage;
        crop(geometry: MagickGeometry): void;
        crop(geometry: MagickGeometry, gravity: Gravity): void;
        crop(width: number, height: number): void;
        crop(width: number, height: number, gravity: Gravity): void;
        cropToTiles(geometry: MagickGeometry): IMagickImageCollection;
        deskew(threshold: Percentage): number;
        distort(method: DistortMethod, params: number[]): void;
        distort(method: DistortMethod, settings: DistortSettings, params: number[]): void;
        draw(drawables: IDrawable[]): void;
        draw(...drawables: IDrawable[]): void;
        evaluate(channels: Channels, operator: EvaluateOperator, value: number): void;
        evaluate(channels: Channels, operator: EvaluateOperator, value: Percentage): void;
        evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: number): void;
        evaluate(channels: Channels, geometry: MagickGeometry, operator: EvaluateOperator, value: Percentage): void;
        extent(width: number, height: number): void;
        extent(width: number, height: number, gravity: Gravity): void;
        extent(width: number, height: number, backgroundColor: MagickColor): void;
        extent(geometry: MagickGeometry): void;
        extent(geometry: MagickGeometry, gravity: Gravity): void;
        extent(geometry: MagickGeometry, gravity: Gravity, backgroundColor: MagickColor): void;
        extent(geometry: MagickGeometry, backgroundColor: MagickColor): void;
        flip(): void;
        flop(): void;
        getArtifact(name: string): string | null;
        getAttribute(name: string): string | null;
        getProfile(name: string): IImageProfile | null;
        getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => TReturnType): TReturnType;
        getWriteMask<TReturnType>(func: (mask: IMagickImage | null) => Promise<TReturnType>): Promise<TReturnType>;
        getPixels<TReturnType>(func: (pixels: IPixelCollection) => TReturnType): TReturnType;
        getPixels<TReturnType>(func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
        histogram(): Map<string, number>;
        inverseContrast: () => void;
        inverseOpaque: (target: MagickColor, fill: MagickColor) => void;
        inverseSigmoidalContrast(contrast: number): void;
        inverseSigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
        inverseSigmoidalContrast(contrast: number, midpoint: number): void;
        inverseSigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
        inverseTransparent: (color: MagickColor) => void;
        level(blackPoint: Percentage, whitePoint: Percentage): void;
        level(blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
        level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage): void;
        level(channels: Channels, blackPoint: Percentage, whitePoint: Percentage, gamma: number): void;
        linearStretch(blackPoint: Percentage, whitePoint: Percentage): void;
        liquidRescale(geometry: MagickGeometry): void;
        liquidRescale(width: number, height: number): void;
        negate(): void;
        negateGrayScale(): void;
        normalize(): void;
        modulate(brightness: Percentage): void;
        modulate(brightness: Percentage, saturation: Percentage): void;
        modulate(brightness: Percentage, saturation: Percentage, hue: Percentage): void;
        oilPaint(): void;
        oilPaint(radius: number): void;
        opaque: (target: MagickColor, fill: MagickColor) => void;
        ping(fileName: string, settings?: MagickReadSettings): void;
        ping(array: Uint8Array, settings?: MagickReadSettings): void;
        read(color: MagickColor, width: number, height: number): void;
        read(fileName: string, settings?: MagickReadSettings): void;
        read(array: Uint8Array, settings?: MagickReadSettings): void;

        removeArtifact(name: string): void;
        removeAttribute(name: string): void;
        removeProfile(name: string): void;
        removeWriteMask(): void;
        repage(): void;
        resize(geometry: MagickGeometry): void;
        resize(width: number, height: number): void;
        rotate(degrees: number): void;
        separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        separate<TReturnType>(func: (images: IMagickImageCollection) => TReturnType, channels: Channels): TReturnType;
        separate<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>, channels: Channels): Promise<TReturnType>;
        setArtifact(name: string, value: string): void;
        setArtifact(name: string, value: boolean): void;
        setAttribute(name: string, value: string): void;
        setWriteMask(image: IMagickImage): void;
        sharpen(): void;
        sharpen(radius: number, sigma: number): void;
        sharpen(radius: number, sigma: number, channels: Channels): void;
        shave(leftRight: number, topBottom: number): void;
        sigmoidalContrast(contrast: number): void;
        sigmoidalContrast(contrast: number, midpointPercentage: Percentage): void;
        sigmoidalContrast(contrast: number, midpoint: number): void;
        sigmoidalContrast(contrast: number, midpoint: number, channels: Channels): void;
        splice(geometry: MagickGeometry): void;
        statistics(): IStatistics;
        statistics(channels: Channels): IStatistics;
        strip(): void;
        toString: () => string;
        transparent(color: MagickColor): void;
        trim(): void;
        trim(...edges: Gravity[]): void;
        trim(percentage: Percentage): void;
        wave(): void;
        wave(method: PixelInterpolateMethod, amplitude: number, length: number): void;
        vignette(): void;
        vignette(radius: number, sigma: number, x: number, y: number): void;
        write<TReturnType>(func: (data: Uint8Array) => TReturnType): TReturnType;
        write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => TReturnType): TReturnType;
        write<TReturnType>(func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;
        write<TReturnType>(format: MagickFormat, func: (data: Uint8Array) => Promise<TReturnType>): Promise<TReturnType>;

        private _contrast;
        private _opaque;
        private _sigmoidalContrast;
        private _transparent;
        private static createInstance;
        private fromBool;
        private readOrPing;
        private readFromArray;
        private toBool;
        private valueOrDefault;
    }
    class ImageMagick
    {
        private readonly loader;
        private api?;
        private constructor();
        static _create: () => ImageMagick;
        static read<TReturnType>(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(array: Uint8Array, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(array: Uint8Array, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(array: Uint8Array, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(array: Uint8Array, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(fileName: string, format: MagickFormat, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static read<TReturnType>(fileName: string, func: (image: IMagickImage) => TReturnType): TReturnType;
        static read<TReturnType>(fileName: string, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(array: Uint8Array, format: MagickFormat, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(array: Uint8Array, format: MagickFormat, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(array: Uint8Array, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(array: Uint8Array, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => TReturnType): TReturnType;
        static readCollection<TReturnType>(fileName: string, func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
        readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => TReturnType): TReturnType;
        readFromCanvas<TReturnType>(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;

    }
    function initializeImageMagick(wasmLocation?: string | ArrayBuffer | Blob | Uint8Array): Promise<void>;
    class MagickColors
    {
        static get None(): MagickColor;
        static get Transparent(): MagickColor;
        static get AliceBlue(): MagickColor;
        static get AntiqueWhite(): MagickColor;
        static get Aqua(): MagickColor;
        static get Aquamarine(): MagickColor;
        static get Azure(): MagickColor;
        static get Beige(): MagickColor;
        static get Bisque(): MagickColor;
        static get Black(): MagickColor;
        static get BlanchedAlmond(): MagickColor;
        static get Blue(): MagickColor;
        static get BlueViolet(): MagickColor;
        static get Brown(): MagickColor;
        static get BurlyWood(): MagickColor;
        static get CadetBlue(): MagickColor;
        static get Chartreuse(): MagickColor;
        static get Chocolate(): MagickColor;
        static get Coral(): MagickColor;
        static get CornflowerBlue(): MagickColor;
        static get Cornsilk(): MagickColor;
        static get Crimson(): MagickColor;
        static get Cyan(): MagickColor;
        static get DarkBlue(): MagickColor;
        static get DarkCyan(): MagickColor;
        static get DarkGoldenrod(): MagickColor;
        static get DarkGray(): MagickColor;
        static get DarkGreen(): MagickColor;
        static get DarkKhaki(): MagickColor;
        static get DarkMagenta(): MagickColor;
        static get DarkOliveGreen(): MagickColor;
        static get DarkOrange(): MagickColor;
        static get DarkOrchid(): MagickColor;
        static get DarkRed(): MagickColor;
        static get DarkSalmon(): MagickColor;
        static get DarkSeaGreen(): MagickColor;
        static get DarkSlateBlue(): MagickColor;
        static get DarkSlateGray(): MagickColor;
        static get DarkTurquoise(): MagickColor;
        static get DarkViolet(): MagickColor;
        static get DeepPink(): MagickColor;
        static get DeepSkyBlue(): MagickColor;
        static get DimGray(): MagickColor;
        static get DodgerBlue(): MagickColor;
        static get Firebrick(): MagickColor;
        static get FloralWhite(): MagickColor;
        static get ForestGreen(): MagickColor;
        static get Fuchsia(): MagickColor;
        static get Gainsboro(): MagickColor;
        static get GhostWhite(): MagickColor;
        static get Gold(): MagickColor;
        static get Goldenrod(): MagickColor;
        static get Gray(): MagickColor;
        static get Green(): MagickColor;
        static get GreenYellow(): MagickColor;
        static get Honeydew(): MagickColor;
        static get HotPink(): MagickColor;
        static get IndianRed(): MagickColor;
        static get Indigo(): MagickColor;
        static get Ivory(): MagickColor;
        static get Khaki(): MagickColor;
        static get Lavender(): MagickColor;
        static get LavenderBlush(): MagickColor;
        static get LawnGreen(): MagickColor;
        static get LemonChiffon(): MagickColor;
        static get LightBlue(): MagickColor;
        static get LightCoral(): MagickColor;
        static get LightCyan(): MagickColor;
        static get LightGoldenrodYellow(): MagickColor;
        static get LightGreen(): MagickColor;
        static get LightGray(): MagickColor;
        static get LightPink(): MagickColor;
        static get LightSalmon(): MagickColor;
        static get LightSeaGreen(): MagickColor;
        static get LightSkyBlue(): MagickColor;
        static get LightSlateGray(): MagickColor;
        static get LightSteelBlue(): MagickColor;
        static get LightYellow(): MagickColor;
        static get Lime(): MagickColor;
        static get LimeGreen(): MagickColor;
        static get Linen(): MagickColor;
        static get Magenta(): MagickColor;
        static get Maroon(): MagickColor;
        static get MediumAquamarine(): MagickColor;
        static get MediumBlue(): MagickColor;
        static get MediumOrchid(): MagickColor;
        static get MediumPurple(): MagickColor;
        static get MediumSeaGreen(): MagickColor;
        static get MediumSlateBlue(): MagickColor;
        static get MediumSpringGreen(): MagickColor;
        static get MediumTurquoise(): MagickColor;
        static get MediumVioletRed(): MagickColor;
        static get MidnightBlue(): MagickColor;
        static get MintCream(): MagickColor;
        static get MistyRose(): MagickColor;
        static get Moccasin(): MagickColor;
        static get NavajoWhite(): MagickColor;
        static get Navy(): MagickColor;
        static get OldLace(): MagickColor;
        static get Olive(): MagickColor;
        static get OliveDrab(): MagickColor;
        static get Orange(): MagickColor;
        static get OrangeRed(): MagickColor;
        static get Orchid(): MagickColor;
        static get PaleGoldenrod(): MagickColor;
        static get PaleGreen(): MagickColor;
        static get PaleTurquoise(): MagickColor;
        static get PaleVioletRed(): MagickColor;
        static get PapayaWhip(): MagickColor;
        static get PeachPuff(): MagickColor;
        static get Peru(): MagickColor;
        static get Pink(): MagickColor;
        static get Plum(): MagickColor;
        static get PowderBlue(): MagickColor;
        static get Purple(): MagickColor;
        static get Red(): MagickColor;
        static get RosyBrown(): MagickColor;
        static get RoyalBlue(): MagickColor;
        static get SaddleBrown(): MagickColor;
        static get Salmon(): MagickColor;
        static get SandyBrown(): MagickColor;
        static get SeaGreen(): MagickColor;
        static get SeaShell(): MagickColor;
        static get Sienna(): MagickColor;
        static get Silver(): MagickColor;
        static get SkyBlue(): MagickColor;
        static get SlateBlue(): MagickColor;
        static get SlateGray(): MagickColor;
        static get Snow(): MagickColor;
        static get SpringGreen(): MagickColor;
        static get SteelBlue(): MagickColor;
        static get Tan(): MagickColor;
        static get Teal(): MagickColor;
        static get Thistle(): MagickColor;
        static get Tomato(): MagickColor;
        static get Turquoise(): MagickColor;
        static get Violet(): MagickColor;
        static get Wheat(): MagickColor;
        static get White(): MagickColor;
        static get WhiteSmoke(): MagickColor;
        static get Yellow(): MagickColor;
        static get YellowGreen(): MagickColor;
    }
    enum MagickErrorSeverity
    {
        Error = 400,
        ResourceLimitError = 400,
        TypeError = 405,
        OptionError = 410,
        DelegateError = 415,
        MissingDelegateError = 420,
        CorruptImageError = 425,
        FileOpenError = 430,
        BlobError = 435,
        StreamError = 440,
        CacheError = 445,
        CoderError = 450,
        FilterError = 452,
        ModuleError = 455,
        DrawError = 460,
        ImageError = 465,
        WandError = 470,
        RandomError = 475,
        XServerError = 480,
        MonitorError = 485,
        RegistryError = 490,
        ConfigureError = 495,
        PolicyError = 499
    }
    class MagickError extends Error
    {
        private readonly _severity;
        private _relatedErrors;
        constructor(message: string, severity?: MagickErrorSeverity);
        get relatedErrors(): ReadonlyArray<MagickError>;
        get severity(): MagickErrorSeverity;
    }
    class MagickFormatInfo
    {
        private readonly _format;
        private readonly _description;
        private readonly _supportsMultipleFrames;
        private readonly _supportsReading;
        private readonly _supportsWriting;
        private static _all;
        private constructor();
        get description(): string;
        get format(): MagickFormat;
        get supportsMultipleFrames(): boolean;
        get supportsReading(): boolean;
        get supportsWriting(): boolean;
        static get all(): ReadonlyArray<MagickFormatInfo>;
        static create(format: MagickFormat): MagickFormatInfo;
        private static loadFormats;
        private static convertFormat;
    }
    class Magick
    {
        static get delegates(): string;
        static get features(): string;
        static get imageMagickVersion(): string;
        static get supportedFormats(): ReadonlyArray<MagickFormatInfo>;
        static addFont(name: string, data: Uint8Array): void;
        static setRandomSeed: (seed: number) => void;
    }
    class Quantum
    {
        static get depth(): number;
        static get max(): number;
    }
    class DrawingSettings
    {
        backgroundColor?: MagickColor;
        fillColor?: MagickColor;
        font?: string;
        fontPointsize?: number;
        strokeColor?: MagickColor;
        strokeWidth?: number;
    }

    interface HTMLCanvasElement
    {

    }
}
