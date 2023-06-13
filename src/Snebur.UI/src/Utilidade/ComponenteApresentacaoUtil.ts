namespace Snebur.UI
{
    export class ComponenteApresentacaoUtil
    {
        public static RetornarElementosHtmlApresentacao(elemento: HTMLElement, isElementoFilho: boolean): Array<HTMLElement>
        {
            const elementos = new Array<HTMLElement>();
            if (elemento instanceof HTMLElement)
            {
                if (isElementoFilho && ComponenteApresentacaoUtil.IsComponenteApresentacao(elemento))
                {
                    elementos.Add(elemento);
                }
                else
                {
                    const len = elemento.children.length;
                    for (let i = 0; i < len; i++)
                    {
                        const elementoFilho = elemento.children[i] as HTMLElement;
                        if (!isElementoFilho || !ElementoControleUtil.IsElementoControle(elementoFilho))
                        {
                            elementos.AddRange(this.RetornarElementosHtmlApresentacao(elementoFilho, true));
                        }
                    }
                }
            }
            return elementos;
        }

        public static IsComponenteApresentacao(elemento: HTMLElement): boolean
        {
            return (elemento.tagName.substring(0, PREFIXO_TAG_ELEMENTO_APRESENTACAO.length) === PREFIXO_TAG_ELEMENTO_APRESENTACAO);
        }

        public static FiltrarComponenteFilho(
            componente: ComponenteApresentacao,
            filtro: (c: ComponenteApresentacao) => boolean): ComponenteApresentacao | null
        {
            if (filtro(componente))
            {
                return componente;
            }

            for (const componenteFilho of componente.ComponentesApresentacaoFilhos)
            {
                const componenteEntrado = ComponenteApresentacaoUtil.FiltrarComponenteFilho(componenteFilho, filtro);
                if (componenteEntrado != null)
                {
                    return componenteEntrado;
                }
            }
            return null;
        }
    }
}