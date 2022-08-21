namespace Snebur.UI
{
    export class ValidarControlesFormulario implements IDisposable
    {
        private readonly Controles: Array<BaseControleFormulario>;

        public constructor(controles: Array<BaseControleFormulario>)
        {
            this.Controles = controles;
        }

        public async ValidarAsync(): Promise<[boolean, BaseControleFormulario]>
        {

            let isValido = true;
            let controleInvalido: BaseControleFormulario = null;
            for (const controle of this.Controles)
            {
                const isValidoTemp = await controle.ValidarAsync(true);
                if (!isValidoTemp)
                {
                    isValido = false;
                    controleInvalido = controle;
                    break;
                }
            }
            return [isValido, controleInvalido];

        }

        //#region IDisposable

        public Dispose(): void
        {
            this.Controles.Clear();
            delete (this as any).Controles;
        }

        //#endregion
    }
}