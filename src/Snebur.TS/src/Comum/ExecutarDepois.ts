namespace Snebur
{
    export class ExecutarDepois<TAcao extends Function = Function> implements IDisposable
    {
        private _totalMilesegundos: number;

        private Identificador: number = null;
        private IdentificadorIntervalo: number = null;
        private IdentificadorLimparIntervalo: number = null;

        private Acao: TAcao
        private TotalMilesegundosIntervalo: number;
        private TotalMilesegundosLimparIntervalo: number;
        private ParametrosIntervalo: any;

        public IsExecutarPedente: boolean;

        public  IsNuncaExecutado: boolean = true;
        public get TotalMilesegundos(): number
        {
            return this._totalMilesegundos;
        }

        public set TotalMilesegundos(value: number)
        {
            u.ValidacaoUtil.ValidarPositivo(value);
            this._totalMilesegundos = value;
        }
        public constructor(acao: TAcao, totalMilisegundos: number)
        public constructor(acao: TAcao, tempo: TimeSpan)
        public constructor(acao: TAcao, totalMilisegundos: number, totalMilesegundosIntervalo: number)
        public constructor(acao: TAcao, tempo: TimeSpan, tempoIntervalo: TimeSpan)
        public constructor(acao: TAcao, tempoOuTotalMilesegundos: number | TimeSpan, tempoOUTotalMilesegundosIntervalo?: number | TimeSpan)
        {
            if (!(acao instanceof Function))
            {
                throw new Erro("A ação não foi definida ou não é suportada");
            }

            this.Acao = acao;
            this._totalMilesegundos = this.RetornarTotalMilesegundos(tempoOuTotalMilesegundos);

            if (typeof tempoOUTotalMilesegundosIntervalo === "number" && tempoOUTotalMilesegundosIntervalo > 0)
            {
                this.TotalMilesegundosIntervalo = this.RetornarTotalMilesegundos(tempoOUTotalMilesegundosIntervalo);
                this.TotalMilesegundosLimparIntervalo = this.TotalMilesegundosIntervalo * 3;
            }
        }

        public Executar(...parametros: Array<any>): void
        {
            window.clearTimeout(this.Identificador);
            this.Identificador = window.setTimeout(this.ExecutarInterno.bind(this, parametros), this.TotalMilesegundos);
            this.ParametrosIntervalo = parametros;
            this.IsExecutarPedente = true;

            if (this.IdentificadorIntervalo == null)
            {
                this.IdentificadorIntervalo = window.setInterval(this.ExecutarIntervalo.bind(this), this.TotalMilesegundosIntervalo);
            }
        }

        public ExecutarAgoara(...parametros: Array<any>): void
        {
            this.ExecutarInterno(parametros);
        }

        private ExecutarIntervalo(): void
        {
            if (this.IsExecutarPedente)
            {
                this.ExecutarInterno(this.ParametrosIntervalo);
            }
        }

        private ExecutarInterno(parametros: Array<any>): void
        {
            if (this.Acao)
            {
                if (parametros instanceof Array)
                {
                    this.Acao.apply(null, parametros);
                }
                else
                {
                    this.Acao.call(null);
                }
            }
            this.IsNuncaExecutado = false;
            this.IsExecutarPedente = false;

            if (typeof this.IdentificadorIntervalo === "number" && this.IdentificadorIntervalo  > 0)
            {
                window.clearTimeout(this.IdentificadorLimparIntervalo);
                this.IdentificadorLimparIntervalo = window.setTimeout(this.LimparIntervalo.bind(this), this.TotalMilesegundosLimparIntervalo);
            }
        }

        private LimparIntervalo(): void
        {
            window.clearTimeout(this.IdentificadorIntervalo);
        }

        private RetornarTotalMilesegundos(tempoOuTotalMilesegundos: number | TimeSpan): number
        {
            if (tempoOuTotalMilesegundos instanceof TimeSpan)
            {
                return tempoOuTotalMilesegundos.TotalMilliseconds;
            }
            else if (typeof tempoOuTotalMilesegundos === "number")
            {
                return tempoOuTotalMilesegundos;
            }
            else
            {
                throw new Erro("O tempo ou total de milissegundos não foi definido ou não é suportado");
            }
        }

        public Cancelar(): void
        {
            window.clearTimeout(this.Identificador);
            //window.clearInterval(this.IdentificadorIntervalo);
        }

        public Dispose(): void
        {
            window.clearTimeout(this.Identificador);
            window.clearInterval(this.IdentificadorIntervalo);
            window.clearInterval(this.IdentificadorLimparIntervalo);

            delete this.Acao;
        }
    }
}