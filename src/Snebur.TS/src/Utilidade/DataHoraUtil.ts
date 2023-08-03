//https://github.com/microsoft/powerbi-visuals-utils-formattingutils/blob/master/src/date/dateUtils.ts
namespace Snebur.Utilidade
{
    export class DataHoraUtil
    {
        public static readonly HORAS_DIA = 24;
        private static readonly TicksPorMilesegundos: number = 10000;
        private static readonly DiferencaDotNet: number = 621355968000000000;

        public static RetornarTicks(data: Date): number
        {
            return DataHoraUtil.DiferencaDotNet + (data.getTime() * DataHoraUtil.TicksPorMilesegundos);
        }

        public static RetornarTotalDiasUtieis(dataInicio: Date, dataFim: Date): number
        {
            const totalDiasNaoUteis = DataHoraUtil.RetornarTotalDiasNaoUtieis(dataInicio, dataFim);
            //let datasCorrida = this.RetoranrDataCorridas(dataInicio, dataFim);
            return TimeSpan.FromDates(dataInicio, dataFim, true).Days - totalDiasNaoUteis;
        }

        public static RetornarTotalDiasNaoUtieis(dataInicio: Date, dataFim: Date): number
        {
            const datasNaoUteis = this.RetornarDataNaoUtieis(dataInicio, dataFim);
            return datasNaoUteis.Count;
        }

        public static RetornarDataNaoUtieis(dataInicio: Date, dataFim: Date): List<Date>
        {
            const feriados = DataFeriadoUtil.RetornarFeriadosIntervalo(dataInicio, dataFim).Select(x => x.Data);
            const datasCorrida = this.RetoranrDataCorridas(dataInicio, dataFim);
            const datasNaoUteis = datasCorrida.Where(x =>
                x.DayOfWeek === d.EnumDiaSemana.Domingo ||
                x.DayOfWeek === d.EnumDiaSemana.Sabado ||
                feriados.Contains(x, new DataIgual()));
            return datasNaoUteis;
        }

        public static RetoranrDataCorridas(dateInicio: Date, dataFim: Date): List<Date>
        {
            const datas = new List<Date>();
            for (let data = dateInicio; data <= dataFim; data = data.AddDays(1))
            {
                datas.Add(data);
            }
            return datas;
        }

        public static RetornarUltimoDiaMes(ano: number, mes: d.EnumMes): number
        {
            return new Date(ano, mes, 0).Day;
        }

        public static RetornarDataFim(tipoData: d.EnumTipoData): Date
        {
            const diferenca = DataHoraUtil.RetornarDiferencaAnoFim(tipoData);
            return new Date().DataZeroHora.AddYears(diferenca);
        }

        public static RetornarDataInicio(tipoData: d.EnumTipoData): Date
        {
            const diferenca = DataHoraUtil.RetornarDiferencaAnoInicio(tipoData);
            return new Date().DataZeroHora.AddYears(diferenca);
        }

        public static RetornarAnoInicio(tipoData: d.EnumTipoData)
        {
            const anoAtual = new Date().AddDays(1).DataZeroHora.getFullYear();
            const diferencao = DataHoraUtil.RetornarDiferencaAnoInicio(tipoData);
            return anoAtual + diferencao;
        }

        public static RetornarAnoFim(tipoData: d.EnumTipoData)
        {
            const anoAtual = new Date().AddDays(1).DataZeroHora.getFullYear();
            const diferencao = DataHoraUtil.RetornarDiferencaAnoFim(tipoData);
            return anoAtual + diferencao;
        }

        private static RetornarDiferencaAnoFim(tipoData: d.EnumTipoData)
        {
            switch (tipoData)
            {
                case d.EnumTipoData.Normal:
                case d.EnumTipoData.DataMuitoFutura:
                    return 100;
                case d.EnumTipoData.DataNascimento:
                    return 0;
                case d.EnumTipoData.DataFutura:
                case d.EnumTipoData.DataPassadoFuturo:
                    return 20;
                case d.EnumTipoData.DataFuturaProxima:
                case d.EnumTipoData.DataPassadoFuturoProximo:

                    return 5;

                case d.EnumTipoData.DataPassadoRecente:
                case d.EnumTipoData.DataPassado:
                case d.EnumTipoData.DataMuitoPassado:

                    return 0;

                default:

                    throw new Erro("O tipo da data não é suporto");
            }
        }

