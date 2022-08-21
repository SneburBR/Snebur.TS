namespace Snebur.UI
{
    export class BindCssClasse extends BaseBind
    {
        public readonly OpcaoBindCssClasse: EnumOpcapBindCssClasse;
        public readonly PrefixoCssClasseAlterar: string;

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindCssClasse, valorAtributo);

            const valorAtributoOpacao = this.RetornarValorAtributo(AtributosHtml.OpcaoBindCssClasse);
            if (!String.IsNullOrWhiteSpace(valorAtributoOpacao))
            {
                this.OpcaoBindCssClasse = u.EnumUtil.RetornarValor(EnumOpcapBindCssClasse, valorAtributoOpacao);
                this.PrefixoCssClasseAlterar = this.RetornarValorAtributo(AtributosHtml.OpcaoBindCssclassePrefixoAlterar);
                if (this.OpcaoBindCssClasse === EnumOpcapBindCssClasse.Alterar)
                {
                    if (String.IsNullOrWhiteSpace(this.PrefixoCssClasseAlterar))
                    {
                        throw new Error(`O atributo ${AtributosHtml.OpcaoBindCssclassePrefixoAlterar.Nome} deve ser definido quando opção do bind for alterar a css classe`);
                    }
                }
            }
            else
            {
                this.OpcaoBindCssClasse = EnumOpcapBindCssClasse.Adicionar;
            }
        }

        protected override RetornarValorPropriedade(): any
        {
            return super.RetornarValorPropriedade();
        }

        protected ValorPropriedadeAlterado(antigoValor: any, novoValor: string): void
        {
            novoValor = u.ConverterUtil.ParaString(novoValor);

            const elemento = this.Elemento;
            const prefixo = this.RetornarPrefixoRemover(novoValor);
            if (prefixo != null)
            {
                EstiloUtil.RemoverClssClasseComecaCom(elemento, prefixo);
            }

            switch (this.OpcaoBindCssClasse)
            {
                case EnumOpcapBindCssClasse.Alterar:
                case EnumOpcapBindCssClasse.Adicionar:

                    if (!String.IsNullOrWhiteSpace(novoValor))
                    {
                        EstiloUtil.AdicionarCssClasse(elemento, novoValor);
/*                        elemento.classList.add(novoValor);*/
                    }
                    break;
                case EnumOpcapBindCssClasse.Substituir:

                    elemento.className = novoValor;
                    break;

                default:

                    throw new ErroNaoSuportado("A opção bind css classe não é suportado no controle", this.ControleApresentacao.___NomeConstrutor);
            }
        }
        private RetornarPrefixoRemover(novoValor: string): string
        {
            if (!String.IsNullOrWhiteSpace(this.PrefixoCssClasseAlterar))
            {
                return this.PrefixoCssClasseAlterar;
            }

            if (novoValor.Contains("--"))
            {
                return novoValor.substr(0, novoValor.indexOf("--") + 2);
            }
            return null;
        }
    }
}