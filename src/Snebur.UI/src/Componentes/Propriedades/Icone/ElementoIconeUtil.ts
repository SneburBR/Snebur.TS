namespace Snebur.UI
{
    export class ElementoIconeUtil
    {
        public static RetornarElementoIcone(
            elementoRecipienteIcone: HTMLElement,
            componenteApresentacao?: ComponenteApresentacao): HTMLElement
        {
            const elementosIcones = elementoRecipienteIcone.getElementsByTagName(PropriedadeIcone.TAG_COMPONENTE_ICONE);
            if (elementosIcones.length === 0)
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

            if (elementosIcones.length > 1)
            {
                console.error(`Mais de um elemento Ícone foi encontrado em ${componenteApresentacao?.ControleApresentacao?.___NomeConstrutor}
                                  OuterHTML: ${componenteApresentacao?.Elemento?.outerHTML.substring(0, 255)}`);
            }
            return elementosIcones.item(0) as HTMLElement;
        }


    }
}