        private static RetornarDiferencaAnoInicio(tipoData: d.EnumTipoData)
        {
            switch (tipoData)
            {
                case d.EnumTipoData.Normal:
                case d.EnumTipoData.DataMuitoPassado:
                    return -100;
                case d.EnumTipoData.DataNascimento:
                    return -120;
                case d.EnumTipoData.DataFutura:
                case d.EnumTipoData.DataFuturaProxima:
                case d.EnumTipoData.DataMuitoFutura:
                    return 0;
                case d.EnumTipoData.DataPassado:
                case d.EnumTipoData.DataPassadoFuturo:
                    return -20;

                case d.EnumTipoData.DataPassadoRecente:
                    return -5;
                default:

                    throw new Erro("O tipo da data não é suporto");
            }
        }

        public static SaoIgual(dataHora1: Date, dataHora2: Date, opcoesData: OpcoesCompararData, opcoesHora: OpcoesCompararHora): boolean
        {
            let resultado = true;

            switch (opcoesData)
            {
                case OpcoesCompararData.Data:

                    resultado = dataHora1.Year === dataHora2.Year &&
                        dataHora1.Month === dataHora2.Month &&
                        dataHora1.Day === dataHora2.Day;
                    break;

                case OpcoesCompararData.Dia:

                    resultado = dataHora1.Day === dataHora2.Day;
                    break;

                case OpcoesCompararData.DiaMes:

                    resultado = dataHora1.Day === dataHora2.Day &&
                        dataHora1.Month === dataHora2.Month;
                    break;

                case OpcoesCompararData.MesAno:

                    resultado = dataHora1.Year === dataHora2.Year &&
                        dataHora1.Month === dataHora2.Month;
                    break;
                case OpcoesCompararData.Ignorar:

                    resultado = true;
                    break;

                default:

                    throw new ErroNaoSuportado(`Opções data não suportado ${EnumUtil.RetornarDescricao(OpcoesCompararData, opcoesData)} `);
            }
            if (!resultado)
            {
                return resultado;
            }
            switch (opcoesHora)
            {
                case OpcoesCompararHora.Padrao:
                case OpcoesCompararHora.HoraMinutoSegundo:

                    resultado = dataHora1.Hour === dataHora2.Hour &&
                        dataHora1.Minute === dataHora2.Minute &&
                        dataHora1.Second === dataHora2.Second;

                    break;

                case OpcoesCompararHora.HoraMinuto:

                    resultado = dataHora1.Hour === dataHora2.Hour &&
                        dataHora1.Minute === dataHora2.Minute;

                    break;

                case OpcoesCompararHora.HoraMinutoSegundosMilesegundos:

                    resultado = dataHora1.Hour === dataHora2.Hour &&
                        dataHora1.Minute === dataHora2.Minute &&
                        dataHora1.Second === dataHora2.Second &&
                        dataHora1.Millisecond === dataHora2.Millisecond;
                    break;

                case OpcoesCompararHora.Ignorar:

                    resultado = true;
                    break;

                default:

                    throw new ErroNaoSuportado(`Opções hora não suportado ${EnumUtil.RetornarDescricao(OpcoesCompararHora, opcoesHora)}`);
            }
            return resultado;
        }

        public static IsFimSemana(diaSemana: d.EnumDiaSemana): boolean
        {
            return diaSemana === d.EnumDiaSemana.Sabado ||
                diaSemana === d.EnumDiaSemana.Domingo;
        }

        public static NormalizarDataHoraString(dataString: string): string
        {
            return dataString.trim().
                ReplaceAll("\\", "/").
                ReplaceAll("-", "/").
                Replace("T", " ");
        }

