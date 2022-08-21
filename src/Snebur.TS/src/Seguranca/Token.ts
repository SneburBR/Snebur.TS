namespace Snebur.Seguranca
{
    export class Token
    {
        public static PADRAO: number = 16;
        public static TAMANHO_TOKEN: number = 56;
        private static get BytesChave(): Uint8Array
        {
            return new Uint8Array([105, 221, 53, 253, 252, 240, 253, 67, 176, 53, 126, 101, 155, 152, 107, 112]);
        }

        public static RetornarTokenAsync(): Promise< string>
        {
            return new Promise<string>(resolver =>
            {
                setTimeout(() =>
                {
                    const ticks = new Date().Ticks + $Aplicacao.DiferencaDataHoraUtcServidor;
                    const aleatorioInicio = u.BytesUtil.RetornarConteudoAleatorio(Token.PADRAO);
                    const bytesTicks = u.BytesUtil.RetornarBytesInt64(ticks);
                    const bytesChave = Token.BytesChave;
                    const aleatorioFim = u.BytesUtil.RetornarConteudoAleatorio(Token.PADRAO);
                    const bytesToken = new Uint8Array(Token.TAMANHO_TOKEN);
                    u.BytesUtil.CopiarBytes(bytesToken, aleatorioInicio, 0);
                    u.BytesUtil.CopiarBytes(bytesToken, bytesTicks, 16);
                    u.BytesUtil.CopiarBytes(bytesToken, bytesChave, 24);
                    u.BytesUtil.CopiarBytes(bytesToken, aleatorioFim, 40);
                    const t = u.Base64Util.BytesParaBase64(bytesToken);
                    resolver(t);
                });
            });
        }
    }
}