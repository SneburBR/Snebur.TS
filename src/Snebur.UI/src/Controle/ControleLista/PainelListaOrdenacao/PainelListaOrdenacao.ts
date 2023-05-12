namespace Snebur.UI
{
    //é preciso deixar a mesma linha para extensão pode organizar os arquivos na sequencia das heranças
    export class PainelListaOrdenacao<TItem extends TipoItemLista = Snebur.Objeto> extends PainelLista<TItem, BaseItemBlocoOrdenacao>
    {
        public static readonly PASSO_PADRAO: number = 1;

        private _passo: number;
        private _isSalvarOrdenacaoAutomaticamente: boolean = true;
        private _isAnimarOrdenacao: boolean = true;
        private _isCloneGlobal: boolean = true;
        private _elementoScroll: HTMLElement;
        private _isRolandoScroll = false;

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

        public get ElementoScroll(): HTMLElement
        {
            if (this._elementoScroll == null)
            {
                this._elementoScroll = this.RetornarElementoScroll();
            }
            return this._elementoScroll;
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

        protected override RetornarNovoItemBloco(item: TItem): BaseItemBlocoOrdenacao
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

        private RetornarElementoScroll(): HTMLElement
        {
            if (this.OrientacaoPainel === EnumOrientacao.Horizontal)
            {
                return ScrollUtil.RetornarElementoScrollHorizontalPai(this.ElementoApresentacao, true);
            }
            return ScrollUtil.RetornarElementoScrollVerticalPai(this.ElementoApresentacao, true);
        }

        public AtualizarScroll(
            elementoClone: HTMLElement,
            eventoNativo: MouseEvent | TouchEvent): boolean
        {
            if (this._isRolandoScroll)
            {
                return false;
            }

            try
            {
                this._isRolandoScroll = true;
                return this.AtualizarScrollInterno(elementoClone, eventoNativo);
            }
            catch (erro)
            {
                console.error(erro);
                return false;
            }
            finally
            {
                this.LiberarScrollAsync();

            }
        }

        private async LiberarScrollAsync()
        {
            await ThreadUtil.EsperarAsync(1000);
            this._isRolandoScroll = false;
        }
        private AtualizarScrollInterno(elementoClone: HTMLElement, eventoNativo: MouseEvent | TouchEvent): boolean
        {
            const elementoScroll = this.ElementoScroll;
            if (elementoScroll == null)
            {
                return false;
            }

            if (this.OrientacaoPainel === EnumOrientacao.Horizontal)
            {
                return this.AtualizarScrollHorizontal(eventoNativo);
            }
            return this.AtualizarScrollVertical(elementoClone, eventoNativo);
        }

        private AtualizarScrollHorizontal(eventoNativo: MouseEvent | TouchEvent): boolean
        {
            console.error("AtualizarScrollHorizontal Method not implemented.");
            return false;
        }

        private AtualizarScrollVertical(
            elementoClone: HTMLElement,
            eventoNativo: MouseEvent | TouchEvent): boolean
        {
            if (!(eventoNativo instanceof MouseEvent))
            {
                return false;
            }

            const elementoScroll = this.ElementoScroll;
            const elementoPainel = this.ElementoApresentacao;

            const rect = elementoScroll.getBoundingClientRect();
            const rectClone = elementoClone.getBoundingClientRect();

            console.log(`
                        Scroll : 
                        Rect Top + height: ${rect.top + rect.height}
                        Rect Top: ${rect.top} - Height: ${rect.height} 
                        clientHeight: ${elementoScroll.clientHeight}
                        scrollHeight: ${elementoScroll.scrollHeight}
                        ScrollTop: ${elementoScroll.scrollTop}
                        pageY: ${eventoNativo.pageY}
                        screenY: ${eventoNativo.screenY}
                        Clone Y: ${rectClone.top}
                        Clone Y + height: ${rectClone.top + rectClone.height}`);

            const yInferior = rect.top + rect.height;
            const yMouse = rectClone.top + rectClone.height;

            if (yMouse > yInferior)
            {
                const scrollTop = Math.min(
                    elementoScroll.scrollTop + rectClone.height * 2,
                    elementoScroll.scrollHeight);

                if (elementoScroll.scrollTop < scrollTop)
                {
                    elementoScroll.scrollTo({
                        top: scrollTop,
                        behavior: "smooth"
                    });
                    return true;
                }
            }
            return false;
        }

        //#endregion
    }

}