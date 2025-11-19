namespace Snebur.Imagens
{
    export class AbrirArquivoLocalCanvas extends BaseAbrirImagemLocalCanvas 
    {
        protected override readonly QualidadePica: number = 0;
        private _opcoes: IOpcoesCanvas;
        public get Opcoes(): IOpcoesCanvas
        {
            return this._opcoes;
        }
        public constructor(
            arquivo: SnBlob,
            private Dimensao: IDimensao)
        {
            super(arquivo);
        }

        public async ProcessarAsync(): Promise<IResultadoCanvas>
        {
            try
            {
                return await this.ProcessarInternoAsync();
            }
            catch (erro)
            {
                console.error(`Erro a carregar arquivo com canvas ${erro} - ${this.ArquivoLocal.name}`);
                return null;
            }
        }

        private async ProcessarInternoAsync(): Promise<IResultadoCanvas>
        {
            const stopwatch = Stopwatch.StartNew();
            const dimensao = this.Dimensao;

            const mimeType = this.RetornarMimeType();

            const imagem = await ImagemLocalUtil.RetornarElementoImagemAsync(this.ArquivoLocal, true);
            if (!(imagem instanceof HTMLImageElement))
            {
                return null;
            }

            const larguraImagemOrigem = imagem.naturalWidth;
            const alturaImagemOrigem = imagem.naturalHeight;

            const dimensaoCanvas = DimensaoUtil.RetornarDimencaoUniformeDentro(
                imagem.naturalWidth,
                imagem.naturalHeight,
                dimensao.Largura,
                dimensao.Altura,
                true,
                false);

            const [canvas, motor] = await super.RetornarCanvasAsync(imagem, dimensaoCanvas);
            u.ImagemUtil.LimparElementoImagem(imagem);

            const isImagemBrancaOuPreta = ImageDataUtil.IsCanvasImagemBrancaOuPreta(canvas);
            if (isImagemBrancaOuPreta)
            {
                console.error(`${this.ArquivoLocal.name}: Imagem branco preta detectada no canvas`);
            }
            const qualidade = (ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS / 100).ToDecimal();
            const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);
            u.ImagemUtil.LimparCanvas(canvas);

            const opcoes: IOpcoesCanvas = {
                Motor: motor,
                NomeArquivoOrigem: this.ArquivoLocal.name,
                Qualidade: ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS,
                Altura: dimensaoCanvas.Altura,
                Largura: dimensaoCanvas.Largura,
                MimeType: mimeType
            };

            const resultado = {
                LarguraImagemOrigem: larguraImagemOrigem,
                AlturaImagemOrigem: alturaImagemOrigem,
                Blob: blob,
                LarguraImagem: dimensaoCanvas.Largura,
                AlturaImagem: dimensaoCanvas.Altura,
                Url: window.URL.createObjectURL(blob),
                IsAlertaSemPerfilBrancaOuPreta: isImagemBrancaOuPreta
            };

            LogImagemUtil.CanvasSucesso(
                opcoes,
                resultado,
                stopwatch,
                false);

            return resultado;
        }
    }

    export interface IResultadoCanvas
    {
        Url?: string;
        LarguraImagemOrigem?: number;
        AlturaImagemOrigem?: number;
        LarguraImagem: number;
        AlturaImagem: number;
        Blob: Blob;
        IsAlertaSemPerfilBrancaOuPreta: boolean
    }
    export interface IOpcoesCanvas
    {
        Motor: EnumMotorProcessamentoImagem,
        NomeArquivoOrigem: string;
        Qualidade: number;
        MimeType: string;
        Largura: number;
        Altura: number
    }
}
