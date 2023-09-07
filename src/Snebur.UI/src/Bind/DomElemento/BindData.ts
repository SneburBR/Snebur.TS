
namespace Snebur.UI
{
    export class BindData extends BindTexto
    {
        private _ultimoValorDomDataNull: string;

        public get ElementoInput(): HTMLInputElement
        {
            return this.Elemento as HTMLInputElement;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, valorAtributo);

            if (!(elemento instanceof HTMLInputElement &&
                (controlePai instanceof CaixaData || controlePai instanceof CaixaTexto)))
            {
                throw new Erro("O controle não é suportado");
            }
        }

        public override RetornarValorConvertidoParaDom(valorPropriedade: any): string
        {
            if (valorPropriedade == null)
            {
                if (this.ElementoInput != null &&
                    this.ElementoInput.value === this._ultimoValorDomDataNull)
                {
                    return this.ElementoInput.value;
                }
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
            if (this.PropriedadeLigacao.Tipo === String.GetType())
            {
                return valorDom;
            }

            if (u.ValidacaoUtil.IsDate(valorDom, true))
            {
                if (this.PropriedadeLigacao instanceof r.Propriedade)
                {
                    if (this.PropriedadeLigacao.Tipo === Date.GetType())
                    {
                        return ConverterUtil.ParaData(valorDom, $Configuracao.TipoData, true);
                    }

                    throw new Erro(`O BindData não é suportado para a Propriedade ${this.PropriedadeLigacao.Nome} do tipo ${this.PropriedadeLigacao.Tipo.Nome}`);
                }
                return ConverterUtil.ParaData(valorDom, $Configuracao.TipoData, true);
            }
            this._ultimoValorDomDataNull = valorDom;
            return null;
        }
    }
}