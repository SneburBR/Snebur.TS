namespace Snebur.Utilidade
{
    export class BuscaUtil
    {
        public static EncontrarPalavraMaisSimilar(
            palavras: string[],
            busca: string): string
        {
            let palavraMaisSimilar = "";
            let maiorSimilaridade = 0;

            for (const palavra of palavras)
            {
                if (palavra === busca)
                {
                    return palavra;
                }

                const similaridade = BuscaUtil.CalcularSimilaridadeDeStrings(busca, palavra);

                if (similaridade > maiorSimilaridade)
                {
                    palavraMaisSimilar = palavra;
                    maiorSimilaridade = similaridade;
                }
            }
            return palavraMaisSimilar;
        }

        public static EncontrarObjetoPalavraMaisSimilar<T>(
            objetos: T[],
            funcaoRetornarPalavra: (item: T) => string[] | string,
            busca: string): ResultadoSimilaridade<T>
        {
            return BuscaUtil.EncontrarObjetoPalavraMaisSimilarInterno(
                objetos,
                funcaoRetornarPalavra,
                busca,
                true);
        }

        private static EncontrarObjetoPalavraMaisSimilarInterno<T>(
            objetos: T[],
            funcaoRetornarPalavra: (item: T) => string[] | string,
            buscaOriginal: string,
            isRemoverAcentos: boolean): ResultadoSimilaridade<T>
        {
            const busca = isRemoverAcentos ? TextoUtil.RemoverAcentos(buscaOriginal.toLowerCase()) : buscaOriginal;

            const objetosMaisSimilar = new List<T>();
            let palavraMasSimilar = "";
            let score = 0;

            for (const obj of objetos)
            {
                const palavras = BuscaUtil.RetornarPalavras(obj, funcaoRetornarPalavra, isRemoverAcentos);

                for (const palavra of palavras)
                {
                    const similaridade = BuscaUtil.CalcularSimilaridadeDeStrings(busca, palavra);
                    if (similaridade > score)
                    {
                        objetosMaisSimilar.Clear();
                        objetosMaisSimilar.Add(obj);
                        score = similaridade;
                        palavraMasSimilar = palavra;
                    }
                    else if (similaridade > 0 && similaridade === score)
                    {
                        objetosMaisSimilar.Add(obj);
                    }
                }
            }

            if (objetosMaisSimilar.Count > 1)
            {
                if (isRemoverAcentos)
                {
                    return BuscaUtil.EncontrarObjetoPalavraMaisSimilarInterno(objetos,
                        funcaoRetornarPalavra,
                        buscaOriginal,
                        false);
                }
            }

            return new ResultadoSimilaridade(
                objetosMaisSimilar.FirstOrDefault(),
                palavraMasSimilar,
                score);
        }

        private static RetornarPalavras<T>(obj: T, funcaoRetornarPalavra: (item: T) => string[] | string, isRemoverAcentos: boolean): string[]
        {
            if (isRemoverAcentos)
            {
                const palavras = funcaoRetornarPalavra(obj);
                if (typeof palavras === "string") 
                {
                    return [TextoUtil.RemoverAcentos(palavras.toLowerCase())];
                }
                return palavras.Select(x => TextoUtil.RemoverAcentos(x.toLowerCase()));
            }
            const palavras = funcaoRetornarPalavra(obj);
            if (typeof palavras === "string") 
            {
                return [palavras];
            }
            return palavras;
        }

        private static CalcularSimilaridadeDeStrings(s1: string, s2: string): number
        {
            const comprimentoMaximo = Math.max(s1.length, s2.length);
            const distancia = BuscaUtil.DistanciaDeLevenshtein(s1, s2);
            return 1 - distancia / comprimentoMaximo;
        }

        private static DistanciaDeLevenshtein(s1: string, s2: string): number
        {
            const m = s1.length;
            const n = s2.length;
            const d = [];

            for (let i = 0; i <= m; i++)
            {
                d[i] = [i];
            }
            for (let j = 1; j <= n; j++)
            {
                d[0][j] = j;
            }

            for (let j = 1; j <= n; j++)
            {
                for (let i = 1; i <= m; i++)
                {
                    if (s1[i - 1] === s2[j - 1])
                    {
                        d[i][j] = d[i - 1][j - 1];
                    } else
                    {
                        d[i][j] = Math.min(
                            d[i - 1][j] + 1, // deletion
                            d[i][j - 1] + 1, // insertion
                            d[i - 1][j - 1] + 1 // substitution
                        );
                    }
                }
            }
            return d[m][n];
        }
    }



}
