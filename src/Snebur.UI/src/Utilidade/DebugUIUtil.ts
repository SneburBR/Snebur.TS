namespace Snebur.UI
{
    export class DebugUIUtil
    {

        private static readonly CSS_CLASS_DEBUG_CONTORNO: string = "debug-outline";
        private static readonly CSS_CLASS_DEBUG_OUTLINE_PRESENTATION: string = "debug-outline-presentation";
        private static readonly CSS_CLASS_ATIVAR_DEBUG: string = "debug-outline-active";

        public static readonly DEBUG_SELECTOR: string = "debug-ui-selector";
        private static _debugAtivado: boolean = false;

        public static Inicializar()
        {
            if (!$Configuracao.IsDebugUI)
            {
                return;
            }

            window.addEventListener("keydown", DebugUIUtil.Window_KeyDown);
            window.addEventListener("keyup", DebugUIUtil.Window_KeyUp);
        }

        private static Window_KeyDown(e: KeyboardEvent)
        {
            if (e.ctrlKey === true && e.altKey === true && e.shiftKey === true)
            {
                if (e.key?.toUpperCase() === "W")
                {
                    $Configuracao.IsAlterarUrlDebug = !$Configuracao.IsAlterarUrlDebug;
                    console.warn(`Alterar URL WebService Debug: ${$Configuracao.IsAlterarUrlDebug}`);
                }
                document.body.classList.add(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                DebugUIUtil._debugAtivado = true;
            }
            else
            {
                document.body.classList.remove(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                DebugUIUtil._debugAtivado = false;
            }
        }

        private static Window_KeyUp(e: KeyboardEvent)
        {
            document.body.classList.remove(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
            DebugUIUtil._debugAtivado = false;
        }

        public static SetDebugIrParaCodigo(uiElement: BaseUIElemento, refElemento?: HTMLElement)
        {
            if (!$Configuracao.IsDebugUI)
                return;

            const constructorName = uiElement.ControleApresentacao.___NomeConstrutor;
            if (constructorName == null)
                return;

            const element = refElemento ?? uiElement.Elemento;
            const nomeControle = `${constructorName}.shtml`;
            const searchElementPatterns = DebugUIUtil.BuildSearchElementPattern(uiElement, element);

            const mensagemIrParaCodigo = new Depuracao.MensagemIrParaCodigo({
                NomeControle: nomeControle,
                SearchElementPatterns: searchElementPatterns,
                TagElemento: element.tagName.toLowerCase(),
                Namespace: $Configuracao.NamespaceAplicacao
            });

            element.classList.add(DebugUIUtil.CSS_CLASS_DEBUG_CONTORNO);
            if (uiElement instanceof ControleApresentacao)
            {
                element.classList.add(DebugUIUtil.CSS_CLASS_DEBUG_OUTLINE_PRESENTATION);
            }

            element.addEventListener("mousedown", (e: MouseEvent) =>
            {
                if (!DebugUIUtil._debugAtivado)
                    return;

                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();

                if (e.IsBotaoDireito)
                {
                    const debugSelector = element.getAttribute(DebugUIUtil.DEBUG_SELECTOR);
                    //copy to clipboard
                    if (debugSelector != null)
                    {
                        navigator.clipboard.writeText(debugSelector).then(() =>
                        {
                            console.log(`Selector copiado para a área de transferência: ${debugSelector}\nSelector '${nomeControle}': ${debugSelector}`);
                        }).catch(err =>
                        {
                            console.warn(`Erro ao copiar o selector para a área de transferência: ${err}\nSelector '${nomeControle}': ${debugSelector}\n`);
                        });
                    }
                    return;
                }

                console.warn(`Ir para código: ${nomeControle} [${searchElementPatterns}]`);
                $Aplicacao.ServicoDepuracao.EnviarMensagem(mensagemIrParaCodigo);
                document.body.classList.remove(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                DebugUIUtil._debugAtivado = false;
            });
        }

        public static BuildElementSelector(uiElement: BaseUIElemento): string
        {
            if (uiElement instanceof DocumentoPrincipal)
            {
                return DebugUIUtil.BuildSingleElementSelector(uiElement, false);
            }

            const selectors: string[] = [];
            let current: BaseUIElemento = uiElement;
            let addIndexOfType = true;

            while (DebugUIUtil.ShouldContinueTraversal(current))
            {
                Guard.NotNullOrEmpty(current.constructor.name);
                selectors.push(DebugUIUtil.BuildSingleElementSelector(current, addIndexOfType));
                current = current.ControleApresentacaoPai;
                addIndexOfType = false;
            }
            return selectors.reverse().join(" ");
        }

        private static ShouldContinueTraversal(current: BaseUIElemento): boolean
        {
            return current != null
                && current !== current.ControleApresentacaoPai
                && !(current instanceof DocumentoPrincipal);
        }

        private static BuildSingleElementSelector(uiElement: BaseUIElemento, addIndexOfType: boolean): string
        {
            const selectors: string[] = [];
            const tagName = uiElement.Elemento.tagName.toLowerCase();
            selectors.push(tagName);

            const name = uiElement.Elemento.getAttribute(AtributosHtml.Nome.Nome);
            if (name != null)
            {
                selectors.push(`[${AtributosHtml.Nome}='${name}']`);
            }

            const constructor = uiElement.Elemento.getAttribute(AtributosHtml.Construtor.Nome);
            if (constructor != null)
            {
                selectors.push(`[${AtributosHtml.Construtor}='${constructor}']`);
            }

            if (addIndexOfType)
            {
                const index = ElementoUtil.GetElementSiblingOfTypeIndex(uiElement.Elemento);
                if (index > 0)
                {
                    selectors.push(`${tagName} [${index}]`);
                }
            }
            return selectors.join("");
        }

        private static BuildSearchElementPattern(uiElement: BaseUIElemento, element: HTMLElement): string[]
        {
            const partterns: string[] = [];
            const attributes: string[] = [AtributosHtml.Nome.Nome, AtributosHtml.ItemElemento.Nome];

            for (const atributo of attributes)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    partterns.push(`${atributo}="${valorAtributo}"`);
                }
            }

            for (const atributo in AtributosHtml.AtributosEvento)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    partterns.push(`${atributo}="${valorAtributo}"`);
                }
            }

            for (const atributo in AtributosHtml.AtributosBind)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    partterns.Add(`${atributo}="${valorAtributo}"`);
                }
            }
            return partterns;
        }

        public static IsDebugAtivado(uiEvent: UIEvent)
        {
            if (this._debugAtivado)
            {
                return true;
            }

            if (uiEvent instanceof MouseEvent ||
                uiEvent instanceof KeyboardEvent)
            {
                return uiEvent.ctrlKey && uiEvent.altKey && uiEvent.shiftKey;
            }
            return false;
        }
    }
}
