
namespace Snebur.UI
{
    export class BindRotulo extends BindControle
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindRotulo, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            ((this.Controle as any) as ControleRotulo).Rotulo = u.ConverterUtil.ParaString(novoValor);
        }
    }
}