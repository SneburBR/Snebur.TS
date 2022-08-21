namespace Snebur
{
    export class TimeSpan implements ITipo<Snebur.Reflexao.TipoPrimario>
    {
        //a dias começar 1 janeiro de 1970

        public static TicksMilesegundo = 10000;
        public static MilissegundosPorSegundo = 1000;
        public static MilissegundosPorMinuto = 60 * TimeSpan.MilissegundosPorSegundo;;
        public static MilissegundosPorHora = 60 * TimeSpan.MilissegundosPorMinuto;
        public static MilissegundosPorDia = 24 * TimeSpan.MilissegundosPorHora;

        public _totalMilisegundos: number = 0;

        public constructor()
        public constructor(milissegundos: number)
        public constructor(dias: number, horas: number, minutos: number, segundos: number, milissegundos: number)
        public constructor(diasOuMilissegundos: number = 0, horas?: number, minutos?: number, segundos?: number, milissegundos?: number)
        {
            if (arguments.length === 0)
            {
                this._totalMilisegundos = 0;
            }
            else if (arguments.length === 1)
            {
                this._totalMilisegundos += u.ConverterUtil.ParaInteiro(diasOuMilissegundos);
            }
            else
            {
                this._totalMilisegundos += (diasOuMilissegundos * TimeSpan.MilissegundosPorDia);
                this._totalMilisegundos += (horas * TimeSpan.MilissegundosPorHora);
                this._totalMilisegundos += (minutos * TimeSpan.MilissegundosPorMinuto);
                this._totalMilisegundos += (segundos * TimeSpan.MilissegundosPorSegundo);
                this._totalMilisegundos += u.ConverterUtil.ParaInteiro(milissegundos);
            }

            /*this._totalMilisegundos < 0 || o timespan suporta numeros negativos*/
            if (isNaN(this._totalMilisegundos)) 
            {
                throw new Erro("O TotalMilisegundos é invalido");
            }

        }

        public AddMilliseconds(milliseconds: number): void
        {
            this._totalMilisegundos += milliseconds;
        }

        public AddSeconds(seconds: number): void
        {
            this._totalMilisegundos += (seconds * TimeSpan.MilissegundosPorSegundo);
        }

        public AddMinutes(minutes: number): void
        {
            this._totalMilisegundos += (minutes * TimeSpan.MilissegundosPorMinuto);
        }

        public AddHours(hours: number): void
        {
            this._totalMilisegundos += (hours * TimeSpan.MilissegundosPorHora);
        }

        public AddDays(days: number): void
        {
            this._totalMilisegundos += (days * TimeSpan.MilissegundosPorDia);
        }

        public SubtractMilliseconds(milesegundos: number): void
        {
            this._totalMilisegundos -= milesegundos;
        }

        public SubtractSeconds(segundos: number): void
        {
            this._totalMilisegundos -= (segundos * TimeSpan.MilissegundosPorSegundo);
        }

        public SubtractMinutes(minutos: number): void
        {
            this._totalMilisegundos -= (minutos * TimeSpan.MilissegundosPorMinuto);
        }

        public SubtractHours(horas: number): void
        {
            this._totalMilisegundos -= (horas * TimeSpan.MilissegundosPorHora);
        }

        public SubtractDays(dias: number)
        {
            this._totalMilisegundos -= (dias * TimeSpan.MilissegundosPorDia);
        }

        public Add(outroTimeSpan: TimeSpan): void
        {
            this._totalMilisegundos += outroTimeSpan.TotalMilliseconds;
        }

        public Subtract(outroTimeSpan: TimeSpan): void
        {
            this._totalMilisegundos -= outroTimeSpan.TotalMilliseconds;
        }

        public Equals(outroTimespan: TimeSpan): boolean
        {
            if (outroTimespan instanceof TimeSpan)
            {
                return this._totalMilisegundos === outroTimespan.TotalMilliseconds;
            }
            return false;
        }

        public get Days(): number
        {
            return Math.floor(this._totalMilisegundos / TimeSpan.MilissegundosPorDia) % 24;
        }

        public get Hours(): number
        {
            return Math.floor(this._totalMilisegundos / TimeSpan.MilissegundosPorHora) % 24;
        }

        public get Minutes(): number
        {
            return Math.floor(this._totalMilisegundos / TimeSpan.MilissegundosPorMinuto) % 60;
        }

        public get Seconds(): number
        {
            return Math.floor(this._totalMilisegundos / TimeSpan.MilissegundosPorSegundo) % 60;
        }

        public get Milliseconds(): number
        {
            return this._totalMilisegundos % 1000;
        }

        //#region ""

        //#endregion

        public get TotalDays(): number
        {
            return this._totalMilisegundos / TimeSpan.MilissegundosPorDia;
        }

        public get TotalHours(): number
        {
            return this._totalMilisegundos / TimeSpan.MilissegundosPorHora;
        }

        public get TotalMinutes(): number
        {
            return this._totalMilisegundos / TimeSpan.MilissegundosPorMinuto;
        }

        public get TotalSeconds(): number
        {
            return this._totalMilisegundos / TimeSpan.MilissegundosPorSegundo;
        }

        public get TotalMilliseconds(): number
        {
            return this._totalMilisegundos;
        }

        public Formatar(formatacao: EnumFormatacao): string
        {
            return u.FormatacaoUtil.Formatar(this, formatacao);
        }
         
        //#region Métodos estáticos

        public static FromDays(dias: number): TimeSpan
        {
            return new TimeSpan(dias, 0, 0, 0, 0);
        }

        public static FromHours(horas: number): TimeSpan
        {
            return new TimeSpan(0, horas, 0, 0, 0);
        }

        public static FromMinutes(minutos: number): TimeSpan
        {
            return new TimeSpan(0, 0, minutos, 0, 0);
        }

        public static FromSeconds(seconds: number): TimeSpan
        {
            return new TimeSpan(0, 0, 0, seconds, 0);
        }
        public static FromMilliseconds(milliseconds: number): TimeSpan
        {
            return new TimeSpan(0, 0, 0, 0, milliseconds);
        }

        public static FromDates(inicio: Date, fim: Date, semprePositivo: boolean): TimeSpan
        {
            let diferencaMilisegundos = fim.valueOf() - inicio.valueOf();
            if (semprePositivo)
            {
                diferencaMilisegundos = Math.abs(diferencaMilisegundos);
            }
            return new TimeSpan(0, 0, 0, 0, diferencaMilisegundos);
        }

        public static FromDate(data: Date): TimeSpan
        {
            return new TimeSpan(0, 0, 0, 0, data.Utc.valueOf());
        }

        //#endregion

        //#region ITipo

        public __RetornarTipo(): Snebur.Reflexao.TipoPrimario
        {
            return TimeSpan.__RetornarTipo() as Snebur.Reflexao.TipoPrimario;
        }

        public GetType(): Snebur.Reflexao.TipoPrimario
        {
            return this.__RetornarTipo();
        }

        public valueOf (): number
        {
            return this.TotalMilliseconds;
        }
        //#endretion
    }
    TimeSpan.__CaminhoTipo = "TimeSpan";

    TimeSpan.__RetornarTipo = function (): Snebur.Reflexao.TipoPrimario
    {
        return $Reflexao.Tipos.Item(TimeSpan.__CaminhoTipo) as Snebur.Reflexao.TipoPrimario;
    };

    TimeSpan.GetType = function (): Snebur.Reflexao.TipoPrimario
    {
        return (this as any).__RetornarTipo();
    };


}