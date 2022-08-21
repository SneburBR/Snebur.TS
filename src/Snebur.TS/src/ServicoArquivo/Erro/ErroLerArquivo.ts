
namespace Snebur.ServicoArquivo
{
    export class ErroLerArquivo extends Erro
    {
        constructor(mensagem: string, origem: any, erroInterno?: Error)
        {
            super(mensagem, origem, erroInterno);
        }
    }
}