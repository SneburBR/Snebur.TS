namespace Snebur.UI
{
    export abstract class BaseControle extends Snebur.UI.ComponenteApresentacaoConteudo
    {
        //private _isMarcarItem: boolean = null;
        private __isOcupado__: boolean = false;

        /*readonly #camposPrivados = new BaseControleCamposPrivados();*/
        private readonly __camposPrivadosBaseControle = new BaseControleCamposPrivados();

        protected __isReiniciando: boolean = false;
        protected __isControleCarregado: boolean = false;
        protected __isControleInicializado: boolean = false;

        protected override __isBaseControle__ = true;

        //#region Propriedades 

        protected readonly __classesCssControle = new HashSet<string>();

        //private __IdentificadorTimeoutJanelaOcupado: number;

        protected readonly DicionarioElementosSnebur = new DicionarioSimples<Array<Element>>();

        public ElementoDestinoControle: HTMLElement;

        public get ControlesFilho(): ListaObservacao<BaseControle>
        {
            return this.__camposPrivadosBaseControle._controlesFilho;
        }

        public get DicionarioControlesFilho(): DicionarioSimples<BaseControle, number>
        {
            return this.__camposPrivadosBaseControle._dicionarioControlesFilho;
        }

        public get Eventos(): Array<UIEvento>
        {
            return this.__camposPrivadosBaseControle._eventos;
        }

        public get EventosAmarrados(): Array<EventoControleHandler>
        {
            return this.__camposPrivadosBaseControle._eventosAmarrados;
        }

        public get Binds(): Array<BaseBind>
        {
            return this.__camposPrivadosBaseControle._binds;
        }

        public get IsOcupado(): boolean
        {
            return this.__isOcupado__;
        }

        //se renomeado alterar em ui.DocumentoPrincipal
        private set IsOcupadoInterno(value: boolean)
        {
            this.__isOcupado__ = value;
            this.NotificarPropriedadeAlterada(x => x.IsOcupado);
        }

        public get IsSistemaOcupado(): boolean
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                return $Aplicacao.DocumentoPrincipal.IsOcupado;
            }
            return this.IsOcupadoInterno;
        }

        public get IsReiniciando(): boolean
        {
            return this.__isReiniciando;
        }

        public get IsControleCarregado(): boolean
        {
            return this.__isControleInicializado && this.__isControleCarregado;
        }

        public get IsControleInicializado(): boolean
        {
            return this.__isControleInicializado;
        }

        public readonly EventoCarregado = new Evento(this);
        public readonly EventoAntesDescarregar = new Evento(this);
        public readonly EventoControleDispensado = new Evento(this);

        protected get CssClasseControle(): string
        {
            return String.Join(" ", this.__classesCssControle.ToList());
        }

        protected set CssClasseControle(value: string)
        {
            if (!String.IsNullOrWhiteSpace(value))
            {
                const partes = value.split(" ").Where(x => !String.IsNullOrWhiteSpace(x));
                this.__classesCssControle.AddRange(partes);
            }
        }

        public get IsExisteControleFilhoJanela(): boolean
        {
            return this.ControlesFilho.OfType(Janela).Count > 0 ||
                this.DicionarioControlesFilho.Valores.OfType(Janela).Count > 0;
        }

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, refElemento?: string | HTMLElement)
        {
            super(controlePai, refElemento, null);

            if (controlePai)
            {
                if (!this.ControlePai.DicionarioControlesFilho.ContainsKey(this.GetHashCode()))
                {
                    this.ControlePai.DicionarioControlesFilho.Add(this.GetHashCode(), this);
                }
            }

            //this.NomeControle = String.Empty;
            this.IsOcupadoInterno = false;

            //this.ControlesFilho = this.RetornarControleFilhos();
            this.DesativarNotificacaoPropriedadeAlterada();
            this.DicionarioElementosSnebur = new DicionarioSimples<Array<HTMLElement>>();
            this.EventoDataSourceAlterado.AddHandler(this.BaseControle_DataSource_Alterado, this);
        }

        public InicializarControle(): void
        {
            this.Inicializar();

            this.InicializarBinds();
            this.__isControleInicializado = true;
            this.AtivarNotificacaoPropriedadeAlterada();
            this.NotificarControleCarregado();
            //setTimeout(this.NotificarHtmlCarregado.bind(this), 500);
            $Aplicacao.AdicionarControleCarregado(this);

            /* movido para ControleApresentacao
             * this.Legenda = this.RetornarValorLegenda();*/
            //this.RetornarValorAtributo(AtributosHtml.Legenda, null);
            if (this.IsDesabilitado)
            {
                this.Desabilitar();
            }
            this.__isControleCarregado = true;
        }

        protected override Inicializar(): void
        {
            if (this.IsControleInicializado)
            {
                throw new Error("Controle já inicializado");
            }
            super.Inicializar();

            this.AtualizarCssClassesControle();
            //this.Argumentos = argumentos;
            this.DicionarioElementosSnebur.AddRange(this.RetornarElementosPossuiAtrubitoSnebur());
            this.ControlesFilho.AddRange(this.RetornarControleFilhosInterno());

            this.InicializarControlesFilho();

            this.NomearElementos();
            this.AntesInicializarBinds();
            this.Binds.AddRange(this.RetornarBinds());
            this.AntesInicializarEventos();
            this.AtualizarEventos();

            //this.InicializarControlesFilho();

            this.InicializarVisibilidadesElementos();
            this.InicializarCoresElementos();

            this.__isControleInicializado = true;
        }

        public override AtualizarAparencia(): void
        {
            if (this.IsControleInicializado)
            {
                super.AtualizarAparencia();

                for (const controleFilho of this.DicionarioControlesFilho.Valores)
                {
                    if (controleFilho.IsControleInicializado)
                    {
                        controleFilho.AtualizarAparencia();
                    }
                }
            }
        }

        protected AtualizarCssClassesControle(): void
        {
            if (this.__classesCssControle?.Count > 0)
            {
                for (const cssClasse of this.__classesCssControle.ToList())
                {
                    EstiloUtil.AdicionarCssClasse(this.Elemento, cssClasse);
                }
            }
        }

        protected InicializarVisibilidadesElementos(): void
        {
            if (this.DicionarioElementosSnebur.ContainsKey(AtributosHtml.Visibilidade.Nome))
            {
                const elementos = this.DicionarioElementosSnebur.Item(AtributosHtml.Visibilidade.Nome);
                for (const elemento of elementos)
                {
                    if (!ui.ControleUtil.IsElementoControle(elemento) && elemento instanceof HTMLElement)
                    {
                        const valorAtributo = elemento.getAttribute(AtributosHtml.Visibilidade.Nome);
                        if (!u.ValidacaoUtil.IsBind(valorAtributo))
                        {
                            const visibilidade = u.EnumUtil.RetornarValor(EnumVisibilidade, valorAtributo);
                            ui.EstiloUtil.AtualizarVisibilidade(elemento, visibilidade);
                        }
                    }
                }
            }
        }

        protected InicializarCoresElementos(): void
        {
            this.AtualizarCoresElementosAtributo(AtributosHtml.Cor, AtributosHtml.Tonalidade, EnumPrefixoCor.CorFundo);
            this.AtualizarCoresElementosAtributo(AtributosHtml.CorFundo, AtributosHtml.TonalidadeFundo, EnumPrefixoCor.CorFundo);
            this.AtualizarCoresElementosAtributo(AtributosHtml.CorTexto, AtributosHtml.TonalidadeTexto, EnumPrefixoCor.CorTexto);
            //this.AtualizarCoresElementosAtributo(AtributosHtml.CorIcone, AtributosHtml.TonalidadeIcone, CorUtil.PREFIXO_COR_ICONE);
            this.AtualizarCoresElementosAtributo(AtributosHtml.CorBorda, AtributosHtml.TonalidadeBorda, EnumPrefixoCor.CorTexto);
        }

        protected AtualizarCoresElementosAtributo(atributoCor: AtributoHtml, atributoTonalidade: AtributoHtml, prefixoCor: EnumPrefixoCor): void
        {
            if (this.DicionarioElementosSnebur.ContainsKey(atributoCor.Nome))
            {
                const elementos = this.DicionarioElementosSnebur.Item(atributoCor.Nome);
                for (const elemento of elementos)
                {
                    if (!ui.ControleUtil.IsElementoControle(elemento) && elemento instanceof HTMLElement)
                    {
                        this.AtualizarCoresAtributo(elemento, atributoCor, atributoTonalidade, prefixoCor);
                    }
                }
            }
        }

        protected NotificarControleCarregado()
        {
            this.EventoCarregado.Notificar(this, UIEventArgs.Empty);

            ////para evitar que o evento seja chamado mais de uma vez
            //this.EventoCarregado.Clear();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected AntesInicializarBinds(): void
        {

        }

        protected AntesInicializarEventos(): void
        {

        }

        //#endregion

        //#region DataSource

        protected BaseControle_DataSource_Alterado(provedor: any, e: UIEventArgs)
        {
            this.AtualizarValoresBindDataSource();
        }

        public AtualizarValoresBindDataSource(): void
        {
            if (this.IsControleInicializado)
            {
                for (const bind of this.Binds.OrderBy(x => x.Priority))
                {
                    bind.DataSource = this.DataSource;
                }
            }

        }
        //#endregion

        //#region ControlesFilho

        protected RetornarControleFilhosInterno(): BaseControle[]
        {
            const controlesFilho = new Array<BaseControle>();
            const elementosControleFilho = ElementoControleUtil.RetornarElementosControleFilho(this.Elemento, false);

            const len = elementosControleFilho.length;
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elementosControleFilho[i];
                //let nomeConstrutor =  elementoFilho.tagName.substring(PREFIXO_TAG_CONTROLE.length);

                const construtor = this.RetornarConstrutorControleFilho(elementoFilho);
                const controleFilho = new construtor(this, elementoFilho);

                if ($Configuracao.IsDebug)
                {
                    if (!(controleFilho instanceof BaseControle))
                    {
                        throw new Erro("O controle filho é invalido", this);
                    }
                    if (controleFilho.Elemento === undefined)
                    {

                        console.error(`O elemento inicialização do controle ${controleFilho.___NomeConstrutor} foi rejeitado, em ${this.___NomeConstrutor}. 
                                       Verifique o método construtor se o elemento referencia está sendo passado para a class super 
                                       Ex:  public constructor(controlePai: Snebur.UI.BaseControle, refElemento: HTMLElement| string)
                                                   &nbsp;&nbsp;&nbsp;&nbsp;super(controlePai, refElemento); `);

                        if ($Configuracao.IsDebug)
                        {
                            const xxx = new construtor(this, elementoFilho);
                        }
                    }
                }

                controlesFilho.Add(controleFilho);
                this.AtribuirNomeObjeto(controleFilho, elementoFilho);

                //let nome = ElementoUtil.RetornarValorAtributo(elementoFilho, AtributosHtml.Nome);
                //if (!String.IsNullOrWhiteSpace(nome))
                //{

                //    //controleFilho.NomeControle = nome;
                //    controleFilho.Nome = nome;
                //    (this as any)[nome] = controleFilho;
                //}
            }
            return controlesFilho;
        }

        protected RetornarConstrutorControleFilho(elemento: HTMLElement): IControleConstrutor
        {
            const tagName = elemento.tagName;
            if (tagName === ui.TAG_CONTROLE_USUARIO)
            {
                const caminho = ElementoUtil.RetornarValorAtributo(elemento, AtributosHtml.Controle);
                if (String.IsNullOrEmpty(caminho))
                {
                    throw new ErroNaoDefinido(`Não foi definido o atributo sn-controle no em ${ui.TAG_CONTROLE_USUARIO} no elemento: ${this.IDElemento}`, this);
                }
                return ControleUtil.RetornarConstrutorControle(this, caminho);
            }

            if ($ElementosControle.ContainsKey(tagName))
            {
                return $ElementosControle.Item(tagName).RetornarConstrutior(elemento);
            }
            throw new ErroNaoSuportado(`A tag não é suportada ${tagName} - controle origem ${this.IDElemento}`, this);
        }

        protected InicializarControlesFilho(): void
        {
            const len = this.ControlesFilho.length;
            for (let i = 0; i < len; i++)
            {
                const controleFilho = this.ControlesFilho[i];
                controleFilho.InicializarControle();
            }
            this.ControlesFilhosCarregado();

        }

        protected ControlesFilhosCarregado(): void
        {
            //pode ser sobre escrito
        }

        protected AtualizarControlesFilho(atualizarDicionarioElementosSnebur: boolean = true): void
        {
            if (atualizarDicionarioElementosSnebur)
            {
                this.AtualizarDicionarioElementosSnebur();
            }
            this.DispensarControlesFilhos();
            this.ControlesFilho.Clear();
            this.ControlesFilho.AddRange(this.RetornarControleFilhosInterno());
            this.InicializarControlesFilho();
        }

        protected DispensarControlesFilhos(): void
        {
            if (this.ControlesFilho instanceof Array)
            {
                for (const controleFilho of this.ControlesFilho)
                {
                    controleFilho.Dispose();

                    if (this.DicionarioControlesFilho.ContainsKey(controleFilho.GetHashCode()))
                    {
                        this.DicionarioControlesFilho.Remove(controleFilho.GetHashCode());
                    }
                }
                this.ControlesFilho.Clear();
            }

            const controlesRestante = this.DicionarioControlesFilho.ToArray();
            if (controlesRestante.Count > 0)
            {
                for (const controleFilho of controlesRestante)
                {
                    if (this.DicionarioControlesFilho.ContainsKey(controleFilho.GetHashCode()))
                    {
                        this.DicionarioControlesFilho.Remove(controleFilho.GetHashCode());
                    }
                    controleFilho.Dispose();
                }
            }

            //if (this.DiciionarioControlesFilho.ContainsKey(this.__HashCode))
            //{
            //    this.DiciionarioControlesFilho.Add(this.__HashCode, this);
            //}
        }

        //#endregion

        //#region Nomear elementos

        protected NomearElementos(): void
        {
            if (this.DicionarioElementosSnebur.ContainsKey(AtributosHtml.Nome.Nome))
            {
                const elementos = new List<Element>();
                /*elementos.AddRange(this.DicionarioElementosSnebur.TryItem(AtributosHtml.NomeElemento.Nome));*/
                elementos.AddRange(this.DicionarioElementosSnebur.TryItem(AtributosHtml.Nome.Nome));

                //if ($Configuracao.IsDebug && elementos.Count > 1)
                //{
                //    let grupos = elementos.GroupBy(x => x.getAttribute(AtributosHtml.NomeElemento.Nome));
                //    let nomesComMaisDeUmElemento = grupos.Where(x => x.Itens.Count > 1).Select(x => x.Chave);
                //    if (nomesComMaisDeUmElemento.Count > 0)
                //    {
                //        let uniaoNomes = String.Join(", ", nomesComMaisDeUmElemento);
                //        let mensagem = `O nome(s) ${uniaoNomes} de elemento(s) possui mais de elemento, ele deve ser único para cada elemento. Apresentacao ${this.ControleApresentacao.___NomeConstrutor}`;
                //        throw new Erro(mensagem);
                //    }
                //}

                for (const elemento of elementos)
                {
                    if (String.IsNullOrEmpty(elemento.id))
                    {
                        elemento.id = ui.ElementoUtil.RetornarNovoIDElemento(this);
                    }
                    this.AtribuirNomeObjeto(elemento, elemento);
                }
            }
        }

        //#endregion

        //#region eventos 

        protected RetornarEventos(): Array<UIEvento>
        {
            return UIEventoUtil.RetornarUIEventos(this);
        }

        protected AtualizarEventos(atualizarDicionarioElementosSnebur: boolean = true): void
        {
            if (atualizarDicionarioElementosSnebur)
            {
                this.AtualizarDicionarioElementosSnebur();
            }
            this.DispensarUIEventos();
            this.Eventos.AddRange(this.RetornarEventos());
        }

        protected DispensarUIEventos(): void
        {
            if (this.Eventos instanceof Array)
            {
                for (const evento of this.Eventos)
                {
                    evento.Dispose();
                }
                this.Eventos.Clear();
            }
        }

        //#endregion

        //#region Binds 

        protected InicializarBinds(): void
        {
            for (const bind of this.Binds)
            {
                bind.InicializarBind();
            }
        }

        protected AtualizarBinds(isAtualizarProfundo: boolean = true): void
        {
            if (this.IsControleInicializado)
            {
                //if (atualizarDicionarioElementosSnebur)
                //{
                //    this.AtualizarDicionarioElementosSnebur();
                //}
                if (isAtualizarProfundo)
                {
                    this.AtualizarDicionarioElementosSnebur();
                }

                this.DispensarBinds();
                this.Binds.AddRange(this.RetornarBinds());
                this.AtualizarBindsControleFormumatio();
                this.InicializarBinds();
            }
        }

        private AtualizarBindsControleFormumatio()
        {
            for (const bind of this.Binds.OfType(BindControleFormulario))
            {
                bind.ControleFormulario?.AtualizarBinds();
            }
        }

        protected DispensarBinds(): void
        {
            if (this.Binds instanceof Array)
            {
                for (const bind of this.Binds)
                {
                    if (bind instanceof BindControleFormulario)
                    {
                        bind.ControleFormulario?.DispensarBinds();
                    }
                    bind.Dispose();
                }
                this.Binds.Clear();
            }
        }

        protected RetornarBinds(): Array<BaseBind>
        {
            return BindControleUtil.RetornarBinds(this, this.DicionarioElementosSnebur);
        }

        //#endregion



        //#region Controles filho

        public RetornarControleFilho<TControle extends BaseControle>(construtorControle: IControleConstrutor<TControle>, recursivo: boolean = false, isIgnorarErro: boolean = false): TControle
        {
            const controle = this.RetornarControleFilhos<TControle>(construtorControle, recursivo).SingleOrDefault();
            if (controle == null)
            {
                if (!isIgnorarErro)
                {
                    throw new Erro(`O controle do tipo ${construtorControle.GetType().Nome} não foi encontrado em ${this.ControleApresentacao.Nome}`);
                }
            }
            return controle;
        }


        public RetornarControleFilhos<TControle extends BaseControle>(construtorControle: IAbstractControleConstrutor<TControle>, recursivo?: boolean): List<TControle>
        public RetornarControleFilhos<TControle extends BaseControle>(construtorControle: IControleConstrutor<TControle>, recursivo?: boolean): List<TControle>
        public RetornarControleFilhos<TControle extends BaseControle>(construtorControle: IControleConstrutor<TControle> | IAbstractControleConstrutor<TControle>, recursivo: boolean = false): List<TControle>
        {
            if (!construtorControle)
            {
                throw new Error("O construtorControle do controle não foi definido");
            }
            const retorno = new HashSet<TControle>();
            retorno.AddRange(this.ControlesFilho.OfType<TControle>(construtorControle));
            retorno.AddRange(this.DicionarioControlesFilho.Valores.OfType<TControle>(construtorControle));

            if (recursivo)
            {
                for (const controleFilho of this.ControlesFilho)
                {
                    retorno.AddRange(controleFilho.RetornarControleFilhos<TControle>(construtorControle, recursivo));
                }
            }
            return retorno.ToList();
        }

        //#endregion

        //#region Métodos públicos

        public RetornarElementoNome(nomeElemento: string): HTMLElement
        {
            const elemento = (this as any)[nomeElemento];
            if (elemento instanceof HTMLElement)
            {
                return elemento;
            }
            throw new Erro(`O elemento nome ${nomeElemento} não foi encontrado`, this);
        }

        //#endregion

        //#region Ocupar e desocupar

        public get ProgressoOcupadoAtual(): number
        {
            return $Aplicacao.DocumentoPrincipal?.ProgressoOcupadoAtual ?? 0;
        }

        public Ocupar(): void;
        public Ocupar(titulo: string, mensagem: string): void;
        public Ocupar(opcao: EnumOpcaoOcupar): void;
        public Ocupar(isOcuparImeditamente: boolean): void;
        public Ocupar(opcaoOcupar?: EnumOpcaoOcupar | boolean | string, mensagem?: string): void
        public Ocupar(opcaoOcupar?: EnumOpcaoOcupar | boolean | string, mensagem?: string): void
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.Ocupar(opcaoOcupar as any, mensagem, this);
                this.IsOcupadoInterno = true;
            }
            else
            {
                this.OcuparElemento();
            }
        }

        //public Desocupar(): void;
        //public Desocupar(callback: Function): void;
        //public Desocupar(callback: Function = null): void
        //{
        //    if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
        //    {
        //        $Aplicacao.DocumentoPrincipal.Desocupar(callback);
        //        $Aplicacao.DocumentoPrincipal.Desocupar(callback);
        //        this.__isOcupado = false;
        //    }
        //    else
        //    {
        //        this.DesocuparElemento();
        //    }
        //}

        public ProgressoOcupado(processo: number): void
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.ProgressoOcupado(processo);
            }
        }

        public TituloOcupado(titulo: string): void
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.TituloOcupado(titulo);
            }
        }

        public MensagemOcupado(mensagem: string): void
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                $Aplicacao.DocumentoPrincipal.MensagemOcupado(mensagem);
            }
        }

        //public async DesocuparAsync(): Promise<void>
        //{
        //    await this.DesocuparAsync();
        //    //if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
        //    //{
        //    //    await $Aplicacao.DocumentoPrincipal.DesocuparAsync();
        //    //    this.__isOcupado = false;
        //    //}
        //    //else
        //    //{
        //    //    this.DesocuparElemento();
        //    //    this.__isOcupado = false;
        //    //}
        //}

        public async DesocuparAsync(): Promise<void>
        {
            if ($Aplicacao.DocumentoPrincipal instanceof DocumentoPrincipal)
            {
                await $Aplicacao.DocumentoPrincipal.DesocuparAsync();
                this.IsOcupadoInterno = false;
            }
            else
            {
                this.DesocuparElemento();
                this.IsOcupadoInterno = false;
            }
        }

        protected OcuparElemento(): void
        {
            //EstiloUtil.AdicionarCssClasse(this.Elemento, BaseControle.CssClasseOcupado, true);
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                ElementoUtil.DesabilitarElemento(elemento, false);
            }
            this.OcuparElementosFilho();
        }

        protected OcuparElementosFilho(): void
        {
            const controlesFilhos = this.DicionarioControlesFilho.Valores;
            for (const controleFilho of controlesFilhos.
                Where(x => x.IsControleInicializado && !x.IsDispensado))
            {
                controleFilho.OcuparElemento();
            }
        }

        protected DesocuparElemento(): void
        {
            const elemento = this.Elemento;
            if (elemento instanceof HTMLElement)
            {
                if (!this.IsDesabilitado)
                {
                    ElementoUtil.HabilitarElemento(elemento);
                    this.DesocuparElementosFilho();
                }
            }
        }

        protected DesocuparElementosFilho(): void
        {
            const controlesFilhos = this.DicionarioControlesFilho.Valores.
                Where(x => x.IsControleInicializado && !x.IsDispensado);

            for (const controleFilho of controlesFilhos)
            {
                controleFilho.DesocuparElemento();
            }
        }

        //#endregion

        //#region Habilitar e desabilitar 

        public override Desabilitar(): void
        {
            super.Desabilitar();

            //for (let controleFilho of this.ControlesFilho)
            //{
            //    controleFilho.Desabilitar();
            //}

        }

        public override Habilitar(): void
        {
            super.Habilitar();

            //for (let controleFilho of this.ControlesFilho)
            //{
            //    controleFilho.Habilitar();
            //}
        }

        //#endregion

        protected RetornarElementosPossuiAtrubitoSnebur(): DicionarioSimples<Array<Element>>
        {
            const isIncluirEsteElemento = (this instanceof BaseItemTemplate) && !(this instanceof Celula);
            const isVarrerFilhos = !(this instanceof Linha);
            return ElementoAtributoUtil.RetornarElementosPossuiAtrubitoSnebur(this.Elemento, isIncluirEsteElemento, isVarrerFilhos);
        }

        //#region Elemento destino controle 

        protected override RetornarElementoDestino(): HTMLElement
        {
            if (this.ElementoDestinoControle instanceof HTMLElement)
            {
                return this.ElementoDestinoControle;
            }
            return super.RetornarElementoDestino();
        }

        //#endregion

        //#region Ocultar e Mostrar elemento

        //public override OcultarElemento()
        //{
        //    super.OcultarElemento();
        //    for (const controle of this.ControlesFilho)
        //    {
        //        controle.OcultarElemento();
        //    }
        //}

        //public override MostrarElemento()
        //{
        //    super.MostrarElemento();
        //    for (const controle of this.ControlesFilho)
        //    {
        //        controle.MostrarElemento();
        //    }
        //}

        //#endregion

        //#region Dicionario elementos snebur

        protected DispensarDicionariosElementos(): void
        {
            if (this.DicionarioElementosSnebur instanceof DicionarioSimples)
            {
                const valores = this.DicionarioElementosSnebur.Valores;
                for (const elementos of valores)
                {
                    elementos.Clear();
                }
                this.DicionarioElementosSnebur.Clear();
            }
        }

        protected AtualizarDicionarioElementosSnebur(): void
        {
            this.DispensarDicionariosElementos();
            this.DicionarioElementosSnebur.Clear();
            this.DicionarioElementosSnebur.AddRange(this.RetornarElementosPossuiAtrubitoSnebur());
        }

        //#endregion

        //#region ReInicializar

        public override ReInicializar(ignorarErro = false): void
        {
            //this.FecharJanelaOcupado();
            try
            {
                this.__isReiniciando = true;
                this.__isReiniciado = true;
                this.__isControleCarregado = false;
                //this.RemoverLegenda();
                //window.clearTimeout(this.__IdentificadorTimeoutJanelaOcupado);
                this.EventoAntesDescarregar?.Notificar(this, EventArgs.Empty);
                this.DispensarDicionariosElementos();
                this.DispensarBinds();
                this.DispensarUIEventos();
                this.DispensarEventosDom();
                this.DispensarControlesFilhos();

                super.ReInicializar();

                //Eventos
                this.EventoCarregado?.Desativar();
                this.__isControleInicializado = false;
                this.InicializarControle();
                this.EventoCarregado.Ativar();
                this.EventoCarregado.Notificar(this, EventArgs.Empty);
                this.__isControleCarregado = true;
            }

            catch (erro)
            {
                if (!ignorarErro)
                {
                    throw erro;
                }
            }
            finally
            {
                this.__isReiniciando = false;
            }
        }

        //#endregion


        protected FlushBindsAsync(): Promise<void>
        {
            return u.ThreadUtil.EsperarAsync(10);
        }


        //#region IDisposable

        public override Dispose()
        {
            if (!this.IsDispensado)
            {
               
                //if (this.ControlePai instanceof BaseControle )
                //{
                //    this.ControlePai.EventoDataSourceAlterado.RemoveHandler(this.LegendaControlePai_DataSourceAlterado, this);
                //}

                //if (this.IsOcupado)
                //{
                //    this.Desocupar();
                //}
                if (this.ControlePai instanceof BaseControle)
                {
                    if (this.ControlePai.DicionarioControlesFilho.ContainsKey(this.GetHashCode()))
                    {
                        this.ControlePai.DicionarioControlesFilho.Remove(this.GetHashCode());
                    }
                }

                //this.RemoverLegenda();
                //window.clearTimeout(this.__IdentificadorTimeoutJanelaOcupado);
                this.EventoAntesDescarregar.Notificar(this, EventArgs.Empty);
                this.DispensarDicionariosElementos();
                this.DispensarBinds();
                this.DispensarUIEventos();
                this.DispensarEventosDom();
                this.DispensarControlesFilhos();
                this.DispensarVariaveis();
                //Eventos
                this.EventoCarregado.Dispose();
                //this.EventoCarregado = null;


                super.Dispose();

                this.RemoverElementoControle();

                const elemento = document.getElementById(this.IDElemento);
                if (elemento instanceof HTMLElement)
                {
                    elemento.parentElement.removeChild(elemento);
                    //ElementoUtil.RemoverElemento(elemento.parentElement, elemento, true);
                }
                $Aplicacao.RemoverControleCarregado(this);

                this.EventoControleDispensado.Notificar(this, EventArgs.Empty);
                this.EventoControleDispensado.Dispose();
            }
        }

        private DispensarVariaveis()
        {
            delete this.__isOcupado__;
            delete this.IsOcupadoInterno;
            delete this.__isControleCarregado;
            delete (this as any).__classesCssControle;
            this.__isControleInicializado = false;
        }

        protected RemoverElementoControle(): void
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.remove();
            }
        }



        //#endregion
    }

    class BaseControleCamposPrivados
    {
        public readonly _eventos = new Array<UIEvento>();
        public readonly _eventosAmarrados = new Array<EventoControleHandler>();
        public readonly _binds = new Array<BaseBind>();
        public readonly _controlesFilho = new ListaObservacao<BaseControle>();
        public readonly _dicionarioControlesFilho = new DicionarioSimples<BaseControle, number>();
    }

    export interface IControleOcuparDesocuparElemento
    {
        OcuparElemento(): void
        DesocuparElemento(): void

    }

}