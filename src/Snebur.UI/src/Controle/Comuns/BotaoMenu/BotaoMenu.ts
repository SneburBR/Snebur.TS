namespace Snebur.UI
{
    export class BotaoMenu extends ControleFlutuante
    {
        private static readonly ALTURA_BOTAO_MENU_ITEM = 36;

        private _larguraInicial: number;
        protected override get AlturaInicial(): number
        {
            const count = this.IsControleInicializado ? this.ControlesFilho.OfType(BotaoMenuItem).
                Where(x => ElementoUtil.IsVisivel(x.Elemento)).length :
                this.ControlesFilho.OfType(BotaoMenuItem).length;

            return count * BotaoMenu.ALTURA_BOTAO_MENU_ITEM;
        }

        protected override get LarguraInicial(): number
        {
            if (!this._larguraInicial)
            {
                this._larguraInicial = this.RetornarLarguraInicial();
            }
            return this._larguraInicial;
        }

        protected override set LarguraInicial(value: number)
        {
            this._larguraInicial = value;
        }

        protected override get DiferencaPosicaoX(): number
        {
            return this.Margem.Esquerda.Valor;
        }

        public override get DiferencaPosicaoY()
        {
            return this.Margem.Superior.Valor;
        }

        public override get ControleApresentacao(): ControleApresentacao
        {
            return this.ControlePai.RetornarControlePai(ControleApresentacao);
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            if (!(controlePai instanceof Botao))
            {
                throw new ErroNaoSuportado("O botao menu dever ser filho do controle Botao", this);
            }
        }

        public override HtmlCarregado(): void
        {
            super.HtmlCarregado();
            CssClassUtil.AdicionarCssClasse(this.Elemento, "sn-botao-menu");
            this.DestinoControleFlutuante = this.RetornarDestinoControleFlutuante();
        }

        protected override RetornarHtmlInterno()
        {
            const htmlInterno = this.Elemento.innerHTML;
            return htmlInterno;
        }

        protected override Inicializar(): void
        {
            super.Inicializar();
            this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.Botao_Click, this.ControlePai.Elemento);
        }
        private Botao_Click(e: MouseEvent): void
        {
            this.Mostrar();
        }

        public override RetornarDestinoControleFlutuante(): EnumDestinoControleFlutuante
        {
            const valorAtributo = this.RetornarValorAtributoEnum(EnumDestinoControleFlutuante, AtributosHtml.DestinoControleFlutuante, null);
            if (EnumUtil.IsDefindo(EnumDestinoControleFlutuante, valorAtributo))
            {
                return valorAtributo;
            }
            return super.RetornarDestinoControleFlutuante();
        }
        private RetornarLarguraInicial(): number
        {
            const valorAtributoLarguraItem = this.RetornarValorAtributo(AtributosHtml.LarguraItem, null);
            if (!String.IsNullOrEmpty(valorAtributoLarguraItem))
            {
                const larguraItem = valorAtributoLarguraItem.ToNumber(true);
                if (larguraItem > 0)
                {
                    return larguraItem;
                }
            }
            return this.ControlePai.Elemento.clientWidth;
        }

        public override Dispose(): void
        {
            super.Dispose();
        }
    }
}