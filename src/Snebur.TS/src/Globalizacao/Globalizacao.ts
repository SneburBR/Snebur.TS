namespace Snebur.Globalizacao
{
    export class Globalizacao
    {
        public IdiomaPadrao: Idioma;

        public constructor()
        {
        }

        public Inicializar(): void
        {
            this.IdiomaPadrao = new Idioma();
            this.IdiomaPadrao.Meses = this.RetornarMeses();
            this.IdiomaPadrao.DiasSemana = this.RetornarDiasSemana();
        }

        private RetornarMeses(): Meses
        {
            const meses = new Meses();
            meses.Janeiro = this.RetornarMes(1, "Janeiro", "Jan");
            meses.Fevereiro = this.RetornarMes(2, "Fevereiro", "Feb");
            meses.Marco = this.RetornarMes(3, "Março", "Mar");
            meses.Abril = this.RetornarMes(4, "Abril", "Abr");
            meses.Maio = this.RetornarMes(5, "Maio", "Mai");
            meses.Junho = this.RetornarMes(6, "Junho", "Jun");
            meses.Julho = this.RetornarMes(7, "Julho", "Jul");
            meses.Agosto = this.RetornarMes(8, "Agosto", "Ago");
            meses.Setembro = this.RetornarMes(9, "Setembro", "Set");
            meses.Outubro = this.RetornarMes(10, "Outubro", "Out");
            meses.Novembro = this.RetornarMes(11, "Novembro", "Nov");
            meses.Dezembro = this.RetornarMes(12, "Dezembro", "Dez");
            return meses;
        }

        private RetornarMes(posicao: number, nome: string, abrev: string): Mes
        {
            const mes = new Mes();
            mes.Nome = nome;
            mes.Abreviatura = abrev;
            mes.Posicao = posicao;
            return mes;
        }

        private RetornarDiasSemana(): DiasSemana
        {
            const diasSemana = new DiasSemana();
            diasSemana.Domingo = this.RetornarDiaSemana(1, "Domingo", "Dom");
            diasSemana.Segunda = this.RetornarDiaSemana(2, "Segunda", "Seg");
            diasSemana.Tarça = this.RetornarDiaSemana(3, "Terça-feira", "Seg");
            diasSemana.Quarta = this.RetornarDiaSemana(4, "Quarta-feira", "Seg");
            diasSemana.Quinta = this.RetornarDiaSemana(5, "Quinta-feira", "Seg");
            diasSemana.Sexta = this.RetornarDiaSemana(6, "Sexta-feira", "Seg");
            diasSemana.Sabado = this.RetornarDiaSemana(7, "Sábado", "Seg");
            return diasSemana;
        }

        private RetornarDiaSemana(posicao: number, nome: string, abreviatura: string): DiaSemana
        {
            const diaSemana = new DiaSemana();
            diaSemana.Nome = nome;
            diaSemana.Abreviatura = abreviatura;
            diaSemana.Posicao = posicao;
            return diaSemana;
        }
    }
}