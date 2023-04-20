namespace Snebur.UI
{
    export class ControleImagens extends BaseControleImagem
    {
        //#region Propriedades

        public IndiceAtual: number = 0;
        public IdentificadorTimeout: number = 0;
        public ExibicaoImagensIniciado: boolean = false;

        //#region Propriedades Implementadas

        private _imagens: Array<d.IImagem> = null;

        public get Imagens(): Array<d.IImagem>
        {
            return this._imagens;
        }

        public set Imagens(value: Array<d.IImagem>)
        {
            this._imagens = value;
            this.IndiceAtual = 0;
            this.IniciarExibicaoImagens();
        }

        private get IsCarregarProximaImagem()
        {
            let controlePai = this.ControleApresentacaoPai;
            while (controlePai != null)
            {
                if (controlePai.DicionarioControlesFilho.Valores.Any(x => x instanceof ui.Janela))
                {
                    return false;
                }
                if (controlePai === this.ControleApresentacaoPai)
                {
                    break;
                }
                controlePai = this.ControleApresentacaoPai;
            }
            return true;
        }
        //#endregion

        //#endregion

        //#region Inicialização

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.CssClasseControle += " sn-controle-imagens";

            this.EventoCarregado.AddHandler(this.ControleImagens_Carregado, this);
        }
        //#endregion

        //#region Métodos Privados

        private ControleImagens_Carregado(provador: any, e: EventArgs): void
        {
            if (this.Imagens instanceof Array && !this.ExibicaoImagensIniciado)
            {
                this.IniciarExibicaoImagens();
            }
        }

        private IniciarExibicaoImagens(): void
        {
            window.clearTimeout(this.IdentificadorTimeout);
            if (this.IsControleInicializado && this.Imagens instanceof Array && this.Imagens.Count > 0) 
            {
                this.ExibicaoImagensIniciado = true;
                this.ProximaImagem();
            }
        }

        private ProximaImagem(): void
        {
            if (this.IsControleInicializado)
            {
                if (!this.IsCarregarProximaImagem)
                {
                    return;
                }
                if (this.IndiceAtual > (this.Imagens.Count - 1))
                {
                    this.IndiceAtual = 0;
                }
                const imagem = this.Imagens[this.IndiceAtual];
                if (!(imagem instanceof d.Entidade))
                {
                    throw new Erro("A imagem não é suportada", this);
                }

                if (!u.EntidadeUtil.IsImagem(imagem))
                {
                    throw new Erro(`A entidade ${imagem.GetType().Nome} não é suportada pelo bind-imagens no ControleImagens.  em ${this.ControleApresentacao.___NomeConstrutor}`);
                }

                const urlImagemServidor = u.ImagemUtil.RetornarUrlImagem(imagem, this.TamanhoImagem);
                this.ElementoImagem.UrlImagem = urlImagemServidor;

                this.IndiceAtual += 1;
                this.IdentificadorTimeout = window.setTimeout(this.ProximaImagem.bind(this), TimeSpan.FromSeconds(10).TotalMilliseconds);
            }
        }

        //#endregion

        //#region Métodos Sobre escritos

        public override Dispose(): void
        {
            window.clearTimeout(this.IdentificadorTimeout);
            super.Dispose();
        }
        //#endregion
    }
}