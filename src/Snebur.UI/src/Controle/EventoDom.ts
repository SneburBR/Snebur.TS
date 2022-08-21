namespace Snebur.UI 
{
    export class EventoDom implements IDisposable
    {
        public NomeEvento: string;
        public Elemento: HTMLElement;
        public Manipulador: EventListener;

        private ManipuladorComBind: EventListener;
        private Opcoes: boolean | AddEventListenerOptions;

        public constructor(objetoBindEvento: any, nomeEvento: string, elemento: HTMLElement, manipulador: EventListener, opcoes: boolean | AddEventListenerOptions = false)
        {
            this.NomeEvento = nomeEvento;
            this.Elemento = elemento;
            this.Manipulador = manipulador;
            this.ManipuladorComBind = manipulador.bind(objetoBindEvento);
            this.Opcoes = opcoes;

            this.Elemento.addEventListener(nomeEvento, this.ManipuladorComBind, this.Opcoes);
        }

        public Dispose(): void
        {
            this.Elemento.removeEventListener(this.NomeEvento, this.ManipuladorComBind, this.Opcoes);
        }
    }
}