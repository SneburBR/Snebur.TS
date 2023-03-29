
namespace Snebur.UI
{

    export class ItemControleOrdenacao extends ItemControle
    {
        private static readonly ITEM_MOVENDO = "sn-item-movimentando";

        private ItemControleMouseEmCima: ItemControleOrdenacao = null;

        private ElementoClone: HTMLElement;
        private DiferencaX: number = 0;
        private DiferencaY: number = 0;
        private _entidadeOrdenacao: d.IOrdenacao = null;

        private get Passo(): number
        {
            return this.ControleListaOrdenacao.Passo;
        }

        private get SentidoOrdenacao(): d.EnumSentidoOrdenacao
        {
            return this.ControleListaOrdenacao.SentidoOrdenacao;
        }

        public get IsSensibilidadeVertical(): boolean
        {
            return this.ControleListaOrdenacao.IsSensibilidadeVertical;
        }
        public get ControleListaOrdenacao(): ControleListaOrdenacao
        {
            return this.RetornarControlePai<ControleListaOrdenacao>(ControleListaOrdenacao);
        }

        public get MetodoSalvarEntidadesOrdenada(): (entidades: List<d.IOrdenacao>) => void
        {
            return this.ControleListaOrdenacao.MetodoSalvarEntidadesOrdenada;
        }

        public get ItensColecao(): ItensColecaoOrdenacao
        {
            return this.ControlePai as ItensColecaoOrdenacao;
        }

        public get IsCrescente(): boolean
        {
            return this.SentidoOrdenacao === d.EnumSentidoOrdenacao.Crescente;
        }

        public get EntidadeOrdenacao(): d.IOrdenacao
        {
            if (this._entidadeOrdenacao == null)
            {
                const entidadeOrdenacao = this.RetornarEntidadeOrdenacaoInterno();
                if (!(entidadeOrdenacao instanceof d.Entidade))
                {
                    throw new Erro("A entidade de ordenação não é valida", this);
                }
                if (!u.ValidacaoUtil.IsNumber(((entidadeOrdenacao as any) as d.IOrdenacao).Ordenacao))
                {
                    const nomePropriedade = u.ReflexaoUtil.RetornarCaminhoPropriedade<d.IOrdenacao>(x => x.Ordenacao);
                    throw new Erro(`Não foi encontrado a propriedade ${nomePropriedade} em ${entidadeOrdenacao.__IdentificadorEntidade}`, this);
                }
                this._entidadeOrdenacao = entidadeOrdenacao as any;
            }
            return this._entidadeOrdenacao;
        }

        public get OpcoesElementoClonado(): OpcoesElementoClonado
        {
            return this.ControleListaOrdenacao.OpcoesElementoClonado;
        }

        public constructor(controlePai: BaseControle, template: ItemTemplate, itemReferencia: any)
        {
            super(controlePai, template, itemReferencia);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.Elemento_MouseDown.bind(this));
            //this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove.bind(this));

        }

        private RetornarEntidadeOrdenacaoInterno(): d.Entidade
        {
            if (!String.IsNullOrWhiteSpace(this.ControleListaOrdenacao.CaminhoEntidadeOrdenacao))
            {
                return u.ReflexaoUtil.RetornarValorPropriedade(this.ItemReferencia, this.ControleListaOrdenacao.CaminhoEntidadeOrdenacao);
            }
            return this.ItemReferencia;
        }

        //#region Dom Evento

        private PageXInicial: number;
        private PageYInicial: number;

