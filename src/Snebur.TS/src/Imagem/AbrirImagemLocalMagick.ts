﻿namespace Snebur.Imagens
{
    type DicionarioImagensCarregada = DicionarioSimples<i.ImagemLocalCarregada, d.EnumTamanhoImagem>;

    export class AbrirImagemLocalMagick implements IDisposable
    {
        private _isSalvarPendente: boolean = false;
        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;

        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }
        public constructor(
            private readonly OrigemImagemLocal: sa.OrigemImagemLocal,
            tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public async CarergarImagemAsync(): Promise<DicionarioImagensCarregada>
        {
            const blob = this.OrigemImagemLocal?.ArquivoLocal;
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(blob);
            const bytes = new Uint8Array(buffer);

            const dimensao= `${ConstantesImagemApresentacao.LARGURA_IMAGEM_GRANDE}x${ConstantesImagemApresentacao.ALTURA_IMAGEM_GRANDE}`;

            const settings = new MagickWasm.MagickReadSettings();
            settings.setDefine(
                MagickWasm.MagickFormat.Jpeg,
                "size",
                dimensao);

            const imagensCarregada = await MagickWasm.ImageMagick.read<DicionarioImagensCarregada>(
                bytes,
                settings,
                this.CarregarImagemInternoAsync.bind(this));

            if (this._isSalvarPendente)
            {
                const imagem = this.Imagem;
                const contexto = $Aplicacao.RetornarContextoDados(imagem.GetType() as r.TipoEntidade);
                await contexto.SalvarAsync(imagem);
            }

            return imagensCarregada;
        }

        private async CarregarImagemInternoAsync(imageMagick: MagickWasm.IMagickImage): Promise<DicionarioImagensCarregada>
        {
            imageMagick.filterType = MagickWasm.FilterType.Hermite;
            imageMagick.quality = ImagemUtil.QUALIDADE_APRESENTACAO_MAGICK;
            imageMagick.autoOrient();
             
            const formatoDestino = (imageMagick.format === MagickWasm.MagickFormat.Jpeg ||
                imageMagick.format === MagickWasm.MagickFormat.Jpg) ?
                MagickWasm.MagickFormat.Jpeg :
                MagickWasm.MagickFormat.Webp;

            const mimeType = formatoDestino === MagickWasm.MagickFormat.Jpeg ?
                "image/jpeg" : "image/webp";

            this.AtualizarDimensaoLocal(imageMagick.width, imageMagick.height);

            try
            {
                const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
                for (const tamanhoImagem of this.TamanhosImagem)
                {
                    const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                        imageMagick.width,
                        imageMagick.height,
                        tamanhoImagem);

                    imageMagick.resize(dimensaoApresentacao.Largura, dimensaoApresentacao.Altura);

                    await imageMagick.write((bytes) =>
                    {
                        this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);

                        const blob = new Blob([bytes], { type: mimeType });
                        const cache = new ImagemLocalCarregada(
                            tamanhoImagem,
                            blob,
                            mimeType);

                        imagensCarregada.Add(tamanhoImagem, cache);

                    }, formatoDestino);
                }
                return imagensCarregada;
            }
            finally
            {
                imageMagick.dispose();
            }
        }

        private AtualizarDimensaoLocal(largura: number, altura: number)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            if (imagem.DimensaoImagemLocal.Largura !== largura)
            {
                imagem.DimensaoImagemLocal.Largura = largura;
                this._isSalvarPendente = true;
            }

            if (imagem.DimensaoImagemLocal.Altura !== altura)
            {
                imagem.DimensaoImagemLocal.Altura = altura;
                this._isSalvarPendente = true;
            }

            if (imagem.IsIcone)
            {
                imagem.IsIcone = false;
                this._isSalvarPendente = true;
            }
        }

        private AtualizarDimensao(dimensaoApresentacao: d.Dimensao, tamanhoImagem: d.EnumTamanhoImagem)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            if (ImagemUtil.AtualizarDimensao(imagem, dimensaoApresentacao, tamanhoImagem))
            {
                this._isSalvarPendente = true;
            }
        }

        public Dispose(): void
        {

        }
    }
}
