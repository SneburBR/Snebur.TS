namespace Snebur.Comunicacao
{
    export class PacoteUtil
    {
        private static NOME_ARQUIVO_PACOTE: string = "pacote.json";

        public static async CompactarPacoteAsync(json: string): Promise<Uint8Array>
        {
            return PacoteUtil.CompactarPacoteInternoAsync(json);
        }

        public static async DecompactarPacoteAsync(bytes: Uint8Array): Promise<string>
        {
            return PacoteUtil.DecompactarPacoteInternoAsync(bytes);
        }

        private static async CompactarPacoteInternoAsync(json: string): Promise<Uint8Array>
        {
            const zip = new JSZip();
            zip.file(PacoteUtil.NOME_ARQUIVO_PACOTE, json);

            const bytes = await zip.generateAsync({ type: "uint8array" }) as Uint8Array;
            return s.BaralhoUtil.Embaralhar(bytes);
        }

        private static async DecompactarPacoteInternoAsync(bytes: Uint8Array): Promise<string>
        {
            const bytesNormalizado = s.BaralhoUtil.Desembaralhar(bytes);
            const zip = new JSZip();
            await zip.loadAsync(bytesNormalizado);
            const texto = await zip.file(PacoteUtil.NOME_ARQUIVO_PACOTE).async("text");
            return texto;
        }
    }
}