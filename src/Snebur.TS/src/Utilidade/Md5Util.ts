
namespace Snebur.Utilidade
{
    export class Md5Util
    {
        public static RetornarHash(argumento: ArrayBuffer | Uint8Array | string): string
        {
            return md5(argumento);
        }

        public static IsMd5(hash: string | any): boolean
        {
            if (typeof hash === "string")
            {
                return (/[a-fA-F0-9]{32}/).test(hash);
            }
            return false;
        }
    }
}