namespace Snebur.UI
{
      //#region Scroll

    export class ScrollUtil
    {
        public static IsScrollVerticalNoFim(elemento: HTMLElement): boolean
        {
            if (ScrollUtil.IsExisteScrollVertical(elemento))
            {
                return elemento.offsetHeight + elemento.scrollTop >= elemento.scrollHeight;
            }
            return false;
        }

        public static IsExisteScrollVertical(scrollElement: HTMLElement): boolean
        {
            const overflowY = window.getComputedStyle(scrollElement).overflowY;
            if (overflowY === "scroll" || overflowY === "auto" || overflowY === "overlay")
            {
                return (scrollElement.scrollTop + scrollElement.clientHeight) >= (scrollElement.scrollHeight - 50)
            }
            return false;
        }

        public static RetornarElementosScrollVerticalPai(elemento: HTMLElement): HTMLElement[]
        {
            const elementosScroll = new List<HTMLElement>();

            let elementoAtual = elemento;
            /*eslint-disable*/
            while (true)
            {
                const elementoScroll = ScrollUtil.RetornarElementoScrollVerticalPai(elementoAtual, true);
                if (elementoScroll == null)
                {
                    break;
                }
                elementosScroll.Add(elementoScroll);
                elementoAtual = elementoScroll.parentElement;
            }
            /*eslint-enable*/
            return elementosScroll;
        }

        public static RetornarElementoScrollVerticalPai(elemento: HTMLElement, isIgnorarErro: boolean = false): HTMLElement
        {
            if (!(elemento instanceof HTMLElement))
            {
                if (isIgnorarErro)
                {
                    return null;
                }
                throw new Erro("O elemento scroll pai não foi encontrado");
            }

            if (ScrollUtil.IsExisteScrollVertical(elemento))
            {
                return elemento;
            }
            return ScrollUtil.RetornarElementoScrollVerticalPai(elemento.parentElement, isIgnorarErro);
        }

        public static IsScrollHorizontalNoFim(elemento: HTMLElement): boolean
        {
            if (ScrollUtil.IsExisteScrollHorizontal(elemento))
            {

                return elemento.offsetWidth + elemento.scrollLeft >= elemento.scrollWidth;
            }
            return false;
        }

        public static IsExisteScrollHorizontal(elemento: HTMLElement): boolean
        {
            return elemento.scrollWidth > elemento.clientWidth;
        }

        public static RetornarElementoScrollHorizontalPai(elemento: HTMLElement, isIgnorarErro: boolean = false): HTMLElement
        {
            if (!(elemento instanceof HTMLElement))
            {
                if (isIgnorarErro)
                {
                    return null;    
                }
                throw new Erro("O elemento scroll pai não foi encontrado");
            }

            if (ScrollUtil.IsExisteScrollHorizontal(elemento))
            {
                return elemento;
            }
            return ScrollUtil.RetornarElementoScrollHorizontalPai(elemento.parentElement, isIgnorarErro);
        }

        public static ScrollTo(elemento: HTMLElement)
        {
            elemento.scrollIntoView({
                block: "center",
                inline: "center",
                behavior: "smooth"
            });
        }
    }

    

        //#endregion
}