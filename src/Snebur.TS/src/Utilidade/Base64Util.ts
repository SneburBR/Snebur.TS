namespace Snebur.Utilidade
{
    export class Base64Util
    {
        private static ____base64Caracteres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"];
        private static _base64Caracteres: HashSet<string> = null;

        private static get Base64Caracteres(): HashSet<string>
        {
            if (Base64Util._base64Caracteres == null)
            {
                Base64Util._base64Caracteres = new HashSet<string>();
                Base64Util._base64Caracteres.AddRange(Base64Util.____base64Caracteres);
            }
            return Base64Util._base64Caracteres;
        }

        public static IsBase64(strBase64: string): boolean
        {
            if (String.IsNullOrWhiteSpace(strBase64) || strBase64.length === 0 ||
                strBase64.length % 4 !== 0 || strBase64.Contains(" ") ||
                strBase64.Contains("\t") || strBase64.Contains("\r") ||
                strBase64.Contains("\n"))
            {
                return false;
            }
            // 98% of all non base64 values are invalidated by this time.
            let index = strBase64.length - 1;
            if (strBase64[index] === "=")
            {
                index--;
            }
            if (strBase64[index] === "=")
            {
                index--;
            }
            for (let i = 0; i <= index; i++)
            {
                if (!Base64Util.Base64Caracteres.Contains(strBase64[i]))
                {
                    return false;
                }
            }
            return true;
        }

        public static Encode(str: string)
        {
            if (!ValidacaoUtil.IsString(str))
            {
                str = ConverterUtil.ParaString(str);
            }

            if (typeof window.btoa === "undefined")
            {
                throw new ErroNaoSuportado("O Base64 não está suportado nativo no navegador, usar biblioteca, não implementado", this);
            }
            return window.btoa(str);
        }

        public static Decode(str: string, isIgnorarErro: boolean = false)
        {
            if (typeof window.atob === "undefined")
            {
                throw new ErroNaoSuportado("O Base64 não está suportado nativo no navegador, usar biblioteca, não implementado", this);
            }

            if (!String.IsNullOrWhiteSpace(str))
            {
                try
                {
                    return window.atob(str);
                }
                catch (ex)
                {
                    console.error(ex);
                    if (!isIgnorarErro)
                    {
                        throw ex;
                    }
                }
            }
            return String.Empty;
        }

        public static Base64ParaArrayBuffer(base64string: string): ArrayBuffer
        {
            return Base64Util.Base64ParaBytes(base64string).buffer;
        }

        public static Base64ParaBytes(base64string: string): Uint8Array
        {
            const binary_string = window.atob(base64string);
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++)
            {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes;
        }

        public static ArrayBufferParaBase64(buffer: ArrayBuffer): string
        {
            return Base64Util.BytesParaBase64(new Uint8Array(buffer));
        }

        public static BytesParaBase64(bytes: Uint8Array): string
        {
            const CHUNK_SIZE = 0x8000;
            const length = bytes.length;

            let index = 0;
            let result: string = "";
            let slice: Uint8Array;

            while (index < length)
            {
                slice = bytes.subarray(index, Math.min(index + CHUNK_SIZE, length));
                result += String.fromCharCode.apply(null, slice);
                index += CHUNK_SIZE;
            }
            return Base64Util.Encode(result);
        }
    }
}