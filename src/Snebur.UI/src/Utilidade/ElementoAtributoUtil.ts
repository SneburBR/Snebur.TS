namespace Snebur.UI
{
    export declare type FuncaoEntrarArvore = (elemento: Element) => boolean;

    export class ElementoAtributoUtil
    {

        public static RetornarElementosPossuiAtrubitoSnebur(elemento: HTMLElement, isInclurEsteElemento: boolean = false, isVarrerFilhos: boolean = true): DicionarioSimples<Array<HTMLElement>>
        {
            //var elemento = baseUIElemento.Elemento;
            //if (!(funcaoEntrarArvore instanceof Function))
            //{
            //    funcaoEntrarArvore = ElementoAtributoUtil.EntrarArvore;
            //}
            const dicionario = new DicionarioSimples<Array<HTMLElement>>();
            if (isInclurEsteElemento)
            {
                ElementoAtributoUtil.VarrerElementosFilhosPossuiSnebur(
                    dicionario,
                    elemento,
                    ElementoAtributoUtil.EntrarArvore );
            }

            if (isVarrerFilhos)
            {
                const len = elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const elementoFilho = elemento.childNodes[i];
                    if (elementoFilho instanceof Element)
                    {
                        ElementoAtributoUtil.VarrerElementosFilhosPossuiSnebur(
                            dicionario,
                            elementoFilho,
                            ElementoAtributoUtil.EntrarArvore );
                    }
                }
            }
            return dicionario;
        }

        private static VarrerElementosFilhosPossuiSnebur(dicionario: DicionarioSimples<Array<Element>>, elemento: Element, funcaoEntrarArvore: FuncaoEntrarArvore): void
        {
            if (!u.ValidacaoUtil.IsDefinido(funcaoEntrarArvore))
            {
                funcaoEntrarArvore = ElementoAtributoUtil.EntrarArvore;
            }
            const len = elemento.attributes.length;
            if ( elemento.hasAttribute(AtributosHtml.IsControleFlutuante.Nome))
            {
                return;
            }

            for (let i = 0; i < len; i++)
            {
                const atributo = elemento.attributes[i];
                if (atributo != null)
                {
                    const nomeAtributo = atributo.name;
                    if (typeof nomeAtributo === "string")
                    {
                        if (nomeAtributo.StartsWith(PREFIXO_ATRIBUTO_SNEBUR) ||
                            nomeAtributo.StartsWith(PREFIXO_ATRIBUTO_APRESENTACAO))
                        {
                            if (!dicionario.ContainsKey(nomeAtributo))
                            {
                                dicionario.Adicionar(nomeAtributo, new Array<HTMLElement>());
                            }
                            dicionario.Item(nomeAtributo).Add(elemento);
                        }
                    }
                }
            }
            if (funcaoEntrarArvore(elemento))
            {
                const len = elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const node = elemento.childNodes[i];
                    if (node instanceof Element)
                    {
                        const elementoFilho: Element = node as Element;
                        this.VarrerElementosFilhosPossuiSnebur(dicionario, elementoFilho, funcaoEntrarArvore);
                    }
                }
            }
        }

        public static RetornarElementosPossuiAtrubito(baseElemento: BaseUIElemento, atrubito: AtributoHtml): Array<HTMLElement>;
        public static RetornarElementosPossuiAtrubito(baseElemento: BaseUIElemento, atrubito: AtributoHtml, valorAtributo?: string, funcaoEntrarArvore?: FuncaoEntrarArvore): Array<HTMLElement>;
        public static RetornarElementosPossuiAtrubito(baseElemento: BaseUIElemento, atrubito: AtributoHtml, valorAtributo?: string, funcaoEntrarArvore?: FuncaoEntrarArvore): Array<HTMLElement>
        {
            const elemento = baseElemento.Elemento;
            if (!(funcaoEntrarArvore instanceof Function))
            {
                funcaoEntrarArvore = ElementoAtributoUtil.EntrarArvore;
            }
            const len = elemento.childNodes.length;
            const elementos = new Array<HTMLElement>();
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elemento.childNodes[i];
                if (elementoFilho instanceof HTMLElement)
                {
                    elementos.AddRange(ElementoAtributoUtil.RetornarElementosFilhosPossuiAtributo(elementoFilho, atrubito, valorAtributo, funcaoEntrarArvore));
                }
            }
            return elementos;
        }

        public static RetornarElementosFilhosPossuiAtributo(elemento: HTMLElement, atributoHtml: AtributoHtml, valorAtributo: string, funcaoEntrarArvore: FuncaoEntrarArvore): Array<HTMLElement>
        {
            if (!u.ValidacaoUtil.IsDefinido(funcaoEntrarArvore))
            {
                funcaoEntrarArvore = ElementoAtributoUtil.EntrarArvore;
            }

            const elementos = new Array<HTMLElement>();
            if (elemento.hasAttribute(atributoHtml.Nome))
            {
                if (!u.ValidacaoUtil.IsDefinido(valorAtributo) || elemento.getAttribute(atributoHtml.Nome).Equals(valorAtributo, true))
                {
                    elementos.Add(elemento);
                }
            }
            if (funcaoEntrarArvore(elemento))
            {
                const len = elemento.childNodes.length;
                for (let i = 0; i < len; i++)
                {
                    const node = elemento.childNodes[i];
                    if (node instanceof HTMLElement)
                    {
                        const elementoFilho: HTMLElement = node as HTMLElement;
                        elementos.AddRange(this.RetornarElementosFilhosPossuiAtributo(elementoFilho, atributoHtml, valorAtributo, funcaoEntrarArvore));
                    }
                }
            }
            return elementos;
        }

        private static EntrarArvore(elemento: Element): boolean
        {
            if (ElementoControleUtil.IsElementoControle(elemento))
            {
                return false;
            }

            if (elemento.hasAttribute(AtributosHtml.NaoEntrarArvore.Nome))
            {
                return false;
            }

            if (elemento.hasAttribute(AtributosHtml.Controle.Nome))
            {
                return false;
            }

            //if (elemento.hasAttribute(AtributosHtml.ItemElemento.Nome))
            //{
            //    return !elemento.hasAttribute(AtributosHtml.NaoEntrarArvore.Nome);
            //}

            if (elemento instanceof HTMLTableRowElement)
            {
                return false;
            }

            return true;
        }
    }
}