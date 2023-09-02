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
            const elemento = this.Elemento;
            const destino = elemento.querySelector("ap-icone") ??
                elemento.querySelector(".material-icons") ??
                ElementoIconeUtil.RetornarElementoIcone(elemento, this.Controle);

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
