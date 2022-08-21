namespace Snebur.Utilidade
{
    export class ZipUtil
    {

        public static CompactarTexto(conteudo: string, nomeArquivo: string): Uint8Array
        {
            const zip = new JSZip();
            zip.file(nomeArquivo, conteudo);
            return zip.generate({ type: "uint8array" }) as Uint8Array;
        }

        public static DecompactarTexto(bytes: ArrayBuffer, nomeArquivo: string): string
        {
            const zip = new JSZip();
            zip.load(bytes);
            const texto = zip.file(nomeArquivo).asText();
            return texto;
        }
    }
}