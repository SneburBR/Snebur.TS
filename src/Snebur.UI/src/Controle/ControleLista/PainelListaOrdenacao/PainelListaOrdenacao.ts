﻿namespace Snebur.UI
{
    //é preciso deixar a mesma linha para exetençao pode organizar os arquivos na sequencia das heranças
    export class PainelListaOrdenacao<TItem extends TipoItemLista = Snebur.Objeto> extends PainelLista<TItem, ItemBlocoOrdenacao>
    {
        public static readonly PASSO_PADRAO: number = 1;

        private _passo: number;

        public get Passo(): number
        {
            return this._passo;
        }

        private CaminhoEntidadeOrdenacao: string;

        public readonly EventoBlocoOrdenando  = new Evento<BlocoOrdenandoEventArgs>(this);
        public readonly EventoBlocoOrdenacaoAlterado = new Evento<BlocoOrdenacaoAlteradoEventArgs>(this);
         
        public MetodoSalvarEntidadesOrdenada: (entidades: List<d.IOrdenacao>) => void


        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.CaminhoEntidadeOrdenacao = this.RetornarValorAtributo(AtributosHtml.EntidadeOrdenacao, null);
            this._passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, ControleListaOrdenacao.PASSO_PADRAO));
            this.SentidoOrdenacao = this.RetornarValorAtributoEnum(d.EnumSentidoOrdenacao, AtributosHtml.SentidoOrdenacao, d.EnumSentidoOrdenacao.Crescente);
            this.MetodoSalvarEntidadesOrdenada = this.RetornarMetodoSalvarEntidadesOrdenada();

            if (this.BlocoTemplateSeparador != null)
            {
                throw new Erro(`O painel lista ordenação suportada bloco template separador em ${this.ControleApresentacao.___NomeConstrutor} `);
            }
        }

        //#region Ordenacao 

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
            return new ItemBlocoOrdenacao(this, blocoTemplate, item, itemBlocoSeparador, objetoOrdenacao);
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
    }
     
}