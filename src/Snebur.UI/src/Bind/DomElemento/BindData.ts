
namespace Snebur.UI
{
    export class BindData extends BindTexto
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, valorAtributo);

            if (!(controlePai instanceof CaixaData))
            {
                throw new Erro("O controle não é suportado");
            }
        }

        public override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (valorPropriedade == null)
            {
                return String.Empty;
            }

            if (valorPropriedade instanceof Date ||
                typeof valorPropriedade === "string")
            {
                return u.FormatacaoUtil.FormatarData(valorPropriedade);
            }

            throw new Erro(`O tipo do valor propriedade  '${valorPropriedade.GetType().Nome}' não é suportado pelo BindData `);
        }

        public override RetornarValorConvertidoParaPropriedade(valorDom: string): Date | string
        {
            if (u.ValidacaoUtil.IsDate(valorDom, true))
            {
                if (this.PropriedadeLigacao instanceof r.Propriedade)
                {
                    if (this.PropriedadeLigacao.Tipo === Date.GetType())
                    {
                        return ConverterUtil.ParaData(valorDom, $Configuracao.TipoData, true);
                    }

                    if (this.PropriedadeLigacao.Tipo === String.GetType())
                    {
                        return valorDom;
                    }

                    throw new Erro(`O BindData não é suportado para a Propriedade ${this.PropriedadeLigacao.Nome} do tipo ${this.PropriedadeLigacao.Tipo.Nome}`);
                }
                return ConverterUtil.ParaData(valorDom, $Configuracao.TipoData, true);
            }
            return null;
        }
    }
}