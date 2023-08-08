namespace Snebur.UI
{
    export class GerenciadorFalhaConexao
    {
        private ElementoFalhaConexao: HTMLElement;
        private __identificadorTimeoutFalhaConexao: number = null;
        private __mensagemErroFalhaConexao: string = null;

        public constructor()
        {
            $Aplicacao.EventoFalhaConexao.AddHandler(this.Aplicacao_FalhaConexao, this);
            $Aplicacao.EventoConexaoRestabelecida.AddHandler(this.Aplicacao_ConexaoRestabelecida, this);
        }

        private Aplicacao_FalhaConexao(
            provedor: any,
            args: Snebur.Comunicacao.FalhaConexaoEventArgs)
        {

            if (this.ElementoFalhaConexao == null)
            {
                this.AdicionarElementoFalhaConexao(args);
            }
            this.AtualizarFalhaConexao(args);

            //this.Ocupar(EnumOpcaoOcupar.MostrarJanelaOcupadoImediatamente);
            //this.TituloOcupado("Falha de conexão");
            //this.MensagemOcupado("Tentando reconectar...");
        }

        private async Aplicacao_ConexaoRestabelecida()
        {
            window.clearInterval(this.__identificadorTimeoutFalhaConexao);
            this.ElementoFalhaConexao?.remove();
            this.ElementoFalhaConexao = null;
            /*await this.DesocuparAsync();*/
        }

        protected AdicionarElementoFalhaConexao(args: c.FalhaConexaoEventArgs)
        {
            const elemento = document.createElement("sn-falha-conexao");
            elemento.className = "sn-falha-conexao";

            const recipienteMensagem = document.createElement("div");
            recipienteMensagem.className = "sn-falha-conexao-recipiente-mensagem";

            //const estilo = new Estilo({
            //    position: "fixed",
            //    left: "0",
            //    right: "0",
            //    top: "0",
            //    bottom: "0",
            //    backgroundColor: "rgba(255,255,255,0.5)",
            //    display: "block"
            //});

            //const estiloRecipienteMensagem = new Estilo({
            //    position: "absolute",
            //    top: "50%",
            //    left: "50%",
            //    width: "600px",
            //    maxWidth: "100%",
            //    height: "auto",
            //    maxHeight: "100%",
            //    transform: "translate(-50%, -50%)",
            //    backgroundColor: "white",
            //});

            //estilo.AplicarEm(elemento);
            //estiloRecipienteMensagem.AplicarEm(recipienteMensagem);

            const titulo = ElementoUtil.RetornarNovoElemento("h4", "Falha de conexão", "sn-falha-conexao-titulo");
            const mensagem = ElementoUtil.RetornarNovoElemento("h6", "O sistema detectou uma falha de conexão com a internet. <br /> Aguardando restabelecer!", "sn-falha-conexao-mensagem");
            const tentativa = ElementoUtil.RetornarNovoElemento("div", `Tentativa: ${args.Tentativa}`, "sn-falha-conexao-tentativa");
            const tempoSemConexao = ElementoUtil.RetornarNovoElemento("div", "Tempo: 0s", "sn-falha-conexao-tempo-sem-conexao");

            recipienteMensagem.appendChild(titulo);
            recipienteMensagem.appendChild(mensagem);
            recipienteMensagem.appendChild(tentativa);
            recipienteMensagem.appendChild(tempoSemConexao);

            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                const botao = ElementoUtil.RetornarNovoElemento("button", "Copiar dados debug", "sn-falha-conexao-botao-debug");
                botao.addEventListener("click", this.CopiarMensagemDebug.bind(this));
                recipienteMensagem.appendChild(botao);
            }

            elemento.appendChild(recipienteMensagem);
            (elemento as any).Stopwatch = Stopwatch.StartNew();
            document.body.appendChild(elemento);


            this.ElementoFalhaConexao = elemento;

            window.clearInterval(this.__identificadorTimeoutFalhaConexao);
            this.__identificadorTimeoutFalhaConexao = setInterval(this.AtualizarTempoSemConexao.bind(this), 1000);
        }

        private AtualizarFalhaConexao(args: c.FalhaConexaoEventArgs)
        {
            const elemento = this.ElementoFalhaConexao;
            const elementoMensagem = elemento?.querySelector(".sn-falha-conexao-mensagem");
            const elementoTentativa = elemento?.querySelector(".sn-falha-conexao-tentativa");

            if (elemento == null || elementoMensagem == null || elementoTentativa == null)
            {
                return;
            }

            elementoTentativa.innerHTML = `Tentativa: <strong> ${args.Tentativa} </strong>`;

            const stopwatch = (elemento as any).Stopwatch as Stopwatch;
            //const sb = new StringBuilder();
            //sb.AppendLine("Aguardando restabelecer conexão.");
            //sb.AppendLine(`Tentativa: ${args.Tentativa}`);
            //elementoMensagem.innerHTML = sb.ToHtml();

            if ($Configuracao.IsDebug || $Configuracao.IsTeste)
            {
                const sbDebug = new StringBuilder();
                sbDebug.AppendLine(`----------------------------------------------------------------------`);
                sbDebug.AppendLine(`Date: ${new Date().toLocaleTimeString()}`);
                sbDebug.AppendLine(`UrlServico: ${args.UrlServico}`);
                sbDebug.AppendLine(`Serviço: ${args.Servico}`);
                sbDebug.AppendLine(`Operação: ${args.Metodo}`);
                sbDebug.AppendLine(`StatusCode: ${args.ResultadoChamadaErro.StatusCode}`);
                sbDebug.AppendLine(`MensagemErro: ${args.ResultadoChamadaErro.MensagemErro}`);
                sbDebug.AppendLine(`Tempo transcorrido: ${stopwatch.TotalSeconds}s`);
                sbDebug.AppendLine(`----------------------------------------------------------------------`);
                const mesagemDebug = sbDebug.ToString();
                console.warn(mesagemDebug);
                this.__mensagemErroFalhaConexao = mesagemDebug;
            }

        }

        private AtualizarTempoSemConexao()
        {
            const elemento = this.ElementoFalhaConexao;
            if (elemento != null)
            {
                const elementoTempoSemConexao = elemento.querySelector(".sn-falha-conexao-tempo-sem-conexao");
                const stopwatch = (elemento as any).Stopwatch as Stopwatch;
                if (stopwatch instanceof Stopwatch && elementoTempoSemConexao != null)
                {
                    elementoTempoSemConexao.innerHTML = `Tempo: ${parseInt(stopwatch.TotalSeconds)}s`;
                }
            }
        }

        private CopiarMensagemDebug()
        {
            navigator.clipboard?.writeText(this.__mensagemErroFalhaConexao);
        }
    }
}

 