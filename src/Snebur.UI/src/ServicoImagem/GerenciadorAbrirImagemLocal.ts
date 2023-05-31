
namespace Snebur.UI
{
    export class GerenciadorAbrirImagemLocal extends Snebur.Tarefa.GerenciadorTarefa<TarefaAbrirImagemLocal>
    {
        private readonly DicionarioTarefasVirtualizacao = new DicionarioSimples<TarefaAbrirImagemLocal, string>();
        public readonly TarefasVirtualizacao = new ListaObservacao<TarefaAbrirImagemLocal>();
        public readonly CarregamentosAsync = new ListaObservacao<TarefaAbrirImagemLocal>();

        //private  readonly Tarefas
        public get TotalVirtualizacao(): number
        {
            return this.TarefasVirtualizacao.Count;
        }

        public get IsCarregandoImagem(): boolean
        {
            return this.Executando.Count > 0 ||
                this.Fila.Count > 0 ||
                this.CarregamentosAsync.Count > 0 ||
                this.DicionarioTarefasVirtualizacao.Count > 0;
        }

        public override get MaximoTarefasSimultaneas(): number
        {
            return this._maximoTarefasSimultaneas;
        }

        public constructor()
        {
            super();
            this._maximoTarefasSimultaneas = u.ProcessadorUtil.RetornarTotalThreadsWorker();
        }

        protected override RetornarChaveTarefa(tarefa: TarefaAbrirImagemLocal): string
        {
            return tarefa.Imagem.__IdentificadorEntidade;
        }

        protected override ExecutarProximaTarefa(): void
        {
            super.ExecutarProximaTarefa();
        }

        public async AguardarCarregamentoImagensAsync()
        {
            while (this.IsCarregandoImagem)
            {
                await ThreadUtil.EsperarAsync(150);
            }
        }

        public AbrirImagemVirtualizacao(imagem: d.IImagem): void
        public AbrirImagemVirtualizacao(imagem: d.IImagem, callbackCanceladoVirtualizacao: CallbackImagemCancelada): void
        public AbrirImagemVirtualizacao(imagem: d.IImagem, callbackCanceladoVirtualizacao: CallbackImagemCancelada = null): void
        {
            if (!this.DicionarioTarefasVirtualizacao.ContainsKey(imagem.__IdentificadorEntidade))
            {
                const novaTarefa = this.RetornarTarefaAbrirImagem(imagem);
                this.DicionarioTarefasVirtualizacao.Add(imagem.__IdentificadorEntidade, novaTarefa);
                this.TarefasVirtualizacao.Add(novaTarefa);
            }

            const tarefa = this.DicionarioTarefasVirtualizacao.Item(imagem.__IdentificadorEntidade);
            if (callbackCanceladoVirtualizacao instanceof Function)
            {
                tarefa.CallbacksCancelarVirtualizacao.Add(callbackCanceladoVirtualizacao);
            }
            this.IniciarAsync();
        }

        public async AbrirImagemAsync(imagem: d.IImagem): Promise<void>
        {
            const tarefa = new TarefaAbrirImagemLocal(imagem);
            this.CarregamentosAsync.Add(tarefa);
            try
            {
                await tarefa.IniciarAsync();
            }
            finally
            {
                this.CarregamentosAsync.Remove(tarefa);
            }
        }

        public AbrirImagemNormal(imagem: d.IImagem, callbackImagemCarregada: () => void): void
        {
            if (imagem.Id === 0)
            {
                throw new Erro("A imagem não foi salva");
            }
            const tarefa = this.RetornarTarefaAbrirImagem(imagem);
            tarefa.EventoConcluido.AddHandler(callbackImagemCarregada, this);
            this.IniciarAsync();
        }

        protected override RetornarProximaTarefa(): TarefaAbrirImagemLocal
        {
            const retorno = this.RetornarProximaTarefaImagemInterno();
            if (retorno instanceof TarefaAbrirImagemLocal)
            {
                this.TarefasVirtualizacao.Remove(retorno);
                this.NotificarTotalFila();
                this.NotificarTotalVirtualizacao();
                return retorno;
            }
            return null;
        }

        private RetornarProximaTarefaImagemInterno(): TarefaAbrirImagemLocal
        {
            if (this.DicionarioTarefasVirtualizacao.Count > 0)
            {
                return this.DicionarioTarefasVirtualizacao.PegarMeio();
            }

            if (this.Fila.Count > 0)
            {
                return this.Fila.PegarPrimeiro();
            }
            return null;
        }

        private RetornarTarefaAbrirImagem(imagem: d.IImagem): TarefaAbrirImagemLocal
        {
            if (!this.DicionarioTarefas.ContainsKey(imagem.__IdentificadorEntidade))
            {
                const tarefa = new TarefaAbrirImagemLocal(imagem);
                this.AdicionarTarefa(tarefa);
            }
            return this.DicionarioTarefas.Item(imagem.__IdentificadorEntidade);
        }

        public LimparFilaVirtualizacao(): void
        {
            const tarefasRemovida = this.DicionarioTarefasVirtualizacao.ToArray();
            this.TarefasVirtualizacao.Clear();
            for (const tarefa of tarefasRemovida)
            {
                this.DicionarioTarefasVirtualizacao.Remove(tarefa.Imagem.__IdentificadorEntidade);
                tarefa.NotificarCancelamentoVirtualizacao();
            }
        }


        private NotificarTotalVirtualizacao(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalVirtualizacao,
                this.TotalVirtualizacao,
                this.TotalVirtualizacao);
        }

        public async EsperarCarregarImagensVirtualizasAsync(): Promise<void>
        {
            while (this.TarefasVirtualizacao.Count > 0)
            {
                await u.ThreadUtil.EsperarAsync(1000);
            }
        }
    }
}