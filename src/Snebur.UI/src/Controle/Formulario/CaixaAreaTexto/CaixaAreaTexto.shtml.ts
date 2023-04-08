namespace Snebur.UI
{
    export class CaixaAreaTexto extends BaseControleFormulario<string, HTMLTextAreaElement>
    {
        private IsRotuloFlutuante: boolean = true;
        private _marcaDagua: string;

        private MaxLength: number;

        public get MarcaDagua(): string
        {
            return this._marcaDagua;
        }
        public set MarcaDagua(value: string)
        {
            this._marcaDagua = value;
            this.AtualizarMarcaDagua();
        }
         
        private ContadorCaracteresObservacao: number = Number.Int16MaxValue;
        private IsMostrarContadorCaracteres: boolean = false;

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.DeclararPropriedade(x => x.ContadorCaracteresObservacao, Number);
            this.DeclararPropriedade(x => x.IsMostrarContadorCaracteres, Boolean);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            this.EventoCarregado.AddHandler(this.CaixaAreaTexto_Carregando, this);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this.AtribuirAtrubitosNoticoes();

            this.AdicionarEventoDom(EnumEventoDom.Change, this.ElementoTextArea_Change, this.ElementoInput);

            this.IsRotuloFlutuante = this.RetornarValorAtributoBoolean(AtributosHtml.IsRotuloFlutuante, true);
            this.IsRotuloVazio = this.RetornarValorAtributoBoolean(AtributosHtml.IsRotuloVazio, false);
            this.MaxLength = this.RetornarValorAtributoNumber(AtributosHtml.MaxLength, null, false);
            this.AdicionarEventoPropriedadeApresentacaoAlterada(AtributosHtml.CorTextoApresentacao, this.CorTextoApresentacao_PropriedadeApresentacaoAlterada);

            const isMostrarContadorCaracteres = this.RetornarValorAtributoBoolean(AtributosHtml.IsMostrarContadorCaracteres, null, false);
            if (isMostrarContadorCaracteres && this.MaxLength > 0)
            {
                this.ContadorCaracteresObservacao = this.MaxLength;
                this.IsMostrarContadorCaracteres = true;
                this.AdicionarEventoDom(ui.EnumEventoDom.Input, this.ElementoInput_Input.bind(this));
            }

            if (/*!this.IsRotuloFlutuante ||*/ this.IsRotuloVazio)
            {
                this.Elemento.classList.add("sn-sem-rotulo-flutuante");
                this.ElementoLocalRotuloFlutuante.OcultarElemento();
            }

            if (this.MaxLength > 0)
            {
                this.ElementoInput.maxLength = this.MaxLength;
            }
            this.PainelPrincipal?.AtualizarAparencia();
        }

        private async CaixaAreaTexto_Carregando()
        {
            await ThreadUtil.QuebrarAsync();
            this.PainelPrincipal?.AtualizarAparencia();
        }

        protected override InicializarComponentesApresentacao(): void
        {
            super.InicializarComponentesApresentacao();
        }

        private AtribuirAtrubitosNoticoes(): void
        {
            const elementoTextArea = this.ElementoInput;
            if (elementoTextArea instanceof HTMLTextAreaElement)
            {
                const rows = parseInt(this.Elemento.getAttribute("rows"));
                const cols = parseInt(this.Elemento.getAttribute("cols"));

                if (rows > 0)
                {
                    elementoTextArea.rows = rows;
                }

                if (cols > 0)
                {
                    elementoTextArea.cols = cols;
                }
            }
        }

        private CorTextoApresentacao_PropriedadeApresentacaoAlterada(provedor: any, e: PropriedadeApresentacaoAlteradaEventArgs): void
        {
            if (EnumUtil.IsDefindo(EnumCor, e.Valor))
            {
                const classeCor = CorUtil.RetornarClasseCssCorTexto(e.Valor);
                EstiloUtil.RemoverClssClassePrefixo(this.ElementoInput, EnumPrefixoCor.CorTexto);
                EstiloUtil.AdicionarCssClasse(EnumPrefixoCor.CorTexto, classeCor);
            }
        }

        private ElementoTextArea_Change(e: Event): void
        {
            this.AtualizarCssClassePossuiConteudo();
        }

        protected override ElementoInput_Focus(e: FocusEvent): void
        {
            super.ElementoInput_Focus(e);
            this.AtualizarVisibilidadeRotulo(false);
        }

        protected override ElementoInput_Blur(e: FocusEvent)
        {
            super.ElementoInput_Blur(e);
            this.AtualizarVisibilidadeRotulo();
        }

        private ElementoInput_Input(e: KeyboardEvent)
        {
            this.ContadorCaracteresObservacao = this.MaxLength - this.Valor?.length ?? 0;
        }

        public override AtualizarCssClassePossuiConteudo(): void
        {
            super.AtualizarCssClassePossuiConteudo();
            this.AtualizarVisibilidadeRotulo();
        }

        public SelecionarTexto(): void
        {
            this.ElementoInput?.focus();
            this.ElementoInput?.select();
        }

        private AtualizarVisibilidadeRotulo(isMostrar = true): void
        {
            if (!this.IsRotuloFlutuante)
            {
                const isPossuiConteudo = !String.IsNullOrEmpty(this.ElementoInput.value);
                this.ElementoRotulo.Visibilidade = isMostrar && !isPossuiConteudo;
            }
        }

        private AtualizarMarcaDagua()
        {
            if (this.ElementoInput.placeholder !== this.MarcaDagua)
            {
                this.ElementoInput.placeholder = ConverterUtil.ParaString(this.MarcaDagua);
            }
        }

        public override Dispose(): void
        {
            super.Dispose();
        }
    }


    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaAreaTexto
    {
        readonly PainelPrincipal: ui.PainelVertical;
        readonly ElementoLocalRotuloFlutuante: ui.LinhaPainel;
    }

    //#endregion

}