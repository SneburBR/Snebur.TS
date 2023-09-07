namespace Snebur.UI
{
    export abstract class BaseControlePaginacao extends Snebur.UI.ControleUsuario implements IPaginacao
    {
        //#region Propriedades

        private _totalPaginas: number = 0;

        protected readonly ControleLista: BaseControleLista;

        public IsMostrarControleRegistrosPorPagina: boolean = false;
        public RegistrosPorPagina: number = ConstantesPaginacao.REGISTROS_POR_PAGINA_PADRAO
         
        public readonly Limites = new ListaObservacao<number>();
        public readonly Paginas = new ListaObservacao<NumeroPaginaViewModel>();

        public IsCarregando: boolean = false;
        public TotalRegistros: number = 0;
        public PaginaAtual: number = 1;
        public MaximoPaginas: number;

        public DescricaoItem: string = "item";
        public DescricaoItens: string = "itens";

        public get Pular(): number
        {
            return (this.PaginaAtual - 1) * this.RegistrosPorPagina;
        }

        public get TotalPaginas(): number
        {
            return this._totalPaginas;
        }

        public get IsExistePaginacao(): boolean
        {
            return !this.IsCarregando && this.TotalPaginas > 1;
        }

      
     


        //#endregion
        public readonly EventoPaginacaoAlterada = new Evento<PaginacaoAlteradaEventArgs>(this);

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.DeclararPropriedade(x => x.TotalRegistros, Number, this.AtualizarPaginacao);
            this.DeclararPropriedade(x => x.PaginaAtual, Number, this.AtualizarPaginacao);
            this.DeclararPropriedade(x => x.RegistrosPorPagina, Number, this.RegistrosPorPagina_Alterado);
            this.DeclararPropriedade(x => x.IsMostrarControleRegistrosPorPagina, Boolean);
            this.DeclararPropriedade(x => x.IsCarregando, Boolean, this.IsCarregando_Alterado);

            this.ControleLista = this.RetornarControleLista();

            if (this.ControleLista instanceof BaseControleLista)
            {
                this.ControleLista.ControlePaginacao = this;
                this.EventoPaginacaoAlterada.AddHandler(this.ControleLista.ControlePaginacao_PaginacaoAlterada, this.ControleLista);
            }
            this._dataSource = this;
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        protected override Inicializar(): void
        {
            this.DescricaoItem = this.RetornarValorAtributo(ui.AtributosHtml.PaginacaoDescricaoItem, "item");
            this.DescricaoItens = this.RetornarValorAtributo(ui.AtributosHtml.PaginacaoDescricaoItens, "itens");
            this.MaximoPaginas = this.RetornarMaximoPaginas();
            this.Limites.AddRangeNew(this.RetornarNumerosLimite());
            this.RegistrosPorPagina = this.Limites.First();

            super.Inicializar();

            if (!(this.RegistrosPorPagina > 0))
            {
                throw new Erro(`O registro por pagina não pode ser inferior a 0 controle ${this.ControleApresentacao.__CaminhoTipo}`);
            }
        }

        private RegistrosPorPagina_Alterado()
        {
            this.AtualizarPaginacao();
            this.NotificarEventoPaginacaoAlterada();
        }

        public AtualizarPaginacao(): void
        {
            if (this.__isControleInicializado)
            {
                this.AtualizarValores();
                this.AtualizarPaginas();

                this.IsMostrarControleRegistrosPorPagina = this.TotalRegistros > this.Limites.Min();

                this.NotificarPropriedadeAlterada(x => x.TotalPaginas);
                this.NotificarPropriedadeAlterada(x => x.IsExistePaginacao);
            }
        }

        public Resetar()
        {
            this._totalPaginas = 0;
            this.TotalRegistros = 0;
            this.PaginaAtual = 1;
        }

        //#region Métodos protegidos

        protected NotificarEventoPaginacaoAlterada(): void
        {
            this.EventoPaginacaoAlterada.Notificar(this, new PaginacaoAlteradaEventArgs(this.PaginaAtual, this.RegistrosPorPagina));
        }

        //#endregion

        //#region Métodos Privados

        private IsCarregando_Alterado()
        {
            this.NotificarPropriedadeAlterada(x => x.TotalPaginas);
            this.NotificarPropriedadeAlterada(x => x.IsExistePaginacao);
        }

        private AtualizarPaginas(): void
        {
            this.Paginas.Clear();

            if (this.TotalPaginas > 1)
            {
                const inicio = this.RetornarInicio();
                const fim = this.RetornarFim(inicio);

                for (let i = inicio; i <= fim; i++)
                {
                    const cssClasse: string = (i === this.PaginaAtual) ? "sn-paginacao-item-item-atual" : "sn-paginacao-item";
                    this.Paginas.Add(new NumeroPaginaViewModel(i, cssClasse));
                }
            }
        }

        protected AtualizarValores(): void
        {
            this._totalPaginas = Math.ceil(this.TotalRegistros / this.RegistrosPorPagina);
            if ((this.TotalPaginas > 0) && (this.TotalPaginas < this.PaginaAtual))
            {
                this.PaginaAtual = this.TotalPaginas;
            }

        }

        private RetornarNumerosLimite(): Array<number>
        {
            const RegistrosPorPagina = this.RetornarValorAtributo(AtributosHtml.RegistrosPorPagina, null);
            if (String.IsNullOrWhiteSpace(RegistrosPorPagina))
            {
                return ConstantesPaginacao.NUMEROS_LIMITE_PADRAO;
            }

            const limites = new Array<number>();
            const partes = RegistrosPorPagina.split(",");
            const len = partes.length;
            for (let i = 0; i < len; i++)
            {
                const limite = u.ConverterUtil.ParaInteiro(partes[i]);
                if (limite > 0)
                {
                    limites.Add(limite);
                }
            }
            if (limites.Count === 0)
            {
                throw new ErroOperacaoInvalida("O atributo registro por pagina é invalido", this);
            }
            return limites;
        }

        private RetornarMaximoPaginas(): number
        {
            let maximoPaginas = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.MaximoPaginas, 0));
            if (maximoPaginas > 0)
            {
                if ((maximoPaginas % 2) === 0)
                {
                    maximoPaginas += 1;
                }
                return maximoPaginas;
            }
            return ConstantesPaginacao.MAXIMO_PAIGNAS_PADRAO;
        }

        private RetornarControleLista(): BaseControleLista
        {
            let controlePai = this.ControlePai;
            while (controlePai != null)
            {
                if (controlePai instanceof BaseControleLista)
                {
                    return controlePai;
                }
                controlePai = controlePai.ControlePai;
            }
            return null;
        }

        private RetornarInicio(): number
        {
            let inicio = this.PaginaAtual - Math.floor((this.MaximoPaginas / 2));
            if ((inicio + this.MaximoPaginas) > this.TotalPaginas)
            {
                inicio = this.TotalPaginas - (this.MaximoPaginas - 1);
            }
            if (inicio < 1)
            {
                inicio = 1;
            }
            return inicio;
        }

        private RetornarFim(inicio: number): number
        {
            let fim = inicio + (this.MaximoPaginas - 1);
            if (fim > this.TotalPaginas)
            {
                fim = this.TotalPaginas;
            }
            return fim;
        }

        private FormatarTotalRegistros(totalPedidos: any, dataSource: any): any
        {
            if (typeof totalPedidos === "number")
            {
                if (totalPedidos === 0)
                {
                    return `Nenhum ${this.DescricaoItem} encontrado`;
                }
                return `${totalPedidos} ${totalPedidos === 1 ? this.DescricaoItem : this.DescricaoItens}`;
            }
            return String.Empty;
        }

        //#endregion

        //#region IDisposable

        public override Dispose(): void
        {
            if (this.ControleLista instanceof BaseControleLista)
            {
                this.EventoPaginacaoAlterada.RemoveHandler(this.ControleLista.ControlePaginacao_PaginacaoAlterada, this.ControleLista);
            }
            super.Dispose();
        }
        //#endregion
    }

    export class NumeroPaginaViewModel extends Snebur.Dominio.BaseViewModel
    {
        public readonly Pagina: number;
        public readonly CssClasse: string;

        public constructor(pagina: number, cssClasse: string)
        {
            super();

            this.Pagina = pagina;
            this.CssClasse = cssClasse;
        }
    }

    export class PaginacaoAlteradaEventArgs extends EventArgs
    {
        public readonly Pagina: number;
        public readonly RegistrosPorPagina: number;

        public constructor(pagina: number, registrorPorPagina: number)
        {
            super();
            this.Pagina = pagina;
            this.RegistrosPorPagina = registrorPorPagina;
        }
    }

    export class ConstantesPaginacao
    {
        public static readonly MAXIMO_PAIGNAS_PADRAO: number = 3;
        public static readonly NUMEROS_LIMITE_PADRAO: Array<number> = [25, 50, 100];
        public static readonly REGISTROS_POR_PAGINA_PADRAO: number = 25;
    }

    export interface IPaginacao
    {
        readonly TotalPaginas: number;
        readonly PaginaAtual: number;
        readonly RegistrosPorPagina: number;
        TotalRegistros: number
        IsCarregando: boolean;
    }
}