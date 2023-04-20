namespace Snebur.Utilidade
{
    export class MimeTypeUtil
    {
        public static RetornarMimeType(mimeTypeEnum: EnumMimeType): string
        {
            const descricao = (EnumMimeType as any)[mimeTypeEnum];
            if (EnumUtil.IsDefindo(EnumMimetypeString, descricao))
            {
                return (EnumMimetypeString as any)[descricao];
            }

            switch (mimeTypeEnum)
            {
                case EnumMimeType.Htm:
                    return EnumMimetypeString.Html;
                case EnumMimeType.Jpg:
                    return EnumMimetypeString.Jpeg;
                case EnumMimeType.Ps:
                    return EnumMimetypeString.Psd;
                case EnumMimeType.Tif:
                    return EnumMimetypeString.Tiff;
                default:
                    throw new Erro(`O tipo MimeType ${EnumUtil.RetornarDescricao(EnumMimeType, mimeTypeEnum)} não está definido ou é inválido`);
            }
        }
    }

    export enum EnumMimeTypeImagemString
    {
        Bmp = "image/bmp",
        Gif = "image/gif",
        Ico = "image/x-icon",
        Heic = "image/heic",
        Heif = "image/heif",
        Jpeg = "image/jpeg",
        Png = "image/png",
        Svg = "image/svg+xml",
        Tiff = "image/tiff",
        Webp = "image/webp"
    }

    export enum EnumMimetypeString
    {
        Aac = "audio/aac",
        Abw = "application/x-abiword",
        Ai = "application/postscript",
        Apng = "image/apng",
        Arc = "application/octet-stream",
        Avi = "video/x-msvideo",
        Avif = "image/avif",
        Azw = "application/vnd.amazon.ebook",
        Bin = "application/octet-stream",
        Bmp = "image/bmp",
        Bz = "application/x-bzip",
        Bz2 = "application/x-bzip2",
        Cdr = "application/cdr",
        Config = "application/xml",
        Csh = "application/x-csh",
        Css = "text/css",
        Csv = "text/csv",
        Dll = "application/octet-stream",
        Doc = "application/msword",
        Eot = "application/vnd.ms-fontobject",
        Epub = "application/epub+zip",
        Exe = "application/octet-stream",
        Gif = "image/gif",
        //Htm:
        Html = "text/html",
        Heic = "image/heic",
        Heif = "image/heif",
        Ico = "image/x-icon",
        Ics = "text/calendar",
        Jar = "application/java-archive",
        //Jpg:
        Jpeg = "image/jpeg",
        Js = "application/javascript",
        Json = "application/json",
        Mid = "audio/midi",
        Midi = "audio/midi",
        Mpeg = "video/mpeg",
        Mpkg = "application/vnd.apple.installer+xml",
        Odp = "application/vnd.oasis.opendocument.presentation",
        Ods = "application/vnd.oasis.opendocument.spreadsheet",
        Odt = "application/vnd.oasis.opendocument.text",
        Oga = "audio/ogg",
        Ogv = "video/ogg",
        Ogx = "application/ogg",
        Otf = "font/otf",
        Png = "image/png",
        Pdf = "application/pdf",
        Pdb = "application/octet-stream",
        Ppt = "application/vnd.ms-powerpoint",
        Psd = "application/photoshop",
        Rar = "application/x-rar-compressed",
        Rtf = "application/rtf",
        Sh = "application/x-sh",
        Svg = "image/svg+xml",
        Swf = "application/x-shockwave-flash",
        Tar = "application/x-tar",
        //Tif:
        Tiff = "image/tiff",
        Ts = "application/typescript",
        Ttf = "font/ttf",
        Vsd = "application/vnd.visio",
        Wav = "audio/x-wav",
        Wasm = "application/wasm",
        Weba = "audio/webm",
        Webm = "video/webm",
        Webp = "image/webp",
        Woff = "font/woff",
        Woff2 = "font/woff2",
        Xhtml = "application/xhtml+xml",
        Xls = "application/vnd.ms-excel ",
        Xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        Xml = "application/xml",
        Xul = "application/vnd.mozilla.xul+xml",
        Zip = "application/zip",
        _3gp = "video/3gpp",
        _3g2 = "video/3gpp2",
        _7z = "application/x-7z-compressed",

    }
}