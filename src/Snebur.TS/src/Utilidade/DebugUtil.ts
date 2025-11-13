namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        /*eslint-disable*/
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                console.error(mensagem);
                DebugUtil.Break(mensagem);
            }
            catch /*eslint-disable*/
            {
            }
        }

        public static Break(mensagem: string): void
        {
            if (Snebur.$Configuracao?.IsDebug)
            {
                debugger;
            }
        } 
    }
}