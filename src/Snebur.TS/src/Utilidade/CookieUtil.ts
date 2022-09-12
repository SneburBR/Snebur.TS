namespace Snebur.Utilidade
{
    export class CookieUtil
    {
        private static readonly IsPreferirLocalStore: boolean = true;
        private static readonly DIAS_EM_CACHE: number = 365 * 2;
        private static readonly CHAVE_LOCAL_STORAGE = "sn-cookie";

        private static _idSessaoLocalStore: string = null;
        private static _isNCookieNativoAtivo: boolean = null;
        private static _chaveLocalStorage: string = null;

        private static get IdSessaoLocalStorage()
        {
            return CookieUtil._idSessaoLocalStore;
        }

        private static get ChaveLocalStorage()
        {
            if (CookieUtil._chaveLocalStorage == null)
            {
                CookieUtil._chaveLocalStorage = CookieUtil.CHAVE_LOCAL_STORAGE + "_" + document.location.hostname.GetHashCode();
            }
            return CookieUtil._chaveLocalStorage;
        }

        public static get IsCookieAtivo(): boolean
        {
            if (CookieUtil._isNCookieNativoAtivo == null)
            {
                CookieUtil._isNCookieNativoAtivo = CookieUtil.CheckCookieAtivo();
                if (!CookieUtil._isNCookieNativoAtivo)
                {
                    CookieUtil._idSessaoLocalStore = GuidUtil.RetornarNovoGuid();
                }
            }
            return CookieUtil._isNCookieNativoAtivo;
        }

        public static RetornarCookie(chave: string)
        {
            const cookie = CookieUtil.RetornarCookieInterno(chave);
            const pares = cookie.split(";");
            const len = pares.length;
            for (let i = 0; i < len; i++)
            {
                const par = pares[i].trim();
                const partes = par.split("=");
                const chaveCookie = partes[0];
                const valorBase64 = partes[1];

                if (chaveCookie === chave)
                {
                    const valorCriptografado = Base64Util.Decode(valorBase64, true);
                    if (!String.IsNullOrWhiteSpace(valorCriptografado))
                    {
                        return CriptografiaUtil.Descriptografar(chave, valorCriptografado);
                    }
                }
            }
            return null;
        }


        public static ExisteCookie(chave: string)
        {
            const valor = CookieUtil.RetornarCookie(chave);
            return (!String.IsNullOrWhiteSpace(valor));
        }

        public static SalvarCookie(chave: string, valor: string, isManterConectado: boolean)
        {
            const conteudo = CookieUtil.RetornarConteudoCookie(chave, valor, isManterConectado);
            CookieUtil.SalvarCookieInternal(chave, conteudo, isManterConectado);
        }

        public static Clear()
        {
            localStorage.clear();
        }

        public static Remover(chave: string)
        {
            localStorage.removeItem(CookieUtil.ChaveLocalStorage + "-" + chave);
        }

        private static RetornarConteudoCookie(chave: string, valor: string, isManterConectado: boolean)
        {
            const valorCriptografado = CriptografiaUtil.Criptografar(chave, valor);
            const valorBase64 = Base64Util.Encode(valorCriptografado);
            const partes = new List<string>();
            partes.Add(`${chave}=${valorBase64}`);

            const dataExpiracao = CookieUtil.RetornarDataManterConectado(isManterConectado);
            partes.Add(`expires=${dataExpiracao.toUTCString()}`);

            if (location.protocol === "https:")
            {
                partes.Add("SameSite=None");
                partes.Add("Secure");
            }
            return String.Join(";", partes);
        }

        private static RetornarCookieInterno(chave: string)
        {
            if (CookieUtil.IsCookieAtivo)
            {
                return document.cookie;
            }

            const localStoreItemString = localStorage.getItem(CookieUtil.ChaveLocalStorage + "-" + chave);
            if (localStoreItemString != null)
            {
                try
                {
                    const localStoreItem: LocalStoreCookieItem = JSON.parse(localStoreItemString);
                    if (localStoreItem != null)
                    {
                        if (localStoreItem.idSessaoLocalStorage === CookieUtil.IdSessaoLocalStorage)
                        {
                            return localStoreItem.conteudo;
                        }

                        if (ValidacaoUtil.IsNumber(localStoreItem.Expiracao) && localStoreItem.Expiracao > 0)
                        {
                            const dataExpiracao = new Date(localStoreItem.Expiracao);
                            if (dataExpiracao > new Date())
                            {
                                return localStoreItem.conteudo;
                            }
                        }
                    }
                }
                catch (erro)
                {
                    console.error("Falha ao deserializar LocalStoreCookieItem");
                }
            }
            return String.Empty;
        }

        private static SalvarCookieInternal(chave: string, conteudo: string, isManterConectado: boolean)
        {
            if (CookieUtil.IsCookieAtivo)
            {
                document.cookie = conteudo;
                return;
            }

            const expireDate = CookieUtil.RetornarDataManterConectado(isManterConectado);
            const localStoreItem: LocalStoreCookieItem = {
                conteudo: conteudo,
                idSessaoLocalStorage: CookieUtil.IdSessaoLocalStorage,
                Expiracao: expireDate.getTime()
            };
            localStorage.setItem(CookieUtil.ChaveLocalStorage + "-" + chave, JSON.stringify(localStoreItem));
        }

        private static CheckCookieAtivo(): boolean
        {
            if (CookieUtil.IsPreferirLocalStore)
            {
                return false;
            }

            if (typeof document !== "undefined")
            {
                if (navigator.cookieEnabled)
                {
                    return true;
                }

            }
            if (String.IsNullOrWhiteSpace(document.cookie))
            {
                try
                {
                    const conteudo = CookieUtil.RetornarConteudoCookie("cookieEnabled", "true", false);
                    document.cookie = conteudo;
                }
                catch
                {
                    console.warn("Cookie desativado");
                }
            }
            return document.cookie.indexOf("cookieEnabled") >= 0;
        }

        private static RetornarDataManterConectado(isManterConectado: boolean)
        {
            const dias = isManterConectado ? CookieUtil.DIAS_EM_CACHE : 1;
            return new Date().AddDays(dias);
        }

    }

    interface LocalStoreCookieItem
    {
        conteudo: string,
        idSessaoLocalStorage: string,
        Expiracao: number,
        /*DataExpiracao: Date| string,*/
    }
}