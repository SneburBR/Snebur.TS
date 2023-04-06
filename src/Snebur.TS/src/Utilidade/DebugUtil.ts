namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {

            console.error(mensagem);
            try
            {
                if ($Configuracao.IsDebugOuTeste)
                {
                    console.error("----AS MENSAGEM A SEGUIR TALVEZ NÃO SEJA UM BUG. MAS É NECESSÁRIO SIMULAR PARA DEBUGAR NOVAMENTE A ANALISAR TUDO COM CUIDADO.");
                    throw new Erro(mensagem);
                }
            }
            catch /*eslint-disable*/
            {
            }
        }
    }
}