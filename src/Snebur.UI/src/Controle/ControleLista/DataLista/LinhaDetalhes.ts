namespace Snebur.UI
{
    export class LinhaDetalhes<TItem> extends BaseControleApresentacaoFormulario
    {
        public Template: TemplateLinhaDetalhes;
        public ConteudoLinhaDetalhes: ConteudoLinhaDetalhes;
        public ItemReferencia: TItem;
        public NumeroColunas: number;
        public IsExpandidoPrimeiraVez: boolean = false;

        public get LinhaReferencia(): Linha<TItem>
        {
            return this.ControlePai as Linha<TItem>;
        }

        public constructor(controlePai: BaseControle, template: TemplateLinhaDetalhes, itemReferencia: TItem, numeroColunas: number,)
        {
            super(controlePai);
            this.CssClasseControle = "sn-linha-datalhes";
            this.Template = template;
            this.ItemReferencia = itemReferencia;
            this.NumeroColunas = numeroColunas;
            this.IsAdicionarElementoConteudoApresentacao = false;
        }

        protected override  Inicializar(): void
        {
            super.Inicializar();

            this.ConteudoLinhaDetalhes = new ConteudoLinhaDetalhes(this, this.Template, this.NumeroColunas);
            this.ConteudoLinhaDetalhes.InicializarControle();
            this.ControlesFilho.Add(this.ConteudoLinhaDetalhes);

            if (this.Template.IsPropagarBindDataSource)
            {
                this.ConteudoLinhaDetalhes.DataSource = this.ItemReferencia;
            }
            const visibilidade = this.RetornarVisibilidade();
            if (visibilidade != null)
            {
                this.Visibilidade = visibilidade;
            }
        }

        public override OcultarElemento(): void
        {
            super.OcultarElemento();
            this.ConteudoLinhaDetalhes.OcultarElemento();
        }

        public override MostrarElemento(): void
        {
            super.MostrarElemento();
            this.ConteudoLinhaDetalhes.MostrarElemento();
        }

        public override get IsVisivel(): boolean
        {
            return this.Elemento.IsVisivel &&
                this.ConteudoLinhaDetalhes.IsVisivel;
        }


        public RetornarVisibilidade(): EnumVisibilidade
        {
            if (this.Template.Atributos.Any(x => x.Chave === "sn-visibilidade"))
            {
                return null;
            }
            return EnumVisibilidade.Oculto;
        }

        //public override Ocupar(): void
        //public override Ocupar(titulo: string, mensagem: string): void
        //public override Ocupar(opcao: EnumOpcaoOcupar): void
        //public override Ocupar(isOcuparImeditamente: boolean): void
        //public override Ocupar(argumento?: EnumOpcaoOcupar | boolean | string, mensagem?: string): void
        //{
        //    this.ConteudoLinhaDetalhes.Ocupar(argumento as any, mensagem);
        //}

        //public override Desocupar() 
        //{
        //    this.ConteudoLinhaDetalhes.Desocupar;
        //}

        //#region Métodos sobre-escritos

        protected override RetornarTagNovoElemento(): string
        {
            return "tr";
        }

        protected override RetornarElementoDestino(): HTMLElement
        {
            return this.LinhaReferencia.Elemento.parentElement;
        }
        //#endregion

    }
}