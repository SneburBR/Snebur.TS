﻿namespace Snebur.UI
{
    export class JanelaOcupado extends Snebur.UI.Janela
    {
        public override readonly IsMostrarFundoJanela = ui.TelaUtil.IsCelular;
        private readonly BlocoLoader: ui.BaseControle;
        private readonly BlocoProgresso: ui.BaseControle;

        public ViewModel: JanelaOcupadoViewModel;
        private IsVisivelBlocoProgresso: boolean = false;

        private readonly BarraProgresso: Progresso;

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

        public override Dispose()
        {
            if (Snebur.$Aplicacao.DocumentoPrincipal.IsOcupado)
            {
                const nomeApresentacao = this.ControleApresentacaoPai?.___NomeConstrutor ?? this.ControlePai.Nome;
                const mensagem = `Atenção, O controle ${nomeApresentacao} está sendo  dispensado sem desocupar.
                                   Caso queria dispensar um controle e manter o sistema ocupado.
                                   $Aplicacao.Ocupar();
                                   $Aplicacao.DocumentoPrincipal.Ocupar()`;

                u.DebugUtil.ThrowAndContinue(mensagem);

                Snebur.$Aplicacao.DocumentoPrincipal.DesocuparAsync();
            }
            super.Dispose();
        }
    }
}