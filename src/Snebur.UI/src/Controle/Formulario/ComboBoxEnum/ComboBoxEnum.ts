namespace Snebur.UI
{
    export class ComboBoxEnum<TItem = any> extends ComboBox<TItem>
    {
        private IsListaEnumPreenchida: boolean;
        private CaminhoTipoEnum: string;
        private ConstrutorEnum: object;

        protected override readonly IsPemitirLimparPadrao = false;

        protected override get IsItemSelecionado(): boolean
        {
            const valor = this.ControleItemSelecionado.DataSource;
            return EnumUtil.IsDefindo(this.ConstrutorEnum, valor);
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoCarregado.AddHandler(this.ComboBoxEnum_Carregado, this);
        }

        protected override RetornarHtmlInterno(): string
        {
            const htmlInterno = super.RetornarHtmlInterno();
            const tipo = ComboBox.GetType() as r.TipoUIHtml;
            const htmlComboboBox = HtmlReferenciaUtil.RetornarHtml(tipo);
            return htmlComboboBox + "\n" + htmlInterno;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override RetornarItemTemplateSelecionado(): ItemTemplateSelecionado
        {
            return super.RetornarItemTemplateSelecionado();
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.CaminhoTipoEnum = this.RetornarValorAtributo(AtributosHtml.Tipo);
            if (String.IsNullOrWhiteSpace(this.CaminhoTipoEnum))
            {
                throw new ErroNaoDefinido(`O atributo ${AtributosHtml.Tipo.Nome} não foi definido no ${this.GetType().Nome} em ${this.ControleApresentacao.___NomeConstrutor}`, this);
            }
            this.ConstrutorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(this.CaminhoTipoEnum);

            const elementoSpanItemSelecionado = this.RetornarItemElemento("SpanItemSelecionado", false, function () { return true; });
            const elementoSpanItemTemplate = this.RetornarItemElemento("SpanItemTemplate", false, function () { return true;});

            ElementoUtil.AdicionarAtributo(elementoSpanItemSelecionado, AtributosHtml.Tipo, this.CaminhoTipoEnum);
            ElementoUtil.AdicionarAtributo(elementoSpanItemTemplate, AtributosHtml.Tipo, this.CaminhoTipoEnum);
        }

        private ComboBoxEnum_Carregado(provedor: any, e: EventArgs): void
        {
            const caminhoTipo = this.RetornarValorAtributo(AtributosHtml.Tipo, null, false);
            if (!String.IsNullOrWhiteSpace(caminhoTipo))
            {
                const tipoEnum = u.ReflexaoUtil.RetornarTipo(caminhoTipo);
                //if (tipoEnum instanceof r.TipoEnum)
                //{
                this.PreencherListaEnum(tipoEnum);
                /*}*/
            }
        }

        public override ValorPropriedadeAlterado(paiPropriedade: d.BaseDominio, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any): void
        {
            if (!this.IsListaEnumPreenchida)
            {
                if ((proprieade instanceof r.Propriedade) && (proprieade.Tipo instanceof r.TipoEnum))
                {
                    this.PreencherListaEnum(proprieade.Tipo);
                }
                if (this.TipoItemLista instanceof r.TipoEnum)
                {
                    this.PreencherListaEnum(this.TipoItemLista);
                }
            }
            super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);
        }

        private PreencherListaEnum(tipo: r.TipoEnum)
        {
            if (!this.IsListaEnumPreenchida)
            {
                //if (tipo instanceof r.TipoEnum)
                //{
                //    this.ConstrutorEnum = u.ReflexaoUtil.RetornarConstrutorEnum(tipo);
                //}
                const valoresEnum = u.EnumUtil.RetornarValoresEnum(this.ConstrutorEnum);
                this.Lista = valoresEnum.ToListaObservacao();
                this.IsListaEnumPreenchida = true;
            }
        }

       // #region validacao

        public override async ValidarAsync(isForcar: boolean = false): Promise<boolean>
        {
            return super.ValidarAsync(isForcar);
        }
        //#endregion
    }
}