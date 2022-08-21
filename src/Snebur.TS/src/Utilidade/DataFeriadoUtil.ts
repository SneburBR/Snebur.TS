namespace Snebur.Utilidade
{
    export class DataFeriadoUtil
    {
        public static RetornarFeriadosIntervalo(dataInicio: Date, dataFim: Date): List<IFeriado>
        {
            dataInicio = dataInicio.DataZeroHora;
            dataFim = dataFim.DataZeroHora;

            const anoInicio = Math.min(dataInicio.Year, dataFim.Year);
            const anoFim = Math.min(dataInicio.Year, dataFim.Year);
            const retorno = new List<IFeriado>();
            for (let ano = anoInicio; ano <= anoFim; ano++)
            {
                const feriados = DataFeriadoUtil.RetornarFeriados(ano);
                const filtro = feriados.Where(x => x.Data <= dataInicio && x.Data <= dataFim);
                retorno.AddRange(filtro);
            }
            return retorno;

        }
        public static RetornarFeriados(ano: number): List<IFeriado>
        {
            const feriados = new Array<IFeriado>();
            const pascoa = DataFeriadoUtil.RetornarDataPascoa(ano);

            feriados.Add({
                Data: new Date(ano, 0, 1),
                Descricao: "Confraternização Universal"
            });

            feriados.Add({
                Data: pascoa.AddDays(-48),
                Descricao: "2º feira de Carnaval"
            });

            feriados.Add({
                Data: pascoa.AddDays(-47),
                Descricao: "Carnaval"
            });

            feriados.Add({
                Data: pascoa,
                Descricao: "Páscoa"
            });

            feriados.Add({
                Data: pascoa.AddDays(-2),
                Descricao: "6º feira Santa"
            });

            feriados.Add({
                Data: pascoa.AddDays(60),
                Descricao: "Corpus Christ"
            });

            feriados.Add({
                Data: new Date(ano, 3, 21),
                Descricao: "Tiradentes"
            });

            feriados.Add({
                Data: new Date(ano, 4, 1),
                Descricao: "Dia do Trabalhador"
            });

            feriados.push({
                Data: new Date(ano, 8, 7),
                Descricao: "Dia da Independência"
            });

            feriados.push({
                Data: new Date(ano, 9, 12),
                Descricao: "N. S. Aparecida (dias das crianças)"
            });

            feriados.push({
                Data: new Date(ano, 10, 2),
                Descricao: "Todos os santos (finados)"
            });

            feriados.push({
                Data: new Date(ano, 10, 15),
                Descricao: "Proclamação da República"
            });

            feriados.push({
                Data: new Date(ano, 11, 25),
                Descricao: "Natal"
            });

            return feriados;
        }

        public static RetornarDataPascoa(ano: number): Date
        {
            const a = ano % 19;
            const b = ano % 4;
            const c = ano % 7;
            const d = (19 * a + 24) % 30;
            const e = (2 * b + 4 * c + 6 * d + 5) % 7;
            const soma = d + e;

            let dia, mes: number;
            if (soma > 9)
            {
                dia = (d + e - 9);
                mes = 3;
            }
            else
            {
                dia = (d + e + 22);
                mes = 2;
            }
            return new Date(ano, mes, dia);
        }
    }

    export interface IFeriado
    {
        Data: Date;
        Descricao: string;
    }
}