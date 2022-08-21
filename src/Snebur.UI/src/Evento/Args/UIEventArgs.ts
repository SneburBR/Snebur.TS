namespace Snebur.UI
{
    export class UIEventArgs extends EventArgs
    {
        public readonly DomEvent: UIEvent;
        public readonly Elemento: HTMLElement;
        public readonly Parametros: DicionarioSimples<any>;

        public constructor(elemento: HTMLElement, parametros: DicionarioSimples<any>, domEvent: UIEvent)
        {
            super();

            this.Elemento = elemento;
            this.Parametros = parametros;
            this.DomEvent = domEvent;
        }
    }
}