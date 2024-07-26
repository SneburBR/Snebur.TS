namespace Snebur
{
    export abstract class BaseServico extends Snebur.SneburObject
    {
        public abstract readonly UrlServico: string;

        public constructor()
        {
            super();
            //this.Identificador = identificador;
            /*this.UrlServico = urlServico;*/
        }
    }
}