namespace Snebur.UI
{
    export class LinhasColecao<TItem> extends BaseControleApresentacaoFormulario
    {
        public readonly Template: TemplateColunasColecao;
        public readonly TipoItemLista: r.BaseTipo;
        public readonly ColunasColecao : ColunasColecao
        public readonly Linhas = new Array<Linha<TItem>>();

        public get DataLista(): DataLista
        {
            return this.ControlePai as DataLista;
        }

        public constructor(controlePai: DataLista,
            idElemento: string,
            colunasColucao: ColunasColecao,
            template: TemplateColunasColecao,
            tipoItemLista: r.BaseTipo)
        {
            super(controlePai, idElemento);

            this.Template = template;
            this.ColunasColecao = colunasColucao;
            this.TipoItemLista = tipoItemLista;
            this.DataSource = null;
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        public override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDomGlobal(ui.EnumEventoDom.Resize, this.Window_Resize, this);
        }

        public override RetornarElementoDestino(): HTMLElement
        {
            return ElementoUtil.RetornarElemento(this.DataLista.ElementoTabela);
        }

        //#region Adicionar, inserir, remover

        public AdicionarItem(item: any): void
        {
            const id = ElementoUtil.RetornarNovoIDElemento(this, "linha");
            const linha = this.RetornarNovaLinha(id, item);
            this.ControlesFilho.Add(linha);
            this.Linhas.Add(linha);
            linha.InicializarControle();
        }

        public InserirItem(posicao: number, item: any): void
        {
            throw new ErroNaoImplementado(this);
        }

        public RemoverItem(item: any): void 
        {
            const linha = this.Linhas.Where(x => x.ItemReferencia === item).FirstOrDefault();
            if (linha != null)
            {
                linha.Dispose();
                this.Linhas.Remove(linha);
                //ElementoUtil.RemoverElemento(this.IDElemento, linha.IDElemento);
            }
        }

        //#endregion

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento(): string
        {
            return "tbody";
        }

        protected RetornarNovaLinha(id: string, item: any): Linha<TItem>
        {
            return new Linha(this, id, this.Template, item, this.DataLista.ManipuladorLinhaClick);
        }
        //#endregion

        //#region  Atualizar altura

        private Window_Resize(e: Event): void
        {
            /*this.AtualizarAlturaMaxima();*/
        }

        private AtualizarAlturaMaxima(): void
        {
            //const altura = this.DataLista.ColunasColecao.Elemento.getBoundingClientRect().height;
            //const alturaMaxima = this.DataLista.Elemento.getBoundingClientRect().height - altura;
            //if (alturaMaxima > 0)
            //{
            //    this.Elemento.style.maxHeight = alturaMaxima.ToPixels();
            //}
        }
         
        //#endregion
         
        //#region IDisposable

        public override Dispose(): void
        {
            this.Linhas.Clear();
            super.Dispose();
        }

           //#endregion
    }
}