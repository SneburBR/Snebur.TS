namespace Snebur.ServicoArquivo
{
    export class OrigemArquivoLocal extends OrigemArquivo
    {
        public readonly Arquivo: d.IArquivo;
        public readonly ArquivoLocal: SnBlob;
        //private FileReader: FileReader;

        public constructor(arquivo: d.IArquivo, arquivoFile: SnBlob)
        public constructor(arquivo: d.IArquivo, arquivoBlob: SnBlob, nomeArquivo: string)
        public constructor(arquivo: d.IArquivo, arquivoOuBlob: SnBlob, nomeArquivoOpcional?: string)
        {
            super();

            const nomeArquivo = this.RetornarNomeArquivo(arquivoOuBlob, nomeArquivoOpcional);

            this.Arquivo = arquivo;
            this.ArquivoLocal = arquivoOuBlob;
            this.Arquivo.TotalBytesLocal = arquivoOuBlob.size;
            this.Arquivo.NomeArquivo = nomeArquivo;
            this.Arquivo.CaminhoArquivo = nomeArquivo;
            this.Arquivo.Status = d.EnumStatusArquivo.Novo;
        }

        private RetornarNomeArquivo(arquivoOuBlob: SnBlob, nomeArquivo: string)
        {
            if (arquivoOuBlob instanceof SnBlob)
            {
                return arquivoOuBlob.name;
            }

            if (String.IsNullOrWhiteSpace(nomeArquivo))
            {
                throw new Erro("O  nome do arquivo não foi definido");
            }
            return nomeArquivo;
        }

      
        public override Dispose(): void
        {
            super.Dispose();
        }
    }

}