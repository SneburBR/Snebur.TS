namespace Snebur.UI
{
    export class MenuSanfona extends BaseMenu
    {
        public get MenuPai(): Menu
        {
            return this.RetornarControlePai(Menu);
        }

        //#region Propriedades

        private IsAberto: boolean = false;

        private ElementoDestinoMenuItem: HTMLElement;
        //private get ElementosMenuItem(): Array<HTMLElement>
        //{
        //    let controlesMenuItem = this.ControlesFilho.OfType<MenuItem>(MenuItem).ToList();
        //    return controlesMenuItem.Select(x => x.Elemento).ToList();
        //}
        //#endregion

        //#region Inicialização

        private AlturaElementoDestinoMenuItem: number;

        public constructor(controlePai: Snebur.UI.BaseControle, elemento: HTMLElement) 
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-menu-sanfona";
        }
         
        protected override Inicializar(): void
        {
            super.Inicializar();

            this.AdicionarEventoDom(EnumEventoDom.Click, this.ElementoConteudo_Click, this.ElementoConteudo);
            this.AlturaElementoDestinoMenuItem = parseInt(this.ElementoDestinoMenuItem.RetornarValorEstiloComputado(x => x.height));

            if (this.AlturaElementoDestinoMenuItem > 0)
            {
                this.ElementoDestinoMenuItem.style.height = "0";
                this.ElementoDestinoMenuItem.style.transition = "height .25s";
            }
            else
            {
                this.ElementoDestinoMenuItem.OcultarElemento();
            }

            //ElementoUtil.OcultarElementos(this.ElementosMenuItem);
        }

        protected override RetornarHtmlInterno(): string
        {
            const htmlBaseMenu = HtmlReferenciaUtil.RetornarHtml(BaseMenu.GetType() as r.TipoUIHtml);
            const htmlInterno = HtmlReferenciaUtil.RetornarHtml(this);
            const retorno = htmlBaseMenu + htmlInterno.replace("[[CONTEUDO]]", this.HtmlInternoInicial);
            return retorno;
        }
        //#endregion

        //#region Eventos

        private ElementoConteudo_Click(e: MouseEvent): void
        {
            if (this.IsAberto)
            {
                this.Encolher();
            }
            else
            {
                this.Expandir();
            }

        }

        public async AtualizarMenu(isMostrar?: boolean) 
        {
            this.ElementoDestinoMenuItem.style.height = "auto";
            this.ElementoDestinoMenuItem.style.transition = "none";

            await u.ThreadUtil.QuebrarAsync();
            this.AlturaElementoDestinoMenuItem = parseInt(this.ElementoDestinoMenuItem.RetornarValorEstiloComputado(x => x.height));

            if (this.IsAberto || isMostrar)
            {
                this.Expandir();
            }
            else
            {
                this.Encolher();
            }
            await u.ThreadUtil.QuebrarAsync();
            this.ElementoDestinoMenuItem.style.transition = "height .25s";
        }

        public Expandir(): void
        {
            this.ExpandirElemento(this.ElementoDestinoMenuItem);
            //ElementoUtil.MostrarElementos(this.ElementosMenuItem);
            this.IconeSeta = "arrow_drop_up";
            this.IsAberto = true;

        }


        public Encolher(): void
        {
            this.EncolherElemento(this.ElementoDestinoMenuItem);
            this.IconeSeta = "arrow_drop_down";

            this.IsAberto = false;
        }

        private   ExpandirElemento(elemento: HTMLElement) 
        {
            if (this.AlturaElementoDestinoMenuItem > 0)
            {
                elemento.style.height = this.AlturaElementoDestinoMenuItem.ToPixels();
            }
            else
            {
                elemento.MostrarElemento();
            }
        }

        private EncolherElemento(elemento: HTMLElement): any
        {
            if (this.AlturaElementoDestinoMenuItem > 0)
            {
                elemento.style.height = "0";
            }
            else
            {
                elemento.OcultarElemento();
            }
        }
        //#endregion
    }
}