namespace Snebur
{
    Array.prototype.FindMostSimilarity = (function (this: Array<any>,
        expressao: Function,
        busca: string): ResultadoSimilaridade
    {
        if (!(expressao instanceof Function))
        {
            expressao = function (x: any) { return x; };
        }

        const igual = this.Where(x => expressao(x) == busca).FirstOrDefault();
        if (igual != null)
        {
            return igual;
        }

        return u.BuscaUtil.EncontrarObjetoPalavraMaisSimilar(
            this,
            expressao as (x: any) => string[],
            busca);

    });

    export class ResultadoSimilaridade<T = any>
    {
        public readonly Objeto: T;
        public readonly PalavraMaisSimular: string;
        public readonly Score: number;

        public constructor(obejto: T, palavraMaisSimular: string, score: number)
        {
            this.Objeto = obejto;
            this.PalavraMaisSimular = palavraMaisSimular;
            this.Score = score;
        }
    }
}
