namespace Snebur.Imagem
{
    export class AbrirImagemLocal extends BaseAbrirImagemLocal 
    {
         private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            super(origemImagemLocal);
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public CarergarImagemAsync(): Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            return new Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>(this.CarregarImagem_Promise.bind(this));
        }

        private async CarregarImagem_Promise(resolver: (resultado: boolean) => void)
        {
            this.FuncaoResolver = resolver;
            this.CarregarImagemLocal();
        }

        private static IsAbrindo: boolean = false;

        protected override async ImagemOriginalLocal_Carregada(e: Event)
        {
            super.ImagemOriginalLocal_Carregada(e);

            if (AbrirImagemLocal.IsAbrindo && $Configuracao.IsDebug)
            {
                //alert("Existe imagem sendo aberta")
                //throw new Erro("Existe imagem sendo aberta");
            }
            AbrirImagemLocal.IsAbrindo = true;

            const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
            const imagemAtual: HTMLImageElement | HTMLCanvasElement = this.ImagemLocal;
            for (const tamanhoImagem of this.TamanhosImagem)
            {
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensagemImagem(imagemAtual.naturalWidth, imagemAtual.naturalHeight, tamanhoImagem);

                const [canvas, imagemData] = super.RetornarImagemData(imagemAtual, dimensaoApresentacao);
                const blob = await this.RetornarBlobAsync(canvas, imagemData);
                const cache = new ImagemLocalCarregada(tamanhoImagem, blob);
                imagensCarregada.Add(tamanhoImagem, cache);
            }

            AbrirImagemLocal.IsAbrindo = false;
            this.Resolver(imagensCarregada);
        }


        private RetornarBlobAsync(canvas: HTMLCanvasElement, imagemData: ImageData): Promise<Blob>
        {
            switch (this.OrigemImagemLocal.FormatoImagem)
            {
                case d.EnumFormatoImagem.JPEG:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Jpeg, 0.87);
                    //return Snebur.WebWorker.SalvarJpeg.RetornarBlobAsync(imagemData, this.Qualidade);

                case d.EnumFormatoImagem.PNG:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);

                //    return Snebur.WebWorker.SalvarPneg.RetornarBytesAsync(imagemData);

                default:

                    throw new ErroNaoSuportado("O formato do imagem não é suportado");
            }
        }

        public override Dispose(): void
        {
            super.Dispose();
        }


    }

}