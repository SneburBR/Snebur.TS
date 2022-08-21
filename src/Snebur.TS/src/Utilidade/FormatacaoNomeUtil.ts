
namespace Snebur.Utilidade
{
    export class FormatacaoNomeUtil
    {
        private static readonly ProposicoesNome = ["da", "de", "dos", "das"];

        public static RetornarPrimeiroNome(nome: string): string
        {
            if (typeof nome === "string") 
            {
                const primeiraParte = nome.trim().split(" ").First();
                return TextoUtil.FormatarPrimeiraLetraMaiuscula(primeiraParte);
            }
            return String.Empty;
        }

        public static Formatarnome(nome: string): string
        {
            const partes = FormatacaoNomeUtil.RetornarPartes(nome);
            return String.Join(" ", partes);
        }
         
        public static FormatarNomeSobrenome(nomeCompleto: string): [string, string]
        {
            const partesNomeCompleto = FormatacaoNomeUtil.RetornarPartes(nomeCompleto);
            const partesNome = new List<string>();
            const partesSobrenome = partesNomeCompleto.ToList(true);

            for (const parte of partesNomeCompleto)
            {
                partesNome.Add(parte);
                partesSobrenome.Remove(parte);

                if (!ValidacaoUtil.IsSomenteNumerosPontosSinais(parte))
                {
                    break;
                }
            }

            const primeiroNome = String.Join(" ", partesNome);
            const sobrenome = String.Join(" ", partesSobrenome);
            return [primeiroNome, sobrenome];

        }

        public static FormatarNomeCompleto(nome: string, sobrenome: string): string
        {
            const nomeCompleto = `${nome} ${sobrenome}`;
            const partes = FormatacaoNomeUtil.RetornarPartes(nomeCompleto);
            return FormatacaoNomeUtil.UnirPartes(partes);
        }

        private static RetornarPartes(nome: string): string[]
        {
            const partes = nome.Split(" ");
            return partes.Where(x => !String.IsNullOrEmpty(x)).
                Select(x => FormatacaoNomeUtil.FormatarParte(x.toLowerCase())).ToList();
        }

        private static UnirPartes(partes: string[]): string
        {
            const abreviacoes = partes.Where(x => FormatacaoNomeUtil.IsAbreviacao(x)).ToList();
            if (abreviacoes.Count === 0)
            {
                return String.Join(" ", partes.Distinct());
            }

            const partesUnicas = new List<string>();
            for (const parte of partes)
            {
                if (FormatacaoNomeUtil.IsAbreviacao(parte) ||
                    partesUnicas.Contains(parte))
                {
                    partesUnicas.Add(parte);
                }
            }
            return String.Join(" ", partes.Distinct());
        }

        private static IsAbreviacao(parte: string): boolean
        {
            return (parte.length === 2 && parte.charAt(1) === ".");
        }

        private static FormatarParte(parte: string): string
        {
            parte = parte.toLowerCase();
            if (FormatacaoNomeUtil.ProposicoesNome.Contains(parte))
            {
                return parte;
            }
            return TextoUtil.FormatarPrimeiraLetraMaiuscula(parte);
        }

    }
}
