namespace Snebur.Imagem
{
    export abstract class SobrePosicaoGradiente extends SobrePosicao
    {
        public Cor1: string;

        public Cor2: string;

        public LimiteCor1: number;

        public LimiteCor2: number;

        public constructor(inicializar: SobrePosicaoGradiente)
        {
            super(inicializar);
        }
    }
}