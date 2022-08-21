namespace Snebur.UI
{
    export declare type ManipuladorEventoPropriedadeApresentacaoAlterada = (provedor: any, e: PropriedadeApresentacaoAlteradaEventArgs) => void;

    export abstract class ComponenteApresentacao extends BaseUIElemento implements IComponenteApresentacao
    {
        protected _eventoDesabilitarAlterado: Evento;
        private _nome: string;
        private _isDesabilitado: boolean = true;
        private _estiloItems: EstilosItens;
        protected __isBaseControle__ = false;

        public readonly ComponenteApresentacaoPai: ComponenteApresentacao;
        public readonly ComponentesApresentacaoFilhos: ListaObservacao<ComponenteApresentacao> = new ListaObservacao<ComponenteApresentacao>();
        public readonly DicionariosObjetosNomeados = new DicionarioSimples<ComponenteApresentacao | Element>();

        //#region Elementos interno

        public get ElementoApresentacao(): HTMLElement
        {
            return this.Elemento;
        }

        public get ElementoDimensao(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get ElementoMargem(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get ElementoMargemInterna(): HTMLElement
        {
            return this.ElementoApresentacao;
        }

        public get IsDesabilitado(): boolean
        {
            return this._isDesabilitado;
        }

        public set IsDesabilitado(value: boolean)
        {
            this._isDesabilitado = value;
            if (value)
            {
                this.Desabilitar();
            }
            else
            {
                this.Habilitar();
            }
        }

        public get innerHTML(): string
        {
            return this.ElementoApresentacao.innerHTML;
        }
        public set innerHTML(value: string)
        {
            this.ElementoApresentacao.innerHTML = value;
        }

        //#endregion

        public get Nome(): string
        {
            return this._nome;
        }
        public set Nome(value: string)
        {
            /*eslint-disable*/
            if (this._nome != null && this._nome != value)
            {
                throw new Erro(`O nome do controle já foi definido Nome atual ${this._nome}, novo nome ${value}`);
            }
            /*eslint-enable*/
            this._nome = value;
            this.NomeAlterado();
        }

        public get EstilosItens(): EstilosItens
        {
            return this._estiloItems;
        }


        //#region Propriedades de Apresentação Responsivas

        protected readonly MapeamentoPropriedadeApresentacao: MapeamentoPropriedadeApresentacao;
        private readonly DicionariosPropriedadesApresentacao: DicionarioSimples<IPropriedadeApresentacao>;
        private readonly EventoPropriedadeApresentacaoAlterada = new DicionarioSimples<List<ManipuladorEventoPropriedadeApresentacaoAlterada>>();

        public VisibilidadeApresentacao: EnumVisibilidade;

        public CorFundoApresentacao: EnumCor | string;
        public CorTextoApresentacao: EnumCor | string;
        public CorBordaApresentacao: EnumCor | string;
        public CorIconeApresentacao: EnumCor | string;

        public TonalidadeCorFundo: EnumTonalidade;
        public TonalidadeCorTexto: EnumTonalidade;
        public TonalidadeCorBorda: EnumTonalidade;
        public TonalidadeCorIcone: EnumTonalidade;

        //margem
        public Margem: MargemUnidadeComprimento;
        public MargemInterna: MargemUnidadeComprimento;
        public BordaApresentacao: MargemUnidadeComprimento;

        //dimensões
        public AlturaApresentacao: UnidadeComprimento;
        public AlturaMinimaApresentacao: UnidadeComprimento;
        public AlturaMaximaApresentacao: UnidadeComprimento;

        public LarguraApresentacao: UnidadeComprimento;
        public LarguraMinimaApresentacao: UnidadeComprimento;
        public LarguraMaximaApresentacao: UnidadeComprimento;

        public AlturaLinhaApresentacao: UnidadeComprimento;
        public AlinhamentoTexto: ui.EnumAlinhamentoTexto;

        //alinhamentos
        public AlinhamentoVertical: EnumAlinhamentoVertical;
        public AlinhamentoHorizontal: EnumAlinhamentoHorizontal;

        //barra de rolagem
        public BarraRolagem: EnumBarraRolagem;
        public BarraRolagemHorizontal: EnumBarraRolagem;
        public BarraRolagemVertical: EnumBarraRolagem;

        public Tipografia: EnumTipografia;
        public PesoFonte: EnumPesoFonte;
        public Fonte: EnumFonte;
        public Quebrar: EnumQuebrar;

        public get EventoDesabilitarAlterado(): Evento
        {
            return this._eventoDesabilitarAlterado ?? (this._eventoDesabilitarAlterado = new Evento(this));
        }
         
        //#endregion

        public constructor(controlePai: BaseControle, elemento: HTMLElement | string, componenteApresentacaoPai: ComponenteApresentacao);
        public constructor(controlePai: BaseControle, elemento: HTMLElement | string | undefined, componenteApresentacaoPai: ComponenteApresentacao)
        {
            super(controlePai, elemento);

            this.ComponenteApresentacaoPai = (componenteApresentacaoPai) ? componenteApresentacaoPai : this.ControlePai;
            this.MapeamentoPropriedadeApresentacao = this.RetornarMapeamento();
            this.DicionariosPropriedadesApresentacao = this.MapeamentoPropriedadeApresentacao.DicionarioPropriedades;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.DefinirElementoComponenteApresentacao();
            this.IniciazarAtributosEstiloItens();

            this.NomerComponente();

            this.ComponentesApresentacaoFilhos.AddRange(this.RetornarComponentesApresentacaoInterno());
            this.InicializarComponentesApresentacao();
            this.InicializarPropriedadesApresentacao();
            this.InivializarAtributoDesabilitar();
            this.DepoisInicializarComponentesApresentacao();
            this.AdicionarEventoPropriedadeApresentacaoAlterada(AtributosHtml.VisibilidadeApresentacao, this.VisibilidadeApresentacao_Alterada);
        }

        protected DepoisInicializarComponentesApresentacao()
        {
            //esse método poderá ser sobre escrito
        }

        //protected override RetornarDataSource(): any
        //{
        //    //TODO boolean is muito mais rápido do instanceof
        //    if (this.__isBaseControle__ === false)
        //    {
        //        return this.ComponenteApresentacaoPai.RetornarDataSource();
        //    }
        //    return super.RetornarDataSource();
        //}

        private VisibilidadeApresentacao_Alterada()
        {
            this.OnVibilidadeAlterada();
        }

        private DefinirElementoComponenteApresentacao(): void
        {
            if (this.Elemento.tagName.StartsWith(PREFIXO_TAG_ELEMENTO_APRESENTACAO))
            {
                this.Elemento.__ComponenteApresentacao = this;
            }
        }

        private NomerComponente(): void
        {
            const nome = this.RetornarNomeInterno(this.Elemento);
            if (!String.IsNullOrEmpty(nome))
            {
                this.ControlePai.AtribuirNomeObjeto(this, this.Elemento);
                this.Nome = nome;
            }
        }

        //#region Propriedade de apresentação 

        protected RetornarMapeamento(): MapeamentoPropriedadeApresentacao
        {
            return MapeamentoPropriedadeApresentacaoUtil.RetornarMapemento(this.GetType());
        }

        private DefinirPropriedadeApresentacao(nomePropriedade: string)
        {
            Object.defineProperty(this, nomePropriedade, {
                get: this.RetornarValorPropriedadeApresentacao.bind(this, nomePropriedade),
                set: this.AtribuirValorPropriedadeDependente.bind(this, nomePropriedade),
                enumerable: false,
                configurable: true,
            });
        }

        private RetornarValorPropriedadeApresentacao(nomePropriedade: string): any
        {
            if (!this.IsDispensado)
            {
                return this.DicionariosPropriedadesApresentacao.Item(nomePropriedade).RetornarValor(this);
            }
            return null;
        }

        private AtribuirValorPropriedadeDependente(nomePropriedade: string, novoValor: any): any
        {
            const valorAtual = this.RetornarValorPropriedadeApresentacao(nomePropriedade);
            /*eslint-disable*/
            if (valorAtual != novoValor)
            {
                this.DicionariosPropriedadesApresentacao.Item(nomePropriedade).AtribuirValor(this, novoValor);
                this.NotificarPropriedadeAlterada(nomePropriedade, valorAtual, novoValor);
                this.NotificarEventoPropriedadeApresentacaoAlterada(nomePropriedade, valorAtual, novoValor);
            }
            /*eslint-enable*/
        }

        protected InicializarPropriedadesApresentacao(): void
        {
            const propriedadesOrdenadas = this.MapeamentoPropriedadeApresentacao.PropriedadesOrdenadas;
            for (const propriedade of propriedadesOrdenadas)
            {
                this.DefinirPropriedadeApresentacao(propriedade.NomePropriedade);
            }
            this.AtualizarPropriedadesApresentacao();
        }

        protected AtualizarPropriedadesApresentacao(): void
        {
            const propriedadesOrdenadas = this.MapeamentoPropriedadeApresentacao.PropriedadesOrdenadas.Where(x => !x.IsRedundante);
            for (const propriedade of propriedadesOrdenadas)
            {
                try
                {
                    propriedade.Atualizar(this);
                }
                catch (ex)
                {
                    console.error(`erro ao atualizar a propriedade  ${propriedade.NomePropriedade} ${ex}`);

                }
            }
        }

        private NotificarEventoPropriedadeApresentacaoAlterada(nomePropriedade: string, valorAntigo: any, novoValor: any): void
        {
            const args = new PropriedadeApresentacaoAlteradaEventArgs(this, nomePropriedade, valorAntigo, novoValor);
            if (this.EventoPropriedadeApresentacaoAlterada.ContainsKey(nomePropriedade))
            {
                const manipuladores = this.EventoPropriedadeApresentacaoAlterada.Item(nomePropriedade);
                if (manipuladores)
                {
                    for (const manipulador of manipuladores)
                    {
                        manipulador(this, args);
                    }
                }
            }
        }

        public AdicionarEventoPropriedadeApresentacaoAlterada(atributoPropriedadeApresentacao: AtributoHtml, manipulador: (provedor: any, e: PropriedadeApresentacaoAlteradaEventArgs) => void): void
        {
            if (!this.EventoPropriedadeApresentacaoAlterada.ContainsKey(atributoPropriedadeApresentacao.Nome))
            {
                this.EventoPropriedadeApresentacaoAlterada.Add(atributoPropriedadeApresentacao.Nome, new List<ManipuladorEventoPropriedadeApresentacaoAlterada>());
            }
            this.EventoPropriedadeApresentacaoAlterada.Item(atributoPropriedadeApresentacao.Nome).Add(manipulador);
        }

        //#endregion

        public AtualizarAparencia(): void
        {
            if (!this.IsDispensado)
            {
                this.AtualizarPropriedadesApresentacao();

                for (const componenteApresentacao of this.ComponentesApresentacaoFilhos)
                {
                    componenteApresentacao.AtualizarAparencia();
                }
            }
        }

        //#region ElementosApresetancao 

        protected RetornarComponentesApresentacaoInterno(): Array<ComponenteApresentacao>
        {
            const componentesApresentacao = new Array<ComponenteApresentacao>();
            const elementosHtmlApresentacao = ComponenteApresentacaoUtil.RetornarElementosHtmlApresentacao(this.Elemento, false);
            const controlePai = this.RetornarControlePaiInterno();

            const len = elementosHtmlApresentacao.length;
            for (let i = 0; i < len; i++)
            {
                const elementoFilho = elementosHtmlApresentacao[i];
                //let nomeConstrutor =  elementoFilho.tagName.substring(PREFIXO_TAG_CONTROLE.length);
                const construtor = this.RetornarConstrutorComponenteApresentacao(elementoFilho);
                const componenteApresentacao = new construtor(controlePai, elementoFilho, this);

                if (!(componenteApresentacao instanceof ComponenteApresentacao))
                {
                    throw new Erro("O controle filho é invalido", this);
                }
                componentesApresentacao.Add(componenteApresentacao);
                this.AtribuirNomeObjeto(componenteApresentacao, elementoFilho);

            }
            return componentesApresentacao;
        }

        protected RetornarConstrutorComponenteApresentacao(elemento: HTMLElement): IComponenteApresentacaoConstrutor
        {
            const tagName = elemento.tagName;
            if ($ComponentesApresentacao.ContainsKey(tagName))
            {
                const construtor = $ComponentesApresentacao.Item(tagName).Construtor;
                return construtor;
            }
            throw new ErroNaoSuportado(`A tag não é suportada ${tagName} em ${this.ControleApresentacao.___NomeConstrutor}`);
        }

        protected InicializarComponentesApresentacao(): void
        {
            this.DefinirEstilosItens();

            for (const componenteApresentacao of this.ComponentesApresentacaoFilhos)
            {
                componenteApresentacao.Inicializar();
            }
        }

        //#region Estilos itens

        private __AtributosZSAutorizados: any = {
            "sn-tipo-botao": true
        };

        private DefinirEstilosItens(): void
        {
            const estilosItens = this.ComponentesApresentacaoFilhos.OfType(EstilosItens).ToList();
            if (estilosItens.Count > 1)
            {
                throw new Erro(`Existe mais de um estilos itens para o componente ${this.___NomeConstrutor} no em ${this.ControleApresentacao.___NomeConstrutor}`);
            }
            if (estilosItens.Count === 1)
            {
                this._estiloItems = estilosItens.Single();
                this._estiloItems.Elemento.remove();
            }
        }

        private IniciazarAtributosEstiloItens()
        {
            if (this instanceof EstilosItens)
            {
                return;
            }
            const estilosItens = this.RetornarEstilosItensPai();
            if (estilosItens instanceof EstilosItens)
            {
                const elementoOrigem = estilosItens.Elemento;
                const elementoDestino = this.Elemento;

                const atributos = Util.CopiarArray(estilosItens.Elemento.attributes);
                for (const atributo of atributos)
                {
                    if (atributo.name.StartsWith(PREFIXO_ATRIBUTO_APRESENTACAO) || this.__AtributosZSAutorizados[atributo.name])
                    {
                        elementoDestino.setAttribute(atributo.name, elementoOrigem.getAttribute(atributo.name));
                    }
                }
            }
        }

        private RetornarEstilosItensPai(): EstilosItens
        {
            if (this instanceof BaseControle)
            {
                let elemenotPai = this.Elemento.parentElement;
                while (elemenotPai instanceof HTMLElement)
                {
                    if (elemenotPai.__ComponenteApresentacao instanceof ComponenteApresentacao)
                    {
                        return elemenotPai.__ComponenteApresentacao.EstilosItens;
                    }
                    elemenotPai = elemenotPai.parentElement;
                }
            }
            return this.ComponenteApresentacaoPai?.EstilosItens;
        }

        //#endregion

        private DispensarElementosApresetancao(): void
        {
            for (const componenteApresentacao of this.ComponentesApresentacaoFilhos)
            {
                componenteApresentacao.Dispose();
            }
            this.ComponentesApresentacaoFilhos.Clear();
        }

        //#endregion

        //#region Habilitar desabilitar 

        public Habilitar(): void
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.classList.remove(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
                ElementoUtil.HabilitarElemento(this.Elemento);
            }
            this._isDesabilitado = false;
            this._eventoDesabilitarAlterado?.Notificar(this, EventArgs.Empty);
        }

        public Desabilitar(): void
        {

            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.classList.add(ConstantesCssClasses.CSS_CLASSE_DESABILITADO);
                ElementoUtil.DesabilitarElemento(this.Elemento, false);
            }
            this._isDesabilitado = true;
            this._eventoDesabilitarAlterado?.Notificar(this, EventArgs.Empty);
        }

        private InivializarAtributoDesabilitar(): void
        {
            //atributo habilitar
            const valorAtributoHabilidar = this.RetornarValorAtributo(AtributosHtml.Desabilitar, false);
            if (!BindUtil.IsCaminhoBind(valorAtributoHabilidar))
            {
                this._isDesabilitado = u.ConverterUtil.ParaBoolean(valorAtributoHabilidar);
                if (this._isDesabilitado)
                {
                    this.Desabilitar();
                }
            }
        }

        //#endregion

        //#region Nomear elementos

        protected AtribuirNomeObjeto(objeto: ComponenteApresentacao | Element, elemento: Element)
        {
            const nome = this.RetornarNomeInterno(elemento);
            if (!String.IsNullOrEmpty(nome))
            {
                if (this.DicionariosObjetosNomeados.ContainsKey(nome))
                {
                    const itemJaNomeado = this.DicionariosObjetosNomeados.Item(nome);
                    if (this.IsObjetoNomeadoDiferente(objeto, itemJaNomeado))
                    {
                        throw new Error(`O nome ${nome} do objeto deve ser único no escopo da apresentação`);
                    }

                    if (itemJaNomeado instanceof HTMLElement && objeto instanceof BaseUIElemento)
                    {
                        if ($Configuracao.IsDebug)
                        {
                            throw new Error(`Item ja nomerado, isso pode acontecer, porem deve ser evitado ${nome}`);
                        }
                        //substituir nome
                        this.DicionariosObjetosNomeados.AtribuirItem(nome, objeto);
                    }
                }
                else
                {
                    if (objeto instanceof ComponenteApresentacao)
                    {
                        objeto.Nome = nome;
                    }
                    (this as any)[nome] = objeto;
                    this.DicionariosObjetosNomeados.Add(nome, objeto);
                }
            }
        }

        private IsObjetoNomeadoDiferente(objeto: any, itemJaNomeado: any): boolean
        {
            const elementoObjeto = this.RetornarElementoObjeto(objeto);
            const elementoObjetoJaNomeado = this.RetornarElementoObjeto(objeto);
            return elementoObjeto !== elementoObjetoJaNomeado;
        }

        private RetornarElementoObjeto(objeto: any): HTMLElement
        {
            if (objeto instanceof HTMLElement)
            {
                return objeto;
            }
            if (objeto instanceof BaseUIElemento)
            {
                return objeto.Elemento;
            }

            throw new Error("Não foi possível encontrar o elemento do objeto");

        }

        protected RetornarNomeInterno(elemento: Element): string
        {
            if (!$Configuracao.IsDebug)
            {
                const nome = ElementoUtil.RetornarValorAtributo(elemento, "sn-nome-elemento");
                if (!String.IsNullOrEmpty(nome))
                {
                    throw new Error(`O atributo '"sn-nome-elemento"' está obsoleto utilizar ${AtributosHtml.Nome}`);
                }
            }

            return ElementoUtil.RetornarValorAtributo(elemento, AtributosHtml.Nome);
        }

        private RetornarControlePaiInterno(): BaseControle
        {
            if (this instanceof BaseControle)
            {
                return this;
            }
            return this.ControlePai;
        }


        private DispensarObjetosNomeados()
        {
            for (const chave of this.DicionariosObjetosNomeados.Chaves)
            {
                delete (this as any)[chave];
            }
            this.DicionariosObjetosNomeados.Clear();
        }

        //#endregion

        public Focus(): void
        {
            this.Elemento?.focus();
        }

        public Desfocar(): void
        {
            this.Elemento?.blur();
        }


        //#region Debug e

        protected NomeAlterado(): void
        {

        }

        //#endregion

        public override toString(): string
        {
            return super.toString() + ConverterUtil.ParaString(this.Nome);
        }

        //#region IDisposable

        protected ReInicializar(): void
        {
            this.DispensarObjetosNomeados();
            this.DispensarElementosApresetancao();
            this.DispensarAtributosElementoRaiz();
        }

        public override Dispose(): void
        {
            this.DispensarObjetosNomeados();
            this.DispensarElementosApresetancao();

            super.Dispose();
        }

        //#endregion
    }

}
