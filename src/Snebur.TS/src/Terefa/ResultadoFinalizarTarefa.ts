namespace Snebur.Tarefa
{
    export class ResultadoTarefaFinalizadaEventArgs extends EventArgs
    {
        public readonly Tarefa: BaseTarefa;
        public readonly Erro: Error;
        public readonly IsCancelada: boolean;
        public UserState: any;

        public constructor(tarefa: BaseTarefa, erro: Error)
        public constructor(tarefa: BaseTarefa, erro: Error, cancelada?: boolean)
        {
            super();

            this.Tarefa = tarefa;
            this.UserState = tarefa.Argumento;
            this.Erro = erro;
            this.IsCancelada = u.ConverterUtil.ParaBoolean(cancelada);
        }
    }
}