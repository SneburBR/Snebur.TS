
namespace Snebur.UI
{
    export class BindProgresso extends BindControle
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindProgresso, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            ((this.Controle as any) as IProgresso).Progresso = u.ConverterUtil.ParaNumero(novoValor);
        }
    }
}