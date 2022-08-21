namespace Snebur.UI
{
    export class BindClass extends BaseBind
    {
        public readonly CssClass: string;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindClass, valorAtributo);

            if (valorAtributo.Contains("="))
            {
                const parteInicial = valorAtributo.split(",")[0];
                if (parteInicial.Contains("="))
                {
                    this.CssClass = parteInicial.split("=").First();
                }
            }

            if (this.CssClass == null)
            {
                console.error(`O bind class � invalido, Ex: 'sn-bind-class=sn-is-selecionado=<b>{{IsSelecionado}}</b>&sn-is-deletado=<b>{{IsDeletado}}</b>'`);
            }
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (this.CssClass != null)
            {
                const isAdicionar = typeof novoValor === "boolean" && novoValor === true;
                EstiloUtil.AtualizarCssClass(this.Elemento, this.CssClass, isAdicionar);
            }
        }
    }
}
