namespace Snebur
{
    export abstract class BaseServico extends Snebur.Objeto
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