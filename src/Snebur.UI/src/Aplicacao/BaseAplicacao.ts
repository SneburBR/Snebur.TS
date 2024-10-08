﻿namespace Snebur.UI
{
    //importações local
    import MensagemControleAlterado = Snebur.Depuracao.MensagemControleAlterado;
    import MensagemEstiloCssAlterado = Snebur.Depuracao.MensagemEstiloCssAlterado;
    import MensagemEventArgs = Snebur.Depuracao.MensagemEventArgs;

    export abstract class BaseAplicacao<TDocumentoPrincipal extends DocumentoPrincipal = DocumentoPrincipal> extends Snebur.Aplicacao.BaseAplicacao
    {
        //#region Contantes
        private static readonly TEMPO_MAXIMO_CARREGAR_FONTES_ICONE = 30000;
        private static readonly FONTE_ICONES = "24px 'Material Icons'"
        protected readonly NomeElementoProgressoCarregandoAplicacao: string = "sn-progresso-carregando-aplicacao";
        protected readonly NomeElementoCarregandoAplicacao: string = "sn-carregando-aplicacao";
        //#endregion

        //#region Propriedades 

        private _documentoPrincipal: TDocumentoPrincipal;
        /*private _isObservacaoHistoricoAtiva: boolean = true;*/


        public override get DocumentoPrincipal(): TDocumentoPrincipal
        {
            return this._documentoPrincipal;
        }

        public override GerenciadorAbrirImagemLocal: GerenciadorAbrirImagemLocal;

        private ConstrutorDocumentoPrincipal: IDocumentoPrincipalConstrutor<TDocumentoPrincipal>;

        private ConstrutorJanelaAutenticacao: IJanelaAutenticacaoConstrutor;

        public override readonly DicionarControlesCarregado = new DicionarioSimples<HashSet<BaseControle>>();

        private readonly ReiniciarDepois = new ExecutarDepois(this.ExecutarDepois_Reiniciar.bind(this), 500);

        public override IsReinicializandoControles: boolean = false;

        public override FuncaoDepoisControleApresentacaoInicializado: (controleApresentacao: ControleApresentacao) => void;

        //public override get IsObservacaoHistoricoAtiva()
        //{
        //    return this._isObservacaoHistoricoAtiva;
        //}


        //#endregion

        //#region Inicialização

        public override get IsCarregandoImagem(): boolean
        {
            return this.GerenciadorAbrirImagemLocal?.IsCarregandoImagem ?? false;
        }

        public override get IsMostrarLegendasToolTips(): boolean
        {
            return true;
        }

        public constructor(construtorJanelaEntrar?: IJanelaAutenticacaoConstrutor,
            construtorDocumentoPrincipal?: IDocumentoPrincipalConstrutor<TDocumentoPrincipal>)
        {
            super();

            //ElementoControleUtil.Registrar();
            this.ConstrutorDocumentoPrincipal = construtorDocumentoPrincipal;
            u.AutenticacaoUtil.ConstrutorJanelaEntrar = construtorJanelaEntrar;

            //####################### erro global desativado ########################################


            //window.addEventListener("error", this.Aplicacao_Error.bind(this));
            //document.addEventListener("error", this.Aplicacao_Error.bind(this));
            //window.onerror = this.Aplicacao_Error.bind(this);
            //document.onerror = this.Aplicacao_Error.bind(this);
        }

        protected override async InicializarAsync(): Promise<void>
        {
            window.EventoStopPropagation = new Snebur.Evento(this);

            this.AdicionarClassBody();
            this.NormalizarConfiguracao();

            console.EventoLog?.AddHandler(this.Console_Log, this);

            this.GerenciadorAbrirImagemLocal = new GerenciadorAbrirImagemLocal();
            this.RegistrarIdElementoCorpo();

            await super.InicializarAsync();
            this.IncrementarProcessoCarregandoAplicacao();
            await this.CarregarFonteIconesAsync();
            this.IncrementarProcessoCarregandoAplicacao();

            if ($Configuracao.IsDebug && !$Configuracao.IsDesativarServicoDepuracao)
            {
                this.ServicoDepuracao.EventoControleAlterado.AddHandler(this.ServicoDepuracao_ControleAlterado, this);
                this.ServicoDepuracao.EventoEstiloCssAlterado.AddHandler(this.ServicoDepuracao_EstiloCssAlterado, this);
                this.ServicoDepuracao.EventoScriptAlterado.AddHandler(this.ServicoDepuracao_ScriptAlterado, this);
            }

            if ($Configuracao.IsDebug && $Configuracao.IsTeste)
            {
                window.addEventListener("keydown", this.WindowDebug_KeyDow.bind(this));
            }

            if (!$Configuracao.IsPermitirUsuarioAnonimo &&
                !this.IsUsuarioLogado)
            {
                await this.DesocuparInicializacaoAsync();
                await u.AutenticacaoUtil.EntrarAsync();

                if (!this.IsUsuarioLogado)
                {
                    this.NotificarUsuarioAnonimoNaoSuportado();

                    await this.SairAsync();
                    throw new ErroOperacaoInvalida("Quando não é permitido usuário anonimo, a Janela entrar, não pode retornar o resultado até autenticação seja concluída com sucesso", this);
                }
            }

            console.log(" ANTES DE CARREGAR O DOCUMENTO PRINCIPAL");

            await this.InicializarRotasAsync();
            this.IncrementarProcessoCarregandoAplicacao();
            await this.AntesInicializarDocumentoPrincipalAsync();
            this.IncrementarProcessoCarregandoAplicacao();
            this.InicializarDocumentoPrincipal();
            this.IncrementarProcessoCarregandoAplicacao();
            await this.DepoisInicializarDocumentoPrincipalAsync();
            this.IncrementarProcessoCarregandoAplicacao();
        }

        private AdicionarClassBody()
        {
            const navegador = SistemaUtil.Navegador;
            const nomeNavegador = TextoUtil.RetornarSomentesLetrasNumeros(SistemaUtil.Navegador.Nome.toLowerCase());
            const versaoNavegador = SistemaUtil.Navegador.VersaoPrincipal;
            document.body.classList.add(`sn-${nomeNavegador}`);
            document.body.classList.add(`sn-${nomeNavegador}-${parseInt(versaoNavegador)}`);

            if (navegador.NavegadorEnum === d.EnumNavegador.Chrome)
            {
                if (versaoNavegador >= 49 && versaoNavegador <= 54)
                {
                    const cssClass = "sn-chrome-49-54";
                    document.body.classList.add(cssClass);
                }
                return;
            }
        }

        protected NotificarUsuarioAnonimoNaoSuportado()
        {

        }

        protected abstract InicializarRotasAsync(): Promise<void>;

        protected async AntesInicializarDocumentoPrincipalAsync(): Promise<void>
        {
            //pode ser sobrescrito
        }
        protected async DepoisInicializarDocumentoPrincipalAsync(): Promise<void>
        {
            //pode ser sobrescrito
            await this.DesocuparInicializacaoAsync();
        }

        public override RetornarBarraEnvio(documentoPrincipal: DocumentoPrincipal): BarraEnvioArquivos
        {
            return new BarraEnvioArquivos(documentoPrincipal);
        }

        private InicializarDocumentoPrincipal(): void
        {
            u.ValidacaoUtil.ValidarArgumentoDefinido({ ConstrutorDocumentoPrincipal: this.ConstrutorDocumentoPrincipal });

            this._documentoPrincipal = new this.ConstrutorDocumentoPrincipal();
            this.DocumentoPrincipal.InicializarControle();
        }

        private RegistrarIdElementoCorpo(): void
        {
            if (String.IsNullOrWhiteSpace(document.body.id))
            {
                document.body.id = ElementoUtil.RetornarNovoIDElemento(null, "corpo");
            }
        }

        protected async DesocuparInicializacaoAsync()
        {
            const elmementoCarregando = document.getElementById(this.NomeElementoCarregandoAplicacao);
            if (elmementoCarregando != null)
            {
                elmementoCarregando.style.opacity = "0";
                elmementoCarregando.style.visibility = "hidden";
                await ThreadUtil.EsperarAsync(200);
                elmementoCarregando.remove();
            }
        }

        //#endregion

        //#region ControlesCarregados

        public override NotificarControleCarregado(controle: BaseControle): void
        {
            if ($Configuracao.IsDebug)
            {
                let tipo = controle.GetType();
                while (tipo != null)
                {
                    const nomeTipo = tipo.Nome.toLowerCase();
                    if (!this.DicionarControlesCarregado.ContainsKey(nomeTipo))
                    {
                        this.DicionarControlesCarregado.Add(nomeTipo, new HashSet<BaseControle>());
                    }
                    this.DicionarControlesCarregado.Item(nomeTipo).Add(controle);
                    tipo = tipo.TipoBase;
                }
            }
        }

        public override NotificarControleCarregadoDescarregado(controle: BaseControle): void
        {
            if ($Configuracao.IsDebug)
            {
                let tipo = controle.GetType();
                while (tipo != null)
                {
                    const nomeTipo = tipo.Nome.toLowerCase();
                    if (this.DicionarControlesCarregado.ContainsKey(nomeTipo))
                    {
                        this.DicionarControlesCarregado.Item(nomeTipo).Remove(controle);
                    }
                    tipo = tipo.TipoBase;
                }
            }
        }

        //#endregion

        //#region Depuração

        private ServicoDepuracao_ControleAlterado(provedor: any, e: MensagemEventArgs<MensagemControleAlterado>) 
        {
            const mensagem = e.Mensagemn;
            const nomeControle = mensagem.NomeControle;
            if (mensagem.IsScript)
            {
                throw new Erro("Temporariamente descontinuado");

                //let construtor = u.ReflexaoUtil.RetornarConstrutor(mensagem.CaminhoConstrutor, null, true);
                //let namescape = u.ReflexaoUtil.RetornarValorPaiPropriedade(window, mensagem.CaminhoConstrutor, false);
                //if (u.ValidacaoUtil.IsConstrutor(construtor))
                //{
                //    let tipo = construtor.GetType();
                //    delete namescape[mensagem.NomeControle];

                //    let construtorValidar = u.ReflexaoUtil.RetornarConstrutor(mensagem.CaminhoConstrutor, null, true);
                //    if (u.ValidacaoUtil.IsConstrutor(construtorValidar))
                //    {
                //        console.error(" Não foi possível dispensar o script " + mensagem.NomeControle);
                //        return;
                //    }
                //}

                //await this.AtualizarScriptAsync(mensagem.UrlScriptRuntime);

                //let construtorRecuperado = u.ReflexaoUtil.RetornarConstrutor(mensagem.CaminhoConstrutor, null, true);
                //if (!u.ValidacaoUtil.IsConstrutor(construtorRecuperado))
                //{
                //    console.error("Falha ao atualizar controle " + mensagem.NomeControle);
                //    namescape[mensagem.NomeControle] = construtor;
                //    return;
                //}
                //construtorRecuperado.__CaminhoTipo = mensagem.CaminhoConstrutor;

            }
            else
            {

                this.IsReinicializandoControles = true;
                this.ReinicializarControles(nomeControle, false);
                this.IsReinicializandoControles = false;
            }
        }

        private async AtualizarScriptAsync(urlScript: string): Promise<boolean>
        {
            urlScript += "?" + GuidUtil.RetornarNovoGuid();

            const conteudo = await u.AjaxUtil.RetornarConteudoTextoAsync(urlScript, null, null, true);
            const isSucesso = ValidacaoUtil.IsString(conteudo) && !String.IsNullOrWhiteSpace(conteudo);
            if (isSucesso)
            {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.charset = "utf-8";
                script.src = urlScript;
                document.body.appendChild(script);
            }
            u.ThreadUtil.EsperarAsync(100);
            return isSucesso;
        }

        private ReinicializarControles(nomeControle: string, isReiniciarControlePai: boolean)
        {

            nomeControle = nomeControle.toLowerCase();

            if (this.DicionarControlesCarregado.ContainsKey(nomeControle))
            {
                const controles = this.DicionarControlesCarregado.Item(nomeControle);
                if (controles instanceof HashSet)
                {
                    for (const controle of controles.ToList())
                    {
                        if (controle.IsControleInicializado)
                        {
                            controle.ReInicializar(true);
                        }

                        //if ((isReiniciarControlePai && controle.ControlePai instanceof BaseControle) ||
                        //    ControleUtil.IsControleFlutuante(controle))
                        //{
                        //    if (controle instanceof ControleFlutuante)
                        //    {
                        //        controle.Fechar();
                        //    }
                        //    controle.ControlePai.ReInicializar(true);
                        //}
                        //else
                        //{
                        //    controle.ReInicializar(true);
                        //}
                    }
                }
            }
        }

        private ServicoDepuracao_ScriptAlterado(): void
        {
            this.ReiniciarDepois.Executar();
        }

        private ExecutarDepois_Reiniciar()
        {
            document.location.reload();
        }

        private ServicoDepuracao_EstiloCssAlterado(provedor: any, e: MensagemEventArgs<MensagemEstiloCssAlterado>): void
        {
            const mensagem = e.Mensagemn;
            const nomeArquivoEstilo = mensagem.NomeArquivo.toLowerCase();
            const elementosEstilo = Util.CopiarArray(document.getElementsByTagName("link")) as List<HTMLLinkElement>;
            for (const elementoEstilo of elementosEstilo)
            {
                const caminnoEhstilo = elementoEstilo.href;
                if (caminnoEhstilo.toLowerCase().Contains(nomeArquivoEstilo))
                {
                    const novaUrlEstilo = elementoEstilo.href.split("?").First() + "?" + GuidUtil.RetornarNovoGuid();
                    elementoEstilo.href = novaUrlEstilo;
                    console.WarmDebug(`Estilo atualizado: ${mensagem.NomeArquivo}`);
                }
            }
        }

        private Console_Log(provedor: any, e: ConsoleLogArgs)
        {
            if ((e.Tipo === EnumTipoLog.Erro || e.Tipo === EnumTipoLog.Alerta) && ($Configuracao.IsDebug || $Configuracao.IsTeste))
            {
                ConsoleUtil.InicializarVisualizacaoConsole(e);
            }

        }

        private Aplicacao_Error(e: ErrorEvent)
        {
            if (!e.IsErroCapturado)
            {
                e.IsErroCapturado = true;
                if (e instanceof Erro)
                {
                    throw e;
                }
            }
        }

        private WindowDebug_KeyDow(e: KeyboardEvent)
        {
            if (e.ctrlKey && e.shiftKey)
            {
                if (KeyCodeUtil.IsBackSpace(e.keyCode))
                {
                    console.warn(DebugUIInfoUtil.RetornarInfoCompleto(this));
                    return;
                }
                if (KeyCodeUtil.IsKeyCodeEspaco(e.keyCode))
                {
                    console.warn(DebugUIInfoUtil.RetornarInfoResumido(this));
                    return;
                }

            }
        }

        //#endregion

        //#region Icones
        private CarregarFonteIconesAsync(): Promise<void> | void
        {
            if (document.fonts == null)
            {
                return;
            }
            return new Promise<void>(resolver => this.CarregarFonteIconesInternoAsync(resolver));
        }
        private async CarregarFonteIconesInternoAsync(_baseResolver: () => void): Promise<void>  
        {
            if (document.fonts == null)
            {
                return;
            }

            let isFinalzizado = false;
            const resolver = () =>
            {
                if (!isFinalzizado)
                {
                    isFinalzizado = true;
                    _baseResolver();
                }
            };

            /*eslint-disable*/

            let isFonteCarregada: boolean = document.fonts.check(BaseAplicacao.FONTE_ICONES);
            if (!isFonteCarregada)
            {
                let tempo = Stopwatch.StartNew();
                this.__CarregarFonteIconesInternoAsync(resolver);
                 
                let isLogNotificado = false;
                while (!isFonteCarregada && !isFinalzizado)
                {
                    if (tempo.ElapsedMilliseconds > BaseAplicacao.TEMPO_MAXIMO_CARREGAR_FONTES_ICONE)
                    {
                        console.error("Não foi possível carregar as fontes dos icones, tempo máximo atingido");
                        break;
                    }

                    if (tempo.ElapsedMilliseconds > 1000 && !isLogNotificado)
                    {
                        isLogNotificado = true;
                        console.warn("Aguardando carregar fontes dos ícones");
                    }
                    await ThreadUtil.EsperarAsync(20);
                    isFonteCarregada = document.fonts.check(BaseAplicacao.FONTE_ICONES);

                }
            }
            resolver();

        }
        private async __CarregarFonteIconesInternoAsync(resolver: () => void)
        {
            document.fonts.ready.then(function ()
            {
                if (document.fonts.check(BaseAplicacao.FONTE_ICONES))
                {
                    resolver();
                }
            });

            const iconeDone = IconeUtil.RetornarIconeDomMaterial(EnumIcone.Done);
            /*EnumIconeMaterial[EnumIconeMaterial.done];*/
            document.fonts.load(BaseAplicacao.FONTE_ICONES, iconeDone).then(function (fontes)
            {
                if (fontes.length > 0)
                {
                    resolver();
                }
            });
        }

        //#endregion



        //#region ConfiguracaoColuna

        private static get ConfiguracaoFormularioPadrao(): ap.IConfiguracaoLayout
        {
            return {
                IsMostrarMensagemValidacaoFlutuante: true,
                TipoCaixaPadrao: EnumTipoCaixa.Padrao
            };
        }

        private NormalizarConfiguracao(): void
        {
            $Configuracao.ConfiguracaoLayout = this.NormalizarConfiguracaoFormulazio();
        }

        private NormalizarConfiguracaoFormulazio(): ap.IConfiguracaoLayout
        {
            if ($Configuracao.ConfiguracaoLayout == null)
            {
                return BaseAplicacao.ConfiguracaoFormularioPadrao;
            }

            u.ReflexaoUtil.Estender(
                $Configuracao.ConfiguracaoLayout,
                BaseAplicacao.ConfiguracaoFormularioPadrao);

            return $Configuracao.ConfiguracaoLayout;
        }

        //#endregion


        //#region Ocupar

        public override get IsOcupado(): boolean
        {
            return this.DocumentoPrincipal?.IsOcupado ?? false;
        }

        public override get ProgressoOcupadoAtual(): number
        {
            return this.DocumentoPrincipal?.ProgressoOcupadoAtual ?? 0;
        }

        public override Ocupar(argumento?: EnumOpcaoOcupar | boolean | string, mensagem: string = null): void
        {
            this.DocumentoPrincipal?.Ocupar(argumento, mensagem)
        }

        public OcuparAsync<T, TThis extends this = this>(funcAsunc: () => Promise<T>): Promise<T>
        public OcuparAsync<T, TThis extends this = this>(funcAsunc: () => Promise<T>, expressaoFlagBloqueio: (value: TThis) => boolean): Promise<T>
        public OcuparAsync<T, TThis extends this = this>(funcAsunc: () => Promise<T>, identificadorBloqueio: string): Promise<T>
        public async OcuparAsync<T, TThis extends this = this>(funcAsync: () => Promise<T>, expressaoFlagBloqueioOuIdentificador?: string | ((value: TThis) => boolean)): Promise<T>
        {
            return this.DocumentoPrincipal?.OcuparAsync(funcAsync, expressaoFlagBloqueioOuIdentificador as any);
        }

        public override TituloOcupado(titulo: string): void
        {
            return this.DocumentoPrincipal?.TituloOcupado(titulo);
        }

        public override MensagemOcupado(mensagem: string): void
        {
            return this.DocumentoPrincipal?.MensagemOcupado(mensagem);
        }

        public override ProgressoOcupado(progresso: number): void
        {
            return this.DocumentoPrincipal?.ProgressoOcupado(progresso);
        }

        public override DesocuparAsync(): Promise<void>
        {
            return this.DocumentoPrincipal?.DesocuparAsync();
        }

        //#endregion Desocupar
        //#region histórico

        //public override AtivarObservacaoHistorico()
        //{
        //    this._isObservacaoHistoricoAtiva = true;
        //}
        //public override DesativarObservacaoHistorico()
        //{
        //    this._isObservacaoHistoricoAtiva = false;
        //}
        //#endregion

        private _progressoCarregandoAplicacao = 90;

        protected IncrementarProcessoCarregandoAplicacao()
        {
            const divProgresso = document.getElementById(this.NomeElementoProgressoCarregandoAplicacao);
            if (divProgresso != null)
            {
                this._progressoCarregandoAplicacao = Math.min(this._progressoCarregandoAplicacao += 1, 100);
                divProgresso.innerHTML = `Aguarde carregando ${this._progressoCarregandoAplicacao}%`;
            }
        }
    }

}

