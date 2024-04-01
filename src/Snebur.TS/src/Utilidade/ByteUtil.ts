namespace Snebur.Utilidade
{
    export class BytesUtil
    {

        public static RetornarBytesInt64(long: number): Uint8Array
        {
            const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
            for (let index = 0; index < byteArray.length; index++)
            {
                const byte = long & 0xff;
                byteArray[index] = byte;
                long = (long - byte) / 256;
            }
            return new Uint8Array(byteArray);
        }

        public static Reverter(bytes: Uint8Array): Uint8Array
        {

            if (u.SistemaUtil.NavegadorEnum === d.EnumNavegador.InternetExplorer)
            {
                const len = bytes.length;
                const retorno = new Uint8Array(len);
                for (let i = 0; i < bytes.length; i++)
                {
                    const indiceReverso = (len - 1) - i;
                    retorno[indiceReverso] = bytes[i];
                }
                return retorno;
            }
            return bytes.reverse();
        }

        public static CopiarBytes(destino: Uint8Array, origem: Uint8Array, offsetDestino: number): void
        {
            for (let i = 0; i < origem.length; i++)
            {
                destino[i + offsetDestino] = origem[i];
            }
        }

        public static RetornarConteudoAleatorio(quantidade: number): Uint8Array
        {
            const bytes = new Uint8Array(quantidade);
            for (let i = 0; i < quantidade; i++)
            {
                bytes[i] = u.RandomUtil.RetornarRandom(254);
            }
            return bytes;
        }

        public static ToUTF8ArrayBytes(conteudo: string): Uint8Array
        {
            const utf8 = [];
            for (let i = 0; i < conteudo.length; i++)
            {
                let charcode = conteudo.charCodeAt(i);
                if (charcode < 0x80) utf8.push(charcode);
                else if (charcode < 0x800)
                {
                    utf8.push(0xc0 | (charcode >> 6),
                        0x80 | (charcode & 0x3f));
                }
                else if (charcode < 0xd800 || charcode >= 0xe000)
                {
                    utf8.push(0xe0 | (charcode >> 12),
                        0x80 | ((charcode >> 6) & 0x3f),
                        0x80 | (charcode & 0x3f));
                }
                else
                {
                    i++;
                    charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (conteudo.charCodeAt(i) & 0x3ff));

                    utf8.push(0xf0 | (charcode >> 18),
                        0x80 | ((charcode >> 12) & 0x3f),
                        0x80 | ((charcode >> 6) & 0x3f),
                        0x80 | (charcode & 0x3f));
                }
            }

            const retorno = new Uint8Array(utf8.length);
            for (let i = 0; i < retorno.length; i++)
            {
                retorno[i] = utf8[i];
            }
            return retorno;
        }
    }

    
}