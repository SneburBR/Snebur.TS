namespace Snebur.UI
{
    export class EventoNavegar extends UIEvento
    {
        public readonly CaminhoPagina: string;
        //private ConstrutorPagina: IPaginaConstrutor;
        public readonly CaminhoNavegador: string;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento, AtributosHtml.Navegar, "click");

            this.CaminhoPagina = this.ValorAtributo;
            this.CaminhoNavegador = this.RetornarValorAtributo(AtributosHtml.IdentificadorNavegador, null);

            if (elemento instanceof HTMLAnchorElement)
            {
                (elemento as HTMLAnchorElement).href = this.RetornarHref();
            }
        }

        protected override RetornarElementoDomEvento(elemento: HTMLElement): HTMLElement
        {
            if (this.ControlePai instanceof Botao && this.ControlePai.ElementoLink != null)
            {
                return this.ControlePai.ElementoLink;
            }
            return elemento;
        }

        public ManipuladorkEventListenerDom(domEvent: UIEvent)
        {
            const navegador = this.RetornarNavegador();
            const construtorPagina = PaginaUtil.RetornarConstrutorPagina(this.ControlePai, this.CaminhoPagina);
            const parametros = this.RetornarParametros();
            navegador.Navegar(construtorPagina, parametros);
        }
        //#region Métodos privados

        public RetornarNavegador(): BaseNavegador 
        {
            if (!String.IsNullOrWhiteSpace(this.CaminhoNavegador))
            {
                return $Aplicacao.DocumentoPrincipal.RetornarNavegador(this.CaminhoNavegador);
            }
            return $Aplicacao.DocumentoPrincipal.RetornarNavegadorPrincipal();
        }

        private RetornarHref(): string
        {
            return "javascript:void(0)";
        }
    }
}