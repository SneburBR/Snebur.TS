
namespace Snebur.Tarefa
{
    export class ErroTarefas extends Erro
    {
        public Tarefas: Array<BaseTarefa>;

        public constructor(tarefas: Array<BaseTarefa>, origem: any)
        {
            super(`${tarefas.length.toString()}  tarefas ocorreram erros`, origem);
            this.Tarefas = tarefas;
        }
    }
}