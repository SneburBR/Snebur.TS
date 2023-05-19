namespace Snebur.Tarefa
{
    export class GerenciadorTarefa<TTarefa extends BaseTarefa, TProgressoGerenciadorTarefaEventArgs extends ProgressoGerenciadorTarefaEventArgs = ProgressoGerenciadorTarefaEventArgs> extends BaseTarefa<TProgressoGerenciadorTarefaEventArgs>
    {
        protected _maximoTarefasSimultaneas: number = 1;

        protected readonly DicionarioTarefas = new DicionarioSimples<TTarefa>();
        protected readonly DicionarioFila = new DicionarioSimples<TTarefa>();

        public readonly Fila = new ListaObservacao<TTarefa>();
        public readonly Tarefas = new ListaObservacao<TTarefa>();
        public readonly TarefasComErros = new ListaObservacao<BaseTarefa>();
        public readonly Executando = new ListaObservacao<TTarefa>();
        public readonly Finalizados = new ListaObservacao<TTarefa>();

        public get TotalTarefas(): number
        {
            return this.Tarefas.Count;
        }

        public get TotalFila(): number
        {
            return this.Fila.Count;
        }

        public get TotalExecutando(): number
        {
            return this.Executando.Count;
        }

        public get TotalFinalizado(): number
        {
            return this.Finalizados.Count;
        }

        public get TotalErros(): number
        {
            return this.TarefasComErros.Count;
        }

        //public PreferenciaOrdemFila: EnumPreferenciaOrdemFila = EnumPreferenciaOrdemFila.Primeiro;

        public get MaximoTarefasSimultaneas(): number
        {
            if (this.Status === t.EnumStatusTarefa.Pausada)
            {
                return 0;
            }
            return this._maximoTarefasSimultaneas;
        }

        public set MaximoTarefasSimultaneas(value: number)
        {
            this.NotificarPropriedadeAlterada(x=> x.MaximoTarefasSimultaneas, this._maximoTarefasSimultaneas, this._maximoTarefasSimultaneas = value);

            if (this.Status === t.EnumStatusTarefa.Executando)
            {
                this.ExecutarProximaTarefa();
            }
        }

        public IntervaloExecutarProximaTarefa: TimeSpan;
        public readonly EventoTarefaConcluida: Evento<t.ResultadoTarefaFinalizadaEventArgs>;
        //protected TotalTarefasDispensadas: number = 0;

        public constructor()
        {
            super();

            //this.TarefasComErros = new Array<BaseTarefa>();
            //this.Executando = new Array<TTarefa>();
            //this.Finalizados = new Array<TTarefa>();

            this.IntervaloExecutarProximaTarefa = TimeSpan.FromSeconds(0);
            this.EventoTarefaConcluida = new Evento<t.ResultadoTarefaFinalizadaEventArgs>(this);
        }

        //#region Métodos públicos

        public override async IniciarAsync(callback: CallbackResultado<ResultadoTarefaFinalizadaEventArgs>)
        {
            await super.IniciarAsync(callback);
        }

        protected AdicionarTarefa(tarefa: TTarefa): void
        {
            const chave = this.RetornarChaveTarefa(tarefa);
            //if (!this.DicionarioTarefas.ContainsKey(chave))
            //{
            this.DicionarioTarefas.Add(chave, tarefa);
            this.Tarefas.Add(tarefa);
            this.DicionarioFila.Add(chave, tarefa);
            this.Fila.Add(tarefa);
            this.NotificarTotalTareafas();
            this.NotificarTotalFila();
            //}
        }

        protected RemoverTarefa(tarefa: TTarefa): boolean
        {
            const chave = this.RetornarChaveTarefa(tarefa);
            let isRemoveu = false;
            if (this.DicionarioFila.ContainsKey(chave))
            {
                this.DicionarioFila.Remove(chave);
                this.Fila.Remove(tarefa);
                isRemoveu = true;
            }

            if (this.DicionarioTarefas.ContainsKey(chave))
            {
                this.DicionarioTarefas.Remove(chave);
                this.Tarefas.Remove(tarefa);
                isRemoveu = true;
            }
            if (isRemoveu)
            {
                this.NotificarTotalTareafas();
                this.NotificarTotalFila();
                return true;
            }

            return false;
        }

        protected RetornarChaveTarefa(tarefa: TTarefa): string
        {
            return tarefa.GetHashCode().toString();
        }

        public FinalizarGerenciadorTarefa(): void
        {
            super.FinalizarTarefa(this.RetornarErro());
        }

        //public LimparFila(): List<TTarefa>
        //{
        //    let fila = this.Fila;
        //    let tarefasRemovidas = fila.Valores
        //    for (var tarefa of tarefasRemovidas)
        //    {
        //        let chave = this.RetornarChaveTarefa(tarefa);
        //        this.DicionarioTarefasInterno.Remove(chave);
        //        this.TarefasObservacao.Remove(tarefa);
        //    }
        //    fila.Clear();
        //    return tarefasRemovidas;
        //}

        //#endregion

        //#region Métodos sobre escritos

        public override PausarTarefa(): void
        {
            super.PausarTarefa();
            this.Status = t.EnumStatusTarefa.Pausada;
            this.ExecutarProximaTarefa();
        }

        protected ExecutarAsync(): void
        {
            this.ExecutarProximaTarefa();
        }

        protected Continuar(): void
        {
            this.ExecutarProximaTarefa();
        }

        protected override RetornarArgumentoEventoProgressoAlterado(progresso: number): TProgressoGerenciadorTarefaEventArgs
        {
            return new ProgressoGerenciadorTarefaEventArgs(progresso, this.Fila.Count, this.Executando.Count) as TProgressoGerenciadorTarefaEventArgs;
        }

        //#endregion

        //#region Métodos privados

        protected ExecutarProximaTarefa(): void
        {
            if (this.TotalFila === 0 && this.Executando.length === 0)
            {
                this.FinalizarGerenciadorTarefa();
            }
            else
            {
                //################## Pausado e continuando as Tarefas ####################

                const totalTarefasEmExecucao = this.Executando.Where(x => x.Status === t.EnumStatusTarefa.Executando).Count;
                if (totalTarefasEmExecucao > this.MaximoTarefasSimultaneas)
                {
                    for (let i = this.Executando.length - 1; i >= this.MaximoTarefasSimultaneas; i--)
                    {
                        const tarefa = this.Executando[i];
                        tarefa.PausarTarefa();
                    }
                }
                else
                {
                    const tarefasPausadas = this.Executando.Where(x => x.Status === t.EnumStatusTarefa.Pausada).ToList();
                    if (tarefasPausadas.length > 0)
                    {
                        let fim = this.MaximoTarefasSimultaneas - totalTarefasEmExecucao;
                        if (fim > tarefasPausadas.length) fim = tarefasPausadas.length;
                        for (let i = 0; i < fim; i++)
                        {
                            const tarefaPausada = tarefasPausadas[i];
                            tarefaPausada.ContinuarTarefa();
                        }
                    }
                }


                if (this.Executando.length < this.MaximoTarefasSimultaneas)
                {
                    while ((this.TotalFila > 0) && (this.Executando.length < this.MaximoTarefasSimultaneas))
                    {
                        const proximaTarefa = this.RetornarProximaTarefaInterno();
                        if (!(proximaTarefa instanceof BaseTarefa))
                        {
                            break;
                        }

                        this.Executando.Add(proximaTarefa);
                        this.NotificarTotalExecutando();

                        proximaTarefa.Timeout = this.Timeout;
                        proximaTarefa.EventoProgresso.AddHandler(this.Tarefa_ProgressoAlterado, this);
                        proximaTarefa.Status = EnumStatusTarefa.Executando;
                        this.RemoverDicionarioFila(proximaTarefa);
                        window.setTimeout(this.ExecutarTarefa_Iniciar.bind(this, proximaTarefa), this.IntervaloExecutarProximaTarefa.TotalMilliseconds);

                        //proximaTarefa.IniciarAsync(this.CallbackTarefaFinaliza.bind(this));
                    }
                }
            }
        }

        private RetornarProximaTarefaInterno(): TTarefa
        {
            const proximo = this.RetornarProximaTarefa();
            if (proximo instanceof BaseTarefa)
            {
                if (proximo.Status !== EnumStatusTarefa.Aguardando)
                {
                    //if ($Configuracao.IsDebug)
                    //{
                    //    throw new Erro("Status da tarefa não suportado ");
                    //}
                    return this.RetornarProximaTarefaInterno();
                }
                return proximo;
            }
            return null;
        }

        protected RetornarProximaTarefa(): TTarefa
        {
            if (this.DicionarioFila.Count > 0)
            {
                const proximo = this.Fila.PegarPrimeiro();
                const chave = this.RetornarChaveTarefa(proximo);
                this.DicionarioFila.Remove(chave);

                this.NotificarTotalFila();
                return proximo;
            }
            return null;
        }

        private RemoverDicionarioFila(tarefa: TTarefa): void
        {
            const chave = this.RetornarChaveTarefa(tarefa);
            if (this.DicionarioFila.ContainsKey(chave))
            {
                this.DicionarioFila.Remove(chave);
            }
        }

        private ExecutarTarefa_Iniciar(tarefa: BaseTarefa): void
        {
            tarefa.IniciarAsync(this.FinalizarTarefa_Concluido.bind(this));
        }

        private Tarefa_ProgressoAlterado(tarefa: BaseTarefa, e: ProgressoEventArgs): void
        {
            this.AtualizarProgressoGerenciadorTarefa();
        }

        private FinalizarTarefa_Concluido(resultado: ResultadoTarefaFinalizadaEventArgs): void
        {
            const tarefa = resultado.Tarefa as TTarefa;
            this.Executando.Remove(tarefa);

            if (resultado.Erro == null)
            {
                this.Finalizados.Add(tarefa);
                this.EventoTarefaConcluida.Notificar(tarefa, resultado);
            }
            else
            {
                if (tarefa.Status !== t.EnumStatusTarefa.Cancelada)
                {
                    this.TarefasComErros.Add(tarefa);
                    this.NotificarTotalErros();
                }
            }

            this.NotificarTotalFinalizado();
            this.NotificarTotalExecutando();

            this.AtualizarProgressoGerenciadorTarefa();
            this.ExecutarProximaTarefa();
        }

        protected AtualizarProgressoGerenciadorTarefa(): void
        {
            let progresso = 0;
            if (this.Tarefas.Count > 0)
            {
                progresso = (this.Finalizados.length / (this.Tarefas.Count)) * 100;
                progresso += this.Executando.Sum(x => x.Progresso) / this.Tarefas.Count;
            }
            this.Progresso = progresso;
        }
         
        private RetornarErro(): Erro
        {
            if (this.TarefasComErros.Count > 0)
            {
                return new ErroTarefas(this.TarefasComErros, this);
            }
            return null;
        }
        //#endregion


        //#region Notificar contadores

        protected NotificarTotalTareafas(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalTarefas, this.TotalTarefas, this.TotalTarefas);
        }

        protected NotificarTotalFila(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalFila, this.TotalFila, this.TotalFila);
        }

        protected NotificarTotalExecutando(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalExecutando, this.TotalExecutando, this.TotalExecutando);
        }

        protected NotificarTotalFinalizado(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalFinalizado, this.TotalFinalizado, this.TotalFinalizado);
        }

        protected NotificarTotalErros(): void
        {
            this.NotificarPropriedadeAlterada(x => x.TotalErros, this.TotalErros, this.TotalErros);
        }

        //#endregion


        //#region Cancelar

        public override CancelarTarefa(): Promise<void>
        {
            throw new Erro("Não implementado.");
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            //this.Tarefas.EventoItemAdicionado.RemoveHandler(this.__CallbackTarefa_TarefaAdicionada);
            //this.Tarefas.EventoItemRemovido.RemoveHandler(this.__CallbackTarefa_TarefaRemovida);
            //this.Tarefas.EventoItemInserido.RemoveHandler(this.__CallbackTarefa_TarefaInserida);

            super.Dispose();
        }
        //#endregion



    }
}