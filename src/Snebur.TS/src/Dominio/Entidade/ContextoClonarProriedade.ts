namespace Snebur
{
    export class PropriedadeClonada
    {
        public readonly Propriedade: r.Propriedade;
        public readonly ValorOriginal: any;
        public ValorClonado: any;

        public constructor(propriedade: r.Propriedade, valorOriginal: any, valorClonado: any)
        {
            this.Propriedade = propriedade;
            this.ValorOriginal = valorOriginal;
            this.ValorClonado = valorClonado;
        }
    }
}
