namespace Snebur
{
    export abstract class BaseServico extends Snebur.SneburObject
    {
        public abstract readonly URLServico: string;

        public constructor()
        {
            super();
            //this.Identificador = identificador;
            /*this.URLServico = urlServico;*/
        }
    }
}