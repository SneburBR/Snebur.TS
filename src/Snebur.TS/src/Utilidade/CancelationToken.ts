namespace Snebur
{
    export class CancelationToken
    {
        private _isCanceled: boolean = false;
        private _isComplete: boolean = false;
        public readonly Stopwatch = Stopwatch.StartNew();

        public get IsCanceled()
        {
            return this._isCanceled;
        }

        public get IsCompleted()
        {
            return this._isComplete || this._isCanceled;
        }
        
        public constructor()
        {

        }

        public async WaitForCompletionAsync(timeout: number = 0): Promise<void>
        {
            while(!this._isComplete && !this._isCanceled)
            {
                await ThreadUtil.EsperarAsync(100);
            };
        }

        public Cancel()
        {
            this._isCanceled = true;
        }

        public Complete()
        {
            this._isComplete = true;
        }
    }
}