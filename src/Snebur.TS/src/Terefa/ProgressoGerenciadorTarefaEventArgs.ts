namespace Snebur.Tarefa
{
    export class ProgressoGerenciadorTarefaEventArgs extends Snebur.ProgressoEventArgs
    {
        public readonly IsFinalizado: boolean;
        public readonly TotalFila: number;
        public readonly TotalEnviando: number;

        public constructor(progresso: number, totalFila: number, totalEnviando: number)
        {
            super(progresso);

            this.TotalFila = totalFila;
            this.TotalEnviando = totalEnviando;
            this.IsFinalizado = this.TotalFila === 0 && this.TotalEnviando === 0;
        }
    }
}
