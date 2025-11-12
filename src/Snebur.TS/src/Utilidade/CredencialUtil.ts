namespace Snebur.Utilidade
{
    export class CredencialUtil
    {
        public static ValidarCredencial(credencial1: d.ICredencial, credencial2: d.ICredencial): boolean
        {
            if (!CredencialUtil.IdentifidorValido(credencial1, credencial2))
            {
                return false;

            }
            if (credencial1.Senha === credencial2.Senha)
            {
                return true;
            }

            const senha1 = String(credencial1.Senha).trim().toLowerCase();
            const senha2 = String(credencial2.Senha).trim().toLowerCase();

            const senha1Md5 = Md5Util.RetornarHash(senha1);
            const senha2Md5 = Md5Util.RetornarHash(senha2);

            return senha1 === senha2 ||
                senha1 === senha2Md5 ||
                senha1Md5 === senha2 ||
                senha1Md5 === senha2Md5;

        }

        private static IdentifidorValido(credencial1: d.ICredencial, credencial2: d.ICredencial): boolean
        {
            const identificador1 = CredencialUtil.CleanUp(credencial1.IdentificadorUsuario);
            const identificador2 = CredencialUtil.CleanUp(credencial2.IdentificadorUsuario);

            const amigavel1 = credencial1.IdentificadorAmigavel ?? null;
            const amigavel2 = credencial2.IdentificadorAmigavel ?? null;

            return CredencialUtil.EqualsInternal(identificador1, identificador2) ||
                CredencialUtil.EqualsInternal(identificador1, amigavel2) ||
                CredencialUtil.EqualsInternal(amigavel1, identificador1) ||
                CredencialUtil.EqualsInternal(amigavel1, amigavel2);

        }

        private static CleanUp(identificadorUsuario?: string | null): string | null
        {
            if (identificadorUsuario && identificadorUsuario.includes("|"))
            {
                const i = identificadorUsuario.indexOf("|");
                return identificadorUsuario.substring(0, i);
            }
            return identificadorUsuario ?? null;
        }

        private static EqualsInternal(str1: string | null, str2: string | null): boolean
        {
            if (str1 == null || str2 == null)
            {
                return false;
            }
            return str1.trim().toLowerCase() === str2.trim().toLowerCase();
        }

    }
}
