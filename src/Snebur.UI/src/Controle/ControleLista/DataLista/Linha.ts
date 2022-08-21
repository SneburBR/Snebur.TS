namespace Snebur.UI
{
    export class Linha<TItem = any> extends BaseItemTemplate<TemplateColunasColecao>
    {
        protected override  readonly IsNaoUserHtmlTemplate: boolean = true;
        private _linhaDetalhes: LinhaDetalhes<TItem>;

        /*public readonly Template: TemplateColunasColecao;*/
        public readonly ItemReferencia: TItem;
        public readonly Celulas: Array<Celula>;

        private readonly ManipuladorLinhaClick: EventoHandler;

        public get LinhaDetalhes(): LinhaDetalhes<TItem>
        {
            return this._linhaDetalhes;
        }

        public get LinhasColecao(): LinhasColecao<TItem>
        {
            return this.ControlePai as LinhasColecao<TItem>;
        }

        public get DataLista(): DataLista
        {
            return this.LinhasColecao.DataLista;
        }

        public get IsMarcarItem(): boolean
        {
            return this.DataLista.IsMarcarItem;
        }

        public constructor(controlePai: LinhasColecao<TItem>,
            idElemento: string,
            template: TemplateColunasColecao,
            itemReferencia: TItem,
            manipuladorLinhaClick: EventoHandler)
        {
            super(controlePai, idElemento, template);

            this._dataSource = itemReferencia;
            this.ManipuladorLinhaClick = manipuladorLinhaClick;

            this.Celulas = new Array<Celula>();
            /*this.Template = template;*/
            this.ItemReferencia = itemReferencia;
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarLinhaDetalhes();
            this.AdicionarCelulas();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            if (u.ValidacaoUtil.IsFunction(this.ManipuladorLinhaClick))
            {
                this.Elemento.setAttribute(AtributosHtml.Click.Nome, "ManipuladorLinhaClick");
            }

            if (!String.IsNullOrWhiteSpace(this.Template.CaminhoManipuladorClick))
            {
                this.Elemento.setAttribute(AtributosHtml.Click.Nome, this.Template.CaminhoManipuladorClick);
            }
        }

        protected override NormalizarHtmlInterno(htmlInterno: string): string
        {
            return super.NormalizarHtmlInterno(htmlInterno);
        }

        protected override AdicionarEstilos(): void
        {

        }


        protected override RetornarElementosPossuiAtrubitoSnebur(): DicionarioSimples<Array<Element>>
        {
            return super.RetornarElementosPossuiAtrubitoSnebur();
        }

        //#region Metodos privados

        private AdicionarCelulas(): void
        {
            const templatesColuna = this.Template.TemplatesColuna;

            for (const templateColuna of templatesColuna)
            {
                /*const templateColuna = templatesColuna[i];*/
                const celula = this.RetornarCelula(templateColuna.Coluna, templateColuna);
                this.ControlesFilho.Add(celula);
                this.Celulas.Add(celula);
                celula.InicializarControle();
                celula.DataSource = this.ItemReferencia;
            }
        }

        private AdicionarLinhaDetalhes(): void
        {
            const templateLinhaDetalhes = this.RetornarTemplateLinhaDatalhes(this.ItemReferencia);
            if (templateLinhaDetalhes instanceof TemplateLinhaDetalhes)
            {
                //this.AdicionarCelularExibirDetalhes();
                const numeroColunas = this.Template.TemplatesColuna.Count;
                this._linhaDetalhes = new LinhaDetalhes(this, templateLinhaDetalhes, this.ItemReferencia, numeroColunas);

                this.ControlesFilho.Add(this.LinhaDetalhes);
                this.LinhaDetalhes.InicializarControle();
                this.LinhaDetalhes.DataSource = this.ItemReferencia;
            }
        }

        protected RetornarTemplateLinhaDatalhes(item: any): TemplateLinhaDetalhes
        {
            const templatesLinhaDetalhes = this.Template.TemplatesLinhaDetalhes.Where(x => this.ItemReferencia instanceof d.BaseDominio && x.Tipo === this.ItemReferencia.GetType()).ToList();
            if (templatesLinhaDetalhes.Count > 1)
            {
                throw new Erro("Foi encontrado mais template linha detalhes para o item adicionado", this);
            }
            if (templatesLinhaDetalhes.Count === 1)
            {
                return templatesLinhaDetalhes.Single();
            }
            return this.Template.TemplateLinhaDetalhesPadrao;
        }

        private RetornarCelula(coluna: Coluna, templateColuna: TemplateColuna): Celula
        {
            const idElemento = ElementoUtil.RetornarNovoIDElemento(this, "celula");
            if (templateColuna instanceof TemplateColunaTexto)
            {
                return new CelulaTexto(this, idElemento, coluna, templateColuna);
            }

            if (templateColuna instanceof TemplateColunaPersonalizada)
            {

                return new CelulaPersonalizada(this, idElemento, coluna, templateColuna);
            }

            if (templateColuna instanceof TemplateColunaExibirDetalhes)
            {
                return new CelulaExibirDetalhes(this, idElemento, coluna, templateColuna);
            }
            throw new ErroNaoSuportado("O template coluna não é suportado", this);
        }
        //#endregion

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento(): string
        {
            return "tr";
        }
        //#endregion

        //#region Marcar e desmarcar linha

        private static readonly CSS_CLASS_MARCAR_LINHA = "sn-marcar-linha";

        public MarcarLinha()
        {
            this.Elemento.classList.add(Linha.CSS_CLASS_MARCAR_LINHA);
        }

        public DesmacarLinha()
        {
            this.Elemento.classList.remove(Linha.CSS_CLASS_MARCAR_LINHA);
        }

        //#endregion


        //#region IDisposable

        public override Dispose(): void
        {
            this.Celulas.Clear();
            super.Dispose();
        }
        //#endregion
    }
}