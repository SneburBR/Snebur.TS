
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
                console.LogDebug(`LocalStorage : ${chave} - ${FormatacaoUtil.FormatarBytes(bytes)} `);
                total += bytes;
            }
            console.LogDebug(`LocalStorage TOTAL: ${FormatacaoUtil.FormatarBytes(total)} `);

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

        public static ClearAll()
        {
            for (let i = 0; i < localStorage.length; i++)
            {
                const chave = localStorage.key(i);
                localStorage.removeItem(chave);
            }
            localStorage.clear();
        }
    }

    export class SessionStorageUtil
    {
        public static ClearAll()
        {
            for (let i = 0; i < sessionStorage.length; i++)
            {
                const chave = sessionStorage.key(i);
                sessionStorage.removeItem(chave);
            }
            sessionStorage.clear();
        }
    }
}