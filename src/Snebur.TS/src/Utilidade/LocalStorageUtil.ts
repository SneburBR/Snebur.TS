﻿
namespace Snebur.Utilidade
{
    export class LocalStorageUtil
    {
        public static AdicionarConteudo(chave: string, conteudo: any)
        {
            const expirarem = (new Date().getTime()) + (365 * 24 * 60 * 60 * 1000);
            const json = JSON.stringify(conteudo);
            const jsonBase64 = u.Base64Util.Encode(json);

            const valor = {
                "value": jsonBase64,
                "expires": expirarem
            };

            const valorJson = JSON.stringify(valor);
            localStorage.removeItem(chave);
            localStorage.setItem(chave, valorJson);
        }

        public static RetornarConteudo(chave: string): any
        {
            const valorJson = localStorage.getItem(chave);
            if (u.JsonUtil.IsJson(valorJson))
            {
                const valor = JSON.parse(valorJson);
                if (u.Base64Util.IsBase64(valor.value))
                {
                    const json = u.Base64Util.Decode(valor.value);
                    const conteudo = JSON.parse(json);
                    return conteudo;
                }
            }
            return null;
        }

        public static LogTotalBytesUsados()
        {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++)
            {
                const chave = localStorage.key(i);
                const conteudo = localStorage.getItem(chave);
                const bytes = conteudo?.length ?? 0;
                console.warn(`LocalStorage : ${chave} - ${bytes} `);
                total += bytes;
            }
            console.warn(`LocalStorage TOTAL: ${total} `);

        }
        public static RetornarTotalBytesUsados(): number
        {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++)
            {
                const chave = localStorage.key(i);
                const conteudo = localStorage.getItem(chave);
                total += conteudo?.length ?? 0;
            }
            return total;
        }
    }
}