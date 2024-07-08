namespace Snebur.UI
{
    export abstract class BasePropriedadeCor extends PropriedadeApresentacao<EnumCor | EnumTonalidade | string>
    {
        private _atributoCor: AtributoHtml;
        private _atributoTonalidade: AtributoHtml;

        public get AtributoCor(): AtributoHtml
        {
            return this._atributoCor;
        }

        public get AtributoTonalidade(): AtributoHtml
        {
            return this._atributoTonalidade;
        }

        public abstract readonly PrefixoCor: EnumPrefixoCor;
        public abstract readonly NomePropriedadeEstiloDom: EnumEstiloCor;

        public constructor(atributoTonalidade: AtributoHtml, atributoCor: AtributoHtml)
        public constructor(atributoCor: AtributoHtml, atributoTonalidade: AtributoHtml)
        public constructor(atributo1: AtributoHtml, atributo2: AtributoHtml)
        {
            super(atributo1, atributo2);

            if (atributo1.Nome.Contains("tonalidade"))
            {
                this._atributoTonalidade = atributo1;
                this._atributoCor = atributo2;
            }
            else
            {
                this._atributoTonalidade = atributo2;
                this._atributoCor = atributo1;
            }
        }

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, valorApresentacao: string | EnumCor): string
        {
            const cor = EnumUtil.RetornarDescricao(EnumCor, valorApresentacao, true);
            if (cor == null)
            {
                return valorApresentacao as string;
            }
            return cor;
        }

        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): string | EnumCor
        {
            if (valorDom == null)
            {
                return EnumCor.Vazio;
            }
            return valorDom;
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorApresentacao: string | EnumCor): void
        {
            const elementoApresentacao = componenteApresentacao.ElementoApresentacao;
            const cor = this.RetornarCor(componenteApresentacao);
            CssClassUtil.RemoverClssClasseComecaCom(elementoApresentacao, this.PrefixoCor);
            (elementoApresentacao as any)[this.NomePropriedadeEstiloDom] = String.Empty;

            if (ValidacaoUtil.IsDefinido(cor))
            {
                if (this.IsValorEnumDefinido(EnumCor, cor as EnumCor))
                {
                    const tonalidade = this.RetornarTonalidade(componenteApresentacao);
                    const classeCor = CorUtil.RetornarClasseCssCor(this.PrefixoCor, cor as EnumCor, tonalidade);

                    if (!String.IsNullOrWhiteSpace(classeCor))
                    {
                        elementoApresentacao.classList.add(classeCor);
                    }
                }
                else
                {
                    (elementoApresentacao.style as any)[this.NomePropriedadeEstiloDom] = cor;
                }
            }
        }

        private RetornarCor(componenteApresentacao: ComponenteApresentacao): EnumCor | string
        {
            const valorDom = this.RetornarValorAtributoDom(componenteApresentacao, this.AtributoCor);
            if (!String.IsNullOrEmpty(valorDom))
            {
                const corEnum = this.RetornarValorEnum(EnumCor, valorDom);
                if (this.IsValorEnumDefinido(EnumCor, corEnum))
                {
                    return corEnum;
                }
                return valorDom;
            }
            return null;
        }

        private RetornarTonalidade(componenteApresentacao: ComponenteApresentacao): EnumTonalidade
        {
            const valorDom = this.RetornarValorAtributoDom(componenteApresentacao, this.AtributoTonalidade);
            if (!String.IsNullOrEmpty(valorDom))
            {
                return this.RetornarValorEnum(EnumTonalidade, valorDom);
            }
            return null;
        }

        private RetornarValorEnum(construtorEnum: any, valor: string): any
        {
            if (u.EnumUtil.IsDefindo(construtorEnum, valor))
            {
                return u.EnumUtil.RetornarValor(construtorEnum, valor);
            }
            return null;
        }

        private IsValorEnumDefinido(construtorEnum: any, valor: string | number): boolean
        {
            return u.EnumUtil.IsDefindo(construtorEnum, valor as any);
        }

    }

}