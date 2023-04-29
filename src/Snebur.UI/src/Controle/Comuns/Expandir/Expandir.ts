namespace Snebur.UI
{
    export class Expandir extends BaseControle
    {
        public ExpandirTitulo: ExpandirTitulo;
        public ExpandirConteudo: ExpandirConteudo;
        public IsExpandoPrimeiraVez: boolean;

        public IconeExpandir: EnumIcone;
        public IconeEncolher: EnumIcone;
        private AlturaConteudoExpandir: number;

        public TamanhoIcone: EnumTamanhoIcone

        public Status: EnumStatusConteudoExpandir = EnumStatusConteudoExpandir.Encolhido;

        public readonly EventoConteudoExpandido = new Evento<ConteudoExpandidoEventArgs>(this);

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.EventoDataSourceAlterado.AddHandler(this.ControleExpandir_DataSourceAlterado, this);
            this.AdicionarManipuladorPropriedadeAlterada(x => x.TamanhoIcone, this.TamanhoIcone_ValorAlterado, this);
        }
        private ControleExpandir_DataSourceAlterado(provedor: any, e: EventArgs)
        {
            this.ExpandirTitulo.DataSource = this.DataSource;
            this.ExpandirConteudo.DataSource = this.DataSource;
            this.AtualizarAlturaConteudoExpandir();
            this.EncolherElemento(this.ExpandirConteudo.Elemento);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            const valorAtributo = this.RetornarValorAtributo(AtributosHtml.BindDataSource);
            if (String.IsNullOrEmpty(valorAtributo))
            {
                this.Elemento.setAttribute(AtributosHtml.BindDataSource.Nome, "{{.}}");
            }
        }
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.ExpandirTitulo = this.ControlesFilho.OfType<ExpandirTitulo>(ExpandirTitulo).SingleOrDefault();
            this.ExpandirConteudo = this.ControlesFilho.OfType<ExpandirConteudo>(ExpandirConteudo).SingleOrDefault();

            this.IconeExpandir = this.RetornarValorAtributoEnum(EnumIcone, AtributosHtml.IconeExpandir, EnumIcone.Add);
            this.IconeEncolher = this.RetornarValorAtributoEnum(EnumIcone, AtributosHtml.IconeEncolher, EnumIcone.Remove);

            if (!(this.ExpandirTitulo instanceof ExpandirTitulo))
            {
                throw new Erro("A elemento expandir titulo não foi econtrado");
            }

            this.ExpandirTitulo.BotaoIcone.Icone = this.IconeExpandir;
            this.AdicionarEventoDom(EnumEventoDom.Click, this.ExpandirTitulo_Click, this.ExpandirTitulo.Elemento);
        }

        private AtualizarAlturaConteudoExpandir(): void
        {
            this.ExpandirConteudo.Elemento.style.transition = "";
            this.ExpandirConteudo.Elemento.style.height = "auto";

            this.AlturaConteudoExpandir = parseInt(this.ExpandirConteudo.Elemento.RetornarValorEstiloComputado(x => x.height));

            if (this.AlturaConteudoExpandir > 0)
            {
                this.ExpandirConteudo.Elemento.style.height = "0";
                this.ExpandirConteudo.Elemento.style.transition = "height .25s";
            }
        }

        private ExpandirTitulo_Click(e: MouseEvent): void
        {
            const isPrimeiraVez = !this.IsExpandoPrimeiraVez;
            if (this.Status === EnumStatusConteudoExpandir.Expandido)
            {
                this.Elemento.classList.add("sn-expandido");
                this.EncolherElemento(this.ExpandirConteudo.Elemento);
                this.Status = EnumStatusConteudoExpandir.Encolhido;

                this.ExpandirTitulo.BotaoIcone.Icone = this.IconeExpandir;
                this.IsExpandoPrimeiraVez = true;
            }
            else
            {
                this.Elemento.classList.remove("sn-expandido");
                this.ExpandirElemento(this.ExpandirConteudo.Elemento);
                this.ExpandirTitulo.BotaoIcone.Icone = this.IconeEncolher;
                this.Status = EnumStatusConteudoExpandir.Expandido;
            }
            this.EventoConteudoExpandido.Notificar(this, new ConteudoExpandidoEventArgs(isPrimeiraVez, this.Status));
        }
        private ExpandirElemento(elemento: HTMLElement): any
        {
            if (this.AlturaConteudoExpandir > 0)
            {
                elemento.style.height = this.AlturaConteudoExpandir.ToPixels();
            }
            else
            {
                elemento.MostrarElemento();
            }
        }

        private EncolherElemento(elemento: HTMLElement): any
        {
            if (this.AlturaConteudoExpandir > 0)
            {
                elemento.style.height = "0";
            }
            else
            {
                elemento.OcultarElemento();
            }
        }

        private TamanhoIcone_ValorAlterado(e: PropriedadeAlteradaEventArgs)
        {
            if (EnumUtil.IsDefindo(EnumIcone, e.NovoValor))
            {
                this.ExpandirTitulo.TamanhoIcone = e.NovoValor;
            }
        }
    }

    export enum EnumStatusConteudoExpandir
    {
        Expandido = 1,
        Encolhido = 2
    }

    export class ConteudoExpandidoEventArgs extends EventArgs
    {
        public readonly IsPrimeiraVez: boolean
        public readonly Status: EnumStatusConteudoExpandir;

        public constructor(isPrimeiraVez: boolean, status: EnumStatusConteudoExpandir)
        {
            super();
            this.IsPrimeiraVez = isPrimeiraVez;
            this.Status = status;
        }

    }


    export class ExpandirMapeamento extends ComponenteApresentacaoMapeamento<Expandir>
    {
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Mapear(x => x.TamanhoIcone, new PropriedadeTamanhoIcone());

        }
    }

}