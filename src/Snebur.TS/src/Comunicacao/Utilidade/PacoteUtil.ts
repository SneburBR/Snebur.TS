namespace Snebur.Comunicacao
{
    export class PacoteUtil
    {
        private static NOME_ARQUIVO_PACOTE: string = "pacote.json";

        public static CompactarPacote(json: string): Uint8Array
        {
            const zip = new JSZip();
            zip.file(PacoteUtil.NOME_ARQUIVO_PACOTE, json);

            const bytes = zip.generate({ type: "uint8array" }) as Uint8Array;
            return s.BaralhoUtil.Embaralhar(bytes);
        }

        public static DecompactarPacote(bytes: Uint8Array): string
        {
            const bytesNormalizado = s.BaralhoUtil.Desembaralhar(bytes);
            const zip = new JSZip();
            zip.load(bytesNormalizado);
            const texto = zip.file(PacoteUtil.NOME_ARQUIVO_PACOTE).asText();
            return texto;
        }
    }
}