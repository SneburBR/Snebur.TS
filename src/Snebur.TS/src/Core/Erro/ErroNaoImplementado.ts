namespace Snebur
{
    export class ErroNaoImplementado extends Snebur.Erro
    {
        public constructor(origem?: any)
        {
            super("Não implementado", origem, null);
        }
    }
}