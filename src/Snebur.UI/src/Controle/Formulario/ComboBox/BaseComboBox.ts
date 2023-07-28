namespace Snebur.UI
{
    export abstract class BaseComboBox<TItem = any> extends Snebur.UI.BaseControleFormulario<TItem, HTMLSelectElement> implements IControleLista
    {
        protected static CSS_CLASSE_ROTULO_FLUTUANTE: string = "rotulo-flutuante";

        private _blocooTemplatePadrao: BlocoTemplate;
        private _itemTemplateSelecionado: ItemTemplateSelecionado;

        //#region Propriedades 

        public readonly BlocosTemplate = new DicionarioSimples<BlocoTemplate>();

        public CaixaSelecao: CaixaSelecao;

        public TipoItemLista: r.BaseTipo;
        protected UltimaPesquisa: string;

        private __FuncaoRetornarConsulta: FuncaoConsulta;
        private __FuncaoRetornarConsultaAsync: FuncaoConsultaAsync;
        private __FuncaoNormalizar: FuncaoConsultaAsync;

        private ExisteBindLista: boolean;

        protected IsRotuloFlutuante: boolean;

        public get BlocoTemplatePadrao(): BlocoTemplate  
        {
            return this._blocooTemplatePadrao;
        }
        public get ItemTemplateSelecionado(): ItemTemplateSelecionado 
        {
            return this._itemTemplateSelecionado;
        }

        public get Lista(): ListaObservacao<any>
        {
            return this.CaixaSelecao.PainelLista.Lista;
        }

        public set Lista(value: ListaObservacao<any>)
        {
            if ((this.CaixaSelecao instanceof CaixaSelecao) && this.CaixaSelecao.IsControleInicializado)
            {
                this.CaixaSelecao.PainelLista.Lista = value;
            }
            else
            {
                //if (value instanceof Array)
                //{
                //    throw new ErroOperacaoInvalida("A caixa seleção não foi definida", this);
                //}
            }
        }

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            //this.__ElementoInput_Focus = this.ElementoInput_Focus.bind(this);
            this.IsAdicionarElementoConteudoApresentacao = true;
            this.IsRotuloHtmlInterno = false;
        }

        protected override Inicializar()
        {
            super.Inicializar();
        }

        protected override RetornarHtmlInterno(): string
        {
            return super.RetornarHtmlInterno() + this.HtmlInternoInicial;
        }

        protected HtmlElementoApresentacaoCarregado22(): void
        {
            const elementoApresentacao = this.Elemento.getElementsByTagName(ComponenteApresentacaoConteudo.TAG_ELEMENTO_CONTEUDO_APRESENTACAO)[0];
            if (!(elementoApresentacao instanceof HTMLElement))
            {
                throw new Erro("O elemento apresentacao não foi encontrado");
            }
            elementoApresentacao.innerHTML = this.HtmlInternoInicial;
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            return super.NormalizarHtmlInterno(htmlInterno);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.ExisteBindLista = !String.IsNullOrWhiteSpace(this.RetornarValorAtributo(AtributosHtml.BindLista));
            this.TipoItemLista = this.RetornarTipoItemLista();

            const consulta = this.RetornarValorAtributo(AtributosHtml.Consulta);
            if (!String.IsNullOrWhiteSpace(consulta))
            {
                this.__FuncaoRetornarConsulta = this.RetornarMetodo(consulta) as FuncaoConsulta;
            }

            const consultaAsync = this.RetornarValorAtributo(AtributosHtml.ConsultaAsync);
            if (!String.IsNullOrWhiteSpace(consultaAsync))
            {
                this.__FuncaoRetornarConsultaAsync = this.RetornarMetodo(consultaAsync) as FuncaoConsultaAsync;
            }
            const normalizar = this.RetornarValorAtributo(AtributosHtml.Normalizar);
            if (!String.IsNullOrWhiteSpace(normalizar))
            {
                this.__FuncaoNormalizar = this.RetornarMetodo(normalizar) as FuncaoNormalizar;
            }


            if (u.ValidacaoUtil.IsFunction(this.__FuncaoRetornarConsulta) || (this.TipoItemLista instanceof r.TipoEntidade))
            {
                //ElementoUtil.AdicionarAtributo(this.IDElementoInput, AtributosHtml.TextoPesquisa, "ElementoInput_TextoPesquisa");
            }
            else
            {
                ElementoUtil.InputSomenteLeitura(this.ElementoInput, true);
            }
        }

        protected override InicializarControlesFilho(): void
        {
            this.InicializarBlocosTemplate();
            //não faz nada
            //this.ItemTemplate = this.ControlesFilho.OfType<ItemTemplate>(ItemTemplate).ToList();
            //if (!(this.ItemTemplate instanceof ItemTemplate))
            //{
            //    throw new Erro("O o elemento sn-item-template não foi encontrado ", this);
            //}
            //this.ItemTemplate.InicializarControle();
            //this.ControlesFilho.Remove(this.ItemTemplate);
            //ElementoUtil.RemoverElemento(this.Elemento, this.ItemTemplate.Elemento);

            this.AdicionarCaixaSelecao();
            this.AdicionarEventosDom();
        }

        private InicializarBlocosTemplate(): void
        {
            this.BlocosTemplate.Clear();
            this.PopularBlocosTemplate();

            this._blocooTemplatePadrao = this.BlocosTemplate.TryItem(BlocoTemplate.CHAVE_PADRAO);

            if (!(this.BlocoTemplatePadrao instanceof BlocoTemplate))
            {
                throw new Error(`O bloco item template do ${this.___NomeConstrutor} não está definido em  ${this.ControleApresentacao.___NomeConstrutor}`);
            }

            this._itemTemplateSelecionado = this.RetornarItemTemplateSelecionado();

            if (!(this.ItemTemplateSelecionado instanceof ItemTemplateSelecionado))
            {
                const elementoClone = ElementoUtil.ClonarElemento(this.BlocoTemplatePadrao.Elemento);
                this._itemTemplateSelecionado = new ItemTemplateSelecionado(this, elementoClone);
            }

            this.ItemTemplateSelecionado.InicializarControle();
            this.ControlesFilho.Remove(this.ItemTemplateSelecionado);
            this.ItemTemplateSelecionado.Elemento.remove();

            for (const blocoTemplate of this.BlocosTemplate.ToArray())
            {
                blocoTemplate.InicializarControle();
                blocoTemplate.Atributos.Add(new ParChaveValorSimples(AtributosHtml.Click.Nome, "BtnCaixaListaItem_Click"));
            }
        }

        private RetornarItemTemplateSelecionado(): ItemTemplateSelecionado  
        {
            const itemTemplateSelecionado = this.ControlesFilho.OfType(ItemTemplateSelecionado).FirstOrDefault();
            if (itemTemplateSelecionado != null)
            {
                return itemTemplateSelecionado;
            }
            const blocoTemplateSelecinado = this.ControlesFilho.OfType(BlocoTemplateSelecionado).FirstOrDefault();
            if (blocoTemplateSelecinado != null)
            {
                const elementoClone = ElementoUtil.ClonarElemento(blocoTemplateSelecinado.Elemento);
                return new ItemTemplateSelecionado(this, elementoClone);
            }
            return null;

        }

        private PopularBlocosTemplate(): void
        {
            const itensOuBlocoTemplates = new List<BlocoTemplate | ItemTemplate>();
            itensOuBlocoTemplates.AddRange(this.ControlesFilho.OfType(ItemTemplate));
            itensOuBlocoTemplates.AddRange(this.ControlesFilho.OfType(BlocoTemplate));

            for (const itemTemplate of itensOuBlocoTemplates)
            {
                this.ControlesFilho.Remove(itemTemplate);
                itemTemplate.Elemento.remove();

                const blocoTemplate = this.RetornarBlocoTemplate(itemTemplate);
                if (this.BlocosTemplate.ContainsKey(blocoTemplate.Chave))
                {
                    throw new Erro(`Já existe bloco template ${blocoTemplate.Chave}`);
                }
                this.BlocosTemplate.Add(blocoTemplate.Chave, blocoTemplate);
            }
        }

        private RetornarBlocoTemplate(itemTemplate: ItemTemplate | BlocoTemplate): BlocoTemplate
        {
            if (itemTemplate instanceof BlocoTemplate)
            {
                return itemTemplate;
            }
            const elementoClone = ElementoUtil.ClonarElemento(itemTemplate.Elemento);
            return new BlocoTemplate(this, elementoClone);
        }



        //#endregion

        //#region Pesquisa

        private ElementoInput_TextoPesquisa(provedor: any, e: TextoPesquisaEventArgs): void
        {
            if (this.IsControleInicializado)
            {
                if (e.Pesquisa !== this.UltimaPesquisa)
                {
                    this.UltimaPesquisa = e.Pesquisa;
                    this.CaixaSelecao.PainelLista.Pesquisa = e.Pesquisa;
                    this.CaixaSelecao.PainelLista.Lista.Clear();
                    this.CaixaSelecao.PainelLista.AtualizarListaConsultaAsync();
                    //var consulta = this.__FuncaoRetornarConsulta(e.Pesquisa);
                    //var estruturaConsulta = consulta.RetornarEstruturaConsulta();
                    //if (!(estruturaConsulta.Take > 0))
                    //{
                    //    estruturaConsulta.Take = 100;
                    //}
                    //consulta.ToListAsync(this.ResultadoConsulta.bind(this));
                }
            }
        }

        private ResultadoConsulta(entidades: ListaEntidades<d.Entidade>): void
        {
            //this.CaixaSelecao.Lista = this.RetornarLista(entidades);
        }

        protected RetornarLista(entidades: ListaEntidades<d.Entidade>): ListaObservacao<any>
        {
            return entidades as ListaObservacao<any>;
        }
        //#endregion

        //#region Métodos 

        public abstract BtnCaixaListaItem_Click(provedor: ItemControle, e: UIEventArgs): void;

        public abstract ElementoInputOnFocus(): void;

        public abstract ElementoInputOnBlur(): void;

        public abstract ElementoInputOnKeyDown(): void;

        //#endregion

        //#region Eventos Dom

        protected override ElementoInput_Focus(e: FocusEvent): void
        {
            super.ElementoInput_Focus(e);
            this.ElementoInputOnFocus();
        }

        protected override ElementoInput_Blur(e: FocusEvent): void
        {
            if (this.CaixaSelecao.IsAberto)
            {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return;
            }

            super.ElementoInput_Blur(e);
            this.ElementoInputOnBlur();
        }

        private ElementoInput_KeyDown(e: KeyboardEvent): void
        {
            this.ElementoInputOnKeyDown();
        }

        private AdicionarEventosDom(): void
        {
            const elementoInput = ElementoUtil.RetornarElemento(this.ElementoInput, true);
            if (elementoInput instanceof HTMLElement)
            {
                /*this.AdicionarEventoDom(ui.EnumEventoDom.Blur, this.ElementoInputInterno_Blur);*/
                this.AdicionarEventoDom(ui.EnumEventoDom.KeyDown, this.ElementoInput_KeyDown);
                //elementoInput.addEventListener("blur", this.__ElementoInput_Blur);
                //elementoInput.addEventListener("keydown", this.__ElementoInput_KeyDown);
            }
        }

        //private RemoverEventosDom(): void
        //{
        //    let elementoInput = ElementoUtil.RetornarElemento(this.IDElementoInput, true);
        //    if (elementoInput instanceof HTMLElement)
        //    {
        //        elementoInput.removeEventListener("blur", this.__ElementoInput_Blur);
        //        elementoInput.removeEventListener("keydown", this.__ElementoInput_KeyDown);
        //    }
        //}
        //#endregion

        //#region Métodos privados

        private AdicionarCaixaSelecao(): void
        {
            const idElementoCaixaSelecao = ElementoUtil.RetornarNovoIDElemento(this, "CaixaSelecao");

            const larguraItem = this.RetornarValorAtributoNumber(AtributosHtml.LarguraItem, null, false);
            const destinoControleFlutuante = this.RetornarValorAtributoEnum(EnumDestinoControleFlutuante,
                AtributosHtml.DestinoControleFlutuante, null, false);

            this.CaixaSelecao = new CaixaSelecao(this, idElementoCaixaSelecao);
            if (larguraItem > 0)
            {
                this.CaixaSelecao.LarguraInicial = larguraItem;
            }

            if (u.EnumUtil.IsDefindo(EnumDestinoControleFlutuante, destinoControleFlutuante))
            {
                this.CaixaSelecao.DestinoControleFlutuante = destinoControleFlutuante;
            }


            this.ControlesFilho.Add(this.CaixaSelecao);
            this.CaixaSelecao.InicializarControle();
            //this.ItemTemplate.CssClasse = this.ItemTemplate.CssClasse + " sn-combobox-item";
            //this.ItemTemplate.Atributos.Add(new ParChaveValorSimples("sn-click", "BtnCaixaListaItem_Click"));

            this.CaixaSelecao.PainelLista.BlocoTemplatePadrao = this.BlocoTemplatePadrao;

            for (const chave of this.BlocosTemplate.Chaves)
            {
                const blocoTemplate = this.BlocosTemplate.Item(chave);
                this.CaixaSelecao.PainelLista.BlocosTemplate.Add(chave, blocoTemplate);
            }

            this.CaixaSelecao.PainelLista.TipoItemLista = this.TipoItemLista;
            this.CaixaSelecao.PainelLista.IsConsultarTipoAutomaticamente = true;

            if (u.ValidacaoUtil.IsFunction(this.__FuncaoRetornarConsulta))
            {
                this.CaixaSelecao.PainelLista.__FuncaoRetornarConsulta = this.__FuncaoRetornarConsulta;
            }

            if (u.ValidacaoUtil.IsFunction(this.__FuncaoRetornarConsultaAsync))
            {
                this.CaixaSelecao.PainelLista.__FuncaoRetornarConsultaAsync = this.__FuncaoRetornarConsultaAsync;
            }

            if (u.ValidacaoUtil.IsFunction(this.__FuncaoNormalizar))
            {
                this.CaixaSelecao.PainelLista.__FuncaoNormalizar = this.__FuncaoNormalizar;
            }
            this.CaixaSelecao.PainelLista.AtualizarListaConsultaAsync();
        }

        private RetornarTipoItemLista(): r.BaseTipo
        {
            const caminhoTipo = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                if ($Reflexao.Tipos.ContainsKey(caminhoTipo))
                {
                    return $Reflexao.Tipos.Item(caminhoTipo);
                }
                const objetoOuConstrutor: any = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(caminhoTipo);
                if (objetoOuConstrutor instanceof r.BaseTipo)
                {
                    return objetoOuConstrutor;
                }
                if (objetoOuConstrutor.GetType() instanceof r.BaseTipo)
                {
                    return objetoOuConstrutor.GetType();
                }
                throw new Erro("Não foi encontrado o tipo {0} ", caminhoTipo);
            }
            return null;
        }

        //#endregion

        //#region Ocultar e Mostrar elemento

        public override OcultarElemento()
        {
            super.OcultarElemento();
            this.CaixaSelecao?.Fechar(false);
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            super.Dispose();
        }
        //#endregion
    }
}