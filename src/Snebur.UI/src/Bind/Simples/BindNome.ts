namespace Snebur.UI
{
    export class BindNome extends BaseBind
    {
        public readonly Componente: ComponenteApresentacao;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindNome, valorAtributo); 

            this.Componente = this.RetornarComponeteApresentacao();

            const nomeControle = this.Componente?.GetType()?.Nome ?? "'não definido'";
            if (!(this.Componente instanceof ComponenteApresentacao))
            {
                throw new ErroNaoDefinido(`O controle ${nomeControle} elemento controle não foi encontrado- BindControle soh pode ser usado no elemento controle`, this);
            }

        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            if (String.IsNullOrWhiteSpace(novoValor))
                return;

            this.Elemento.setAttribute(AtributosHtml.Nome.Nome, novoValor);
            (this.Componente as any).Nome = novoValor;
        }
    }
}
