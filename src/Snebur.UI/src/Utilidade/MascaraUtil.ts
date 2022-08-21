namespace Snebur.UI
{
    export class MascaraUtil
    {
        public static RetornarMascara(controlePai:BaseControle, elemento:HTMLElement, formato:string) :BaseMascara
        {
            formato = formato.toLowerCase();

            switch (formato)
            {
                case "moeda": 

                    return new MascaraMoeda(controlePai, elemento, formato);

                case "telefone": 

                    return new MascaraTelefone(controlePai, elemento, formato);

                case "hora":

                    return new MascaraHora(controlePai, elemento, formato);
                    //return new MascaraFormatacao(controlePai, elemento, "##:##");

                case "cpfcnpj":

                    return new MascaraCpfCnpj(controlePai, elemento, formato);

                case "cartaocredito":

                    return new MascaraCartaoCredito(controlePai, elemento, formato);

                default: {

                    const formatacao = this.RetornarFormatacao(formato);
                    return new MascaraFormatacao(controlePai, elemento, formatacao);
                }
            }
        }

        private static RetornarFormatacao(formato: string): string
        {
            switch (formato)
            {
                case "data": {

                    return u.FormatacaoUtil.FORMATACAO_DATA;
                }
                case "datahora": {

                    return u.FormatacaoUtil.FORMATACAO_DATA_HORA;
                }
                case "telefone": {

                    return u.FormatacaoUtil.FORMATACAO_TELEFONE;
                }
                case "cep": {

                    return u.FormatacaoUtil.FORMATACAO_CEP;
                }
                case "cpf": {

                    return u.FormatacaoUtil.FORMATACAO_CPF;
                }
                case "cnpj": {

                    return u.FormatacaoUtil.FORMATACAO_CNPJ;
                }
                default: {
                    return formato;
                }
            }
        }
    }
}