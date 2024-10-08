﻿namespace Snebur.UI
{
    export abstract class DocumentoPrincipal extends ControleApresentacao
    {
        private static readonly TEMPO_MOSTRAR_JANELA_OCUPADO: number = TimeSpan.FromSeconds(0.5).TotalMilliseconds;
        private static readonly TEMPO_FECHAR_JANELA_OCUPADO: number = TimeSpan.FromSeconds(0.5).TotalMilliseconds;
        private static readonly TAG_FUNDO_OCUPADO = "sn-fundo-ocupado";
        private static readonly CSS_MOSTRAR_FUNDO_OCUPADO = "sn-fundo-ocupado--mostrar";

        private readonly DicionarioNavegador = new DicionarioSimples<BaseNavegador>();
        protected _titulo: string;
        private __NavegadorPrincipal: NavegadorPrincipal;
        private __IdentificadorTimeoutMostrarJanelaOcupado: number;
        private __IdentificadorTimeoutFecharJanelaOcupado: number;
        private __JanelaOcupado: JanelaOcupado;
        //private __IsSistemaOcupado: boolean = false;
        private __BarraEnvioArquivos: BarraEnvioArquivos;
        //private IDElementoConteudo: string;

        private readonly AtualizarAparenciaDepois = new ExecutarDepois(this.AtualizarAparencia.bind(this), 20);

        public get NavegadorPrincipal(): NavegadorPrincipal
        {
            return this.__NavegadorPrincipal;
        }

        protected get ElementoFundoOcupado(): HTMLElement
        {
            return this.RetornarElementoFundoOcupado();
        }

        public readonly JanelasCarregada = new List<Janela>();
        public readonly EventoJanelaCarregada = new Evento(this);
        public readonly EventoJanelaDescarregada = new Evento(this);
         
        public get Titulo(): string
        {
            return this._titulo;
        }

        private readonly GerenciadorFalhaConexao: GerenciadorFalhaConexao;

        public constructor(elemento?: HTMLElement)
        {
            super(null, elemento);
            //this.CssClasseControle = "sn-documento-principal";
            this.EventoCarregado.AddHandler(this.DocumentoPrincipalInterno_Carregado, this);
            /*            this.EventoTelaAlterada.AddHandler(this.Tela_Alterada, this);*/
            this.IsAdicionarElementoConteudoApresentacao = false;
            this._titulo = document.title;
            this.GerenciadorFalhaConexao = new GerenciadorFalhaConexao();
        }

        protected override Inicializar()
        {
            super.Inicializar();
             
            this.EventoJanelaCarregada.AddHandler(this.DocumentoPrincipal_JanelaCarregada, this);
            this.EventoJanelaDescarregada.AddHandler(this.DocumentoPrincipal_JanelaDescarregada, this);

            this.AdicionarEventoDomGlobal(EnumEventoDom.Resize, this.Window_Resize, this);
            this.InicializarMonitorEnvioArquivos();
        }

        private DocumentoPrincipalInterno_Carregado(): void
        {
            this.EventoTelaAlterada.AddHandler(this.DocumentoPrincipalInterno_TelaAlterada, this);
            window.focus();
            document.documentElement.focus();

            if (Snebur.$Configuracao.IsDebug)
            {
                this.AdicionarEventoDomGlobal(EnumEventoDom.KeyDown, this.Document_KeyDown_Debug, this);
            }
        }

        private Document_KeyDown_Debug(e: KeyboardEvent)
        {
            if (!e.ctrlKey)
            {
                if (e.keyCode === EnumKeyCode.F5)
                {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                }
            }
            return true;
        }

        private DocumentoPrincipalInterno_TelaAlterada(): void
        {
            this.AtualizarAparenciaDepois.Executar();
        }

        private Window_Resize()
        {
            this.AtualizarAparenciaDepois.Executar();
        }

        public override AtualizarAparencia()
        {
            super.AtualizarAparencia();
            this.AtualizarPosicoesMensagemValidacao();
        }

        public AdicionarNavegador(navegador: BaseNavegador): void
        {
            ValidacaoUtil.ValidarArgumentoDefinido({ navegador });

            if (navegador instanceof NavegadorPrincipal)
            {
                if (this.__NavegadorPrincipal != null)
                {
                    throw new ErroOperacaoInvalida("O navegador principal já foi definido", this);
                }
                this.__NavegadorPrincipal = navegador;
            }
            this.DicionarioNavegador.Add(navegador.IdentificadorNavegador, navegador);
        }

        public RemoverNavegador(navegador: BaseNavegador): void
        {
            if (navegador instanceof NavegadorPrincipal)
            {
                this.__NavegadorPrincipal = null;
            }
            this.DicionarioNavegador.Remove(navegador.IdentificadorNavegador);
        }

        public RetornarNavegadorPrincipal(): NavegadorPrincipal;
        public RetornarNavegadorPrincipal(ignorarErro: boolean): NavegadorPrincipal;
        public RetornarNavegadorPrincipal(ignorarErro = false): NavegadorPrincipal
        {
            if (!(this.__NavegadorPrincipal instanceof NavegadorPrincipal))
            {
                if (ignorarErro)
                {
                    return null;
                }
                throw new ErroNaoDefinido("O navegador principal não foi definido", this);
            }
            return this.__NavegadorPrincipal;
        }

        public RetornarNavegador(): NavegadorPrincipal
        public RetornarNavegador(identificador: null): NavegadorPrincipal
        public RetornarNavegador(identificador: string): Navegador
        public RetornarNavegador(identificador?: string): BaseNavegador
        {
            if (identificador == null)
            {
                return this.RetornarNavegadorPrincipal();
            }

            if (!this.DicionarioNavegador.ContainsKey(identificador))
            {
                throw new Erro(`O navegador ${identificador} não foi encontrado`);
            }
            return this.DicionarioNavegador.Item(identificador);
        }
        //#endregion

        //#region Janelas

        public RetornarJanelaTop(): Janela
        public RetornarJanelaTop(isIncluirDocumentoPrincipal: true): Janela | DocumentoPrincipal
        public RetornarJanelaTop(isIncluirDocumentoPrincipal: boolean = false): Janela | DocumentoPrincipal
        {
            if (this.JanelasCarregada.Count > 0)
            {
                return this.JanelasCarregada.
                    Where(x => x.IsMostrarFundoJanela && x.IsAberta).
                    MaxObjeto(x => x.ZIndex);
            }
            if (isIncluirDocumentoPrincipal)
            {
                return this;
            }
            return null;
        }

        private DocumentoPrincipal_JanelaCarregada(janela: Janela)
        {
            if (!this.JanelasCarregada.Contains(janela))
            {
                this.JanelasCarregada.Add(janela);
            }
        }

        private DocumentoPrincipal_JanelaDescarregada(janela: Janela)
        {
            this.JanelasCarregada.Remove(janela);
        }
        //#endregion
         

        protected override RetornarElementoDestino(): HTMLElement
        {
            return document.body;
        }

        protected override RetornarTagNovoElemento()
        {
            return "sn-documento-principal";
        }
        //#region Monitor envio de arquivos

        private InicializarMonitorEnvioArquivos()
        {
            if (this.GerenciadorEnvioArquivo != null)
            {
                this.__BarraEnvioArquivos = $Aplicacao.RetornarBarraEnvio(this);
                this.__BarraEnvioArquivos.InicializarControle();
                this.ControlesFilho.Add(this.__BarraEnvioArquivos);
            }
        }
        //#endregion

        //#region Focus
        public override Focus(): void
        {
            if (this.IsControleInicializado)
            {
                this.Elemento.focus();
            }
        }

        public DesfocarTudo(): void
        {
            if (this.IsControleInicializado)
            {
                document.documentElement.blur();
                window.blur();
                setTimeout(() =>
                {
                    if (this.ElementoApresentacao instanceof HTMLElement)
                    {
                        this.ElementoApresentacao.blur();
                    }
                });
            }
        }

        //#endregion

        //#region Ocupar

        public override get ProgressoOcupadoAtual()
        {
            return this.__JanelaOcupado?.Progresso ?? 0;
        }

        public override Ocupar(): void;
        public override Ocupar(titulo: string, mensagem: string): void;
        public override Ocupar(opcao: EnumOpcaoOcupar): void;
        public override Ocupar(isOcuparImeditamente: boolean): void;
        public override Ocupar(argumento?: EnumOpcaoOcupar | boolean | string, mensagem?: string, baseControle?: BaseControle): void;
        public override Ocupar(argumento?: EnumOpcaoOcupar | boolean | string, mensagem: string = null, baseControle: BaseControle = this): void
        {
            const [opcao, titulo] = this.NormalizarArgumentoOcupar(argumento);
            window.clearTimeout(this.__IdentificadorTimeoutFecharJanelaOcupado);

            if (!this.IsOcupado)
            {
                this.OcuparElemento();

                const controlesFilhos = this.DicionarioControlesFilho.Valores;
                for (const controleFilho of controlesFilhos)
                {
                    (controleFilho as any as IOcuparElemento).OcuparElemento();
                }
                (this as any).IsOcupadoInterno = true;

                switch (opcao)
                {
                    case EnumOpcaoOcupar.NaoMostrarJanelaOcupado:
                    case EnumOpcaoOcupar.SomenteElemento:
                        //não faz nada;
                        break;
                    case EnumOpcaoOcupar.Padrao:

                        //a janela de ocupado ir abrir depois de 1 segundo
                        this.__IdentificadorTimeoutMostrarJanelaOcupado = window.setTimeout(this.MostrarJanelaOcupado.bind(this, titulo, mensagem, baseControle), DocumentoPrincipal.TEMPO_MOSTRAR_JANELA_OCUPADO);
                        break;
                    case EnumOpcaoOcupar.MostrarJanelaOcupadoImediatamente:

                        this.MostrarJanelaOcupado(titulo, mensagem, baseControle);
                        break;

                    default:

                        throw new Erro("O opção não é suportada", this);
                }
            }
        }

        private NormalizarArgumentoOcupar(argumento: boolean | EnumOpcaoOcupar | string): [EnumOpcaoOcupar, string]
        {
            if (typeof argumento === "string" && !String.IsNullOrWhiteSpace(argumento))
            {
                return [EnumOpcaoOcupar.MostrarJanelaOcupadoImediatamente, argumento];
            }
            if (typeof argumento === "number" && EnumUtil.IsDefindo(EnumOpcaoOcupar, argumento))
            {
                return [argumento, null];
            }
            if (typeof argumento === "boolean" && argumento)
            {
                return [EnumOpcaoOcupar.MostrarJanelaOcupadoImediatamente, null];
            }
            return [EnumOpcaoOcupar.Padrao, null];
        }
         

        public override DesocuparAsync(): Promise<void>
        {
            return new Promise<void>(resolver =>
            {
                this.DesocuparInterno(() =>
                {
                    (this as any).IsOcupadoInterno = false;
                    resolver();
                });
            });
        }

        private readonly CallbacksDesocupar = new List<Function>();

        private DesocuparInterno(callback: Function = null): void
        {
            window.clearTimeout(this.__IdentificadorTimeoutMostrarJanelaOcupado);

            if (!this.IsOcupado)
            {
                if (u.ValidacaoUtil.IsFunction(callback))
                {
                    callback();
                }
                return;
            }
            this.DesocuparElemento();


            const controlesFilhos = this.DicionarioControlesFilho.Valores;
            for (const controleFilho of controlesFilhos)
            {
                (controleFilho as any as IOcuparElemento).DesocuparElemento();
            }
            (this as any).IsOcuapdoInterno = false;

            if (this.__JanelaOcupado instanceof JanelaOcupado)
            {
                if (callback instanceof Function)
                {
                    this.CallbacksDesocupar.Add(callback);
                }
                this.__IdentificadorTimeoutFecharJanelaOcupado = window.setTimeout(this.FecharJanelaOcupado.bind(this), DocumentoPrincipal.TEMPO_FECHAR_JANELA_OCUPADO);
            }
            else
            {
                if (callback instanceof Function)
                {
                    callback();
                }
            }
        }

        protected override OcuparElemento(): void
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.cursor = "wait";
            }
            super.OcuparElemento();
        }

        protected override DesocuparElemento(): void
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.cursor = "";
            }
            super.DesocuparElemento();
        }
         
        private MostrarJanelaOcupado(titulo: string, mensagem: string, baseControleOrigem: BaseControle): void
        {
            //janela pode ser sido dispensar por outro controle, no evento Dispose
            if (this.__JanelaOcupado?.IsDispensado)
            {
                this.__JanelaOcupado = null;
            }
            if (this.IsControleInicializado && (!(this.__JanelaOcupado instanceof JanelaOcupado)))
            {
                this.__JanelaOcupado = new JanelaOcupado(baseControleOrigem, titulo, mensagem);
                this.__JanelaOcupado.MostrarAsync();
            }
            this.TituloOcupado(titulo);
            this.MensagemOcupado(mensagem);
        }

        private FecharJanelaOcupado(): void
        {
            const janelaOcupado = this.__JanelaOcupado;
            if (janelaOcupado instanceof JanelaOcupado)
            {
                this.__JanelaOcupado = null;
                janelaOcupado.FecharAsync(true);

                while (this.CallbacksDesocupar.Count > 0)
                {
                    const callback = this.CallbacksDesocupar.shift();
                    if (callback instanceof Function)
                    {
                        callback();
                        /*setTimeout(callback);*/
                    }
                }
            }
        }

        public override TituloOcupado(titulo: string): void
        {
            if (this.__JanelaOcupado instanceof JanelaOcupado)
            {
                this.__JanelaOcupado.ViewModel.Titulo = titulo ?? JanelaOcupadoViewModel.TITULO_PADRAO;
            }
        }

        public override MensagemOcupado(mensagem: string): void
        {
            if (this.__JanelaOcupado instanceof JanelaOcupado)
            {
                this.__JanelaOcupado.ViewModel.Mensagem = mensagem ?? JanelaOcupadoViewModel.MENSAGEM_PADRAO;
            }
        }

        public override ProgressoOcupado(progresso: number): void
        {
            if (this.__JanelaOcupado instanceof JanelaOcupado)
            {
                if (u.ValidacaoUtil.IsNumber(progresso))
                {
                    progresso = NormalizacaoUtil.NormalizarProgresso(progresso);
                    this.__JanelaOcupado.Progresso = progresso;
                }
            }
        }

        public MostrarFundoOcupado(zIndex?: number)
        {
            const elemenotFundoJanela = $Aplicacao.DocumentoPrincipal.ElementoFundoOcupado;

            if (typeof zIndex === "number" && zIndex > 0)
            {
                elemenotFundoJanela.style.zIndex = zIndex.ToString();
            }

            if (!elemenotFundoJanela.classList.contains(DocumentoPrincipal.CSS_MOSTRAR_FUNDO_OCUPADO))
            {
                elemenotFundoJanela.classList.add(DocumentoPrincipal.CSS_MOSTRAR_FUNDO_OCUPADO);
            }
        }

        public OcultarFundoOcupado()
        {
            const elemenotFundoJanela = this.ElementoFundoOcupado;
            if (elemenotFundoJanela.classList.contains(DocumentoPrincipal.CSS_MOSTRAR_FUNDO_OCUPADO))
            {
                elemenotFundoJanela.classList.remove(DocumentoPrincipal.CSS_MOSTRAR_FUNDO_OCUPADO);
            }
        }

        //#endregion

        private RetornarElementoFundoOcupado(): HTMLElement
        {
            let elemento = this.Elemento.querySelector(DocumentoPrincipal.TAG_FUNDO_OCUPADO) as HTMLElement;
            if (elemento == null)
            {
                elemento = document.createElement(DocumentoPrincipal.TAG_FUNDO_OCUPADO);
                this.Elemento.appendChild(elemento);
                /*elemento.OcultarElemento();*/
                return this.RetornarElementoFundoOcupado();
            }
            return elemento;
        }
    }
    interface IOcuparElemento
    {
        OcuparElemento(): void;
        DesocuparElemento(): void;
    }
}