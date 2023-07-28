namespace Snebur.UI
{
    export class BindEnum extends BindDomElemento
    {
        private readonly CaminhoTipoEnum: string;
        private readonly ConstrutorEnum: object;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo:string)
        {
            super(controlePai, elemento, AtributosHtml.BindEnum, valorAtributo);

            this.CaminhoTipoEnum = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (String.IsNullOrWhiteSpace(this.CaminhoTipoEnum))
            {
                console.error(`O atributo ${AtributosHtml.Tipo.Nome} não foi definido. Apresentação : ${this.ControleApresentacao.___NomeConstrutor}.${controlePai.___NomeConstrutor}`);
                return;
            }
            this.ConstrutorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(this.CaminhoTipoEnum);
            if (!this.ConstrutorEnum)
            {
                console.error(`Não foi encontrado o enum '${this.CaminhoTipoEnum }' Apresentação: ${this.ControleApresentacao.___NomeConstrutor}.${controlePai.___NomeConstrutor}`);
            }
        }

        protected  override NormalizarValorPropriedade(valor: any): any
        {
            return valor;
        }

        protected override RetornarValorConvertidoParaPropriedade(valorDom: any): any
        {
            if (u.ValidacaoUtil.IsNumber(valorDom))
            {
                return u.ConverterUtil.ParaNumero(valorDom);
            }

            if (!String.IsNullOrWhiteSpace(valorDom))
            {
                const descricaoEnum = u.ConverterUtil.ParaString(valorDom);
                const valorEnum = u.EnumUtil.RetornarValor(this.ConstrutorEnum, descricaoEnum);
                return valorEnum;
            }
            return 0;
        }

        protected override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (u.ValidacaoUtil.IsNumber(valorPropriedade))
            {
                const valorEnum = u.ConverterUtil.ParaNumero(valorPropriedade);
                const rotulo = u.EnumUtil.RetornarRotulo(this.ConstrutorEnum, valorEnum);
                return super.NormalizarValorPropriedade(rotulo);
            }
            return String.Empty;
        }
    }
}