namespace Snebur.Imagem
{
    export class AbrirImagemLocal extends BaseAbrirImagemLocal 
    {
        private static readonly TIMEOUT = 90 * 1000;
        private IdTimeout: number;
        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;
        private _isAbriuIcone: boolean;

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            super(origemImagemLocal);
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public CarergarImagemAsync(): Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            this.IdTimeout = window.setTimeout(this.ResolverTimeout.bind(this), AbrirImagemLocal.TIMEOUT);
            return new Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>(this.CarregarImagem_Promise.bind(this));
        }

        private ResolverTimeout()
        {
            console.error("Timeout abrir imagem local " + this.OrigemImagemLocal.ArquivoLocal?.name);
            this.Resolver(null);
        }

        protected override Resolver(args: any)
        {
            window.clearTimeout(this.IdTimeout);
            if (args == null)
            {
                if (this._isAbriuIcone)
                {
                    super.Resolver(args);
                    throw new Erro("Falha ao abrir ícone " +  this.ArquivoLocal?.name);
                }
                this._isAbriuIcone = true;
                this.CarregarImagemLocalInterno(this.ArquivoLocal.UrlIcone);
                return;
            }
            super.Resolver(args);
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
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    imagemAtual.naturalWidth,
                    imagemAtual.naturalHeight,
                    tamanhoImagem);

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
                case d.EnumFormatoImagem.GIF:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Jpeg, 0.87);
                //return Snebur.WebWorker.SalvarJpeg.RetornarBlobAsync(imagemData, this.Qualidade);

                case d.EnumFormatoImagem.PNG:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);

                //    return Snebur.WebWorker.SalvarPneg.RetornarBytesAsync(imagemData);

                default:

                    return canvas.ToBlobAsync(u.EnumMimeTypeImagemString.Png, 1);

                /*throw new ErroNaoSuportado("O formato do imagem não é suportado");*/
            }
        }

        public override Dispose(): void
        {
            super.Dispose();
        }


    }

}