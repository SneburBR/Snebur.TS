namespace Snebur.Comunicacao
{
    export class ErroComunicacao extends Erro
    {

        public readonly Codigo: number;
        public readonly Url: string;

        public constructor(mensagem: string,
            url: string,
            codigo: number, origem: any, erroInterno?: Error)
        {
            super(mensagem, origem, erroInterno);

            this.Url = url;
            this.Codigo = codigo;
        }
    }
}