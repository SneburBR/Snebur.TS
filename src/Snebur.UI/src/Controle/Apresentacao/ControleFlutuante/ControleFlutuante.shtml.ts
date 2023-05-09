namespace Snebur.UI
{
    export abstract class ControleFlutuante extends ControleApresentacao implements IControleMovimentacao
    {
        //#region Propriedades

        private _titulo: string = String.Empty;
        private _elementoRelativo: HTMLElement;
        private _elementoConteudoInterno: HTMLElement;
        private _isAberto: boolean = false;
        private _destinoControleFlutuante: EnumDestinoControleFlutuante = EnumDestinoControleFlutuante.Inferior;
        private _isPosicaoAtualizada: boolean = false;

        protected override readonly __isControleZIndex: boolean = true;

        protected get DiferencaPosicaoX(): number { return 0; }
        protected get DiferencaPosicaoY(): number { return 0; }

        public readonly OpcoesControleFlutuante = new OpcoesControleFlutuante();
        private Movimentacao: MovimentarControle

        public readonly ControlesCliqueNaoFechar = new Array<BaseControle>();
        public readonly ElementosCliqueNaoFechar = new Array<HTMLElement>();
        public readonly EventoFechou = new Evento<ui.FechouControleFlutanteEventArgs>(this);
        public readonly EventoMostrou = new Evento<ui.MostrouControleFlutanteEventArgs>(this);
        private readonly AtualizarPosicaoDepois = new ExecutarDepois(this.AtualizarPosicaoAsync.bind(this), 250);

        protected get LarguraInicial(): number
        {
            if (this.LarguraApresentacao.IsVazio || this.LarguraApresentacao.Valor <= 0)
            {
                console.error(`A largura do controle flutuante '${this.___NomeConstrutor}' não foi definida`);
            }
            return this.LarguraApresentacao.Valor;
        }

        protected get AlturaInicial(): number
        {
            if (this.AlturaApresentacao.IsVazio || this.AlturaApresentacao.Valor <= 0)
            {
                console.error(`A altura do controle flutuante '${this.___NomeConstrutor}' não foi definida`);
            }
            return this.AlturaApresentacao.Valor;

        }

        public get Largura(): number
        {
            if (this.Elemento instanceof HTMLElement)
            {
                return EstiloUtil.RetornarValorPixel(this.Elemento.style.width);
            }
            return 0;
        }
        public set Largura(value: number)
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.width = value.ToPixels();
            }
        }

        public get Altura(): number
        {
            if (this.Elemento instanceof HTMLElement)
            {
                return EstiloUtil.RetornarValorPixel(this.Elemento.style.height);
            }
            return 0;
        }
        public set Altura(value: number)
        {
            if (this.Elemento instanceof HTMLElement)
            {
                this.Elemento.style.height = value.ToPixels();
            }
        }

        public get ElementoRelativo(): HTMLElement
        {
            if (u.ValidacaoUtil.IsElementoHtml(this._elementoRelativo))
            {
                return this._elementoRelativo;
            }
            return this.RetornarElementoRelativo();
        }

        public set ElementoRelativo(value: HTMLElement)
        {
            this._elementoRelativo = value;
        }

        public get IsAberto(): boolean
        {
            return this._isAberto;
        }

        public get Titulo(): string
        {
            return this._titulo;
        }
        public set Titulo(value: string)
        {
            this._titulo = value;
            this.AtualizarTitulo();
        }

        public get JanelaPai(): Janela
        {
            return this.RetornarControlePai(Janela, false, true);
        }

        public get ElementoConteudoInterno(): HTMLElement
        {
            return this._elementoConteudoInterno;
        }

        public get DestinoControleFlutuante(): EnumDestinoControleFlutuante
        {
            const destino = this.RetornarDestinoControleFlutuante();
            if (u.EnumUtil.IsDefindo(EnumDestinoControleFlutuante, destino))
            {
                return destino;
            }
            return this._destinoControleFlutuante;
        }

        public set DestinoControleFlutuante(value: EnumDestinoControleFlutuante)
        {
            if (u.EnumUtil.IsDefindo(EnumDestinoControleFlutuante, value))
            {
                this._destinoControleFlutuante = value;
            }
        }

        public override get ElementoApresentacao(): HTMLElement
        {
            if (this.ElementoConteudoInterno instanceof HTMLElement)
            {
                return this.ElementoConteudoInterno.ElementoApresentacao;
            }
            return this.Elemento.ElementoApresentacao;
        }

        public get ElementoScroll(): HTMLElement
        {
            return ScrollUtil.RetornarElementoScrollVerticalPai(this.ElementoRelativo);
        }

        private TempoAbrirControle: Stopwatch;

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, elemento: HTMLElement);
        public constructor(controlePai: BaseControle, idElemento: string);
        public constructor(controlePai: BaseControle, elemento: string | HTMLElement);
        public constructor(controlePai: BaseControle, refElemento?: string | HTMLElement)
        {
            super(controlePai, refElemento);

            /*this.DestinoControleFlutuante = EnumDestinoControleFlutuante.Inferior;*/
            //this.MargemDoElementoRelativo = new d.Margem(0, 0, 0, 0);

            this.CssClasseControle = "sn-controle-flutuante";
            this.CssClasseControle = "sn-nao-selecionar";
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.InicializarAtributosExclusivo();
            if (this.OpcoesControleFlutuante.IsMoverControleFlutuante)
            {
                this.AdicionarMovimentacaoControleFlutuante();

            }
            this.AtualizarTitulo();

            window.EventoStopPropagation?.AddHandler(this.Window_StopProgration, this);
            this.AdicionarEventoDomGlobal(EnumEventoDom.Resize, this.Window_Resize, this);
            this.EventoTelaAlterada?.AddHandler(this.ControleFlutuante_TelaAlterada, this);
            this.JanelaPai?.EventoPosicaoAlterada.AddHandler(this.JanelaPai_PosicaoAlterada, this);
            this.JanelaPai?.EventoPosicaoAlterada.AddHandler(this.JanelaPai_PosicaoAlterada, this);
            ThreadUtil.ExecutarAsync(this.ManipularScrollsGlobal.bind(this), 200);
        }

        public override InicializarControle()
        {
            super.InicializarControle();
            super.OcultarElemento();
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "SN-CONTROLE-FLUTUANTE";
        }

        private InicializarAtributosExclusivo(): void
        {
            const valorAtributoDestino = this.RetornarValorAtributo(AtributosHtml.DestinoControleFlutuante, null);
            if (valorAtributoDestino != null)
            {
                this.DestinoControleFlutuante = u.EnumUtil.RetornarValor(ui.EnumDestinoControleFlutuante, valorAtributoDestino);
            }

            //const valorAtributoLargura = this.RetornarValorAtributo(AtributosHtml.LarguraZS, null);
            //const valorAtributoAltura = this.RetornarValorAtributo(AtributosHtml.AlturaZS, null);
            //if (valorAtributoLargura != null)
            //{
            //    (this as any).Largura = u.ConverterUtil.ParaNumero(valorAtributoLargura);
            //}

            //if (valorAtributoAltura != null)
            //{
            //    (this as any).Altura = u.ConverterUtil.ParaNumero(valorAtributoAltura);
            //}
        }

        protected override RetornarHtmlInterno(): string
        {
            const htmlInterno = (this.GetType() === ControleFlutuante.GetType()) ? String.Empty : HtmlReferenciaUtil.RetornarHtml(this);
            const opcoes = this.OpcoesControleFlutuante;
            if (opcoes.IsFlutuante && opcoes.IsMostrarPainelAcoes)
            {
                const htmlControleFlutuante = HtmlReferenciaUtil.RetornarHtml(ControleFlutuante.GetType() as r.TipoUIHtml);
                const procurar = "[[CONTEUDO_INTERNO]]";
                const posicao = htmlControleFlutuante.indexOf(procurar);
                const sb = new StringBuilder();
                sb.AppendLine(htmlControleFlutuante.substring(0, posicao));
                sb.AppendLine(htmlInterno);
                sb.AppendLine(htmlControleFlutuante.substring(posicao + procurar.length, htmlControleFlutuante.length));
                return sb.ToString();
            }
            return htmlInterno;
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            this.Elemento.setAttribute(AtributosHtml.NaoEntrarArvore.Nome, "true");
            this.Elemento.setAttribute(AtributosHtml.IsControleFlutuante.Nome, "true");

            if (this.OpcoesControleFlutuante.IsMostrarPainelAcoes)
            {
                this._elementoConteudoInterno = this.RetornarItemElemento("ConteudoInterno");
            }
        }

        protected RetornarElementoRelativo(): HTMLElement
        {
            return (this.ControlePai instanceof BaseControleFormulario) ?
                this.ControlePai.ElementoInput :
                this.ControlePai.Elemento;
        }

        protected RetornarDestinoControleFlutuante(): EnumDestinoControleFlutuante
        {
            return null;
        }

        protected override RetornarElementoDestino(): HTMLElement
        {
            return ControleUtil.RetornarElementoDestinoFlutuante(this);
        }

        //#endregion


        //#region Métodos sobre escritos

        private AtualizarTitulo(): void
        {
            if (this.TextoTitulo && this.TextoTitulo.ElementoApresentacao instanceof HTMLElement)
            {
                this.TextoTitulo.ElementoApresentacao.innerHTML = this.Titulo;
            }
        }



        public Mostrar(args?: HTMLElement | BaseUIElemento | MouseEvent): void
        {
            /*eslint-disable*/
            this.DefinirElementoRelativo(args, arguments);
            /*eslint-enable*/


            this.TempoAbrirControle = Stopwatch.StartNew();
            if (this.IsAberto && this.OpcoesControleFlutuante.IsAtualizarPosicaoAoMostrar)
            {
                this.AtualizarPosicaoAsync("mostrar this.IsAberto");
                return;
            }

            if (this.IsDispensado)
            {
                throw new Erro("Controle   dispensado");
            }

            if (!this.IsControleInicializado)
            {
                this.InicializarControle();
            }

            if (this.OpcoesControleFlutuante.IsFecharCliqueForaDoControle)
            {
                this.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseDown, this.Window_MouseDown);
            }

            this._isAberto = true;
            super.MostrarElemento();

           

            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAoMostrar  )
            {
            this.AtualizarPosicaoAsync("Mostrar");
            }

            this.EventoMostrou.Notificar(this, new MostrouControleFlutanteEventArgs(this));
            this.NotificarControleCarregado();
            this.FocusPrimeiraCaixaTexto();

            EstiloUtil.IncrementarControleFlutuanteZIndex(this);

            //this.AdicionarEventoDomGlobal(ui.EnumEventoDom.Scroll, this.ElementoScroll_Scroll, elementoScroll);
        }

        private DefinirElementoRelativo(args: any, argumentos: IArguments): any
        {
            if (args instanceof HTMLElement)
            {
                this._elementoRelativo = args;
            }
            else if (args instanceof BaseUIElemento)
            {
                this._elementoRelativo = args.Elemento;
            }
            else if (args instanceof Event && args.target instanceof HTMLElement)
            {
                this._elementoRelativo = args.target;
            }
            else
            {
                if (argumentos.length > 0)
                {
                    const refElemento = argumentos[0];
                    const elemento = (refElemento instanceof BaseUIElemento) ? refElemento.Elemento : refElemento;
                    if (elemento instanceof HTMLElement)
                    {
                        this._elementoRelativo = elemento;
                    }
                }
            }
        }

        public override MostrarElemento(): void
        {
            /*super.MostrarElemento();*/
        }

        public override OcultarElemento()
        {
            this._isAberto = false;
            super.OcultarElemento();
        }

        public Fechar(isSucesso: boolean = false): void
        {
            if (this._isAberto)
            {
                this._isAberto = false;
                super.OcultarElemento();

                if (!this.IsReiniciando)
                {
                    this.EventoFechou?.Notificar(this, new FechouControleFlutanteEventArgs(this, isSucesso));
                }
                this.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseDown, this.Window_MouseDown);
            }
        }

        //#ednregion

        //#region Movimentação

        private AdicionarMovimentacaoControleFlutuante(): void
        {
            this.Movimentacao = new MovimentarControle(this);
            this.Movimentacao.Inicializar();
        }

        public RetornarElementoAlvoMovimentacao(): HTMLElement
        {
            if ($Configuracao.IsDebug && !this.OpcoesControleFlutuante.IsMostrarPainelAcoes)
            {
                if (!this.PainelBarraMovimentacao?.IsVisivel)
                {
                    console.error(`O controle flutuante não pode ser movimento, pois a barra de ações não está ativo,
                                   SobreEscreva o método RetornarElementoAlvoMovimentacao ou ative a propriedade
                                   this.OpcoesControleFlutuante.IsMostrarPainelAcoes = true,
                                   '${this.___NomeConstrutor}' em '${this.ControlePai.ControleApresentacao.___NomeConstrutor}' `);
                }
            }
            return this.PainelBarraMovimentacao?.ElementoApresentacao;
        }

        //#endregion

        //#region Métodos privados

        public async ResetarPosicaoAsync()
        {
            this.Movimentacao.Resetar();
            this.AtualizarPosicaoAsync("resetando posicao");
        }
        public async AtualizarPosicaoAsync(origem?: string, tentativa: number = 0)
        {
            if (this.IsAberto && this.OpcoesControleFlutuante.IsFlutuante && this.IsControleInicializado)
            {
                const posicaoElementoRelativo = this.RetornarPosicaoElementoRelativo();
                if (posicaoElementoRelativo == null)
                {
                    return;
                }

                if (EstiloUtil.IsPosicaoZerada(posicaoElementoRelativo))
                {
                    console.error(`Elemento relativo do controle flutuante ${this.___NomeConstrutor} não está visível ou não possui posição elementoRelativo.getBoundingClientRect(); `);
                }

                const tamanhoFonteDocumento = EstiloUtil.TamanhoFonteDocumento;
                const scalar = tamanhoFonteDocumento / EstiloUtil.TAMANHO_FONTE_PADRAO;

                const larguraInical = this.LarguraInicial * scalar;
                const alturaInical = this.AlturaInicial * scalar;

                let posicaoX = this.RetornarPosicaoX(posicaoElementoRelativo, larguraInical) + (this.DiferencaPosicaoX * scalar);
                let posicaoY = this.RetornarPosicaoY(posicaoElementoRelativo, alturaInical) + (this.DiferencaPosicaoY * scalar);

                let largura = (this.OpcoesControleFlutuante.IsAjustarLarguraElementoRelativo) ? posicaoElementoRelativo.width : larguraInical;
                let altura = alturaInical;

                [largura, posicaoX] = this.NormalizarLarguraPosicaoX(largura, posicaoX);
                [altura, posicaoY] = this.NormalizarAlturaPosicaoY(altura, posicaoY);

                const estilo = new Estilo({
                    position: "absolute",
                    top: posicaoY.ToPixels(),
                    left: posicaoX.ToPixels(),
                    transform: "none",
                });

                if (altura > 0)
                {
                    estilo.height = altura.ToPixels();
                }

                if (largura > 0)
                {
                    estilo.width = largura.ToPixels();
                }

                estilo.AplicarEm(this.Elemento);

                if (posicaoY < 0 && tentativa < 5)
                {
                    await ThreadUtil.QuebrarAsync();
                    await this.AtualizarPosicaoAsync(origem, tentativa + 1);
                    return;
                }
                this._isPosicaoAtualizada = true;
                //EstiloUtil.IncrementarJanelaZIndex(this.Elemento);
            }
        }

        protected RetornarPosicaoElementoRelativo():DOMRect
        {
            return this.ElementoRelativo?.getBoundingClientRect();

        }

        protected RetornarPosicaoX(posicaoElementoRelativo: DOMRect, largura: number): number
        {
            if (this.Movimentacao?.PosicaoX > 0)
            {
                return this.Movimentacao?.PosicaoX;
            }

            switch (this.DestinoControleFlutuante)
            {
                case EnumDestinoControleFlutuante.Inferior:
                case EnumDestinoControleFlutuante.Superior:

                    return posicaoElementoRelativo.left;

                case EnumDestinoControleFlutuante.Esquerda:
                case EnumDestinoControleFlutuante.EsquerdaSuperior:
                case EnumDestinoControleFlutuante.EsquerdaCentro:
                case EnumDestinoControleFlutuante.EsquerdaInferior:

                    return posicaoElementoRelativo.left - largura;

                case EnumDestinoControleFlutuante.Direita:
                case EnumDestinoControleFlutuante.DireitaSuperior:
                case EnumDestinoControleFlutuante.DireitaCentro:
                case EnumDestinoControleFlutuante.DireitaInferior:

                    return posicaoElementoRelativo.left + posicaoElementoRelativo.width;
                     
                case EnumDestinoControleFlutuante.InferiorEsquerda:
                case EnumDestinoControleFlutuante.SuperiorEsquerda:

                    return (posicaoElementoRelativo.left + posicaoElementoRelativo.width) - (largura);

                case EnumDestinoControleFlutuante.InferiorDireita:
                case EnumDestinoControleFlutuante.SuperiorDireita:

                    return posicaoElementoRelativo.left;

                case EnumDestinoControleFlutuante.Automatico:

                    throw new ErroNaoImplementado(this);

                case EnumDestinoControleFlutuante.Centro:
                case EnumDestinoControleFlutuante.InferiorCentro:
                case EnumDestinoControleFlutuante.SuperiorCentro:

                    /*return posicaoElementoRelativo.left - (largura / 2);*/

                    return posicaoElementoRelativo.left + ((posicaoElementoRelativo.width - largura) / 2);

                default:

                    throw new ErroNaoSuportado("Destino do controle flutuante não é suportado");
            }
            //posicaoElementoRelativo.left + this.RetornarDiferencaPosicaoX();
        }

        protected RetornarPosicaoY(posicaoElementoRelativo: DOMRect, altura: number): number
        {
            if (this.Movimentacao?.PosicaoY > 0)
            {
                return this.Movimentacao.PosicaoY;
            }

            switch (this.DestinoControleFlutuante)
            {
                case EnumDestinoControleFlutuante.Inferior:
                case EnumDestinoControleFlutuante.InferiorCentro:
                case EnumDestinoControleFlutuante.InferiorDireita:
                case EnumDestinoControleFlutuante.InferiorEsquerda:

                    return (posicaoElementoRelativo.top + posicaoElementoRelativo.height);

                case EnumDestinoControleFlutuante.Superior:
                case EnumDestinoControleFlutuante.SuperiorCentro:
                case EnumDestinoControleFlutuante.SuperiorDireita:
                case EnumDestinoControleFlutuante.SuperiorEsquerda:

                    return posicaoElementoRelativo.top - altura;

                case EnumDestinoControleFlutuante.Esquerda:
                case EnumDestinoControleFlutuante.Direita:
                case EnumDestinoControleFlutuante.EsquerdaInferior:
                case EnumDestinoControleFlutuante.DireitaInferior:

                    return posicaoElementoRelativo.top;

                case EnumDestinoControleFlutuante.EsquerdaCentro:
                case EnumDestinoControleFlutuante.DireitaCentro:
                case EnumDestinoControleFlutuante.Centro:
                    /*return posicaoElementoRelativo.top + (altura / 2);*/

                    return posicaoElementoRelativo.top + ((posicaoElementoRelativo.height - altura) / 2);

                default:

                    throw new ErroNaoImplementado(this);
            }
        }

        protected NormalizarLarguraPosicaoX(largura: number, posicaoX: number): [number, number]
        {
            const larguraRecipiente = window.innerWidth;
            if ((posicaoX + largura) > larguraRecipiente)
            {
                posicaoX = larguraRecipiente - largura - 5;
            }
            if (posicaoX < 0)
            {
                posicaoX = 0;
            }
            return [largura, posicaoX];
        }

        protected NormalizarAlturaPosicaoY(altura: number, posicaoY: number): [number, number]
        {
            const alturaRecipiente = window.innerHeight;
            if ((posicaoY + altura) > alturaRecipiente)
            {
                posicaoY = alturaRecipiente - altura - 5;
            }
            if (posicaoY < 0)
            {
                posicaoY = 0;
            }
            return [altura, posicaoY];
        }


        //protected RetornarAltura(): number 
        //{
        //    return this.Elemento.clientHeight;
        //}

        //protected RetornarLargura(): number
        //{
        //    return this.Elemento.clientWidth;
        //}

        private Window_MouseDown(e: MouseEvent): void
        {
            this.TentarFecharAutomaticamente(e);
        }

        private TentarFecharAutomaticamente(e: MouseEvent): void
        {
            if (this.IsPodeTentarFechar())
            {
                if (this.IsOcupado || this.IsSistemaOcupado)
                {
                    return;
                }
                const isExisteAlertaMensagem = this.RetornarIsExisteAlertaMensagem();
                if (isExisteAlertaMensagem)
                {
                    return;
                }

                const posicaoMouse = new d.Posicao(e.pageX, e.pageY);
                const controlesNaoFechar = this.RetornarControlesCliqueNaoFechar();
                for (const controle of controlesNaoFechar)
                {
                    if (this.IsPosicaoMouseEmCimaDoElemento(posicaoMouse, controle.Elemento))
                    {
                        return;
                    }
                }

                this.Fechar(false);

                //let elementoClique = e.srcElement as HTMLElement;
                //if (this.IsClicouForaControle(e))
                //{
                //    this.RemoverEventoDomGlobal(ui.EnumEventoDom.Click, this.Window_Click);
                //    this.Fechar(false);
                //}
            }
        }
        private IsPodeTentarFechar(): boolean 
        {
            if (this.IsControleInicializado &&
                this.OpcoesControleFlutuante.IsFecharCliqueForaDoControle)
            {
                if (this.TempoAbrirControle)
                {
                    return this.TempoAbrirControle.ElapsedMilliseconds > 500;
                }
                return true;
            }
            return false;
        }


        private RetornarIsExisteAlertaMensagem(): boolean
        {
            if (this.DicionarioControlesFilho.Valores.Any(x => x instanceof JanelaMensagem))
            {
                return true;
            }
            return false;
        }

        //protected IsClicouForaControle(e: MouseEvent): boolean
        //{
        //    let isClicouForaControle = !this.IsMouseEmCimaDoElemento(e.pageX, e.pageY);
        //    if (!this.IsClicouControlePaiFechar)
        //    {
        //        return isClicouForaControle;
        //    }
        //    let isClicouForaControlePai = !this.ControlePai.IsMouseEmCimaDoElemento(e.pageX, e.pageY);
        //    return isClicouForaControle && isClicouForaControlePai;
        //}


        //#endregion

        //#region Atualizar posição

        private ControleFlutuante_TelaAlterada(): void
        {
            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamente && this.IsAberto)
            {
                this.AtualizarPosicaoDepois.Executar("ControleFlutuante_TelaAlterada");
            }
        }

        private Window_Resize(): void
        {
            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamente && this.IsAberto)
            {
                this.AtualizarPosicaoDepois.Executar("Window_Resize");
            }
        }

        private JanelaPai_PosicaoAlterada(): void
        {
            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamente && this.IsAberto)
            {
                this.AtualizarPosicaoAsync("JanelaPai_PosicaoAlterada");
            }
        }

        private ManipularScrollsGlobal()
        {
            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamenteGlobalScroll && this.IsControleInicializado)
            {
                this.AdicionarEventoDom(EnumEventoDom.Scroll, this.ElementoScroll_Scroll, document, this, { capture: true });
            }
        }

        private ElementoScroll_Scroll(e: Event)
        {
            if (this.OpcoesControleFlutuante.IsAtualizarPosicaoAutomaticamenteGlobalScroll && this.IsAberto)
            {
                this.AtualizarPosicaoAsync("ElementoScroll_Scroll");
            }
        }

        //#endregion

        protected RetornarControlesCliqueNaoFechar(): Array<BaseControle>
        {
            const controlesDependentes = new Array<BaseControle>();
            controlesDependentes.Add(this);
            controlesDependentes.AddRange(this.ControlesCliqueNaoFechar);

            if (!this.OpcoesControleFlutuante.IsClicouControlePaiFechar)
            {
                controlesDependentes.Add(this.ControlePai);
            }

            for (const controleFilho of this.ControlesFilho)
            {
                if (controleFilho instanceof ComboBox)
                {
                    controlesDependentes.Add(controleFilho.CaixaSelecao);
                }
                if (controleFilho instanceof CaixaData)
                {
                    controlesDependentes.Add(controleFilho.CaixaCalendario);
                }
            }
            return controlesDependentes;
        }

        //#region 

        public Flutuate()
        {
            if (!this.OpcoesControleFlutuante.IsFlutuante)
            {
                const elementoDestino = this.RetornarElementoDestino();
                const elemento = this.Elemento;
                elemento.parentElement.removeChild(elemento);
                elementoDestino.appendChild(elemento);
                this.AtualizarPosicaoAsync("Flutuante");
            }
        }

        public Fixar(elementoDestino: HTMLElement)
        {
            if (this.OpcoesControleFlutuante.IsFlutuante)
            {
                this.OpcoesControleFlutuante.IsFlutuante = false;

                const elemento = this.Elemento;
                elemento.parentElement.removeChild(elemento);
                elementoDestino.appendChild(elemento);
                elemento.style.position = "relative";
                elemento.style.top = String.Empty;
                elemento.style.left = String.Empty;
                elemento.style.width = String.Empty;
                elemento.style.height = String.Empty;
                elemento.classList.add("sn-controle-flutuante-fixado");

                if (this.PainelBarraMovimentacao)
                {
                    this.PainelBarraMovimentacao.OcultarElemento();
                    this.PainelCabecalho.OcultarElemento();
                    this.ElementoConteudoInterno.style.height = "100%";
                    this.ElementoConteudoInterno.style.maxHeight = "100%";
                    this.ElementoConteudoInterno.ElementoApresentacao.style.height = "100%";
                    this.ElementoConteudoInterno.ElementoApresentacao.style.maxHeight = "100%";
                }
                this.OpcoesControleFlutuante.IsFecharCliqueForaDoControle = false;
                this.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseDown, this.Window_MouseDown);
                super.MostrarElemento();

            }
        }

        //#endregion

        private async BtnFecharControleFlutuante_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.Fechar(false);
        }

        private Window_StopProgration(provedor: any, e: Snebur.Nativo.StopPropagationEventArgs)
        {
            if (e.EventoNativo instanceof MouseEvent)
            {
                this.TentarFecharAutomaticamente(e.EventoNativo);
            }
        }

        //#region IDisposable

        public override ReInicializar(): void
        {
            this.__isReiniciando = true;
            const isAberto = this.IsAberto;
            if (isAberto && this.OpcoesControleFlutuante.IsFlutuante)
            {
                this.Fechar();
            }
            super.ReInicializar();
            if (isAberto)
            {
                this.AbrirDepoisReiniciarAsync();
            }

        }
        private async AbrirDepoisReiniciarAsync()
        {
            await ThreadUtil.EsperarAsync(500);
            this.Mostrar();
        }

        public override Dispose(): void
        {
            if (this.IsReiniciando)
            {
                return;
            }
            this.JanelaPai?.EventoPosicaoAlterada.RemoveHandler(this.JanelaPai_PosicaoAlterada, this);

            this._isAberto = false;
            window.EventoStopPropagation?.AddHandler(this.Window_StopProgration, this);
            
            super.Dispose();
            // ElementoUtil.RemoverElemento(this.RetornarElementoDestino(), this.IDElemento);
        }
        //#endregion
    }



    //#region Elementos da apresentação - código gerado automaticamente #

    export interface ControleFlutuante
    {
        readonly PainelCabecalho: ui.CabecalhoPainel;
        readonly PainelBarraMovimentacao: ui.Painel;
        readonly TextoTitulo: ui.Texto;
        readonly BtnFecharControleFlutuante: ui.Botao;
    }

    //#endregion

    export class OpcoesControleFlutuante
    {

        public IsClicouControlePaiFechar: boolean = false;
        public IsFlutuante: boolean = true;
        public IsMostrarPainelAcoes: boolean = false;
        public IsAjustarLarguraElementoRelativo: boolean = false;
        public IsFecharCliqueForaDoControle: boolean = true;
        public IsAtualizarPosicaoAutomaticamente: boolean = true;
        public IsAtualizarPosicaoAutomaticamenteGlobalScroll: boolean = false;
        public IsAtualizarPosicaoAoMostrar: boolean = true;
        public IsMoverControleFlutuante: boolean = false;



        public Configurar(configuracoes: Partial<OpcoesControleFlutuante>)
        {
            Object.assign(this, configuracoes);
        }
    }

}