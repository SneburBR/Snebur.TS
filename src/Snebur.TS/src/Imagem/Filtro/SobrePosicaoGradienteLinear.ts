namespace Snebur.Imagem
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