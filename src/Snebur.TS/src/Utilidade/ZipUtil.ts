namespace Snebur.Utilidade
{
    export class ZipUtil
    {

        public static async CompactarTextoAsync(conteudo: string, nomeArquivo: string): Promise< Uint8Array>
        {
            const zip = new JSZip();
            zip.file(nomeArquivo, conteudo);
            const bytes = await zip.generateAsync({ type: "uint8array"  });
            return bytes;
        }

        public static async DecompactarTextoAsync(bytes: ArrayBuffer | Uint8Array, nomeArquivo: string): Promise<string>
        {
            const zip = new JSZip();
            await zip.loadAsync(bytes);
            const texto = await zip.file(nomeArquivo).async("text");
            return texto;
        }
    }
}