namespace Snebur.UI
{
    export class BindIcone extends BaseBind
    {
        public readonly Controle: BaseControle;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.Icone, valorAtributo);
            this.Controle = this.ControlePai.ControlesFilho.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
        }

        public ValorPropriedadeAlterado(antigoValor: EnumIcone | number, novoValor: EnumIcone | number): void
        {
            const icone = this.RetornarIconeInterno(novoValor);
            const elementoApresentacao = this.Controle?.ElementoApresentacao ?? this.Elemento;
            const destino = ElementoIconeUtil.RetornarElementoIcone(elementoApresentacao, this.Controle);
            destino.innerHTML = icone;
        }

        private RetornarIconeInterno(novoValor: EnumIcone | number): string
        {
            if (u.EnumUtil.IsDefindo(EnumIcone, novoValor))
            {
                return IconeUtil.RetornarIconeDomMaterial(novoValor);
            }
            // eslint-disable-next-line eqeqeq
            if (novoValor != null && (novoValor as any) != "")
            {
                throw new Error(`O valor ${novoValor} não é um ícone válido.`);
            }
            return null;
        }
    }
}
