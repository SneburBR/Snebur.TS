namespace Snebur.ServicoArquivo
{
    export class TarefaEnviarImagemImpressao extends TarefaEnviarImagem
    {
        public readonly DimensaoImpressao: d.Dimensao;
        private readonly IsProcessarImagem: boolean;
        private _isImagemProcessada: boolean = false;

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

        public constructor(
            gerenciador: GerenciadorEnvioArquivo,
            imagem: d.IImagem,
            dimensaoImpressao: d.Dimensao,
            isProcessarImagem: boolean)
        {
            super(gerenciador, imagem, EnumTamanhoImagem.Impressao);

            this.DimensaoImpressao = dimensaoImpressao;
            this.IsProcessarImagem = isProcessarImagem && !imagem.IsIcone && !DimensaoUtil.IsEmpty(dimensaoImpressao);

            if (isProcessarImagem &&
                (dimensaoImpressao == null || DimensaoUtil.IsEmpty(dimensaoImpressao)))
            {
                console.log("A dimensão de impressão não foi definida");
                /*throw new Erro("A dimensão de impressão não foi definida");*/
            }
        }

        protected override async IniciarEnvioAsync()
        {
            return super.IniciarEnvioAsync();
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
                        this._isImagemProcessada = true;
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
            if (!window.__IS_USAR_CANVAS__ && i.MagickInitUtil.IsInicializado)
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

        protected override async FinalizarEnviadoSucessoAsync(): Promise<void>
        {
            const imagem = this.Imagem;

            imagem.IsExisteArquivo = true;
            imagem.DataHoraFimEnvio = new Date();
            imagem.IsImagemProcessada = this._isImagemProcessada;

            if (!this._isImagemProcessada)
            {
                imagem.DimensaoImagemImpressao = imagem.DimensaoImagemLocal;
            }

            const contexto = $Aplicacao.RetornarContextoDados(imagem.GetType() as r.TipoEntidade);
            await contexto.SalvarPropriedadesAsync(imagem,
                x => x.IsExisteArquivo,
                x => x.DataHoraFimEnvio,
                x => x.IsImagemProcessada,
                x => x.DimensaoImagemImpressao);

            await super.FinalizarEnviadoSucessoAsync();
        }
    }
}