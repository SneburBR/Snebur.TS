namespace Snebur.Imagens
{
    export class AbrirImagemLocalCanvas extends BaseAbrirImagemLocalCanvas 
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
            for (const tamanhoImagem of this.TamanhosImagem)
            {
                const dimensaoApresentacao = u.ImagemUtil.RetornarDimensaoUniformeApresentacao(
                    imagemAtual.naturalWidth,
                    imagemAtual.naturalHeight,
                    tamanhoImagem);

                const canvas = super.RetornarCanvas(imagemAtual, dimensaoApresentacao);
                const mimeType = this.RetornarMimeType();
                const blob = await this.RetornarBlobAsync(canvas, qualidade, mimeType);

                const cache = new ImagemLocalCarregada(
                    tamanhoImagem,
                    blob,
                    mimeType);

                imagensCarregada.Add(tamanhoImagem, cache);
            }
            return imagensCarregada;
        }

        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}