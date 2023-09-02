namespace Snebur.UI
{
    export class ColunasColecao extends BaseControle
    {
        public Template: TemplateColunasColecao;

        public IDElementoDestino: string;

        public TipoItemLista: r.BaseTipo;


        public get DataLista(): DataLista
        {
            return this.ControlePai as DataLista;
        }

        public get ElementoDestino(): HTMLElement
        {
            return document.getElementById(this.IDElementoDestino);
        }

        public constructor(controlePai: DataLista, idElemento: string, template: TemplateColunasColecao, tipoItemLista: r.BaseTipo)
        {
            super(controlePai, idElemento);
            this.IsAdicionarElementoConteudoApresentacao = false;
            if (!(controlePai instanceof DataLista))
            {
                throw new ErroNaoSuportado("O controle pai não é suportado", this);
            }
            this.Template = template;
            this.TipoItemLista = tipoItemLista;
            this.DataSource = null;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarElementoDestino();
            this.AdicionarColunas();

        }

        public override RetornarElementoDestino(): HTMLElement
        {
            return ElementoUtil.RetornarElemento(this.DataLista.ElementoTabela);
        }
        //#region Ordenação

        public ColunaOrdenacao_Click(colunaAtual: ColunaTexto, e: UIEventArgs): void
        {
            const colunas = this.ControlesFilho.OfType(ColunaTexto).Where(x => x.IsAtivarOrdenacao).ToList();
            colunas.Remove(colunaAtual);

            for (const coluna of colunas)
            {
                coluna.SentidoOrdenacao = EnumSentidoOrdenacaoColuna.Nenhuma;
            }
            colunaAtual.SentidoOrdenacao = this.RetornarProximaOrdenacao(colunaAtual.SentidoOrdenacao);
            this.DataLista.NotificarOrdenacaoAlterada(colunaAtual, e);
        }

        private RetornarProximaOrdenacao(ordenacao: EnumSentidoOrdenacaoColuna): EnumSentidoOrdenacaoColuna
        {
            switch (ordenacao)
            {
                case (EnumSentidoOrdenacaoColuna.Nenhuma):

                    return EnumSentidoOrdenacaoColuna.Crescente;

                case (EnumSentidoOrdenacaoColuna.Crescente):

                    return EnumSentidoOrdenacaoColuna.Decrescente;

                case (EnumSentidoOrdenacaoColuna.Decrescente):

                    return EnumSentidoOrdenacaoColuna.Nenhuma;

                default:

                    throw new ErroNaoSuportado("A ordenação não é suportada", this);
            }
        }

       
        //#endregion

        //#region Métodos privados

        private AdicionarElementoDestino(): void
        {
            this.IDElementoDestino = ElementoUtil.RetornarNovoIDElemento(this, "tr");
            const elementoTr = document.createElement("tr");
            elementoTr.id = this.IDElementoDestino;
            ElementoUtil.AdicionarElemento(this.Elemento, elementoTr);
        }

        private AdicionarColunas(): void
        {
            const templatesColuna = this.Template.ControlesFilho.OfType<TemplateColuna>(TemplateColuna).ToList();
            const len = templatesColuna.length;
            for (let i = 0; i < len; i++)
            {
                const templateColuna = templatesColuna[i];
                const propriedade = this.RetornarPropriedadeColuna(templateColuna);
                templateColuna.Propriedade = propriedade;
                const coluna = this.RetornarNovaColuna(templateColuna);
                this.ControlesFilho.Add(coluna);
                coluna.InicializarControle();
            }
        }

        private RetornarPropriedadeColuna(templateColuna: TemplateColuna): r.Propriedade
        {
            const caminhioPropriedade = templateColuna.CaminhoPropriedade;
            if (this.TipoItemLista instanceof r.BaseTipo)
            {
                if (!String.IsNullOrWhiteSpace(caminhioPropriedade))
                {
                    return u.ReflexaoUtil.RetornarPropriedadeCaminho(this.TipoItemLista, caminhioPropriedade, true, false);
                }
            }
            return null;
        }

        private RetornarNovaColuna(templateColuna: TemplateColuna): Coluna
        {
            const idElementoColuna = ElementoUtil.RetornarNovoIDElemento(this, "coluna");
            if (templateColuna.TemplateTituloColuna instanceof TemplateTiluloColuna)
            {
                return new ColunaTituloPersonalizado(this, idElementoColuna, templateColuna, templateColuna.TemplateTituloColuna);
            }
            else
            {
                return new ColunaTexto(this, idElementoColuna, templateColuna);
            }
        }
        //#endregion

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento(): string
        {
            return "thead";
        }
        //#endregion
    }
}