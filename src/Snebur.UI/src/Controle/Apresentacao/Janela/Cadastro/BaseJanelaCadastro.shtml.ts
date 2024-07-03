namespace Snebur.UI
{
    export abstract class BaseJanelaCadastro<TEntidade extends IEntidade = Entidade> extends Janela   
    {
        private _isNovaEntidade: boolean = false;
        private readonly __novaEntidade: TEntidade;
        private readonly __editarEntidade: TEntidade;

        public readonly TipoEntidade: r.TipoEntidade;
        public readonly IDEntidade: number;

        public IsMostrarCabecalho: boolean = true;
        public IsMostrarBotaoCancelar: boolean = true;
        public IsMostrarBotaoSalvar: boolean = true;
        public IsMostrarBotaoVoltar: boolean = false;
        public IsMostrarBotaoContinuar: boolean = false;
        public IsMostraarOpcaoSalvarAoSair: boolean = true;
         
        public Contexto: a.BaseContextoDados;
        public Titulo: string;
        public SubTitulo: string;
        public TituloInfo: string;
        public Info: string
        public IsMostrarInfo: boolean = false;

        public RotuloBotaoCancelar: string = "Cancelar";
        public RotuloBotaoSalvar: string = "Salvar";
        public RotuloBotaoVoltar: string = "Voltar";
        public RotuloBotaoContinuar: string = "Continuar";

        protected AtivarEnterSalvar: boolean;

        public get ViewModel(): EntidadeCadastroViewModel<TEntidade>
        {
            return this.DataSource;
        }

        public get Entidade(): TEntidade
        {
            return this.ViewModel?.Entidade ??
                this.__novaEntidade ??
                this.__editarEntidade;
        }

        public get IsExisteAlteracao(): boolean
        {
            const entidade = this.ViewModel?.Entidade;
            if (entidade?.Id > 0)
            {
                return entidade.__IsExisteAlteracao;
            }
            return entidade?.__PropriedadesAlteradas?.Count > 0;
        }

        public get IsNovaEntidade(): boolean
        {
            return this._isNovaEntidade;
        }

        public constructor(controlePai: BaseControle, entidadeOuTipoConstrutor: TEntidade | r.BaseTipo | d.EntidadeConstrutor<TEntidade>) 
        {
            super(controlePai);

            this.CssClasseControle = "sn-base-janela-cadastro";
            this._dataSource = null;

            this.DeclararPropriedade(x => x.RotuloBotaoSalvar, String);
            this.DeclararPropriedade(x => x.RotuloBotaoCancelar, String);
            this.DeclararPropriedade(x => x.IsMostrarBotaoCancelar, Boolean);
            this.DeclararPropriedade(x => x.IsMostrarBotaoSalvar, Boolean);
            this.DeclararPropriedade(x => x.IsMostrarBotaoVoltar, Boolean);
            this.DeclararPropriedade(x => x.IsMostrarBotaoContinuar, Boolean);
            this.DeclararPropriedade(x => x.IsMostrarCabecalho, Boolean);

            this.DeclararPropriedade(x => x.Titulo, String);
            this.DeclararPropriedade(x => x.SubTitulo, String);
            this.DeclararPropriedade(x => x.TituloInfo, String);
            this.DeclararPropriedade(x => x.Info, String);
            this.DeclararPropriedade(x => x.IsMostrarInfo, Boolean);

            if (entidadeOuTipoConstrutor instanceof d.Entidade)
            {
                const entidade = entidadeOuTipoConstrutor as TEntidade;
                this.TipoEntidade = entidade.GetType() as r.TipoEntidade;
                this.IDEntidade = entidade.Id;

                if (this.IDEntidade === 0)
                {
                    this._isNovaEntidade = true;
                    this.__novaEntidade = entidadeOuTipoConstrutor as TEntidade;
                }
                else
                {
                    this.__editarEntidade = entidadeOuTipoConstrutor as TEntidade;
                }
            }
            else if (entidadeOuTipoConstrutor instanceof r.TipoEntidade)
            {
                this.TipoEntidade = entidadeOuTipoConstrutor;
                this.IDEntidade = 0;
                this._isNovaEntidade = true;
            }
            else if (entidadeOuTipoConstrutor.GetType)
            {
                const tipoEntidade = entidadeOuTipoConstrutor.GetType();
                if (!(tipoEntidade instanceof r.TipoEntidade))
                {
                    throw new ErroNaoSuportado("O argumento não é suportado", this);
                }
                this.TipoEntidade = tipoEntidade;
                this.IDEntidade = 0;
                this._isNovaEntidade = true;
            }
            this.Contexto = $Aplicacao.RetornarContextoDados(this.TipoEntidade);
            this.EventoCarregado.AddHandler(this.BaseJanelaCadastro_Carregada, this);

            this.AtivarEnterSalvar = true;
            this.Estilo = EnumEstiloJanela.JanelaCadastro;
        }

        //#region Inicializar

        protected override Inicializar(): void
        {
            super.Inicializar();

            const titulo = this.RetornarValorAtributo(AtributosHtml.Titulo);
            const subTitulo = this.RetornarValorAtributo(AtributosHtml.SubTitulo);
            const tituloInfo = this.RetornarValorAtributo(AtributosHtml.TituloInfo);
            const info = this.RetornarValorAtributo(AtributosHtml.MensagemInfo);

            if (!String.IsNullOrEmpty(titulo))
            {
                this.Titulo = titulo;
            }

            if (!String.IsNullOrEmpty(subTitulo))
            {
                this.SubTitulo = subTitulo;
            }

            if (!String.IsNullOrEmpty(tituloInfo))
            {
                this.TituloInfo = tituloInfo;
            }

            if (!String.IsNullOrEmpty(info))
            {
                this.Info = info;
            }

            this.IsMostrarInfo = !String.IsNullOrWhiteSpace(this.Info);

            /*this.AdicionarEventosDom();*/
            this.AdicionarEventoDomGlobal(EnumEventoDom.KeyDown, this.SalvarDocument_KeyDown);
        }


        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected override RetornarHtmlParcialJanela(): string
        {
            const procurar = "[[CONTEUDO_FORMULARIO]]";
            const htmlFormulario = this.RetornarHtmlFormulario();

            const html = HtmlReferenciaUtil.RetornarHtml(BaseJanelaCadastro.GetType() as r.TipoUIHtml);
            const posicao = html.indexOf(procurar);
            const sb = new StringBuilder();
            sb.AppendLine(html.substring(0, posicao));
            sb.AppendLine(htmlFormulario);
            sb.AppendLine(html.substring(posicao + procurar.length, html.length));
            return sb.ToString();
        }

        protected RetornarHtmlFormulario(): string
        {
            return HtmlReferenciaUtil.RetornarHtml(this);
        }
        //#endregion

        //#region DataSource

        private async BaseJanelaCadastro_Carregada(janela: Janela, e: EventArgs) 
        {
            await this.OcuparAsync(async () =>
            {
                await this.InicializarViewModelAsync();
            });
            await ThreadUtil.QuebrarAsync();
            this.FocarPrimeiroControle();
        }

        protected async InicializarViewModelAsync(): Promise<void>
        {
            const entidade = await this.RetornarEntidadeAsync();
            const viewModel = this.RetornarViewModel(entidade);
            this.AtualizarTitulos(viewModel);
            viewModel.EventoTituloAlterado.AddHandler(this.AtualizarTitulos, this);
            await viewModel.InicializarViewModelAsync();
            this.DataSource = viewModel;
        }

        protected async RetornarEntidadeAsync(): Promise<TEntidade>
        {
            if (this.IDEntidade === 0)
            {
                return this.RetornarNovaEntidade();
            }
            else
            {
                const consulta = this.Contexto.RetornarConsulta<TEntidade>(this.TipoEntidade).Where(x => x.Id === this.IDEntidade);
                consulta.AbrirRelacoes(this.RetornarRelacoesAbertas());
                return await consulta.SingleAsync();
            }
        }

        protected RetornarViewModel(entidade: TEntidade): EntidadeCadastroViewModel<TEntidade>
        {
            return new EntidadeCadastroViewModel(entidade, this.Titulo, this.SubTitulo);
        }

        protected RetornarNovaEntidade(): TEntidade
        {
            if (this.__novaEntidade instanceof d.Entidade)
            {
                return this.__novaEntidade;
            }
            return new (this.TipoEntidade.Construtor as any) as TEntidade;
        }

        protected RetornarRelacoesAbertas(): string
        {
            return String.Empty;
        }

        protected AtualizarTitulos(viewModel: EntidadeCadastroViewModel<TEntidade> = this.ViewModel)
        {
            if (viewModel != null)
            {
                const titulo = viewModel.Titulo;
                const subTitulo = viewModel.SubTitulo;

                if (!String.IsNullOrWhiteSpace(titulo) &&
                    this.Titulo !== titulo)
                {
                    this.Titulo = titulo;
                }

                if (!String.IsNullOrWhiteSpace(subTitulo) &&
                    this.SubTitulo !== subTitulo)
                {
                    this.SubTitulo = subTitulo;
                }
            }
        }


        //#endregion

        //#region Botoes

        protected BtnInfoInterno_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            this.MostrarInfoAsync();
        }

        protected BtnCancelarInterno_Click(botao: Botao, e: UIEventArgs): void
        {
            this.FecharAsync(false);
        }

        protected async BtnSalvarInterno_Click(botao: Botao, e: UIEventArgs)
        {
            try
            {
                this.OcuparElemento();
                await this.SalvarAsync();
            }
            catch (erro)
            {
                console.error(erro);
            }
            finally
            {
                this.DesocuparElemento();
            }
        }

        public async BtnVoltarInterno_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            try
            {
                this.OcuparElemento();
                await this.VoltarAsync();
            }
            catch(erro)
            {
                console.error(erro);
            }
            finally
            {
                this.DesocuparElemento();
            }
        }

        public async BtnContinuarInterno_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            try
            {
                this.OcuparElemento();
                await this.ContinuarAsync();
            }
            catch (erro)
            {
                console.error(erro);
            }
            finally
            {
                this.DesocuparElemento();
            }
        }

        protected async MostrarInfoAsync(): Promise<void>
        {
            const janelaInfo = new JanelaInfo(this, this.TituloInfo, this.Info);
            await janelaInfo.MostrarAsync();
        }

        protected async VoltarAsync(): Promise<void>
        {
            throw new Erro("Este método deve ser sobrescrito");
        }

        protected async ContinuarAsync(): Promise<void>
        {
            throw new Erro("Este método deve ser sobrescrito");
        }

        //#endregion

        //#region Enter teclado

        //protected AdicionarEventosDom(): void
        //{
        //    document.addEventListener("keyup", this.__SalvarDocument_KeyDown);
        //}

        //protected RemoverEventosDom(): void
        //{
        //    document.removeEventListener("keyup", this.__SalvarDocument_KeyDown);
        //}

        protected SalvarDocument_KeyDown(e: KeyboardEvent): void
        {
            if (this.AtivarEnterSalvar && KeyCodeUtil.IsKeyCodeEnter(e.keyCode) && !this.IsExisteJanelaAberta)
            {
                if (!this.IsOcupado)
                {
                    this.OcuparElemento();
                    //o bind são atualizando quando os controles perdem o focus
                    window.focus();
                    window.setTimeout(this.SalvarAsync.bind(this, false));
                }
            }
        }
        //#endregion

        //#region Salvar



        protected override async IsPodeFecharJanelaAsync(resultado: ResultadoFecharJanelaArgs): Promise<[boolean, ResultadoFecharJanelaArgs]>
        {
            if (!resultado.IsSucesso)
            {
                await ElementoUtil.DesfocarElementoAtualAtivoAsync();

                this.Elemento.focus();
                await ThreadUtil.QuebrarAsync();

                if (this.IsExisteAlteracao)
                {
                    if (this.IsMostraarOpcaoSalvarAoSair)
                    {
                        const resultadoMensagem = await MensagemUtil.MostrarMensagemPersonalizadaAsync(this,
                            "Existem alterações não salvas",
                            "Deseja salvar as alterações antes de sair?",
                            EnumResultadoOpcaoMensagem.Cancelar,
                            EnumResultadoOpcaoMensagem.Nao,
                            [EnumResultadoOpcaoMensagem.Sim, "Sim, salvar"]);

                        switch (resultadoMensagem.OpcaoSelecionada)
                        {
                            case EnumResultadoOpcaoMensagem.Sim: {

                                resultado.IsSucesso = true;
                                const isSucesso = await this.SalvarAsync();
                                return [isSucesso, resultado];
                            }
                            case EnumResultadoOpcaoMensagem.Nao:

                                return [true, resultado];

                            case EnumResultadoOpcaoMensagem.Cancelar:

                                return [false, null];
                            default:

                                throw new Erro("Opção não suportada");
                        }
                    }

                    const resultadoMensagem = await MensagemUtil.MostrarMensagemPersonalizadaAsync(this,
                        "Existem alterações não salvas",
                        "Você realmente deseja sair sem salvar?",
                        EnumResultadoOpcaoMensagem.Cancelar,
                        [EnumResultadoOpcaoMensagem.Sim, "Sim, sair mesmo assim"]);

                    switch (resultadoMensagem.OpcaoSelecionada)
                    {
                        case EnumResultadoOpcaoMensagem.Sim:

                            return [true, resultado];

                        case EnumResultadoOpcaoMensagem.Cancelar:

                            return [false, null];
                        default:

                            throw new Erro("Opção não suportada");
                    }
                    
                }
            }
            return [true, resultado];
        }

        protected async SalvarAsync(isFechar: boolean = true): Promise<boolean>
        {
            const isValido = await this.ValidarFormularioAsync();
            if (!isValido)
            {
                return false;
            }
            return this.SalvarInternoAsync(isFechar);
        }

        protected async SalvarInternoAsync(isFechar: boolean = true): Promise<boolean>
        {
            const resultado = await this.OcuparAsync(async () =>
            {
                return await this.RetornarResultadoSalvarAsync();
            });

            if (isFechar && resultado.IsSucesso)
            {
                this.FecharAsync(true);
            }
            return resultado.IsSucesso;
        }

        protected async RetornarResultadoSalvarAsync(): Promise<a.ResultadoSalvar>
        {
            if ($Configuracao.IsDebug)
            {
                const mensagensValidacao = await this.ViewModel.Entidade.RetornarTodasMensagemValidacoesPendentesAsync();
                if (mensagensValidacao.Count > 0)
                {
                    const mensagem = String.Join("<br>", mensagensValidacao);
                    await MensagemUtil.MostrarMensagemErroAsync(this, mensagem);
                    DebugUtil.ThrowAndContinue(mensagem);
                    return new a.ResultadoSalvar({
                        IsSucesso: false,
                        MensagemErro: mensagem
                    });
                }
            }

            this.AntesSalvar();
            const resultadoSalvar = await this.Contexto.SalvarAsync(this.ViewModel.Entidade);
            if (!resultadoSalvar.IsSucesso)
            {
                if ($Configuracao.IsDebug)
                {
                    const mensagem = `Serviços dados: ${this.Contexto.URLServico} <br />
                                      ${resultadoSalvar.MensagemErro} <br />
                                      ${String.Join("<br />", resultadoSalvar.ErrosValidacao.Select(x => x.Mensagem))}`;

                    alert(mensagem);
                    throw new Erro(mensagem);
                }

                const tituloErro = "OPS!";
                const mensagemErro = "Desculpe, mas não possível salvar a alteração";

                await ui.MensagemUtil.MostrarMensagemAsync(this, tituloErro, mensagemErro, EnumBotoesJanelaMensagem.Ok);
            }
            else
            {
                this.DepoisSalvar();
                await this.DepoisSalvarAsync();
            }
            return resultadoSalvar;
        }

        //#region Métodos para ser sobre escritos

        protected AntesSalvar(): void
        {
        }

        protected DepoisSalvar(): void
        {
        }

        protected async DepoisSalvarAsync(): Promise<void>
        {

        }

        //#endregion

        //#endregion

        //#region Métodos sobrescritos

        //#endregion

        //#region Métodos Protegidos

        protected FocarPrimeiroControle(): void
        {
            const caixaTexto = this.ControlesFilho.OfType<CaixaTexto>(CaixaTexto).FirstOrDefault();
            if (caixaTexto != null)
            {
                ElementoUtil.FocarElemento(caixaTexto.ElementoInput);
            }
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            /*this.RemoverEventosDom();*/
            super.Dispose();
        }
        //#endregion
    }

    export interface IJanelaCadastro<TEntidade extends IEntidade = Entidade>  
    {
        new(controlePai: BaseControle, entidade: TEntidade): BaseJanelaCadastro<TEntidade>;
    }

    //#endregion


	//#region Elementos da apresentação - código gerado automaticamente #

	export interface BaseJanelaCadastro<TEntidade extends IEntidade = Entidade>
	{
		readonly TextoTitulo: ui.Texto;
		readonly BlocoFormulario: ui.Bloco;
		readonly BlocoBotoes: ui.Bloco;
		readonly BtnCancelarInterno: ui.Botao;
		readonly BtnVoltarInterno: ui.Botao;
		readonly BtnContinuarInterno: ui.Botao;
		readonly BtnSalvarInterno: ui.Botao;
	}

	//#endregion

}