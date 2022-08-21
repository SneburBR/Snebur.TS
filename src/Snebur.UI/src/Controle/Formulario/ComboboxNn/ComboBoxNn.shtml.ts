namespace Snebur.UI
{
    export class ComboBoxNn<TItem = any> extends Snebur.UI.BaseComboBox<TItem> implements IControleLista, IControleItensSelecionado
    {

        public readonly BlocoMensagemValidacao: ui.Bloco;

        public get ItensSelecionado(): ListaObservacao<d.Entidade>
        {
            return this.ControleItensSelecionado.ControleLista.Lista as ListaObservacao<d.Entidade>;
        }

        public set ItensSelecionado(value: ListaObservacao<d.Entidade>)
        {
            this.ControleItensSelecionado.ControleLista.Lista = value;
            this.RemoverItensSelecinoado();
            this.AtualizarVisibilidadeControleItensSelecionado();
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();

            this.IsRotuloFlutuante = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsRotuloFlutuante, true));
            this.AdicionarEventoDom(ui.EnumEventoDom.MouseDown, this.Elemento_MouseDown, this.Elemento);
            this.CaixaSelecao.EventoFechou.AddHandler(this.CaixaSelecao_Fechou, this);

            if (!this.IsRotuloFlutuante)
            {
                this.Elemento.classList.add("sn-sem-rotulo-flutuante");
            }
        }

        protected override InicializarControlesFilho(): void
        {
            super.InicializarControlesFilho();

            this.ControleItensSelecionado.ItemTemplateSelecionado = this.ItemTemplateSelecionado;
            this.ControleItensSelecionado.InicializarControle();
            this.AtualizarVisibilidadeControleItensSelecionado();
        }

        protected override RetornarLista(entidades: ListaEntidades<d.Entidade>): ListaObservacao<any>
        {
            if (this.ItensSelecionado.Count > 0)
            {
                const len = this.ItensSelecionado.Count;
                for (let i = 0; i < len; i++)
                {
                    const itemSelecionado = this.ItensSelecionado[i];
                    if (entidades.Contains(itemSelecionado))
                    {
                        entidades.Remove(itemSelecionado);
                    }
                }
            }
            return entidades as ListaObservacao<any>;
        }

        public BtnCaixaListaItem_Click(provedor: ItemControle, e: UIEventArgs): void
        {
            const itemSelecionado = provedor.DataSource;
            if (!this.ItensSelecionado.Contains(itemSelecionado))
            {
                this.ItensSelecionado.Add(itemSelecionado);
            }
            this.Lista.Remove(itemSelecionado);
            this.AtualizarVisibilidadeControleItensSelecionado();
            this.CaixaSelecao.OcultarElemento();
        }

        public RemoverItem(item: any): void
        {
            if (this.ItensSelecionado.Contains(item))
            {
                this.ItensSelecionado.Remove(item);
                if (!this.Lista.Contains(item))
                {
                    this.Lista.Insert(0, item);
                }
            }
        }

        public override  ValorPropriedadeAlterado(paiPropriedade: d.BaseDominio, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any): void
        {
            super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);
            if ((valorPropriedade instanceof Array) && ListaUtil.IsListaObservacao( valorPropriedade))
            {
                if (this.ItensSelecionado instanceof ListaObservacao)
                {
                    this.ItensSelecionado.EventoItemAdicionado.Dispose();
                    this.ItensSelecionado.EventoItemRemovido.Dispose();
                    this.ItensSelecionado.EventoItemInserido.Dispose();
                }
                this.ItensSelecionado = valorPropriedade as ListaObservacao<d.Entidade>;

                this.ItensSelecionado.EventoItemAdicionado.AddHandler(this.ListaModificada, this);
                this.ItensSelecionado.EventoItemRemovido.AddHandler(this.ListaModificada, this);
                this.ItensSelecionado.EventoItemInserido.AddHandler(this.ListaModificada, this);
            }
        }

        private ListaModificada(e: ItemEventArgs<d.Entidade>)
        {
            this.AutoSalvarAsync();
        }

        //#region Eventos dom

        protected Elemento_MouseDown(e: MouseEvent): void
        {
            if (e.IsBotaoEsquerdo)
            {
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.CaixaSelecao.Mostrar(this.ItensSelecionado?.FirstOrDefault());
                this.Elemento.classList.add(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
            }
        }

        private CaixaSelecao_Fechou(): void
        {
            ElementoUtil.AtualizarValorInput(this.ElementoInput, String.Empty);
            this.AtualizarVisibilidadeControleItensSelecionado();

        }

        public ElementoInputOnBlur(): void
        {
            //ElementoUtil.AtualizarValorInput(this.IDElementoInput, String.Empty);
            //this.AtualizarVisibilidadeControleItensSelecionado();
        }

        public ElementoInputOnFocus(): void
        {
            //this.CaixaSelecao.PainelLista.Pesquisa = this.UltimaPesquisa;
            //this.CaixaSelecao.PainelLista.AtualizarListaConsultaAsync();
        }

        public ElementoInputOnKeyDown(): void
        {

        }

        //#endregion

        private AtualizarVisibilidadeControleItensSelecionado(): void
        {
            if (u.ValidacaoUtil.IsArray(this.ControleItensSelecionado.ControleLista.Lista) &&
                this.ControleItensSelecionado.ControleLista.Lista.length > 0)
            {
                ElementoUtil.AtualizarValorInput(this.ElementoInput, String.Empty);
                this.ControleItensSelecionado.Visibilidade = EnumVisibilidade.Visivel;
                //this.BlocoSeta.OcultarElemento();
                this.Elemento.classList.add(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
            }
            else
            {
                //this.BlocoSeta.MostrarElemento();
                this.ControleItensSelecionado.Visibilidade = EnumVisibilidade.Invisivel;
                this.Elemento.classList.remove(BaseComboBox.CSS_CLASSE_ROTULO_FLUTUANTE);
            }

            //if (this.ItensSelecionado.Count > 0)
            //{
            //    EstiloUtil.AdicionarCssClasse(this.IDElementoCaixa, "is-dirty", true);
            //    ElementoUtil.AtualizarValorInput(this.IDElementoInput, String.Empty);
            //    this.UltimaPesquisa = String.Empty;
            //    this.ControleItensSelecionado.MostrarElemento();
            //}
            //else
            //{
            //    EstiloUtil.RemoverCssClasse(this.IDElementoCaixa, "is-dirty");
            //    this.ControleItensSelecionado.OcultarElemento();
            //}
        }

        private RemoverItensSelecinoado(): void
        {
            if (this.ItensSelecionado.Count > 0 && this.CaixaSelecao.PainelLista.Lista instanceof Array)
            {
                const len = this.ItensSelecionado.Count;
                for (let i = 0; i < len; i++)
                {
                    const itemSelecionado = this.ItensSelecionado[i];
                    if (this.CaixaSelecao.PainelLista.Lista.Contains(itemSelecionado))
                    {
                        this.CaixaSelecao.PainelLista.Lista.Remove(itemSelecionado);
                    }
                }
            }
        }
    }

	//#region Elementos da apresenta��o - c�digo gerado automaticamente #

	export interface ComboBoxNn<TItem = any>
	{
		readonly BlocoItensTemplate: ui.Bloco;
		readonly ControleItensSelecionado: ui.ComboBoxNnItensSelecionado;
		readonly BlocoMensagemValidacao: ui.Bloco;
	}

	//#endregion

}