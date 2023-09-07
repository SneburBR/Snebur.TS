namespace Snebur.Comunicacao
{
    export abstract class BaseRequisicao  
    {
        public static Contador = 0;

        public abstract readonly UrlRequisicao: string;


        public constructor()
        {
            BaseRequisicao.Contador += 1;
        }

        public abstract ExecutarAsync(): Promise<any>;
    }
}
