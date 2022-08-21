namespace Snebur.UI
{
    export abstract class BaseBindCor extends BaseBind
    {
        public readonly Controle: BaseControle;
        public readonly PrefixoCor: EnumPrefixoCor;
        public readonly Tonalidade: EnumTonalidade;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, atributo: AtributoHtml, valorAtributo: string)
        {
            super(controlePai, elemento, atributo, valorAtributo);

            this.Controle = this.ControlePai.ControlesFilho.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
            this.Tonalidade = this.RetornarTonalidade();
            this.PrefixoCor = this.RetornarPrefixoCor();
        }

        public ValorPropriedadeAlterado(antigoValor: EnumCor | string, novoValor: EnumCor | string): void
        {
            const elemento = this.Elemento;
            const classesCor = u.Util.CopiarArray<string>(elemento.classList).Where(x => x.StartsWith(this.PrefixoCor)).ToList();
            for (const classe of classesCor)
            {
                elemento.classList.remove(classe);
            }

            const classeCor = this.RetornarClasseCorInterno(novoValor);
            if (!String.IsNullOrWhiteSpace(classeCor))
            {
                elemento.classList.add(classeCor);
            }
        }

        private RetornarClasseCorInterno(novoValor: EnumCor | string): string
        {
            const valorString = novoValor.toString();
            if (u.EnumUtil.IsDefindo(EnumCor, valorString))
            {
                return CorUtil.RetornarClasseCssCor(this.PrefixoCor, novoValor as EnumCor, this.Tonalidade);
            }
            if (valorString.StartsWith(this.PrefixoCor))
            {
                return valorString;
            }
            return null;
        }

        private RetornarTonalidade(): EnumTonalidade
        {
            const tonalidadeString = this.RetornarValorAtributo(AtributosHtml.Tonalidade, "Padrao");
            return EnumUtil.RetornarValor(EnumTonalidade, tonalidadeString);
        }

        protected abstract RetornarPrefixoCor(): EnumPrefixoCor;
        //((this.Controle as any) as IProgresso)[this.CaminhoPropriedadeControle] = u.ConverterUtil.ParaNumero(novoValor);
    }
}
