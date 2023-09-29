namespace Snebur.UI
{
    export class ElementoIconeUtil
    {
        public static RetornarElementoIcone(
            elementoRecipienteIcone: HTMLElement,
            componenteApresentacao?: ComponenteApresentacao): HTMLElement
        {
            const elementoIcone = elementoRecipienteIcone.querySelector(PropriedadeIcone.TAG_COMPONENTE_ICONE) as HTMLElement;
            if (elementoIcone == null)
            {
                const elementoIcone = document.createElement(PropriedadeIcone.TAG_COMPONENTE_ICONE);
                if (elementoRecipienteIcone.firstChild instanceof HTMLElement)
                {
                    elementoRecipienteIcone.insertBefore(elementoIcone, elementoRecipienteIcone.firstChild);
                }
                else
                {
                    elementoRecipienteIcone.appendChild(elementoIcone);
                }
                return elementoIcone;
            }

            if (elementoIcone.nextElementSibling != null)
            {
                console.error(`Mais de um elemento Ícone foi encontrado em ${componenteApresentacao?.ControleApresentacao?.___NomeConstrutor}
                                  OuterHTML: ${componenteApresentacao?.Elemento?.outerHTML.substring(0, 255)}`);
            }

            const elementoIconeFilho = elementoIcone.querySelector(PropriedadeIcone.TAG_COMPONENTE_ICONE) as HTMLElement;
            if (elementoIconeFilho == null) 
            {
                return elementoIcone;
            }
            return ElementoIconeUtil.RetornarElementoIcone(elementoIcone as HTMLElement, componenteApresentacao);

            
        }


    }
}
