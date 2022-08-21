
namespace Snebur.ServicoArquivo
{
    export class ErroCalcularChecksum extends Erro
    {
        constructor(mensagem: string, origem: any, erroInterno?: Error)
        {
            super(mensagem, origem, erroInterno);
        }
    }
}