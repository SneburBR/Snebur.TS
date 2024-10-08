﻿namespace Snebur.UI
{
    export abstract class ItemBlocoOrdenacao extends ItemBloco 
    {
        //#region Propriedades 
        public readonly ObjetoOrdenacao: d.IOrdenacao;

        private _elementoClone: HTMLElement;
        private __Window_TouchMove: (e: TouchEvent) => void;
        private _regioesBlocoOrdenacao: RegiaoBlocoOrdenacao[];
        private _regiaoBlocoAtual: RegiaoBlocoOrdenacao;
        private IdentificadorMouseDown: number;
        private _ultimoInfoMovimentacao: InfoMovimentacaoItemBloco;
        private IdentificadorTouchStart: number;
        private IsOrdenacaoAtiva: boolean;
        private EstiloPainelInicial: Estilo;
        private EstiloApresentacaoPainelInicial: Estilo;


        protected NextElementSibling: HTMLElement;

        private DiferencaX: number;
        private DiferencaY: number;

        protected get RegioesBlocoOrdenacao(): RegiaoBlocoOrdenacao[]
        {
            return this._regioesBlocoOrdenacao;
        }
        protected get RegiaoBlocoAtual(): RegiaoBlocoOrdenacao
        {
            return this._regiaoBlocoAtual;
        }

        public override get PainelLista(): PainelListaOrdenacao<any>
        {
            return this.ControlePai as PainelListaOrdenacao<any>;
        }

        //public get IsAnimarOrdenacao(): boolean
        //{
        //    return this.PainelLista.IsAnimarOrdenacao;
        //}

        public get ElementoClone(): HTMLElement
        {
            return this._elementoClone;
        }

        private IsElementoExisteAlvo: boolean = false;
        //#endregion

        //#region Inicialização

        public constructor(
            controlePai: PainelLista<any>,
            template: BlocoTemplate,
            itemReferencia: any,
            itemBlocoSeperador: ItemBlocoSeparador,
            objetoOrdenacao: d.IOrdenacao)
        {
            super(controlePai, template, itemReferencia, itemBlocoSeperador);

            this.ObjetoOrdenacao = objetoOrdenacao;
            this.ObjetoOrdenacao.AdicionarManipuladorPropriedadeAlterada(x => x.Ordenacao, this.Ordenacao_Alterada, this);
            this.EventoCarregado.AddHandler(this.ItemBlocoOrdenacao_Carregado, this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        private async ItemBlocoOrdenacao_Carregado(provedor: any, e: EventArgs) 
        {
            await u.ThreadUtil.EsperarAsync(200);
            if (this.IsControleInicializado)
            {
                this.InicializarEventosDom();
            }
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "AP-BLOCO-ORDENACAO";
        }


        private Ordenacao_Alterada(e: PropriedadeAlteradaEventArgs)
        {
            if (!this.IsOrdenacaoAtiva)
            {
                this.OrdenarElementos();
            }
        }

        //#endregion

        //#region Eventos do DOM

        private InicializarEventosDom()
        {
            this.__Window_TouchMove = this.Window_TouchMove.bind(this);

            const elementosAlvo = this.Elemento.querySelectorAll(`*[${AtributosHtml.IsAlvoOrdenacao.Nome}=true]`);
            /*this.Elemento.getElementsByClassName("sn-ordenacao-alvo");*/
            this.IsElementoExisteAlvo = elementosAlvo.length > 0;
            if (this.IsElementoExisteAlvo)
            {
                for (const elementoAlvo of Util.CopiarArray(elementosAlvo))
                {
                    if (elementoAlvo instanceof HTMLElement)
                    {
                        this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.ElementoAlvo_MouseDown, elementoAlvo, this);
                        this.AdicionarEventoDom(EnumEventoDom.TouchStart, this.ElementoAlvo_TouchStart, elementoAlvo, this);
                    }
                }
                CssClassUtil.AdicionarCssClasse(this.Elemento, "sn-alvo-global-desativado");
            }
            //else
            //{
            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.Elemento_MouseDown, this.Elemento, this, { passive: true, capture: true });
            this.AdicionarEventoDom(EnumEventoDom.TouchStart, this.Elemento_TouchStart, this);
            /*}*/
        }

        //#region Mouse

        private get IsCapturarElementoPrincipal()
        {
            return this.Elemento.getAttribute(AtributosHtml.IsElementoPrincipalAlvoOrdenacao.Nome) === "true";
        }

        private async Elemento_MouseDown(e: MouseEvent)
        {
            if (!e.IsBotaoEsquerdo || !this.PainelLista.IsAtivarOrdenacao)
            {
                return;
            }

            if (this.IsElementoExisteAlvo)
            {
                if (!this.IsCapturarElementoPrincipal)
                {
                    return;
                }
            }

            await ThreadUtil.QuebrarAsync();
            this.AdicionarEventoDom(EnumEventoDom.MouseLeave, this.Elemento_MouseLeave);
            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);
            this.IdentificadorMouseDown = window.setTimeout(this.IniciarOrdenacaoMouse.bind(this, e), 100);
            //this.IniciarOrdenacaoMouse(e);
        }

        private ElementoAlvo_MouseDown(e: MouseEvent)
        {
            if (!e.IsBotaoEsquerdo ||
                !this.PainelLista.IsAtivarOrdenacao)
            {
                return;
            }

            window.clearTimeout(this.IdentificadorMouseDown);
            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);
            /*window.setTimeout(this.IniciarOrdenacaoMouse.bind(this, e), 100);*/
            EstiloUtil.DefinirCursorGlogal("grabbing");

            this.IniciarOrdenacaoMouse(e);

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

        private Elemento_MouseLeave(e: MouseEvent)
        {
            window.clearTimeout(this.IdentificadorMouseDown);
        }

        private Window_MouseUp(e: MouseEvent)
        {
            window.clearTimeout(this.IdentificadorMouseDown);
            this._ultimoInfoMovimentacao = null;
            this.RemoverEventoDom(EnumEventoDom.MouseLeave, this.Elemento_MouseLeave);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);
            this.FinalizarOrdenacaoAsync(e);
            EstiloUtil.DefinirCursorGlogal("auto");
        }

        private IniciarOrdenacaoMouse(e: MouseEvent)
        {
            if (e.IsCancelado)
            {
                return;
            }

            if (this.IsMouseEmCimaDoElemento(e.clientX, e.clientY))
            {
                this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);
                this.IniciarOrdenacaoInterno(e.clientX, e.clientY, e);
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }

        private Window_MouseMove(e: MouseEvent)
        {
            this.Movimentar(e.clientX, e.clientY, e);

            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            e.cancelBubble = true;
            e.returnValue = false;
        }

        //#endregion

        //#region Touch

        private Elemento_TouchStart(e: TouchEvent)
        {
            if (e.touches.length === 1)
            {
                this.IdentificadorTouchStart = window.setTimeout(this.IniciarOrdenacaoTouch.bind(this, e), 200);
                this.AdicionarEventoDomGlobal(EnumEventoDom.TouchEnd, this.Window_TouchEnd);
                //e.preventDefault();
            }
        }

        private ElementoAlvo_TouchStart(e: TouchEvent)
        {
            if (!this.PainelLista.IsAtivarOrdenacao)
            {
                return;
            }

            if (e.touches.length === 1)
            {
                window.clearTimeout(this.IdentificadorTouchStart);
                this.AdicionarEventoDomGlobal(EnumEventoDom.TouchEnd, this.Window_TouchEnd);
                this.IniciarOrdenacaoTouch(e);
                EstiloUtil.DefinirCursorGlogal("grabbing");
            }
        }


        private IniciarOrdenacaoTouch(e: TouchEvent)
        {
            if (e.touches.length === 1)
            {
                const touch = e.touches[0];
                if (this.IsMouseEmCimaDoElemento(touch.clientX, touch.clientY))
                {
                    //this.AdicionarEventoDomGlobal(EnumEventoDom.TouchMove, this.Window_TouchMove);
                    document.addEventListener("touchmove", this.__Window_TouchMove, { passive: false });
                    this.IniciarOrdenacaoInterno(touch.clientX, touch.clientY, e);

                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    e.cancelBubble = true;
                    e.returnValue = false;
                }
            }
        }

        private Window_TouchEnd(e: TouchEvent)
        {
            window.clearTimeout(this.IdentificadorTouchStart);

            document.removeEventListener("touchmove", this.__Window_TouchMove);

            this.RemoverEventoDomGlobal(EnumEventoDom.TouchEnd, this.Window_TouchEnd);
            //this.RemoverEventoDomGlobal(EnumEventoDom.TouchMove, this.Window_TouchMove);
            this.FinalizarOrdenacaoAsync(e);
            EstiloUtil.DefinirCursorGlogal("auto");
        }

        private Window_TouchMove(e: TouchEvent)
        {
            if (e.touches.length === 1)
            {
                const touch = e.touches[0];
                this.Movimentar(touch.clientX, touch.clientY, e);

                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
                e.cancelBubble = true;
                e.returnValue = false;
            }

        }

        //#endregion

        //#endregion

        //#region Ordenação 
        private IniciarOrdenacaoInterno(posicaoX: number, posicaoY: number, eventoNativo: TouchEvent | MouseEvent)
        {
            if (!this.IsOrdenacaoAtiva)
            {
                this.IsOrdenacaoAtiva = true;
                this._ultimoInfoMovimentacao = null;
                this.IniciarOrdenacao(posicaoX, posicaoY, eventoNativo);
            }
        }

        protected IniciarOrdenacao(posicaoX: number, posicaoY: number, eventoNativo: TouchEvent | MouseEvent)
        {
            const regiaoPainel = this.PainelLista.ElementoApresentacao.getBoundingClientRect();
            this.ClonarElemento(posicaoX, posicaoY);
            this.Elemento.style.opacity = "0";

            EstiloUtil.DefinirCursorGlogal("grabbing");
            this.AplicarEstiloPainel(regiaoPainel);

            this._regioesBlocoOrdenacao = this.RetornarRegioesBloco(regiaoPainel);
            this._regiaoBlocoAtual = this.RegioesBlocoOrdenacao.Where(x => x.ItemBlocoOrdenacao === this).Single();
            this.NextElementSibling = this.Elemento.nextElementSibling as HTMLElement;

            for (const regiao of this.RegioesBlocoOrdenacao)
            {
                regiao.Inicializar();
            }

            this.PainelLista.EventoBlocoOrdenacaoIniciada.Notificar(this,
                new BlocoOrdenacaoEventArgs(
                    this,
                    this.ObjetoOrdenacao,
                    this.ElementoClone,
                    eventoNativo));
        }

        private RetornarRegioesBloco(regiaoPainel: DOMRect): List<RegiaoBlocoOrdenacao>
        {
            this.DispensarRegioesBlocoOrdenacao();

            const itensBloco = this.RetornarItensBlocoOrdenados();
            const regioesBlocoOrdenados = new List<RegiaoBlocoOrdenacao>();
            for (const [itemBloco, indice] of itensBloco.ToTupleItemIndex())
            {
                const regiaoBloco = this.RetornarRegiaoBloco(itemBloco, regiaoPainel, indice);
                regioesBlocoOrdenados.Add(regiaoBloco);
            }
            return regioesBlocoOrdenados;
        }

        protected abstract RetornarRegiaoBloco(itemBloco: ItemBlocoOrdenacao, regiaoPainel: DOMRect, indice: number): RegiaoBlocoOrdenacao;

        private RetornarItensBlocoOrdenados(): List<ItemBlocoOrdenacao>
        {
            const itensBloco = this.PainelLista.ItensBloco;
            if (this.PainelLista.SentidoOrdenacao === EnumSentidoOrdenacao.Crescente)
            {
                return itensBloco.OrderBy(x => x.ObjetoOrdenacao.Ordenacao);
            }
            else
            {
                /*return itensBloco.OrderBy(x => x.ObjetoOrdenacao.Ordenacao);*/
                return itensBloco.OrderByDescending(x => x.ObjetoOrdenacao.Ordenacao);
                /*throw new Erro("Não testando ainda");*/
            }
        }

        private Movimentar(
            posicaoX: number,
            posicaoY: number,
            eventoNativo: MouseEvent | TouchEvent)
        {
            this._ultimoInfoMovimentacao = {
                PosicaoX: posicaoX,
                PosicaoY: posicaoY,
                EventoNativo: eventoNativo,
            };

            if (this.RegioesBlocoOrdenacao == null)
            {
                return;
            }

            if (this.IsOrdenacaoAtiva)
            {
                const elementoClone = this.ElementoClone;
                const regiaoElementoClone = elementoClone.getBoundingClientRect();
                const estilo = new Estilo({
                    left: (posicaoX - this.DiferencaX).ToPixels(),
                    top: (posicaoY - this.DiferencaY).ToPixels(),
                });
                estilo.AplicarEm(elementoClone);

                const blocosCapturados = new List<RegiaoBlocoPorcentagem>();
                for (const regiao of this.RegioesBlocoOrdenacao)
                {
                    if (regiao.ItemBlocoOrdenacao !== this)
                    {
                        regiao.OrdenacaoDestino = null;
                        regiao.AtualizarRegiaoOrigem();
                    }

                    const porcentagem = ElementoAreaUtil.RetornarPorcentagemAreaSobreRegiao(
                        regiaoElementoClone,
                        regiao.RegiaoOrigem);

                    if (porcentagem > 0)
                    {
                        blocosCapturados.Add({
                            RegiaoBlocoOrdenacao: regiao,
                            Porcentagem: porcentagem,
                        });
                    }

                    if (blocosCapturados.Count === 0 && this.RegioesBlocoOrdenacao.Count > 1)
                    {
                        const blocoRegiaoBlocoExtermidade = RegiaoItemBlocoOrdenacaoUtil.
                            RetornarRegicoesBlocoInicioOuFinal(
                                this.PainelLista.OrientacaoPainel,
                                regiaoElementoClone,
                                this.RegioesBlocoOrdenacao.First(),
                                this.RegioesBlocoOrdenacao.Last());

                        if (blocoRegiaoBlocoExtermidade != null)
                        {
                            blocosCapturados.Add({
                                RegiaoBlocoOrdenacao: blocoRegiaoBlocoExtermidade,
                                Porcentagem: 100,
                            });
                        }
                    }
                }

                //this.RegiaoBlocoAtual.P
                if (blocosCapturados.Count > 0 &&
                    blocosCapturados.Sum(x => x.Porcentagem) > 50)
                {
                    this.SimularOrdenacao(
                        blocosCapturados,
                        regiaoElementoClone,
                        this._ultimoInfoMovimentacao);
                }

                this.PainelLista.EventoBlocoOrdenacaoMovimentando.Notificar(this,
                    new BlocoOdernacaoMovimentandoEventArgs(this,
                        this.ObjetoOrdenacao,
                        elementoClone,
                        eventoNativo,
                        blocosCapturados,
                    ));

                if ($Configuracao.IsDebug)
                {
                    const elementoTemp = this.ElementoClone.querySelector("info-temp");
                    if (elementoTemp instanceof HTMLElement)
                    {
                        const infos = blocosCapturados.Select(x => `${FormatacaoUtil.FormatarPorcentagem(x.Porcentagem)}`);
                        elementoTemp.innerHTML = String.Join("<br />", infos);
                    }
                }
            }
        }

        protected AnalisarMousePadrado(infoMovimentacao: InfoMovimentacaoItemBloco)
        {
            if (this._ultimoInfoMovimentacao != null &&
                this._ultimoInfoMovimentacao.PosicaoX === infoMovimentacao.PosicaoX &&
                this._ultimoInfoMovimentacao.PosicaoY === infoMovimentacao.PosicaoY)
            {
                this.Movimentar(
                    infoMovimentacao.PosicaoX,
                    infoMovimentacao.PosicaoY,
                    infoMovimentacao.EventoNativo);
            }

        }
        protected abstract SimularOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>, regiaoElementoCloente: DOMRect, infoMovimentacao: InfoMovimentacaoItemBloco): void;

        private async FinalizarOrdenacaoAsync(eventoNativo: MouseEvent | TouchEvent)
        {
            if (this.IsOrdenacaoAtiva)
            {
                await this.MoverElementoClonadoDestinoAsync();

                this.Ordernar(eventoNativo);
            }

            this.DispensarRegioesBlocoOrdenacao();
            this.RemoverEstiloPainel();

            delete this._regioesBlocoOrdenacao;
            delete this._regiaoBlocoAtual;

            this.RemoverElementoClonado();

            this.Elemento.style.opacity = "1";
            EstiloUtil.DefinirCursorGlogal("auto");
            this.IsOrdenacaoAtiva = false;

            this.PainelLista.EventoBlocoOrdenacaoFinalizada.Notificar(this,
                new BlocoOrdenacaoEventArgs(
                    this,
                    this.ObjetoOrdenacao,
                    this.ElementoClone,
                    eventoNativo));
        }

        private AplicarEstiloPainel(regiaoPainel: DOMRect): void
        {
            const elementoPainel = this.PainelLista.Elemento;
            const elementoApresentacaoPainel = this.PainelLista.ElementoApresentacao;
            elementoPainel.classList.add(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            this.Elemento.classList.add(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);

            this.EstiloPainelInicial = new Estilo({
                width: elementoPainel.style.width,
                height: elementoPainel.style.height,
            });

            this.EstiloApresentacaoPainelInicial = new Estilo({
                width: elementoApresentacaoPainel.style.width,
                height: elementoApresentacaoPainel.style.height,
            });

            const estilo = new Estilo({
                width: regiaoPainel.width.ToPixels(),
                height: regiaoPainel.height.ToPixels(),
            });

            estilo.AplicarEm(elementoPainel);
            estilo.AplicarEm(elementoApresentacaoPainel);
        }

        private RemoverEstiloPainel(): void
        {
            this.PainelLista.Elemento.classList.remove(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            this.Elemento.classList.remove(ConstantesOrdenacao.CSS_CLASS_ORDENACAO_ATIVA);
            this.EstiloPainelInicial?.AplicarEm(this.PainelLista.Elemento);
            this.EstiloApresentacaoPainelInicial?.AplicarEm(this.PainelLista.ElementoApresentacao);

            delete this.EstiloPainelInicial;
        }

        //#endregion

        //#region Nova Ordenação

        protected RetornarNovaOrdenacao(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            if (blocosCapturados.Count > 0 && blocosCapturados.Sum(x => x.Porcentagem) > 50)
            {
                if (this.PainelLista.SentidoOrdenacao === EnumSentidoOrdenacao.Crescente)
                {
                    return this.RetornarNovaOrdenacaoCrescente(blocosCapturados);
                }
                else
                {
                    return this.RetornarNovaOrdenacaoDecrescente(blocosCapturados);
                }
            }
            return this.ObjetoOrdenacao.Ordenacao;
        }

        private RetornarNovaOrdenacaoCrescente(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            blocosCapturados = blocosCapturados.OrderByDescending(x => x.Porcentagem);
            const regiaoBlocoCapturado = blocosCapturados.First().RegiaoBlocoOrdenacao;

            /*eslint-disable*/
            if (regiaoBlocoCapturado.ItemBlocoOrdenacao == this)
            {
                return this.ObjetoOrdenacao.Ordenacao;
            }
            /*eslint-enable*/
            if (regiaoBlocoCapturado.OrdenacaoOrigem >= this.ObjetoOrdenacao.Ordenacao)
            {
                // ultimo posição
                if (regiaoBlocoCapturado.IndiceOrigem === this.RegioesBlocoOrdenacao.length - 1)
                {
                    return regiaoBlocoCapturado.OrdenacaoOrigem + this.PainelLista.Passo;
                }

                const proximaOrdenacao = this.RegioesBlocoOrdenacao[regiaoBlocoCapturado.IndiceOrigem + 1].OrdenacaoOrigem;
                const novaOrdenacaoProxima = regiaoBlocoCapturado.OrdenacaoOrigem + ((proximaOrdenacao - regiaoBlocoCapturado.OrdenacaoOrigem) / 2);
                return novaOrdenacaoProxima;
            }
            else
            {
                //primeiro
                if (regiaoBlocoCapturado.IndiceOrigem === 0)
                {
                    return regiaoBlocoCapturado.OrdenacaoOrigem - this.PainelLista.Passo;
                }
                const ordenacaoAnterior = this.RegioesBlocoOrdenacao[regiaoBlocoCapturado.IndiceOrigem - 1].OrdenacaoOrigem;
                const novaOrdenacaoAnterior = regiaoBlocoCapturado.OrdenacaoOrigem - ((regiaoBlocoCapturado.OrdenacaoOrigem - ordenacaoAnterior) / 2);
                return novaOrdenacaoAnterior;
            }
        }

        private RetornarNovaOrdenacaoDecrescente(blocosCapturados: List<RegiaoBlocoPorcentagem>): number
        {
            throw new Error("Method not implemented.");
        }

        //#endregion

        //#region Ordenação Elementos

        private OrdenarElementos(): void
        {
            const itensBloco = this.RetornarItensBlocoOrdenados();
            this.OrdenarElementosInterno(itensBloco, 0);
        }

        private OrdenarElementosInterno(itensBloco: List<ItemBlocoOrdenacao>, contador: number)
        {
            const elementos = Util.CopiarArray(this.PainelLista.ElementoApresentacao.childNodes).
                OfType(HTMLElement).Where(x => x.tagName === "AP-BLOCO-ORDENACAO");


            if (itensBloco.length !== elementos.length)
            {
                throw new Erro(`O painel lista ordenação suportada bloco template separador em ${this.ControleApresentacao.___NomeConstrutor} `);
            }

            for (let i = 0; i < itensBloco.length; i++)
            {
                const itemBloco = itensBloco[i];
                const elemento = elementos[i];

                if (itemBloco.Elemento !== elemento)
                {
                    itemBloco.Elemento.parentElement.insertBefore(
                        itemBloco.Elemento,
                        elemento);

                    this.OrdenarElementosInterno(itensBloco,
                        contador + 1);
                    break;
                }
            }

            if (contador > elementos.length)
            {
                throw new Erro(`não foi possível ordenar os elementos`);
            }
        }

        //#endregion

        //#region Reordenação

        private Ordernar(eventoNativo: MouseEvent | TouchEvent): void
        {
            if (this.RegiaoBlocoAtual != null && this.RegiaoBlocoAtual.NovaOrdenacao !== this.ObjetoOrdenacao.Ordenacao)
            {
                if (this.PainelLista.SentidoOrdenacao === EnumSentidoOrdenacao.Crescente)
                {
                    this.OrdernarCrescente();
                }
                else
                {
                    this.OrdernarDecrescente();
                }

                this.PainelLista.EventoBlocoOrdenacaoAlterada.Notificar(this,
                    new BlocoOrdenacaoEventArgs(this,
                        this.ObjetoOrdenacao,
                        this.ElementoClone,
                        eventoNativo));
            }
        }

        private OrdernarCrescente(): void
        {
            const elementoDestino = this.Elemento.parentElement;
            const elementoOrdenado = this.Elemento;
            elementoOrdenado.remove();

            const regioesOrdenadas = this.RegioesBlocoOrdenacao.OrderBy(x => x.NovaOrdenacao);
            for (const [regiao, indice] of regioesOrdenadas.ToTupleItemIndex())
            {
                /*eslint-disable*/
                if (regiao.ItemBlocoOrdenacao == this)
                {
                    if (indice == (regioesOrdenadas.length - 1))
                    {
                        elementoDestino.appendChild(elementoOrdenado);
                    }
                    else
                    {
                        let elementoDepois = regioesOrdenadas[indice + 1].ItemBlocoOrdenacao.Elemento;
                        elementoDestino.insertBefore(elementoOrdenado, elementoDepois)
                    }
                    break;
                }
                /*eslint-enable*/
            }

            this.ObjetoOrdenacao.Ordenacao = this.RegiaoBlocoAtual.NovaOrdenacao;
            this.SalvarEntidadeOrdenacaoAsync();
        }

        private OrdernarDecrescente()
        {
            throw new Error("Method not implemented.");
        }

        //#endregion

        //#region Salvar entidade

        private SalvarEntidadeOrdenacaoAsync()
        {
            if (this.ObjetoOrdenacao instanceof Entidade &&
                this.PainelLista.IsSalvarOrdenacaoAutomaticamente)
            {
                const contexto = $Aplicacao.RetornarContextoDados(this.ObjetoOrdenacao.GetType() as r.TipoEntidade);
                contexto.SalvarPropriedadesAsync(this.ObjetoOrdenacao, x => (x as IOrdenacao).Ordenacao);
            }
        }

        //#endregion

        //#region Clone 

        private ClonarElemento(posicaoX: number, posicaoY: number): void
        {
            if (this.ElementoClone == null)
            {
                this._elementoClone = this.RetornarElementoClone(posicaoX, posicaoY);
            }
        }

        private RetornarElementoClone(posicaoX: number, posicaoY: number): HTMLElement
        {
            const elementoOrigem = this.Elemento;
            const posicoes = elementoOrigem.getBoundingClientRect();
            //let offset = ui.ElementoUtil.RetornarOffset(this.Elemento);
            this.DiferencaX = posicaoX - posicoes.left;
            this.DiferencaY = posicaoY - posicoes.top;


            const estilo = new Estilo({
                position: "fixed",
                display: "block",
                width: posicoes.width.ToPixels(),
                height: posicoes.height.ToPixels(),
                backgroundColor: this.RetornarBackgroundColor(),
                left: (posicaoX - this.DiferencaX).ToPixels(),
                top: (posicaoY - this.DiferencaY).ToPixels(),
                zIndex: (Number.Int32MaxValue).toString(),
                cursor: "grabbing",
            });

            const elementoCloneInterno = elementoOrigem.cloneNode(true) as HTMLElement;

            if (this.PainelLista.IsCloneGlobal)
            {
                CloneElementoUtil.CopiarEstilosComputados(elementoOrigem, elementoCloneInterno);
            }

            elementoCloneInterno.style.position = "relative";
            elementoCloneInterno.style.left = String.Empty;
            elementoCloneInterno.style.top = String.Empty;
            elementoCloneInterno.style.right = String.Empty;
            elementoCloneInterno.style.bottom = String.Empty;

            const elementoClone = document.createElement(ConstantesOrdenacao.CSS_CLASS_BLOCO_MOVIMENTANDO);
            elementoClone.className = elementoOrigem.className;

            //if ($Configuracao.IsDebug)
            //{
            //    const estiloTemp = new Estilo(estilo);
            //    estiloTemp.top = "50%";
            //    estiloTemp.left = "50%";
            //    estiloTemp.transform = "translate(-50%, -50%)";
            //    estiloTemp.color = "yellow";
            //    estiloTemp.fontSize = "30px";
            //    estiloTemp.background = "black";
            //    estiloTemp.width = "auto";
            //    estiloTemp.height = "auto";
            //    const elementoTemo = document.createElement("info-temp");

            //    estiloTemp.AplicarEm(elementoTemo);
            //    elementoTemo.innerHTML = "0%";
            //    elementoClone.appendChild(elementoTemo);
            //    estilo.border = "2px solid red";
            //}

            estilo.AplicarEm(elementoClone);
            elementoClone.appendChild(elementoCloneInterno);
            elementoClone.classList.add("sn-painel-lista-ordenacao-item-clone-clonado");

            if (this.PainelLista.IsCloneGlobal)
            {
                document.body.appendChild(elementoClone);
            }
            else
            {
                const destino = this.RetornarElementoDestino();
                destino.appendChild(elementoClone);
            }
            return elementoClone;
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
            return String.Empty;
        }

        private async MoverElementoClonadoDestinoAsync(): Promise<void>  
        {
            if (!(this.ElementoClone instanceof HTMLElement))
            {
                return;
            }

            const elementoDestino = this.RetornarDestinoElementoClone();
            const elementoClone = this.ElementoClone;


            const estilo = new Estilo({
                transitionDuration: "0.15s",
                transitionProperty: "all"
            });

            estilo.AplicarEm(elementoClone);
            await ThreadUtil.QuebrarAsync();

            const posicao = elementoDestino.getBoundingClientRect();
            elementoClone.style.left = posicao.left.ToPixels();
            elementoClone.style.top = posicao.top.ToPixels();
            await ThreadUtil.EsperarAsync(150);
        }

        private RemoverElementoClonado()
        {
            this._elementoClone?.remove();
            this._elementoClone = undefined;
            delete this._elementoClone;
        }


        private RetornarDestinoElementoClone(): HTMLElement
        {
            return this.Elemento;
        }

        private DispensarRegioesBlocoOrdenacao(): void
        {
            this.RegioesBlocoOrdenacao?.ForEach(x => x.Dispose());
            this.RegioesBlocoOrdenacao?.Clear();
        }

        //#endregion

        public override Dispose(): void
        {
            this.DispensarRegioesBlocoOrdenacao();
            this.ObjetoOrdenacao.RemoverManipuladorPropriedadeAlterada(x => x.Ordenacao, this.Ordenacao_Alterada, this);
            super.Dispose();
        }
    }

    export class ConstantesOrdenacao
    {
        public static readonly CSS_CLASS_ORDENACAO_ATIVA = "sn-ordenacao-ativa";
        public static readonly CSS_CLASS_BLOCO_MOVIMENTANDO = "ap-bloco-movimentando";
    }

    export interface InfoMovimentacaoItemBloco
    {
        readonly PosicaoX: number,
        readonly PosicaoY: number;
        readonly EventoNativo: MouseEvent | TouchEvent
    }
}
