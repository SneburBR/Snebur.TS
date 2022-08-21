namespace Snebur.ServicoArquivo
{
    export class TarefaEnviarImagemImpressao extends TarefaEnviarImagem
    {
        public readonly DimensaoImpressao: d.Dimensao;
        private readonly IsProcessarImagem: boolean;

        public get DimensaoSaida(): d.Dimensao
        {
            return this.DimensaoImpressao;
        }

        public constructor(gerenciador: GerenciadorEnvioArquivo, imagem: d.IImagem,
            dimensaoImpressao: d.Dimensao,
            isProcessarImagem: boolean)
        {
            super(gerenciador, imagem, EnumTamanhoImagem.Impressao);

            this.DimensaoImpressao = dimensaoImpressao;
            this.IsProcessarImagem = isProcessarImagem;


            if (this.IsProcessarImagem && this.DimensaoImpressao !== null && (!(this.DimensaoImpressao instanceof d.Dimensao) || this.DimensaoImpressao.IsEmpty))
            {
                throw new Erro("A dimensão de impressão não foi definida");
            }
        }

        protected override async IniciarEnvioAsync()
        {
           
            super.IniciarEnvioAsync();
        }

        protected RetornarBufferAsync(): Promise<ArrayBuffer>
        {
            if (this.IsProcessarImagem)
            {
                const abrirImagem = new i.AbrirImagemImpressao(this.OrigemImagem, this.DimensaoImpressao);
                return abrirImagem.RetornarArrayBufferAsync();
            }
            return ArquivoUtil.RetornarBufferArrayAsync(this.OrigemImagem.ArquivoLocal);
        }

        public AtualizarDimensaoImpressao(dimensao: d.Dimensao)
        {
            this.DimensaoImpressao.Largura = dimensao.Largura;
            this.DimensaoImpressao.Altura = dimensao.Altura;
        }

        protected override FinalizarEnviadoSucesso(): void
        {
            this.Imagem.IsExisteArquivo = true;
            super.FinalizarEnviadoSucesso();
        }
    }
}