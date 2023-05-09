namespace Snebur.Imagens
{
    export class AbrirImagemLocalCanvas extends BaseAbrirImagemLocalCanvas 
    {
        private static readonly TIMEOUT = 90 * 1000;
        private IdTimeout: number;
        private readonly TamanhosImagem: List<d.EnumTamanhoImagem>;
        private _isAbriuIcone: boolean;
        private _isSalvarPendente: boolean = false;

        public get Imagem(): d.IImagem
        {
            return this.OrigemImagemLocal.Imagem;
        }

        public constructor(origemImagemLocal: sa.OrigemImagemLocal, tamanhosImagem: List<d.EnumTamanhoImagem>)
        {
            super(origemImagemLocal);
            this.TamanhosImagem = tamanhosImagem.OrderByDescending(x => x);
        }

        public CarergarImagemAsync(): Promise<DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>>
        {
            this.IdTimeout = window.setTimeout(this.ResolverTimeout.bind(this), AbrirImagemLocalCanvas.TIMEOUT);
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
                    throw new Erro("Falha ao abrir ícone " + this.ArquivoLocal?.name);
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

        protected override async ImagemOriginalLocal_Carregada(e: Event)
        {
            super.ImagemOriginalLocal_Carregada(e);

            try
            {
                const imagensCarregada = await this.AbrirImagemAsync();
                if (this._isSalvarPendente)
                {
                    const imagem = this.Imagem;
                    const contexto = $Aplicacao.RetornarContextoDados(imagem.GetType() as r.TipoEntidade);
                    contexto.SalvarAsync(imagem);
                }
                this.Resolver(imagensCarregada);
            }
            catch (erro)
            {
                console.error(erro);
                this.Resolver(null);
            }
        }

        private async AbrirImagemAsync()
        {
            const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
            const imagemAtual: HTMLImageElement | HTMLCanvasElement = this.ImagemLocal;
            const qualidade = (ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS / 100).ToDecimal();
            const mimeType = this.RetornarMimeType();
            this.AtualizarDimensaoLocal(mimeType, { Largura: imagemAtual.naturalWidth, Altura: imagemAtual.naturalHeight });

            const tamanhoImagem = EnumTamanhoImagem.Grande;
            const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                imagemAtual.naturalWidth,
                imagemAtual.naturalHeight,
                tamanhoImagem);

            let canvas = super.RetornarCanvas(imagemAtual, dimensaoApresentacao);


            const tamanhos = this.TamanhosImagem;
            /*tamanhos.Remove(EnumTamanhoImagem.Grande);*/

            for (const tamanhoImagem of tamanhos)
            {
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    imagemAtual.naturalWidth,
                    imagemAtual.naturalHeight,
                    tamanhoImagem);

                if (tamanhoImagem !== EnumTamanhoImagem.Grande)
                {
                    canvas = super.RetornarCanvas(canvas, dimensaoApresentacao);
                }

                const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);
                const cache = new ImagemLocalCarregada(
                    tamanhoImagem,
                    blob,
                    mimeType);

                //if (tamanhoImagem === EnumTamanhoImagem.Media)
                //{
                //    imagensCarregada.Add(EnumTamanhoImagem.Grande, new ImagemLocalCarregada(
                //        tamanhoImagem,
                //        blob,
                //        mimeType));
                //    this.AtualizarDimensao(dimensaoApresentacao, EnumTamanhoImagem.Grande);
                //}

                imagensCarregada.Add(tamanhoImagem, cache);

                this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);
            }
            return imagensCarregada;

        }
        private async AbrirImagemAsync_TODAS()
        {
            const imagensCarregada = new DicionarioSimples<ImagemLocalCarregada, d.EnumTamanhoImagem>();
            const imagemAtual: HTMLImageElement | HTMLCanvasElement = this.ImagemLocal;
            const qualidade = (ImagemUtil.QUALIDADE_APRESENTACAO_CANVAS / 100).ToDecimal();
            const mimeType = this.RetornarMimeType();

            this.AtualizarDimensaoLocal(mimeType, { Largura: imagemAtual.naturalWidth, Altura: imagemAtual.naturalHeight });

            for (const tamanhoImagem of this.TamanhosImagem)
            {
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    imagemAtual.naturalWidth,
                    imagemAtual.naturalHeight,
                    tamanhoImagem);

                const canvas = super.RetornarCanvas(imagemAtual, dimensaoApresentacao);
                const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);

                const cache = new ImagemLocalCarregada(
                    tamanhoImagem,
                    blob,
                    mimeType);

                imagensCarregada.Add(tamanhoImagem, cache);

                this.AtualizarDimensao(dimensaoApresentacao, tamanhoImagem);
            }
            return imagensCarregada;
        }

        private AtualizarDimensaoLocal(mimeTypeString: u.EnumMimeTypeImagemString.Jpeg | u.EnumMimeTypeImagemString.Webp, dimensao: IDimensao)
        {
            const imagem = this.OrigemImagemLocal.Imagem;
            const formatoImagem = mimeTypeString === u.EnumMimeTypeImagemString.Jpeg ? EnumFormatoImagem.JPEG : EnumFormatoImagem.WEBP;
            const mimeType = mimeTypeString === u.EnumMimeTypeImagemString.Jpeg ? EnumMimeType.Jpeg : EnumMimeType.Webp;

            if (ImagemUtil.AtualizarDimensaLocal(imagem, dimensao, formatoImagem, mimeType, false))
            {
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

        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}