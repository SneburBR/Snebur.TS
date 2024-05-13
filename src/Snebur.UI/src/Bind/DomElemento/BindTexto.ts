namespace Snebur.UI
{
    export class BindTexto extends BindDomElemento
    {

        public readonly FormatatoMascara: string;
        public readonly Formatacao: string;
        public readonly Mascara: BaseMascara;
        private IsNaoFormatarValorVazio: boolean;

        private __IdentificadorIntervaloFormatacaoDataHoraSemantico: number;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindTexto, valorAtributo);
            //this.AdicionarHandlerOnBlur();

            this.FormatatoMascara = this.RetornarValorAtributo(AtributosHtml.Mascara, String.Empty).toLowerCase();
            this.Formatacao = this.RetornarValorAtributo(AtributosHtml.Formatar, String.Empty).toLowerCase();
            this.IsNaoFormatarValorVazio = this.RetornarValorAtributoBoolean(AtributosHtml.IsNaoFormatarValorVazio, false);

            if (!String.IsNullOrWhiteSpace(this.FormatatoMascara))
            {
                this.Mascara = MascaraUtil.RetornarMascara(this.ControlePai, elemento, this.FormatatoMascara);
                this.Mascara.EventoValorMascaraAlterado.AddHandler(this.Marcara_ValorAlterado, this);
                this.Formatacao = this.FormatatoMascara;
                this.Mascara.InicializarMascara();
            }
        }

        protected override DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            super.DataSource_Alterado(provedor, e);
        }

        protected Marcara_ValorAlterado(provedor: any, e: MascaraAlteradaEventArgs)
        {
            this.ElementoInput_ValorDomAlterado(e.EventoNativo);

            if (this.ControlePai instanceof BaseControleFormulario)
            {
                this.ControlePai.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(this.ValorPropriedade));
            }

            if (this.ControlePai instanceof Texto)
            {
                this.ControlePai.InicializarLegendaAsync();
            }
        }

        /*private static Contador = 0;*/
        protected override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (this.IsValorNormalizado)
            {
                return valorPropriedade;
            }

            if ((valorPropriedade === 0 || valorPropriedade == null) && this.IsNaoPermitirValorZero)
            {
                return String.Empty;
            }

            if (!String.IsNullOrWhiteSpace(this.Formatacao))
            {
                if (this.Formatacao === EnumFormatacao.DataHoraSemantica)
                {
                    /*BindTexto.Contador += 1;*/
                    this.InicializarIntervaloTempoSemantico();
                }
                return u.FormatacaoUtil.Formatar(
                    valorPropriedade,
                    this.Formatacao,
                    false, 
                    this.IsNaoFormatarValorVazio);
            }

            if ((this.PropriedadeLigacao instanceof r.Propriedade))
            {
                if (this.PropriedadeLigacao.Tipo instanceof r.TipoEnum)
                {
                    const construtorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(this.PropriedadeLigacao.Tipo);
                    return u.EnumUtil.RetornarRotulo(construtorEnum, u.ConverterUtil.ParaNumero(valorPropriedade));
                }
            }

            if (this.ControlePai instanceof CaixaQuantidade  )
            {
                throw new ErroOperacaoInvalida(`O bind da CaixaQuantidade deve ser BindNumero`);
                /*return this.ControlePai.NormalizarValor(valorPropriedade).toString();*/
            }

            return super.RetornarValorConvertidoParaDom(valorPropriedade);
        }

        private InicializarIntervaloTempoSemantico(): void
        {
            if (!this.__IdentificadorIntervaloFormatacaoDataHoraSemantico)
            {
                if (u.ValidacaoUtil.IsDate(this.ValorPropriedade))
                {
                    const intervalorTempoSemantico = this.RetornarIntervaloTempoSemantico();
                    if (intervalorTempoSemantico > 0)
                    {
                        this.__IdentificadorIntervaloFormatacaoDataHoraSemantico = window.setInterval(this.AtualizarFormatacaoDataHoraSemantico.bind(this), intervalorTempoSemantico);
                    }
                }
                else
                {
                    window.clearInterval(this.__IdentificadorIntervaloFormatacaoDataHoraSemantico);
                }
            }
        }

        private AtualizarFormatacaoDataHoraSemantico(): void
        {
            if (!this.IsDispensado)
            {
                this.AtribuirValorDom(this.ValorPropriedade);
            }
        }

        private RetornarIntervaloTempoSemantico(): number
        {
            const dataTipada = u.ConverterUtil.ParaData(this.ValorPropriedade);
            const agora = new Date();
            if (dataTipada > agora.AddDays(-1) && dataTipada < agora.AddDays(1))
            {
                const diferenca = TimeSpan.FromDates(dataTipada, agora, true);
                if (diferenca.TotalSeconds < 60)
                {
                    return TimeSpan.FromSeconds(30).TotalMilliseconds;
                }
                return TimeSpan.FromMinutes(1).TotalMilliseconds;
            }
            return -1;
        }

        public override Dispose()
        {
            if (typeof this.__IdentificadorIntervaloFormatacaoDataHoraSemantico === "number")
            {
                window.clearInterval(this.__IdentificadorIntervaloFormatacaoDataHoraSemantico);
            }
            if (this.Mascara instanceof BaseMascara)
            {
                this.Mascara.Dispose();
            }
            super.Dispose();
        }
    }
}