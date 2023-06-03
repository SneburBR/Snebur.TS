namespace Snebur.Imagens
{
    export class AbrirArquivoLocalCanvas extends BaseAbrirImagemLocalCanvas 
    {
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

        public async ProcessarInternoAsync(): Promise<IResultadoCanvas>
        {
            const dimensao = this.Dimensao;
            const qualidade = (ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS / 100).ToDecimal();
            const mimeType = this.RetornarMimeType();

            const imagem = await ImagemLocalUtil.RetornarElementoImagemAsync(this.ArquivoLocal, true, true);
            if (!(imagem instanceof HTMLImageElement))
            {
                return null;
            }

            const larguraImagemOrigem = imagem.naturalWidth;
            const alturaImagemOrigem = imagem.naturalHeight;

            const dimensaoCanvas = DimensaoUtil.RetornarDimencaoUniformeDentro(
                imagem.naturalWidth,
                imagem.naturalHeight,
                dimensao.Largura, dimensao.Altura);

            const canvas = super.RetornarCanvas(imagem, dimensaoCanvas);
            u.ImagemUtil.LimparElementoImagem(imagem);

            const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);
            u.ImagemUtil.LimparCanvas(canvas);

            return {
                LarguraImagemOrigem: larguraImagemOrigem,
                AlturaImagemOrigem: alturaImagemOrigem,
                Url: window.URL.createObjectURL(blob),
            };
        }
    }

    export interface IResultadoCanvas
    {
        Url?: string;
        LarguraImagemOrigem?: number;
        AlturaImagemOrigem?: number;
    }
}
