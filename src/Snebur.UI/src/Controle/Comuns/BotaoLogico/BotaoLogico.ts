namespace Snebur.UI
{
    export class BotaoLogico<TValor = any> extends Botao implements ISelecionado, IControleEventoValorAlterado<TValor | boolean>
    {
        public static readonly CSS_CLASSE_VERDAIRO_PADRAO: string = "sn-botao-logico-verdadeiro-padrao";
        public static readonly CSS_CLASSE_FALSO_PADRAO: string = "sn-botao-logico-falso-padrao";

        private _isGrupo: boolean;
        private _valor: TValor = null;
        private _isSelecioando: boolean = false;

        public get Valor(): TValor
        {
            return this._valor;
        }

        public set Valor(value: TValor)
        {
            this._valor = value;
            this.NotificarPropriedadeAlterada(x => x.Valor, this._valor, this._valor = value);
        }

        public get ValorSelecionado(): TValor
        {
            if (!this.IsGrupo)
            {
                throw new Erro("A valor selecionado é retornar apenas grupo de mais de um botao");
            }
            const botaoSelecioando = this.GrupoBotoesLogico.Where(x => x.IsSelecionado).SingleOrDefault();
            if (botaoSelecioando instanceof BotaoLogico)
            {
                return botaoSelecioando.Valor;
            }
            return null;
        }

        public get IsSelecionado(): boolean
        {
            return this._isSelecioando;
        }

        public set IsSelecionado(value: boolean)
        {
            this.NotificarPropriedadeAlterada(x => x.IsSelecionado, this._isSelecioando, this._isSelecioando = value);
            this.NotificarValorLogicoAlterado();
        }
         
        public get CssClasseVerdadeiro()
        {
            const valorAtributo = this.RetornarValorAtributo(AtributosHtml.CssClassBotaoLogicoVerdadeiro, String.Empty);
            if (!String.IsNullOrWhiteSpace(valorAtributo))
            {
                return valorAtributo;
            }
            return BotaoLogico.CSS_CLASSE_VERDAIRO_PADRAO;
        }

        public get CssClasseFalso()
        {
            const valorAtributo = this.RetornarValorAtributo(AtributosHtml.CssClassBotaoLogicoFalso, String.Empty);
            if (!String.IsNullOrWhiteSpace(valorAtributo))
            {
                return valorAtributo;
            }
            return BotaoLogico.CSS_CLASSE_FALSO_PADRAO;
        }

        public readonly EventoValorAlterado: Evento<ValorAlteradoEventArgs<TValor | boolean>>;

        //public AlterarValorClick: boolean = true;

        public get IsGrupo(): boolean
        {
            return this._isGrupo;
        }
        private NomeGrupo: string;
        public readonly GrupoBotoesLogico: Array<ui.BotaoLogico> = new Array<ui.BotaoLogico>();

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);

            this.EventoValorAlterado = new Evento<ValorAlteradoEventArgs<boolean>>(this);
            this.EventoCarregado.AddHandler(this.BotaoLogico_Carregado, this);
            this.CssClasseControle = "sn-botao-logico";
        }

        protected override Inicializar(): void
        {
            super.Inicializar();

            this.Valor = this.RetornarValor();

        }

        private RetornarValor(): TValor
        {
            const valor = this.RetornarValorAtributo(AtributosHtml.Valor, null, false);
            if (typeof valor === "string")
            {
                const valorReflexao = r.ReflexaoNamespaceUtil.RetornarObjetoOuConstrutor(valor, true);
                if (valorReflexao != null)
                {
                    return valorReflexao;
                }
            }
            return valor as any;
        }

        private BotaoLogico_Carregado(provedor: any, e: EventArgs): void
        {
            this.AtualizarEstilos();

            this.NomeGrupo = this.RetornarValorAtributo(AtributosHtml.Grupo);
            this._isGrupo = !String.IsNullOrWhiteSpace(this.NomeGrupo);

            if (this.IsGrupo)
            {
                this.ControleApresentacao.EventoCarregado.AddHandler(this.ControleApresentacao_Carregado, this);
            }

            const valorBindValorLogico = this.RetornarValorAtributo(AtributosHtml.BindValorLogico);
            if (String.IsNullOrWhiteSpace(valorBindValorLogico))
            {
                this.AdicionarEventoDom(ui.EnumEventoDom.Click, this.Elemento_Click.bind(this));
            }

            if (this.IsGrupo && !String.IsNullOrWhiteSpace(valorBindValorLogico))
            {
                throw new Erro("O grupo do botão logico não foi implementado para ser usado com Bind");
            }
        }

        private ControleApresentacao_Carregado()
        {
            this.GrupoBotoesLogico.AddRange(this.ControleApresentacao.ControlesFilho.OfType<BotaoLogico>(BotaoLogico).
                Where(x => x.NomeGrupo === this.NomeGrupo && x !== this).ToList());
            if (!(this.GrupoBotoesLogico.Count > 1))
            {
                throw new Erro("O grupo do botão logico precisa mais de um controle para trabalhar em grupo");
            }
        }

        private AtualizarEstilos(): void
        {
            if (this.IsControleInicializado)
            {
                if (this.IsSelecionado)
                {
                    this.AtualizarEstiloVerdadeiro();
                }
                else
                {
                    this.AtualizarEstiloFalso();
                }
            }
        }

        private Elemento_Click(e: MouseEvent): void
        {
            if (this.IsGrupo)
            {
                for (const botaoLogico of this.GrupoBotoesLogico)
                {
                    botaoLogico.IsSelecionado = false;
                }
                this.IsSelecionado = true;
            }
            else
            {
                this.IsSelecionado = !this.IsSelecionado;
            }
        }

        private AtualizarEstiloVerdadeiro(): void
        {
            EstiloUtil.RemoverCssClasse(this.Elemento, this.CssClasseFalso);
            EstiloUtil.AdicionarCssClasse(this.Elemento, this.CssClasseVerdadeiro);
        }

        private AtualizarEstiloFalso(): void
        {
            EstiloUtil.RemoverCssClasse(this.Elemento, this.CssClasseVerdadeiro);
            EstiloUtil.AdicionarCssClasse(this.Elemento, this.CssClasseFalso);
        }

        private NotificarValorLogicoAlterado(): void
        {
            if (this.IsGrupo)
            {
                if (this.IsSelecionado)
                {
                    this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(this._valor));
                }
            }
            else
            {
                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(this._isSelecioando));
            }
            this.AtualizarEstilos();
        }


    }
}