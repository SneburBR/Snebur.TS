namespace Snebur
{
    export class ProgressoEventArgs extends EventArgs
    {
        public readonly Progresso: number
        public readonly Descricao:string

        public constructor(progresso: number, descricao:string = null)
        {
            super();

            this.Progresso = progresso;
            this.Descricao = descricao;
        }
    }
}