namespace Snebur
{
    export class Size implements ISize
    {
        public width: number;
        public height: number;

        public constructor(width: number, height: number)
        {
            this.width = width;
            this.height = height;
        }
    }

}
