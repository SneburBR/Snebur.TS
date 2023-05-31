namespace Snebur.Tarefa
{
    export abstract class BaseTarefa<TProgressoEventArgs extends ProgressoEventArgs = ProgressoEventArgs> extends Snebur.Dominio.BaseViewModel implements IDisposable
    {
        //#region Propriedades

        private static readonly TIMEOUT_PADRAO: number = 30;

        private IdentificadorTimeout: number;
        private _progresso: number;
        private _statusTarefa: EnumStatusTarefa;
        private _timeout: TimeSpan;
        private _erro: Error;
        private _dataHoraUltimaAtividade: Date;
        private _dataHoraInicio: Date;

        private Resolver: (resultado: ResultadoTarefaFinalizadaEventArgs) => void;

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

        public get Timeout(): TimeSpan
        {
            return this._timeout;
        } 
        public set Timeout(value: TimeSpan)
        {
            this._timeout = value;
        }

        public get Erro(): Error
        {
            return this._erro;
        }
        public get DataHoraInicio(): Date
        {
            return this._dataHoraInicio;
        }
        public get DataHoraUltimaAtividade(): Date
        {
            return this._dataHoraUltimaAtividade;
        }

        public readonly EventoProgresso = new Evento<TProgressoEventArgs>(this);
        public readonly EventoConcluido = new Evento<ResultadoTarefaFinalizadaEventArgs>(this);
        public readonly EventoStatusAlterado = new Evento<StatusTarefaAlteradoEventArgs>(this);

        public readonly Argumento: any;

        public constructor(argumento: any = null)
        {
            super();
            this.Argumento = argumento;
            //Sthis.Teste();
            //this.__Teste = this.Teste.bind(this);
            //this.__Teste2 = this.Teste2.bind(this);

            this._progresso = 0;
            this._statusTarefa = EnumStatusTarefa.Aguardando;
            this._timeout = this.RetornarTimeout();
        }

        protected RetornarTimeout(): TimeSpan
        {
            return TimeSpan.FromSeconds(BaseTarefa.TIMEOUT_PADRAO);
        }
        //#region Métodos públicos 

        public async IniciarAsync()
        {
            if (this.Status === EnumStatusTarefa.Pausada)
            {
                return;
            }

            return new Promise(resolver =>
            {
                this.Resolver = resolver;
                this.Status = EnumStatusTarefa.Executando;
                this.ExecutarInternoAsync();
            });
        }

        public FinalizarTarefa(erro: Error): void
        {
            this.DispensarTimeout();
            this._erro = erro;
            const status = (u.ValidacaoUtil.IsDefinido(erro)) ? EnumStatusTarefa.Erro : EnumStatusTarefa.Finalizada;
            this.Status = status;
            const resultado = new ResultadoTarefaFinalizadaEventArgs(this, erro);
            const resolver = this.Resolver;
            if (u.ValidacaoUtil.IsDefinido(resolver))
            {
                this.Resolver = null;

                resultado.UserState = this.Argumento;
                resolver(resultado);
            }
            this.EventoConcluido.Notificar(this, resultado);
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
            this._dataHoraUltimaAtividade = new Date();
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

        protected abstract ExecutarInternoAsync(): void;

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