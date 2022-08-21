namespace Snebur.UI
{
    //o elemento será mostrar quando mouse estiver em cima do elemento, o delay poderá ser ajustado
    export class MostrarOcultarElementoDepois extends BaseUIElemento implements IDisposable
    {
        private static TEMPO_PADRAO: number = 300;
        private readonly ElementoMostrar: HTMLElement;
        private readonly TempoMostrar: number;
        private readonly TempoOcultar: number;

        private IdentificadorTimeoutMostrar: number;
        private IdentificadorTimeoutOcultar: number;
        private IdentificadorTimeoutOcultarTransacao: number;

        private IsUsarOpacidade: boolean = true;

        private readonly EventoElementoMostrado = new Evento<MostrarOcultarElementoEventArgs>(this);
        private readonly EventoElementoOcultado = new Evento<MostrarOcultarElementoEventArgs>(this);
        public FuncaoIsPodeMostrarElemento: () => boolean;

        //public constructor(controlePai: BaseControle, elementoMostrar: HTMLElement, tempoMostrar: number, tempoOcultar: number)
        public constructor(controlePai: BaseControle, elementoMostrar: HTMLElement,
            isControlePaiElementoAlvo: boolean = true,
            tempoMostrar: number = MostrarOcultarElementoDepois.TEMPO_PADRAO,
            tempoOcultar: number = MostrarOcultarElementoDepois.TEMPO_PADRAO)
        {

            super(controlePai, controlePai.Elemento);

            this.ElementoMostrar = elementoMostrar;

            this.TempoMostrar = tempoMostrar;
            this.TempoOcultar = tempoMostrar;

            this.ElementoMostrar.OcultarElemento();
            this.ElementoMostrar.style.opacity = "0";

            if (isControlePaiElementoAlvo)
            {
                this.AdicionarEventoAlvo(this.Elemento);
            }
        }

        public AdicionarEventoAlvo(elementoAlvo: HTMLElement): void
        {
            this.AdicionarEventoDom(ui.EnumEventoDom.MouseEnter, this.Elemento_MouseEnter, elementoAlvo);
            this.AdicionarEventoDom(ui.EnumEventoDom.MouseLeave, this.Elemento_MouseLeave, elementoAlvo);
        }

        public RemoverEventoAlvo(elementoAlvo: HTMLElement): void
        {
            this.RemoverEventoDom(ui.EnumEventoDom.MouseEnter, this.Elemento_MouseEnter, elementoAlvo);
            this.RemoverEventoDom(ui.EnumEventoDom.MouseLeave, this.Elemento_MouseLeave, elementoAlvo);
        }

        private Elemento_MouseEnter(e: MouseEvent): void
        {
            clearTimeout(this.IdentificadorTimeoutOcultar);
            clearTimeout(this.IdentificadorTimeoutOcultarTransacao);
            this.IdentificadorTimeoutMostrar = setTimeout(this.Mostrar.bind(this), this.TempoMostrar);
        }

        private Elemento_MouseLeave(e: MouseEvent): void
        {
            clearTimeout(this.IdentificadorTimeoutMostrar);
            clearTimeout(this.IdentificadorTimeoutOcultarTransacao);
            this.IdentificadorTimeoutOcultar = setTimeout(this.Ocultar.bind(this), this.TempoOcultar);
        }


        private Mostrar(): void
        {
            if (!this.FuncaoIsPodeMostrarElemento || this.FuncaoIsPodeMostrarElemento())
            {
                //console.log("mostrar");
                this.ElementoMostrar.MostrarElemento();
                this.ElementoMostrar.style.opacity = "1";
                this.ElementoMostrar.style.transition = "opacity 0.3s ease-out";
                this.EventoElementoMostrado.Notificar(this, new MostrarOcultarElementoEventArgs(this.Elemento, true));

            }
        }

        private Ocultar(): void
        {
            //this.ElementoMostrar.OcultarElemento();
            this.ElementoMostrar.style.opacity = "0";
            this.ElementoMostrar.style.transition = "opacity .3s ease-in";
            this.EventoElementoMostrado.Notificar(this, new MostrarOcultarElementoEventArgs(this.Elemento, false));
            this.IdentificadorTimeoutOcultarTransacao = setTimeout(this.Ocultar_Transacao.bind(this), MostrarOcultarElementoDepois.TEMPO_PADRAO);
        }

        private Ocultar_Transacao(): void
        {
            this.ElementoMostrar.OcultarElemento();
        }

        public Disose(): void
        {
            super.Dispose();

            clearTimeout(this.IdentificadorTimeoutMostrar);
            clearTimeout(this.IdentificadorTimeoutOcultar);
            clearTimeout(this.IdentificadorTimeoutOcultarTransacao);
        }
    }

    export class MostrarOcultarElementoEventArgs extends EventArgs
    {
        public readonly Elemento: HTMLElement;
        public readonly IsMostrado: boolean

        public constructor(elemento: HTMLElement, isMostrado: boolean)
        {
            super();
            this.Elemento = elemento;
            this.IsMostrado = isMostrado;
        }
    }

}