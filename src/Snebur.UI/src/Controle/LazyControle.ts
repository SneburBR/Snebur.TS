
namespace Snebur.UI 
{
    export class LazyControle<TControle extends BaseControle>
    {
        private _controle: TControle = null;
        private _isAutoCarregar: boolean = false;

        public get Controle(): TControle
        {
            if (this._controle == null)
            {
                if (this.IsAutoCarregar)
                {
                    this.Carregar();
                }
            }
            return this._controle;
        }

        public get IsCarregado()
        {
            return this._controle != null;
        }

        public get IsAutoCarregar(): boolean
        {
            return this._isAutoCarregar;
        }

        private readonly Binds = new List<[constructor: ui.IBindConstrutor, valorAtributo: string]>();

        public constructor(
            private readonly ControlePai: BaseControle,
            private readonly ConstrutorControle: ui.IControleConstrutor<TControle>,
            private readonly Elemento?: HTMLElement,
            isAutoCarregar?:boolean) 
        {
            this._isAutoCarregar = isAutoCarregar ?? this.Elemento == null;
        }

        public AddBind<TBind extends ui.BaseBind>(
            construtorBind: ui.IBindConstrutor<TBind>,
            valorAtributo: string): this
        {
            if (this._controle != null)
            {
                throw new Erro("Controle ja carregado");
            }

            valorAtributo = ui.BindUtil.NormalizarValorAtributo(valorAtributo);
            this.Binds.Add([construtorBind, valorAtributo]);
            return this;
        }

        public AutoCarregar(): this
        {
            this._isAutoCarregar = true;
            return this;
        }

        public Carregar()
        {
            if (this._controle == null)
            {
                this._controle = this.RetornarControle();
            }
        }

        private RetornarControle(): TControle
        {
            const controlePai = this.ControlePai;
            const controle = new this.ConstrutorControle(controlePai, this.Elemento);
            controle.InicializarControle();
            controlePai.ControlesFilho.Add(controle);

            this.InicializarBinds(controle);
            return controle;
        }

        private InicializarBinds(controle: TControle)
        {
            const controlePai = this.ControlePai;
            for (const [construtorBind, valorAtributo] of this.Binds)
            {
                const bind = new construtorBind(controlePai, controle.Elemento, valorAtributo);
                controlePai.Binds.Add(bind);
                bind.InicializarBind();
                bind.DataSource = controlePai.DataSource;
            }
        }

    }
}