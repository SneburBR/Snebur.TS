namespace Snebur.Utilidade
{
    export class GuidUtil
    {
        public static GuidVazio = "892f55ef-8ec7-49d5-aad9-55f6fbb7bf32";

        private static __S4()
        {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        public static RetornarNovoGuid(): string
        {
            return (GuidUtil.__S4() + GuidUtil.__S4() + "-" + GuidUtil.__S4() + "-4" + GuidUtil.__S4().substr(0, 3) + "-" + GuidUtil.__S4() + "-" + GuidUtil.__S4() + GuidUtil.__S4() + GuidUtil.__S4()).toLowerCase();
        }

        public static RetornarBytes(guid: string): Uint8Array
        {
            if (!ValidacaoUtil.IsGuid(guid))
            {
                throw new Erro("O guid {0} não é valido", guid);
            }

            const bytes = new Uint8Array(16);
            guid.split("-").map((number, index) =>
            {
                const bytesInChar = index < 3 ? number.match(/.{1,2}/g).reverse() : number.match(/.{1,2}/g);
                bytesInChar.map((byte) =>
                {
                    bytes[index] = parseInt(byte, 16);
                });
            });
            return bytes;
        }
    }
}