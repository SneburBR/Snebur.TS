namespace Snebur.UI
{
    export abstract class ControleRotulo extends Snebur.UI.BaseControle implements IControleRotulo
    {
        private _elementoRotulo: HTMLElement;
        private IsExisteBindRotulo: boolean = false;
        protected IsRotuloHtmlInterno = true;
        protected IsRotuloVazio: boolean = false;

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
            return this.ElementoRotulo.innerHTML;
        }
        public set Rotulo(value: string)
        {
            if (this.ElementoRotulo instanceof HTMLElement)
            {
                this.ElementoRotulo.innerHTML = value ?? String.Empty;
            }
        }

        public RotuloApresentacao: string;


        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
            this.ControlePai.EventoDataSourceAlterado.AddHandler(this.ControlePai_DataSourceAlterado, this);
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
            this.AtualizarRotulo(true);
            this.AtualizarRotuloApresentacao();

        }

        protected AtualizarRotulo(isInicializando: boolean = false): void
        {
            const elementoRotulo = this.ElementoRotulo;
            this.IsRotuloVazio = u.ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsRotuloVazio));
            if (this.IsRotuloVazio)
            {
                elementoRotulo.OcultarElemento();
            }
            else
            {
                const rotulo = this.RetornarRotulo();
                if (!this.IsExisteBindRotulo || isInicializando)
                {

                    elementoRotulo.innerHTML = rotulo;
                }
            }
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

        protected RetornarRotulo(): string
        {
            const isRotuloVazio = this.RetornarValorAtributoBoolean(AtributosHtml.IsRotuloVazio);
            if (isRotuloVazio)
            {
                return String.Empty;
            }
            const valorAtributoRotulo = this.RetornarRotuloInterno();
            if (u.ValidacaoUtil.IsBind(valorAtributoRotulo))
            {
                this.InicializarBindRotulo(valorAtributoRotulo);
                this.IsExisteBindRotulo = true;
                return valorAtributoRotulo;
            }
            if (String.IsNullOrEmpty(valorAtributoRotulo) &&
                !String.IsNullOrWhiteSpace(this.Rotulo))
            {
                return this.Rotulo;
            }
            return valorAtributoRotulo;
        }

        protected RetornarRotuloInterno(): string
        {
            const valorAtributoRotulo = this.RetornarValorAtributo(AtributosHtml.Rotulo, null, true);
            if (this.IsRotuloHtmlInterno && String.IsNullOrEmpty(valorAtributoRotulo))
            {
                return this.HtmlInternoInicial.trim();
            }
            if (!ValidacaoUtil.IsDefinido(valorAtributoRotulo))
            {
                return String.Empty;
            }
            return valorAtributoRotulo.toString().trim();
        }

        private InicializarBindRotulo(caminhoBind: string): void
        {
            const nomePropriedadeRotulo = this.RetornarNomePropriedade(x => x.Rotulo);
            const bindRotulo = new BindPropriedadeComum(this.ControlePai, this.Elemento, caminhoBind, nomePropriedadeRotulo);
            bindRotulo.InicializarBind();
            this.Binds.Add(bindRotulo);
        }

        protected abstract RetornarElementoRotulo(): HTMLElement;

        public override Dispose()
        {
            this.ControlePai.EventoDataSourceAlterado.RemoveHandler(this.ControlePai_DataSourceAlterado, this);
            super.Dispose();
        }
    }


}

