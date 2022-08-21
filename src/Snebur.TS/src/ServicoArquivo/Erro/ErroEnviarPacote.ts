
namespace Snebur.ServicoArquivo
{
    export class ErroEnviarPacote extends Erro
    {
        constructor(mensagem: string, erroInterno?: Error)
        {
            super(mensagem, erroInterno);
        }
    }
}