namespace Snebur.UI
{
    export abstract class BaseJanelaCadastro<TEntidade extends Entidade = Entidade> extends Janela   
    {
        private __SalvarDocument_KeyDown: EventListener;

        public readonly BtnCancelar: Botao;
        public readonly BtnSalvar: Botao;

        public readonly NovaEntidade: TEntidade;
        public readonly TipoEntidade: r.TipoEntidade;
        public readonly IDEntidade: number;

        public Contexto: a.BaseContextoDados;
        public Titulo: string;

        protected AtivarEnterSalvar: boolean;

        public get ViewModel(): EntidadeCadastroViewModel<TEntidade>
        {
            return this.DataSource;
        }

        public get Entidade(): TEntidade
        {
            return this.ViewModel?.Entidade;
        }

        public readonly TextoTitulo: Snebur.UI.Texto;
        public readonly BlocoFormulario: Bloco;
        public readonly BlocoBotoes: Bloco;
         
        public constructor(controlePai: BaseControle, entidadeOuTipoConstrutor: TEntidade | r.BaseTipo | d.EntidadeConstrutor<TEntidade>) 
        {
            super(controlePai);

            this._dataSource = null;

            this.DeclararPropriedade(x => x.Titulo, String, "Titulo", this.Titulo_Alterado);

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
            if (!String.IsNullOrEmpty(titulo))
            {
                this.Titulo = titulo;
            }
            this.AdicionarEventosDom();
        }

        private Titulo_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            if (this.ViewModel instanceof EntidadeCadastroViewModel)
            {
                this.ViewModel.Titulo = this.Titulo;
            }
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            //this.IDElementoTitulo = this.RetornarIDElementoItemElemento("Titulo");
            //this.IDElementoFormulario = this.RetornarIDElementoItemElemento("Formulario");
            //this.IDElementoBotoes = this.RetornarIDElementoItemElemento("Botoes");
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
            this.OcuparAsync(async () =>
            {
                await this.InicializarViewModelAsync();
            });
            this.Ocupar();
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
            return new EntidadeCadastroViewModel(entidade, this.Titulo);
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
            if (this.AtivarEnterSalvar && KeyCodeUtil.IsKeyCodeEnter(e.keyCode) && !this.IsExisteControleFilhoJanela)
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
            this.OcuparElemento();
            await ThreadUtil.EsperarAsync(50);
            const isValido = await this.ValidarFormularioAsync();
            this.DesocuparElemento();
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

                if ((this.ViewModel.Entidade.Id > 0 && this.ViewModel.Entidade.__IsExisteAlteracao) ||
                    (this.ViewModel.Entidade.Id === 0 && this.ViewModel.Entidade.__PropriedadesAlteradas.Count > 0))
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

        protected async SalvarAsync(isFechar: boolean = true)
        {
            return this.SalvarInternoAsync(isFechar);
        }

        private async SalvarInternoAsync(isFechar: boolean = true)
        {
            this.Ocupar();
            const resultado = await this.RetornarResultadoSalvarAsync();
            await this.DesocuparAsync();
            if (isFechar && resultado.IsSucesso)
            {
                this.FecharAsync(true);
            }
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

                const tituloErro = "Erro ao salvar";
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

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface BaseJanelaCadastro<TEntidade extends Entidade = Entidade>
    {
        readonly TextoTitulo: ui.Texto;
        readonly BlocoFormulario: ui.Bloco;
        readonly BlocoBotoes: ui.Bloco;
        readonly BtnCancelarInterno: ui.Botao;
        readonly BtnSalvarInterno_: ui.Botao;
    }

    //#endregion

}