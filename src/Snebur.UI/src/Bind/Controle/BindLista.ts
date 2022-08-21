
namespace Snebur.UI
{
    export class BindLista extends BindControle
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindLista, valorAtributo);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any = null): void
        {
            const controleLista = ((this.Controle as any) as IControleLista);
            if (typeof controleLista.Lista === "undefined")
            {
                const mensagem = `O  bind-lista não é suportado pelo controle ${controleLista.GetType().Nome},
                                    em '${this.ControleApresentacao.___NomeConstrutor}'
                                    Somente controle que implementam IControleLista são suportados `;
                throw new Erro(mensagem);
            }
            controleLista.Lista = novoValor;
        }
    }
}