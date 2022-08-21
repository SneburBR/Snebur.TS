namespace Snebur
{
   export class ResultadoEventArgsT<TResutlado> extends EventArgs implements IResultadoEventArgs
    {
        private _resultado: TResutlado;

        public get Resultado(): TResutlado
        {
            return this._resultado;
        }

        public constructor(resultado: TResutlado)
        {
            super();
            this._resultado = resultado;
        }
    }
}