        private Elemento_MouseDown(e: MouseEvent)
        {
            this.RemoverElementoClone();

            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseUp, this.ElementoClone_Window_MouseUp);
            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.ElementoClone_Window_MouseMove);

            this.PageXInicial = e.pageX;
            this.PageYInicial = e.pageY;
            document.documentElement.style.cursor = "grab";
            e.preventDefault();
        }
         
        private ElementoClone_Window_MouseMove(e: MouseEvent): void
        {
            if (this.ElementoClone instanceof HTMLElement)
            {
                let x = (e.pageX - this.DiferencaX);
                let y = (e.pageY - this.DiferencaY);
                //let maiorX = (document.body.clientWidth - this.ElementoClone.clientWidth - 5);
                //let maiorY = (document.body.clientHeight - this.ElementoClone.clientHeight - 5);

                const maiorX = (document.body.clientWidth - - 5);
                const maiorY = (document.body.clientHeight - - 5);

                if (x < 0) x = 0;
                if (x > maiorX) x = maiorX;

                if (y < 0) y = 0;
                if (y > maiorY) y = maiorY;

                this.ElementoClone.style.left = x.ToPixels();
                this.ElementoClone.style.top = y.ToPixels();

                this.ControleListaOrdenacao.EventoMovendoControle.Notificar(this.ControleListaOrdenacao, new ItemControleMovendoEventArgs(this, this.ElementoClone, e));

                document.documentElement.style.cursor = "grabbing";
            }
            else
            {
                const diferencaX = Math.abs(this.PageXInicial - e.pageX);
                const diferencaY = Math.abs(this.PageYInicial - e.pageY);
                const diferenca = Math.max(diferencaX, diferencaY);
                if (diferenca > 10)
                {
                    this.ItensColecao.IsMovendoItemControle = true;
                    this.AdicionarElementoClone(e);
                    this.Elemento.style.opacity = "0";
                    this.AdicionarEventosMouseMoveGlobal();

                    this.ControleListaOrdenacao.EventoMovimentacaoIniciada.
                        Notificar(this.ControleListaOrdenacao, new ItemControleMovendoEventArgs(this, this.ElementoClone, e));
                }
            }
        }

        private ElementoClone_Window_MouseUp(e: MouseEvent): void
        {
            document.documentElement.style.cursor = "";

            this.ItensColecao.IsMovendoItemControle = false;
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.ElementoClone_Window_MouseMove);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseUp, this.ElementoClone_Window_MouseUp);
            this.RemoverElementoClone(e);
            this.RemoverEventosMouseMoveGlobal();

            if (this.IsControleInicializado)
            {
                this.Elemento.style.opacity = "1";
            }

        }

        private IsEventosMouseMoveGlobalAdicionado: boolean = false;
        private AdicionarEventosMouseMoveGlobal(): void
        {
            if (!this.IsEventosMouseMoveGlobalAdicionado)
            {
                this.IsEventosMouseMoveGlobalAdicionado = true;
                this.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseMove, this.Window_MouseMove);
                this.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseUp, this.Window_MouseUp);
            }
        }

        private RemoverEventosMouseMoveGlobal(): void
        {
            if (this.IsEventosMouseMoveGlobalAdicionado)
            {
                this.IsEventosMouseMoveGlobalAdicionado = false;
                this.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseMove, this.Window_MouseMove);
                //this.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseUp, this.Window_MouseUp);
            }
        }

        private Window_MouseMove(e: MouseEvent)
        {
            for (const itemControle of this.ItensColecao.ItensControle)
            {

                if (itemControle !== this && itemControle.IsPosicaoMouseEmCimaDoElemento(new d.Posicao(e.pageX, e.pageY)))
                {
                    this.ItemControleMouseEmCima = this;
                    this.AdicionarAnimacao(itemControle, e);
                }
            }


        }

        private Window_MouseUp(e: MouseEvent)
        {
            this.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseUp, this.Window_MouseUp);
            if (!this.IsControleInicializado)
            {
                return;
            }

            if (this.ItemControleMouseEmCima instanceof ItemControle)
            {
                //const controleMouseEmCima = this.ItemControleMouseEmCima;
                //const controleMovendo = this;

                if (!this.IsCancelarOrdenacao(e))
                {
                    this.ItemControleMouseEmCima = null;
                    return;
                }

                const elementoAnterior = this.Elemento.previousElementSibling;
                const elementoPosterior = this.Elemento.nextElementSibling;
                const entidadeMovendo = this.EntidadeOrdenacao;

                let passo = this.Passo;
                if (!this.IsCrescente) passo *= -1;

                if (!(elementoAnterior instanceof HTMLElement))
                {
                    const itemControleDepois = this.ItensColecao.ItensControle.Where(x => x.Elemento === elementoPosterior).Single();
                    const entidadeDepois = itemControleDepois.EntidadeOrdenacao;
                    entidadeMovendo.Ordenacao = entidadeDepois.Ordenacao - passo;
                }
                else if (!(elementoPosterior instanceof HTMLElement))
                {
                    const itemControleAntes = this.ItensColecao.ItensControle.Where(x => x.Elemento === elementoAnterior).Single();
                    const entidadeAntes = itemControleAntes.EntidadeOrdenacao;
                    entidadeMovendo.Ordenacao = entidadeAntes.Ordenacao + passo;
                }
                else
                {
                    const itemControleAntes = this.ItensColecao.ItensControle.Where(x => x.Elemento === elementoAnterior).Single();
                    const itemControleDepois = this.ItensColecao.ItensControle.Where(x => x.Elemento === elementoPosterior).Single();

                    const entidadeAntes = itemControleAntes.EntidadeOrdenacao;
                    const entidadeDepois = itemControleDepois.EntidadeOrdenacao;

                    if (entidadeAntes.Ordenacao === entidadeDepois.Ordenacao)
                    {
                        this.ReiniciarOrdenacao();
                    }

                    if (this.IsCrescente)
                    {
                        entidadeMovendo.Ordenacao = entidadeAntes.Ordenacao + ((entidadeDepois.Ordenacao - entidadeAntes.Ordenacao) / 2.0);
                    }
                    else
                    {
                        entidadeMovendo.Ordenacao = entidadeDepois.Ordenacao + ((entidadeAntes.Ordenacao - entidadeDepois.Ordenacao) / 2.0);
                    }

                    //validação em debug
                    if ($Configuracao.IsDebug)
                    {
                        if (this.IsCrescente)
                        {
                            if (!(entidadeMovendo.Ordenacao > entidadeAntes.Ordenacao &&
                                entidadeMovendo.Ordenacao < entidadeDepois.Ordenacao))
                            {
                                throw new Erro("A entidade deve ficar meio entre o anterior e depois");
                            }
                        }
                        else
                        {
                            if (!(entidadeMovendo.Ordenacao < entidadeAntes.Ordenacao &&
                                entidadeMovendo.Ordenacao > entidadeDepois.Ordenacao))
                            {
                                throw new Erro("A entidade deve ficar meio entre o anterior e depois");
                            }
                        }
                    }
                }

                const entidadesSalvar = new List<d.IOrdenacao>();
                entidadesSalvar.Add(this.EntidadeOrdenacao);
                this.SalvarEntidadesOrdenada(entidadesSalvar.ToList<d.IOrdenacaoEntidade>());
                this.OrdenarItensControle();

                //let destinoItemControle = controleMouseEmCima.RetornarDestinoItemControle(e);
                //let elementoPai = this.ItensColecao.Elemento;
                //switch (destinoItemControle)
                //{
                //    case EnumDestinoControleOrdenado.Antes:

                //        let resultadoAntes = controleMouseEmCima.AtualizarOrdenacaoAntes();
                //        if (resultadoAntes)
                //        {
                //            let elementoMovendo = this.Elemento;
                //            elementoPai.removeChild(elementoMovendo);
                //            elementoPai.insertBefore(elementoMovendo, this.ItemControleMouseEmCima.Elemento);
                //            this.OrdenarItensControle();
                //        }
                //        break;

                //    case EnumDestinoControleOrdenado.Depois:

                //        let resultadoDepois = controleMouseEmCima.AtualizarOrdenacaoDepois();
                //        if (resultadoDepois)
                //        {
                //            if (this.IsSensibilidadeVertical)
                //            {
                //                let elementoMovendo = this.Elemento;
                //                elementoPai.removeChild(elementoMovendo);
                //                elementoPai.insertBefore(elementoMovendo, this.ItemControleMouseEmCima.Elemento.nextSibling);
                //            }
                //            this.OrdenarItensControle();
                //        }
                //        break;

                //    default:
                //        throw new Erro("Destino do item controle não suportado", this);
                //}
            }
        }

        private ReiniciarOrdenacao(): void
        {
            //implementar aqui, incrementar a Ordenação conforme a posição dos elementos
            throw new Error(" Entidade anterior e posterior possem a mesma ordenação");
        }

        private IsCancelarOrdenacao(e: MouseEvent): boolean
        {
            /*eslint-disable*/
            return !this.IsControleInicializado ||
                !this.ItemControleMouseEmCima.IsControleInicializado ||
                this == this.ItemControleMouseEmCima;
            /*eslint-enable*/

        }


        private AdicionarAnimacao(itemControleMouseEmCima: ItemControleOrdenacao, e: MouseEvent): void
        {
            const elementoMouseEmCima = itemControleMouseEmCima.Elemento;
            const posicoes = elementoMouseEmCima.getBoundingClientRect();
            const elementoMovento = this.Elemento;

            if (this.IsSensibilidadeVertical)
            {
                const centroY = posicoes.top + (posicoes.height / 2);
                //this.ItensColecao.Elemento.removeChild(elementoMovento);
                elementoMovento.remove();
                if (e.pageY < centroY)
                {
                    this.ItensColecao.Elemento.insertBefore(elementoMovento, elementoMouseEmCima);
                }
                else
                {
                    this.ItensColecao.Elemento.insertBefore(elementoMovento, elementoMouseEmCima.nextElementSibling);
                }

            }
            else
            {
                const centroX = (posicoes.left + (posicoes.width / 2));
                this.ItensColecao.Elemento.removeChild(elementoMovento);
                if (e.pageX < centroX)
                {
                    this.ItensColecao.Elemento.insertBefore(elementoMovento, elementoMouseEmCima);
                }
                else
                {
                    this.ItensColecao.Elemento.insertBefore(elementoMovento, elementoMouseEmCima.nextElementSibling);
                }
            }
            if (!(this._elemento instanceof HTMLElement))
            {
                this._elemento = elementoMovento;
            }

        }




        //#endregion

        private OrdenarItensControle(): void
        {
            let itensControle = this.ItensColecao.ItensControle.ToList(true);
            this.ItensColecao.ItensControle.Clear();

            if (this.IsCrescente)
            {
                itensControle = itensControle.Cast<ItemControleOrdenacao>().OrderBy(x => x.EntidadeOrdenacao.Ordenacao).ToList();
            }
            else
            {
                itensControle = itensControle.Cast<ItemControleOrdenacao>().OrderByDescending(x => x.EntidadeOrdenacao.Ordenacao).ToList();
            }
            this.ItensColecao.ItensControle.AddRange(itensControle);
            const ars = new ui.ItemControleOrdenacaoAlteradoEventArgs(this, this.EntidadeOrdenacao);
            this.ControleListaOrdenacao.EventoOrdenacaoAlterada.Notificar(this, ars);
        }

        //#endregion



        private RetornarDestinoItemControle(e: MouseEvent): EnumDestinoControleOrdenado
        {
            const posicoes = this.Elemento.getBoundingClientRect();
            if (this.IsSensibilidadeVertical)
            {
                if (e.pageY > (posicoes.top + (posicoes.height / 2)))
                {
                    return EnumDestinoControleOrdenado.Depois;
                }
                else
                {
                    return EnumDestinoControleOrdenado.Antes;
                }
            }
            else
            {
                if (e.pageX > (posicoes.left + (posicoes.width / 2)))
                {
                    return EnumDestinoControleOrdenado.Depois;
                }
                else
                {
                    return EnumDestinoControleOrdenado.Antes;
                }
            }
        }

        //private AtualizarOrdenacaoAntes(): boolean
        //{
        //    let itemControleMovendo = this;
        //    let itemControleMouseEmCima = this.ItemControleMouseEmCima;
        //    let posicaoItemControleReferencia = this.ItensColecao.ItensControle.indexOf(itemControleMouseEmCima);

        //    let entidadeMovendo = this.EntidadeOrdenacao;
        //    let entidadeReferencia = this.ItemControleMouseEmCima.EntidadeOrdenacao;

        //    if (entidadeReferencia.Id == entidadeMovendo.Id)
        //    {
        //        return false;
        //    }

        //    let entidadesSalvar = new Array<d.IEntidade>();
        //    let passo = this.Passo;
        //    if (!this.IsCrescente) passo *= -1;

        //    if (posicaoItemControleReferencia == 0)
        //    {
        //        entidadeMovendo.Ordenacao = entidadeReferencia.Ordenacao - passo;
        //    }
        //    else
        //    {
        //        let itemControleAntes = this.ItensColecao.ItensControle[posicaoItemControleReferencia - 1] as ItemControleOrdenacao;
        //        let itemControleDepois = itemControleMouseEmCima
        //        let entidadeDepois = itemControleDepois.EntidadeOrdenacao;

        //        let entidadeAntes = itemControleAntes.EntidadeOrdenacao;
        //        if (entidadeAntes.Id == entidadeMovendo.Id)
        //        {
        //            return false;
        //        }

        //        let tempOrdenacaItem = entidadeMovendo.Ordenacao;
        //        let tempOrdenacaoAtenrior = entidadeAntes.Ordenacao;
        //        let tempOrdenacaDepois = entidadeReferencia.Ordenacao;

        //        let operador: (n1: number, n2: number) => boolean = (this.SentidoOrdenacao == d.EnumSentidoOrdenacao.Crescente) ? u.Util.Menor : u.Util.Maior;
        //        if (operador(tempOrdenacaDepois, tempOrdenacaoAtenrior))
        //        {
        //            return false;
        //        }

        //        if (entidadeReferencia.Ordenacao === entidadeAntes.Ordenacao)
        //        {
        //            entidadeAntes.Ordenacao -= this.Passo;
        //            entidadesSalvar.Add(entidadeAntes);
        //        }

        //        if (this.IsCrescente)
        //        {
        //            entidadeMovendo.Ordenacao = entidadeAntes.Ordenacao + ((entidadeDepois.Ordenacao - entidadeAntes.Ordenacao) / 2.0);
        //        }
        //        else
        //        {
        //            entidadeMovendo.Ordenacao = entidadeDepois.Ordenacao + ((entidadeAntes.Ordenacao - entidadeDepois.Ordenacao) / 2.0);
        //        }

        //        if ($Configuracao.DEBUG)
        //        {
        //            if (this.IsCrescente)
        //            {
        //                if (!(entidadeMovendo.Ordenacao > entidadeAntes.Ordenacao &&
        //                    entidadeMovendo.Ordenacao < entidadeReferencia.Ordenacao))
        //                {
        //                    throw new Erro("A controle deve ficar meio entre o anterior e referencia");
        //                }
        //            }
        //            else
        //            {
        //                if (!(entidadeMovendo.Ordenacao < entidadeAntes.Ordenacao &&
        //                    entidadeMovendo.Ordenacao > entidadeReferencia.Ordenacao))
        //                {
        //                    throw new Erro("A controle deve ficar meio entre o anterior e referencia");
        //                }
        //            }

        //        }
        //    }

        //    entidadesSalvar.Add(entidadeMovendo);
        //    this.SalvarEntidadesOrdenada(entidadesSalvar.ToList<d.IOrdenacao>());
        //    return true;

        //}

        //private AtualizarOrdenacaoDepois(): boolean
        //{
        //    let itemControleMovendo = this;
        //    let itemControleMouseEmCima = this.ItemControleMouseEmCima;
        //    let posicaoItemControleReferencia = this.ItensColecao.ItensControle.indexOf(itemControleMouseEmCima);

        //    let entidadeMovendo = this.EntidadeOrdenacao
        //    if (entidadeMovendo.Id == itemControleMouseEmCima.EntidadeOrdenacao.Id)
        //    {
        //        return false;
        //    }
        //    let entidadesSalvar = new Array<d.IEntidade>();

        //    let passo = this.Passo;
        //    if (!this.IsCrescente) passo *= -1;

        //    if (posicaoItemControleReferencia == (this.ItensColecao.ItensControle.Count - 1))
        //    {
        //        entidadeMovendo.Ordenacao = itemControleMouseEmCima.EntidadeOrdenacao.Ordenacao + passo;
        //    }
        //    else
        //    {
        //        let itemControleDepois = this.ItensColecao.ItensControle[posicaoItemControleReferencia + 1] as ItemControleOrdenacao;
        //        let itemControleAntes = itemControleMouseEmCima;
        //        let entidadeAntes = itemControleAntes.EntidadeOrdenacao;

        //        let entidadeDepois = itemControleDepois.EntidadeOrdenacao;
        //        if (entidadeDepois.Id == entidadeMovendo.Id)
        //        {
        //            return false;
        //        }
        //        let tempOrdenacaItem = entidadeMovendo.Ordenacao;
        //        let tempOrdenacaReferencia = entidadeAntes.Ordenacao;
        //        let tempOrdenacaoDepois = entidadeDepois.Ordenacao;

        //        let operador: (n1: number, n2: number) => boolean = (this.IsCrescente) ? u.Util.Maior : u.Util.Menor;
        //        if (operador(tempOrdenacaReferencia, tempOrdenacaoDepois))
        //        {
        //            return false;
        //        }
        //        if (entidadeAntes.Ordenacao === entidadeDepois.Ordenacao)
        //        {
        //            entidadeDepois.Ordenacao += passo;
        //            entidadesSalvar.Add(entidadeDepois)
        //        }
        //        if (this.IsCrescente)
        //        {
        //            entidadeMovendo.Ordenacao = entidadeAntes.Ordenacao + ((entidadeDepois.Ordenacao - entidadeAntes.Ordenacao) / 2.00);
        //        }
        //        else
        //        {
        //            entidadeMovendo.Ordenacao = entidadeDepois.Ordenacao - ((entidadeDepois.Ordenacao - entidadeAntes.Ordenacao) / 2.00);

        //        }


        //        if ($Configuracao.DEBUG)
        //        {
        //            if (this.IsCrescente)
        //            {
        //                if (!(entidadeMovendo.Ordenacao > entidadeAntes.Ordenacao &&
        //                    entidadeMovendo.Ordenacao < entidadeDepois.Ordenacao))
        //                {
        //                    throw new Erro("A controle deve ficar meio entre a referencia e depois");
        //                }
        //            }
        //            else
        //            {
        //                if (!(entidadeMovendo.Ordenacao < entidadeAntes.Ordenacao &&
        //                    entidadeMovendo.Ordenacao > entidadeDepois.Ordenacao))
        //                {
        //                    throw new Erro("A controle deve ficar meio entre a referencia e depois");
        //                }
        //            }
        //        }



        //    }
        //    entidadesSalvar.Add(entidadeMovendo);
        //    this.SalvarEntidadesOrdenada(entidadesSalvar.ToList<d.IOrdenacao>());
        //    return true;
        //}

        //#region adicionar e remover elemento clone

        private AdicionarElementoClone(e: MouseEvent)
        {
            if (!(this.ElementoClone instanceof HTMLElement))
            {
                this.ElementoClone = this.RetornarElementoClone(e);
            }
        }

        private RetornarElementoClone(e: MouseEvent): HTMLElement
        {
            const elementoOrigem = this.RetornarElementoOrigemClone();

            const posicoes = elementoOrigem.getBoundingClientRect();
            //let offset = ui.ElementoUtil.RetornarOffset(this.Elemento);

            this.DiferencaX = e.pageX - posicoes.left;
            this.DiferencaY = e.pageY - posicoes.top;

            const estilo = new Estilo({
                position: "absolute",
                display: "block",
                width: posicoes.width.ToPixels(),
                height: posicoes.height.ToPixels(),
                backgroundColor: this.RetornarBackgroundColor(),
                left: (e.pageX - this.DiferencaX).ToPixels(),
                top: (e.pageY - this.DiferencaY).ToPixels(),
                zIndex: (1000000).toString(),
                cursor: "grabbing"
            });

            const elementoClone = document.createElement(ItemControleOrdenacao.ITEM_MOVENDO);
            elementoClone.className = elementoOrigem.className;
            estilo.AplicarEm(elementoClone);
            elementoClone.innerHTML = elementoOrigem.outerHTML;
            elementoClone.classList.add("sn-item-lista-clone");
            elementoClone.classList.add(ItemControleOrdenacao.ITEM_MOVENDO);
            elementoClone.style.setProperty("cursor", "grabbing", "important");
            document.body.appendChild(elementoClone);

            return this.NormalizarOpcoesElementoClonagem(elementoClone);
        }

        private NormalizarOpcoesElementoClonagem(elementoClone: HTMLElement): HTMLElement
        {
            if (this.OpcoesElementoClonado.IsExisteCssClasse)
            {
                elementoClone.classList.add(this.OpcoesElementoClonado.CssClass);
            }

            if (this.OpcoesElementoClonado.IsNormalizarElemento)
            {
                return this.OpcoesElementoClonado.FuncaoNormalizarElemento(elementoClone);
            }
            return elementoClone;
        }

        protected RetornarElementoOrigemClone(): HTMLElement
        {
            return this.Elemento;
        }

        private RetornarBackgroundColor(): string
        {
            let elementoAtual = this.Elemento;
            while (elementoAtual != null)
            {
                const backgroundColor = window.getComputedStyle(elementoAtual).getPropertyValue("background-color");
                if (!String.IsNullOrWhiteSpace(backgroundColor) && backgroundColor !== "transparent")
                {
                    return backgroundColor;
                }
                elementoAtual = elementoAtual.parentElement;
            }

            const backgroundColor = window.getComputedStyle(document.body).getPropertyValue("background-color");
            if (!String.IsNullOrWhiteSpace(backgroundColor) && backgroundColor !== "transparent")
            {
                return backgroundColor;
            }
            return null;
        }

        private RemoverElementoClone(e?: MouseEvent)
        {
            if (this.ElementoClone instanceof HTMLElement)
            {
                if (this.OpcoesElementoClonado.IsNaoRemoverElementoCloneEmDebug)
                {
                    return;
                }

                if (e != null)
                {
                    this.ControleListaOrdenacao.EventoMovimentacaoFinalizada.
                        Notificar(this.ControleListaOrdenacao, new ItemControleMovendoEventArgs(this, this.ElementoClone, e));
                }

                this.ElementoClone.remove();
                //EstiloUtil.RemoverCssClasse(this.ElementoClone, "sn-item-lista-clone");
                //EstiloUtil.RemoverCssClasse(this.Elemento, "sn-item-lista-elemento-movendo");
                this.ElementoClone = null;
                delete this.ElementoClone;


            }
        }

        //#endregion

        private async SalvarEntidadesOrdenada(entidadesSalvar: List<d.IOrdenacaoEntidade>)
        {
            const tipoEntidade = entidadesSalvar.First().GetType() as r.TipoEntidade;
            if (u.ValidacaoUtil.IsFunction(this.MetodoSalvarEntidadesOrdenada))
            {
                this.MetodoSalvarEntidadesOrdenada(entidadesSalvar);
            }
            else
            {
                const contexto = $Aplicacao.RetornarContextoDados(tipoEntidade);
                //let entidadesClonada = entidadesSalvar.Select(x => x.CloneSomenteId<d.IOrdenacao>(x => x.Ordenacao));
                //let entidadesClonada = entidadesSalvar.Select(x => x.CloneSomenteId<d.IOrdenacao>().Ordenacao = x.Ordenacao);
                const entidadesClonada = new List<d.IOrdenacaoEntidade>();
                for (const entidadeSalvar of entidadesSalvar)
                {
                    const entidadeClonada = entidadeSalvar.CloneSomenteId<IOrdenacaoEntidade>();
                    entidadeClonada.Ordenacao = entidadeSalvar.Ordenacao;
                    entidadesClonada.Add(entidadeClonada);
                }
                const resultado = await contexto.SalvarAsync(entidadesClonada);
                if ($Configuracao.IsDebug && !resultado.IsSucesso)
                {
                    throw new Error("Não foi possível salvar");
                }
            }

        }


        //#region Salvar


        //#endregion

        public override Dispose(): void
        {
            this.RemoverElementoClone();
            super.Dispose();
        }
    }
}