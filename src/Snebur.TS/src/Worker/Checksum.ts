namespace Snebur.WebWorker
{
    export class Checksum extends Snebur.WebWorker.WorkerCliente<ArrayBuffer | Blob, string>
    {
        private static UrlChecksum: string = "/workers/Snebur.Checksum.js?v=2";

        public static async RetornarChecksumAsync(bytesOuArquivo: ArrayBuffer | Blob): Promise<string | Error>
        {
            const nomeArquivo = bytesOuArquivo instanceof Blob
                ? `[Blob-${ArquivoUtil.RetornarNomeArquivo(bytesOuArquivo)}]`
                : `[buffer-${bytesOuArquivo.constructor.name}-${bytesOuArquivo.byteLength} ]`;

            console.warn(`CALCULADO checksum do arquivo: ${nomeArquivo} - CARREGANDO BUFFER PRIMEIRO`);

            const buffer = await this.RetornarBufferAsync(bytesOuArquivo);
            const checksum = await this.RetornarChecksumInternoAsync(buffer, nomeArquivo);
            if (u.Md5Util.IsMd5(checksum))
            {
                console.success(`Checksum calculado com sucesso: arquivo ${nomeArquivo}: ${checksum}`);
                return checksum;
            }

            const messagem = `ERROR CALCULAR CHECKSUM: arquivo ${nomeArquivo} : ${checksum}\n${checksum}`;
            return new Error(messagem);
        }

        private static async RetornarChecksumInternoAsync(
            buffer: ArrayBuffer,
            nomeArquivo: string): Promise<string | Error>
        {
            try
            {
                const checksum = await new Checksum().RetornarResultadoAsync(buffer);
                if (u.Md5Util.IsMd5(checksum))
                {
                    return checksum;
                }
            }
            catch (erro)
            {
                const mensagemErro = `Falha ao calcular o checksum do arquivo ${nomeArquivo}: ${erro}`;
                console.error(`WORKER: ${mensagemErro}`);
            }
            return this.CalcularChecksumMainThread(buffer, nomeArquivo);
        }

        private static CalcularChecksumMainThread(
            buffer: ArrayBuffer | Uint8Array,
            nomeArquivo: string): string | Error
        {
            try
            {
                const checksum = Snebur.Utilidade.ChecksumUtil.RetornarChecksum(buffer);
                console.baseLog(`Checksum calculado na MainThread: arquivo ${nomeArquivo}: ${checksum}`);
                return checksum;
            }
            catch (erro)
            {
                const mensagem = `Falha ao calcular o checksum do arquivo na MainThread ${nomeArquivo}: ${erro}`;
                return new Error(mensagem);
            }
        }

        private static async RetornarBufferAsync(bufferOrBlob: ArrayBuffer | Blob): Promise<ArrayBuffer>
        {
            if (bufferOrBlob instanceof ArrayBuffer)
            {
                return bufferOrBlob;
            }

            if (bufferOrBlob instanceof SnBlob)
            {
                console.baseWarn(`bufferOrBlob - SN-BLOB `);
            }

            return await bufferOrBlob.arrayBuffer();
        }

        public get UrlWorker(): string
        {
            return Checksum.UrlChecksum;
        }

        protected override NormalizarResultado(bytesOuArquivo: ArrayBuffer | Blob, resultado: string | Error, argumento: any): Promise<string | Error> | string | Error
        {
            if (!(typeof resultado === "string" && u.Md5Util.IsMd5(resultado)))
            {
                console.error(`Resultado inválido ao calcular o checksum do arquivo ${argumento}: ${resultado}`);
                if ($Configuracao.IsTeste)
                {
                    // eslint-disable-next-line no-debugger
                    debugger;
                }
            }
            return resultado;
        }
    }
}

