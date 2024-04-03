namespace Snebur.UI
{
    export abstract class BaseJanelaCadastro<TEntidade extends IEntidade = Entidade> extends Janela   
    {

        public IsMostrarBotaoCancelar: boolean = true;
        public IsMostrarBotaoSalvar: boolean = true;

        private __SalvarDocument_KeyDown: EventListener;

        public readonly NovaEntidade: TEntidade;
        public readonly TipoEntidade: r.TipoEntidade;
        public readonly IDEntidade: number;

        public Contexto: a.BaseContextoDados;
        public Titulo: string;
        public SubTitulo: string;
        public TituloInfo: string;
        public Info: string
        public IsMostrarInfo: boolean = false;
        public RotuloBotaoCancelar: string = "CANCELAR";
        public RotuloBotaoSalvar: string = "SALVAR";

        protected AtivarEnterSalvar: boolean;

        public get ViewModel(): EntidadeCadastroViewModel<TEntidade>
        {
            return this.DataSource;
        }

        public get Entidade(): TEntidade
        {
            return this.ViewModel?.Entidade;
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

        public constructor(controlePai: BaseControle, entidadeOuTipoConstrutor: TEntidade | r.BaseTipo | d.EntidadeConstrutor<TEntidade>) 
        {
            super(controlePai);

            


            this.CssClasseControle = "sn-base-janela-cadastro";
            this._dataSource = null;

            this.DeclararPropriedade(x => x.RotuloBotaoSalvar, String);
            this.DeclararPropriedade(x => x.RotuloBotaoCancelar, String);
            this.DeclararPropriedade(x => x.IsMostrarBotaoCancelar, Boolean);
            this.DeclararPropriedade(x => x.IsMostrarBotaoSalvar, Boolean);

            this.DeclararPropriedade(x => x.Titulo, String, this.Titulo_Alterado);
            this.DeclararPropriedade(x => x.SubTitulo, String, this.SubTitulo_Alterado);
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
                    this.NovaEntidade = entidadeOuTipoConstrutor as TEntidade;
                }
            }
            else if (entidadeOuTipoConstrutor instanceof r.TipoEntidade)
            {
                this.TipoEntidade = entidadeOuTipoConstrutor;
                this.IDEntidade = 0;
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
            }
            this.Contexto = $Aplicacao.RetornarContextoDados(this.TipoEntidade);
            this.EventoCarregado.AddHandler(this.BaseJanelaCadastro_Carregada, this);
            this.__SalvarDocument_KeyDown = this.SalvarDocument_KeyDown.bind(this);

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

            this.AdicionarEventosDom();
        }

        private Titulo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            if (this.ViewModel instanceof EntidadeCadastroViewModel)
            {
                this.ViewModel.Titulo = this.Titulo;
            }
        }

        private SubTitulo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            if (this.ViewModel instanceof EntidadeCadastroViewModel)
            {
                this.ViewModel.SubTitulo = this.SubTitulo;
            }
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
            if (this.NovaEntidade instanceof d.Entidade)
            {
                return this.NovaEntidade;
            }
            return new (this.TipoEntidade.Construtor as any) as TEntidade;
        }

        protected RetornarRelacoesAbertas(): string
        {
            return String.Empty;
        }
        //#endregion

        //#region Botoes

        protected BtnCancelarInterno_Click(botao: Botao, e: UIEventArgs): void
        {
            this.FecharAsync(false);
        }

        protected BtnSalvarInterno_Click(botao: Botao, e: UIEventArgs): void
        {
            this.ValidarFomularioESalvarAsync();
        }

        protected BtnInfoInterno_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            this.MostrarInfoAsync();
        }

        protected async MostrarInfoAsync(): Promise<void>
        {
            const janelaInfo = new JanelaInfo(this, this.TituloInfo, this.Info);
            await janelaInfo.MostrarAsync();
        }

        //#endregion

        //#region Enter teclado

        protected AdicionarEventosDom(): void
        {
            document.addEventListener("keyup", this.__SalvarDocument_KeyDown);
        }

        protected RemoverEventosDom(): void
        {
            document.removeEventListener("keyup", this.__SalvarDocument_KeyDown);
        }

        private SalvarDocument_KeyDown(e: KeyboardEvent): void
        {
            if (this.AtivarEnterSalvar && KeyCodeUtil.IsKeyCodeEnter(e.keyCode) && !this.IsExisteJanelaAberta)
            {
                if (!this.IsOcupado)
                {
                    this.OcuparElemento();
                    //o bind são atualizando quando os controles perdem o focus
                    window.focus();
                    window.setTimeout(this.ValidarFomularioESalvarAsync.bind(this));
                }
            }
        }
        //#endregion

        //#region Salvar

        protected async ValidarFomularioESalvarAsync()
        {
            const isValido = await this.ValidarFormularioAsync();
            if (isValido)
            {
                this.SalvarAsync();
            }
        }

        protected override async IsPodeFecharJanelaAsync(resultado: ResultadoFecharJanelaArgs): Promise<[boolean, ResultadoFecharJanelaArgs]>
        {
            if (!resultado.IsSucesso)
            {
                await ElementoUtil.DesfocarElementoAtualAtivoAsync();

                this.Elemento.focus();
                await ThreadUtil.QuebrarAsync();

                if (this.IsExisteAlteracao)
                {
                    const mensagem = "Deseja salvar as alterações antes de sair?";
                    const resultadoMensagem = await MensagemUtil.MostrarMensagemPersonalizadaAsync(this,
                        "Existem alterações não salvas",
                        mensagem,
                        EnumResultadoOpcaoMensagem.Cancelar,
                        EnumResultadoOpcaoMensagem.Nao,
                        [EnumResultadoOpcaoMensagem.Sim, "Sim, salvar"]);

                    switch (resultadoMensagem.OpcaoSelecionada)
                    {
                        case EnumResultadoOpcaoMensagem.Sim:

                            resultado.IsSucesso = true;
                            this.ValidarFomularioESalvarAsync();
                            return [false, resultado];

                        case EnumResultadoOpcaoMensagem.Nao:

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
            return this.SalvarInternoAsync(isFechar);
        }

        private async SalvarInternoAsync(isFechar: boolean = true): Promise<boolean>
        {
            this.Ocupar();
            const resultado = await this.RetornarResultadoSalvarAsync();
            await this.DesocuparAsync();
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
                const mensagensValidacao = await this.ViewModel.Entidade.RetornarMensagemValidacoesPendenteAsync();
                if (mensagensValidacao.Count > 0)
                {
                    const mensagem = String.Join("<br>", mensagensValidacao);
                    throw new Erro(mensagem);
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
                    /*throw new Erro(mensagem);*/
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
            this.RemoverEventosDom();
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
		readonly BtnSalvarInterno: ui.Botao;
	}

	//#endregion

}