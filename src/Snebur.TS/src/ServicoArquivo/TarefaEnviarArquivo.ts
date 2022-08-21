namespace Snebur.ServicoArquivo
{
    export class TarefaEnviarArquivo extends BaseTarefaEnviarArquivo
    {
        protected readonly ArquivoLocal: SnBlob

        public constructor(gerenciador: GerenciadorEnvioArquivo, entidadeArquivo: d.IArquivo)
        {
            super(gerenciador, entidadeArquivo);

            if (!(entidadeArquivo.OrigemArquivo instanceof sa.OrigemArquivoLocal))
            {
                throw new Erro("  o origem do arquivo não foi definida ou não é suportada, esperado  OrigemArquivoLocal");
            }
            this.ArquivoLocal = entidadeArquivo.OrigemArquivo.ArquivoLocal;
        }

        protected RetornarBufferAsync(): Promise<ArrayBuffer>
        {
            return u.ArquivoUtil.RetornarBufferArrayAsync(this.ArquivoLocal);
        }
    }
}
