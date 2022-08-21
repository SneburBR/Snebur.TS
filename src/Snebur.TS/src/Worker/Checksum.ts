namespace Snebur.WebWorker
{
    export class Checksum extends Snebur.WebWorker.WorkerCliente<Uint8Array | ArrayBuffer | Blob, string>
    {
        private static UrlChecksum: string = "/workers/Snebur.Checksum.js?v=2";

        public static RetornarChecksumAsync(bytesOuArquivo: Uint8Array | ArrayBuffer | Blob): Promise<string | Error>
        {
            return new Checksum().RetornarResultadoAsync(bytesOuArquivo);
        }

        public get UrlWorker(): string
        {
            return Checksum.UrlChecksum;
        }

        protected override NormalizarResultado(bytesOuArquivo: Uint8Array | ArrayBuffer | Blob, resultado: string | Error, argumento: any): Promise<string | Error> | string | Error
        {
            if (resultado instanceof Error)
            {
                return resultado;
            }
            return resultado;
        }
    }
}

