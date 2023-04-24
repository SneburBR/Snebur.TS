namespace Snebur.Imagens
{
    export class SobrePosicaoGradienteLinear extends SobrePosicaoGradiente
    {
        public Direcao: EnumDirecaoGradiente;

        public constructor(inicializar: SobrePosicaoGradienteLinear)
        {
            super(inicializar);
        }
    }
}