namespace Snebur.UI
{
    export class BindSelecionadoAlternancia extends BindControle
    {

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindValorLogico, valorAtributo);

            this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.Elemento_Click.bind(this));
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            ((this.Controle as any) as ISelecionado).IsSelecionado = u.ConverterUtil.ParaBoolean(novoValor);
        }

        private Elemento_Click(): void
        {
            const valorAtual = u.ConverterUtil.ParaBoolean(this.ValorPropriedade);
            this.AlterarValorPropriedade(!valorAtual);
        }
    }
}