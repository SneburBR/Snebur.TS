
namespace Snebur.Tarefa
{
    export class EstadoTarefaAlteradoEventArgs extends EventArgs
    {
        public readonly Tarefa: BaseTarefa;
        public readonly Estado: EnumEstadoTarefa;

        public constructor(tarefa: BaseTarefa, estado: EnumEstadoTarefa)
        {
            super();

            this.Tarefa = tarefa;
            this.Estado = estado;

        }
    }
}