namespace Snebur.UI
{
    export class BarraEnvioArquivos extends Snebur.UI.BaseControle
    {

        //private readonly ElementoProgressoRestante: HTMLDivElement;
        private readonly ElementoProgressoEnvioArquivos: HTMLDivElement;
        private readonly TempoAtualizarProgresso = TimeSpan.FromSeconds(0.3);

        public get ViewModel(): BarraEnvioArquivosViewModel
        {
            return this.DataSource as BarraEnvioArquivosViewModel;
        }

        public AtualizarProgressoDepois = new ExecutarDepois(this.AtualizarProgresso.bind(this), this.TempoAtualizarProgresso);

        //#region Construtor e inicializador

        public constructor(controlePai: Snebur.UI.BaseControle)
        {
            super(controlePai, null);
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
            this.CssClasseControle = "sn-barra-envio-arquivos";
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();

            //this.ElementoProgressoEnvioArquivos.style.width = "20%";
            //this.ElementoProgressoRestante.style.width = "20%";


            this.OcultarBarraEnvioArquivos();

        }

        protected override  RetornarElementoDestino(): HTMLElement
        {
            return document.body;
        }

        protected override  RetornarTagNovoElemento(): string
        {
            return "sn-barra-envio-arquivo";
        }

        public Controle_Carregado(provedor: any, e: EventArgs) 
        {
            $Aplicacao.GerenciadorServioArquivoPadrao.EventoProgresso.AddHandler(this.Gerenciador_ProgressoAlterado, this);
            $Aplicacao.GerenciadorServioArquivoPadrao.EventoEstadoAlterado.AddHandler(this.GerenviadorEnvioArquivo_EstadoAlterado, this);

            this.DataSource = new BarraEnvioArquivosViewModel();
        }

        //#endregion



        //#region Eventos gerenciador envio de arquivos

        private GerenviadorEnvioArquivo_EstadoAlterado(gerenciador: sa.GerenciadorEnvioArquivo, e: t.EstadoTarefaAlteradoEventArgs): void
        {
            if (e.Estado === t.EnumEstadoTarefa.Finalizada)
            {
                this.OcultarBarraEnvioArquivos();
            }
        }

        private Gerenciador_ProgressoAlterado(provedor: any, e: t.ProgressoGerenciadorTarefaEventArgs)
        {
            this.AtualizarProgressoDepois.Executar(e);
        }

        private AtualizarProgresso(e: sa.ProgressoGerenciadorEnvioArquivoEventArgs): void
        {
            const progresso = u.FormatacaoUtil.FormatarPorcentagem(e.Progresso);
            /*let progressoRestante = u.FormatacaoUtil.FormatarPorcentagem(100 - e.Progresso);*/

            this.ElementoProgressoEnvioArquivos.style.width = progresso;
            //this.ElementoProgressoRestante.style.width = progressoRestante;

            if (e.Progresso > 0 && !e.IsFinalizado)
            {
                const velocidadeFormatada = FormatacaoUtil.Formatar(e.VelocidadeMedia, EnumFormatacao.Bytes);
                this.Legenda = `Progresso ${progresso}, Enviando ${e.TotalEnviando}, Fila: ${e.TotalFila}, Velocidade: ${velocidadeFormatada}`;
                this.MostrarBarraMonitorEnvioArquivos();
            }
            else
            {
                this.Legenda = String.Empty;
                this.OcultarBarraEnvioArquivos();
            }
        }


        //#endregion

        //#region Ocultar e mostrar envio

        public MostrarBarraMonitorEnvioArquivos(): void
        {
            this.MostrarElemento();
        }

        public OcultarBarraEnvioArquivos(): void
        {
            this.OcultarElemento();
        }

        //#endregion

        //#region Legenda

        public override  MostrarLegenda()
        {
            super.MostrarLegenda();
        }

        protected override  AtualizarPosicaoElementoLegenta()
        {
            const posicoes = this.Elemento.getBoundingClientRect();

            const x = posicoes.left + ((posicoes.width - this.ElementoLegenda.clientWidth) / 2);

            this.ElementoLegenda.style.left = x.ToPixels();
            this.ElementoLegenda.style.top = (posicoes.top + posicoes.height + 5).ToPixels();
        }

        //#endregion



    }
}