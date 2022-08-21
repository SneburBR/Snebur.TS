namespace Snebur.UI
{
    export class BindVisibilidade extends BaseBind
    {
        private readonly ComponenteApresentacao: ComponenteApresentacao;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.Visibilidade, valorAtributo);
            this.ComponenteApresentacao = this.RetornarComponeteApresentacao();
        }

        public ValorPropriedadeAlterado(antigoValor: EnumVisibilidade, novoValor: EnumVisibilidade): void
        {
            if (typeof novoValor === "boolean" || u.EnumUtil.IsDefindo(EnumVisibilidade, novoValor))
            {
                if (this.ComponenteApresentacao instanceof ComponenteApresentacao)
                {
                    this.ComponenteApresentacao.Visibilidade = novoValor;
                    /*u.ReflexaoUtil.AtribuirValorPropriedade(this.Controle, "Visibilidade", novoValor)*/
                }
                else
                {
                    EstiloUtil.AtualizarVisibilidade(this.Elemento, novoValor);
                }
            }
            //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
        }

        protected overrideRetornarFormatar(): string
        {
            return null;
        }

    }
}