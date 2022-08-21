
namespace Snebur.Utilidade
{
    export class ChecksumUtil
    {
        public static RetornarChecksum(bufferBytes: Uint8Array | ArrayBuffer | string): string
        {
            return u.Md5Util.RetornarHash(bufferBytes);
        }
    }
}