namespace Snebur
{
    export class Stopwatch
    {
        private _isRunning: boolean
        private Inicio: number;
        private Fim: number;

        public get IsRunning(): boolean
        {
            return this._isRunning;
        }

        public get Elapsed(): TimeSpan
        {
            return new TimeSpan(this.ElapsedMilliseconds);
        }

        public get ElapsedMilliseconds(): number
        {
            if (this._isRunning)
            {
                return Date.now() - this.Inicio;
            }
            if (this.Fim > 0 && this.Inicio > 0 &&
                this.Fim > this.Inicio)
            {
                return this.Fim - this.Inicio;
            }
            return 0;
        }

        public get TotalSeconds(): number
        {
            return (this.ElapsedMilliseconds / 1000);
        }

        public get TotalMinutes(): number
        {
            return (this.ElapsedMilliseconds / 1000 / 60);
        }

        public constructor()
        {

        }


        public Start(): void
        {
            this.Inicio = Date.now();
            this._isRunning = true;
            this.Fim = 0;
        }

        public Stop(): void
        {
            if (this._isRunning)
            {
                this.Fim = Date.now();
                this._isRunning = false;
            }
        }

        public Reset()
        {
            this.Start();
        }

        public static StartNew(): Stopwatch
        {
            const stop = new Stopwatch();
            stop.Start();
            return stop;
        }
    }
}
