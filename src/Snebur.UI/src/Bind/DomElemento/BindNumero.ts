namespace Snebur.UI
{
    export class BindNumero extends BindDomElemento
    {
        public static readonly PASSO_PADRAO = 0.1;
        public static readonly MINIMO_PADRAO = 0;
        public static readonly MAXIMO_PADRAO = Number.Int32MaxValue;

        private IsDecimal: boolean;
        private IsDecimal1: boolean;
        private IsInteiro: boolean;
        public Passo: number;
        private Minimo: number;
        private Maximo: number;
        private CasasDigitos: number;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindNumero, valorAtributo);
            //this.AdicionarHandlerOnBlur();

           
            const passo = this.RetornarValorAtributoNumber(AtributosHtml.Passo, BindNumero.PASSO_PADRAO);
            const minimo = this.RetornarValorAtributoNumber(AtributosHtml.Minimo, BindNumero.MINIMO_PADRAO);
            const maximo = this.RetornarValorAtributoNumber(AtributosHtml.Maximo, BindNumero.MAXIMO_PADRAO);

            this.AtualizarValores(passo, minimo, maximo);
        }

        public AtualizarValores(passo: number, minimo: number, maximo: number): void
        {
            this.IsDecimal = passo === 0.01;
            this.IsDecimal1 = passo === 0.1;
            this.IsInteiro = passo === 1;
            this.Passo = passo;
            this.Minimo = minimo;
            this.Maximo = maximo;

            const passoString = passo.toString();
            this.CasasDigitos = passoString.Contains(".") ? passoString.split(".").Last().length : 0;
        }

        protected override DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            super.DataSource_Alterado(provedor, e);
        }

        protected override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (valorPropriedade == null &&
                this.PropriedadeLigacao instanceof r.Propriedade &&
                this.PropriedadeLigacao.AceitaNulo)
            {
                return null;
            }
            const valorTipado = ConverterUtil.ParaNumero(valorPropriedade);
            let valor = this.RetornarValorInterno(valorTipado);
            valor = NormalizacaoUtil.NormalizarIntervalo(valor, this.Minimo, this.Maximo);
            return valor.toFixed(this.CasasDigitos);
        }

        public override RetornarValorConvertidoParaPropriedade(valorDom: string): number
        {
            const valorTipado = ConverterUtil.ParaNumero(valorDom);
            const retorno = this.RetornarValorInterno(valorTipado);
            return NormalizacaoUtil.NormalizarIntervalo(retorno, this.Minimo, this.Maximo);
        }

        private RetornarValorInterno(valor: number): number
        {
            if (this.IsInteiro)
            {
                return u.ConverterUtil.ParaInteiro(valor);
            }
            if (this.IsDecimal)
            {
                return u.ConverterUtil.ParaDecimal(valor);
            }
            if (this.IsDecimal1)
            {
                return u.ConverterUtil.ParaDecimal1(valor);
            }
            return FormatacaoUtil.FormatarPasso(valor, this.Passo, false);
        }

        public override Dispose()
        {
            super.Dispose();
        }
    }
}