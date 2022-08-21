namespace Snebur
{
    export class ConsoleUtil
    {
        private static _isInicializando: boolean;
        private static ElementoConsole: HTMLElement;
        private static ElementoBotaoExpandir: HTMLElement;
        private static CSS_CLASS_EXPANDIDO = "sn-expandido";
        private static ALTURA_NORMAL = 50;

        public static InicializarVisualizacaoConsole(e: ConsoleLogArgs)
        {
            if (ConsoleUtil._isInicializando)
            {
                return;
            }
            ConsoleUtil.InicializarInterno();
            ConsoleUtil._isInicializando = true;
            ConsoleUtil.ConsoleUtil_Log(ConsoleUtil, e);
        }

        private static InicializarInterno(): void
        {
            ConsoleUtil.AdicionarElementos();
            console.EventoLog.AddHandler(this.ConsoleUtil_Log, ConsoleUtil);
        }

        private static AdicionarElementos(): void
        {
            const elementoConsole = document.createElement("snebur-console");
            const estiloConsole = new Estilo({
                width: "100%",
                height: ConsoleUtil.ALTURA_NORMAL.ToPixels(),
                background: "rgba(255,255,255,0.7)",
                color: "white",
                position: "fixed",
                display: "block",
                zIndex: Number.Int32MaxValue.toString(),
                pointerEvents: "none",
                bottom: "0"
            });

            const estiloDestino = new Estilo({
                overflowX: "hidden",
                overflowY: "auto",
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: "10",
                display: "block"
            });

            const estiloBotao = new Estilo({
                position: "absolute",
                width: "25px",
                height: "25px",
                background: "red",
                color: "white",
                right: "17px",
                top: "0",
                cursor: "pointer",
                pointerEvents: "all",
                zIndex: "20"
            });

            const destino = document.createElement("destino");
            estiloDestino.AplicarEm(destino);


            const botaoExpandir = document.createElement("i");
            botaoExpandir.addEventListener("click", ConsoleUtil.BtnExpandir_Click.bind(ConsoleUtil));
            botaoExpandir.innerHTML = "&#x25B2;";

            const botaoFechar = document.createElement("i");
            botaoFechar.addEventListener("click", ConsoleUtil.BtnFechar_Click.bind(ConsoleUtil));
            botaoFechar.innerHTML = "fechar";

            estiloConsole.AplicarEm(elementoConsole);
            estiloBotao.AplicarEm(botaoExpandir);

            estiloBotao.right = "60px";
            estiloBotao.width = "80px";
            estiloBotao.AplicarEm(botaoFechar);

            elementoConsole.appendChild(destino);
            elementoConsole.appendChild(botaoExpandir);
            elementoConsole.appendChild(botaoFechar);

            document.body.appendChild(elementoConsole);

            this.ElementoBotaoExpandir = botaoExpandir;
            this.ElementoConsole = elementoConsole;

        }

        private static BtnExpandir_Click(): void
        {
            const isExpandir = !ConsoleUtil.ElementoConsole.classList.contains(ConsoleUtil.CSS_CLASS_EXPANDIDO);
            const altura = isExpandir ? "100%" : ConsoleUtil.ALTURA_NORMAL.ToPixels();
            const sentido = isExpandir ? "&#x25BC;" : "&#x25B2;";
            ConsoleUtil.ElementoConsole.style.height = altura;
            ConsoleUtil.ElementoBotaoExpandir.innerHTML = sentido;

            if (isExpandir)
            {
                ConsoleUtil.ElementoConsole.classList.add(ConsoleUtil.CSS_CLASS_EXPANDIDO);
            }
            else
            {
                ConsoleUtil.ElementoConsole.classList.remove(ConsoleUtil.CSS_CLASS_EXPANDIDO);
            }

            const destino = ConsoleUtil.ElementoConsole.querySelector("destino");
            destino.lastElementChild?.scrollIntoView({
                block: "center",
                inline: "center",
                behavior: "smooth"
            });
        }

        private static BtnFechar_Click(): void
        {
            ConsoleUtil._isInicializando = false;
            ConsoleUtil.ElementoConsole.remove();

            delete ConsoleUtil.ElementoConsole;
            delete ConsoleUtil.ElementoBotaoExpandir;
        }

        private static ConsoleUtil_Log(provedcor: any, e: ConsoleLogArgs)
        {
            if (ConsoleUtil._isInicializando)
            {
                if (e.Tipo === EnumTipoLog.Erro ||
                    e.Tipo === EnumTipoLog.Alerta)
                {

                    const log = document.createElement("div");
                    log.style.color = ConsoleUtil.RetornarCorLog(e.Tipo);
                    log.innerHTML = FormatacaoUtil.FormatarHtml(e.Mensagem);

                    const destino = this.ElementoConsole.querySelector("destino");
                    destino.appendChild(log);
                    destino.appendChild(document.createElement("hr"));

                    log.scrollIntoView({
                        block: "center",
                        inline: "center",
                        behavior: "smooth"
                    });
                }
            }
        }
        

        private static RetornarCorLog(tipo: EnumTipoLog): string
        {
            switch (tipo)
            {
                case EnumTipoLog.Alerta:
                    return "orange";

                case EnumTipoLog.Erro:
                    return "red";
                default:

                    return "white";
            }
        }

    }
}