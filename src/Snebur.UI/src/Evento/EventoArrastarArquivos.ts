namespace Snebur.UI
{
    export class EventoArrastarArquivos extends EventoControleHandler
    {
        private __CallbackElementoSelecionar_Change: EventListener;
        private __CallbackElemento_DragOver: EventListener;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.ArrastarArquivos, "drop");
            this.__CallbackElemento_DragOver = this.Elemento_DragOver.bind(this);
            this.AdicionarEventosDom();
        }

        public override ManipuladorkEventListenerDom(domEvent: DragEvent): void
        {
            domEvent.preventDefault();
            const arquivos = domEvent.dataTransfer.files;
            if (arquivos.length)
            {
                const zyonBlobs = SelecionarArquivosUtil.RetornarSnBlobs(arquivos);
                this.Manipulador(this.ControlePai, new SelecionarArquivosEventoArgs(/*this.Elemento, this.RetornarParametros(), domEvent,*/ zyonBlobs));
            }
        }

        private AdicionarEventosDom(): void
        {
            this.Elemento.addEventListener("dragover", this.__CallbackElemento_DragOver);
        }

        private RemoverEventosDom(): void
        {
            this.Elemento.removeEventListener("dragover", this.__CallbackElemento_DragOver);
        }

        private Elemento_DragOver(e: DragEvent): void
        {
            e.preventDefault();
        }
        //#region IDisposable

        public override Dispose(): void
        {
            this.RemoverEventosDom();
            super.Dispose();
        }
        //#endregion
    }
}