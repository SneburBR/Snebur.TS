namespace Snebur.Imagens
{
    export class LogImagemUtil
    {
        public static CanvasSucesso(
            opcoes: IOpcoesCanvas,
            resultado: IResultadoCanvas,
            stopwatch: Stopwatch,
            isImpressao: boolean)
        {
            LogImagemUtil.LogSucessoInterno(
                opcoes.Motor,
                opcoes.NomeArquivoOrigem,
                stopwatch,
                resultado.Blob,
                opcoes.Qualidade,
                isImpressao
            );
        }

        public static SucessoMagick(
            motor: EnumMotorProcessamentoImagem,
            opcoes: IOpcoesMagick,
            resultado: IResultadoMagick,
            stopwatch: Stopwatch,
            isImpressao: boolean)
        {
            const imagemCarregada = resultado.ImagensCarregada
                .OrderByDescending(x => x.TamanhoImagem)
                .FirstOrDefault();

            LogImagemUtil.LogSucessoInterno(
                motor,
                opcoes.NomeArquivoOrigem,
                stopwatch,
                imagemCarregada.Arquivo,
                opcoes.Qualidade,
                isImpressao);

        }

        private static LogSucessoInterno(
            motor: EnumMotorProcessamentoImagem,
            nomeArquivoOrigem: string,
            stopwatch: Stopwatch,
            blob: Blob,
            qualidade: number,
            isImpressao: boolean = false): void
        {
            if (!(blob instanceof Blob))
            {
                console.error(`SUCESSO - OPERAÇAO INVALIDA ${EnumMotorProcessamentoImagem[motor]}  - Arquivo nulo após processamento Magick: ${nomeArquivoOrigem}`);
                return;
            }

            LogImagemUtil.SalvarArquivo(motor, blob, nomeArquivoOrigem, stopwatch, qualidade, isImpressao);
            const mensagem = `${EnumMotorProcessamentoImagem[motor]} - Imagem processada com sucesso: ${nomeArquivoOrigem} - t ${stopwatch.Elapsed.TotalSeconds}s - TotalBytes ${blob.size}`;
            if (window.IS_LOG_IMAGENS_SUCESSO)
            {
                console.success(mensagem);
                return;
            }
            console.log(mensagem);
        }

        private static SalvarArquivo(
            motor: EnumMotorProcessamentoImagem,
            blob: Blob,
            nomeArquivoOrigem: string,
            stopwatch: Stopwatch,
            qualidade: number,
            isImpressao: boolean)
        {
            const isSalvarArquivo = (window.IS_SALVAR_ARQUIVOS);
            if (isSalvarArquivo)
            {
                const extensao = nomeArquivoOrigem.endsWith(".jpeg") ? ".jpeg" : ".png";
                const tipo = isImpressao ? "Impressao" : "Apresentacao";
                const nomeArquivoTemporario = `${EnumMotorProcessamentoImagem[motor]}-${nomeArquivoOrigem}.${tipo}.-T.${stopwatch.Elapsed.TotalSeconds}s$--Q.${qualidade}${extensao}`;
                Salvar.SalvarComo(blob, nomeArquivoTemporario);
                return;
            }
        }

         
    }


}
