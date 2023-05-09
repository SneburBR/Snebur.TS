namespace Snebur.ServicoArquivo
{
    export class TarefaEnviarImagemApresentacao extends TarefaEnviarImagem
    {
        public get DimensaoSaida(): d.Dimensao
        {
            switch (this.TamanhoImagem)
            {
                case d.EnumTamanhoImagem.Miniatura:

                    return this.Imagem.DimensaoImagemMiniatura;

                case d.EnumTamanhoImagem.Pequena:

                    return this.Imagem.DimensaoImagemPequena;

                case d.EnumTamanhoImagem.Media:

                    return this.Imagem.DimensaoImagemMedia;

                case d.EnumTamanhoImagem.Grande:

                    return this.Imagem.DimensaoImagemGrande;
                default:

                    throw new Erro("O tamanho da imagem não é suportado");
            }
        }

        protected async RetornarBufferAsync(): Promise<ArrayBuffer>
        {
            const imagemCarregada = this.OrigemImagem.RetornarRetornarImagemCarregada(this.TamanhoImagem);
            //if (imagemCarregada.MimeType !== "image/webp" &&
            //    u.MagickInitUtil.IsInicializado)
            //{
            //    const buffer = await this.ConverterParaWebpAsync(imagemCarregada.ArquivoBlob);
            //    if (buffer?.byteLength > 0)
            //    {
            //        return buffer;
            //    }
            //}
            return u.ArquivoUtil.RetornarBufferArrayAsync(imagemCarregada.ArquivoBlob);
        }

        private async ConverterParaWebpAsync(arquivoBlob: Blob):  Promise<ArrayBuffer>
        {
            const buffer = await ArquivoUtil.RetornarBufferArrayAsync(arquivoBlob);
            const bytes = new Uint8Array(buffer);
            return await MagickWasm.ImageMagick.read<ArrayBuffer>(bytes, this.CarregarImagemInternoAsync.bind(this));
        }

        private async CarregarImagemInternoAsync(imageMagick: MagickWasm.IMagickImage): Promise<ArrayBuffer>
        {
            return await imageMagick.write((bytes) =>
            {
                return new Uint8Array(bytes).buffer;
             }, MagickWasm.MagickFormat.Webp);
        }

        protected override FinalizarEnviadoSucesso(): void
        {
            const args = new ImagemServidorCarregadaEventArgs(this.Imagem, this.TamanhoImagem, null);
            if (this.Imagem.OrigemImagem instanceof OrigemImagemLocal)
            {
                this.Imagem.OrigemImagem.NotificarImagemServidorCarregada(this.TamanhoImagem);
            }
            this.Imagem.EventoImagemServidorCarregada.NotificarAsync(this, args);

            super.FinalizarEnviadoSucesso();
        }

    }
}