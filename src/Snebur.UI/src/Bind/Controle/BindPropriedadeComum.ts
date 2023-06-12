namespace Snebur.UI
{
    export class BindPropriedadeComum extends BindControle
    {
        public readonly CaminhoPropriedadeControle: string;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string, nomePropriedade: string)
        {
            super(controlePai, elemento, AtributosHtml.BindPropriedade, valorAtributo);

            this.CaminhoPropriedadeControle = nomePropriedade;
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            const isIgnorarAtribuicao = this.Controle instanceof BaseTemplate;
            u.ReflexaoUtil.AtribuirValorPropriedade(this.Controle, this.CaminhoPropriedadeControle, novoValor, isIgnorarAtribuicao);
            //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
        }

       
    }
}