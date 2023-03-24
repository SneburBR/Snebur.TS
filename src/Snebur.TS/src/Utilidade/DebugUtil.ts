namespace Snebur.Utilidade
{
    export class DebugUtil
    {
        public static ThrowAndContinue(mensagem: string)
        {
            try
            {
                throw new Erro(mensagem);
            }
            catch (err)
            {
                console.error(err);
            }
        }
    }
}