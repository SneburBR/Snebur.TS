namespace Snebur.UI
{
    //é preciso deixar a mesma linha para extensão pode organizar os arquivos na sequencia das heranças
    export class PainelListaOrdenacao<TItem extends TipoItemLista = Snebur.Objeto> extends PainelLista<TItem, ItemBlocoOrdenacao>
    {
        public static readonly PASSO_PADRAO: number = 1;

        private _passo: number;
        private _isSalvarOrdenacaoAutomaticamente: boolean = true;
        private _isAnimarOrdenacao: boolean = true;
        private _isAtivarOdernacao: boolean = true;
        private _isCloneGlobal: boolean = true;
     

        public get Passo(): number
        {
            return this._passo;
        }

        private CaminhoEntidadeOrdenacao: string;

        public readonly EventoBlocoOrdenacaoIniciada = new Evento<BlocoOrdenacaoEventArgs>(this);
        public readonly EventoBlocoOrdenacaoAlterada = new Evento<BlocoOrdenacaoEventArgs>(this);
        public readonly EventoBlocoOrdenacaoMovimentando = new Evento<BlocoOdernacaoMovimentandoEventArgs>(this);
        public readonly EventoBlocoOrdenacaoFinalizada = new Evento<BlocoOrdenacaoEventArgs>(this);

        public MetodoSalvarEntidadesOrdenada: (entidades: List<d.IOrdenacao>) => void

        public get IsSalvarOrdenacaoAutomaticamente(): boolean
        {
            return this._isSalvarOrdenacaoAutomaticamente;
        }

        public get IsCloneGlobal(): boolean
        {
            return this._isCloneGlobal;
        }

        public get IsAnimarOrdenacao(): boolean
        {
            return this._isAnimarOrdenacao;
        }

        public get IsAtivarOrdenacao(): boolean
        {
            return this._isAtivarOdernacao;
        }
        public set IsAtivarOrdenacao(value: boolean)
        {
            this._isAtivarOdernacao = value;
        }


        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoBlocoOrdenacaoIniciada.AddHandler(this.PainelLista_BlocoOrdenacaoIniciada, this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.CaminhoEntidadeOrdenacao = this.RetornarValorAtributo(AtributosHtml.EntidadeOrdenacao, null);

            this._passo = this.RetornarValorAtributoNumber(AtributosHtml.Passo, ControleListaOrdenacao.PASSO_PADRAO);
            this._isSalvarOrdenacaoAutomaticamente = this.RetornarValorAtributoBoolean(AtributosHtml.IsSalvarOrdenacaoAutomaticamente, true);
            this._isAnimarOrdenacao = this.RetornarValorAtributoBoolean(AtributosHtml.IsAnimarOrdenacao, true);
            this._isCloneGlobal = this.RetornarValorAtributoBoolean(AtributosHtml.IsCloneGlobal, true);
            this._sentidoOrdenacao = this.RetornarValorAtributoEnum(d.EnumSentidoOrdenacao, AtributosHtml.SentidoOrdenacao, d.EnumSentidoOrdenacao.Crescente);
            this._isAtivarOdernacao =  this.RetornarValorAtributoBoolean(AtributosHtml.IsAtivarOrdenacao, true);

            this.MetodoSalvarEntidadesOrdenada = this.RetornarMetodoSalvarEntidadesOrdenada();
             

            if (this.BlocoTemplateSeparador != null)
            {
                throw new Erro(`O painel lista ordenação não suportada bloco template separador em ${this.ControleApresentacao.___NomeConstrutor} `);
            }
        }

        private PainelLista_BlocoOrdenacaoIniciada()
        {
            this._elementoScroll = null;
        }


        //#region Ordenação 

        private RetornarMetodoSalvarEntidadesOrdenada(): (entidades: List<d.IOrdenacao>) => void
        {
            const nomeMetodo = this.RetornarValorAtributo(AtributosHtml.MetodoSalvarEntidadesOrdenada, null, false);
            if (!String.IsNullOrWhiteSpace(nomeMetodo))
            {
                return this.RetornarMetodo(nomeMetodo, false) as (entidades: List<d.IOrdenacao>) => void;
            }
            return null;
        }

        protected override RetornarNovoItemBloco(item: TItem): ItemBlocoOrdenacao
        {
            const objetoOrdenacao = this.RetornarObjetoOrdenacaoInterno(item);
            if (!u.ValidacaoUtil.IsNumber(((objetoOrdenacao as any) as d.IOrdenacao).Ordenacao))
            {
                const nomePropriedade = u.ReflexaoUtil.RetornarCaminhoPropriedade<d.IOrdenacao>(x => x.Ordenacao);
                const mensagem = `Não foi encontrado a propriedade '${nomePropriedade}' no objeto '${objetoOrdenacao.GetType()}' em '${this.ControleApresentacao.___NomeConstrutor}'`;
                throw new Erro(mensagem, this);
            }
            const blocoTemplate = this.RetornarBlocoTemplate(item);
            const itemBlocoSeparador = this.RetornarNovoItemBlocoSeparador();
            if (this.IsAnimarOrdenacao)
            {
                return new ItemBlocoOrdenacaoAnimado(this, blocoTemplate, item, itemBlocoSeparador, objetoOrdenacao);
            }
            return new ItemBlocoOrdenacaoEstatico(this, blocoTemplate, item, itemBlocoSeparador, objetoOrdenacao);

        }

        private RetornarObjetoOrdenacaoInterno(item: TItem): d.IOrdenacao
        {
            if (!String.IsNullOrWhiteSpace(this.CaminhoEntidadeOrdenacao))
            {
                return u.ReflexaoUtil.RetornarValorPropriedade(item, this.CaminhoEntidadeOrdenacao);
            }
            return item as d.IOrdenacao;

        }

        //#endregion

        //#region Auto scroll


        

        //#endregion
    }

}