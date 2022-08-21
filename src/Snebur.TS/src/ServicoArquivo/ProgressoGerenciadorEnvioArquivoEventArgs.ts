namespace Snebur.ServicoArquivo
{
    export class ProgressoGerenciadorEnvioArquivoEventArgs extends Snebur.Tarefa.ProgressoGerenciadorTarefaEventArgs
    {
        public readonly VelocidadeMedia: number;

        public constructor(progresso: number, totalFila: number, totalEnviando: number, velocidadeMedia: number)
        {
            super(progresso, totalFila, totalEnviando);

            this.VelocidadeMedia = velocidadeMedia;
        }
    }
}
