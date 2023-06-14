namespace Snebur.UI
{
    export abstract class BaseUIElemento extends Snebur.ObjetoControladorPropriedade implements IDisposable
    {

        //#region Constantes
        private static readonly PREFIXO_PROPRIEDADE = "sn-prop-";
        //#endregion

        //#_isDispensado: boolean = false;
        //#idElemento: string;
        private __isDispensado: boolean = false;
        private __idElemento: string;
        private readonly __AtributosRaizInicializados = new List<string>();
        protected __isReiniciado: boolean = false;
        protected _elemento: HTMLElement;

        public readonly ControlePai: BaseControle;

        public get ControleApresentacao(): ControleApresentacao
        {
            return this.RetornarControlePai(ControleApresentacao);
        }

        public get ControleApresentacaoPai(): ControleApresentacao
        {
            return this.RetornarControlePai(ControleApresentacao, false, true);
        }

        public get IDElemento(): string
        {
            return this.__idElemento;
        }

        public get IsDispensado(): boolean
        {
            return this.__isDispensado;
        }

        public get __IsReiniciado(): boolean
        {
            return this.__isReiniciado;
        }

        private _visibilidade: EnumVisibilidade = undefined;

        public get Elemento(): HTMLElement
        {
            return this._elemento;
            //let elemento = ui.ElementoUtil.RetornarElemento(this.IDElemento, true);
            ////if (elemento == null && this.Dispensado)
            ////{
            ////    throw new Erro("O elemento já foi dispensado", this);
            ////}
            //return elemento;
        }

        public get HtmlInterno(): string
        {
            const elemento = ui.ElementoUtil.RetornarElemento(this.Elemento);
            return elemento.innerHTML;
        }

        public get IsVisivel(): boolean
        {
            return ElementoUtil.IsVisivel(this.Elemento);
        }

        public get Visibilidade(): EnumVisibilidade | boolean
        {
            return this._visibilidade ?? EnumVisibilidade.Visivel;
        }

        public set Visibilidade(value: EnumVisibilidade | boolean)
        {
            const visibilidadeNormalizada = ui.EstiloUtil.RetornarNormalizarVisibilidade(value);
            if (this._visibilidade !== visibilidadeNormalizada)
            {
                this._visibilidade = visibilidadeNormalizada;
                if (this.Elemento != null)
                {
                    EstiloUtil.AtualizarVisibilidade(this.Elemento, this._visibilidade);
                }
                this.OnVibilidadeAlterada();
            }
        }

        protected OnVibilidadeAlterada()
        {

        }

        private EventosDom: Array<EventoDom>;

        //#endregion

        //#region DataSource

        private ___dataSource__: any = undefined;

        protected get _dataSource(): any
        {
            return this.___dataSource__;
        }
        protected set _dataSource(value: any)
        {
            this.___dataSource__ = value;
        }

        public readonly EventoDataSourceAntesAlterar: Evento;
        public readonly EventoDataSourceAlterado: Evento;

        /**
         * Data Context está obsoleto, utilizar fontes de dados
         */
        public get DataSource(): any
        {
            return this.RetornarDataSource();
        }
        public set DataSource(value: any)
        {
            this.DefinirDataSource(value);
        }

        public get IsDataSourseHerdado()
        {
            return this._dataSource === undefined;
        }

        private RetornarDataSource(): any
        {
            if (this._dataSource !== undefined)
            {
                return ViewModelUtil.NormalizarViewModel(this._dataSource);
            }

            if (this.ControlePai != null)
            {
                return (this.ControlePai as any).RetornarDataSource();
            }
            return null;
        }

        protected DefinirDataSource(valor: any): void
        {
            if (this._dataSource !== valor)
            {
                this.EventoDataSourceAntesAlterar?.Notificar(this, UIEventArgs.Empty);
                this._dataSource = valor;
                this.EventoDataSourceAlterado?.Notificar(this, UIEventArgs.Empty);
            }
        }
        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, refElemento?: string | HTMLElement)
        {
            super();

            this.ControlePai = controlePai;
            this.EventoDataSourceAlterado = new Evento(this);
            this.EventoDataSourceAntesAlterar = new Evento(this);

            this.__idElemento = this.RetornarIDElemento(refElemento);
            if (refElemento instanceof HTMLElement)
            {
                this._elemento = refElemento;
            }


            this.EventosDom = new Array<EventoDom>();

            //this.CarregarHtmlElemento();
            //this.HtmlCarregado();
        }

        protected Inicializar(): void
        {
            //this.Argumentos = argumentos;

            this.CarregarHtmlElemento();
            this.HtmlCarregado();
            this.InicializarAtributosElementoRaiz();
            this.InicializarAtributos();

            if (!$Configuracao.IsProducao)
            {
                this.ValidarAtributosZS(this.Elemento);
            }
            this.InicializarPropriedades();
            this.InicializarCores();
        }

        private InicializarPropriedades(): void
        {
            this.InicializarPropriedadeInterno();
            this.InicializarPropriedadesPrefixoProp();
            this.InicializarAtributosVisibilidade();
            this.InicializarCores();
        }

        private InicializarPropriedadeInterno()
        {
            const valorAtributoInicializacao = this.RetornarValorAtributo(AtributosHtml.InicializacaoPropriedades);
            if (!String.IsNullOrWhiteSpace(valorAtributoInicializacao))
            {
                const valores = valorAtributoInicializacao.split("&");
                for (const valor of valores)
                {
                    const partes = valor.split("=");
                    if (partes.Count !== 2)
                    {
                        throw new Erro(`O valor do atributo ${AtributosHtml.InicializacaoPropriedades.Nome} = '${valorAtributoInicializacao}' é invalido`, this);
                    }
                    const nomePropriedade = partes.First();
                    const valorPropriedade = this.NormalizarValorPropriedadeAtributo(partes.Last(), nomePropriedade);
                    if (!BindUtil.IsCaminhoBind(valorAtributoInicializacao))
                    {
                        u.ReflexaoUtil.AtribuirValorPropriedade(this, nomePropriedade, valorPropriedade);
                    }
                }
            }
        }

        private InicializarPropriedadesPrefixoProp()
        {
            const atributos = this.Elemento.attributes;
            for (let i = 0; i < atributos.length; i++)
            {
                const atributo = atributos[i];
                if (atributo.nodeName.StartsWith(BaseUIElemento.PREFIXO_PROPRIEDADE))
                {
                    const nomePropriedade = this.RetornarNomePropriedadePrefixoPro(atributo.nodeName);
                    if ((this as any)[nomePropriedade] === undefined)
                    {
                        console.error(`A propriedade ${nomePropriedade}, atribuída pelo prefixo ${atributo.nodeName}=${atributo.value} não foi definida em  ${this.___NomeConstrutor}`);
                    }
                    const valorPropriedade = this.NormalizarValorPropriedadeAtributo(atributo.value, nomePropriedade);
                    u.ReflexaoUtil.AtribuirValorPropriedade(this, nomePropriedade, valorPropriedade);
                }
            }
        }
        private RetornarNomePropriedadePrefixoPro(nomeAtributo: string): string
        {
            const nomePropriedadeAtributo = nomeAtributo.substr(BaseUIElemento.PREFIXO_PROPRIEDADE.length);
            const partes = nomePropriedadeAtributo.split("-");
            return String.Join("", partes.Select(x => TextoUtil.FormatarPrimeiraLetraMaiuscula(x)));
        }

        private NormalizarValorPropriedadeAtributo(valorPropriedade: string, nomePropriedade: any)
        {
            if (valorPropriedade === "null")
            {
                return null;
            }

            const propriedade = this.GetType().RetornarPropriedade(nomePropriedade);
            if (propriedade instanceof r.Propriedade)
            {
                return u.ConverterUtil.Para(valorPropriedade, propriedade.Tipo);
            }
            return u.ConverterUtil.ParaTipoRecomendado(valorPropriedade);
        }

        private InicializarAtributosVisibilidade(): void
        {
            const valorAtributoVisibilidade = this.RetornarValorAtributo(AtributosHtml.Visibilidade, null);
            if (!String.IsNullOrWhiteSpace(valorAtributoVisibilidade) && !BindUtil.IsCaminhoBind(valorAtributoVisibilidade))
            {
                if (valorAtributoVisibilidade.StartsWith("this"))
                {
                    const nomeMetodo = valorAtributoVisibilidade.replace("this.", String.Empty);
                    const metodo = this.RetornarMetodo(nomeMetodo);
                    const valorTipado = metodo();
                    if (!u.EnumUtil.IsDefindo(EnumVisibilidade, valorTipado) &&
                        !ValidacaoUtil.IsBoolean(valorTipado))
                    {
                        throw new ErroOperacaoInvalida(`O valor do enum visibilidade retornado pelo método ${valorAtributoVisibilidade} não  é inválido`, this);
                    }
                    this.Visibilidade = valorTipado;
                }
                else
                {
                    if (!ValidacaoUtil.IsBoolean(valorAtributoVisibilidade) &&
                        !EnumUtil.IsDefindo(EnumVisibilidade, valorAtributoVisibilidade))
                    {
                        console.error(`O valo atributo ${AtributosHtml.Visibilidade.Nome}="${valorAtributoVisibilidade}" não é suportado, em ${this.ControleApresentacao?.___NomeConstrutor}`);
                        return;
                    }
                    this.Visibilidade = u.EnumUtil.RetornarValor(EnumVisibilidade, valorAtributoVisibilidade);
                }
            }
        }

        private InicializarCores(): void
        {
            this.AtualizarCoresAtributo(this.Elemento, AtributosHtml.Cor, AtributosHtml.Tonalidade, EnumPrefixoCor.CorFundo);
            this.AtualizarCoresAtributo(this.Elemento, AtributosHtml.CorFundo, AtributosHtml.TonalidadeFundo, EnumPrefixoCor.CorFundo);
            this.AtualizarCoresAtributo(this.Elemento, AtributosHtml.CorTexto, AtributosHtml.TonalidadeTexto, EnumPrefixoCor.CorTexto);
            //this.AtualizarCoresAtributo(this.Elemento, AtributosHtml.CorIcone, AtributosHtml.TonalidadeIcone, CorUtil.PREFIXO_COR_ICONE);
            this.AtualizarCoresAtributo(this.Elemento, AtributosHtml.CorBorda, AtributosHtml.TonalidadeBorda, EnumPrefixoCor.CorBorda);
        }

        protected AtualizarCoresAtributo(elemento: HTMLElement, atributoCor: AtributoHtml, atributoTonalidade: AtributoHtml, prefixocor: EnumPrefixoCor)
        {
            const classeCor = this.RetornarClasseCor(elemento, atributoCor, atributoTonalidade, prefixocor);
            if (!String.IsNullOrEmpty(classeCor))
            {
                elemento.classList.add(classeCor);
            }
        }

        private RetornarClasseCor(elemento: HTMLElement, atributoCor: AtributoHtml, atributoTonalidade: AtributoHtml, prefixoCor: EnumPrefixoCor)
        {
            const valorAtributoCor = this.RetornarValorAtributo(atributoCor, null, false, elemento);
            const valorAtributoTonalidade = this.RetornarValorAtributo(atributoTonalidade, null, false, elemento);
            if (!String.IsNullOrEmpty(valorAtributoCor) && !u.ValidacaoUtil.IsBind(valorAtributoCor))
            {
                let tonalidadeEnum = ui.EnumTonalidade.Padrao;
                const corEnum = u.EnumUtil.RetornarValor(ui.EnumCor, valorAtributoCor);
                if (!String.IsNullOrWhiteSpace(valorAtributoTonalidade))
                {
                    tonalidadeEnum = u.EnumUtil.RetornarValor(ui.EnumTonalidade, valorAtributoTonalidade);
                }
                u.EnumUtil.RetornarValor(EnumCor, valorAtributoCor);
                return CorUtil.RetornarClasseCssCor(prefixoCor, corEnum, tonalidadeEnum);

            }
            return null;
        }

        //#endregion

        //#region HTML interno

        protected HtmlInternoInicial: string = null;

        protected CarregarHtmlElemento(): void
        {
            let elemento = this.Elemento instanceof HTMLElement ? this.Elemento : document.getElementById(this.IDElemento);
            if (!(elemento instanceof HTMLElement))
            {
                elemento = this.RetornarNovoElemento();
                this.AdicionarElemento(elemento);
            }
            else
            {
                if (this instanceof ControleFlutuante)
                {
                    this.AdicionarElemento(elemento);
                }
            }

            if (elemento.id !== this.IDElemento)
            {
                elemento.id = this.IDElemento;
            }
            if (this.HtmlInternoInicial == null)
            {
                this.HtmlInternoInicial = elemento.innerHTML;
            }

            const atributos = ElementoUtil.RetornarAtributos(elemento);
            let htmlInterno = this.RetornarHtmlInterno(atributos);

            htmlInterno = this.NormalizarHtmlInterno(htmlInterno);

            if (!String.IsNullOrWhiteSpace(htmlInterno))
            {
                this.AtualizarInnerHtml(elemento, htmlInterno);
            }

            //if (!String.IsNullOrEmpty(htmlInterno))
            //{
            //    let htmlElemento = htmlInterno + this.HtmlInternoInicial;
            //    htmlElemento = this.NormalizarHtmlInterno(htmlInterno);
            //    ElementoUtil.AtualizarInnerHtml(elemento, htmlElemento);
            //}

            if ($Configuracao.IsDebug)
            {
                elemento.setAttribute("sn-construtor", this.___NomeConstrutor);
            }
            this._elemento = elemento;

            //delete (elemento as any);
            //elemento = undefined;
        }

        /**
         * Métodos sobre escritos pode utilizar o parâmetro atributos
         * @param atributos
         */
        protected RetornarHtmlInterno(atributos: DicionarioSimples)
        {
            const tipo = this.GetType();
            if (tipo instanceof r.BaseTipoUI)
            {
                const tipolHtml = tipo.RetornarTipoUIHtml();
                if (tipolHtml != null)
                {
                    return HtmlReferenciaUtil.RetornarHtml(this) + this.HtmlInternoInicial;
                }
            }
            return this.HtmlInternoInicial;
        }

        protected AtualizarInnerHtml(elemento: HTMLElement, htmlInterno: string): void
        {
            ElementoUtil.AtualizarInnerHtml(elemento, htmlInterno);
        }

        protected RetornarNovoElemento(): HTMLElement
        {
            const tagNovoElemento = this.RetornarTagNovoElemento();
            if (String.IsNullOrEmpty(tagNovoElemento))
            {
                throw new ErroNaoDefinido("A tag  do novo elemento não foi definido", this);
            }
            const elemento = document.createElement(tagNovoElemento);
            elemento.setAttribute(AtributosHtml.Construtor.Nome, this.___NomeConstrutor);
            return elemento;
        }

        protected HtmlCarregado(): void
        {

        }

        protected NormalizarHtmlInterno(htmlInterno: string): string
        {
            return htmlInterno;
        }

        //#endregion

        //#region Métodos protegidos, overrides permitido

        protected InicializarAtributos(): void
        {

        }

        private InicializarAtributosElementoRaiz(): void
        {
            const tipo = this.GetType();
            if (tipo instanceof r.BaseTipoUI)
            {
                const htmlReferencia = tipo.RetornarHtmlReferencia();
                if (htmlReferencia?.AtributosRaiz?.Count > 0)
                {
                    const paresChaveValor = htmlReferencia.AtributosRaiz.ToArrayChaveValor();
                    for (const parChaveValor of paresChaveValor)
                    {
                        if (!String.IsNullOrEmpty(parChaveValor.Chave) &&
                            !String.IsNullOrEmpty(parChaveValor.Valor) &&
                            !this.Elemento.hasAttribute(parChaveValor.Valor))
                        {
                            if (parChaveValor.Chave === "id")
                            {
                                throw new Erro("O atributo id não pode ser atribuído");
                            }

                            this.Elemento.setAttribute(parChaveValor.Chave, parChaveValor.Valor);
                            this.__AtributosRaizInicializados.Add(parChaveValor.Chave);
                        }
                    }
                }
            }
        }

        protected DispensarAtributosElementoRaiz()
        {
            if (this.Elemento instanceof HTMLElement)
            {
                for (const atributoRaiz of this.__AtributosRaizInicializados)
                {
                    this.Elemento.removeAttribute(atributoRaiz);
                }
            }
        }

        protected RetornarTagNovoElemento(): string
        {
            return "div";
        }

        private AdicionarElemento(elemento: HTMLElement): void
        {
            const elementoDestino = this.RetornarElementoDestino();
            this.AntesAdicionarElemento(elemento, elementoDestino);
            if (elementoDestino instanceof HTMLElement)
            {
                const refElementoAntesDe = this.RetornarRefElementoAntesDe();
                if (refElementoAntesDe instanceof HTMLElement) 
                {
                    ElementoUtil.InserirElementoAntes(elementoDestino, elemento, refElementoAntesDe);

                } else
                {
                    ElementoUtil.AdicionarElemento(elementoDestino, elemento);
                }
            }
        }

        protected AntesAdicionarElemento(elemento: HTMLElement, elementoDestino: HTMLElement): void
        {
            //esse método pode ser sobre escrito
        }

        protected RetornarElementoDestino(): HTMLElement
        {
            return this.ControlePai.ElementoApresentacao;
        }
        //O elemento vai ser adicionar antes elemento retorno
        //se null, será adiciona por ultimo
        protected RetornarRefElementoAntesDe(): any
        {
            return null;
        }
        //#endregion

        //#region Eventos dom

        public AdicionarEventoDomGlobal<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void): void;
        public AdicionarEventoDomGlobal<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, objetoBind: any, options?: boolean | AddEventListenerOptions): void;
        public AdicionarEventoDomGlobal<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, objetoBind: any = this, options?: boolean | AddEventListenerOptions): void
        {
            this.AdicionarEventoDom(evento, manipulador, window, objetoBind, options);
        }

        public AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void): void;
        public AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, objetoBind: BaseUIElemento): void;
        public AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElemento: string | Document | HTMLElement | Window, objetoBind?: any, options?: boolean | AddEventListenerOptions): void;
        public AdicionarEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElementoOuObjetoBind?: any, objetoBind?: any, options: boolean | AddEventListenerOptions = false): void
        {
            let elemento = ElementoUtil.RetornarElemento(refElementoOuObjetoBind, true);
            if (elemento == null)
            {
                elemento = this.Elemento;
            }

            if (refElementoOuObjetoBind instanceof BaseUIElemento)
            {
                objetoBind = refElementoOuObjetoBind;
            }

            if (objetoBind == null)
            {
                objetoBind = this;
            }

            const nomeEvento = evento;

            if ($Configuracao.IsDebug && !this.__isReiniciado)
            {
                const isJaExisteEventoDom = this.EventosDom.Where(x => x.NomeEvento === nomeEvento
                    && x.Elemento === elemento
                    && x.Manipulador === manipulador).Count > 0;

                if (isJaExisteEventoDom)
                {
                    const mensagemErro = `Já foi anexado o manipulador evento dom ${nomeEvento}  para o elemento TAG ${elemento.tagName}: \r\nNo controle  ${this.___NomeConstrutor} `;
                    console.info(mensagemErro);
                    return;
                }
            }

            const eventoDom = new EventoDom(objetoBind, nomeEvento, elemento, manipulador, options);
            this.EventosDom.Add(eventoDom);
        }

        public RemoverEventoDomGlobal<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void): void
        {
            this.RemoverEventoDom(evento, manipulador, window);
        }

        public RemoverEventoDom<T extends keyof EventoDomMapeado>(evento: T, manipulador: (e: EventoDomMapeado[T]) => void, refElemento?: HTMLElement | string | Window | Document): void
        {
            // let nomeEvento = u.EnumUtil.RetornarDescricao(EnumEventoDom, evento);

            const nomeEvento = evento;
            const elemento = u.ValidacaoUtil.IsDefinido(refElemento) ? ui.ElementoUtil.RetornarElemento(refElemento) : this.Elemento;

            const eventosDom = this.EventosDom.Where(x => x.NomeEvento === nomeEvento
                && x.Elemento === elemento
                && x.Manipulador === manipulador).ToList();

            for (const eventoDom of eventosDom)
            {
                eventoDom.Dispose();
                this.EventosDom.Remove(eventoDom);
            }
        }

        protected DispensarEventosDom(): void
        {
            for (const eventoDom of this.EventosDom)
            {
                eventoDom.Dispose();
            }
            this.EventosDom.Clear();
        }
        //#endregion

        //#region Métodos protegidos

        protected RetornarValorAtributo(atributo: AtributoHtml): string;
        protected RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any): string;
        protected RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any, isAceitarBind: boolean): string;
        protected RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any, isAceitarBind: boolean, elemento: HTMLElement): string;
        protected RetornarValorAtributo(atributo: AtributoHtml, valorPadrao: any = null, isAceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): string
        {
            const valorAtributo = elemento.getAttribute(atributo.Nome);
            if (!String.IsNullOrEmpty(valorAtributo))
            {
                if (isAceitarBind || !u.ValidacaoUtil.IsBind(valorAtributo))
                {
                    return valorAtributo;
                }
            }
            return valorPadrao;
        }

        protected RetornarValorAtributoRecursivo(atributo: AtributoHtml): string;
        protected RetornarValorAtributoRecursivo(atributo: AtributoHtml, valorPadrao: any): string;
        protected RetornarValorAtributoRecursivo(atributo: AtributoHtml, valorPadrao: any, aceitarBind: boolean): string;
        protected RetornarValorAtributoRecursivo(atributo: AtributoHtml, valorPadrao: any, aceitarBind: boolean, elemento: HTMLElement): string;
        protected RetornarValorAtributoRecursivo(this: BaseUIElemento, atributo: AtributoHtml, valorPadrao: any = null, aceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): string
        {
            let _atual = this;
            while (_atual.ControlePai instanceof BaseUIElemento)
            {
                const valorAtributo = _atual.RetornarValorAtributo(atributo, valorPadrao, aceitarBind, elemento);
                if (!String.IsNullOrWhiteSpace(valorAtributo))
                {
                    return valorAtributo;
                }
                _atual = _atual.ControlePai;
            }
            return null;
        }

        protected RetornarValorAtributoBoolean(atributo: AtributoHtml): boolean;
        protected RetornarValorAtributoBoolean(atributo: AtributoHtml, valorPadrao: boolean): boolean;
        protected RetornarValorAtributoBoolean(atributo: AtributoHtml, valorPadrao: boolean, aceitarBind: boolean): boolean;
        protected RetornarValorAtributoBoolean(atributo: AtributoHtml, valorPadrao: boolean, aceitarBind: boolean, elemento: HTMLElement): boolean;
        protected RetornarValorAtributoBoolean(atributo: AtributoHtml, valorPadrao: boolean = false, aceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): boolean
        {
            const valorAtributo = this.RetornarValorAtributo(atributo, null, aceitarBind, elemento);
            if (!String.IsNullOrEmpty(valorAtributo))
            {
                return u.ConverterUtil.ParaBoolean(valorAtributo);
            }
            return valorPadrao;
        }

        protected RetornarValorAtributoNumber(atributo: AtributoHtml): number;
        protected RetornarValorAtributoNumber(atributo: AtributoHtml, valorPadrao: number): number;
        protected RetornarValorAtributoNumber(atributo: AtributoHtml, valorPadrao: number, aceitarBind: boolean): number;
        protected RetornarValorAtributoNumber(atributo: AtributoHtml, valorPadrao: number = null, aceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): number
        {
            const valorAtributo = this.RetornarValorAtributo(atributo, null, aceitarBind, elemento);
            if (!String.IsNullOrEmpty(valorAtributo))
            {
                return u.ConverterUtil.ParaNumero(valorAtributo);
            }
            return valorPadrao;
        }

        protected RetornarValorAtributoEnum<TConstrutorEnum>(construtorEnum: TConstrutorEnum, atributo: AtributoHtml, valorPadrao: TConstrutorEnum[keyof TConstrutorEnum] = null, isAceitarBind: boolean = false, elemento: HTMLElement = this.Elemento): TConstrutorEnum[keyof TConstrutorEnum]
        {
            const valorAtributo = this.RetornarValorAtributo(atributo, null, isAceitarBind, elemento);
            if (!String.IsNullOrEmpty(valorAtributo))
            {

                if (u.EnumUtil.IsDefindo(construtorEnum, valorAtributo))
                {
                    return u.EnumUtil.RetornarValor(construtorEnum, valorAtributo);
                }

                if (isAceitarBind && ValidacaoUtil.IsBind(valorAtributo))
                {
                    return valorAtributo as any;
                }
            }
            return valorPadrao;
        }

        //public IsMouseEmCimaDoElemento(posicaoX: number, posicaoY: number): boolean;

        public IsPosicaoMouseEmCimaDoElemento(posicaoMouse: d.Posicao): boolean;
        public IsPosicaoMouseEmCimaDoElemento(posicaoMouse: d.Posicao, idElemento: string): boolean;
        public IsPosicaoMouseEmCimaDoElemento(posicaoMouse: d.Posicao, elemento: HTMLElement): boolean;
        public IsPosicaoMouseEmCimaDoElemento(posicaoMouse: d.Posicao, refElemento?: any): boolean
        {
            return this.IsMouseEmCimaDoElemento(posicaoMouse.X, posicaoMouse.Y, refElemento);
        }

        public IsMouseEmCimaDoElemento(posicaoX: number, posicaoY: number): boolean;
        public IsMouseEmCimaDoElemento(posicaoX: number, posicaoY: number, idElemento: string): boolean;
        public IsMouseEmCimaDoElemento(posicaoX: number, posicaoY: number, elemento: HTMLElement): boolean;
        public IsMouseEmCimaDoElemento(posicaoX: number, posicaoY: number, refElemento?: any): boolean
        {
            const elemento = (refElemento) ? ui.ElementoUtil.RetornarElemento(refElemento, true) : this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                const posicaoElemento = ElementoUtil.RetornarPosicaoElemento(elemento);

                const elementoInicioX = posicaoElemento.left;
                const elementoFinalX = posicaoElemento.width + elementoInicioX;

                const elementoInicioY = posicaoElemento.top;
                const elementoFinalY = posicaoElemento.height + elementoInicioY;

                if ((posicaoX >= elementoInicioX && posicaoX <= elementoFinalX) &&
                    (posicaoY >= elementoInicioY && posicaoY <= elementoFinalY))
                {
                    return true;
                }
            }

            return false;
        }
        //#endregion

        //#region Métodos privados

        protected RetornarIDElemento(idElemento: string): string;
        protected RetornarIDElemento(refElemento: HTMLElement): string;
        protected RetornarIDElemento(refElemento: string | HTMLElement): string;
        protected RetornarIDElemento(refElemento: string | HTMLElement): string
        {
            if (refElemento == null)
            {
                return ElementoUtil.RetornarNovoIDElemento(this);
            }
            if (refElemento instanceof HTMLElement)
            {
                const elemento: HTMLElement = refElemento;
                if (String.IsNullOrWhiteSpace(elemento.id))
                {
                    elemento.id = ElementoUtil.RetornarNovoIDElemento(this, elemento.tagName);
                }
                return elemento.id;
            }
            if (u.ValidacaoUtil.IsString(refElemento))
            {
                return refElemento;
            }
            throw new ErroNaoSuportado("A referencia do elemento não é suportada", this);

            //throw new ErroNaoSuportado(`A referencia do elemento não é suporta`, this);
        }

        protected RetornarItemElemento(nomeItemControle: string): HTMLElement;
        protected RetornarItemElemento(nomeItemControle: string, ignorarErro: boolean): HTMLElement;
        protected RetornarItemElemento(nomeItemControle: string, ignorarErro: boolean, funcaoEntrarArvore: FuncaoEntrarArvore): HTMLElement;
        protected RetornarItemElemento(nomeItemControle: string, ignorarErro?: boolean, funcaoEntrarArvore?: FuncaoEntrarArvore): HTMLElement
        {
            const id = this.RetornarIDElementoItemElemento(nomeItemControle, ignorarErro, funcaoEntrarArvore);
            return ui.ElementoUtil.RetornarElemento(id);
        }

        protected RetornarIDElementoItemElemento(nomeItemControle: string): string;
        protected RetornarIDElementoItemElemento(nomeItemControle: string, ignorarErro: boolean): string;
        protected RetornarIDElementoItemElemento(nomeItemControle: string, ignorarErro: boolean, funcaoEntrarArvore: FuncaoEntrarArvore): string;
        protected RetornarIDElementoItemElemento(nomeItemControle: string, ignorarErro?: boolean, funcaoEntrarArvore?: FuncaoEntrarArvore): string
        {
            ignorarErro = u.ConverterUtil.ParaBoolean(ignorarErro);

            const elementos = ElementoAtributoUtil.RetornarElementosPossuiAtrubito(this, AtributosHtml.ItemElemento, nomeItemControle, funcaoEntrarArvore);
            if (elementos.Count === 0 || elementos.Count > 1)
            {
                if (!ignorarErro)
                {
                    throw new Erro(`Não possível retornar o item controle ${nomeItemControle} - ocorrências- ${elementos.Count.toString()}`, this);
                }
            }
            const elemento = elementos.Single();
            if (String.IsNullOrWhiteSpace(elemento.id))
            {
                elemento.id = ElementoUtil.RetornarNovoIDElemento(this, nomeItemControle);
            }
            return elemento.id;
        }

        public RetornarControlePaiFiltro<TControle extends BaseUIElemento = BaseControle>(filtro: (value: TControle) => boolean, isNullSeEncontrado = true): TControle
        {
            let controleAtual: BaseUIElemento = this;
            while (controleAtual instanceof BaseUIElemento)
            {
                if (filtro(controleAtual as TControle))
                {
                    return controleAtual as TControle;
                }
                controleAtual = controleAtual.ControlePai;
            }
            if (isNullSeEncontrado)
            {
                return null;
            }
            throw new Erro(`O controle pai para expressão ${filtro.toString()} não foi encontrado`);
        }

        public RetornarControlePai<TControle extends BaseControle>(construtorControle: IControleConstrutor<TControle> | IAbstractControleConstrutor<TControle>, incluirEsteControle: boolean = true, isIgnorarErro: boolean = true): TControle
        {
            let controleAtual: BaseUIElemento = incluirEsteControle ? this : this.ControlePai;
            while (controleAtual instanceof BaseUIElemento)
            {
                if (controleAtual instanceof construtorControle)
                {
                    return controleAtual as TControle;
                }
                controleAtual = controleAtual.ControlePai;
            }

            if (isIgnorarErro)
            {
                return null;
            }

            throw new Erro(`Não foi possível retornar o controle pai do tipo ${construtorControle.GetType().Nome}`);
        }

        //somente em desenvolvimento, pois prejudica o desempenho
        private ValidarAtributosZS(elemento: HTMLElement): void
        {
            let len = elemento.attributes.length;
            for (let i = 0; i < len; i++)
            {
                const atributo = elemento.attributes[i];
                if (atributo.name.StartsWith(PREFIXO_ATRIBUTO_SNEBUR))
                {
                    if (!AtributosHtml.Atributos.ContainsKey(atributo.name) &&
                        !atributo.name.StartsWith(AtributosHtml.PrefixoPropriedadeSnebur.Nome))
                    {
                        console.warn(`O atributo ${atributo.name} não é valido. Construtor ${this.ControleApresentacao.___NomeConstrutor}`);
                    }
                }
            }

            len = elemento.childNodes.length;
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elemento.childNodes[i];
                if (elementoFilho instanceof HTMLElement)
                {
                    this.ValidarAtributosZS(elementoFilho);
                }
            }
        }

        public RetornarMetodo(nomeMetodo: string, ignorarControlePai: boolean = false, isIgnorarErro: boolean = false): Function
        {
            let controle = this as any;
            nomeMetodo = u.NormalizacaoUtil.NormalizarNomeMetodo(nomeMetodo);
            let metodo: Function = controle[nomeMetodo];
            if (!ignorarControlePai)
            {
                while ((controle != null) && !(metodo instanceof Function))
                {
                    controle = (controle as BaseControle).ControlePai;
                    if (controle instanceof BaseControle)
                    {
                        metodo = (controle as any)[nomeMetodo];
                    }
                }
            }

            if (!(metodo instanceof Function) && (!isIgnorarErro))
            {
                throw new Erro(`O handler ${nomeMetodo} não foi encontrado em ${this.ControlePai.GetType().Nome}`, this);
            }
            metodo = metodo.bind(controle);
            return metodo;
        }

        //#endregion

        //#region Visibilidade

        public MostrarElemento(): void
        {
            this.Visibilidade = EnumVisibilidade.Visivel;

            //ElementoUtil.MostrarElemento(this.IDElemento);
        }

        public OcultarElemento(invisivel?: boolean): void
        {
            this.Visibilidade = invisivel ? EnumVisibilidade.Invisivel : EnumVisibilidade.Oculto;
            //ElementoUtil.OcultarElemento(this.IDElemento);
        }

        public async OcultarDepois(tempo: number)
        {
            await ThreadUtil.EsperarAsync(tempo);
            this.OcultarElemento();

        }
        //#endregion

        //#region IDisposable 

        public override Dispose(): void
        {
            if (!this.__isDispensado)
            {
                this.RemoverTodosHandlersPropriedadeAlterada();
                if (this.__PropriedadesAlteradas instanceof DicionarioSimples)
                {
                    this.__PropriedadesAlteradas.Clear();
                }
                if (!this.IsDispensado)
                {
                    this.EventoDataSourceAlterado.Dispose();
                    this.EventoDataSourceAntesAlterar.Dispose();
                }

                const propriedades = Object.keys(this);
                for (const nomePropriedade of propriedades)
                {
                    /*eslint-disable*/
                    if (this.hasOwnProperty(nomePropriedade))
                    {
                        const valorPropriedade = (this as any)[nomePropriedade];
                        if (valorPropriedade instanceof HTMLElement)
                        {
                            (this as any)[nomePropriedade] = undefined;
                            delete (this as any)[nomePropriedade];
                        }
                    }
                    /*eslint-enable*/
                }

                this.DispensarEventosDom();
                super.Dispose();
                this.__isDispensado = true;
            }
        }
        //#endregion
    }
}

