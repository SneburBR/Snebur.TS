namespace Snebur.UI
{
    export class CaixaSlider extends BaseControleFormulario<number> implements IControleEventoValorModificando
    {
        //#region Propriedades

        private _valorUltimo: number; 
        private _minimo: number = 0;
        private _maximo: number = 100;
        public Passo: number;
        public PassoLargo: number;
       

        public override get Valor(): number
        {
            return parseFloat(this.ElementoInput.value).ToDecimal();
        }
        public override set Valor(value: number)
        {
            this.SetValor(value, false, null);
        }

        public get Minimo(): number 
        {
            return this._minimo;
        }
        public set Minimo(value: number)
        {
            this._minimo = value;
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, value.toString());
        }

        public get Maximo(): number
        {
            return this._maximo;
        }
        public set Maximo(value: number)
        {
            this._maximo = value;
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, value.toString());
        }

        private PosicaoRotulo: EnumPosicao;

        /*public readonly EventoValorModificando: Evento<ValorAlteradoEventArgs<number>>*/
        private IsMostrarValor: boolean;
        private FormatacaoValor: string;
        private FormatacaoFuncao: (valor: any) => string;

        //#endregion

        //#region Construtor

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            //this.CssClasseControle = "sn-caixa-slider";
            this.EventoDataSourceAlterado.AddHandler(this.CaixaSlider_DataSourceAlterado, this);
        }

        private CaixaSlider_DataSourceAlterado(provedor: any, e: EventArgs): void
        {
            this.AtualizarTextoValor();
        }
        //#endregion

        //#region Métodos Sobre escritos

        protected override Inicializar()
        {
            super.Inicializar();

            //var eventoEnum = (u.SistemaUtil.Navegador.NavegadorEnum == d.EnumNavegador.InternetExplorer) ? ui.EnumEventoDom.Change : ui.EnumEventoDom.Input;
            this.AdicionarEventoDom(ui.EnumEventoDom.Input, this.ElementoInput_Input.bind(this), this.ElementoInput);

            this.IsMostrarValor = this.RetornarValorAtributoBoolean(AtributosHtml.IsMostrarValor, false);

            this.FormatacaoValor = this.RetornarValorAtributo(AtributosHtml.FormatarValor, null);
            this.FormatacaoFuncao = this.RetornarFuncaoFormatar();

            if (!String.IsNullOrEmpty(this.RetornarValorAtributo(AtributosHtml.Formatar, null)))
            {
                throw new Erro(`O atributo ${AtributosHtml.Formatar.Nome} não é suportado pela caixa slider utilizar o atributo ${AtributosHtml.FormatarValor.Nome} para evitar o conflito com bind, Controle: ${this.ControleApresentacao.___NomeConstrutor}`);
            }

            this.BlocoTextoValor.Visibilidade = this.IsMostrarValor;
            this.AtualizarTextoValor();
        }

        protected override HtmlCarregado(): void
        {
            super.HtmlCarregado();

            const larguraTextoValor = this.RetornarValorAtributo(AtributosHtml.LarguraTextoValor, "45px");
            const elementoBlocoTextoValor = this.RetornarItemElemento("ItemBlocoTextoValor");
            ElementoUtil.AdicionarAtributo(elementoBlocoTextoValor, AtributosHtml.LarguraApresentacao, larguraTextoValor);
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();

            this.Passo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Passo, 1));
            this.PassoLargo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.PassoLargo, 1));
            this.Minimo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Minimo, 0));
            this.Maximo = u.ConverterUtil.ParaNumero(this.RetornarValorAtributo(AtributosHtml.Maximo, 100));
             
            this.PosicaoRotulo = this.RetornarPosicaoRotulo();
            this.AtualizarPosicaoRotulo();

            if (!String.IsNullOrWhiteSpace(this.CaminhoBind))
            {
                ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
            }
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Min, this.Minimo.toString());
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Max, this.Maximo.toString());
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.Step, this.Passo.toString());
        }

        public override ValorPropriedadeAlterado(paiPropriedade: ObjetoControladorPropriedade, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any)
        {
            super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);
            this.AtualizarTextoValor();
            if (valorPropriedade !== this.Valor)
            {
                this.Valor = valorPropriedade;
            }

        }
        //#endregion

        //#region Eventos

        protected override ElementoInput_Change(e?: Event)
        {
            const novoValor = ConverterUtil.ParaDecimal(this.ElementoInput.value);
            this.SetValor(novoValor, false, e);
        }

        private ElementoInput_Input(e: Event)
        {
            const novoValor = ConverterUtil.ParaDecimal(this.ElementoInput.value);
            this.SetValor(novoValor, true, e);
        }

        private BtnMenos_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.PassoLargo;
            let valor = this.Valor;
            valor -= passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            this.SetValor(valor, false, e.DomEvent);
        }

        private BtnMais_Click(provedor: ui.Botao, e: ui.UIEventArgs): void
        {
            const passaLargo = this.PassoLargo;
            let valor = this.Valor;
            valor += passaLargo;
            valor = Math.round(valor / passaLargo) * passaLargo;
            this.SetValor(valor, false, e.DomEvent);
        }

        private SetValor(valor: any, isModificando: boolean, e?: Event)
        {
            const valorNormalizado = Math.max(Math.min(ConverterUtil.ParaDecimal(valor), this.Maximo), this.Minimo);
            if (this.Valor !== valorNormalizado ||
                this._valorUltimo !== valorNormalizado)
            {
                this._valorUltimo = valorNormalizado;
                this.ElementoInput.value = valorNormalizado.toString();
      
                this.AlterarValorPropriedade();
                this.AtualizarTextoValor();
                this.NotificarValorModificando(this.Valor);
                if (!isModificando)
                {
                    this.NotificarAlteracaoConcluido(valorNormalizado, e);
                    this.ElementoInput.dispatchEvent(new Event("change"));
                }
            }
        }

        //isso far a propagação do bind
        private AlterarValorPropriedade(): void
        {
            const valor = this.Valor;
            this.AtribuirValorPropriedade(valor);

            if (this.PaiPropriedade instanceof ObjetoControladorPropriedade && this.Propriedade instanceof r.Propriedade)
            {
                u.ReflexaoUtil.AtribuirValorPropriedade(this.PaiPropriedade, this.Propriedade, valor);
            }
        }

        //#endregion

        //#region Métodos Privados

        private RetornarPosicaoRotulo(): EnumPosicao
        {
            const posicaoRotulo = this.RetornarValorAtributo(AtributosHtml.PosicaoRotulo);
            if (String.IsNullOrWhiteSpace(posicaoRotulo))
            {
                return null;
            }
            return u.EnumUtil.RetornarValor(EnumPosicao, posicaoRotulo);
        }

        private AtualizarPosicaoRotulo(): void
        {
            const classeRotulo = this.RetornarCssClassePosicaoRotulo();
            EstiloUtil.AdicionarCssClasse(this.Elemento, classeRotulo);
        }

        private RetornarCssClassePosicaoRotulo(): string
        {
            switch (this.PosicaoRotulo)
            {
                case EnumPosicao.Esquerda:
                    return "sn-rotulo-esquerda";

                case null:
                    return String.Empty;

                default:
                    throw new ErroNaoImplementado(this);
            }
        }

        private NotificarValorModificando(valor: any): void
        {
            if (this.IsControleInicializado)
            {
                this.EventoValorModificando.Notificar(this, new ValorAlteradoEventArgs(valor));
            }
        }

        protected override RetornarTagNovoElemento(): string
        {
            return "sn-caixa-slider";
        }

        private AtualizarTextoValor(): void
        {
            if (this.IsMostrarValor)
            {
                this.TextoValor.Texto = this.RetornarValorTextoFormatado();
            }
        }

        private RetornarValorTextoFormatado(): string
        {
            const valor = this.Valor;
            const formatacao = this.FormatacaoValor;
            if (!String.IsNullOrEmpty(formatacao))
            {
                return u.FormatacaoUtil.Formatar(valor, formatacao);
            }
            const funcaoFormatar = this.FormatacaoFuncao;
            if (funcaoFormatar instanceof Function)
            {
                return funcaoFormatar(valor);
            }

            return valor.toFixed(1);
        }

        private RetornarFuncaoFormatar(): (valor: any) => string
        {
            const funcaoFormatarString = this.RetornarValorAtributo(AtributosHtml.FormatarFuncao, null);
            if (!String.IsNullOrEmpty(funcaoFormatarString))
            {
                return this.RetornarMetodo(funcaoFormatarString) as (valor: any) => string;
            }
            return null;
        }

        public Resetar(): void
        {

        }
        //#endregion
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaSlider
    {
        readonly BlocoTextoValor: ui.Bloco;
        readonly TextoValor: ui.Texto;
    }

    //#endregion

}