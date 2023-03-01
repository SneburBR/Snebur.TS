namespace Snebur.ServicoArquivo
{
    export class GerenciadorEnvioArquivo extends Snebur.Tarefa.GerenciadorTarefa<BaseTarefaEnviarArquivo, ProgressoGerenciadorEnvioArquivoEventArgs>
    {
        private static readonly TEMPO_ATUALIZAR_PROGRESSO = 200;
        private static readonly TEMPO_ATUALIZAR_PROGRESSO_INTERVALO = 500;

        private _velocidadeMedia: number = 0;

        public IdentificadorLog: string;
        public ServicoLog: Snebur.Comunicacao.BaseServicoLogServicoArquivo;

        public readonly Miniaturas = new ListaObservacao<TarefaEnviarImagem>();
        public readonly Pequenas = new ListaObservacao<TarefaEnviarImagem>();
        public readonly Medias = new ListaObservacao<TarefaEnviarImagem>();
        public readonly Grandes = new ListaObservacao<TarefaEnviarImagem>();
        public readonly Impressoes = new ListaObservacao<TarefaEnviarImagem>();
        public readonly Arquivos = new ListaObservacao<TarefaEnviarArquivo>();

        public readonly TarefasEnviarImagemImpressao = new List<TarefaEnviarImagemImpressao>();

        public readonly EventoFinalizado = new Evento(this);

        public get TotalMiniaturas(): number
        {
            return this.Miniaturas.Count;
        }

        public get TotalPequenas(): number
        {
            return this.Pequenas.Count;
        }

        public get TotalMedias(): number
        {
            return this.Medias.Count;
        }

        public get TotalGrandes(): number
        {
            return this.Grandes.Count;
        }

        public get TotalImpressoes(): number
        {
            return this.Impressoes.Count;
        }

        public get TotalArquivos(): number
        {
            return this.Arquivos.Count;
        }

        public override get TotalFila(): number
        {
            return this.TotalMiniaturas +
                this.TotalPequenas +
                this.TotalMedias +
                this.TotalGrandes +
                this.TotalImpressoes +
                this.TotalArquivos;
        }

        public get IsFinalizado(): boolean
        {
            return this.TotalFila === 0 && this.Executando.Count === 0;
        }

        public get VelocidadeMedia(): number
        {
            return this._velocidadeMedia;
        }
        public set VelocidadeMedia(value: number)
        {
            this.NotificarPropriedadeAlterada(x => x.VelocidadeMedia, this._velocidadeMedia, this._velocidadeMedia = value);
        }

        private ExecutarProgressoDepois = new ExecutarDepois(this.AtualizarProgressoGerenciadorTarefaDepois.bind(this), GerenciadorEnvioArquivo.TEMPO_ATUALIZAR_PROGRESSO, GerenciadorEnvioArquivo.TEMPO_ATUALIZAR_PROGRESSO_INTERVALO);

        public static readonly TEMPO_MEDIDOR_VELOCIDADE_SEGUNDOS = 2;
        public readonly TempoIntervaloMedidorVelocidade = TimeSpan.FromSeconds(GerenciadorEnvioArquivo.TEMPO_MEDIDOR_VELOCIDADE_SEGUNDOS);
        public TotalBytesMedidorVelocidade: number = 0;

        public constructor()
        {
            super();

            //this.DicionarioOrigemImagemLocal = new Dicionario<sa.OrigemImagemLocal, number>();
            this.ServicoLog = $Aplicacao.ServicoLogServicoArquivo;
            //this.PrerenciaOrdemFila = Snebur.Tarefa.EnumPreferenciaOrdemFila.Primeiro;
            /*this.MaximoTarefasSimultaneas = $Configuracao.IsDebug?  1 : 3;*/
            this.MaximoTarefasSimultaneas = 3;
            this.IntervaloExecutarProximaTarefa = TimeSpan.FromSeconds(0);
            this.Estado = t.EnumEstadoTarefa.Finalizada;
        }

        protected override AtualizarProgressoGerenciadorTarefa(): void
        {
            this.ExecutarProgressoDepois.Executar();
        }

        private AtualizarProgressoGerenciadorTarefaDepois(): void
        {
            const tarefasImagem = this.Tarefas.OfType<TarefaEnviarImagem>(TarefaEnviarImagem).ToList();
            if (tarefasImagem.Count > 0)
            {
                const finalizadas = this.Finalizados.OfType<TarefaEnviarImagem>(TarefaEnviarImagem).ToList();
                const executando = this.Executando.OfType<TarefaEnviarImagem>(TarefaEnviarImagem).ToList();

                const totalAreas = tarefasImagem.Sum(x => x.DimensaoSaida.Largura + x.DimensaoSaida.Altura);
                const totalFinalizados = finalizadas.Sum(x => x.DimensaoSaida.Largura + x.DimensaoSaida.Altura) + executando.Sum(x => (x.DimensaoSaida.Largura + x.DimensaoSaida.Altura) * (x.Progresso / 100));
                const progresso = totalAreas > 0 ? (totalFinalizados / totalAreas) * 100 : 0;
                this.Progresso = progresso;

                if (isNaN(progresso))
                {
                    throw new Erro("progresso invalido");
                }

                if ($Configuracao.IsDebug)
                {
                    console.log("Progresso gerenciador envio: " + progresso);
                }

            }
            else
            {
                super.AtualizarProgressoGerenciadorTarefa();
            }
        }

        protected override RetornarProximaTarefa(): BaseTarefaEnviarArquivo
        {
            const [tarefa, expressaoPropriedade] = this.RetornarProximaTarefaExpressaoPropriedadeTotal();
            if (tarefa instanceof BaseTarefaEnviarArquivo)
            {
                this.NotificarPropriedadeAlterada(expressaoPropriedade);
                return tarefa;
            }
            return this.Fila.PegarPrimeiro();
        }

        protected override RetornarChaveTarefa(tarefa: TarefaEnviarArquivo): string
        {
            if (tarefa instanceof TarefaEnviarImagem)
            {
                return this.RetornarChaveImagem(tarefa.Imagem, tarefa.TamanhoImagem);
            }
            if (tarefa instanceof TarefaEnviarArquivo)
            {
                return tarefa.EntidadeArquivo.__IdentificadorEntidade;
            }
            throw new Erro("Tarefa enviar arquivo não é suportada");
        }

        private RetornarChaveImagem(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): string
        {
            if (imagem instanceof d.Entidade)
            {
                const chave = imagem.__IdentificadorEntidade.toString() + "-" + tamanhoImagem;
                return chave;
            }

            throw new Erro("Imagem não suportada");
        }

        protected RetornarProximaTarefaExpressaoPropriedadeTotal<T extends this>(): [BaseTarefaEnviarArquivo, (value: T) => any]
        {
            if (this.Pequenas.Count > 0)
            {
                return [this.Pequenas.PegarPrimeiro(), x => x.TotalPequenas];
            }

            if (this.Miniaturas.Count > 0)
            {
                return [this.Miniaturas.PegarPrimeiro(), x => x.TotalMiniaturas];
            }

            if (this.Medias.Count > 0)
            {
                return [this.Medias.PegarPrimeiro(), x => x.TotalMedias];
            }

            if (this.Grandes.Count > 0)
            {
                return [this.Grandes.PegarPrimeiro(), x => x.TotalGrandes];
            }

            if (this.Impressoes.Count > 0)
            {
                return [this.Impressoes.PegarPrimeiro(), x => x.TotalImpressoes];
            }

            if (this.Arquivos.Count > 0)
            {
                return [this.Arquivos.PegarPrimeiro(), x => x.TotalArquivos];
            }

            if (this.Fila.Count > 0)
            {
                //throw new ErroOperacaoInvalida("Operação invalida");
                return [this.Fila.PegarPrimeiro(), x => x.TotalFila];
            }

            return [null, null];
        }

        public EnviarArquivo(entidadeArquivo: d.IArquivo): void 
        {
            if (!this.DicionarioTarefas.ContainsKey(entidadeArquivo.__IdentificadorEntidade))
            {
                const tarefa = new TarefaEnviarArquivo(this, entidadeArquivo);
                this.Arquivos.Add(tarefa);
                this.AdicionarTarefa(tarefa);
            }
        }

        public EnviarImagemApresentacao(imagem: d.IImagem): void
        public EnviarImagemApresentacao(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): void
        public EnviarImagemApresentacao(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem = null): void
        {
            if (tamanhoImagem == null)
            {
                const tamanhosImagemApresentacao = u.ImagemUtil.TamanhosImagemApresentacao;
                for (const tamanhoImagemApresentacao of tamanhosImagemApresentacao)
                {
                    this.EnviarImagemInterno(imagem, tamanhoImagemApresentacao, null, true);
                }
            }
            else
            {
                if (!u.ImagemUtil.TamanhosImagemApresentacao.Contains(tamanhoImagem))
                {
                    throw new Erro("somente tamanho de imagem apresentação suportado");
                }
                this.EnviarImagemInterno(imagem, tamanhoImagem, null, true);
            }
        }

        public EnviarImagemImpressao(imagem: d.IImagem, dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean): void
        {
            const tarefaImpressao = this.EnviarImagemInterno(imagem, d.EnumTamanhoImagem.Impressao, dimensaoImpressao, isProcessarImagem);
            if (tarefaImpressao instanceof TarefaEnviarImagemImpressao)
            {
                if (tarefaImpressao.Estado === t.EnumEstadoTarefa.Aguardando)
                {
                    tarefaImpressao.AtualizarDimensaoImpressao(dimensaoImpressao);
                }
                else
                {
                    if (tarefaImpressao.DimensaoImpressao.Menor(dimensaoImpressao))
                    {
                        this.RestaurarTarefaEnviarImagemImpressao(tarefaImpressao, dimensaoImpressao, isProcessarImagem);
                    }
                }
            }
        }

        public async RestaurarTarefaEnviarImagemImpressao(tarefaImpressao: TarefaEnviarImagemImpressao,
            dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean)
        {

            if (tarefaImpressao.Estado === t.EnumEstadoTarefa.Executando)
            {
                tarefaImpressao.CancelarTarefa();

                this.Impressoes.Remove(tarefaImpressao);
                this.RemoverTarefa(tarefaImpressao);
                this.Fila.Remove(tarefaImpressao);
                const imagem = tarefaImpressao.Imagem;
                this.EnviarImagemImpressao(imagem, dimensaoImpressao, isProcessarImagem);
            }
            else
            {
                tarefaImpressao.AtualizarDimensaoImpressao(dimensaoImpressao);
                tarefaImpressao.Estado = t.EnumEstadoTarefa.Aguardando;
                if (!this.Impressoes.Contains(tarefaImpressao))
                {
                    tarefaImpressao.IsReenviar = true;
                    this.RemoverTarefa(tarefaImpressao);
                    this.Impressoes.Add(tarefaImpressao);
                    super.AdicionarTarefa(tarefaImpressao);

                    //this.Tarefas.Add(tarefaImpressao);
                    //this.Fila.Add(tarefaImpressao);

                }
                setTimeout(this.IniciarAsync.bind(this));
            }
        }

        private EnviarImagemInterno(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem, dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean): TarefaEnviarImagem
        {
            const chave = this.RetornarChaveImagem(imagem, tamanhoImagem);
            if (!this.DicionarioTarefas.ContainsKey(chave))
            {
                this.AdicionarNovaTarefaImagem(imagem, tamanhoImagem, dimensaoImpressao, isProcessarImagem);
            }
            return this.DicionarioTarefas.Item(chave) as TarefaEnviarImagem;
        }

        public AdicionarNovaTarefaImagem(imagem: d.IImagem, tamanhoImagem: EnumTamanhoImagem, dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean): void
        {
            this.ValidarImagemTamanhoDimensao(imagem, tamanhoImagem, dimensaoImpressao);

            const novaTarefaEnviarImagem = this.RetornarNovaTarefaEnviarImagem(imagem, tamanhoImagem, dimensaoImpressao, isProcessarImagem);
            switch (tamanhoImagem)
            {
                case EnumTamanhoImagem.Miniatura:
                    this.Miniaturas.Add(novaTarefaEnviarImagem);
                    break;
                case EnumTamanhoImagem.Pequena:
                    this.Pequenas.Add(novaTarefaEnviarImagem);
                    break;
                case EnumTamanhoImagem.Media:
                    this.Medias.Add(novaTarefaEnviarImagem);
                    break;
                case EnumTamanhoImagem.Grande:
                    this.Grandes.Add(novaTarefaEnviarImagem);
                    break;
                case EnumTamanhoImagem.Impressao:
                    this.Impressoes.Add(novaTarefaEnviarImagem);
                    break;
                default:
                    throw new Erro("Tamanho da imagem não é suportado");
            }
            this.AdicionarTarefa(novaTarefaEnviarImagem);

        }

        private RetornarNovaTarefaEnviarImagem(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem, dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean): TarefaEnviarImagem
        {
            if (tamanhoImagem === EnumTamanhoImagem.Impressao)
            {
                return this.RetornarNovaTarefaEnviarImagemImpresao(imagem, dimensaoImpressao, isProcessarImagem);

            }
            return this.RetornarNovaTarefaEnviarImagemApresentacao(imagem, tamanhoImagem);
        }

        public RetornarNovaTarefaEnviarImagemApresentacao(imagem: d.IImagem, tamanhoImagem: EnumTamanhoImagem): TarefaEnviarImagem
        {
            if (tamanhoImagem === EnumTamanhoImagem.Impressao)
            {
                throw new Erro("Utilizar o método RetornarNovaTarefaEnviarImagemImpresao");
            }
            return new TarefaEnviarImagemApresentacao(this, imagem, tamanhoImagem);
        }

        public RetornarNovaTarefaEnviarImagemImpresao(imagem: d.IImagem, dimensaoImpressao: d.Dimensao, isProcessarImagem: boolean): TarefaEnviarImagem
        {
            return new TarefaEnviarImagemImpressao(this, imagem, dimensaoImpressao, isProcessarImagem);
        }

        private ValidarImagemTamanhoDimensao(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem, dimensaoImpressao: d.Dimensao): void
        {
            if (!(imagem.Id > 0))
            {
                throw new ErroOperacaoInvalida("Não é possível enviar uma imagem não salva (id==0)", this);
            }
            if (!u.ValidacaoUtil.IsDefinido(imagem.OrigemImagem))
            {
                throw new ErroNaoDefinido("A OrigemImagem não foi definido", this);
            }

            if (!(imagem.OrigemImagem instanceof sa.OrigemImagemLocal))
            {
                throw new ErroNaoSuportado("A origem imagem não é suportado", this);
            }
        }

        protected override AdicionarTarefa(tarefa: BaseTarefaEnviarArquivo)
        {
            super.AdicionarTarefa(tarefa);
            setTimeout(this.IniciarAsync.bind(this));
        }

        private _bloqueio = false;

        public override async IniciarAsync()
        {
            while (this._bloqueio)
            {
                await u.ThreadUtil.EsperarAsync(500);
            }

            if (String.IsNullOrWhiteSpace(this.IdentificadorLog))
            {
                this._bloqueio = true;
                const totalBytes = this.Tarefas.Sum(x => x.TotalBytesLocal);
                this.IdentificadorLog = await this.ServicoLog.NotificarInicioEnvioAsync(this.Tarefas.Count, totalBytes);
                this._bloqueio = false;
            }
            this.InicializarMedidoVelocidadeAsync();

            super.IniciarAsync(this.CallbackGerenciadorEnvioArquivo_Finalizado.bind(this));
        }

        public CallbackGerenciadorEnvioArquivo_Finalizado(provedor: any, e: t.ResultadoTarefaFinalizadaEventArgs): void
        {
            this.DispensarMedidorVelocidade();
            setTimeout(this.LimparTarefas.bind(this), 5000);
        }

        private LimparTarefas(): void
        {
            if (this.IsFinalizado)
            {
                this.TarefasEnviarImagemImpressao.AddRange(this.Finalizados.OfType(TarefaEnviarImagemImpressao));

                this.Tarefas.Clear();
                this.Finalizados.Clear();
            }
        }

        public override FinalizarGerenciadorTarefa(): void
        {
            this.Estado = t.EnumEstadoTarefa.Finalizada;
            this.DispensarMedidorVelocidade();
            this.EventoFinalizado.Notificar(this, EventArgs.Empty);
            setTimeout(this.LimparTarefas.bind(this), 5000);
        }

        //#region Métodos sobre escritos

        protected override RetornarArgumentoEventoProgressoAlterado(progresso: number): ProgressoGerenciadorEnvioArquivoEventArgs
        {
            return new ProgressoGerenciadorEnvioArquivoEventArgs(progresso, this.TotalFila, this.Executando.Count, this.VelocidadeMedia);
        }

        //#endregion

        //#region Medidor de velocidade

        private IdentificadorMedidorVelocidade: number;

        private InicializarMedidoVelocidadeAsync(): void
        {
            if (!this.IdentificadorMedidorVelocidade)
            {
                this.IdentificadorMedidorVelocidade = window.setInterval(this.MedidorVelocidade_Interval.bind(this), this.TempoIntervaloMedidorVelocidade.TotalMilliseconds);
            }
        }

        private DispensarMedidorVelocidade(): void
        {
            if (this.IdentificadorMedidorVelocidade)
            {
                if (this.Miniaturas.Count === 0 &&
                    this.Pequenas.Count === 0 &&
                    this.Medias.Count === 0 &&
                    this.Grandes.Count === 0 &&
                    this.Impressoes.Count === 0)
                {
                    window.clearInterval(this.IdentificadorMedidorVelocidade);
                    this.IdentificadorMedidorVelocidade = undefined;
                    delete this.IdentificadorMedidorVelocidade;
                }
            }
        }


        public MedidorVelocidade_Interval(): void
        {
            const velocidade = this.TotalBytesMedidorVelocidade / GerenciadorEnvioArquivo.TEMPO_MEDIDOR_VELOCIDADE_SEGUNDOS;
            if (this._velocidadeMedia !== velocidade)
            {
                this.VelocidadeMedia = velocidade;
                this.TotalBytesMedidorVelocidade = 0;
            }
            if (velocidade === 0)
            {
                this.DispensarMedidorVelocidade();
            }
        }

        //#endregion

        //#region Envios Async

        public async EnviarImagemApresentacaoAsync(imagem: d.IImagem, callbackProgresso?: Action1<ProgressoEventArgs>): Promise<void>
        {
            const tamanhosApresentacao = u.ImagemUtil.TamanhosImagemApresentacao;
            const total = tamanhosApresentacao.Count;
            for (let index = 0; index < total; index++)
            {
                const tamanhoApresentacao = tamanhosApresentacao[index];
                const tarefa = new TarefaEnviarImagemApresentacao(this, imagem, tamanhoApresentacao);
                await tarefa.EnviarAsync();

                if (typeof callbackProgresso === "function")
                {
                    const processo = u.NormalizacaoUtil.NormalizarProgresso(((index + 1) / total) * 100);
                    callbackProgresso(new ProgressoEventArgs(processo));
                }
            }
        }

        public async EnviarImagemImpressaoAsync(imagem: d.IImagem, dimensaoImpressao: Dimensao, isProcessarImagem: boolean, callbackProgresso?: Action1<ProgressoEventArgs>): Promise<void>
        {
            const tarefa = new TarefaEnviarImagemImpressao(this, imagem, dimensaoImpressao, isProcessarImagem);
            if (typeof callbackProgresso === "function")
            {
                const funcaoProgressoAlterado = (provedor: any, e: ProgressoEventArgs) =>
                {
                    const processo = u.NormalizacaoUtil.NormalizarProgresso(e.Progresso);
                    callbackProgresso(new ProgressoEventArgs(processo));
                };

                tarefa.EventoProgresso.AddHandler(funcaoProgressoAlterado, null);
                await tarefa.EnviarAsync();
                tarefa.EventoProgresso.RemoveHandler(funcaoProgressoAlterado, null);
            }
            else
            {
                await tarefa.EnviarAsync();
            }
        }

        public async EnviarArquivoAsync(entidadeArquivo: d.IArquivo, callbackProgresso?: Action1<ProgressoEventArgs>): Promise<void> 
        {
            const tarefa = new TarefaEnviarArquivo(this, entidadeArquivo);
            if (typeof callbackProgresso === "function")
            {
                const funcaoProgressoAlterado = (sender: any, e: ProgressoEventArgs) =>
                {
                    const processo = u.NormalizacaoUtil.NormalizarProgresso(e.Progresso);
                    callbackProgresso(new ProgressoEventArgs(processo));
                };

                tarefa.EventoProgresso.AddHandler(funcaoProgressoAlterado, null);
                await tarefa.EnviarAsync();
                tarefa.EventoProgresso.RemoveHandler(funcaoProgressoAlterado, null);
            }
            else
            {
                await tarefa.EnviarAsync();
            }
        }

        public IsExisteEnvioImagemImpressao(imagem: IImagem): boolean
        {
            return this.Impressoes.Any(x => x.Imagem.Id === imagem.Id) ||
                this.Executando.Any(x => x instanceof TarefaEnviarImagemImpressao && x.Imagem.Id === imagem.Id) ||
                this.Finalizados.Any(x => x instanceof TarefaEnviarImagemImpressao && x.Imagem.Id === imagem.Id) ||
                this.TarefasEnviarImagemImpressao.Any(x => x.Imagem.Id === imagem.Id);

        }

        //#endregion

    }
}