namespace Snebur.Aplicacao
{
    export interface BaseAplicacao
    {
        readonly IsReinicializandoControles: boolean;
        readonly IsMostrarLegendasToolTips: boolean;
        /*readonly IsObservacaoHistoricoAtiva: boolean;*/
        readonly DicionarControlesCarregado: DicionarioSimples<HashSet<ui.BaseControle>>;
        readonly DocumentoPrincipal: Snebur.UI.DocumentoPrincipal;
        readonly GerenciadorAbrirImagemLocal: Snebur.UI.GerenciadorAbrirImagemLocal;
        readonly FuncaoDepoisControleApresentacaoInicializado?: (controleApresentacao: ui.ControleApresentacao) => void;

        /**Parâmetros adicionais do histórico */
        readonly ParametrosHistorico?: DicionarioSimples<string>;


        readonly IsOcupado: boolean;
        Ocupar(): void;
        Ocupar(titulo: string, mensagem: string): void;
        Ocupar(opcao: EnumOpcaoOcupar): void;
        Ocupar(isOcuparImeditamente: boolean): void;
        Ocupar(argumento?: EnumOpcaoOcupar | boolean | string, mensagem?: string, baseControle?: BaseControle): void;
        MensagemOcupado(mensagem: string): void;
        TituloOcupado(mensagem: string): void;
        ProgressoOcupado(progresso: number): void;
        DesocuparAsync(): Promise<void>

        RetornarBarraEnvio(documentoPrincipal: ui.DocumentoPrincipal): ui.BarraEnvioArquivos;
        NotificarControleCarregado(controle: ui.BaseControle): void;
        NotificarControleCarregadoDescarregado(controle: BaseControle): void;
        AtivarObservacaoHistorico(): void;
        DesativarObservacaoHistorico(): void;
    }
}

interface ErrorEvent
{
    IsErroCapturado: boolean;
}