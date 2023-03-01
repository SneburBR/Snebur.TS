namespace Snebur.UI
{
    export abstract class BaseControleImagem extends Snebur.UI.BaseControle
    {

        private static readonly PREFIXO_CSS_PREENCHIMENTO_IMAGEM = "sn-imagem-preenchimento--";
        private static readonly PREFIXO_CSS_ORIENTACAO_IMAGEM = "sn-imagem-orientacao--";
        private static readonly PREFIXO_CSS_RECIPIENTE_IMAGEM = "sn-imagem-recipiente--";

        private _tamanhoImagem: EnumTamanhoImagem;
        private _preenchimentoImagem: EnumPreenchimentoImagem;
        private _filtroImagem: EnumEfeitoImagem;
        private _orientacaoImagem: EnumOrientacao;

        //#region Propriedades

        public ElementoImagem: HTMLImageElement;
        public ElementoRecipienteImagem: HTMLElement;
        public ElementoSobrePosicao: HTMLElement;

        public EventoImagemCarregada: Evento;

        public get TamanhoImagem(): EnumTamanhoImagem
        {
            return this._tamanhoImagem;
        }
        public set TamanhoImagem(value: EnumTamanhoImagem)
        {
            this.NotificarPropriedadeAlterada(x => x.TamanhoImagem, this._tamanhoImagem, this._tamanhoImagem = value);
        }

        public get PreenchimentoImagem(): EnumPreenchimentoImagem
        {
            return this._preenchimentoImagem;
        }
        public set PreenchimentoImagem(value: EnumPreenchimentoImagem)
        {
            this.NotificarPropriedadeAlterada(x => x.PreenchimentoImagem, this._preenchimentoImagem, this._preenchimentoImagem = value);
            this.AtualizarPreenchimentoImagem();
        }

        public get FiltroImagem(): EnumEfeitoImagem
        {
            return this._filtroImagem;
        }
        public set FiltroImagem(value: EnumEfeitoImagem)
        {
            this.NotificarPropriedadeAlterada(x => x.FiltroImagem, this._filtroImagem, this._filtroImagem = value);
            this.AtualizarFiltroImagem();
        }

        public get OrientacaoImagem(): EnumOrientacao
        {
            return this._orientacaoImagem;
        }
        public set OrientacaoImagem(value: EnumOrientacao)
        {
            this.NotificarPropriedadeAlterada(x => x.OrientacaoImagem, this._orientacaoImagem, this._orientacaoImagem = value);
            this.AtualizarCssClassOrientacaoRecipienteImagem();
        }

        //#endregion

        //#region Inicialização

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-base-controle-imagem";

            this.EventoImagemCarregada = new Evento(this);
            this.AdicionarEventoDomGlobal("resize", this.Window_Resize, this);
        }

        private Window_Resize(e: Event)
        {
            if (this.IsControleInicializado)
            {
                this.AtualizarCssClassOrientacaoRecipienteImagem();
            }
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            //this.ElementoFigura = this.RetornarItemElemento("Figura") as HTMLImageElement;
            this.ElementoSobrePosicao = this.RetornarItemElemento("SobrePosicao") as HTMLImageElement;
            this.ElementoImagem = this.RetornarItemElemento("Imagem") as HTMLImageElement;

            this.AdicionarEventoDom(ui.EnumEventoDom.Load, this.ElementoImagemInterno_Carregada, this.ElementoImagem);

            this.TamanhoImagem = this.RetornarValorAtributoEnum(EnumTamanhoImagem, AtributosHtml.TamanhoImagem, EnumTamanhoImagem.Pequena);
            this.PreenchimentoImagem = this.RetornarValorAtributoEnum(EnumPreenchimentoImagem, AtributosHtml.PreenchimentoImagem, EnumPreenchimentoImagem.UniformeDentro);
            this.FiltroImagem = this.RetornarValorAtributoEnum(EnumEfeitoImagem, AtributosHtml.FiltroImagem, EnumEfeitoImagem.Nenhum);
            this.OrientacaoImagem = this.RetornarOrientacaoImagem();

        }

        protected override RetornarHtmlInterno(): string
        {
            const tipo = BaseControleImagem.GetType();
            return HtmlReferenciaUtil.RetornarHtml(tipo as r.TipoUIHtml);
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();
        }

        private ElementoImagemInterno_Carregada(e: UIEvent): void
        {
            this.OrientacaoImagem = this.RetornarOrientacaoImagem();
            this.AtualizarPreenchimentoImagem();
            this.EventoImagemCarregada.Notificar(this, EventArgs.Empty);

            const dimensao = this.ElementoImagem.getBoundingClientRect();
            this.ElementoSobrePosicao.style.width = dimensao.width.ToPixels();
            this.ElementoSobrePosicao.style.height = dimensao.height.ToPixels();
        }

        //#endregion

        //#region Atualizar

        private AtualizarCssClassOrientacaoRecipienteImagem(): void
        {
            EstiloUtil.RemoverClssClassePrefixo(this.ElementoImagem, BaseControleImagem.PREFIXO_CSS_ORIENTACAO_IMAGEM);
            EstiloUtil.RemoverClssClassePrefixo(this.ElementoImagem, BaseControleImagem.PREFIXO_CSS_RECIPIENTE_IMAGEM);


            if (this.PreenchimentoImagem === d.EnumPreenchimentoImagem.UniformeFora)
            {
                const sufixoRecipiente = this.RetornarCssSufixoClasseAjustaRecipienteImagem();
                if (!String.IsNullOrEmpty(sufixoRecipiente))
                {
                    EstiloUtil.RemoverClssClassePrefixo(this.ElementoImagem, BaseControleImagem.PREFIXO_CSS_ORIENTACAO_IMAGEM);
                    const cssClasseRecipiente = BaseControleImagem.PREFIXO_CSS_RECIPIENTE_IMAGEM + sufixoRecipiente;
                    this.ElementoImagem.classList.add(cssClasseRecipiente);
                    return;
                }
            }

            const sufixo = this.RetornarCssSufixoClasseOrientacaoImagem();
            if (!String.IsNullOrEmpty(sufixo))
            {
                const cssClasseOrientacao = BaseControleImagem.PREFIXO_CSS_ORIENTACAO_IMAGEM + sufixo;

                this.ElementoImagem.classList.add(cssClasseOrientacao);
                this.ElementoSobrePosicao.classList.add(cssClasseOrientacao);
            }
        }

        private AtualizarPreenchimentoImagem(): void
        {
            EstiloUtil.RemoverClssClassePrefixo(this.ElementoImagem, BaseControleImagem.PREFIXO_CSS_PREENCHIMENTO_IMAGEM);
            const sufixo = this.RetornarCssSufixoClassePreenchimento();
            if (!String.IsNullOrEmpty(sufixo))
            {
                const cssClasse = BaseControleImagem.PREFIXO_CSS_PREENCHIMENTO_IMAGEM + sufixo;
                this.ElementoImagem.classList.add(cssClasse);
                this.ElementoSobrePosicao.classList.add(cssClasse);
            }
        }

        private AtualizarFiltroImagem(): void
        {
            if (this.FiltroImagem !== EnumEfeitoImagem.Nenhum)
            {
                const filtroImagemConhecido = Snebur.Imagem.EfeitosImagem.Efeitos.Item(this.FiltroImagem);
                FiltroImagemUtil.Aplicar(this.ElementoRecipienteImagem,
                    filtroImagemConhecido.Filtro,
                    filtroImagemConhecido.SobrePosicao);
            }
            else
            {
                FiltroImagemUtil.Limpar(this.ElementoRecipienteImagem);
            }
        }

        //#endregion

        //#region Css sufixo

        private RetornarCssSufixoClassePreenchimento(): string
        {
            if (this.OrientacaoImagem === EnumOrientacao.Quadrado)
            {
                return String.Empty;
            }

            const preenchimentoImagemEnum = this.PreenchimentoImagem;
            switch (preenchimentoImagemEnum)
            {
                case (d.EnumPreenchimentoImagem.UniformeDentro):

                    return "uniforme-dentro";

                case (d.EnumPreenchimentoImagem.UniformeFora):

                    return "uniforme-fora";

                case (d.EnumPreenchimentoImagem.UniformeCheio):

                    return "uniforme-cheio";

                case (d.EnumPreenchimentoImagem.Esticar):

                    return "esticar";

                case (d.EnumPreenchimentoImagem.Nenhum):

                    return String.Empty;

                default:
                    throw new ErroNaoSuportado("O preenchimento não é suportado", this);
            }
        }

        private RetornarCssSufixoClasseOrientacaoImagem(): string
        {
            const larguraImagem = this.ElementoImagem.width;
            const alturaImagem = this.ElementoImagem.height;

            if (larguraImagem > alturaImagem)
            {
                return "horizontal";
            }
            if (alturaImagem > larguraImagem)
            {
                return "vertical";
            }
            return "quadrada";
        }

        private RetornarCssSufixoClasseAjustaRecipienteImagem(): string
        {
            const elementoRecipiente = this.ElementoRecipienteImagem;
            const larguraRecipiente = parseInt(elementoRecipiente.clientWidth);
            const alturaRecipiente = parseInt(elementoRecipiente.clientHeight);

            const larguraImagem = parseInt(this.ElementoImagem.width);
            const alturaImagem = parseInt(this.ElementoImagem.height);

            if (larguraImagem > 0 && alturaImagem > 0 &&
                larguraRecipiente > 0 && alturaRecipiente)
            {

                const dimensaoFora = u.ImagemUtil.RetornarDimencaoUniformeFora(larguraImagem, alturaImagem, larguraRecipiente, alturaRecipiente, false);
                if (dimensaoFora.Largura === larguraRecipiente)
                {
                    return "ajustar-largura";
                }
                if (dimensaoFora.Altura === alturaRecipiente)
                {
                    return "ajustar-altura";
                }

                throw new Erro("Não possível desctar a ajuste do recipiente da imagem");
            }
            return String.Empty;
        }

        //#endregion

        //#region Métodos Privados

        private RetornarOrientacaoImagem(): EnumOrientacao
        {
            const larguraImagem = this.ElementoImagem.width;
            const alturaImagem = this.ElementoImagem.height;

            if (larguraImagem > alturaImagem)
            {
                return EnumOrientacao.Horizontal;
            }

            if (alturaImagem > larguraImagem)
            {
                return EnumOrientacao.Vertical;
            }
            return EnumOrientacao.Quadrado;
        }

        //#endregion


        //#region Dispose

        public override Dispose(): void
        {
            this.RemoverEventoDomGlobal("resize", this.Window_Resize);
            super.Dispose();
        }
        //#endregion
    }
}