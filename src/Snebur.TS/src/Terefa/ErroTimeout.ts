namespace Snebur.Tarefa
{
    export class ErroTimeout extends Erro
    {
        public constructor(mensagem: string, origem: any)
        {
            super(mensagem, origem);
        }
    }
}