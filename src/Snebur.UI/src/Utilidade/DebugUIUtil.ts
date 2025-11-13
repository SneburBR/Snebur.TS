namespace Snebur.UI
{
    export class DebugUIUtil
    {

        private static readonly CSS_CLASS_DEBUG_CONTORNO: string = "debug-outline";
        private static readonly CSS_CLASS_DEBUG_OUTLINE_PRESENTATION: string = "debug-outline-presentation";
        private static readonly CSS_CLASS_ATIVAR_DEBUG: string = "debug-outline-active";

        public static readonly DEBUG_ELEMENT_PATH: string = "debug-element-path";
        private static _debugAtivado: boolean = false;

        public static Inicializar()
        {
            if (!$Configuracao.IsDebug)
            {
                return;
            }

            window.addEventListener("keydown", (e: KeyboardEvent) =>
            {
                if (e.ctrlKey === true && e.altKey === true && e.shiftKey === true)
                {
                    document.body.classList.add(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                    DebugUIUtil._debugAtivado = true;
                }
                else
                {
                    document.body.classList.remove(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                    DebugUIUtil._debugAtivado = false;
                }
            });

            window.addEventListener("keyup", (e: KeyboardEvent) =>
            {
                document.body.classList.remove(DebugUIUtil.CSS_CLASS_ATIVAR_DEBUG);
                DebugUIUtil._debugAtivado = false;
            });
        }

        public static BuildIdElementPath(uiElement: BaseUIElemento): string
        {
            const caminhos: string[] = [];

            const name = uiElement.Elemento.getAttribute(AtributosHtml.Nome.Nome);
            if (name != null)
            {
                Guard.NotNullOrEmpty(name);
                caminhos.push(name);
            }
            else
            {
                const index = ElementoUtil.GetElementSiblingIndex(uiElement.Elemento);
                caminhos.push(index.toString());
            }

            let current: BaseUIElemento = uiElement;
            while (current != null)
            {
                Guard.NotNullOrEmpty(current.constructor.name);
                caminhos.push(current.constructor.name);
                current = current.ControleApresentacaoPai;
            }
            return caminhos.reverse().join("-");
        }

        public static SetDebugIrParaCodigo(uiElement: BaseUIElemento, refElemento?: HTMLElement)
        {
            if (!$Configuracao.IsDebug)
                return;

            const constructorName = uiElement.ControleApresentacao.___NomeConstrutor;
            if (constructorName == null)
                return;

            const element = refElemento ?? uiElement.Elemento;
            const nomeControle = `${constructorName}.shtml`;
            const searchElementPattern = DebugUIUtil.BuildSearchElementPattern(uiElement, element);

            const mensagemIrParaCodigo = new Depuracao.MensagemIrParaCodigo({
                NomeControle: nomeControle,
                SearchElementPattern: searchElementPattern,
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
                if (DebugUIUtil._debugAtivado)
                {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    console.warn(`Ir para código: ${nomeControle} [${searchElementPattern}]`);
                    $Aplicacao.ServicoDepuracao.EnviarMensagem(mensagemIrParaCodigo);
                }
            });
        }

        private static BuildSearchElementPattern(uiElement: BaseUIElemento, element: HTMLElement)
        {
            const attributes: string[] = [AtributosHtml.Nome.Nome, AtributosHtml.ItemElemento.Nome];
            for (const atributo of attributes)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    return `${atributo}="${valorAtributo}"`;
                }
            }

            for (const atributo in AtributosHtml.AtributosEvento)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    return `${atributo}="${valorAtributo}"`;
                }
            }

            for (const atributo in AtributosHtml.AtributosBind)
            {
                const valorAtributo = element.getAttribute(atributo);
                if (valorAtributo != null)
                {
                    return `${atributo}="${valorAtributo}"`;
                }
            }
            return "";
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
