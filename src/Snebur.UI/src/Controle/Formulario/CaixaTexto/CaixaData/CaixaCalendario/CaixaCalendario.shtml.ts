namespace Snebur.UI
{
    export class CaixaCalendario extends ControleFlutuante
    {
        private _dataSelecionada: Date;
        private _isAtualizandoCalendario: boolean;

        private readonly DiasSemanaViewModel = new ListaObservacao<DiaSenamaViewModel>();
        private readonly MesesViewModel = new ListaObservacao<MesViewModel>();
        private readonly DiasMesViewModel = new ListaObservacao<DiaMesViewModel>();
        private readonly Anos = new ListaObservacao<number>();

        private Resolver: (dataSelecionada: Date) => void;
        private DiaMesViewModelSelecionado: DiaMesViewModel
        private MesViewModelSelecionado: MesViewModel;
        private AnoSelecionado: number;

        private get DataSelecionada(): Date
        {
            return this._dataSelecionada;
        }

        public get CaixaData(): CaixaData
        {
            return this.ControlePai as CaixaData;
        }

        public constructor(controlePai: BaseControle)
        {
            super(controlePai);

            this.DeclararPropriedade(x => x.AnoSelecionado, Number, this.AnoSelecionado_Alterado);
            this.DeclararPropriedade(x => x.MesViewModelSelecionado, MesViewModel, this.MesViewModelSelecionado_ValorAlterado);
            this.DeclararPropriedade(x => x.DataSelecionada, Date);
            this.DeclararPropriedade(x => x.DiaMesViewModelSelecionado, DiaMesViewModel);

            if (!(controlePai instanceof CaixaData))
            {
                throw new Erro(`O controle caixa calendário é excluiso do CaixaData`);
            }

            this.DestinoControleFlutuante = EnumDestinoControleFlutuante.Inferior;
            this.EventoCarregado.AddHandler(this.Controle_Carregado, this);
        }

        private Controle_Carregado(provedor: any, e: EventArgs)
        {
        }

        public override Mostrar(): void
        {
            throw new Erro("Utilizar método mostrar await");
        }

        public MostrarAsync(dataSelecionado: Date): Promise<Date>
        {
            super.Mostrar();
            this._dataSelecionada = dataSelecionado;

            this.PopularViewsModel(dataSelecionado);
            return new Promise<Date>(resolver =>
            {
                this.Resolver = resolver;
            });

        }

        private PopularViewsModel(dataSelecionado: Date)
        {
            this._isAtualizandoCalendario = true;
            const diasSemanaViewModel = new List<DiaSenamaViewModel>();
            const mesViewModel = new List<MesViewModel>();

            const diasSemana = EnumUtil.RetornarValores(d.EnumDiaSemana);
            const meses = EnumUtil.RetornarValores(d.EnumMes);
            for (const diaSemana of diasSemana)
            {
                diasSemanaViewModel.Add(new DiaSenamaViewModel(diaSemana));
            }

            for (const mes of meses)
            {
                mesViewModel.Add(new MesViewModel(mes));
            }

            const tipoData = this.CaixaData.TipoData;
            const anoInicio = DataHoraUtil.RetornarAnoInicio(tipoData);
            const anoFim = DataHoraUtil.RetornarAnoFim(tipoData);
            const anos = new List<number>();
            for (let ano = anoInicio; ano <= anoFim; ano++)
            {
                anos.Add(ano);
            }

            this.DiasSemanaViewModel.AddRangeNew(diasSemanaViewModel);
            this.MesesViewModel.AddRangeNew(mesViewModel);
            this.Anos.AddRangeNew(anos);

            this.MesViewModelSelecionado = mesViewModel.Where(x => x.Mes === dataSelecionado.Month).Single();
            this.AnoSelecionado = dataSelecionado.Year;


            this.PopularMesIterno(dataSelecionado.Year, dataSelecionado.Month);
            this.Selecionar(this.DataSelecionada);
            this._isAtualizandoCalendario = false;

        }

        public PopularMes(ano: number, mesAtual: d.EnumMes)
        {
            this._isAtualizandoCalendario = true;
            this.PopularMesIterno(ano, mesAtual);
            this._isAtualizandoCalendario = false;
        }

        private PopularMesIterno(ano: number, mesAtual: d.EnumMes)
        {
            const diasMesViewModel = new List<DiaMesViewModel>();
            const ultimoDiaMes = DataHoraUtil.RetornarUltimoDiaMes(ano, mesAtual);
            const dataInicio = new Date(ano, mesAtual - 1, 1);

            const diaSemanaInicio = dataInicio.DayOfWeek;
            const feriados = u.DataFeriadoUtil.RetornarFeriados(ano);

            if (diaSemanaInicio > d.EnumDiaSemana.Domingo)
            {
                let dataDiaMesAnterior = dataInicio.AddDays((diaSemanaInicio) * -1);
                for (let diaSenamaMesAnterior = d.EnumDiaSemana.Domingo; diaSenamaMesAnterior < diaSemanaInicio; diaSenamaMesAnterior++)
                {
                    diasMesViewModel.Add(new DiaMesViewModel(dataDiaMesAnterior, mesAtual, null));
                    dataDiaMesAnterior = dataDiaMesAnterior.AddDays(1);
                }
            }

            let dataDiaMes = dataInicio;
            for (let dia = 1; dia <= ultimoDiaMes; dia++)
            {
                const feriado = feriados.Where(x => x.Data.Equals(dataDiaMes, u.OpcoesCompararData.Data, u.OpcoesCompararHora.Ignorar)).SingleOrDefault();
                diasMesViewModel.Add(new DiaMesViewModel(dataDiaMes, mesAtual, feriado));
                dataDiaMes = dataDiaMes.AddDays(1);
            }

            const diaSemanFim = dataDiaMes.DayOfWeek;
            if (diaSemanFim > d.EnumDiaSemana.Domingo)
            {
                for (let diaSemanaMesPosterior = diaSemanFim; diaSemanaMesPosterior <= d.EnumDiaSemana.Sabado; diaSemanaMesPosterior++)
                {
                    diasMesViewModel.Add(new DiaMesViewModel(dataDiaMes, mesAtual, null));
                    dataDiaMes = dataDiaMes.AddDays(1);
                }
            }

            this.DiasMesViewModel.AddRangeNew(diasMesViewModel);
        }


        //#region UI Eventos 

        public BtnSelecionarDia_Click(botao: ui.Botao, e: ui.UIEventArgs)
        {
            const diaMesMV = botao.DataSource;
            if (diaMesMV instanceof DiaMesViewModel)
            {
                if (!diaMesMV.IsMesAtual)
                {
                    this._dataSelecionada = diaMesMV.Data;
                    this.PopularMes(diaMesMV.Data.Year, diaMesMV.Data.Month);
                }
                this.Selecionar(diaMesMV);
            }
        }

        public BtnMesAnterior_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.IrAvancarMes(this.MesViewModelSelecionado.Mes - 1);
        }

        public BtnMesPosterior_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.IrAvancarMes(this.MesViewModelSelecionado.Mes + 1);
        }

        public BtnSelecionada_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.Fechar(true);
        }

        public BtnCancelar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            this.Fechar(false);
        }

        public IrAvancarMes(mes: number)
        {
            let ano = this.AnoSelecionado;
            if (mes > 12)
            {
                ano += 1;
                mes = 1;
            }

            if (mes < 1)
            {
                ano -= 1;
                mes = 12;
            }

            this.PopularMes(ano, mes);
            if (this.AnoSelecionado === ano)
            {
                this.AnoSelecionado = ano;
            }

            const mesViewModel = this.MesesViewModel.Where(x => x.Mes === mes).Single();
            if (!this.MesViewModelSelecionado.Equals(mesViewModel))
            {
                this.MesViewModelSelecionado = mesViewModel;
            }
        }


        private MesViewModelSelecionado_ValorAlterado(e: PropriedadeAlteradaEventArgs): void
        {
            this.AtualizarCalendario();
        }

        private AnoSelecionado_Alterado(e: PropriedadeAlteradaEventArgs): void
        {
            this.AtualizarCalendario();
        }

        private AtualizarCalendario(): void
        {
            if (!this._isAtualizandoCalendario)
            {
                this.PopularMes(this.AnoSelecionado, this.MesViewModelSelecionado.Mes);
                this.Selecionar(this.DataSelecionada);
            }
        }

        private Selecionar(dataOuViewModel: DiaMesViewModel | Date)
        {
            if (this.DiaMesViewModelSelecionado != null)
            {
                this.DiaMesViewModelSelecionado.IsSelecionado = false;
            }

            const diaMesViewModel = this.RetornarDiaMesViewModel(dataOuViewModel);
            if (diaMesViewModel instanceof DiaMesViewModel)
            {
                diaMesViewModel.IsSelecionado = true;

                if (this.MesViewModelSelecionado.Mes !== diaMesViewModel.Data.Month)
                {
                    this.MesViewModelSelecionado = this.MesesViewModel.Where(x => x.Mes === diaMesViewModel.Data.Month).Single();
                }
                if (this.AnoSelecionado !== diaMesViewModel.Data.Year)
                {
                    this.AnoSelecionado = diaMesViewModel.Data.Year;
                }

                this._dataSelecionada = diaMesViewModel.Data;
            }
            this.DiaMesViewModelSelecionado = diaMesViewModel;
        }

        private RetornarDiaMesViewModel(dataOuViewModel: DiaMesViewModel | Date): DiaMesViewModel
        {
            if (dataOuViewModel instanceof DiaMesViewModel)
            {
                if (!dataOuViewModel.IsMesAtual)
                {
                    return this.DiasMesViewModel.Where(x => x.Data.Equals(dataOuViewModel.Data)).SingleOrDefault();
                }
                return dataOuViewModel;
            }

            if (dataOuViewModel instanceof Date)
            {
                return this.DiasMesViewModel.Where(x => x.Data.Equals(dataOuViewModel)).SingleOrDefault();
            }
            return null;
        }

        //#endregion

        //#region Métodos e propriedades sobre escritos

        protected override get AlturaInicial(): number
        {
            return 290;
        }

        protected override get LarguraInicial(): number
        {
            return 265;
        }
        protected override RetornarTagNovoElemento(): string
        {
            return "sn-caixa-calendario";
        }

        protected override RetornarElementoRelativo(): HTMLElement
        {
            return super.RetornarElementoRelativo();
        }

        protected override NormalizarLarguraPosicaoX(largura: number, posicaoX: number): [number, number]
        {
            return super.NormalizarLarguraPosicaoX(largura, posicaoX);
        }

        protected override NormalizarAlturaPosicaoY(altura: number, posicaoY: number): [number, number]
        {
            const alturaRecipiente = window.innerHeight;
            if ((posicaoY + altura) > alturaRecipiente)
            {
                const alturaElemento = this.ElementoRelativo.getBoundingClientRect().height;
                const espacoSuperior = posicaoY - alturaElemento;
                const espacoInferior = alturaRecipiente - (posicaoY + alturaElemento);
                if (espacoSuperior > espacoInferior)
                {
                    if (altura > espacoSuperior)
                    {
                        altura = espacoSuperior;
                    }
                    const novaPosicaoY = posicaoY - altura - (alturaElemento * .95);
                    return [altura, novaPosicaoY];
                }
                else
                {
                    if (altura > espacoInferior)
                    {
                        altura = espacoInferior;
                    }
                    return [altura, posicaoY];
                }
            }
            return [altura, posicaoY];
        }

        //#endregion

        public override Fechar(isSucesso: boolean): void
        {
            super.Fechar(isSucesso);

            const dataSelecionada = isSucesso ? this.DataSelecionada : null;
            if (this.Resolver != null)
            {
                this.Resolver(dataSelecionada);
                this.Resolver = null;
            }
        }
    }

    export class MesViewModel extends BaseViewModel
    {
        public readonly Mes: d.EnumMes;
        public readonly Descricao: string;

        public constructor(mes: d.EnumMes)
        {
            super();
            this.Mes = mes;
            this.Descricao = u.FormatacaoUtil.FormatarMes(mes);
        }
    }

    export class DiaSenamaViewModel extends BaseViewModel
    {
        public readonly DiaSemana: d.EnumDiaSemana;
        public readonly Descricao: string;

        public constructor(diaSemana: d.EnumDiaSemana)
        {
            super();
            this.DiaSemana = diaSemana;
            this.Descricao = u.FormatacaoUtil.FormatarDiaSemana(diaSemana, u.EnumTipoFormatacaoDiaSemana.Abreviado);
        }
    }

    export class DiaMesViewModel extends BaseViewModel
    {
        public readonly Data: Date;
        public readonly MesAtual: d.EnumMes;
        public readonly IsMesAtual: boolean;
        public readonly IsFeriado: boolean;
        public readonly Feriado: u.IFeriado;

        public IsSelecionado: boolean = false;

        public get Dia(): number
        {
            return this.Data.Day;
        }

        public get DiaSemana(): number
        {
            return this.Data.DayOfWeek;
        }

        public get CssClasse(): string
        {
            if (this.IsSelecionado)
            {
                return "sn-data-dia--selecionado";
            }

            if (!this.IsMesAtual)
            {
                return "sn-data-dia--fora";
            }

            if (this.Feriado != null)
            {
                return "sn-data-dia--feriado";
            }
            return "sn-data-dia--normal";
        }

        public get Legenda(): string
        {
            return this.Feriado?.Descricao;
        }

        public constructor(data: Date, mesAtual: d.EnumMes, feriado: u.IFeriado)
        {
            super();

            this.DeclararPropriedade(x => x.IsSelecionado, Boolean, this.IsSelecionado_Alterado);

            this.Data = data;
            this.MesAtual = mesAtual;
            this.IsMesAtual = data.Month === mesAtual;
            this.Feriado = feriado;
            this.IsFeriado = feriado != null;
        }

        private IsSelecionado_Alterado(e: PropriedadeAlteradaEventArgs)
        {
            this.NotificarPropriedadeAlterada(x => x.CssClasse);
        }

        public override Equals(obj: any): boolean
        {
            if (obj instanceof DiaMesViewModel)
            {
                return this.Data.Equals(obj.Data);
            }
            return false;
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaCalendario
    {
    }

    //#endregion

}