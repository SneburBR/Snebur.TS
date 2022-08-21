namespace Snebur.UI
{
    export abstract class ControleApresentacao extends BaseControleApresentacaoFormulario
    {
        protected readonly __isControleZIndex: boolean = false;


        private _isPontilharAreas: boolean;

        public get IsPontilharAreas(): boolean
        {

            return $Configuracao.IsDebug &&
                this._isPontilharAreas;
        }

        public get GerenciadorAbrirImagemLocal(): GerenciadorAbrirImagemLocal
        {
            return $Aplicacao.GerenciadorAbrirImagemLocal;
        }

        public get GerenciadorEnvioArquivo(): sa.GerenciadorEnvioArquivo
        {
            return $Aplicacao.GerenciadorServioArquivoPadrao;
        }

        protected IsFocarPrimeiraCaixaTexto: boolean = true;


        public constructor(controlePai: BaseControle);
        public constructor(controlePai: BaseControle, refElemento?: HTMLElement | string);
        public constructor(controlePai: BaseControle, refElemento?: HTMLElement | string)
        {
            super(controlePai, refElemento);

            this.EventoDataSourceAlterado.AddHandler(this.ControleApresentacao_Carregado, this);
            this.EventoCarregado.AddHandler(this.ControleApresentacao_Carregado, this);

        }

        protected override Inicializar(): void
        {
            super.Inicializar();
        }

        protected override InicializarAtributos(): void
        {
            super.InicializarAtributos();

            //this._isDebugApresentacao = ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsDebugApresentacao, false));
            /*this._isPontilharAreas = ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsPontilharAreas, false));*/
            //this._isMarcarMargens = ConverterUtil.ParaBoolean(this.RetornarValorAtributo(AtributosHtml.IsMarcarMargens, false));

            if (u.ValidacaoUtil.IsFunction($Aplicacao.FuncaoDepoisControleApresentacaoInicializado))
            {
                $Aplicacao.FuncaoDepoisControleApresentacaoInicializado(this);
            }
        }

        private async ControleApresentacao_Carregado(provedor: any, e: EventArgs) 
        {
            this.OcultarMensagensValidacao(true);

            if (this.IsFocarPrimeiraCaixaTexto)
            {
                await ThreadUtil.QuebrarAsync();
                this.FocusPrimeiraCaixaTexto();
            }
        }

        private DataSourceApresentacao_Alterado(): void
        {
            if (this.IsFocarPrimeiraCaixaTexto)
            {
                this.FocusPrimeiraCaixaTexto();
            }
        }

        public async FocusPrimeiraCaixaTexto()
        {
            if (!TelaUtil.IsCelularOuTablet)
            {
                const primeiroControleCaixaTexto = this.ControlesFilho.OfType<BaseCaixaTexto>(BaseCaixaTexto).FirstOrDefault();
                if (primeiroControleCaixaTexto != null)
                {
                    await u.ThreadUtil.EsperarAsync(100);
                    primeiroControleCaixaTexto.FocusPrimeiroControle();
                }
            }
        }
         
        //#reigon Ocultar 

        public override OcultarElemento()
        {
            super.OcultarElemento();

            for (const controle of this.ControlesFilho.OfType(ControleFlutuante))
            {
                controle.Fechar();
            }
        }

        //#endregion

        //#region Controle ZIndex

        protected RetornarElementoZIndex(): HTMLElement
        {
            if (!this.__isControleZIndex)
            {
                throw new Erro("O controle apresentacao não ativado IsControleZIndex");
            }
            return this.Elemento;
        }

        private RetornarControleApresentacaoZIndenx(): ControleApresentacaoZIndex | null
        {
            let controleAtual: BaseControle = this;
            while (controleAtual != null)
            {
                if ((controleAtual instanceof ControleApresentacao && controleAtual.__isControleZIndex))
                {
                    return controleAtual as any as ControleApresentacaoZIndex;
                }
                controleAtual = controleAtual.ControlePai;
            }

            return null;
        }

        //#endregion

        public override Dispose(): void
        {
            super.Dispose();
        }

    }

    export interface ControleApresentacaoZIndex
    {
        RetornarControleApresentacaoZIndenx(): ControleApresentacaoZIndex;
        RetornarElementoZIndex(): HTMLElement;
    }

}