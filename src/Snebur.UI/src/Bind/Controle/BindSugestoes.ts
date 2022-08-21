
namespace Snebur.UI
{
    export class BindSugestoes extends BindControle<IControleSugestoes>
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindRotulo, valorAtributo);

            if (!Array.isArray(this.Controle.Sugestoes))
            {
                throw new Erro(`O controle ${controlePai.___NomeConstrutor} não implementa a interface IControleSugestoes`);
            }
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (Array.isArray(novoValor))
            {
                this.Controle.Sugestoes = novoValor;
            }
        }
    }

    export interface IControleSugestoes extends BaseControle
    {
        Sugestoes: List<any>;
    }
}