namespace Snebur
{
    export class InserirItemEventArgs<T = any> extends ItemEventArgs<T>
    {
        public readonly Posicao: number;

        public constructor(posicao: number, item: T)
        {
            super(item);
            this.Posicao = posicao;
        }
    }
}
