namespace Snebur.UI
{
    export class ComboBox<TItem = any> extends BaseComboBox<TItem> implements IControleLista
    {
        private _idElementoSeta: string;
        protected readonly IsPemitirLimparPadrao: boolean = true;
        public readonly BlocoMensagemValidacao: Bloco;

        //private readonly BlocoSeta: HTMLElement;
        public IDElementoSelecionado: string;

        public get ItemSelecionado(): TItem
        {
            return this.ControleItemSelecionado?.DataSource;
        }

        public set ItemSelecionado(value: TItem)
        {
            const itemSeleciodoAtual = this.ControleItemSelecionado?.DataSource;
            const isForcarValidacao = itemSeleciodoAtual != null &&
                itemSeleciodoAtual !== value;

            this.SelecionarItem(value, true);
            this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs<TItem>(value));
            this.AtualizarVisibilidadeControleItemSelecionado();
            if (value != null && !this.IsValido)
            {
                this.OcultarMensagemValidacao(true);
            }
            this.ValidarAsyncInterno(isForcarValidacao);
        }

        public override get Valor(): TItem
        {
            return this.ItemSelecionado;
        }
        public override  set Valor(value: TItem)
        {
            this.ItemSelecionado = value;
        }

        protected get IsItemSelecionado(): boolean
        {
            if (this.ControleItemSelecionado != null)
            {
                return u.ValidacaoUtil.IsDefinido(this.ControleItemSelecionado.DataSource);
            }
            return false;
        }

        public get ElementoSeta(): HTMLElement
        {
            return document.getElementById(this._idElementoSeta);
        }



