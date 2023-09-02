namespace Snebur.UI
{
    export class OrdenacaoColunaAlteradaEventArgs extends UIEventArgs
    {
        public readonly Coluna: ColunaTexto;

        public constructor(
            coluna: ColunaTexto,
            elemento: HTMLElement,
            parametros: DicionarioSimples<any>,
            domEvent: UIEvent)
        {
            super(elemento, parametros, domEvent);
            this.Coluna = coluna;
        }
    }
}
