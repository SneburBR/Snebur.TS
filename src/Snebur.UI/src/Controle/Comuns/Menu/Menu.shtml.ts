namespace Snebur.UI
{
    export class Menu extends Snebur.UI.BaseControle
    {
        private _isAtualizandoMenu: boolean = false;
        private MenuItemSelecionado: MenuItem = null;
        private readonly MenusItemPesquisaViewModel = new List<MenuItemPesquisaViewModel>();

        public constructor(controlePai: Snebur.UI.BaseControle,
                           elemento: HTMLElement) 
        {
            super(controlePai, elemento);
            this.CssClasseControle = "sn-menu";
            this.EventoCarregado.AddHandler(this.Menu_Carregado, this);
        }

        public override AtualizarAparencia(): void
        {
            super.AtualizarAparencia();
            this.AtualizarMenuAsync();
        }

        public async AtualizarMenuAsync()
        {
            if (this._isAtualizandoMenu)
            {
                return;
            }
            try
            {
                this._isAtualizandoMenu = true;
                const menusSanfone = this.ControlesFilho.OfType(MenuSanfona);
                for (const menuSanfona of menusSanfone)
                {
                    await menuSanfona.AtualizarMenuAsync();
                }
            }
            finally
            {
                this._isAtualizandoMenu = false;
            }
        }

        private Menu_Carregado(provedor: any, e: EventArgs): void
        {
            this.PopularMenusItemPesquisaViewModel();
        }

        public SelecionarMenuIntem(menuItemSelecionado: MenuItem): void
        {
            this.MenuItemSelecionado = menuItemSelecionado;
            this.DeselecionarTudo(this);
            this.MenuItemSelecionado.Selecionar();
        }

        private DeselecionarTudo(controleAtual: BaseControle): void
        {
            const controlesMenuFilhos = controleAtual.ControlesFilho.OfType(BaseMenu).Where(x => x.IsControleInicializado).ToList();
            for (const controleMenuFilho of controlesMenuFilhos)
            {
                controleMenuFilho.Deselecionar();
                this.DeselecionarTudo(controleMenuFilho);
            }
        }


        private PopularMenusItemPesquisaViewModel()
        {
            const menosViewModel = new List<MenuItemPesquisaViewModel>();
            const menusItens = this.ControlesFilho.OfType(ui.MenuItem).Where(x => x.IsControleInicializado);
            const menusSanfona = this.ControlesFilho.OfType(ui.MenuSanfona).Where(x => x.IsControleInicializado);

            for (const menuIten of menusItens)
            {
                menosViewModel.Add(new MenuItemPesquisaViewModel(menuIten));
            }

            for (const menuSanfona of menusSanfona)
            {
                for (const menuItem of menuSanfona.ControlesFilho.OfType(ui.MenuItem).Where(x => x.IsControleInicializado))
                {
                    menosViewModel.Add(new MenuItemPesquisaViewModel(menuItem, menuSanfona));
                }
            }

            this.MenusItemPesquisaViewModel.AddRangeNew(menosViewModel);
        }

        public AtualizarPesquisa(pesquisa: string)
        {
            if (String.IsNullOrWhiteSpace(pesquisa))
            {
                this.MenusItemPesquisaViewModel.ForEach(x => x.Mostrar());
                const menosSanfona = this.MenusItemPesquisaViewModel.Select(x => x.MenuSanfona).Where(x => x instanceof MenuSanfona).Distinct();
                menosSanfona.ForEach(x => x.AtualizarMenuAsync(true));
            }
            else
            {
                this.MenusItemPesquisaViewModel.ForEach(x => x.Ocultar());
                const partes = TextoUtil.RetornarPartesPequisa(pesquisa);
                const itensMostrar = this.MenusItemPesquisaViewModel.Where(x => x.IsFiltroPesquisa(partes));
                itensMostrar.ForEach(x => x.Mostrar());

                const menosSanfona = itensMostrar.Select(x => x.MenuSanfona).Where(x => x instanceof MenuSanfona).Distinct();
                menosSanfona.ForEach(x => x.AtualizarMenuAsync(true));
            }
        }
    }

    export class MenuItemPesquisaViewModel
    {
        public readonly MenuItem: ui.MenuItem;
        public readonly MenuSanfona: ui.MenuSanfona;
        public readonly Pesquisas = new List<string>();

        public constructor(menuItem: ui.MenuItem, menuSanfonaPai?: ui.MenuSanfona)
        {
            this.MenuItem = menuItem;
            this.MenuSanfona = menuSanfonaPai;

            this.Pesquisas.Add(TextoUtil.FormatarPequisa(menuItem.Rotulo));
            this.Pesquisas.AddRange(menuItem.Tags);
        }

        public Mostrar(): void
        {
            this.MenuItem?.MostrarElemento();
            this.MenuSanfona?.MostrarElemento();
        }

        public Ocultar(): void
        {
            this.MenuItem?.OcultarElemento();
            this.MenuSanfona?.OcultarElemento();
            this.MenuSanfona?.Encolher();
        }

        public IsFiltroPesquisa(partes: List<string>): boolean
        {
            return partes.All(parte => this.Pesquisas.Any(x => x.StartsWith(parte)));
        }
    }
}