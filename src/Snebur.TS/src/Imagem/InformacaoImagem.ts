namespace Snebur.Imagem
{
    export class InformacaoImagem implements IInformacaoImagem
    {
        public FormatoImagem: d.EnumFormatoImagem;
        public Dimensao: d.Dimensao;
        public Tamanho: string;
        public IsImagem: boolean;
        public Largura: number;
        public Altura: number;
        public NomeArquivo: string;
        public TotalBytes: number;
        public Formato: string;
        public Rotacao: number;

        public constructor(nomeArquivo: string,
            formatoEnum: d.EnumFormatoImagem,
            totalBytes: number, tamanho: string, isImagem: boolean,
            formato: string,
            largura: number,
            altura: number,
            rotacao: number)
        {
            this.FormatoImagem = formatoEnum;
            this.Tamanho = tamanho;
            this.IsImagem = isImagem;
            this.Largura = largura;
            this.Altura = altura;
            this.NomeArquivo = nomeArquivo;
            this.TotalBytes = totalBytes;
            this.Formato = formato;
            this.Rotacao = rotacao;

            //this.Dimensao  = di
        }


        public static RetornarInfoFalha(arquivo: SnBlob): IInformacaoImagem
        {
            return {
                IsImagem: false,
                Type: "desconhecido",
                NomeArquivo: arquivo.name,
                Largura: 0,
                Altura: 0,
                FormatoImagem: EnumFormatoImagem.Desconhecido,
                TotalBytes: arquivo.size,
            };
        }

    }
}
