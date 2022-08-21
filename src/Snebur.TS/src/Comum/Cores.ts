
namespace Snebur
{
    export class Cores
    {
        public static get Transparente(): d.Cor
        {
            return new d.Cor(0, 0, 0, 0);
        }

        public static get Branco(): d.Cor
        {
            return new d.Cor(255, 255, 255);
        }

        public static get Preto(): d.Cor
        {
            return new d.Cor(0, 0, 0);
        }

        public static get Vermelho(): d.Cor
        {
            return new d.Cor(255, 0, 0);
        }

        public static get Verde(): d.Cor
        {
            return new d.Cor(0, 255, 0);
        }

        public static get Azul(): d.Cor
        {
            return new d.Cor(0, 0, 255);
        }

        public static get Cinza(): d.Cor
        {
            return new d.Cor(150, 150, 150);
        }
    }
}