namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {

            console.error(mensagem);
            try
            {
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