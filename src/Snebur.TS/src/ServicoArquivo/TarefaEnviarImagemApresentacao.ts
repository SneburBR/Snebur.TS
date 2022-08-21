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

                    throw new Erro("O tmanaho da imagem não é suportado");
            }
        }


        protected RetornarBufferAsync(): Promise<ArrayBuffer>
        {
            return this.OrigemImagem.RetornarArrayBufferImagemCarregadaAsync(this.TamanhoImagem);
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