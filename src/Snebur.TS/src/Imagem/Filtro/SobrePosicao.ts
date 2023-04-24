namespace Snebur.Imagens
{
    export abstract class SobrePosicao
    {
        //public Mixagem: EnumMixagem;

        public get Mixagem(): EnumMixagem
        {
            //Por impedimentos da renderização, somente o mixagem soft-light está implementada;
            return EnumMixagem.SoftLight;
        }
        public set Mixagem(value: EnumMixagem)
        {
        }
    
        //public Opacidade: number;

        public constructor(inicializar: SobrePosicao)
        {
            if (inicializar)
            {
                Object.assign(this, inicializar);
            }
        }
    }
}