namespace Snebur.UI 
{
    export class EventoDom implements IDisposable
    {
        public readonly NomeEvento: string;
        public readonly Elemento: HTMLElement;
        public readonly Manipulador: EventListener;
        private readonly ManipuladorComBind: EventListener;
        private readonly Opcoes: boolean | AddEventListenerOptions;

        private readonly __ManipuladorInterno: EventListener;

        public constructor(
            objetoBindEvento: any,
            nomeEvento: string,
            elemento: HTMLElement,
            manipulador: EventListener,
            opcoes: boolean | AddEventListenerOptions = false)
        {
            this.NomeEvento = nomeEvento;
            this.Elemento = elemento;
            this.Manipulador = manipulador;
            this.ManipuladorComBind = manipulador.bind(objetoBindEvento);
            this.Opcoes = opcoes;

            this.__ManipuladorInterno = this.ManipuladorInterno.bind(this);
            this.Elemento.addEventListener(nomeEvento, this.__ManipuladorInterno, this.Opcoes);
        }

        private ManipuladorInterno(e: UIEvent)
        {
            if (ui.DebugUIUtil.IsDebugAtivado(e))
            {
                return;
            }
            this.ManipuladorComBind(e);
        }

        public Dispose(): void
        {
            this.Elemento.removeEventListener(this.NomeEvento, this.__ManipuladorInterno, this.Opcoes);
        }
    }
}