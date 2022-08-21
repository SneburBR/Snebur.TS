namespace Snebur.UI
{
    //se alterar essas constantes precisam ser atualizadas dentro _telas.variaveis.scss
    const LIMITE_CELULAR: number = 612;
    const LIMITE_TABLET: number = 1024;
    const LIMITE_NOTEBOOK: number = 1440;
    const LIMITE_ALTURA_SUPER_PEQUENA: number = 512;
    const LIMITE_ALTURA_PEQUENA: number = 712;
    const LIMITE_ALTURA_MEDIA: number = 850;

    export class TelaUtil
    {
        private static IsGerenciadorInicializado: boolean = false;
        private static Gerenciador: GerenciadorTela

        public static readonly EventoTelaAlterada = new Evento<TelaAlteradaEventArgs>(TelaUtil.Gerenciador);

        public static get TelaAtual(): EnumTela
        {
            if (!TelaUtil.IsGerenciadorInicializado)
            {
                TelaUtil.InicializarGerenciador();
            }
            return TelaUtil.Gerenciador.TelaAtual;
        }

        public static get IsCelular(): boolean
        {
            return TelaUtil.TelaAtual === EnumTela.Celular;
        }

        public static get IsCelularOuTablet(): boolean
        {
            return TelaUtil.TelaAtual === EnumTela.Celular ||
                TelaUtil.TelaAtual === EnumTela.Tablet;
        }

        public static get IsDesktop(): boolean
        {
            return TelaUtil.TelaAtual === EnumTela.Notebook ||
                TelaUtil.TelaAtual === EnumTela.Desktop;
        }

        public static get TelaAlturaAtual(): EnumTelaAltura
        {
            if (!TelaUtil.IsGerenciadorInicializado)
            {
                TelaUtil.InicializarGerenciador();
            }
            return TelaUtil.Gerenciador.TelaAlturaAtual;
        }

        private static InicializarGerenciador(): void
        {
            TelaUtil.Gerenciador = new GerenciadorTela();
            TelaUtil.Gerenciador.EventoTelaAlterada.AddHandler(TelaUtil.Gerenciador_TelaAlterada, this);
            TelaUtil.IsGerenciadorInicializado = true;
        }

        private static Gerenciador_TelaAlterada(provedor: any, e: TelaAlteradaEventArgs): void
        {
            TelaUtil.EventoTelaAlterada.Notificar(TelaUtil.Gerenciador, e);
        }

        public static get DimensaoBarraRolagem()
        {
            return TelaUtil.TelaAtual === EnumTela.Celular ? 7 : 17;
        }
    }

    class GerenciadorTela
    {
        private _telaAtual: EnumTela;
        private _telaAlturaAtual: EnumTelaAltura;

        private readonly TEMPO_DEPOIS_NOTIFICAR_TELA_ALTERADA: number = 300;

        public get TelaAtual(): EnumTela
        {
            return this._telaAtual;
        }

        public get TelaAlturaAtual(): EnumTelaAltura
        {
            return this._telaAlturaAtual;
        }

        public readonly EventoTelaAlterada = new Evento(this);
        private readonly ExecutarDepois = new ExecutarDepois(this.NotificarTelaAlteradaDepois.bind(this), this.TEMPO_DEPOIS_NOTIFICAR_TELA_ALTERADA);

        public constructor()
        {
            window.addEventListener("resize", this.Window_Resize.bind(this));
            this._telaAtual = this.RetornarTelaAtual();
            this._telaAlturaAtual = this.RetornaerTelaAlturaAtual();
        }

        private Window_Resize(e: UIEvent): void
        {
            this.ExecutarDepois.Executar();
        }

        private NotificarTelaAlteradaDepois()
        {
            this._telaAtual = this.RetornarTelaAtual();
            this._telaAlturaAtual = this.RetornaerTelaAlturaAtual();

            const args = new TelaAlteradaEventArgs(this._telaAtual);
            this.EventoTelaAlterada.Notificar(this, args);
        }

        private RetornarTelaAtual(): EnumTela
        {
            if (window.innerWidth <= LIMITE_CELULAR)
            {
                return EnumTela.Celular;
            }

            if (window.innerWidth < LIMITE_TABLET)
            {
                return EnumTela.Tablet;
            }

            if (window.innerWidth < LIMITE_NOTEBOOK)
            {
                return EnumTela.Notebook;
            }

            return EnumTela.Desktop;
        }

        private RetornaerTelaAlturaAtual(): EnumTelaAltura
        {
            if (window.innerHeight <= LIMITE_ALTURA_SUPER_PEQUENA)
            {
                return EnumTelaAltura.SuperPequena;
            }


            if (window.innerHeight <= LIMITE_ALTURA_PEQUENA)
            {
                return EnumTelaAltura.Pequena;
            }

            if (window.innerHeight < LIMITE_ALTURA_MEDIA)
            {
                return EnumTelaAltura.Media;
            }
            return EnumTelaAltura.Grande;
        }
    }

    export class TelaAlteradaEventArgs extends EventArgs
    {
        public Tela: EnumTela

        public constructor(tela: EnumTela)
        {
            super();
            this.Tela = tela;
        }
    }

    export enum EnumTela
    {
        Celular = 1,
        Tablet = 2,
        Notebook = 3,
        Desktop = 4
    }

    export enum EnumTelaAltura
    {
        SuperPequena = 1,
        Pequena = 2,
        Media = 3,
        Grande = 4
    }
}
