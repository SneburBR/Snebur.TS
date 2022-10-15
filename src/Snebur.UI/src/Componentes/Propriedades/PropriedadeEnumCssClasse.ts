namespace Snebur.UI
{
    export declare type TipoEnum = number | string;

    export abstract class PropriedadeEnumCssClasse<TEnum extends TipoEnum> extends PropriedadeApresentacao<TEnum>
    {
        protected abstract PREFIXO_CSS_CLASSE: string;
        protected abstract ConstrutorEnum: any;
        protected abstract ValorPadraoVazio: TEnum;
        protected IsAdicionarClassCssPadrao: boolean = false;
        protected IsAplicarElementoApresentacao: boolean = false;;

        protected RetornarValorParaAtributo(compronenteApresentacao: ComponenteApresentacao, valorEnum: TEnum): string
        {
            if (valorEnum === this.ValorPadraoVazio || valorEnum === BaseEnumApresentacao.Vazio)
            {
                return String.Empty;
            }
            return EnumUtil.RetornarDescricao(this.ConstrutorEnum, valorEnum as number);

        }
        protected RetornarValorParaComponente(compronenteApresentacao: ComponenteApresentacao, valorDom: string): TEnum
        {
            if (String.IsNullOrEmpty(valorDom))
            {
                return this.ValorPadraoVazio as TEnum;
            }

            if (!EnumUtil.IsDefindo(this.ConstrutorEnum, valorDom))
            {
                throw new Erro(`O valor do atributo ${valorDom} não está definido no Enum ${this.ConstrutorEnum.GetType().Nome}  em ${compronenteApresentacao.ControleApresentacao.___NomeConstrutor} `);
            }

            return EnumUtil.RetornarValor(this.ConstrutorEnum, valorDom);
        }

        protected AtualizarApresentacao(componenteApresentacao: ComponenteApresentacao, valorEnum: TEnum): void
        {
            const elemento = this.RetornarElementoRecipienteCssClass(componenteApresentacao);
            if (elemento != null)
            {
                EstiloUtil.RemoverClssClasseComecaCom(elemento, this.PREFIXO_CSS_CLASSE);

                if (valorEnum !== BaseEnumApresentacao.Vazio &&
                    (this.IsAdicionarClassCssPadrao || (valorEnum !== this.ValorPadraoVazio )))
                {
                    const sufixoCssClasse = this.RetornarSufixoCssClasseEnum(valorEnum);
                    if (!String.IsNullOrEmpty(sufixoCssClasse))
                    {
                        const cssClass = this.PREFIXO_CSS_CLASSE + sufixoCssClasse;
                        elemento.classList.add(cssClass);
                    }
                }
            }
        }

        protected abstract RetornarSufixoCssClasseEnum(valorEnum: TEnum): string;

        protected RetornarElementoRecipienteCssClass(componenteApresentacao: ComponenteApresentacao): HTMLElement
        {
            if (this.IsAplicarElementoApresentacao)
            {
                return componenteApresentacao.ElementoApresentacao;
            }
            return componenteApresentacao.Elemento;
        }

    }

}
