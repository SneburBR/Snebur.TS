namespace Snebur.UI
{
    export interface IControleMovimentacao extends BaseControle
    {
        RetornarElementoAlvoMovimentacao(): HTMLElement;
    }

    export class MovimentarControle  
    {
        private _posicaoX: number;
        private _posicaoY: number;

        private XInicial: number;
        private YInicial: number;

        private MaiorX: number;
        private MaiorY: number;

        private PosicaoXInicial: number;
        private PosicaoYInicial: number;

        private IdentificadorMovendo: number;
        protected IsMovendo: boolean;

        public get Elemento()
        {
            if (this.Controle instanceof Janela)
            {
                return this.Controle.ElementoApresentacao;
            }
            return this.Controle.Elemento;
        }

        public get PosicaoX(): number
        {
            return this._posicaoX;
        }
        public get PosicaoY(): number
        {
            return this._posicaoY;
        }

        public constructor(
            private readonly Controle: IControleMovimentacao)
        {

        }

        public Inicializar(): void
        {
            const elementoAlvoMovimentacao = this.RetornarElementoMovimentacao();
            if (elementoAlvoMovimentacao instanceof HTMLElement)
            {
                this.Controle.AdicionarEventoDom(
                    ui.EnumEventoDom.MouseDown,
                    this.ElementoBarraMovimentacao_MouseDown,
                    elementoAlvoMovimentacao,
                    this);
            }
        }

        protected RetornarElementoMovimentacao()
        {
            return this.Controle.RetornarElementoAlvoMovimentacao();
            /*return this.PainelBarraMovimentacao?.ElementoApresentacao;*/
        }

        private ElementoBarraMovimentacao_MouseDown(e: MouseEvent): void
        {
            window.clearInterval(this.IdentificadorMovendo);

            e.stopPropagation();

            this.XInicial = e.pageX;
            this.YInicial = e.pageY;


            const regiao = this.Elemento.getBoundingClientRect();
            const regiaoCorpo = document.body.getBoundingClientRect();

            this.MaiorX = regiaoCorpo.width - regiao.width;
            this.MaiorY = regiaoCorpo.height - regiao.height;

            this.PosicaoXInicial = regiao.left;
            this.PosicaoYInicial = regiao.top;
             
            this.Controle.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseMove, this.Window_MouseMove, this);
            this.Controle.AdicionarEventoDomGlobal(ui.EnumEventoDom.MouseUp, this.Window_MouseUp, this);
        }



        private async Window_MouseUp(e: MouseEvent)
        {
            window.clearInterval(this.IdentificadorMovendo);

            this.Controle.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseMove, this.Window_MouseMove);
            this.Controle.RemoverEventoDomGlobal(ui.EnumEventoDom.MouseUp, this.Window_MouseUp);

            this.IdentificadorMovendo = window.setTimeout(() =>
            {
                this.IsMovendo = false;
            }, 200);
        }

        private Window_MouseMove(e: MouseEvent): void
        {
            const diferencaX = (e.pageX - this.XInicial);
            const diferencaY = (e.pageY - this.YInicial);

            if (Math.abs(diferencaY)) 
            {
                this.IsMovendo = true;
            }

            const x = (this.PosicaoXInicial + diferencaX);
            const y = (this.PosicaoYInicial + diferencaY);

            this._posicaoX = NormalizacaoUtil.NormalizarIntervalo(x, 0, this.MaiorX);
            this._posicaoY = NormalizacaoUtil.NormalizarIntervalo(y, 0, this.MaiorY);

            this.Elemento.style.left = this.PosicaoX.ToPixels();
            this.Elemento.style.top = this.PosicaoY.ToPixels();
        }
    }

}
