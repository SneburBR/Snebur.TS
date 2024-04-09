
namespace Snebur.UI
{
    export class PainelAbasHorizontal extends BaseControleApresentacaoFormulario
    {
        private _abaAtual: Aba;
        private _funcaoIsPodeNavegar: (construtorPagina: IPaginaConstrutor, parametros: DicionarioSimples<string, string>) => Promise<boolean> | boolean;

        private readonly IdentificadorNavegador: string;
        private readonly DicionarioAbas = new DicionarioSimples<Aba>();

        public readonly Abas = new List<Aba>();

        private IsAbasCheia: boolean;
        private IsCarregarAbaInicial: boolean;

        public TipoPainelAba: EnumTipoPainelAba;

        public get FuncaoIsPodeNavegar(): (construtorPagina: IPaginaConstrutor, parametros: DicionarioSimples<string, string>) => Promise<boolean> | boolean
        {
            return this._funcaoIsPodeNavegar;
        }
        //public TipoAnimacao: EnumTipoPainel;

        public get PaginaAtual(): Pagina
        {
            return this.Navegador.PaginaAtual;
        }
        public get AbaAtual(): Aba
        {
            return this._abaAtual;
        }

        public readonly EventoPaginaAlterada = new Evento<PaginaAlteradaEventArgs>(this);

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.EventoCarregado.AddHandler(this.PainelAbasHorizontal_Carregado, this);
            this.IdentificadorNavegador = GuidUtil.RetornarNovoGuid();
            this.EventoTelaAlterada.AddHandler(this.PainelAbasHorizontal_TelaAlterada, this);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            //normalizando navegador
            const elementoNavegador = this.RetornarItemElemento("Navegador");
            elementoNavegador.setAttribute(AtributosHtml.IdentificadorNavegador.Nome, this.IdentificadorNavegador);

            const elementoDestinoAbas = this.RetornarItemElemento("ElementoDestinoAbas");
            const elementoApresentacao = this.ElementoApresentacao;
            const elementosAbas = Util.CopiarArray(elementoApresentacao.getElementsByTagName(Aba.TAG_ABA));

            for (const elemento of elementosAbas)
            {
                elemento.setAttribute(AtributosHtml.IdentificadorNavegador.Nome, this.IdentificadorNavegador);
                elemento.remove();
                elementoDestinoAbas.appendChild(elemento);
            }

            this.PropagarAtributosTipoAnimacao();
            //this.ElementoDestinoAbas = elementoDestinoAbas;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Navegador.EventoAntesNavegar.AddHandler(this.Navegador_AntesNavegar, this);
            this.Navegador.EventoPaginaAlterada.AddHandler(this.Navegador_PaginaAterada, this);

            this.Abas.AddRangeNew(this.ControlesFilho.OfType<Aba>(Aba).Where(x => x.ConstrutorPagina != null).ToList());
            this.IsAbasCheia = this.RetornarValorAtributoBoolean(AtributosHtml.IsAbasCheia, false);
            this.IsCarregarAbaInicial = this.RetornarValorAtributoBoolean(AtributosHtml.IsCarregarAbaInicial, true);
            this._funcaoIsPodeNavegar = this.RetornarFuncaoIsPodeNavegar();

            for (const aba of this.Abas)
            {
                const chave = this.RetornarChaveAba(aba);
                if (this.DicionarioAbas.ContainsKey(chave))
                {
                    throw new Erro(`Possui mais de uma aba navegado para  ${chave}`);
                }
                this.DicionarioAbas.Add(chave, aba);
            }
            this.AtualizarTipoPainelAbas();
        }
        private RetornarFuncaoIsPodeNavegar(): (construtorPagina: IPaginaConstrutor, parametros: DicionarioSimples<string, string>) => boolean
        {
            const nomeFuncao = this.RetornarValorAtributo(AtributosHtml.IsFuncaoPodeNavegarAba, null);
            if (!String.IsNullOrEmpty(nomeFuncao))
            {
                return this.RetornarMetodo(nomeFuncao, false, false) as any;
            }
            return null;
        }

        private PainelAbasHorizontal_TelaAlterada(provedor: any, e: EventArgs)
        {
            this.AtualizarTipoPainelAbas();
        }

        private AtualizarTipoPainelAbas()
        {
            const tipoPainel = this.IsAbasCheia ? EnumTipoPainel.PilhaHorizontalCheia : EnumTipoPainel.PilhaHorizontal;
            this.PainelAbasInterno.TipoPainel = tipoPainel;
        }

        private async PainelAbasHorizontal_Carregado(provedor: any, e: EventArgs) 
        {
            const abaInicial = this.RetornarAbaInicial();
            if (abaInicial instanceof Aba)
            {
                await this.Navegador.NavegarAnimadoAsync(abaInicial.ConstrutorPagina, EnumSentidoAnimacao.Avancar);
            }
        }

        public async Navegar(aba: Aba, parametros: DicionarioSimples<any>)
        {
            const posicaoAtual = this.Abas.indexOf(this.AbaAtual);
            const posicao = this.Abas.indexOf(aba);
            if (posicaoAtual !== posicao)
            {
                const sentidoAtual = posicao >= posicaoAtual ?
                    EnumSentidoAnimacao.Avancar :
                    EnumSentidoAnimacao.Voltar;

                await this.Navegador.NavegarAnimadoAsync(aba.ConstrutorPagina,
                    sentidoAtual,
                    parametros);
            }
        }

