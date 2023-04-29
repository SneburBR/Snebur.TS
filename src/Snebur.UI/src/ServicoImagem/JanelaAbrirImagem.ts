namespace Snebur.UI
{
    export class JanelaAbrirImagem extends Snebur.UI.Janela
    {
        private TipoEntidadeImagem: r.TipoEntidade;
        private Imagens: Array<d.IImagem>;
        private Gerenciador: GerenciadorAbrirImagemLocal;
        private TamanhoImagem: d.EnumTamanhoImagem;

        public get ViewModel(): JanelaAbrirImagemViewModel
        {
            return this.DataSource;
        }

        public constructor(
            controlePai: Snebur.UI.BaseControle,
            arquivos: Array<SnBlob>,
            tipoEntidadeImagem: r.TipoEntidade) 
        {
            super(controlePai);

            this.TamanhoImagem = d.EnumTamanhoImagem.Pequena;
            this.TipoEntidadeImagem = tipoEntidadeImagem;
            this.IsFecharEsc = false;
            this.Imagens = this.RetornarImagens(arquivos);
            this.EventoCarregado.AddHandler(this.Janela_Carregada, this);

            this.Gerenciador = new GerenciadorAbrirImagemLocal();
            this.Gerenciador.EventoProgresso.AddHandler(this.Gerenciador_Progresso, this);
            this.Gerenciador.EventoTarefaConcluida.AddHandler(this.Gerenciador_TarefaConcluida, this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.OcultarBarraAcoes();
        }

        public Janela_Carregada(provedor: any, e: EventArgs) 
        {
            //pagina carregada
            this.DataSource = new JanelaAbrirImagemViewModel();
            this.SalvarEntidadesImagemAsync();
        }
        //#region Salvar imagens 

        private async SalvarEntidadesImagemAsync() 
        {
            this.ViewModel.Status = "Salvando";
            const contexto = $Aplicacao.RetornarContextoDados(this.TipoEntidadeImagem);
            const resultadoSalvar = await contexto.SalvarAsync(this.Imagens);
            if (!resultadoSalvar.IsSucesso)
            {
                await JanelaMensagem.AguardarFecharMensagemAsync();
                const janelaMensagem = new JanelaMensagem(this,
                    "Desculpe",
                    "Erro um erro ao salvar as imagens",
                    EnumBotoesJanelaMensagem.Ok);

                await janelaMensagem.MostrarAsync();
                return;
            }

            this.ViewModel.TotalImagens = this.Imagens.Count;

            throw new Erro("Não implementado");
        }

        private CallbackResultadoGerenciadorAbrirImagem()
        {
            this.FecharAsync(new ResultadoJanelaAbriImagem(this, this.Imagens));
        }

        private CallbaclMensagemErroSalvar(): void
        {
            this.FecharAsync(false);
        }

        //#endregion

        //#region Métodos privados

        private Gerenciador_Progresso(provedor: any, e: ProgressoEventArgs): void
        {
            this.ViewModel.Progresso = e.Progresso;
        }

        private Gerenciador_TarefaConcluida(tarefa: TarefaAbrirImagemLocal, e: EventArgs): void
        {
            this.ViewModel.ImagensCarregada = this.Gerenciador.Finalizados.Count;
            this.ViewModel.ImagemAtual = tarefa.Imagem;
        }

        private RetornarImagens(arquivos: Array<SnBlob>): Array<d.IImagem>
        {

            throw new Error("Não implementado");

            //var imagens = new Array<d.IImagem>();
            //var len = arquivos.length;
            //for (var i = 0; i < len; i++)
            //{
            //    let arquivo = arquivos[i];
            //    let imagem = new (this.TipoEntidadeImagem.Construtor as any)() as d.IImagem;
            //    imagem.OrigemImagem = new sa.OrigemImagemLocal(imagem, arquivo);
            //    imagens.Add(imagem);
            //}
            //return imagens;
        }
        //#endregion

        //#region Métodos protegidos 

        protected RetornarCssClasseMedidas(): string
        {
            //return super.RetornarCssClasseMedidas();
            return "sn-janela-abrir-imagens-medidas";
        }
        //#endregion

        public override Dispose(): void
        {
            this.Gerenciador.EventoProgresso.RemoveHandler(this.Gerenciador_Progresso, this);
            this.Gerenciador.EventoTarefaConcluida.RemoveHandler(this.Gerenciador_TarefaConcluida, this);
            super.Dispose();
        }
    }
}