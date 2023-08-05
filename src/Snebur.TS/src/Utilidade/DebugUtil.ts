namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                console.error(mensagem);
                if ($Configuracao.IsDebug)
                {
                    throw new Erro(mensagem);
                }
            }
            catch /*eslint-disable*/
            {
            }
        }
    }
}