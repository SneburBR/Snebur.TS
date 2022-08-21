namespace Snebur.UI
{
    export abstract class BindControle<TComponente extends BaseControle = BaseControle> extends BaseBind
    {
        public override readonly Priority: number = 1;
        public readonly Controle: TComponente;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, atributo: AtributoHtml, valorAtributo: string)
        {
            super(controlePai, elemento, atributo, valorAtributo);

            this.Controle = this.RetornarComponeteApresentacao() as TComponente;

            const nomeControle = this.Controle?.GetType()?.Nome ?? "'não definido'";
            if (!(this.Controle instanceof ComponenteApresentacao))
            {
                throw new ErroNaoDefinido(`O controle ${nomeControle} elemento controle não foi encontrado- BindControle soh pode ser usado no elemento controle`, this);
            }
        }
    }
}