namespace Snebur.UI
{
    export class BindLogico extends BindControle<BotaoLogico>
    {
        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindImagens, valorAtributo);

            if (!(this.Controle instanceof BotaoLogico))
            {
                throw new Erro("O bind logico é suportado apenas pelo controle BotaoLogico");
            }
            this.Controle.EventoValorAlterado.AddHandler(this.Controle_ValorAlterado, this);
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (ValidacaoUtil.IsDefinido(novoValor))
            {
                if (!ValidacaoUtil.IsBoolean(novoValor))
                {
                    throw new Erro(`O valor do bind lógico não é suportado ${novoValor?.GetType().Nome ?? novoValor}`);
                }

                /*eslint-disable*/
                if (this.Controle.IsSelecionado != novoValor)
                {
                    this.Controle.IsSelecionado = novoValor;
                }
                /*eslint-enable*/
            }

            //u.ReflexaoUtil.AtribuirValorPropriedade(this.Controle, "Imagens", novoValor)
        }

        private Controle_ValorAlterado(provedor: any, e: ValorAlteradoEventArgs)
        {
            this.AlterarValorPropriedade(this.Controle.IsSelecionado);

        }
    }
}
