namespace Snebur.UI
{
    export class ElementoControleUtil
    {
        public static RetornarElementosControleFilho(elemento: HTMLElement, isElementoFilho: boolean): Array<HTMLElement>
        {
            const elementos = new Array<HTMLElement>();
            if (elemento instanceof HTMLElement)
            {
                if (isElementoFilho && ElementoControleUtil.IsElementoControle(elemento))
                {
                    elementos.Add(elemento);
                }
                else
                {
                    const len = elemento.children.length;
                    for (let i = 0; i < len; i++)
                    {
                        const elementoFilho = elemento.children[i];
                        elementos.AddRange(this.RetornarElementosControleFilho(elementoFilho as HTMLElement, true));
                    }
                }
            }
            return elementos;
        }

        public static IsElementoControle(elemento: Element): boolean
        {
            if (elemento.tagName === "SN-CAIXA-SUGESTAO")
            {
                const xx = "'";
            }
            return (elemento.tagName.substring(0, PREFIXO_TAG_CONTROLE.length).toUpperCase() === PREFIXO_TAG_CONTROLE);
        }
    }
}

  //private static _registrado: boolean = false;

        //public static Registrar(): void
        //{
        //    if (!ElementoControleUtil._registrado)
        //    {
        //        let elementosControle = $ElementosControle.ToArray();
        //        let len = elementosControle.length;
        //        for (var i = 0; i < len; i++)
        //        {
        //            let elementoControle = elementosControle[i];
        //            let prototypeInit: webcomponents.CustomElementInit = {
        //                //prototype: Object.create(elementoControle.HTMLElementConstrutor.prototype),
        //                prototype: Object.create(HTMLDivElement.prototype),
        //                extends: "div"
        //            }
        //            //document.registerElement(elementoControle.TagName.toLowerCase(), prototypeInit);
        //        }
        //        ElementoControleUtil._registrado = true;
        //    }
        //}