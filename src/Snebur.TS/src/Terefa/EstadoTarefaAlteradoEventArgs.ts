
namespace Snebur.Tarefa
{
    export class StatusTarefaAlteradoEventArgs extends EventArgs
    {
        public readonly Tarefa: BaseTarefa;
        public readonly Status: EnumStatusTarefa;

        public constructor(tarefa: BaseTarefa, status: EnumStatusTarefa)
        {
            super();

            this.Tarefa = tarefa;
            this.Status = status;

        }
    }
}