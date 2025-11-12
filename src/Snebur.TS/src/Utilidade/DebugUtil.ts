namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                console.error(mensagem);
                if (Snebur.$Configuracao?.IsDebug)
                {
                    DebugUtil.Break();
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
    }
}