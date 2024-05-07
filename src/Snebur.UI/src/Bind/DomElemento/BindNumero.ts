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
        private IsFormatarInteiro: boolean;
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
            this.IsFormatarInteiro = this.RetornarValorAtributoBoolean(AtributosHtml.IsFormatarInteiro, false);

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

        protected override RetornarValorPropriedade(): any
        {
            const valorPropriedade = super.RetornarValorPropriedade();
            if (valorPropriedade == null &&
                (this.PropriedadeLigacao == null || this.PropriedadeLigacao?.AceitaNulo))
            {
                return null;
            }

            const valor = NormalizacaoUtil.NormalizarIntervalo(ConverterUtil.ParaNumero(valorPropriedade), this.Minimo, this.Maximo);
            return NormalizacaoUtil.NormalizarPasso(valor, this.Passo);
        }

        protected override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (String.IsNullOrWhiteSpace(valorPropriedade))
            {
                return null;
            }

            return FormatacaoUtil.FormatarMelhorDecimal(valorPropriedade,
                this.Minimo,
                this.Maximo,
                this.Passo,
                this.CasasDigitos,
                this.IsFormatarInteiro );

        }


        public override RetornarValorConvertidoParaPropriedade(valorDom: string): number
        {
            if (String.IsNullOrWhiteSpace(valorDom) ||
                (this.PropriedadeLigacao == null || this.PropriedadeLigacao?.AceitaNulo))
            {
                return null;
            }
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