        private Navegador_AntesNavegar(provedor: any, e: AntesNavegarEventArgs): void
        {
            if (this.TipoPainelAba === ui.EnumTipoPainelAba.MaterialDesign && e.ProximaPagina instanceof Function)
            {
                const abaDestino = this.Abas.Where(x => x.ConstrutorPagina === e.ProximaPagina).SingleOrDefault();
                if (abaDestino instanceof Aba)
                {
                    this.PosicionarMarcador(abaDestino);
                }
            }
        }

        private Navegador_PaginaAterada(provedor: any, e: PaginaAlteradaEventArgs): void
        {
            const pagina = e.Pagina;
            if (pagina instanceof Pagina)
            {
                const abaNavegada = this.RetornarAba(pagina);
                if (abaNavegada instanceof Aba && this.AbaAtual !== abaNavegada)
                {
                    this._abaAtual = abaNavegada;
                    this.SelecionarAbaAtual();
                }
            }
            this.EventoPaginaAlterada.Notificar(provedor, e);
        }
        private RetornarAba(pagina: Pagina): Aba
        {
            let chave = this.RetornarChavePagina(pagina, true);
            if (!this.DicionarioAbas.ContainsKey(chave))
            {
                chave = this.RetornarChavePagina(pagina, false);
            }
            if (!this.DicionarioAbas.ContainsKey(chave))
            {
                throw new Erro(`Não foi encontrado a Pagina com a chave ${chave} em ${this.ControleApresentacao.___NomeConstrutor}`);
            }
            return this.DicionarioAbas.Item(chave);

        }

        private RetornarAbaInicial(): Aba
        {
            if (this.IsCarregarAbaInicial)
            {
                const caminho = this.RetornarValorAtributo(AtributosHtml.PaginaInicial);
                const construtorPaginaInicial = NavegadorUtil.RetornarConstrutorPaginaInicial(this, caminho);
                if (typeof construtorPaginaInicial === "function")
                {
                    /*const construtorPaginaInicial = PaginaUtil.RetornarConstrutorPagina(this, caminhoConstrutorPagina);*/
                    return this.Abas.FirstOrDefault(x => x.ConstrutorPagina === construtorPaginaInicial);
                }
                return this.Abas.FirstOrDefault();
            }
            return null;
        }

        private SelecionarAbaAtual(): void
        {
            for (const aba of this.Abas)
            {
                aba.Deselecionar();
            }

            if (this.AbaAtual instanceof Aba)
            {
                this.AbaAtual.Selecinonar();
            }
        }

        private RetornarChaveAba(aba: Aba): string
        {
            const caminhoPagina = aba.ConstrutorPagina.__CaminhoTipo;
            const valorAtributoParametros = this.RetornarValorAtributo(AtributosHtml.Parametros, null, false, aba.Elemento);

            if (!String.IsNullOrWhiteSpace(valorAtributoParametros))
            {
                const parametros = PaginaUtil.RetornarParametros(valorAtributoParametros, this.ControlePai);
                return this.RetornarChave(caminhoPagina, parametros);

            }
            return caminhoPagina;
        }

        private RetornarChavePagina(pagina: Pagina, isInclurParametros: boolean): string
        {
            const caminhoPagina = pagina.GetType().CaminhoTipo;
            if (isInclurParametros && pagina.__Parametros.Count > 0)
            {
                return this.RetornarChave(caminhoPagina, pagina.__Parametros);
            }
            return caminhoPagina;

        }

        private RetornarChave(caminhoPagina: string, parametros: DicionarioSimples<any, string>): string
        {
            const chavesOrdenadas = parametros.Chaves.OrderBy(x => x);
            const chaveParametros = String.Join("&", chavesOrdenadas.Select(x => `${x}=${parametros.Item(x)}`));
            return `${caminhoPagina}#${chaveParametros}`;
        }

        public override ReInicializar(): void
        {
            this.Abas.Clear();
            this.DicionarioAbas.Clear();
            super.ReInicializar();
        }

        private PosicionarMarcador(abaDestino: Aba): void
        {
            const elementoPainel = this.PainelAbasInterno.Elemento;
            const elementoAba = abaDestino.Elemento;

            const posicaoX = elementoAba.offsetLeft - elementoPainel.offsetLeft;
            const largura = elementoAba.clientWidth;

            this.DivMarcador.style.width = largura.ToPixels();
            this.DivMarcador.style.left = posicaoX.ToPixels();
        }

        private PropagarAtributosTipoAnimacao()
        {
            const elementoNavegador = this.Elemento.querySelector("sn-navegador[sn-nome=Navegador]");
            if (elementoNavegador instanceof HTMLElement)
            {
                const elemento = this.Elemento;
                const nomesAtributoResponsivo = new NomesAtributoApresentacaoResponsivo(AtributosHtml.TipoAnimacao);
                const atributos = nomesAtributoResponsivo.TodosAtributos;
                for (const atributo of atributos)
                {
                    if (elemento.hasAttribute(atributo))
                    {
                        elementoNavegador.setAttribute(atributo, elemento.getAttribute(atributo));
                    }
                }
            }
        }

        public override Dispose(): void
        {
            this.Abas.Clear();
            this.DicionarioAbas.Clear();
            super.Dispose();
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface PainelAbasHorizontal
    {
        readonly PainelVertical: ui.PainelVertical;
        readonly Cabecalho: ui.CabecalhoPainel;
        readonly PainelAbasInterno: ui.Painel;
        readonly DivMarcador: HTMLDivElement;
        readonly Navegador: ui.Navegador;
    }

    //#endregion

}