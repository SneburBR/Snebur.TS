namespace Snebur.UI
{
    export class DebugUIUtil
    {
        public static readonly DEBUG_ELEMENT_PATH: string = "debug-element-path"

        public static BuildIdElementPath(elementoUI: BaseUIElemento): string
        {
            const caminhos: string[] = [];
            const index = ElementoUtil.GetElementSiblingIndex(elementoUI.Elemento);
            caminhos.push(index.toString());

            let current: BaseUIElemento = elementoUI;
            while (current != null)
            {
                Guard.NotNullOrEmpty(current.constructor.name);
                caminhos.push(current.constructor.name);
                current = current.ControleApresentacaoPai;
            }
            return caminhos.reverse().join("-");
        }
    }
     
    

}
