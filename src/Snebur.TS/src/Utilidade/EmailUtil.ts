namespace Snebur.Utilidade
{
    export class EmailUtil
    {
        private static readonly DOMINIO_HOTMAIL = "hotmail.com";
        private static readonly DOMINIO_GMAIL = "gmail.com";

        private static DominiosIncorretosHotmail = [
            "hotmaill.com",
            "hotmalil.com",
            "hotmial.com",
            "hotmial.com",
            "hotmal.com",
            "htomal.com"
        ];

        private static DominiosIncorretosGmail = [
            "gmail.com.br",
            "gmal.com",
            "gmaill.com",
            "gaiml.com",
            "gmial.com"
        ];

        /**
         * Retornar um tuble true ou false mais
         * Ex hotmaill.com   return [true, "hotmail.com"]
         *    gmial.com   return [true, "gmail.com"]
         * @param dominio
         */
        public static IsDominioDigitadoErrado(dominio: string): [boolean, string]
        public static IsDominioDigitadoErrado(dominio: string, isValidar: true): boolean
        public static IsDominioDigitadoErrado(dominio: string, isValidar: false): never
        public static IsDominioDigitadoErrado(dominio: string, isValidar: boolean = false): [boolean, string] | boolean
        {
            const [isDigitouErrado, dominioCorreto] = EmailUtil.IsDominioDigitadoErradoInterno(dominio);
            if (typeof isValidar === "boolean" && isValidar)
            {
                return isDigitouErrado;
            }
            return [isDigitouErrado, dominioCorreto];
        }

        public static RetornarDominio(email: string, ignorarErro:boolean = false): string
        {
            const ultimaPosicao = email?.lastIndexOf("@");
            if (ultimaPosicao >= 0)
            {
                return email.substring(ultimaPosicao + 1).trim();
            }

            if (ignorarErro)
            {
                return null;
            }

            throw new Erro(email + " não é um email valido");
        }
         
        private static IsDominioDigitadoErradoInterno(dominio: string): [boolean, string]
        {
            if (EmailUtil.DominiosIncorretosHotmail.Contains(dominio))
            {
                return [true, EmailUtil.DOMINIO_HOTMAIL];
            }

            if (EmailUtil.DominiosIncorretosGmail.Contains(dominio))
            {
                return [true, EmailUtil.DOMINIO_GMAIL];
            }
            return [false, null];
        }
    }
}