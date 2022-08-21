
interface Date extends Snebur.Nativo.IDate
{

}

interface DateConstructor extends Snebur.Nativo.IDateConstructor
{
}

namespace Snebur.Nativo
{
    export interface IDate extends IObject<Snebur.Reflexao.TipoPrimario>
    {
        ToString(args?: any): string;
        ToString(formacao: EnumFormatacao): string;

        readonly Millisecond: number;

        readonly Second: number;

        readonly Minute: number;

        readonly Hour: number;

        readonly Day: number;

        readonly Month: d.EnumMes;

        readonly Year: number;

        readonly DataZeroHora: Date;

        readonly Utc: Date;

        //Ticks: number;

        //TimeOfDay: Snebur.Core.TimeSpan;

        readonly DayOfWeek: d.EnumDiaSemana;

        //DayOfYear: number;
        Add(timespan: TimeSpan): Date;

        AddMilliseconds(milliseconds: number): Date;

        AddSeconds(segundos: number): Date;

        AddMinutes(minutos: number): Date;

        AddHours(horas: number): Date;

        AddDays(dias: number): Date;

        AddMonths(meses: number): Date;

        AddYears(anos: number): Date;

        Equals(outraData: Date): boolean;
        Equals(outraData: Date, opcoesData?: u.OpcoesCompararData, opcoesHora?: u.OpcoesCompararHora): boolean;

        RetornarHashValidacaoUnico(): number;

        readonly TimeOfDay: TimeSpan;

        readonly Ticks: number;

        Formatar(formado: EnumFormatacao): string;
       
    }

    export interface IDateConstructor extends ITipo<Snebur.Reflexao.TipoPrimario>, IParse<Date>
    {
    }

}



