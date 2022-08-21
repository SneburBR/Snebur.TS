namespace Snebur
{
   export class ErroNaoSuportado extends Erro
    {
        public constructor(mensagem?: string)
        public constructor(mensagem: string, erroInterno: Error)
        public constructor(mensagem: string, origem: any, erroInterno?: Error)
        public constructor(mensagem?: string, argumento1?: any, argumento2?: any)
        {
            super(mensagem, argumento1, argumento2);
        }
    }
}