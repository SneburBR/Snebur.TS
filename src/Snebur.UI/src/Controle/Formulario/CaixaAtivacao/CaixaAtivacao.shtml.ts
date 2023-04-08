namespace Snebur.UI
{
    export class CaixaAtivacao extends BaseControleFormulario<boolean> implements IControleSelecionado
    {
        private _funcaoIsPodeAtivar: (caixaAtivacao: CaixaAtivacao) => Promise<boolean> | boolean = null;

        public override get Valor(): boolean
        {
            return this.ElementoInput.checked;
        }

        public override set Valor(value: boolean)
        {
            if (this.Valor !== value)
            {
                value = u.ConverterUtil.ParaBoolean(value);
                this.ElementoInput.checked = value;
                this.EventoValorAlterado.Notificar(this, new ValorAlteradoEventArgs(value));
                this.AtualizarEstiloAtivacao(value);
            }
        }

        public get IsSelecionado(): boolean
        {
            return this.Valor;
        }
        public set IsSelecionado(value: boolean)
        {
            this.Valor = value;
        }

        public get FuncaoIsPodeAtivar(): (caixaAtivacao: CaixaAtivacao) => Promise<boolean> | boolean
        {
            return this._funcaoIsPodeAtivar;
        }

        public constructor(controlePai: BaseControle, elemento: HTMLElement)
        {
            super(controlePai, elemento);
        }

        protected override Inicializar()
        {
            super.Inicializar();
            this._funcaoIsPodeAtivar = this.RetornarFuncaoIsPodeAtivar();
        }

        private RetornarFuncaoIsPodeAtivar(): any
        {
            const nomeFuncao = this.RetornarValorAtributo(AtributosHtml.IsFuncaoPodeAtivar, null);
            if (!String.IsNullOrEmpty(nomeFuncao))
            {
                return this.RetornarMetodo(nomeFuncao, false, false) as any;
            }
            return null;
        }

        protected override DepoisInicializarComponentesApresentacao(): void
        {
            super.DepoisInicializarComponentesApresentacao();
            ElementoUtil.AdicionarAtributo(this.ElementoInput, AtributosHtml.BindTexto, this.CaminhoBind);
        }

        public override ValorPropriedadeAlterado(paiPropriedade: d.BaseDominio, nomePropriedade: string, proprieade: r.Propriedade, valorPropriedade: any): void
        {
            super.ValorPropriedadeAlterado(paiPropriedade, nomePropriedade, proprieade, valorPropriedade);
            if (this.IsControleInicializado && !this.IsDispensado)
            {
                const isAtivo = u.ConverterUtil.ParaBoolean(valorPropriedade);
                this.AtualizarEstiloAtivacao(isAtivo);
                this.ElementoInput.checked = isAtivo;
            }
        }


        protected override VinalizarRotuloInput(): void
        {
            const elementoRotuloPara = this.ElementoCaixa as HTMLLabelElement;
            elementoRotuloPara.htmlFor = this.ElementoInput.id;
        }

        private AtualizarEstiloAtivacao(isAtivado: boolean): void
        {
            if (isAtivado)
            {
                this.Elemento.classList.remove("sn-caixa-ativacao-is-ativado--false");
                this.Elemento.classList.add("sn-caixa-ativacao-is-ativado--true");
            }
            else
            {
                this.Elemento.classList.remove("sn-caixa-ativacao-is-ativado--true");
                this.Elemento.classList.add("sn-caixa-ativacao-is-ativado--false");
            }
        }

        public override Habilitar(): void
        {
            super.Habilitar();
        }

        private async BtnAtivar_Click(provedor: ui.BaseUIElemento, e: ui.UIEventArgs)
        {
            if (typeof this._funcaoIsPodeAtivar === "function")
            {
                const isPodeAtivar = await this._funcaoIsPodeAtivar(this);
                if (!isPodeAtivar)
                {
                    return;
                }
            }
            this.Valor = !this.Valor;
            this.AlterarValorPropriedade();
        }

        protected AlterarValorPropriedade(): void
        {
            if (this.PaiPropriedade instanceof ObjetoControladorPropriedade && this.Propriedade instanceof r.Propriedade)
            {
                u.ReflexaoUtil.AtribuirValorPropriedade(this.PaiPropriedade, this.Propriedade, this.Valor);
            }
        }

        public override Desabilitar(): void
        {
            super.Desabilitar();
        }
    }

    //#region Elementos da apresentação - código gerado automaticamente #

    export interface CaixaAtivacao
    {
        readonly BlocoIndicacao: ui.BlocoItem;
        readonly TextoAtivado: ui.Texto;
        readonly TextoDesativado: ui.Texto;
    }

    //#endregion

}