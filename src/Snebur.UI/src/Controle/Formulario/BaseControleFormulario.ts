namespace Snebur.UI
{
    export abstract class BaseControleFormulario<TValor = any, THTMLElementInput extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement = HTMLInputElement> extends Snebur.UI.ControleRotulo implements IControleEventoValorAlterado
    {
        //#region Propriedade

        private _bindControleFormulario: BindControleFormulario;
        private _isSomenteLeitura: boolean = false;
        private _isValido: boolean = false;
        private _isMostrarMensagemValidacaoFlutuante: boolean = true;
        private _isElementosInicializado: boolean = false;

        private _idElementoRotulo: string;
        private _idElementoCaixa: string;
        private _idElementoInput: string;
        private _idElementoMensagemValidacao: string;

        private _valorPropriedade: any;
        private _isAlerta: boolean = false;

        private _elementoCaixa: HTMLElement;
        private _elementoInput: THTMLElementInput;
        private _elementoMensagemValidacao: HTMLElement;
        private _destinoMensagemValidacao: HTMLElement | ComponenteApresentacao;

        protected _isNaoOcultarValidacao = false;
        protected _isFocusPrimeiroControleApresentacao: boolean;

        public IsIgnorarValidacao: boolean = false;
        public IsValidarSempre: boolean = false;
        public IsValidarValorPropriedadeAlterado = true;

        protected PaiPropriedade: ObjetoControladorPropriedade;
        protected NomePropriedade: string;
        protected Propriedade: r.Propriedade;

        protected CaminhoBind: string;
        protected IsAutoSalvar: boolean;
        protected IsGanhoPrimeiroFocusUsuario: boolean;
        protected IsRotuloDaPropriedadeInicializado: boolean = false;

        public IsManterEspacoMensagemValidacao: boolean = true;
        private UltimaMensagemValidacao: string;

        protected get ValorProprieade(): any
        {
            if (this.PaiPropriedade != null)
            {
                const valor = (this.PaiPropriedade as any)[this.NomePropriedade];
                if (valor !== undefined)
                {
                    return valor;
                }
            }
            return this._valorPropriedade ?? this.Valor;
        }

        protected get BindControleFormulario(): BindControleFormulario
        {
            return this._bindControleFormulario;
        }

        public get ElementoInput(): THTMLElementInput
        {
            this.ValidarElementosDebug(this._elementoInput, this._idElementoInput, $Configuracao.IsDebug);
            return this._elementoInput;
        }

        public get ElementoCaixa(): HTMLElement
        {
            this.ValidarElementosDebug(this._elementoCaixa, this._idElementoCaixa);
            return this._elementoCaixa;
        }

        private get ElementoMensagemValidacaoInterno(): HTMLElement 
        {
            if (!(this._elementoMensagemValidacao instanceof HTMLElement))
            {
                this._elementoMensagemValidacao = ElementoUtil.RetornarElemento(this._idElementoMensagemValidacao) as HTMLInputElement;
            }
            return this._elementoMensagemValidacao;
        }

        public get DestinoMensagemValidacao(): HTMLElement | ComponenteApresentacao
        {
            if (typeof this._destinoMensagemValidacao === "undefined")
            {
                this._destinoMensagemValidacao = this.RetornarDestinoMensagemValidacao();
            }
            return this._destinoMensagemValidacao;
        }

        public get IsMostrarMensagemValidacaoFlutuante()
        {
            return this._isMostrarMensagemValidacaoFlutuante;
        }

        public get IsExisteConteudoDom(): boolean
        {
            return !String.IsNullOrEmpty(this.ElementoInput.value);
        }

        public get IsValido(): boolean
        {
            if (this.IsIgnorarValidacao)
            {
                return true;
            }
            return this._isValido;
        }

        public set IsValido(value: boolean)
        {
            this._isValido = value;
            this.EventoValidacaoAlterada?.Notificar(this, new ValidoEventArgs(value));
        }

        public get IsAlerta(): boolean
        {
            return this.IsValido && this._isAlerta;
        }

        public get Valor(): TValor
        {
            return this.ConverterValorDom(this.ElementoInput.value);
        }

        public set Valor(value: TValor)
        {
            if (this.Valor !== value)
            {
                this.ElementoInput.value = value?.toString();
                if (SistemaUtil.NavegadorEnum !== d.EnumNavegador.InternetExplorer)
                {
                    this.ElementoInput.dispatchEvent(new Event("change"));
                }
                this.AtribuirValorPropriedade(value);
            }
        }

        public get IsSomenteLeitura(): boolean
        {
            return this._isSomenteLeitura;
        }
        public set IsSomenteLeitura(value: boolean)
        {
            this._isSomenteLeitura = ConverterUtil.ParaBoolean(value);
            this.DefinirSomenteLeitura();
        }

        public get ElementosValidacao(): HTMLElement[]
        {
            return [this.Elemento, this.ElementoCaixa];
        }

        //#endregion

        //#region Propriedades Apresentação 

        public TipoCaixa: Snebur.UI.EnumTipoCaixa;

        //#endregion

        //#region Eventos

        public readonly EventoValorAlterado: Evento<ValorAlteradoEventArgs<any>>
        public readonly EventoValidacaoAlterada: Evento<ValidoEventArgs>;
        public readonly EventoPropriedadeAlterada = new Evento(this);

        //#endregion


        private readonly ValidarDepois = new ExecutarDepois(this.ValidarDepoisInterno.bind(this), 100);
        //#region Inicialização 

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            //this.FilaAtributosValidacaoAsync = new Array<d.Atributos.BaseAtributoValidacaoAsync>();
            this.EventoValorAlterado = new Evento<ValorAlteradoEventArgs<any>>(this);
            this.EventoValidacaoAlterada = new Evento<ValidoEventArgs>(this);
        }

        protected override Inicializar()
        {
            super.Inicializar();

            this.IsIgnorarValidacao = this.RetornarValorAtributoBoolean(AtributosHtml.IgnorarValidacao, false);
            this.IsValidarSempre = this.RetornarValorAtributoBoolean(AtributosHtml.ValidarSempre, false);
            this.IsValidarValorPropriedadeAlterado = this.RetornarValorAtributoBoolean(AtributosHtml.ValidarValorPropriedadeAlterado, true);
            this.IsManterEspacoMensagemValidacao = this.RetornarValorAtributoBoolean(AtributosHtml.ManterEspacoMensagemValidacao, this.IsManterEspacoMensagemValidacao);

            this.AdicionarEventoDom(ui.EnumEventoDom.Change, this.ElementoInput_Change.bind(this));
            this.AdicionarEventoDom(ui.EnumEventoDom.Focus, this.ElementoInput_Focus.bind(this));
            this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.ElementoInput_Click.bind(this));
            this.AdicionarEventoDom(ui.EnumEventoDom.Blur, this.ElementoInput_Blur.bind(this));
            this.AdicionarEventoDom(ui.EnumEventoDom.MouseDown, this.ElementoInput_MouseDown.bind(this));


            if (this._isMostrarMensagemValidacaoFlutuante)
            {
                this.IsManterEspacoMensagemValidacao = false;
                this.OcultarElementoMensagemValidacaoInterno();
            }

            if (this.IsSkipTab())
            {
                this.ElementoInput.tabIndex = -1;
            }

            //this.InicializarAtritos();
        }
        private IsSkipTab(): boolean
        {
            return this.RetornarValorAtributoBoolean(AtributosHtml.SkipTab, false);
        }

        protected override RetornarHtmlInterno(): string
        {
            if (this.GetType() instanceof r.TipoUIHtml)
            {
                return HtmlReferenciaUtil.RetornarHtml(this);
            }
            throw new Error("O controle formulário não possui um HTML valido");
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.BindFormulario, null, true);
            if (String.IsNullOrWhiteSpace(this.CaminhoBind))
            {
                this.CaminhoBind = this.RetornarValorAtributo(AtributosHtml.Bind, null, true);
            }
            this._idElementoRotulo = this.RetornarIDElementoItemElemento("Rotulo"); 
            //u.ValidacaoUtil.ValidarReferenciaNula(this.CaminhoBind, "CaminhoBind");
             
            //this.InicializarRotuloInput();
        }

        
        protected override DepoisInicializarComponentesApresentacao()
        {
            this.IsAutoSalvar = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsAutoSalvar));

            this._idElementoCaixa = this.RetornarIDElementoItemElemento("Caixa");
            this._idElementoInput = this.RetornarIDElementoItemElemento("ControleInput");
            this._elementoInput = ElementoUtil.RetornarElemento(this._idElementoInput) as THTMLElementInput;
            this._elementoCaixa = ElementoUtil.RetornarElemento(this._idElementoCaixa);
            this._idElementoMensagemValidacao = this.RetornarIDElementoItemElemento("MensagemValidacao");
            this._isElementosInicializado = true;
        }

        //#endregion

        //#region Valor da Propriedade alterado

        protected override BaseControle_DataSource_Alterado(provedor: any, e: UIEventArgs): void
        {
            super.BaseControle_DataSource_Alterado(provedor, e);
        }

        public ValorPropriedadeAlterado(paiPropriedade: ObjetoControladorPropriedade,
            nomePropriedade: string,
            proprieade: r.Propriedade,
            valorPropriedade: any): void
        {
            if (this.PaiPropriedade !== paiPropriedade ||
                this.Propriedade !== proprieade ||
                this.NomePropriedade !== nomePropriedade)
            {
                this.PaiPropriedade = paiPropriedade;
                this.Propriedade = proprieade;
                this.NomePropriedade = nomePropriedade;
                this.ResetarUltimaValidacao();

                this.EventoPropriedadeAlterada.Notificar(this, EventArgs.Empty);
            }

            this._valorPropriedade = valorPropriedade;

            if (this.Propriedade instanceof r.Propriedade)
            {
                if (!this.IsRotuloDaPropriedadeInicializado)
                {
                    this.AtualizarRotulo();
                    this.IsRotuloDaPropriedadeInicializado = true;
                }
            }
            this.ValidarDepois.Executar();
        }

        private ValidarDepoisInterno()
        {
            const valorPropriedade = this.ValorProprieade;
            if (this.IsValidar(valorPropriedade))
            {
                this.ValidarAsyncInterno();
            }
            this.AtualizarCssClassePossuiConteudo();
        }

        protected AtribuirValorPropriedade(valor: any)
        {
            if (this.PaiPropriedade instanceof ObjetoControladorPropriedade &&
                this.BindControleFormulario instanceof BindControleFormulario)
            {
                if (valor !== this.BindControleFormulario.ValorPropriedade)
                {
                    this.BindControleFormulario.ValorPropriedade = valor;
                }
            }
        }

        protected ConverterValorDom(valorDom: string): TValor
        {
            return (this.ElementoInput.value as any) as TValor;
        }

        //#endregion

        //#region Rotulo

        protected override AtualizarRotulo(): void
        {
            super.AtualizarRotulo();
            this.VinalizarRotuloInput();
        }

        protected VinalizarRotuloInput(): void
        {
            const elementoRotulo = this.ElementoRotulo as HTMLLabelElement;
            elementoRotulo.htmlFor = this.ElementoInput?.id ?? String.Empty;
        }

        protected override RetornarRotulo(): string
        {
            const rotulo = super.RetornarRotulo();
            if (String.IsNullOrWhiteSpace(rotulo))
            {
                const valorAtributoRotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo, null, true);
                if (String.IsNullOrEmpty(valorAtributoRotulo))
                {
                    if (this.Propriedade instanceof r.Propriedade)
                    {
                        return u.GlobalizacaoUil.RetornarRotuloPropriedade(this.Propriedade);
                    }
                    else
                    {
                        if (this.IsRotuloHtmlInterno && !String.IsNullOrWhiteSpace(this.HtmlInternoInicial))
                        {
                            return this.HtmlInternoInicial;
                        }
                        return `${u.ConverterUtil.ParaString(this.CaminhoBind)}`;
                    }
                }
            }
            return rotulo;
        }

        protected RetornarElementoRotulo(): HTMLElement
        {
            return ElementoUtil.RetornarElemento(this._idElementoRotulo) as HTMLInputElement;
        }

        //#endregion

        //#region Auto salvar

        private readonly AutoSalvarExecutarDepois = new ExecutarDepois(this.AutoSalvar_Depois, TimeSpan.FromSeconds(2));
        private IsSalvarEntiade: boolean = false;

        protected AutoSalvarAsync(): void
        {
            if (this.IsAutoSalvar)
            {
                if (this.IsDesabilitado)
                {
                    return;
                }
                if (this.PaiPropriedade instanceof d.Entidade && this.Propriedade instanceof r.Propriedade)
                {
                    const entidade = this.PaiPropriedade as d.Entidade;
                    if (entidade.__IsExisteAlteracao)
                    {
                        this.AutoSalvarExecutarDepois.Executar(entidade, this.Propriedade, this.ValorProprieade);
                    }
                }
            }
        }

        private async AutoSalvar_Depois(entidade: d.Entidade, propriedade: r.Propriedade, valorPropriedade: any)
        {
            await ThreadUtil.BloquearAsync(this, () => this.IsSalvarEntiade);
            this.IsSalvarEntiade = true;
            try
            {
                const contexto = $Aplicacao.RetornarContextoDados(entidade.GetType() as r.TipoEntidade);
                const resultado = await contexto.SalvarPropriedadesAsync(entidade, propriedade);

                if (!resultado.IsSucesso)
                {
                    if ($Configuracao.IsDebug)
                    {
                        throw new Erro("Não foi possível salvar" + resultado.MensagemErro);
                    }
                }
            }
            catch (erro)
            {
                LogUtil.Erro(erro);
            }
            finally
            {
                this.IsSalvarEntiade = false;
            }
        }

        //#endregion

        //#region Validação 

        private ValorPropriedadeUltimaValidacao: any;

        private DataHoraUltimaValidacao: Date;
        private static TEMPO_EXPIRACAO_ULTIMA_VALIDACAO: number = 10000;

        private readonly Stopwatch = Stopwatch.StartNew();

        protected async ValidarAsyncInterno(isForcar: boolean = false)
        {
            await this.ValidarAsync(isForcar);
        }

        public async ValidarAsync(isForcar: boolean = false): Promise<boolean>
        {
            if (this.IsDesabilitado)
            {
                this.IsValido = true;
                this.FinalizarValidacao(true);
                return true;
            }
            this._isAlerta = false;
            if (!isForcar)
            {
                if (this.Stopwatch.ElapsedMilliseconds < 1000)
                {
                    return true;
                }
            }
            if (isForcar)
            {
                this.ElementoInput.blur();
                await u.ThreadUtil.QuebrarAsync();
            }

            if (isForcar || this.IsExecutarValidacao())
            {
                const valorPropriedade = this.ValorProprieade ?? this.Valor;
                let isValido = true;

                if (this.PaiPropriedade instanceof ObjetoControladorPropriedade)
                {
                    const propriedadeValidacoes = this.PaiPropriedade.RetornarPropriedadeValidacoes(this.NomePropriedade);
                    for (const validacao of propriedadeValidacoes.Validacoes)
                    {
                        if (!validacao.IsForcando || (validacao.IsForcando && isForcar))
                        {
                            isValido = await validacao.IsValidoAsync(this.PaiPropriedade, propriedadeValidacoes.Propriedade, valorPropriedade);
                            if (!isValido || validacao.IsAlerta)
                            {
                                if (this.PaiPropriedade instanceof ObjetoControladorPropriedade)
                                {
                                    this.UltimaMensagemValidacao = validacao.RetornarMensagemValidacao(this.PaiPropriedade, this.Propriedade, valorPropriedade);
                                    this.MostrarMensagemValidacao(isForcar);
                                    if (validacao.IsAlerta === true)
                                    {
                                        this._isAlerta = true;
                                        continue;
                                    }
                                    this._isValido = false;
                                    break;
                                }
                            }
                        }
                    }
                }

                this.IsValido = isValido;
                this.ValorPropriedadeUltimaValidacao = valorPropriedade;
                this.DataHoraUltimaValidacao = new Date();
            }
            this.FinalizarValidacao(this.IsValido);
            return this.IsValido;
        }

        protected IsExecutarValidacao(): boolean
        {
            if (this.IsIgnorarValidacao)
            {
                return false;
            }

            if (this.IsValidarSempre)
            {
                return true;
            }

            if (this.ValorProprieade === this.ValorPropriedadeUltimaValidacao &&
                this.DataHoraUltimaValidacao instanceof Date)
            {
                const tempo = new Date().getTime() - this.DataHoraUltimaValidacao.getTime();
                return tempo > BaseControleFormulario.TEMPO_EXPIRACAO_ULTIMA_VALIDACAO;
            }
            return true;
        }

        private ResetarUltimaValidacao(): void
        {
            this.IsValido = true;
            this.ValorPropriedadeUltimaValidacao = undefined;
            this.DataHoraUltimaValidacao = null;
        }

        private FinalizarValidacao(resultado: boolean): void
        {
            if (resultado)
            {
                this.AutoSalvarAsync();
                this.ElementoValido();
            }
            else
            {
                this.ElementoInvalido();
            }
        }

        private ElementoValido(): void
        {
            if (this.IsControleInicializado)
            {
                for (const elementoValidacao of this.ElementosValidacao)
                {
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_FALHA);
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_ALERTA);
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_SUCESSO);

                    const cssClass = this.IsAlerta ? ConstantesCssClasses.CSS_CLASSE_VALIDACAO_ALERTA : ConstantesCssClasses.CSS_CLASSE_VALIDACAO_SUCESSO;
                    elementoValidacao.classList.add(cssClass);

                }
                this.OcultarMensagemValidacao();
            }
        }

        private ElementoInvalido(): void
        {
            if (this.IsControleInicializado)
            {
                for (const elementoValidacao of this.ElementosValidacao)
                {
                    elementoValidacao.classList.add(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_FALHA);
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_SUCESSO);
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_ALERTA);
                }
            }
        }

        private IsValidar(valorPropriedade: any): boolean
        {
            if (this.IsGanhoPrimeiroFocusUsuario && this.IsValidarValorPropriedadeAlterado)
            {
                return !this.IsValido ||
                    this.IsAutoSalvar ||
                    u.ValidacaoUtil.IsDefinido(valorPropriedade, true);
            }
            return false;

        }

        //#endregion

        //#region Mensagem validação

        public LimparValidacao(): void
        {
            this.OcultarMensagemValidacao();
            for (const elementoValidacao of this.ElementosValidacao)
            {
                elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_FALHA);
            }

            //this.ElementoCaixa.classList.add(BaseControleFormulario.CSS_CLASSE_VALIDACAO_SUCESSO);
        }

        public MostrarMensagemValidacao(isForcar: boolean): void
        {
            if (!this.IsControleInicializado)
            {
                return;
            }

            if (!isForcar && this.IsOcultarMensagemValidacao())
            {
                this.OcultarMensagemValidacao();
                return;
            }

            if (this.IsControleInicializado && !this._isValido)
            {
                if (this.IsDesabilitado)
                {
                    this.DestinoMensagemValidacao.OcultarElemento(this.IsManterEspacoMensagemValidacao);
                    return;
                }

                if (!String.IsNullOrEmpty(this.UltimaMensagemValidacao))
                {
                    this.DestinoMensagemValidacao.innerHTML = this.UltimaMensagemValidacao;

                    if (this._isMostrarMensagemValidacaoFlutuante)
                    {
                        this.PosicionarMensagemValidacaoFluante();
                    }
                    this.DestinoMensagemValidacao.MostrarElemento();
                }
            }
        }

        private IsOcultarMensagemValidacao(): boolean
        {
            if ($Aplicacao.DocumentoPrincipal?.IsOcupado)
            {
                return true;
            }

            if (this.IsMostrarMensagemValidacaoFlutuante && !ElementoUtil.IsNaTela(this.Elemento))
            {
                return true;
            }

            return this.Propriedade instanceof r.Propriedade &&
                this.Propriedade.IsTipoString &&
                String.IsNullOrWhiteSpace(this.ValorProprieade);

        }

        public OcultarMensagemValidacao(isForcar: boolean = false): void
        {
            if (this.IsControleInicializado)
            {
                if (!isForcar && this._isNaoOcultarValidacao)
                {
                    this._isNaoOcultarValidacao = false;
                    return;
                }
                for (const elementoValidacao of this.ElementosValidacao)
                {
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_FALHA);
                    elementoValidacao.classList.remove(ConstantesCssClasses.CSS_CLASSE_VALIDACAO_ALERTA);
                }

                this.DestinoMensagemValidacao.innerHTML = String.Empty;
                this.DestinoMensagemValidacao.OcultarElemento(this.IsManterEspacoMensagemValidacao);
            }
        }

        private RetornarNovoElementoMensagemValidacaoFlutuante(): HTMLElement
        {
            const elemento = document.createElement("sn-mensagem-validacao");
            elemento.OcultarElemento();

            const elementoDestino = ControleUtil.RetornarElementoDestinoFlutuante(this);
            elementoDestino.appendChild(elemento);
            /*document.body.appendChild(elemento);*/
            return elemento;
        }

        private OcultarElementoMensagemValidacaoInterno(): void
        {
            if (this.IsControleInicializado)
            {
                this.ElementoMensagemValidacaoInterno.innerHTML = String.Empty;
                this.ElementoMensagemValidacaoInterno.OcultarElemento();
            }
        }

        public PosicionarMensagemValidacaoFluante(): void
        {
            if (this._isMostrarMensagemValidacaoFlutuante &&
                this.DestinoMensagemValidacao instanceof HTMLElement)
            {
                const tamanhoFonteDocumento = EstiloUtil.TamanhoFonteDocumento;
                const scalar = 16 / tamanhoFonteDocumento;

                const posicaoAtual = this.Elemento.getBoundingClientRect();
                let top = posicaoAtual.top + posicaoAtual.height + 7;
                let left = posicaoAtual.left;

                if (scalar > 0)
                {
                    top *= scalar;
                    left *= scalar;
                }
                this.DestinoMensagemValidacao.style.left = left.ToRems();
                this.DestinoMensagemValidacao.style.top = top.ToRems();

                const controleApresentacaoZIndex = (this.ControleApresentacao as any as ControleApresentacaoZIndex).RetornarControleApresentacaoZIndenx();
                EstiloUtil.IncrementarMensagemValizacaoZIndex(controleApresentacaoZIndex, this.DestinoMensagemValidacao,);
            }
        }

        private RemoverMensagemValidacaoFlutuante(): void
        {
            if (this._destinoMensagemValidacao instanceof HTMLElement)
            {
                this._destinoMensagemValidacao.remove();
                this._destinoMensagemValidacao = undefined;
                delete this._destinoMensagemValidacao;
            }
        }

        private RetornarDestinoMensagemValidacao(): HTMLElement | ComponenteApresentacao
        {
            const nomeDestinoMensagemValidacao = this.RetornarValorAtributo(AtributosHtml.DestinoMensagemValidacao);
            if (!String.IsNullOrEmpty(nomeDestinoMensagemValidacao))
            {
                if (nomeDestinoMensagemValidacao === "DestinoMensagemValidacao")
                {
                    throw new Erro("O nome ${nomeDestinoMensagemValidacao} é reservado pelo sistema");
                }
                const controlePai = this.RetornarControlePaiFiltro(x => (x as any)[nomeDestinoMensagemValidacao] instanceof HTMLElement ||
                    (x as any)[nomeDestinoMensagemValidacao] instanceof ComponenteApresentacao);
                if (controlePai != null)
                {
                    this.OcultarElementoMensagemValidacaoInterno();
                    this._isMostrarMensagemValidacaoFlutuante = false;
                    return (controlePai as any)[nomeDestinoMensagemValidacao];
                }
                throw new Erro(`O destino da mensagem validação '${nomeDestinoMensagemValidacao}' não foi encontrado`);
            }


            this._isMostrarMensagemValidacaoFlutuante = this.RetornarValorAtributoBoolean(
                AtributosHtml.MensagemValidacaoFlutuante,
                $Configuracao.ConfiguracaoLayout.IsMostrarMensagemValidacaoFlutuante);

            if (this._isMostrarMensagemValidacaoFlutuante)
            {
                return this.RetornarNovoElementoMensagemValidacaoFlutuante();

            }
            return this.ElementoMensagemValidacaoInterno;
        }

        //#endregion

        //#region Ocupar 

        protected override OcuparElemento(): void
        {
            super.OcuparElemento();
            this.OcultarMensagemValidacao();

            EstiloUtil.AdicionarCssClasse(this.ElementoInput, ConstantesCssClasses.CSS_CLASSE_OCUPAR_INPUT);
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Disabled, AtributosHtml.Disabled.Nome);
        }

        protected override DesocuparElemento(): void
        {
            if (!this.IsDispensado)
            {
                super.DesocuparElemento();

                EstiloUtil.RemoverCssClasse(this.ElementoInput, ConstantesCssClasses.CSS_CLASSE_OCUPAR_INPUT);
                ElementoUtil.RemoverAtributo(this.ElementoInput, AtributosHtml.Disabled);
            }
        }

        //#endregion

        //#region Eventos do dom

        private IndentificadorMensagemValidacaoFlutuante: number;

        protected ElementoInput_Change(e: Event): void;
        protected ElementoInput_Change(e?: Event): void
        {
            this.NotificarAlteracaoConcluido(this.Valor, e);
            this.AtualizarCssClassePossuiConteudo();
        }

        protected ElementoInput_Click(e: Event): void
        {
            this.IsGanhoPrimeiroFocusUsuario = true;
        }

        protected ElementoInput_Focus(e: FocusEvent): void
        {
            if (!this._isFocusPrimeiroControleApresentacao)
            {
                this.IsGanhoPrimeiroFocusUsuario = true;
            }

            window.clearTimeout(this.IndentificadorMensagemValidacaoFlutuante);

            if (!this.IsValido && !String.IsNullOrEmpty(this.UltimaMensagemValidacao))
            {
                this.MostrarMensagemValidacao(false);
            }
            this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_FOCUS);
        }

        protected ElementoInput_Blur(e: FocusEvent) 
        {

            if (this._isFocusPrimeiroControleApresentacao)
            {
                this._isFocusPrimeiroControleApresentacao = false;
            }
            this.Elemento.classList.remove(ConstantesCssClasses.CSS_CLASSE_FOCUS);
            this.AtualizarCssClassePossuiConteudo();
            this.AtualizarConteudoDom();
        }

        private ElementoInput_MouseDown(e: KeyboardEvent): void
        {
            e.stopPropagation();
        }

        protected NotificarAlteracaoConcluido(valor: any, domEvent: Event): void
        {
            if (this.IsControleInicializado)
            {
                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(valor, domEvent));
            }
        }

        protected AtualizarConteudoDom(): void
        {
            //esse método pode ser sobre escrito
        }

        /**O focus não ira ocultar a mensagem de validação flutuante */

        public FocusNaoOcultarValidacao(): void
        {
            this._isNaoOcultarValidacao = true;
            this.FocusInternoAsync();
        }

        public override Focus(): void
        {
            this._isNaoOcultarValidacao = false;
            this.FocusInternoAsync();
        }

        protected async FocusInternoAsync()
        {
            if (this.IsControleInicializado)
            {
                this.AtualizarCssClassePossuiConteudo();
                await ThreadUtil.QuebrarAsync();
                this.ElementoInput?.focus();
            }
        }

        public AtualizarCssClassePossuiConteudo(): void
        {
            if (this.IsControleInicializado)
            {
                this.AtualizarRotulo();
                if (this.IsExisteConteudoDom)
                {
                    this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_POSSUI_CONTEUDO);
                }
                else
                {
                    this.Elemento.classList.remove(ConstantesCssClasses.CSS_CLASSE_POSSUI_CONTEUDO);
                }
            }
        }

        //#endregion

        //#region Desabilitar

        public override Desabilitar(): void
        {
            super.Desabilitar();
            if (this.IsControleInicializado)
            {
                this.ElementoInput.disabled = true;
            }
        }

        public override Habilitar(): void
        {
            super.Habilitar();
            if (this.IsControleInicializado)
            {
                this.ElementoInput.disabled = false;
            }
        }

        //#endregion

        //#region  Somente leitura

        protected DefinirSomenteLeitura(): void
        {
            if (this.IsControleInicializado)
            {
                if (this._isSomenteLeitura)
                {
                    this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_SOMENTE_LEITURA);
                    ElementoUtil.HabilitarSomenteLeitura(this.ElementoInput);
                }
                else
                {
                    this.Elemento.classList.remove(ConstantesCssClasses.CSS_CLASSE_SOMENTE_LEITURA);
                    ElementoUtil.DesabilitarSomenteLeitura(this.ElementoInput);
                    //ElementoUtil.HabilitarElemento(this.Elemento);
                }
            }
        }

        //#endregion

        //#region EventosDom

        public override AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void): void
        public override AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, objetoThis: BaseUIElemento): void
        public override AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElemento: string | HTMLElement, objetoThis?: any, options?: boolean | AddEventListenerOptions): void
        public override AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElementoOuObjetoThis?: any, objetoThis?: any, options: boolean | AddEventListenerOptions = false): void
        {
            let elemento = ElementoUtil.RetornarElemento(refElementoOuObjetoThis, true);
            if (elemento == null)
            {
                elemento = this.ElementoInput;
            }

            if (refElementoOuObjetoThis instanceof BaseUIElemento)
            {
                objetoThis = refElementoOuObjetoThis;
            }

            super.AdicionarEventoDom(evento, manipulador, elemento, objetoThis, options);

        }
        public override RemoverEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void): void
        public override RemoverEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElemento?: HTMLElement | string | Window | Document): void
        public override RemoverEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElemento?: HTMLElement | string | Window | Document): void
        {
            super.RemoverEventoDom(evento, manipulador, refElemento);
        }

        //#endregion

        //#region IDisposable 

        public override Dispose(): void
        {
            if (this._isMostrarMensagemValidacaoFlutuante)
            {
                this.RemoverMensagemValidacaoFlutuante();
            }
            super.Dispose();

            this.Propriedade = null;
            this.PaiPropriedade = null;
        }

        //#endregion


        private ValidarElementosDebug(elemento: HTMLElement, _idElemento: string, isThrow:boolean = true)
        {
           
            if ($Configuracao.IsDebug)
            {
                //if (!this._isElementosInicializado)
                //{
                //    throw new Erro("Os elementos não foram inicializados, substituir o método HtmlCarregado para DepoisInicializarComponentesApresentacao")
                //}

                const elementoRecuperado = ElementoUtil.RetornarElemento(_idElemento, true) as THTMLElementInput;
                if (elementoRecuperado != null)
                {
                    if (elementoRecuperado !== elemento)
                    {

                        const mensagem = "O elemento input são diferente do " + this.___NomeConstrutor;
                        console.error(mensagem);
                        if (isThrow)
                        {
                            throw new Erro(mensagem);
                        }
                    }
                }
            }
        }
    }
}