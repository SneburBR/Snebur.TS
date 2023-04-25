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

        public override get Progresso(): number
        {
            return super.Progresso;
        }

        public override set Progresso(value: number)
        {
            super.Progresso = value;
        }

        public constructor(gerenciador: GerenciadorEnvioArquivo,
            imagem: d.IImagem,
            dimensaoImpressao: d.Dimensao,
            isProcessarImagem: boolean)
        {
            super(gerenciador, imagem, EnumTamanhoImagem.Impressao);

            this.DimensaoImpressao = dimensaoImpressao;
            this.IsProcessarImagem = isProcessarImagem && !imagem.IsIcone;

            if (this.IsProcessarImagem && this.DimensaoImpressao !== null && (!(this.DimensaoImpressao instanceof d.Dimensao) || this.DimensaoImpressao.IsEmpty))
            {
                throw new Erro("A dimensão de impressão não foi definida");
            }
        }

        protected override async IniciarEnvioAsync()
        {
            super.IniciarEnvioAsync();
        }

        protected async RetornarBufferAsync(): Promise<ArrayBuffer>
        {
            if (this.IsProcessarImagem)
            {
                try
                {
                    const bytes = await this.RetornarBufferInternoAsync();
                    if (bytes instanceof ArrayBuffer &&
                        bytes.byteLength > 1024 &&
                        bytes.byteLength < this.OrigemImagem.ArquivoLocal.size)
                    {
                        return bytes;
                    }

                }
                catch (erro)
                {
                    console.error("Falha a gerar imagem de impressão " + erro);
                }
            }
            return await ArquivoUtil.RetornarBufferArrayAsync(this.OrigemImagem.ArquivoLocal);
        }
        private async RetornarBufferInternoAsync(): Promise<ArrayBuffer> 
        {
          
            if (u.MagickInitUtil.IsInicializado)
            {
                try
                {
                    const abrirImagemMagick = new i.AbrirImagemImpressaoMagick(this.OrigemImagem, this.DimensaoImpressao);
                    const bytes = await abrirImagemMagick.RetornarArrayBufferAsync();
                    if (bytes?.byteLength > 1024)
                    {
                        return bytes;
                    }
                }
                catch (erro)
                {
                    console.error("Falha processar imagem de impressão usando magick");
                }
            }
            const abrirImagemCanvas = new i.AbrirImagemImpressaoCanvas(this.OrigemImagem, this.DimensaoImpressao);
            return await abrirImagemCanvas.RetornarArrayBufferAsync();
        }

        public AtualizarDimensaoImpressao(dimensao: d.Dimensao)
        {
            this.DimensaoImpressao.Largura = dimensao.Largura;
            this.DimensaoImpressao.Altura = dimensao.Altura;
        }

        protected override FinalizarEnviadoSucesso(): void
        {
            if (!this.Imagem.IsExisteArquivo)
            {
                this.Imagem.IsExisteArquivo = true;
                this.Imagem.DataHoraFimEnvio = new Date();
            }
            super.FinalizarEnviadoSucesso();
        }
    }
}