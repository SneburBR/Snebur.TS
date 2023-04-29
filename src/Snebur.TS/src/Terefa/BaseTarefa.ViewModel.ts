namespace Snebur.Tarefa
{
    export abstract class BaseTarefa<TProgressoEventArgs extends ProgressoEventArgs = ProgressoEventArgs> extends Snebur.Dominio.BaseViewModel implements IDisposable
    {
        //#region Propriedades

        private static TIMEOUT_PADRAO: number = 30;

        private IdentificadorTimeout: number;
        private _progresso: number;
        private _statusTarefa: EnumStatusTarefa;

        public get Progresso(): number
        {
            return this._progresso;
        }

        public set Progresso(value: number)
        {
            value = u.ConverterUtil.ParaNumeroValidarIntervalo(value, 0, 100);
            this.NotificarPropriedadeAlterada("Progresso", this._progresso, this._progresso = value);
            this.NotificarEventoProgressoAlterado(value);
        }

        public get Status(): EnumStatusTarefa
        {
            return this._statusTarefa;
        }

        public set Status(value: EnumStatusTarefa)
        {
            const antigoValor = this._statusTarefa;
            this._statusTarefa = value;
            this.NotificarPropriedadeAlterada("Status", antigoValor, value);
            this.EventoStatusAlterado.Notificar(this, new StatusTarefaAlteradoEventArgs(this, value));
        }

        public Timeout: TimeSpan;

        public DataHoraInicio: Date;
        public AtivarProgresso: number;
        public DataHoraUltimaAtividade: Date;

        public Erro: Erro;

        public CallbackTarefaConcluida: CallbackResultado<ResultadoTarefaFinalizadaEventArgs>;
        public readonly EventoProgresso: Evento<TProgressoEventArgs>;
        public readonly EventoStatusAlterado: Evento<StatusTarefaAlteradoEventArgs>;

        public Argumento: any;

        //#endregion

        public constructor(argumento: any = null)
        {
            super();
            this.Argumento = argumento;
            //Sthis.Teste();
            //this.__Teste = this.Teste.bind(this);
            //this.__Teste2 = this.Teste2.bind(this);

            this._progresso = 0;
            this._statusTarefa = EnumStatusTarefa.Aguardando;
            this.EventoProgresso = new Evento<TProgressoEventArgs>(this);
            this.EventoStatusAlterado = new Evento<StatusTarefaAlteradoEventArgs>(this);
            this.Timeout = this.RetornarTimeout();
        }

        protected RetornarTimeout(): TimeSpan
        {
            return TimeSpan.FromSeconds(BaseTarefa.TIMEOUT_PADRAO);
        }
        //#region Métodos públicos 

        public async IniciarAsync(callback: CallbackResultado<ResultadoTarefaFinalizadaEventArgs>)
        {
            this.CallbackTarefaConcluida = callback;

            if (this.Status === EnumStatusTarefa.Pausada)
            {
                return;
            }

            this.Status = EnumStatusTarefa.Executando;
            await ThreadUtil.QuebrarAsync();
            await this.ExecutarAsync();
        }

        public EnviarAsync(): Promise<void>
        {
            return new Promise<void>(resolver =>
            {
                this.IniciarAsync(() =>
                {
                    resolver();
                });
            });
        }
         
        public FinalizarTarefa(erro: Error): void
        {
            this.DispensarTimeout();
            this.Status = (u.ValidacaoUtil.IsDefinido(erro)) ? EnumStatusTarefa.Erro : EnumStatusTarefa.Finalizada;
            if (u.ValidacaoUtil.IsDefinido(this.CallbackTarefaConcluida))
            {
                const callback = this.CallbackTarefaConcluida;
                this.CallbackTarefaConcluida = null;

                const resultado = new ResultadoTarefaFinalizadaEventArgs(this, erro);
                resultado.UserState = this.Argumento;
                callback(resultado);
            }
        }

        //#region Progresso alterado

        public NotificarProgressoAlterado(progresso: number): void
        {
            this.Progresso = progresso;
        }

        private NotificarEventoProgressoAlterado(progresso: number)
        {
            const args = this.RetornarArgumentoEventoProgressoAlterado(progresso);
            this.EventoProgresso.Notificar(this, args);
        }

        protected RetornarArgumentoEventoProgressoAlterado(progresso: number): TProgressoEventArgs
        {
            return new ProgressoEventArgs(progresso) as TProgressoEventArgs;
        }

        //#endregion

        public NotificarAtividade()
        {
            this.InicializarTimeout();
            this.DataHoraUltimaAtividade = new Date();
        }


        public PausarTarefa(): void
        {
            if (this.Status === EnumStatusTarefa.Executando)
            {
                this.Status = EnumStatusTarefa.Pausada;
            }
        }

        public ContinuarTarefa(): void
        {
            if (this.Status === EnumStatusTarefa.Pausada)
            {
                this.Status = EnumStatusTarefa.Executando;
                this.Continuar();
            }
        }

        //#endregion

        //#region Métodos privados

        private InicializarTimeout(): void
        {
            this.DispensarTimeout();
            this.IdentificadorTimeout = window.setTimeout(this.NotificarErroTimeout.bind(this), this.Timeout.TotalMilliseconds);
        }

        private CallbackTimeout(): void
        {
            this.DispensarTimeout();

            if (this.Status === EnumStatusTarefa.Pausada)
            {
                this.InicializarTimeout();
                return;
            }
            if (!u.ValidacaoUtil.IsDefinido(this.DataHoraUltimaAtividade))
            {
                this.NotificarErroTimeout();
                return;
            }
            const diferenca = TimeSpan.FromDates(this.DataHoraUltimaAtividade, new Date(), true);
            if (diferenca.TotalMilliseconds > this.Timeout.TotalMilliseconds)
            {
                this.NotificarErroTimeout();
            }
            else
            {
                this.InicializarTimeout();
            }
        }

        private NotificarErroTimeout(): void
        {
            const mensagem = `O tempo limite foi atingido ${u.FormatacaoUtil.FormatarDecimal(this.Timeout.TotalSeconds)} segundos ao executar a tarefa`;
            const erroTimeout = new ErroTimeout(mensagem, this);
            this.FinalizarTarefa(erroTimeout);
        }

        private DispensarTimeout(): void
        {
            if (u.ValidacaoUtil.IsDefinido(this.IdentificadorTimeout))
            {
                window.clearTimeout(this.IdentificadorTimeout);
                this.IdentificadorTimeout = null;
            }
        }
        //#endregion

        //#region Métodos abstratos

        protected abstract ExecutarAsync(): void;

        protected abstract Continuar(): void;

        //#endregion

        public CancelarTarefa(): void
        {
            this.Status = t.EnumStatusTarefa.Cancelada;

            console.warn("Tarefa cancelada " + this.toString());

            this.FinalizarTarefa(null);
        }

        //#region IDisposable

        public override Dispose(): void
        {
            this.EventoStatusAlterado.Clear();
            this.EventoProgresso.Clear();
        }
        //#endregion
    }
}