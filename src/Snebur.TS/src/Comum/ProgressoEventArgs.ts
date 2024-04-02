namespace Snebur
{
    export class ProgressoEventArgs extends EventArgs
    {
        public readonly Progresso: number;
        public readonly Descricao: string;
        public readonly Total: number;
        public readonly Concluido: number;

        public get ProgressoDecimal(): number
        {
            return (this.Progresso / 100).ToDecimal();
        }

        public constructor(
            progresso: number,
            descricao: string = null,
            total: number = null,
            concluido: number = null)
        {
            super();

            this.Progresso = progresso;
            this.Descricao = descricao;
            this.Total = total;
            this.Concluido = concluido;
        }
    }
}