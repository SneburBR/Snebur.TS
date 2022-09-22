namespace Snebur.UI
{
    export abstract class BaseMenuContexto extends ControleFlutuante
    {
        private _posicaoRelativa: Posicao;

        public get PosicaoRelativa(): Posicao
        {
            return this._posicaoRelativa;
        }

        public override Mostrar(e: MouseEvent)
        {
            this._posicaoRelativa = new Posicao(e.pageX, e.pageY);
            super.Mostrar(e);
        }

        protected override RetornarPosicaoX(): number
        {
            return this.PosicaoRelativa.X;
        }

        protected override RetornarPosicaoY(): number
        {
            return this.PosicaoRelativa.Y;
        }

    }
}