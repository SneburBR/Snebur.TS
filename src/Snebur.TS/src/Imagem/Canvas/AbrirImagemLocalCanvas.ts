namespace Snebur.Imagens
{
    export class AbrirImagemLocalCanvas extends BaseAbrirImagemLocalCanvas 
    {
        protected override readonly QualidadePica: number = 0;
        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;
        private readonly OrigemImagemLocal: sa.OrigemImagemLocal;
        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }

        private get DimensaoBase(): IDimensao
        {
            return {
                Largura: ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE,
                Altura: ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE,
            };
        }

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            super(origemImagemLocal.ArquivoLocal);
            this.OrigemImagemLocal = origemImagemLocal;
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public async CarergarImagemAsync(): Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            try
            {
                const imagem = await ImagemLocalUtil.RetornarElementoImagemAsync(this.ArquivoLocal, true);
                if (!(imagem instanceof HTMLImageElement))
                {
                    return null;
                }

                const imagensCarregada = await this.AbrirImagemAsync(imagem);
                await this.OrigemImagemLocal.SalvarPedenciasAsync();
                return imagensCarregada;
            }
            catch (erro)
            {
                console.error(erro);
                return null;
            }
        }

        private async AbrirImagemAsync(imagemAtual: HTMLImageElement)
        {
            const dimensaoImagemOriginal: IDimensao = {
                Largura: imagemAtual.naturalWidth,
                Altura: imagemAtual.naturalHeight
            };

            const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
            const qualidade = (ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS / 100).ToDecimal();
            const mimeType = this.RetornarMimeType();

            await this.OrigemImagemLocal.AtualizarDimensaoLocal(mimeType, dimensaoImagemOriginal);

            const tamanhoImagem = EnumTamanhoImagem.Grande;
            const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                dimensaoImagemOriginal.Largura,
                dimensaoImagemOriginal.Altura,
                tamanhoImagem);

            let canvas = await super.RetornarCanvasAsync(imagemAtual, dimensaoApresentacao);
            u.ImagemUtil.LimparElementoImagem(imagemAtual);

            const tamanhos = this.TamanhosImagem;
            /*tamanhos.Remove(EnumTamanhoImagem.Grande);*/

            for (const tamanhoImagem of tamanhos)
            {
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    dimensaoImagemOriginal.Largura,
                    dimensaoImagemOriginal.Altura,
                    tamanhoImagem);

                if (tamanhoImagem !== EnumTamanhoImagem.Grande)
                {
                    const canvasTemp = canvas;
                    canvas = await super.RetornarCanvasAsync(canvas, dimensaoApresentacao);
                    u.ImagemUtil.LimparCanvas(canvasTemp);
                }

                const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);
                const cache = new ImagemLocalCarregada(
                    tamanhoImagem,
                    blob,
                    mimeType);

                imagensCarregada.Add(tamanhoImagem, cache);
                await this.OrigemImagemLocal.AtualizarDimensaoApresentacao(
                    tamanhoImagem,
                    dimensaoApresentacao);
            }
            u.ImagemUtil.LimparCanvas(canvas);
            return imagensCarregada;
        }

        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}