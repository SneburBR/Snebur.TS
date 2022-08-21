namespace Snebur.Utilidade
{
    export class CriptografiaUtil
    {
        private static readonly ChavePadrao: string = "287bcaa6-611d-461a-b751-6577a149f8a7";

        public static Criptografar(conteudo: string): string;
        public static Criptografar(chave: string, conteudo: string): string;
        public static Criptografar(argumento1: string, argumento2?: string): string
        {
            const [chave, conteudo] = this.RetornarChaveConteudo(argumento1, argumento2);
            return this.CriptografarInterno(chave, conteudo);
        }
         
        private static CriptografarInterno(chave: string, conteudo: string): string
        {
            chave = CriptografiaUtil.RetornarChave(chave);

            const key = ZCryptoJS.enc.Utf8.parse(chave);
            const iv = ZCryptoJS.enc.Utf8.parse(chave);
            const encrypted = ZCryptoJS.AES.encrypt(ZCryptoJS.enc.Utf8.parse(conteudo), key,
                {
                    //keySize: 128 / 8,
                    iv: iv,
                    mode: ZCryptoJS.mode.CBC,
                    padding: ZCryptoJS.pad.Pkcs7
                });

            return encrypted.toString();
        }

        public static Descriptografar(conteudo: string): string;
        public static Descriptografar(chave: string, conteudo: string): string;
        public static Descriptografar(argumento1: string, argumento2?: string): string
        {
            const [chave, conteudo] = this.RetornarChaveConteudo(argumento1, argumento2);
            return this.DescriptografarInterno(chave, conteudo);
        }

        private static DescriptografarInterno(chave: string, conteudo: string)
        {
            chave = CriptografiaUtil.RetornarChave(chave);

            const key = ZCryptoJS.enc.Utf8.parse(chave);
            const iv = ZCryptoJS.enc.Utf8.parse(chave);

            const decrypted = ZCryptoJS.AES.decrypt(conteudo, key, {
                //keySize: 128 / 8,
                iv: iv,
                mode: ZCryptoJS.mode.CBC,
                padding: ZCryptoJS.pad.Pkcs7
            });
            return decrypted.toString(ZCryptoJS.enc.Utf8);
        }

        private static RetornarChaveConteudo(argumento1: string, argumento2: string): [any, any]
        {
            if (typeof argumento2 === "string")
            {
                return [argumento1, argumento2];
            }
            return [this.ChavePadrao, argumento1];
        }

        private static RetornarChave(chave: string): string
        {
            if (chave == null)
            {
                return CriptografiaUtil.ChavePadrao;
            }
            if (chave.length > 16)
            {
                return chave.substring(0, 16);
            }
            const complemento = CriptografiaUtil.ChavePadrao.substr(chave.length);
            const retorno = chave + complemento;
            return retorno;
        }
    }
}