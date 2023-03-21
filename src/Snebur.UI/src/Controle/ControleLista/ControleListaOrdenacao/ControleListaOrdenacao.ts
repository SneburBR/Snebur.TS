namespace Snebur.UI
{
    //é preciso deixar a mesma linha para exetençao pode organizar os arquivos na sequencia das heranças
    export class ControleListaOrdenacao<TItem extends TipoItemLista = TipoItemLista, TItemControleOrdenacao extends ItemControleOrdenacao = ItemControleOrdenacao> extends ControleLista<TItem, TItemControleOrdenacao>
    {
        public static readonly PASSO_PADRAO: number = 1;

        private _passo: number;

        public get Passo(): number
        {
            return this._passo;
        }

        public CaminhoEntidadeOrdenacao: string;

        public IsSensibilidadeVertical: boolean = false;

        public readonly EventoMovimentacaoIniciada = new Evento<ItemControleMovendoEventArgs>(this);
        public readonly EventoMovimentacaoFinalizada = new Evento<ItemControleMovendoEventArgs>(this);

        public readonly EventoMovendoControle = new Evento<ItemControleMovendoEventArgs>(this);
        public readonly EventoOrdenacaoAlterada = new Evento<ItemControleOrdenacaoAlteradoEventArgs>(this);

        public MetodoSalvarEntidadesOrdenada: (entidades: List<d.IOrdenacao>) => void

        public OpcoesElementoClonado: OpcoesElementoClonado;


        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-controle-lista-ordenacao";
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.OpcoesElementoClonado = this.RetornarOpcoesElementoClonado();

            this.CaminhoEntidadeOrdenacao = this.RetornarValorAtributo(AtributosHtml.EntidadeOrdenacao, null);
            this.IsSensibilidadeVertical = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.SensibilidadeVertical));

            const passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, 0));
            this._passo = passo > 0 ? passo : ControleListaOrdenacao.PASSO_PADRAO;

            let sentido = u.EnumUtil.RetornarValor(d.EnumSentidoOrdenacao, this.RetornarValorAtributo(AtributosHtml.SentidoOrdenacao));
            if (sentido == null)
            {
                sentido = d.EnumSentidoOrdenacao.Crescente;
            }
            this.SentidoOrdenacao = sentido;
            this.MetodoSalvarEntidadesOrdenada = this.RetornarMetodoSalvarEntidadesOrdenada();
        }

        protected override RetornarNovoItemControle(item: any): TItemControleOrdenacao
        {
            const itemSeparador = this.RetornarNovoItemSeparador(item);
            const itemTemplate = this.RetornarItemTemplate(item);
            const itemControle = new ItemControleOrdenacao(this.ItensColecao, itemTemplate, item);
            itemControle.ItemSeparador = itemSeparador;
            return itemControle as TItemControleOrdenacao;
        }

        protected override RetornarControleItensColecao(): ItensColecaoOrdenacao<TItem, TItemControleOrdenacao>
        {
            return new ItensColecaoOrdenacao(this, this.IDElementoItensColecao, this.TagElemenoItensColecao, this.CssClassElementoItensColecao);
        }

        private RetornarMetodoSalvarEntidadesOrdenada(): (entidades: List<d.IOrdenacao>) => void
        {
            const nomeMetodo = this.RetornarValorAtributo(AtributosHtml.MetodoSalvarEntidadesOrdenada, null, false);
            if (!String.IsNullOrWhiteSpace(nomeMetodo))
            {
                return this.RetornarMetodo(nomeMetodo, false) as (entidades: List<d.IOrdenacao>) => void;
            }
            return null;
        }

        //#region OpcoesElementoClonado

        private RetornarOpcoesElementoClonado(): OpcoesElementoClonado
        {
            const cssClassElementoCloando = this.RetornarValorAtributo(AtributosHtml.CssClassElementoClonado);
            const funcao = this.RetornarFuncaoElementoClonado();
            const isNaoRemoverElementoClonado = this.RetornarValorAtributoBoolean(AtributosHtml.DebugNaoRemoverElementoCloando, false);
            return new OpcoesElementoClonado(cssClassElementoCloando, funcao, isNaoRemoverElementoClonado);
        }

        private RetornarFuncaoElementoClonado(): Function
        {
            const nomeFuncaoNormalizarElementoClonado = this.RetornarValorAtributo(AtributosHtml.FuncaoNormalizarElementoClonado);
            if (!String.IsNullOrWhiteSpace(nomeFuncaoNormalizarElementoClonado))
            {
                return this.RetornarMetodo(nomeFuncaoNormalizarElementoClonado);
            }
            return null;
        }
    }

    export class OpcoesElementoClonado
    {
        public readonly CssClass: string;
        public readonly FuncaoNormalizarElemento: (elementoOrigem: HTMLElement) => HTMLElement;
        public readonly IsNormalizarElemento: boolean;
        public readonly IsExisteCssClasse: boolean;
        public readonly IsNaoRemoverElementoCloneEmDebug: boolean;

        public constructor(cssClass: string, funcaoNormalizar: Function, isNaoRemoverElementoClonado:boolean)
        {
            this.CssClass = cssClass;
            this.FuncaoNormalizarElemento = funcaoNormalizar as (elementoOrigem: HTMLElement) => HTMLElement;
            this.IsNormalizarElemento = typeof funcaoNormalizar === "function";
            this.IsExisteCssClasse = !String.IsNullOrWhiteSpace(cssClass);
            this.IsNaoRemoverElementoCloneEmDebug = $Configuracao.IsDebug && isNaoRemoverElementoClonado;
        }
    }
}