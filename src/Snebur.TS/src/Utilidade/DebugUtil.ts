namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        private static lastBreak: number;
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
                const time = Date.now() - DebugUtil.lastBreak;
                if (time < 1000)
                    return;

                DebugUtil.lastBreak = Date.now();
                debugger;
            }
        }
    }
}