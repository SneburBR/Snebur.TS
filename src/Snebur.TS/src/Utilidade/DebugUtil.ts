namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                if ($Configuracao.IsDebug)
                {
                    console.error(mensagem);
                    throw new Erro(mensagem);
                }
                console.warn(mensagem);
            }
            catch /*eslint-disable*/
            {
            }
        }
    }
}