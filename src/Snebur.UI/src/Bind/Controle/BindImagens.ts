namespace Snebur.UI
{
    export class BindImagens extends BindControle
    {
        public get ControleImagens(): ControleImagens
        {
            return this.Controle as ControleImagens;
        }
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindImagens, valorAtributo);

            if (!(this.Controle instanceof ControleImagens))
            {
                throw new Erro("O bind imagens é suportado apenas pelo controle imagens");
            }
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (novoValor instanceof Array)
            {
                this.ControleImagens.Imagens = novoValor;
            }
                //u.ReflexaoUtil.AtribuirValorPropriedade(this.Controle, "Imagens", novoValor)
        }

      
    }
}