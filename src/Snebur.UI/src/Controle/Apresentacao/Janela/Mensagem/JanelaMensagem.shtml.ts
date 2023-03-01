namespace Snebur.UI
{
    export class JanelaMensagem extends Janela<ResultadoJanelaMensagemArgs>
    {
        private _opcoes: EnumBotoesJanelaMensagem;
        private JanelaMensagemVM: JanelaMensagemVM;

        public get Mensagem(): string
        {
            return this.JanelaMensagemVM.Mensagem;
        }
        public set Mensagem(value: string)
        {
            this.JanelaMensagemVM.Mensagem = value;
        }

        public get Titulo(): string
        {
            return this.JanelaMensagemVM.Titulo;
        }
        public set Titulo(value: string)
        {
            this.JanelaMensagemVM.Titulo = value;
        }

        public get Opcoes(): EnumBotoesJanelaMensagem
        {
            return this._opcoes;
        }
        public set Opcoes(value: EnumBotoesJanelaMensagem)
        {
            this._opcoes = value;
            if (value !== EnumBotoesJanelaMensagem.Personalizado)
            {
                this.LarguraApresentacao;
                this.JanelaMensagemVM.Botoes.Clear();

                const botoes = MensagemUtil.RetornarBotoes(this._opcoes);
                this.JanelaMensagemVM.Botoes.AddRange(botoes);
            }
        }

        public get Botoes(): ListaObservacao<BotaoMensagemViewModel>
        {
            return this.JanelaMensagemVM.Botoes;
        }

        public constructor(controlePai: BaseControle);
        /*public constructor(controlePai: BaseControle, options: OptionsMensagem);*/
        public constructor(controlePai: BaseControle, titutlo: string, mensagem: string, opcoes: ui.EnumBotoesJanelaMensagem);
        public constructor(controlePai: BaseControle, titutlo: string, mensagem: string, botoes: List<BotaoMensagemViewModel>);
        public constructor(controlePai: BaseControle, titutlo: string = String.Empty, mensagem: string = String.Empty, botoes: ui.EnumBotoesJanelaMensagem | List<BotaoMensagemViewModel> = ui.EnumBotoesJanelaMensagem.Ok)
        {
            super(controlePai);

            if (JanelaMensagem._janelaAtual instanceof JanelaMensagem)
            {
                const mensagem = `A mensagem ${JanelaMensagem._janelaAtual.Titulo} ${JanelaMensagem._janelaAtual.Mensagem} está aberta.
                                  Para evitar esse erro. await JanelaMensagem.AguardarFecharMensagemAsync() antes do construtor new JanelaMensagem `;

                if ($Configuracao.IsDebug)
                {
                    throw new Erro(mensagem);
                }
                console.error(mensagem);
            }

            JanelaMensagem._janelaAtual = this;
            this.JanelaMensagemVM = new JanelaMensagemVM();

            const opcoes = this.RetornarOpcoes(botoes);

            this.Titulo = titutlo;
            this.Mensagem = mensagem;
            this.Opcoes = opcoes;

            if (this.Opcoes === EnumBotoesJanelaMensagem.Personalizado && botoes instanceof Array)
            {
                this.Botoes.AddRange(botoes);
            }

            this.IsMostrarBotaoRestaurarMaximizar = false;

            this.IsMostrarBotaoFechar = this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Cancelar) ||
                this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Nao);

            this.IsFecharEsc = this.IsMostrarBotaoFechar;
            this.EventoCarregado.AddHandler(this.JanelaMensagem_Carregada, this);
            this.ControlePai?.ControlesFilho?.Add(this);
        }

        private JanelaMensagem_Carregada(): void
        {
            this.DataSource = this.JanelaMensagemVM;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDomGlobal(EnumEventoDom.KeyDown, this.JanelaMensagem_KeyDown.bind(this));
        }

        private JanelaMensagem_KeyDown(e: KeyboardEvent): void
        {
            if (KeyCodeUtil.IsKeyCodeEnter(e.keyCode) && !this.IsExisteControleFilhoJanela)
            {
                const botaoVM = this.Botoes.Where(x =>
                    x.Resultado === EnumResultadoOpcaoMensagem.Ok ||
                    x.Resultado === EnumResultadoOpcaoMensagem.Sim).
                    FirstOrDefault();

                if (botaoVM != null)
                {
                    this.FecharAsync(new ResultadoJanelaMensagemArgs(this, botaoVM.Resultado));
                }
            }
        }

        protected override RetornarElementoDestino(): HTMLElement
        {
            return $Aplicacao.DocumentoPrincipal?.Elemento ??
                document.body;
        }

        protected override RetornarTagNovoElemento()
        {
            return "sn-janela-mensagem";
        }

        //public override async MostrarAsync(): Promise<ResultadoJanelaMensagemArgs>
        //public override async MostrarAsync(callback: (resultado: ResultadoJanelaMensagemArgs) => void): Promise<void>
        //public override async MostrarAsync(callback?: (resultado: ResultadoJanelaMensagemArgs) => void): Promise<void | ResultadoJanelaMensagemArgs>
        //{
        //    const resultado = await this.MostrarAsync();
        //    if (typeof callback === "function")
        //    {
        //        callback(resultado);
        //        return;
        //    }
        //    return resultado;
        //}

        public override async MostrarAsync(callback?: (resultado: ResultadoJanelaMensagemArgs) => void): Promise<ResultadoJanelaMensagemArgs>
        {
            await this.DesocuparAsync();
            return await super.MostrarAsync(callback);
        }
        //public override async MostrarAsync(): Promise<ResultadoJanelaMensagemArgs>
        //public override async MostrarAsync(callback: (resultado: ResultadoJanelaMensagemArgs) => void): Promise<void>
        //{
        //    await this.DesocuparAsync();
        //    const resultado = await super.MostrarAsync();
        //    return resultado;
        //}

        public BtnBotao_Click(botao: Botao, e: EventArgs): void
        {
            const botaoVV: BotaoMensagemViewModel = botao.DataSource;
            this.FecharAsync(new ResultadoJanelaMensagemArgs(this, botaoVV.Resultado));
        }

        protected override Cancelar()
        {
            this.FecharAsync(false);
        }

        public override async FecharAsync(args: boolean | ResultadoJanelaMensagemArgs) 
        {
            if (typeof args === "boolean" && args === false)
            {
                const resultadoCancelar = this.RetornarRetornarResultadoCancelar();
                args = new ResultadoJanelaMensagemArgs(this, resultadoCancelar);
            }
            if (typeof args === "boolean" && args === true)
            {
                const resultadoOk = this.RetornarRetornarResultadoOk();
                args = new ResultadoJanelaMensagemArgs(this, resultadoOk);
            }

            if (!(args instanceof ResultadoJanelaMensagemArgs))
            {
                throw new Error("O argumento ao fechar janela mensagem não é suportado");
            }
            await super.FecharAsync(args);
        }

        private RetornarRetornarResultadoCancelar(): EnumResultadoOpcaoMensagem
        {
            if (this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Cancelar))
            {
                return EnumResultadoOpcaoMensagem.Cancelar;
            }

            if (this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Nao))
            {
                return EnumResultadoOpcaoMensagem.Nao;
            }
            throw new Erro("Não foi possível definir o botão cancelar");
        }

        private RetornarRetornarResultadoOk(): EnumResultadoOpcaoMensagem
        {
            if (this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Ok))
            {
                return EnumResultadoOpcaoMensagem.Ok;
            }

            if (this.Botoes.Any(x => x.Resultado === EnumResultadoOpcaoMensagem.Sim))
            {
                return EnumResultadoOpcaoMensagem.Sim;
            }

            throw new Erro("Não é possível definiar o botão ok");
        }

        private RetornarOpcoes(opcoesOuBotoes?: ui.EnumBotoesJanelaMensagem | List<BotaoMensagemViewModel>): EnumBotoesJanelaMensagem
        {
            if (opcoesOuBotoes instanceof Array)
            {
                return EnumBotoesJanelaMensagem.Personalizado;
            }
            if (EnumUtil.IsDefindo(EnumBotoesJanelaMensagem, opcoesOuBotoes))
            {
                return opcoesOuBotoes;
            }
            throw new Erro("Opções ou botões não é suportado");
        }

        public override Dispose(): void
        {
            JanelaMensagem._janelaAtual = null;
            this.ControlePai?.ControlesFilho?.Remove(this);
            super.Dispose();
        }

        //#region Static 

        private static _janelaAtual: JanelaMensagem;

        public static get IsAberta(): boolean
        {
            return JanelaMensagem._janelaAtual instanceof JanelaMensagem;
        }

        public static get JanelaAtual(): JanelaMensagem
        {
            return JanelaMensagem._janelaAtual;
        }

        public static async AguardarFecharMensagemAsync():Promise<void>
        {
            while (this._janelaAtual != null && this._janelaAtual.IsAberta)
            {
                await ThreadUtil.EsperarAsync(150);
            }
        }
        //#endregion

    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface JanelaMensagem
    {
        readonly PainelListaBotoes: ui.PainelLista;
    }

    //#endregion

    export interface OptionsMensagem
    {
        Mensagem?: string;
        Titulo?: string;
        Icone?: EnumIcone;
        Botoes?: Array<[EnumResultadoOpcaoMensagem, string] | EnumResultadoOpcaoMensagem | BotaoMensagemViewModel> | EnumBotoesJanelaMensagem
        callback?: (resultado: ResultadoJanelaMensagemArgs) => void,
        TipoPainelBotoes?: EnumTipoPainel;
        CorTitulo?: EnumCor | string,
        CorMensagem?: EnumCor | string
    }
}