        public IsPemitirLimpar: boolean;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoValorAlterado.AddHandler(this.ItemSelecionado_ValorAlterado, this);
        }

        protected override  HtmlCarregado(): void
        {
            super.HtmlCarregado();
            this._idElementoSeta = this.RetornarIDElementoItemElemento("BlocoSeta");
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();

            this.IsRotuloFlutuante = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsRotuloFlutuante, true));

            this.AdicionarEventoDom(ui.EnumEventoDom.MouseDown, this.ElementoCaixa_MouseDown, this.ElementoCaixa);

            this.CaixaSelecao.EventoFechou.AddHandler(this.CaixaSelecao_Fechou, this);

            if (!this.IsRotuloFlutuante)
            {
                this.Elemento.classList.add("sn-sem-rotulo-flutuante");
            }
            if (this.IsRotuloVazio)
            {
                this.Elemento.classList.add("sn-is-rotulo-vazio");
            }

            if (SistemaUtil.IsAndroidOrIOS)
            {
                this.CmbComboxNativo?.remove();
            }
            else
            {
                //this.AdicionarEventoDom(EnumEventoDom.Focus, this.CmbComboxNativo_Focus, this.CmbComboxNativo);
                //this.AdicionarEventoDom(EnumEventoDom.Blur, this.CmbComboxNativo_Blur, this.CmbComboxNativo);
                this.AdicionarEventoDom(EnumEventoDom.KeyDown, this.CmbComboxNativo_KeyDown, this.CmbComboxNativo);
            }
        }

        protected override InicializarControlesFilho(): void
        {
            this.IsPemitirLimpar = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.PermitirLimpar, this.IsPemitirLimparPadrao));

            super.InicializarControlesFilho();
            this.ControleItemSelecionado.InicializarControle();
            this.AtualizarVisibilidadeControleItemSelecionado();
        }

        protected override AtualizarRotulo(): void
        {
            this.AtualizarRotuloSelecionado();
        }

        public BtnCaixaListaItem_Click(provedor: ItemControle, e: UIEventArgs): void
        {
            const itemSelecionado = provedor.DataSource;
            this.ItemSelecionado = itemSelecionado;
            this.CmbComboxNativo.focus();
            this.CaixaSelecao.Fechar();
        }

        public override  ValorPropriedadeAlterado(paiPropriedade: d.BaseDominio, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any)
        {
            if (this.IsControleInicializado && !this.IsDispensado)
            {
                super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);

                if (Util.IsDiferente(this.ItemSelecionado, valorPropriedade))
                {
                    this.ItemSelecionado = valorPropriedade;
                }
            }
        }

        private ItemSelecionado_ValorAlterado(provedor: any, e: EventArgs)
        {
            this.AtualizarRotuloSelecionado();
        }

        private AtualizarRotuloSelecionado()
        {
            const rotuloSelecionado = this.RetornarValorAtributo(AtributosHtml.RotuloFlutuante);
            if (!String.IsNullOrEmpty(rotuloSelecionado))
            {
                const rotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo);
                const rotuloNormalizado = this.IsItemSelecionado ? rotuloSelecionado : rotulo;
                this.Rotulo = rotuloNormalizado;
            }
        }

        //#region Elementos dom eventos

        private ElementoCaixa_MouseDown(e: MouseEvent): void
        {
            if (e.IsBotaoEsquerdo)
            {
                e.stopPropagation();
                e.stopImmediatePropagation();

                if (this.CaixaSelecao.IsAberto)
                {
                    this.CaixaSelecao.Fechar(false);
                    if (!this.IsItemSelecionado)
                    {
                        this.Elemento.classList.remove(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
                    }
                }
                else
                {
                    this.CaixaSelecao.Mostrar(this.ItemSelecionado);
                    this.Elemento.classList.add(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
                    this.CmbComboxNativo.focus();
                }

            }
        }

        private CaixaSelecao_Fechou(): void
        {
            ElementoUtil.AtualizarValorInput(this.ElementoInput, String.Empty);
            this.AtualizarVisibilidadeControleItemSelecionado();
        }


        public ElementoInputOnBlur(): void
        {
            //ElementoUtil.AtualizarValorInput(this.IDElementoInput, String.Empty);
            //this.AtualizarVisibilidadeControleItemSelecionado();
        }

        public ElementoInputOnFocus(): void
        {
        }

        public ElementoInputOnKeyDown(): void
        {
            //this.ControleItemSelecionado.OcultarElemento();
        }

        protected override OcuparElementosFilho(): void
        {
            //não faz nada
        }

        protected override DesocuparElementosFilho(): void
        {
            //não faz nada
        }

        //#endregion

        //#region Métodos privados

        private SelecionarItem(item: any, isFechar: boolean): void
        {
            const valorPropriedade = (u.ValidacaoUtil.IsDefinido(item)) ? item : null;
            if (this.ControleItemSelecionado instanceof ComboBoxItemSelecionado)
            {
                this.ControleItemSelecionado.DataSource = valorPropriedade;
            }
            this.CaixaSelecao.SelecionarItem(item);

            if (isFechar)
            {
                this.CaixaSelecao.Fechar();
            }

            if (this.PaiPropriedade instanceof ObjetoControladorPropriedade)
            {
                u.ReflexaoUtil.AtribuirValorPropriedade(this.PaiPropriedade, this.NomePropriedade, valorPropriedade, true);
            }
            this.AtualizarVisibilidadeControleItemSelecionado();
        }

        protected AtualizarVisibilidadeControleItemSelecionado(): void
        {
            if (!this.IsDispensado)
            {
                if (this.IsItemSelecionado)
                {
                    ElementoUtil.AtualizarValorInput(this.ElementoInput, String.Empty);
                    this.ControleItemSelecionado.Visibilidade = EnumVisibilidade.Visivel;
                    if (this.IsPemitirLimpar)
                    {
                        this.ElementoSeta.OcultarElemento();
                    }
                    this.Elemento.classList.add(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
                }
                else
                {
                    this.ElementoSeta.MostrarElemento();
                    this.ControleItemSelecionado.Visibilidade = EnumVisibilidade.Invisivel;
                    this.Elemento.classList.remove(ComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
                }
            }
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
        }

        public override  Habilitar(): void
        {
            super.Habilitar();
        }


        //#endregion

        protected override ElementoInput_Focus(e: FocusEvent)
        {
            super.ElementoInput_Focus(e);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            if (this.IsControleInicializado)
            {
                this.CaixaSelecao.Mostrar(this.ItemSelecionado);
            }
        }

        protected override ElementoInput_Blur(e: FocusEvent)
        {
            super.ElementoInput_Blur(e);

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

        //private CmbComboxNativo_Focus(e: FocusEvent)
        //{
        //    e.preventDefault();
        //    e.stopPropagation();
        //    e.stopImmediatePropagation();

        //    if (this.IsControleInicializado)
        //    {
        //        this.CaixaSelecao.Mostrar(this.ItemSelecionado);
        //    }

        //    return false;
        //}

        //private CmbComboxNativo_Blur(e: FocusEvent)
        //{
        //    e.preventDefault();
        //    e.stopPropagation();
        //    e.stopImmediatePropagation();


        //}

        private CmbComboxNativo_KeyDown(e: KeyboardEvent)
        {
            if (KeyCodeUtil.IsKeyCodeEnter(e.keyCode) ||
                KeyCodeUtil.IsKeyCodeTab(e.keyCode))
            {
                this.CaixaSelecao.Fechar();
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const proximoIndice = this.RetornarProximoItem(e);
            if (typeof proximoIndice === "number")
            {
                const itemSelecionado = proximoIndice === -1 ? null :
                    this.CaixaSelecao.PainelLista.Lista[proximoIndice] as any;

                this.SelecionarItem(itemSelecionado, false);

                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs<TItem>(itemSelecionado));
                this.AtualizarVisibilidadeControleItemSelecionado();
                this.ValidarAsyncInterno();
            }
        }

        private RetornarProximoItem(e: KeyboardEvent): number | null
        {
            const lista = this.CaixaSelecao.PainelLista.Lista;
            if (Array.isArray(lista))
            {

                const indiceAtual = ValidacaoUtil.IsDefinido(this.ItemSelecionado) ?
                    lista.IndexOf(this.ItemSelecionado) :
                    -1;

                if (KeyCodeUtil.IsKeyCodeParaBaixo(e))
                {
                    let indice = indiceAtual + 1;
                    if (indice >= lista.length)
                    {
                        indice = this.IsPemitirLimpar ? -1 : 0;
                    }
                    return indice;
                }

                if (KeyCodeUtil.IsKeyCodeParaCima(e))
                {
                    let indice = indiceAtual - 1;
                    if (indice < 0)
                    {
                        indice = lista.length - 1;
                    }
                    return indice;
                }
            }
            return null;
        }

        public override VerificarValorPropriedadeAlterada()
        {
            const elementoSelecioando = this.ControleItemSelecionado.Elemento;
            if (elementoSelecioando != null)
            {
                const isPropriedadeAlterada = this.PaiPropriedade?.__PropriedadesAlteradas?.ContainsKey(this.NomePropriedade) ?? false;
                EstiloUtil.AtualizarCssClass(elementoSelecioando,
                    ConstantesCssClasses.CSS_CLASSE_PROPRIEDADE_ALTERADA,
                    isPropriedadeAlterada);
            }
        }

        //#region IDisposable 

        public override  Dispose(): void
        {
            super.Dispose();
        }
        //#endregion
    }



    //#region Elementos da apresentação - código gerado automaticamente #

    export interface ComboBox<TItem = any>
    {
        readonly CmbComboxNativo: HTMLSelectElement;
        readonly BlocoEspacoRotuloFlutuante: ui.Bloco;
        readonly ControleItemSelecionado: ui.ComboBoxItemSelecionado;
        readonly ElemenotLinhaHorizontal: HTMLDivElement;
        readonly BlocoMensagemValidacao: ui.Bloco;
    }

    //#endregion

}