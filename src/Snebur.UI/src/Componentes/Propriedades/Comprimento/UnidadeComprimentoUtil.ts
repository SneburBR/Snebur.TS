namespace Snebur.UI
{
    export class UnidadeComprimentoUtil
    {
        public static RetornarValorCalculado(valorPorcentagem: number, unidadesComprimento: List<UnidadeComprimento>): string
        public static RetornarValorCalculado(valorPorcentagem: number, unidadesComprimento: List<UnidadeComprimento>, divisor: number): string
        public static RetornarValorCalculado(valorPorcentagem: number, unidadesComprimento: List<UnidadeComprimento>, divisor: number = 1): string
        {
            const somaPorcentagem = unidadesComprimento.Where(x => x && x.TipoUnidade === EnumTipoUnidade.Porcentagem).Sum(x => x.Valor);
            const somaPixels = unidadesComprimento.Where(x => x.TipoUnidade === EnumTipoUnidade.Pixel).Sum(x => x.Valor);

            const porcentagem = (100 - somaPorcentagem) / divisor;
            return `calc(${porcentagem}% - ${(somaPixels / divisor).ToRems()})`;
        }
    }
}