        public static ExtrairDataString(dataString: string, isIgnorarErro: boolean): [ano: number, mes: number, dia: number]
        {
            const partes = dataString.split("/");
            const [parte1, parte2, parte3] = [ConverterUtil.ParaInteiro(partes[0], true),
            ConverterUtil.ParaInteiro(partes[1], true),
            ConverterUtil.ParaInteiro(partes[2], true)];

            if (partes.length === 3 && parte1 > 0 && parte2 > 0 && parte3 > 0)
            {
                if (parte1 >= 1900)
                {
                    return [parte1, parte2, parte3];
                }

                if (parte1 >= 1900)
                {
                    return [parte1, parte2, parte3];
                }

                switch ($Configuracao.FormatoData)
                {
                    case EnumFormatoData.DMY:

                        return [parte3, parte2, parte1];

                    case EnumFormatoData.MDY:

                        return [parte3, parte1, parte2];

                    default:
                        throw new Erro("Formato da data não suportado");
                }
            }


            if (isIgnorarErro)
            {
                const agora = new Date();
                const [parte1, parte2] = [parseInt(partes[0]), parseInt(partes[1]), parseInt(partes[2])];
                if (parte1 > 1900)
                {
                    return [parte1, parte2 ?? agora.Month, parte3 ?? agora.Day];
                }

                switch ($Configuracao.FormatoData)
                {
                    case EnumFormatoData.DMY:

                        return [parte1 ?? agora.Day, parte2 ?? agora.Month, parte3 ?? agora.Year];

                    case EnumFormatoData.MDY:

                        return [parte1 ?? agora.Month, parte2 ?? agora.Day, parte3 ?? agora.Year];

                    default:

                        throw new Erro("Formato da data não suportado");
                }

            }

            throw new Erro(`Não foi possível extrair a data da string ${dataString}`);
        }

        public static ExtrairHoraString(horaString: string): [hora: number, minuto: number, segundo: number, milisegundo: number]
        {
            if (String.IsNullOrWhiteSpace(horaString))
            {
                return [0, 0, 0, 0];
            }

            const partes = horaString.split(":");
            let hora: number = 0, minuto: number = 0, segundo: number = 0, milisegundo: number = 0;

            if (horaString.Contains("."))
            {
                milisegundo = u.ConverterUtil.ParaInteiro(horaString.split(".").Last());
            }

            if (partes.length === 4)
            {
                milisegundo = u.ConverterUtil.ParaInteiro(partes[3]);
            }

            if (partes.length > 2)
            {
                segundo = u.ConverterUtil.ParaInteiro(partes[2]);
            }

            if (partes.length > 1)
            {
                minuto = u.ConverterUtil.ParaInteiro(partes[1]);
            }
            if (partes.length > 0)
            {
                hora = u.ConverterUtil.ParaInteiro(partes[0]);
            }
            return [hora, minuto, segundo, milisegundo];
        }

        public static ConverterMilisegundosParaDataHora(totalMilisegundosJS: number): Date
        {
            if (typeof totalMilisegundosJS === "number" && totalMilisegundosJS !== 0)
            {
                return new Date(totalMilisegundosJS);
            }
            return null;
        }
        public static RetornarHashDia(): string 
        {
            const hoje = new Date();
            return md5(`${hoje.getFullYear() - hoje.getMonth() - hoje.getDate()}`);
        }

        public static RetornarHashHora(intervaloHora = 1): string 
        {
            const hoje = new Date();
            const hora = Math.floor(hoje.getHours() / intervaloHora) * intervaloHora;
            return md5(`${hoje.getFullYear() - hoje.getMonth() - hoje.getDate() - hora}`);
        }

        public static Maior(data1: Date, data2: Date): Date
        {
            return data1 > data2 ? data1 : data2;
        }

        public static Menor(data1: Date, data2: Date): Date
        {
            return data1 < data2 ? data1 : data2;
        }
    }


    export class DiaMesIgual implements IEqualityComparer<Date>
    {
        public Equals(x: Date, y: Date): boolean
        {
            return x.Month === y.Month && x.Day === y.Day;
        }

        public GetHashCode(obj: Date): number
        {
            return obj.Month * 1000 + obj.Day * 1000;
        }
    }

    export class DataIgual implements IEqualityComparer<Date>
    {
        public Equals(x: Date, y: Date): boolean
        {
            return x.Year === y.Year &&
                x.Month === y.Month &&
                x.Day === y.Day;
        }

        public GetHashCode(obj: Date): number
        {
            return (obj.Month * 10000) +
                (obj.Day * 1000) +
                (obj.Year * 100);
        }
    }



}

namespace Snebur
{
    export enum EnumTipoData
    {
        Local,
        Utc
    }

    export enum EnumFormatoData
    {
        DMY,
        MDY
    }
}