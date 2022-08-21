namespace Snebur.UI
{
	export class ValidoEventArgs extends EventArgs
	{
        public readonly IsValido: boolean;

        public constructor(isValido: boolean)
        {
            super();
            this.IsValido = isValido;
        }
	}
}
