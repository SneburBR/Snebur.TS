namespace Snebur.UI
{
    /*@internal*/
    export class UILockManager 
    {
        private static _locked: boolean = false;

        public static get CanRelease(): boolean
        {
            if ($Configuracao.IsProducao)
                return true;
            return !this._locked;
        }

        public static AllowRelease(): void
        {
            this._locked = false;
        }

        public static PreventRelease(): void
        {
            this._locked = true;
        }
    }
}
