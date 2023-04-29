namespace Snebur.UI
{
    export class JanelaOcupado extends Snebur.UI.Janela
    {
        public override readonly IsMostrarFundoJanela = ui.TelaUtil.IsCelular;
        public readonly ViewModel: JanelaOcupadoViewModel;
        private IsVisivelBlocoProgresso: boolean = false;

        public get Progresso(): number
        {
            return this.ViewModel.Progresso;
        }

        public set Progresso(value: number)
        {
            if (!this.IsControleInicializado)
            {
                return;
            }
            if (typeof value === "number" && value > 0)
            {
                if (!this.IsVisivelBlocoProgresso)
                {
                    this.BlocoProgresso.MostrarElemento();
                    this.BlocoLoader.OcultarElemento();
                    this.IsVisivelBlocoProgresso = true;
                }
            }
            else
            {
                this.BlocoLoader.MostrarElemento();
                this.BlocoProgresso.OcultarElemento();
                this.IsVisivelBlocoProgresso = false;
            }
            this.ViewModel.Progresso = value;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        public constructor(controlePai: Snebur.UI.BaseControle, titulo: string, mensagem: string) 
        {
            super(controlePai);
            this.EventoCarregado.AddHandler(this.Janela_Carregada, this);
            this._dataSource = null;
            this.ViewModel = new JanelaOcupadoViewModel(titulo, mensagem);
            this.IsFecharEsc = false;
        }

        public Janela_Carregada() 
        {
            //pagina carregada
            this.DataSource = this.ViewModel;
            this.OcultarBarraAcoes();
        }

        private MostrarProgresso(progresso: number): EnumVisibilidade
        {
            if (typeof progresso === "number" && progresso > 0)
            {
                return EnumVisibilidade.Visivel;
            }
            return EnumVisibilidade.Oculto;
        }

        protected override async FechandoAsync(resultadoNormalizado: ResultadoFecharJanelaArgs)
        {
            await super.FechandoAsync(resultadoNormalizado);

            if ($Configuracao.IsDebugOuTeste &&
                Snebur.$Aplicacao.DocumentoPrincipal.IsOcupado &&
                !resultadoNormalizado.IsSucesso  )
            {
                const nomeApresentacao = this.ControleApresentacaoPai?.___NomeConstrutor ?? this.ControlePai.Nome;
                const mensagem = `Atenção, O controle ${nomeApresentacao} está sendo  dispensado sem desocupar.
                                   Caso queria dispensar um controle e manter o sistema ocupado.
                                   $Aplicacao.Ocupar();
                                   $Aplicacao.DocumentoPrincipal.Ocupar()`;

                DebugUtil.ThrowAndContinue(mensagem);

                await Snebur.$Aplicacao.DocumentoPrincipal.DesocuparAsync();
            }
        }

        public override Dispose()
        {
            super.Dispose();
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface JanelaOcupado
    {
        readonly BlocoLoader: ui.Bloco;
        readonly BlocoProgresso: ui.Bloco;
        readonly BarraProgresso: ui.Progresso;
    }

    //#endregion

}