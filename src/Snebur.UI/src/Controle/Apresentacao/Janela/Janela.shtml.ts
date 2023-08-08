namespace Snebur.UI
{
    export abstract class Janela<TResultadoFecharJanelaArgs extends ResultadoFecharJanelaArgs = ResultadoFecharJanelaArgs> extends ControleApresentacao
    {
        private readonly __camposPrivadosJanela = new JanelaCamposPrivados();

        protected override readonly __isControleZIndex: boolean = true;
        public readonly IsMostrarFundoJanela: boolean = true;

        protected Estilo: EnumEstiloJanela = EnumEstiloJanela.SemEstilo;
        protected EstiloBarraAcao: EnumEstiloBarraAcao = EnumEstiloBarraAcao.Transparente;

        protected IsFecharEsc: boolean = true;
        protected IsMostrarBotaoFechar = true;
        protected IsMostrarBotaoRestaurarMaximizar: boolean = false;
        protected IsMostrarBarraAcoes: boolean = true;
        protected IsDispensarAoFechar: boolean = true;

        public readonly BtnFecharJanelaInterno: Botao;
        public readonly BtnMaximizarJaenlaInterno: Botao;
        public readonly BtnRestaurarJanelaInterno: Botao;

        public readonly ElementoBarraAcao: HTMLDivElement;
        public readonly ElementoConteudoInterno: HTMLDivElement;

        public override get ElementoDimensao(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get ElementoConteudo(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get ElementoMovimentacao(): HTMLElement
        {
            return this.ElementoBarraAcao;
        }

        public get IsAberta(): boolean
        {
            return this.__camposPrivadosJanela.isAberta;
        }

        public get IsMovimentou(): boolean
        {
            return this.__camposPrivadosJanela.isMovimentou;
        }

        public get ZIndex(): number
        {
            return this.__camposPrivadosJanela.__zIndex;
        }

        public get ResultadoFechar(): TResultadoFecharJanelaArgs
        {
            if (this.__camposPrivadosJanela.resultadoFechar instanceof ResultadoFecharJanelaArgs)
            {
                return this.__camposPrivadosJanela.resultadoFechar as TResultadoFecharJanelaArgs;
            }
            return new ResultadoFecharJanelaArgs(this, false, null) as TResultadoFecharJanelaArgs;
        }

        protected IsFecharClicouFora = false;

        public readonly EventoPosicaoAlterada = new Evento(this);

        public constructor(controlePai?: BaseControle)
        {
            super(((typeof controlePai !== "undefined") ? controlePai : $Aplicacao.DocumentoPrincipal));

            this.EventoTelaAlterada.AddHandler(this.JanelaTela_Alterada, this);
            /*this._dataSource = this;*/
            this._dataSource = this;
            this.__camposPrivadosJanela.windowsResizeDepois = new ExecutarDepois(this.WindowsResizeDepois_Executar.bind(this), 250);
        }

        protected override Inicializar()
        {
            super.Inicializar();

            //##################
            /*super.InicializarPropriedadesApresentacao();*/

            this.AdicionarEventoDomGlobal(EnumEventoDom.KeyDown, this.WindowInterno_KeyDown.bind(this));
            this.AdicionarEventoDomGlobal(EnumEventoDom.Resize, this.WindowInterno_Resize.bind(this));
            this.AdicionarEventoDom(ui.EnumEventoDom.MouseDown, this.ElementoInterno_MouseDown);

            this.Elemento.classList.add(EnumCssClasseJanela.JanelaCentro);

            this.BtnRestaurarJanelaInterno.OcultarElemento();
            this.AtualizarAparencia;

            if (!this.IsMostrarBotaoRestaurarMaximizar)
            {
                this.BtnMaximizarJaenlaInterno.OcultarElemento();
            }

            if (!this.IsMostrarBotaoFechar)
            {
                this.BtnFecharJanelaInterno.OcultarElemento();
            }

            if (this.IsMostrarBarraAcoes)
            {
                this.MostrarBarraAcoes();
                this.AtualizarBarraAcao();
            }
            else
            {
                this.OcultarBarraAcoes();
            }

            if (this.IsFecharClicouFora)
            {
                this.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseDown, this.WindowClicouFora_MouseDown, this);
            }
            this.Elemento.focus();
        }

        public override InicializarControle()
        {
            super.InicializarControle();
            ThreadUtil.ExecutarAsync(this.Focus.bind(this));
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-janela";
        }

        //#region Carregar - html

        protected override RetornarElementoDestino(): HTMLElement
        {
            /*return ControleUtil.RetornarElementoDestinoFlutuante(this);*/
            return $Aplicacao.DocumentoPrincipal.Elemento;
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this.__camposPrivadosJanela.__zIndex = EstiloUtil.IncrementarJanelaZIndex(this);
        }

        public override AtualizarAparencia(): void
        {
            super.AtualizarAparencia();
        }

        protected override RetornarHtmlInterno(atributos: DicionarioSimples): string
        {
            return this.RetornarHtmlJanela(this.RetornarHtmlParcialJanela());
        }

        protected RetornarHtmlParcialJanela(): string
        {
            return HtmlReferenciaUtil.RetornarHtml(this);
        }

        protected RetornarHtmlJanela(htmlInterno: string): string
        {
            this.CssClasseControle;
            const procurar = "[[CONTEUDO_INTERNO]]";
            const html = HtmlReferenciaUtil.RetornarHtml(Janela.GetType() as r.TipoUIHtml);
            const posicao = html.indexOf(procurar);
            const sb = new StringBuilder();
            sb.AppendLine(html.substring(0, posicao));
            sb.AppendLine(htmlInterno);
            sb.AppendLine(html.substring(posicao + procurar.length, html.length));
            return sb.ToString();
        }

        protected override AtualizarCssClassesControle(): void
        {
            super.AtualizarCssClassesControle();
            return;
        }

        //#endregion

        //#region Barra de ações 

        private AtualizarBarraAcao(): void
        {
            switch (this.EstiloBarraAcao)
            {
                case EnumEstiloBarraAcao.Oculta:

                    this.OcultarBarraAcoes();
                    break;

                default:

                    EstiloUtil.AdicionarCssClasse(this.ElementoConteudoInterno, EnumCssTipoBarraAcao.Normal);
                    EstiloUtil.AdicionarCssClasse(this.ElementoBarraAcao, this.EstiloBarraAcao);

                    this.ElementoBarraAcao.style.zIndex = (ConverterUtil.ParaNumero(this.Elemento.style.zIndex) + 1).ToString();
                    break;
            }
        }

        //#endregion

        //#region Mostrar

        public async MostrarAsync(callback?: (resultado: TResultadoFecharJanelaArgs) => void): Promise<TResultadoFecharJanelaArgs>
        {
            if ($Aplicacao?.DocumentoPrincipal?.IsOcupado && !(this instanceof JanelaOcupado))
            {
                console.warn(`É recomendado desocupar o sistema antes de mostrar uma janela ${this.constructor.name} `);
            }

            const resultado = await new Promise<TResultadoFecharJanelaArgs>(resolver =>
            {
                this.TryMostrarInternoAsync(function (resultado: TResultadoFecharJanelaArgs)
                {
                    resolver(resultado);
                });
            });

            if (typeof callback === "function")
            {
                callback(resultado);
                /*return resultado;*/
            }
            return resultado;
        }

        //private MostrarAsync(): Promise<TResultadoFecharJanelaArgs>
        //{
        //    return
        //}

        private async TryMostrarInternoAsync(callback: CallbackResultado<TResultadoFecharJanelaArgs>)
        {
            try
            {
                await this.MostrarInternoAsync(callback);
            }
            catch (erro)
            {
                console.error(erro);
                this.FecharInterno();
                const resultado = new ResultadoFecharJanelaArgs(this, false, erro) as TResultadoFecharJanelaArgs;
                callback(resultado);
            }
        }

        private async MostrarInternoAsync(callback: CallbackResultado<TResultadoFecharJanelaArgs>) 
        {
            if (!this.IsAberta)
            {
                const isReabriando = this.IsControleInicializado;
                if (!this.IsControleInicializado)
                {
                    this.InicializarControle();
                    $Aplicacao.DocumentoPrincipal?.EventoJanelaCarregada?.Notificar(this, EventArgs.Empty);
                    await ThreadUtil.EsperarAsync(10);
                }

                if (this.IsControleInicializado)
                {
                    this.__camposPrivadosJanela.callbackFechar = callback;
                    this.AtualizarFundo(true);
                    this.__camposPrivadosJanela.isAberta = true;

                    if (isReabriando)
                    {
                        this.MostrarElemento();
                        this.NotificarControleCarregado();
                    }

                    this.Elemento?.classList.remove("sn-janela-sair");
                    this.Elemento.classList.add("sn-janela-entrar");
                    await ThreadUtil.QuebrarAsync();
                    this.Centralizar();
                }
            }
        }

        //#endregion

        //#region Eventos click

        private BtnFecharJanelaInterno_Click(): void
        {
            this.FecharAsync(false);
        }

        private BtnMaximizarJaenlaInterno_Click(): void
        {
            this.Maximizar();
        }

        private BtnRestaurarJanelaInterno_Click(): void
        {
            this.Restaurar();
        }

        private WindowClicouFora_MouseDown(e: MouseEvent)
        {
            if (!(this.IsMouseEmCimaDoElemento(e.pageX, e.pageY, this.ElementoApresentacao)))
            {
                this.FecharAsync(false);
            }
        }

        //#endregion

        //#region KeyDown - EscFechar

        private WindowInterno_KeyDown(event: KeyboardEvent): void
        {
            if (!this.IsControleInicializado)
            {
                return;
            }
            if (KeyCodeUtil.IsKeyCodeEsc(event.keyCode))
            {
                if (this.IsFecharEsc && this.IsMostrarBotaoFechar)
                {
                    if (!this.IsExisteJanejaFilho())
                    {
                        this.Cancelar();
                    }
                }
            }
        }

        private IsExisteJanejaFilho(): boolean
        {
            const existeJanelaFilho = this.RetornarControleFilhos(Janela as any, true);
            return existeJanelaFilho.Count > 0;
        }

        protected Cancelar(): void
        {
            this.FecharAsync(false, null);
        }

        //#endregion

        //#region Evento Resize

        private WindowInterno_Resize(): void
        {
            if (!this.IsControleInicializado)
            {
                return;
            }
            this.__camposPrivadosJanela.windowsResizeDepois.Executar();
        }

        private JanelaTela_Alterada(): void
        {
            this.__camposPrivadosJanela.windowsResizeDepois.Cancelar();
            this.AtualizarPosicoesLimite();
            this.Centralizar();
        }

        private WindowsResizeDepois_Executar()
        {
            if (!this.IsControleInicializado)
            {
                return;
            }
            this.AtualizarPosicoes();
        }

        protected AtualizarPosicoes()
        {
            this.AtualizarPosicoesLimite();

            if (this.PosicaoX > 0 &&
                this.PosicaoY > 0)
            {
                this.AtualizarPosicao(this.PosicaoX, this.PosicaoY);
            }
        }

        //#endregion

        //#region Métodos protegidos

        protected Maximizar(): void
        {
            const elementoConteudo = this.ElementoConteudo;
            const posicoes = elementoConteudo.getBoundingClientRect();

            this.__camposPrivadosJanela.alturaRestaurar = posicoes.height;
            this.__camposPrivadosJanela.larguraRestaurar = posicoes.width;
            this.__camposPrivadosJanela.posicaoXRestaurar = posicoes.left;
            this.__camposPrivadosJanela.posicaoYRestaurar = posicoes.top;

            this.OcultarBotaoMaximiar();

            if (this.IsMostrarBotaoRestaurarMaximizar)
            {
                this.MostrarBotaoRestaurar();
            }
            this.Elemento.classList.remove(EnumCssClasseJanela.JanelaCentro);
            this.Elemento.classList.add(EnumCssClasseJanela.JanelaMaximizar);

            this.BtnFecharJanelaInterno.Elemento.classList.add("sn-fechar-janela-interno");

            this.__camposPrivadosJanela.IsJanelaMaximizada = true;
        }

        protected Restaurar(): void
        {
            this.__camposPrivadosJanela.IsJanelaMaximizada = false;
            this.__camposPrivadosJanela.isMovimentou = false;

            this.OcultarBotaoRestaurar();
            this.MostrarBotaoMaximizar();

            this.Elemento.classList.remove(EnumCssClasseJanela.JanelaMaximizar);

            this.ElementoConteudo.style.width = this.__camposPrivadosJanela.larguraRestaurar.ToPixels();
            this.ElementoConteudo.style.height = this.__camposPrivadosJanela.alturaRestaurar.ToPixels();

            this.AtualizarPosicao(this.__camposPrivadosJanela.posicaoXRestaurar,
                this.__camposPrivadosJanela.posicaoYRestaurar);
        }

        public OcultarBarraAcoes(): void
        {
            this.ElementoBarraAcao?.OcultarElemento();
            this.IsMostrarBarraAcoes = false;
        }

        public OcultarBotaoFechar(): void
        {
            this.BtnFecharJanelaInterno.OcultarElemento();
        }

        protected OcultarBotaoMaximiar(): void
        {
            this.BtnMaximizarJaenlaInterno.OcultarElemento();
        }

        protected OcultarBotaoRestaurar(): void
        {
            this.BtnRestaurarJanelaInterno.OcultarElemento();
        }

        public MostrarBotaoFechar(): void 
        {
            this.BtnFecharJanelaInterno.MostrarElemento();
        }

        protected MostrarBarraAcoes(): void
        {
            this.ElementoBarraAcao?.MostrarElemento();
            this.IsMostrarBarraAcoes = true;
        }

        protected MostrarBotaoMaximizar(): void
        {
            this.BtnMaximizarJaenlaInterno.MostrarElemento();
        }

        protected MostrarBotaoRestaurar(): void
        {
            this.BtnRestaurarJanelaInterno.MostrarElemento();
        }

        //#endregion

        //#region Arrastar Janela

        private SENSIBILIDADE: number = 5;

        private PosicaoX: number;
        private PosicaoY: number;

        private PosicaoXInicial: number;
        private PosicaoYInicial: number;

        private PageXInicial: number = 0;
        private PageYInicial: number = 0;

        private MaiorX: number;
        private MaiorY: number;

        private ElementoInterno_MouseDown(e: MouseEvent): void
        {
            if (!this.IsControleInicializado)
            {
                return;
            }
            if (e.IsBotaoEsquerdo &&
                this.IsMouseEmCimaDoElemento(e.pageX, e.pageY, this.ElementoMovimentacao))
            {
                this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_PreviaMouseMove);
                this.AdicionarEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);

                this.PageXInicial = e.pageX;
                this.PageYInicial = e.pageY;
                e.preventDefault();
            }
        }

        private Window_PreviaMouseMove(e: MouseEvent): void
        {
            const diferencaX = Math.abs(e.pageX - this.PageXInicial);
            const diferencaY = Math.abs(e.pageY - this.PageYInicial);

            if (diferencaX > this.SENSIBILIDADE || diferencaY > this.SENSIBILIDADE)
            {
                this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_PreviaMouseMove);
                this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);

                const elementoJanela = this.ElementoConteudo;
                const posicoes = elementoJanela.getBoundingClientRect();

                this.PosicaoXInicial = posicoes.left;
                this.PosicaoYInicial = posicoes.top;

                this.AtualizarPosicoesLimite();
                this.AtualizarPosicao(this.PosicaoXInicial, this.PosicaoYInicial);
                this.__camposPrivadosJanela.isMovimentou = true;

                EstiloUtil.DefinirCursorGlogal("grabbing");

                this.Window_MouseMove(e);
            }
        }

        private Window_MouseMove(e: MouseEvent): void
        {
            const diferencaX = (e.pageX - this.PageXInicial);
            const diferencaY = (e.pageY - this.PageYInicial);
            const posicaoX = (this.PosicaoXInicial + diferencaX);
            const posicaoY = (this.PosicaoYInicial + diferencaY);

            this.AtualizarPosicao(posicaoX, posicaoY);
            this.AtualizarPosicoesMensagemValidacao();
        }

        protected AtualizarPosicao(posicaoX: number, posicaoY: number)
        {
            this.Elemento.classList.remove(EnumCssClasseJanela.JanelaCentro);

            if (posicaoX < 0) posicaoX = 0;
            if (posicaoX > this.MaiorX) posicaoX = this.MaiorX;

            if (posicaoY < 0) posicaoY = 0;
            if (posicaoY > this.MaiorY) posicaoY = this.MaiorY;

            const elementoJanela = this.ElementoConteudo;
            elementoJanela.style.left = posicaoX.ToPixels();
            elementoJanela.style.top = posicaoY.ToPixels();

            this.PosicaoX = posicaoX;
            this.PosicaoY = posicaoY;

            this.EventoPosicaoAlterada.Notificar(this, EventArgs);
        }

        private Window_MouseUp(): void
        {
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_PreviaMouseMove);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);

            EstiloUtil.DefinirCursorGlogal("auto");
        }

        private AtualizarPosicoesLimite(): void
        {
            const elementoJanela = this.ElementoConteudo;
            if (elementoJanela != null)
            {
                const posicoes = elementoJanela.getBoundingClientRect();
                this.MaiorX = window.innerWidth - posicoes.width;
                this.MaiorY = window.innerHeight - posicoes.height;
            }
        }
        //#endregion

        //#region Métodos privados

        private AtualizarFundo(isMostrar: boolean, isJanelaTop: boolean = false)
        {

            if (isMostrar && this.IsMostrarFundoJanelaInterno())
            {
                $Aplicacao.DocumentoPrincipal?.MostrarFundoOcupado((this.__camposPrivadosJanela.__zIndex - 1));

                return;
            }

            const janelaPagina = this.RetornarControlePai(Janela, false, true);
            if (janelaPagina instanceof Janela)
            {
                janelaPagina.AtualizarFundo(true, isJanelaTop);
                return;
            }

            if (!isJanelaTop)
            {
                const janelaTop = $Aplicacao.DocumentoPrincipal?.RetornarJanelaTop();
                if (janelaTop instanceof Janela)
                {
                    janelaTop.AtualizarFundo(true, true);
                    return;
                }
            }
            $Aplicacao.DocumentoPrincipal?.OcultarFundoOcupado();
        }

        private IsMostrarFundoJanelaInterno()
        {
            return this.IsMostrarFundoJanela &&
                ElementoUtil.IsVisivel(this.Elemento) &&
                !this.IsDispensado &&
                this.IsControleInicializado;
        }

        //#endregion

        //#region IDisposable

        //public Fechar(argumento?: boolean | ResultadoFecharJanelaArgs, erro?: Error): void
        //{
        //    this.FecharAsync(argumento);
        //}

        //public async FecharAsync(argumento?: boolean | ResultadoFecharJanelaArgs, erro?: Error, callback?: Function)
        //{
        //    await this.FecharAsync(argumento, erro);

        //    if (callback != null)
        //    {
        //        callback();
        //    }
        //}


        public async FecharAsync(argumento?: boolean | TResultadoFecharJanelaArgs, erro?: Error, callback?: Function): Promise<any>
        {
            await this.FecharInternoAsync(argumento, erro);
            if (callback != null)
            {
                callback();
            }
        }

        private async FecharInternoAsync(argumento?: boolean | TResultadoFecharJanelaArgs, erro?: Error): Promise<void>
        {
            if (!this.IsControleInicializado)
            {
                return;
            }

            let resultado: TResultadoFecharJanelaArgs;
            if (argumento instanceof ResultadoFecharJanelaArgs)
            {
                resultado = argumento;
            }
            else
            {
                erro = u.ValidacaoUtil.IsDefinido(erro) ? erro : null;
                resultado = new ResultadoFecharJanelaArgs(this, u.ConverterUtil.ParaBoolean(argumento), erro) as TResultadoFecharJanelaArgs;
            }

            const [isPodeFecharJanela, resultadoNormalizado] = await this.IsPodeFecharJanelaAsync(resultado);
            if (isPodeFecharJanela)
            {
                await this.FechandoAsync(resultadoNormalizado);
            }
        }

        protected async FechandoAsync(resultadoNormalizado: TResultadoFecharJanelaArgs)
        {
            this.__camposPrivadosJanela.isAberta = false;
            this.__camposPrivadosJanela.resultadoFechar = resultadoNormalizado;

            this.Elemento.classList.remove("sn-janela-entrar");
            this.Elemento.classList.add("sn-janela-sair");
            await ThreadUtil.EsperarAsync(10);

            this.FecharInterno();

            if (u.ValidacaoUtil.IsCallback(this.__camposPrivadosJanela.callbackFechar))
            {
                this.__camposPrivadosJanela.callbackFechar(this.ResultadoFechar);
                this.__camposPrivadosJanela.callbackFechar = null;
                /*ThreadUtil.ExecutarAsync(this.#CallbackFechar, 10, resultado);*/
                //this.#CallbackFechar = null;
            }
        }

        protected async IsPodeFecharJanelaAsync(resultado: TResultadoFecharJanelaArgs): Promise<[boolean, TResultadoFecharJanelaArgs]>
        {
            return [true, resultado];
        }

        public Centralizar(): void
        {
            this.PosicaoX = null;
            this.PosicaoY = null;
            if (!this.__camposPrivadosJanela.IsJanelaMaximizada)
            {
                const rect = this.ElementoConteudo.getBoundingClientRect();
                this.Elemento.classList.remove(EnumCssClasseJanela.JanelaCentro);
                const posicaoX = (window.innerWidth - rect.width) / 2;
                const posicaoY = (window.innerHeight - rect.height) / 2;
                this.AtualizarPosicao(posicaoX, posicaoY);
            }
        }

        public override ReInicializar(): void
        {
            super.ReInicializar();
            this.Centralizar();
            if (this.IsAberta)
            {
                this.Elemento.classList.add("sn-janela-entrar");
            }
        }

        public override MostrarElemento(): void
        {
            if (this.IsControleInicializado)
            {
                super.MostrarElemento();
                this.__camposPrivadosJanela.isAberta = true;
            }
        }

        public override OcultarElemento(): void
        {
            this.__camposPrivadosJanela.isAberta = false;
            super.OcultarElemento();
        }

        private FecharInterno(): void
        {
            this.__camposPrivadosJanela.isAberta = false;
            this.AtualizarFundo(false);
            if (this.IsDispensarAoFechar)
            {
                this.Dispose();
            }
            else
            {
                this.OcultarElemento();
            }
        }

        public override Dispose()
        {
            if (!this.IsDispensado)
            {
                this.EventoTelaAlterada?.RemoveHandler(this.JanelaTela_Alterada, this);
                $Aplicacao.DocumentoPrincipal?.EventoJanelaDescarregada.Notificar(this, EventArgs.Empty);
                super.Dispose();
            }
        }
        //#endregion

    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface Janela
    {
        readonly ElementoBarraAcao: HTMLDivElement;
        readonly BtnRestaurarJanelaInterno: ui.Botao;
        readonly BtnMaximizarJaenlaInterno: ui.Botao;
        readonly BtnFecharJanelaInterno: ui.Botao;
        readonly ElementoConteudoInterno: HTMLDivElement;
    }

    //#endregion

    class JanelaCamposPrivados
    {
        isAberta: boolean;
        isMovimentou: boolean;
        alturaRestaurar: number;
        larguraRestaurar: number;
        posicaoXRestaurar: number;
        posicaoYRestaurar: number;
        resultadoFechar: ResultadoFecharJanelaArgs;
        __zIndex: number;
        callbackFechar: CallbackResultado<ResultadoFecharJanelaArgs>;
        IsJanelaMaximizada: boolean = false;
        windowsResizeDepois: ExecutarDepois<any>;
    }

}