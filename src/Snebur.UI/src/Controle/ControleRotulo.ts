namespace Snebur.UI
{
    export abstract class ControleRotulo extends Snebur.UI.BaseControle  
    {
        private _elementoRotulo: HTMLElement;
        private _rotulo: string;

        /*@internal*/
        public BindRotulo: BindPropriedadeComum;
        /*@internal*/
        public IsExisteBindRotulo: boolean = false;
        /*@internal*/
        public IsRotuloVazio: boolean = false;
        /*@internal*/
        public IsRotuloHtmlInterno: boolean = true;
        
        public RotuloApresentacao: string;

        public get ElementoRotulo(): HTMLElement
        {
            if (!(this._elementoRotulo instanceof HTMLElement))
            {
                this._elementoRotulo = this.RetornarElementoRotulo();
            }
            return this._elementoRotulo;
        }

        public get Rotulo(): string
        {
            return this._rotulo ?? this.ElementoRotulo.innerHTML;
        }
        public set Rotulo(value: string)
        {
            if (this.ElementoRotulo instanceof HTMLElement)
            {
                this.ElementoRotulo.innerHTML = value ;
            }
            this._rotulo = value  ;
        }
         
        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.ControlePai.EventoDataSourceAlterado?.AddHandler(this.ControlePai_DataSourceAlterado, this);
        }

        private ControlePai_DataSourceAlterado(provedor: any, e: EventArgs): void
        {
            if (this.IsExisteBindRotulo)
            {
                this.AtualizarValoresBindDataSource();
            }
        }

        protected override Inicializar(): void 
        {
            super.Inicializar();
            this.InicializarBindRotulo();
            this.AtualizarRotulo(true);
            this.AtualizarRotuloApresentacao();
        }

        protected InicializarBindRotulo(): void
        {
            ControleRotuloUtil.InicializarBindRotulo(this);
        }

        protected AtualizarRotulo(isInicializar: boolean)
        {
            ControleRotuloUtil.AtualizarRotulo(this, isInicializar);
        }

        /*@internal*/
        public RetornarRotulo(): string
        {
            return ControleRotuloUtil.RetornarRotulo(this);
        }

        /*@internal*/
        public RetornarRotuloInterno(): string
        {
            return ControleRotuloUtil.RetornarRotuloInterno(this);
        }
         
        protected AtualizarRotuloApresentacao(): void
        {
            const propriedadeRorutloApresetancao = this.MapeamentoPropriedadeApresentacao.DicionarioPropriedades.TryItem(this.RetornarNomePropriedade(x => x.RotuloApresentacao));
            if (!(propriedadeRorutloApresetancao instanceof PropriedadeRotuloApresentacao))
            {
                throw new Erro(`A propriedade rotulo apresentação não foi mapeada para o tipo ${this.GetType().Nome}`);
            }
            propriedadeRorutloApresetancao.Atualizar(this);
        }

        protected override RetornarMapeamento(): MapeamentoPropriedadeApresentacao
        {
            return super.RetornarMapeamento();
        }
         
        protected abstract RetornarElementoRotulo(): HTMLElement;

        public override Dispose()
        {
            this.ControlePai.EventoDataSourceAlterado.RemoveHandler(this.ControlePai_DataSourceAlterado, this);
            super.Dispose();
        }
    }


}

