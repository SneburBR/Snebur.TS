namespace Snebur.UI
{
    export abstract class UIEvento extends BaseUIElemento implements IDisposable
    {
        public AtributoHtml: AtributoHtml;
        public ValorAtributo: string;
        public NomeEventoDom: string;
        // public CallbackEventListener: EventListener;
        private __CallbackEventListenerInterno: EventListener;

        public constructor(controlePai: BaseControle, elemento: HTMLElement,
            atributo: AtributoHtml,
            nomeEventoDom: string)
        {
            super(controlePai, elemento);

            this.AtributoHtml = atributo;
            this.ValorAtributo = elemento.getAttribute(atributo.Nome);
            this.NomeEventoDom = this.RetornarNomeEventoDom(nomeEventoDom);

            if (String.IsNullOrWhiteSpace(this.ValorAtributo))
            {
                throw new ErroNaoDefinido(`O valor do atributo ${atributo.Nome} não foi definido  em ${this.ControleApresentacao.___NomeConstrutor}`, this);
            }
            //link <a href=""
            if (elemento instanceof HTMLAnchorElement && String.IsNullOrEmpty(elemento.href))
            {
                elemento.href = "javascript:void;";
            }
            if (!String.IsNullOrWhiteSpace(this.NomeEventoDom))
            {
                this.__CallbackEventListenerInterno = this.ManipuladorkEventListenerDomInterno.bind(this);
                const elementoEvento = this.RetornarElementoDomEvento(elemento);
                if (elementoEvento instanceof HTMLElement && this.ArramarManipuladorDom(elementoEvento))
                {
                    elementoEvento.addEventListener(this.NomeEventoDom, this.__CallbackEventListenerInterno, false);
                }
            }
        }

        protected RetornarNomeEventoDom(nomeEventoDom: string): string
        {
            return nomeEventoDom;
        }

        protected RetornarElementoDomEvento(elemento: HTMLElement): HTMLElement
        {
            return elemento;
        }

        protected ArramarManipuladorDom(elementoEvento: HTMLElement): boolean
        {
            return true;
        }

        private ManipuladorkEventListenerDomInterno(e: UIEvent): void
        {
            if (!this.ControlePai.IsDesabilitado)
            {
                this.ManipuladorkEventListenerDom(e);
            }
        }

        protected abstract ManipuladorkEventListenerDom(e: UIEvent): void;

        

        //#region IDisposable 

        public override Dispose()
        {
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                if (!String.IsNullOrEmpty(this.NomeEventoDom))
                {
                    elemento.removeEventListener(this.NomeEventoDom, this.__CallbackEventListenerInterno, false);
                }
            }
            //delete (elemento as any);
            super.Dispose();
        }
        //#endregion
    }
}