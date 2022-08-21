namespace Snebur.UI
{
    export class BindImagem extends BaseBind
    {
        private static readonly IMAGEM_VAZIA: string = "vazia";

        public Controle: BaseControle;
        private TamanhoImagem: d.EnumTamanhoImagem;
        private ElementoImagem: HTMLImageElement
        private Imagem: d.IImagem;
        private readonly IsCache: boolean;

        private ImagemTemporariaServidor: HTMLImageElement

        public constructor(controlePai: BaseControle, elemento: HTMLElement, valorAtributo: string)
        {
            super(controlePai, elemento, AtributosHtml.BindImagem, valorAtributo);

            this.TamanhoImagem = this.RetornarTamanhoImagem();
            this.IsCache = this.RetornarIsCache();
            this.Controle = this.ControlePai.ControlesFilho.Where(x => x.IDElemento === this.IDElemento).SingleOrDefault();
            this.ElementoImagem = this.RetornarIDElementoImagem();
        }

        private RetornarIDElementoImagem(): HTMLImageElement
        {
            if (this.Controle instanceof ControleImagem)
            {
                return (this.Controle as ControleImagem).ElementoImagem;
            }

            if (this.Elemento instanceof HTMLImageElement)
            {
                return this.Elemento;
            }
            throw new ErroNaoSuportado("O controle ou elemento não é suportado pelo bind-imagem ", this);
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventosDom();
        }

        public ValorPropriedadeAlterado(antigoValor: any, novoValor: any): void
        {
            this.AtualizarImagemCarregando();
            if ((novoValor instanceof d.Entidade) &&
                (novoValor as any as d.IImagem).EventoImagemLocalCarregada instanceof Evento)
            {
                this.Imagem = novoValor as any as d.IImagem;
                this.CarregarImagem();
            }
            else
            {
                this.AtualizarImagemPendente();
            }
        }

        private CarregarImagem(): void
        {
            const imagem = this.Imagem;
            const tamanhoImagem = this.RetornarTamanhoImagemNormalizado(imagem);

            if (imagem.ExisteImagem(tamanhoImagem))
            {
                this.CarregarImagemInterno(imagem, tamanhoImagem);
            }
            else
            {
                this.NormalizarImagemPedente(imagem, tamanhoImagem);

            }
        }

        private CarregarImagemInterno(imagem: d.IImagem, tamanhoImagem: EnumTamanhoImagem): void
        {
            if (!this.IsDispensado)
            {
                let urlImagem = imagem.RetornarUrlImagem(tamanhoImagem);
                if (!this.IsCache)
                {
                    urlImagem += "&" + GuidUtil.RetornarNovoGuid();
                }
                this.ElementoImagem.UrlImagem = urlImagem;
            }
        }

        private NormalizarImagemPedente(imagem: d.IImagem, tamanhoImagem: EnumTamanhoImagem): void
        {
            if (!u.ImagemUtil.ExisteImagemServidor(imagem, tamanhoImagem))
            {
                imagem.EventoImagemServidorCarregada.AddHandler(this.ImagemServidor_Carregada, this);
            }
            imagem.EventoImagemLocalCarregando.AddHandler(this.ImagemLocal_Carregando, this);
            imagem.EventoImagemLocalCarregada.AddHandler(this.ImagemLocal_Carregada, this);

            if (!(imagem.OrigemImagem instanceof sa.OrigemImagemLocal))
            {
                if (sa.OrigemImagemLocalUtil.ExisteOrigemImagemLocal(imagem))
                {
                    imagem.OrigemImagem = sa.OrigemImagemLocalUtil.RetornarOrigemImagemLocal(imagem);
                }
            }

            if (imagem.OrigemImagem instanceof sa.OrigemImagemLocal)
            {
                $Aplicacao.GerenciadorAbrirImagemLocal.AbrirImagemVirtualizacao(imagem);
                this.AtualizarImagemCarregando();
            }
            else
            {
                this.AtualizarImagemPendente();
            }
        }

        private RetornarUrlImagem(imagem: d.IImagem, tamanhoImagem: d.EnumTamanhoImagem): string
        {
            return imagem.RetornarUrlImagem(tamanhoImagem);
        }

        private RetornarTamanhoImagem(): d.EnumTamanhoImagem
        {
            const valorAtributoTamanhoImagem = this.RetornarValorAtributo(AtributosHtml.TamanhoImagem);
            if (String.IsNullOrWhiteSpace(valorAtributoTamanhoImagem))
            {
                return d.EnumTamanhoImagem.Automatico;
            }
            else
            {
                return u.EnumUtil.RetornarValor(d.EnumTamanhoImagem, valorAtributoTamanhoImagem);
            }
        }

        private RetornarIsCache(): boolean
        {
            const valorAtributoIsCache = this.RetornarValorAtributo(AtributosHtml.IsCache, true);
            if (String.IsNullOrWhiteSpace(valorAtributoIsCache))
            {
                return true;
            }
            else
            {
                return ConverterUtil.ParaBoolean(valorAtributoIsCache);
            }
        }

        private RetornarTamanhoImagemNormalizado(imagem: d.IImagem): d.EnumTamanhoImagem
        {
            if (this.TamanhoImagem === d.EnumTamanhoImagem.Automatico)
            {
                /*let elemento = this.ElementoImagem.parentElement;*/
                const dimensao = ElementoUtil.RetornarDimensaoElemento(this.Elemento);
                if (dimensao.IsEmpty)
                {
                    console.warn(` O tamanho automático não pode ser definido porque o elemento não possui uma dimensão.
                                   Retornando tamanho médio.
                                   Controle: ${this.ControleApresentacao.___NomeConstrutor}
                                   Elemento: ${this.Elemento.outerHTML.substring(0, 100)} `);

                    return d.EnumTamanhoImagem.Media;
                }
                return u.ImagemUtil.RetornarTamanhoImagemAutomatico(imagem, dimensao);
            }
            return this.TamanhoImagem;
        }

        private ImagemLocal_Carregando(provedor: any, e: EventArgs): void
        {
            this.AtualizarImagemCarregando();
        }

        private ImagemLocal_Carregada(provedor: any, e: ImagemLocalCarregadaEventArgs): void
        {
            if (!this.IsDispensado)
            {
                this.CarregarImagem();
            }
        }

        private ImagemServidor_Carregada(): void
        {
            if (!this.IsDispensado)
            {
                this.CarregarImagem();
            }
        }

        private MostrarImagemErro()
        {
            if (this.Controle && this.Controle.IsControleInicializado)
            {
                this.ElementoImagem.UrlImagem = u.ImagemUtil.ImagemErro;
            }
        }


        //#region Carregando

        private AtualizarImagemPendente(): void
        {
            const urlImagemPendente = this.RetornarUrlImagemPendente();
            this.ElementoImagem.UrlImagem = urlImagemPendente;
            //this.CentralizarMiniaturaCarregando();
        }

        private RetornarUrlImagemPendente(): string
        {
            const urlImagemPendente = this.RetornarValorAtributoRecursivo(AtributosHtml.UrlImagemPendente);
            if (!String.IsNullOrEmpty(urlImagemPendente))
            {
                if (urlImagemPendente === BindImagem.IMAGEM_VAZIA)
                {
                    return u.ImagemUtil.ImagemVaziaBase64;
                }
                return urlImagemPendente;
            }
            return u.ImagemUtil.ImagemPendente;
        }

        private AtualizarImagemCarregando(): void
        {
            this.ElementoImagem.UrlImagem = u.ImagemUtil.ImagemCarregando;
            //this.CentralizarMiniaturaCarregando();
        }

        //private CentralizarMiniaturaCarregando(): void
        //{
        //    if (this.ElementoImagem instanceof HTMLElement && this.ElementoImagem.parentElement)
        //    {
        //        let larguraRecipiente = this.ElementoImagem.parentElement.clientWidth;
        //        let alturaRecipiente = this.ElementoImagem.parentElement.clientHeight;

        //        let larguraImagem = this.ElementoImagem.naturalWidth;
        //        let alturaImagem = this.ElementoImagem.naturalHeight;
        //        if (larguraRecipiente > 0 && alturaRecipiente > 0)
        //        {
        //            this.CentralizarElementoImagem(larguraRecipiente, alturaRecipiente, larguraImagem, alturaImagem, false);
        //        }
        //    }
        //}

        //private CentralizarElementoImagem(larguraRecipiente: number, alturaRecipiente: number, larguraImagem: number, alturaImagem: number, isMiniaturaFoto: boolean)
        //{
        //    let dimensao = u.ImagemUtil.RetornarDimencaoUniformeDentro(larguraImagem, alturaImagem,
        //        larguraRecipiente, alturaRecipiente, true, isMiniaturaFoto);

        //    let x = (larguraRecipiente - dimensao.Largura) / 2;
        //    let y = (alturaRecipiente - dimensao.Altura) / 2;

        //    this.ElementoImagem.style.width = dimensao.Largura.ToPixels();
        //    this.ElementoImagem.style.height = dimensao.Altura.ToPixels();

        //    this.ElementoImagem.style.left = x.ToPixels();
        //    this.ElementoImagem.style.top = y.ToPixels();
        //}

        //#endregion

        //#region Eventos dom

        private AdicionarEventosDom(): void
        {
            this.AdicionarEventoDom(EnumEventoDom.Abort, this.ElementoImagem_Abort.bind(this), this.ElementoImagem);
            this.AdicionarEventoDom(EnumEventoDom.Error, this.ElementoImagem_Error.bind(this), this.ElementoImagem);
        }

        private ElementoImagem_Error(e: Event): void
        {
            this.MostrarImagemErro();
        }

        private ElementoImagem_Abort(e: Event): void
        {
            this.MostrarImagemErro();
        }
        //#region IDisposable

        public override Dispose(): void
        {
            //if (this.Controle instanceof BaseControle)
            //{
            //    this.Controle.EventoCarregado.RemoveHandler(this.__Controle_Carregado);
            //}
            //this.RemoverEventosDom();
            super.Dispose();
        }
        //#endregion
    }
}