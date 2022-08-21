namespace Snebur
{
    export class ProgressoEventArgs extends EventArgs
    {
        public readonly Progresso: number

        public constructor(progresso: number)
        {
            super();

            this.Progresso = progresso;
        }
    }
}