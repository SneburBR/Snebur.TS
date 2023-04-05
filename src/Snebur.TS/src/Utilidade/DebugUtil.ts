namespace Snebur
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
            /*eslint-disable*/
            catch 
            {

            }
        }
    }
}