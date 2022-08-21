namespace Snebur.Utilidade
{
    export class TokenCancelamento
    {
        private _isCancelado: boolean = false;

        public get IsCancelado()
        {
            return this._isCancelado;
        }

        public readonly Stopwatch = Stopwatch.StartNew();

        public constructor()
        {

        }

        public Cancelar()
        {
            this._isCancelado = true;
        }
    }
}