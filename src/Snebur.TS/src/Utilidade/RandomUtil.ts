namespace Snebur.Utilidade
{
    export class RandomUtil
    {
        public static RetornarRandom(): number
        public static RetornarRandom(maximo: number): number
        public static RetornarRandom(minimo: number, maximo: number): number
        public static RetornarRandom(p1?: number, p2?: number): number
        {
            let minimo: number = 0;
            let maximo: number = Number.Int64MaxValue;

            if (u.ValidacaoUtil.IsNumber(p1) && u.ValidacaoUtil.IsNumber(p2))
            {
                minimo = u.ConverterUtil.ParaNumero(p1);
                maximo = u.ConverterUtil.ParaNumero(p2);
            }
            else if (u.ValidacaoUtil.IsNumber(p1))
            {
                maximo = u.ConverterUtil.ParaNumero(p1);
            }
            return Math.floor(Math.random() * (1 + maximo - minimo)) + minimo;
        }
    }
}