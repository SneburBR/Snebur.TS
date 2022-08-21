namespace Snebur.UI
{
    export class BindIcone extends BaseBind
    {
        public readonly Controle: BaseControle;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.CorFundo, valorAtributo);
            this.Controle = this.ControlePai.ControlesFilho.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
        }

        public ValorPropriedadeAlterado(antigoValor: EnumIcone | number, novoValor: EnumIcone | number): void
        {
            const icone = this.RetornarIconeInterno(novoValor);

            const destino = this.Elemento.querySelector("ap-icone") ??
                this.Elemento.querySelector(".material-icons") ??
                this.Elemento;

            destino.innerHTML = icone;
        }

        private RetornarIconeInterno(novoValor: EnumIcone | number): string
        {
            if (u.EnumUtil.IsDefindo(EnumIcone, novoValor))
            {
                return IconeUtil.RetornarIconeDomMaterial(novoValor);
            }
            return null;
        }
    }
}
