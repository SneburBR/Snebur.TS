namespace Snebur.UI
{
    export class ArrastarJanela extends BaseControle
    {
        private PosicaoXInicial: number;
        private PosicaoYInicial: number;

        private OffsetXInicial: number = 0;
        private OffsetYInicial: number = 0;

        private MaiorX: number;
        private MaiorY: number;

        public get Janela(): Janela
        {
            return this.ControlePai as Janela;
        }

        public get ElementoJanela(): HTMLElement
        {
            return this.Janela.ElementoConteudo;
        }

        public constructor(janela: Janela, elemento: HTMLElement)
        {
            super(janela, elemento);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDom(EnumEventoDom.MouseDown, this.Elemento_MouseDown);
        }

        private Window_MouseMove(domEvent: MouseEvent): void
        {
            const diferencaX = (domEvent.pageX - this.OffsetXInicial);
            const diferencaY = (domEvent.pageY - this.OffsetYInicial);

            let posicaoX = (this.PosicaoXInicial + diferencaX);
            let posicaoY = (this.PosicaoYInicial + diferencaY);

            if (posicaoX < 0) posicaoX = 0;
            if (posicaoX > this.MaiorX) posicaoX = this.MaiorX;

            if (posicaoY < 0) posicaoY = 0;
            if (posicaoY > this.MaiorY) posicaoY = this.MaiorY;

            const elementoJanela = this.ElementoJanela;
            elementoJanela.style.left = posicaoX.ToPixels();
            elementoJanela.style.top = posicaoY.ToPixels();
        }

        private Elemento_MouseDown(domEvent: MouseEvent): void
        {
            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);
            this.AdicionarEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);

            const elementoJanela = this.ElementoJanela;
            const posicoes = elementoJanela.getBoundingClientRect();

            this.PosicaoXInicial = posicoes.left;
            this.PosicaoYInicial = posicoes.top;

            elementoJanela.style.left = this.PosicaoXInicial.ToPixels();
            elementoJanela.style.top = this.PosicaoYInicial.ToPixels();
            elementoJanela.style.position = "absolute";
            //delete (elementoJanela as any);

            this.MaiorX = window.innerWidth - posicoes.width;
            this.MaiorY = window.innerHeight - posicoes.height;

            this.OffsetXInicial = domEvent.pageX;
            this.OffsetYInicial = domEvent.pageY;

            //delete (elementoJanela as any);



            domEvent.preventDefault();
        }

        private Window_MouseUp(): void
        {
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseMove, this.Window_MouseMove);
            this.RemoverEventoDomGlobal(EnumEventoDom.MouseUp, this.Window_MouseUp);
        }

        //#region  IDisposable

        public override  Dispose(): void
        {
            super.Dispose();
        }
        //#endregion
    }
}