namespace Snebur.Utilidade
{
    export class DebugUtil
    {

        private static __isPodeDesocuparUI: boolean = true;
         
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                console.error(mensagem);
                if (Snebur.$Configuracao?.IsDebug)
                {
                    throw new Erro(mensagem);
                }
            }
            catch /*eslint-disable*/
            {
            }
        }

        public static Break(): void
        {
            if (Snebur.$Configuracao?.IsDebug)
            {
                debugger;
            }
        }

        public static get IsPodeDesocuparUI(): boolean
        {
            if ($Configuracao.IsProducao)
                return true;
            return this.__isPodeDesocuparUI;
        }

        public static PermitirDesocuparUI(): void
        {
            this.__isPodeDesocuparUI = true;
        }

        public static ProibirDesocuparUI(): void
        {
            this.__isPodeDesocuparUI = false;
        }
    }

}