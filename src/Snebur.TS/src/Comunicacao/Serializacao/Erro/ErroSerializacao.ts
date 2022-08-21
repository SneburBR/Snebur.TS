namespace Snebur.Serializacao
{
    export class ErroSerializacao extends Erro
    {
        public constructor(mensagem: string, origem: any, erroInterno?: Error)
        {
            super(mensagem, origem, erroInterno);
        }
    }
}