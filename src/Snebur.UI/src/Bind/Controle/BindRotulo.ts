
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
            const rotulo = u.ConverterUtil.ParaString(novoValor);
            if (rotulo === "páginas" || rotulo === "lâminas" || rotulo === "teste")
            {
                const xxxx = "";
            }
            ((this.Controle as any) as ControleRotulo).Rotulo = rotulo;
        }
    }
}